import { Elysia } from "elysia";
import type { JWTPayload } from "../types";
import { UserRole } from "@prisma/client";
import { jwtPlugin } from "../plugins/jwt.plugin";

// Middleware to verify JWT token
export const authMiddleware = new Elysia()
    .use(jwtPlugin)
    .derive(async ({ headers, jwt, set }) => {
        const authHeader = headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            set.status = 401;
            throw new Error("Unauthorized: No token provided");
        }

        const token = authHeader.split(" ")[1];
        const payload = await jwt.verify(token);

        if (!payload) {
            set.status = 401;
            throw new Error("Unauthorized: Invalid token");
        }

        return {
            user: payload as JWTPayload,
        };
    });

// Middleware to check if user is ADMIN
export const adminOnly = new Elysia()
    .use(authMiddleware)
    .derive(({ user, set }) => {
        if (user.role !== UserRole.ADMIN) {
            set.status = 403;
            throw new Error("Forbidden: Admin access required");
        }
        return { user };
    });

// Middleware to check if user is USER role
export const userOnly = new Elysia()
    .use(authMiddleware)
    .derive(({ user, set }) => {
        if (user.role !== UserRole.USER) {
            set.status = 403;
            throw new Error("Forbidden: User access required");
        }
        return { user };
    });
