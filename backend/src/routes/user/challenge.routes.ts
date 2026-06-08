import { Elysia, t } from "elysia";
import { rateLimit } from "elysia-rate-limit";
import { ChallengeAttemptController } from "../../controllers/user/challenge.controller";
import { PhpRunnerController } from "../../controllers/user/phpRunner.controller";
import { SqlRunnerController } from "../../controllers/user/sqlRunner.controller";

const runnerErrorResponse = new Response(
  JSON.stringify({
    success: false,
    message: "Terlalu banyak permintaan. Coba lagi dalam 1 menit.",
  }),
  { status: 429, headers: { "Content-Type": "application/json" } },
);

// Sub-router dengan rate limiter khusus untuk endpoint code runner
const runnerRoutes = new Elysia()
  .use(
    rateLimit({
      scoping: "scoped",
      max: 25,
      duration: 60_000,
      errorResponse: runnerErrorResponse,
      generator: (req, server) => {
        const ip = server?.requestIP?.(req)?.address;
        if (ip) return ip;
        return req.headers.get("x-forwarded-for") || "127.0.0.1";
      },
    }),
  )

  // POST — jalankan kode PHP (Preview)
  .post("/run-php", ({ body }) =>
    PhpRunnerController.run(body as any), {
    body: t.Object({
      codes: t.Record(t.String(), t.String()),
      userId: t.Optional(t.Numeric()),
      templateName: t.Optional(t.String()),
      level: t.Optional(t.Union([t.Literal("php_level"), t.Literal("db_level")])),
      sandboxEnabled: t.Optional(t.Boolean())
    })
  })

  // POST — jalankan query SQL (Preview)
  .post("/run-sql", ({ body }) =>
    SqlRunnerController.run(body as any), {
    body: t.Object({
      sql: t.String(),
      userId: t.Optional(t.Numeric()),
      templateName: t.Optional(t.String()),
      level: t.Optional(t.Literal("db_level"))
    })
  });

export const challengeAttemptRoutes = new Elysia({ prefix: "/api/user/challenges" })
  // GET — ambil soal berdasarkan userId, levelId, nodeSlot
  .get(":userId/:levelId/:nodeSlot", ({ params: { userId, levelId, nodeSlot } }) =>
    ChallengeAttemptController.getRandomChallenge(userId, levelId, nodeSlot), {
    params: t.Object({
      userId: t.Numeric(),
      levelId: t.Numeric(),
      nodeSlot: t.Numeric(),
    }),
  })

  // Gabungkan runner routes (dengan rate limiter)
  .use(runnerRoutes)

  // POST — submit & validasi jawaban
  .post("/submit/:userId", ({ params: { userId }, body }) =>
    ChallengeAttemptController.submitAnswer(userId, body as any), {
    params: t.Object({
      userId: t.Numeric(),
    }),
    body: t.Object({
      assignmentId: t.Numeric(),
      challengeId: t.Numeric(),
      method: t.String(),
      answerCode: t.String(),
      timeSpent: t.Numeric(),
    }),
  });
