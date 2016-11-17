import * as PgPromise from 'pg-promise';

import { generateSessionId } from './crypto';

const pgp = PgPromise();
const db = pgp({
  database: process.env.PGDATABASE,
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER
});

export async function addNewPendingUser(email: string) {
  const token = await generateSessionId();
  return db.tx(t => t.batch([
    t.none('SELECT 1 FROM users WHERE email = $1', [email]),
    t.none('INSERT INTO pending_users (email, verification_token) VALUES ($1, $2)', [email.toLowerCase(), token])
  ])).then(() => token);
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

