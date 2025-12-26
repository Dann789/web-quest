import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";

// JWT Secret from environment variable or default for development
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export const jwtPlugin = new Elysia()
    .use(
        jwt({
            name: "jwt",
            secret: JWT_SECRET,
            exp: "1h", // Token expires in 1 hour
        })
    );
