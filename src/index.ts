import staticPlugin from "@elysiajs/static";
import { Elysia } from "elysia";
// import { html } from "@elysiajs/html";

const app = new Elysia()
  // .use(html())
  .use(staticPlugin({
    prefix: "/"
  }))
  .get("/", () => Bun.file("D:/Coding/self-learn/elysia/public/views/home.html"))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
