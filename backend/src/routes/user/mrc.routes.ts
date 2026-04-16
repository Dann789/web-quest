import { Elysia, t } from "elysia";
import { MrcController } from "../../controllers/user/mrc.controller";

export const mrcRoutes = new Elysia({ prefix: "/api/mrc" })
    .get("/", () => MrcController.getMrcWords())

    .post("/submit-eval/:userId", ({ params: { userId }, body }) => MrcController.submitEvaluation(userId, body as any), {
       params: t.Object({
       userId: t.Numeric(),
      }),
      body: t.Object({
        mrcWordId: t.Array(t.Number()),
        reason: t.String(),
      }),
    });