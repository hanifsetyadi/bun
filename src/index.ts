import { html } from "@elysiajs/html";
import staticPlugin from "@elysiajs/static";
import { Elysia } from "elysia";

const VIEWS_PATH = import.meta.dir + "/../public/views";

const app = new Elysia()
  // .use(html())
  .use(staticPlugin({
    prefix : '/'
  }))
  .get('/', ()=>Bun.file(VIEWS_PATH + "/home.html"))
  .get('/add-product', ()=>Bun.file(VIEWS_PATH + "/add-product.html"))
  .get('/edit', ()=>Bun.file(VIEWS_PATH + "/edit-product.html"))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
