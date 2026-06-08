import { Elysia, t } from "elysia";
import { rateLimit } from "elysia-rate-limit";
import { getSandboxDB, resetSandboxDB } from "../../db/sandbox.db";
import { guardQuery } from "../../utils/query-guard";
import { sandboxMiddleware } from "../../middleware/sandbox.middleware";
import type { Level } from "../../db/sandbox.db";
import { PrismaClient, type Prisma } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Tipe konten challenge untuk soal sandbox.
 * Disimpan di kolom `content` (Json?) pada tabel challenges.
 */
interface ChallengeContent {
  sandboxTemplate?: string;
  sandboxEnabled?: boolean;
  sandboxLevel?: string;
  [key: string]: Prisma.JsonValue | undefined;
}

/**
 * Ekstrak templateName dari challenge.content (Prisma JsonValue) secara aman.
 * Fallback ke `soal_{soalId}` jika sandboxTemplate tidak ditemukan.
 */
function getTemplateName(content: Prisma.JsonValue | null, soalId: number): string {
  if (
    content !== null &&
    typeof content === "object" &&
    !Array.isArray(content) &&
    "sandboxTemplate" in content &&
    typeof (content as ChallengeContent).sandboxTemplate === "string"
  ) {
    return (content as ChallengeContent).sandboxTemplate!;
  }
  return `soal_${soalId}`;
}

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
  .use(
    rateLimit({
      scoping: "scoped",
      max: 25,
      duration: 60_000,
      errorResponse: new Response(
        JSON.stringify({
          success: false,
          message: "Terlalu banyak permintaan. Coba lagi dalam 1 menit.",
        }),
        { status: 429, headers: { "Content-Type": "application/json" } },
      ),
      generator: (req, server) => {
        const ip = server?.requestIP?.(req)?.address;
        if (ip) return ip;
        return req.headers.get("x-forwarded-for") || "127.0.0.1";
      },
    }),
  )
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

      // 1b. Ambil templateName dari database (disimpan di challenge.content)
      const challengeData = await prisma.challenge.findUnique({
        where: { id: soalId },
        select: { content: true },
      });
      const templateName = getTemplateName(challengeData?.content ?? null, soalId);

      // 2. Validasi query dengan guard
      const guard = guardQuery(query);
      if (!guard.safe) {
        set.status = 400;
        return { success: false, error: guard.reason };
      }

      // 3. Buka / inisialisasi DB user
      let db;
      try {
        db = getSandboxDB(sandboxUserId, templateName, level as Level);
      } catch (err) {
        set.status = 422;
        return { success: false, error: err instanceof Error ? err.message : "Gagal membuka sandbox database" };
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
      } catch (err) {
        set.status = 422;
        return { success: false, error: err instanceof Error ? err.message : "Gagal menjalankan query" };
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

      // Ambil templateName dari database
      const challengeData = await prisma.challenge.findUnique({
        where: { id: soalId },
        select: { content: true },
      });
      const templateName = getTemplateName(challengeData?.content ?? null, soalId);

      resetSandboxDB(sandboxUserId, templateName, level as Level);
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

