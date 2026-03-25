import { Elysia, t } from "elysia";
import { ChallengeAttemptController } from "../../controllers/user/challenge.controller";
import { type SubmitAnswerRequest } from "../../types";

export const challengeAttemptRoutes = new Elysia({ prefix: "/api/user/challenges" })
  // Get random challenge for a level
  .get(":userId/:levelId/:nodeSlot", ({ params: { userId, levelId, nodeSlot } }) => 
    ChallengeAttemptController.getRandomChallenge(userId, levelId, nodeSlot), {
    params: t.Object({
      userId: t.Numeric(),
      levelId: t.Numeric(),
      nodeSlot: t.Numeric()
    })
  })

  // Submit answer
  // .post("/submit/:userId", ({ params: { userId }, body }) => 
  //   ChallengeAttemptController.submitAnswer(userId, body as SubmitAnswerRequest), {
  //   params: t.Object({
  //     userId: t.Numeric()
  //   }),
  //   body: t.Object({
  //     challengeId: t.Numeric(),
  //     variantId: t.Numeric(),
  //     answerCode: t.String({
  //       minLength: 1
  //     }),
  //     timeSpent: t.Numeric({
  //       minimum: 1
  //     })
  //   })
  // })

  // // Get attempt history
  // .get("/history/:userId", ({ params: { userId }, query }) => {
  //   const options: any = {};
  //   if (query.levelId) options.levelId = Number(query.levelId);
  //   if (query.limit) options.limit = Number(query.limit);
    
  //   return ChallengeAttemptController.getAttemptHistory(userId, options);
  // }, {
  //   params: t.Object({
  //     userId: t.Numeric()
  //   }),
  //   query: t.Object({
  //     levelId: t.Optional(t.String()),
  //     limit: t.Optional(t.String())
  //   })
  // })

  // // Get specific attempt
  // .get("/attempt/:userId/:attemptId", ({ params: { userId, attemptId } }) => 
  //   ChallengeAttemptController.getAttemptById(attemptId, userId), {
  //   params: t.Object({
  //     userId: t.Numeric(),
  //     attemptId: t.Numeric()
  //   })
  // });
