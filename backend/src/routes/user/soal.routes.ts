import { Elysia, t } from "elysia";
import { existsSync } from "fs";
import { getSandboxDB, getTemplatePath } from "../../db/sandbox.db";
import { sandboxMiddleware } from "../../middleware/sandbox.middleware";
import type { Level } from "../../db/sandbox.db";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Memetakan Level ID dari database ke folder sandbox yang sesuai.
 * ID 4 = PHP Basic (php_level)
 * ID 5 = Database (db_level)
 */
function getLevelFolder(levelId: number): Level | null {
  if (levelId === 4) return "php_level";
  if (levelId === 5) return "db_level";
  return null;
}

export const soalRoutes = new Elysia({ prefix: "/api/user/soal" })
  .use(sandboxMiddleware)

  // GET /soal?level=db_level
  .get(
    "/",
    async ({ query }) => {
      const levelFolder = query.level as Level | undefined;
      
      // Ambil challenge dari database yang bertipe CODING_MANUAL
      // karena sandbox ini khusus untuk tantangan koding/SQL
      const challenges = await prisma.challenge.findMany({
        where: {
          isActive: true,
          method: "CODING_MANUAL",
          ...(levelFolder === "php_level" ? { levelId: 4 } : {}),
          ...(levelFolder === "db_level" ? { levelId: 5 } : {}),
        },
        select: {
          id: true,
          title: true,
          description: true,
          levelId: true,
          content: true,
        }
      });

      return challenges
        .map((ch) => {
          const folder = getLevelFolder(ch.levelId);
          if (!folder) return null;

          const content = ch.content as any || {};
          const templateName = content.sandboxTemplate || `soal_${ch.id}`;

          return {
            id: ch.id,
            level: folder,
            judul: ch.title,
            deskripsi: ch.description,
            templateTersedia: existsSync(getTemplatePath(templateName, folder)),
          };
        })
        .filter((ch) => ch !== null);
    },
    {
      query: t.Object({
        level: t.Optional(
          t.Union([t.Literal("php_level"), t.Literal("db_level")])
        ),
      }),
    }
  )

  // GET /soal/:id/schema?level=db_level
  .get(
    "/:id/schema",
    async ({ params, query, sandboxUserId, set }) => {
      const challengeId = parseInt(params.id);
      const level = query.level as Level;

      // Verifikasi apakah challenge benar-benar ada di database
      const challenge = await prisma.challenge.findUnique({
        where: { id: challengeId },
        select: { levelId: true, content: true }
      });

      if (!challenge) {
        set.status = 404;
        return { success: false, error: "Challenge tidak ditemukan di database." };
      }

      const content = challenge.content as any || {};
      const templateName = content.sandboxTemplate as string | undefined;
      const folderFromDb = getLevelFolder(challenge.levelId);

      if (folderFromDb !== level) {
        set.status = 400;
        return { success: false, error: `Challenge ini milik level ${folderFromDb}, bukan ${level}.` };
      }

      if (!templateName) {
        set.status = 422;
        return { success: false, error: `Soal ini tidak memiliki sandboxTemplate. Harap edit soal dan pilih template database.` };
      }

      let db;
      try {
        db = getSandboxDB(sandboxUserId, templateName, level);
      } catch (err: any) {
        set.status = 422;
        return { success: false, error: err.message };
      }

      // Ambil daftar tabel dari sqlite_master
      const tables = db
        .query<{ name: string }, []>(
          "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name;"
        )
        .all();

      const schema = tables.map(({ name }) => {
        const kolom = db.query(`PRAGMA table_info(${name})`).all();
        return { tabel: name, kolom };
      });

      return { success: true, soalId: challengeId, level, schema };
    },
    {
      params: t.Object({ id: t.String() }),
      query: t.Object({
        level: t.Union([t.Literal("php_level"), t.Literal("db_level")]),
      }),
    }
  );
