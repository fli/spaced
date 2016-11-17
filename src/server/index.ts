import * as Koa from 'koa';
import * as KoaBodyparser from 'koa-bodyparser';

import * as crypto from './crypto';
import router from './routes';

const app = new Koa();
const PORT = 3000;

app.use(router.routes());

app.listen(PORT);
console.log(`The server is running at http://localhost:${PORT}/`);