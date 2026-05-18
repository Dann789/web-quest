import { Elysia, t } from "elysia";
import { getSandboxDB, resetSandboxDB } from "../../db/sandbox.db";
import { guardQuery } from "../../utils/query-guard";
import { sandboxMiddleware } from "../../middleware/sandbox.middleware";
import type { Level } from "../../db/sandbox.db";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Helper untuk validasi apakah soalId cocok dengan level-nya
 */
async function validateLevel(soalId: number, level: string) {
  const challenge = await prisma.challenge.findUnique({
    where: { id: soalId },
    select: { levelId: true }
  });

  if (!challenge) return { valid: false, error: "Challenge tidak ditemukan." };

  const isPhp = level === "php_level" && challenge.levelId === 4;
  const isDb = level === "db_level" && challenge.levelId === 5;

  if (!isPhp && !isDb) {
    return { 
      valid: false, 
      error: `Challenge ID ${soalId} bukan bagian dari level ${level}.` 
    };
  }

  return { valid: true };
}

export const sandboxRoutes = new Elysia({ prefix: "/sandbox" })
  .use(sandboxMiddleware)

  // POST /sandbox/run
  .post(
    "/run",
    async ({ body, sandboxUserId, set }) => {
      const { soalId, level, query } = body;

      // 1. Validasi Level & Challenge (Agar tidak salah folder template)
      const check = await validateLevel(soalId, level);
      if (!check.valid) {
        set.status = 400;
        return { success: false, error: check.error };
      }

      // 2. Validasi query dengan guard
      const guard = guardQuery(query);
      if (!guard.safe) {
        set.status = 400;
        return { success: false, error: guard.reason };
      }

      // 3. Buka / inisialisasi DB user
      let db;
      try {
        db = getSandboxDB(sandboxUserId, soalId, level as Level);
      } catch (err: any) {
        set.status = 422;
        return { success: false, error: err.message };
      }

      // 4. Eksekusi query
      try {
        const isSelect = query.trim().toUpperCase().startsWith("SELECT");

        if (isSelect) {
          const rows = db.query(query).all();
          return {
            success: true,
            type: "select",
            rowCount: rows.length,
            rows,
          };
        } else {
          const result = db.run(query);
          return {
            success: true,
            type: "write",
            changes: result.changes,
            lastInsertId: result.lastInsertRowid,
          };
        }
      } catch (err: any) {
        set.status = 422;
        return { success: false, error: err.message };
      }
    },
    {
      body: t.Object({
        soalId: t.Number({ minimum: 1 }),
        level: t.Union([t.Literal("php_level"), t.Literal("db_level")]),
        query: t.String({ minLength: 1 }),
      }),
    }
  )

  // POST /sandbox/reset
  .post(
    "/reset",
    async ({ body, sandboxUserId, set }) => {
      const { soalId, level } = body;

      // Validasi sebelum reset
      const check = await validateLevel(soalId, level);
      if (!check.valid) {
        set.status = 400;
        return { success: false, error: check.error };
      }

      resetSandboxDB(sandboxUserId, soalId, level as Level);
      return {
        success: true,
        message: `Sandbox soal ${soalId} (${level}) berhasil di-reset.`,
      };
    },
    {
      body: t.Object({
        soalId: t.Number({ minimum: 1 }),
        level: t.Union([t.Literal("php_level"), t.Literal("db_level")]),
      }),
    }
  );
