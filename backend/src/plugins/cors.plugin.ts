import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

export const corsPlugin = new Elysia()
    .use(
        cors({
            origin: process.env.FRONTEND_URL || "http://localhost:5173",
            credentials: true,
            methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
            allowedHeaders: ["Content-Type", "Authorization"],
        })
    );
