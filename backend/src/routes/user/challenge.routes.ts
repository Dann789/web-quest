import { Elysia, t } from "elysia";
import { ChallengeAttemptController } from "../../controllers/user/challenge.controller";
import { PhpRunnerController } from "../../controllers/user/phpRunner.controller";
import { SqlRunnerController } from "../../controllers/user/sqlRunner.controller";

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
      userId: t.Numeric(),
      templateName: t.String(),
      level: t.Literal("db_level")
    })
  })

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
