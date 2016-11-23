import * as KoaRouter from 'koa-router';
import { Context } from 'koa';
import { renderToString } from 'react-dom/server';
import { createElement } from 'react';
import { readFileSync } from 'fs';

import * as db from './db';
import sendVerificationEmail from './email';
import App from '../client/App';
import * as constants from '../shared/constants';

const INDEX_HTML = readFileSync('./public/index.html', {encoding: 'utf-8'});

const router = new KoaRouter();

async function signin(ctx: Context) {
  const { email, password } = ctx.request.body;
  console.log('signin with params', ctx.request.body);
  const sessionId = await db.createSession(email, password);
  if (sessionId === null){
    ctx.throw(401);
  } else {
    ctx.cookies.set('sessionId', sessionId);
    ctx.status = 200;
  }
}

async function signup(ctx: Context) {
  const { email } = ctx.request.body;
  const token = await db.addNewPendingUser(email);
  const response = await sendVerificationEmail(email, token);
  if (response.status !== 202) {
    ctx.throw(500);
  }
  ctx.status = 200;
}

async function getDecks(ctx: Context) {
  const sessionId = ctx.cookies.get('sessionId');
  const decks = await db.getDecks(sessionId);
  ctx.body = { decks };
  ctx.status = 200;
}

async function addDeck(ctx: Context) {
  const sessionId = ctx.cookies.get('sessionId');
  const { name } = ctx.request.body;
  const { id } = await db.addDeck(sessionId, name);
  ctx.body = { id, name }
  ctx.status = 200;
}

async function addCard(ctx: Context) {
  const sessionId = ctx.cookies.get('sessionId');
  const { deckId, front, back } = ctx.request.body;
  await db.addCard(sessionId, deckId, front, back);
  ctx.status = 200;
}

async function addUser(ctx: Context) {
  const { token, password } = ctx.request.body;
  const sessionId = await db.addUser(token, password);
  ctx.cookies.set('sessionId', sessionId);
  ctx.status = 200;
}

async function handleRender(ctx: Context) {
  const sessionId = ctx.cookies.get('sessionId');
  let props;
  if (sessionId === undefined) {
    props = { name: constants.AppName, loggedIn: false, path: ctx.path, query: ctx.querystring, decks: undefined };
  } else {
    const decks = await db.getDecks(sessionId);
    props = { name: constants.AppName, loggedIn: true, path: ctx.path, query: ctx.querystring, decks }
  }
  const app = createElement(App, props);
  const html = renderToString(app);
  const preloadedState = app.props;
  ctx.body = INDEX_HTML
              .replace('<div id="root"></div>',
                        `<div id="root">${html}</div>`)
              .replace('<script id="__PRELOADED_STATE__"></script>',
                        `<script id="__PRELOADED_STATE__">
                            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
                         </script>`);
  ctx.status = 200;
}

router
  .post('/api/cards', addCard)
  .get('/api/decks', getDecks)
  .post('/api/decks', addDeck)
  .post('/api/signup', signup)
  .post('/api/signin', signin)
  .post('/api/users', addUser)
  .get('*', handleRender)
;

export default router;
