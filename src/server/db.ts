import * as PgPromise from 'pg-promise';

import { generateSessionId, generatePasswordHash, verifyPasswordHash } from './crypto';

const pgp = PgPromise();
const db = pgp({
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER
});

const qrec = pgp.errors.queryResultErrorCode;

export async function addNewPendingUser(email: string) {
  const token = await generateSessionId();
  return db.tx(t => t.batch([
    t.none('SELECT 1 FROM users WHERE email = $1', [email]),
    t.none('INSERT INTO pending_users (email, verification_token) VALUES ($1, $2)', [email.toLowerCase(), token])
  ])).then(() => token);
}

export async function addUser(token: string, password: string) {
  const passwordHash = await generatePasswordHash(password);
  const { id } = await db.one(`
    WITH tmp AS (DELETE FROM pending_users where verification_token = $1 RETURNING email)
      INSERT INTO users (email, password_hash) SELECT *, $2 from tmp RETURNING id;
  `, [token, passwordHash]);
  const sessionId = await generateSessionId();
  const data = await db.none('INSERT INTO sessions (id, user_id) VALUES ($1, $2)', [sessionId, id]);
  return sessionId;
}

export async function createSession(email: string, password: string) {
  console.log('creating session for ', email, password);
  let data;
  try {
    data = await db.one('SELECT id, password_hash FROM users WHERE email = $1', [email]);
  } catch (err) {
    if (err.code != undefined && err.code === qrec.noData) {
      return null;
    }
    throw err;
  }
  const { id, password_hash } = data;
  const passwordVerified = await verifyPasswordHash(password_hash, password);
  console.log('verified=', passwordVerified);
  if (passwordVerified) {
    const sessionId = await generateSessionId();
    console.log('new sessionId', sessionId);
    const data = await db.none('INSERT INTO sessions (id, user_id) VALUES ($1, $2)', [sessionId, id]);
    return sessionId;
  } else {
    return null;
  }
}

export function getDecks(sessionId: string) {
  return db.any(`
    SELECT decks.id, decks.name FROM decks
    INNER JOIN users ON users.id = decks.user_id
    INNER JOIN sessions ON users.id = sessions.user_id
    WHERE sessions.id = $1
  `, [sessionId])
}

export function addDeck(sessionId: string, name: string) {
  return db.one(`
    INSERT INTO decks (user_id, name)
    SELECT users.id, $2 FROM users
    INNER JOIN sessions ON users.id = sessions.user_id
    WHERE sessions.id = $1
    RETURNING decks.id
    `, [sessionId, name]);
}

export function addCard(sessionId: string, deckId: number, front: string, back: string) {
  return db.one(`
    INSERT INTO cards (deck_id, front, back)
    SELECT $2, $3, $4 FROM decks
    INNER JOIN sessions ON sessions.user_id = decks.user_id
    WHERE sessions.id = $1
    AND decks.id = $2
    RETURNING cards.id
    `, [sessionId, deckId, front, back]);
}

export async function resetModels() {
  await db.none('DROP TABLE IF EXISTS decks CASCADE');
  await db.none('DROP TABLE IF EXISTS users CASCADE');
  await db.none('DROP TABLE IF EXISTS pending_users CASCADE');
  await db.none('DROP TABLE IF EXISTS cards CASCADE');
  await db.none('DROP TABLE IF EXISTS sessions CASCADE');
  await db.none('CREATE TABLE decks (id serial, user_id integer NOT NULL, name text NOT NULL)');
  await db.none('CREATE TABLE cards (id serial, deck_id integer NOT NULL, front text NOT NULL, back text NOT NULL, easiness_factor real NOT NULL DEFAULT 2.5, repetition integer NOT NULL DEFAULT 0, last_repeated date NOT NULL DEFAULT current_date, due date NOT NULL DEFAULT current_date + 1)');
  await db.none('CREATE TABLE users (id serial, email varchar(254) UNIQUE NOT NULL, password_hash text NOT NULL, created_at timestamptz NOT NULL DEFAULT now())');
  await db.none('CREATE TABLE pending_users (email varchar(254) UNIQUE NOT NULL, verification_token char(24) UNIQUE NOT NULL, created_at timestamptz NOT NULL DEFAULT now())');
  await db.none('CREATE TABLE sessions (id char(24) UNIQUE NOT NULL, user_id integer NOT NULL, created_at timestamptz NOT NULL DEFAULT now())');
}