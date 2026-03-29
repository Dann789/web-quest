import { Elysia, t } from "elysia";
import { UserProgressController } from "../../controllers/user/progress.controller";

export const progressRoutes = new Elysia({ prefix: "/api/progress" })
  .get("/:userId/:levelId/complete-nodes", ({ params: { userId, levelId } }) => UserProgressController.getCompleteNodes(userId, levelId), {
    params: t.Object({
      userId: t.Numeric(),
      levelId: t.Numeric()
    })
  })
  .get("/:userId/:levelId/complete-materials", ({ params: { userId, levelId } }) => UserProgressController.getMaterialProgress(userId, levelId), {
    params: t.Object({
      userId: t.Numeric(),
      levelId: t.Numeric()
    })
  })
