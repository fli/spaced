import * as KoaRouter from 'koa-router';
import { Context } from 'koa';

import * as db from './db';

const router = new KoaRouter();

async function addCard(ctx: Context) {
  const sessionId = ctx.cookies.get('sessionId');
  const { deckId, front, back } = ctx.request.body;
  await db.addCard(sessionId, deckId, front, back);
  ctx.status = 200;
}

router
  .post('/api/cards', addCard)
;
export default router;
