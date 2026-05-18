import { Elysia } from "elysia";
import { authMiddleware } from "./auth.middleware";
import { UserRole } from "@prisma/client";
// Middleware khusus untuk sandbox — mahasiswa dan dosen bisa akses
export const sandboxMiddleware = new Elysia()
    .use(authMiddleware)
    .derive({as: 'global'}, ({ user, set }) => {
        if (
            user.role !== UserRole.MAHASISWA &&
            user.role !== UserRole.DOSEN
        ) {
            set.status = 403;
            throw new Error("Forbidden: Akses sandbox tidak diizinkan");
        }

        return {
            sandboxUserId: user.id as number, // ← ini yang dipakai sandbox untuk naming file .db
        };
    });