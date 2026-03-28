import { Elysia, t } from "elysia";
import { ChallengeAttemptController } from "../../controllers/user/challenge.controller";

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
