import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

const app = new Elysia()
  .use(cors())
  .get("/", () => ({ message: "Hello from Elysia + Bun!" }))
  .listen(3000);

console.log(`🟢 Elysia running at http://localhost:3000`);
