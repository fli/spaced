"use strict";
const Koa = require("koa");
const routes_1 = require("./routes");
const app = new Koa();
const PORT = 3000;
app.use(routes_1.default.routes());
app.listen(PORT);
console.log(`The server is running at http://localhost:${PORT}/`);
