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
  .post("/:userId/:materialId/add-progress", ({ params: { userId, materialId } }) => UserProgressController.addProgressMaterial(userId, materialId), {
    params: t.Object({
      userId: t.Numeric(),
      materialId: t.Numeric()
    })
  })
  .put("/:userId/:materialId/update-status", ({ params: { userId, materialId } }) => UserProgressController.updateStatusMaterial(userId, materialId), {
    params: t.Object({
      userId: t.Numeric(),
      materialId: t.Numeric()
    })
  })
  .get("/:userId/:levelId/progress-percentage", ({ params: { userId, levelId } }) => UserProgressController.getProgressLevel(userId, levelId), {
    params: t.Object({
      userId: t.Numeric(),
      levelId: t.Numeric()
    })
  })
  .get("/:userId/complete-challenges", ({ params: { userId } }) => UserProgressController.getCompletedChallenge(userId), {
    params: t.Object({
      userId: t.Numeric()
    })
  })
  .get("/:userId/summary", ({ params: { userId } }) => UserProgressController.getUserSummary(userId), {
    params: t.Object({
      userId: t.Numeric()
    })
  });
