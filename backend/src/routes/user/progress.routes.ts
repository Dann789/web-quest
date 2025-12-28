import { Elysia, t } from "elysia";
import { UserProgressController } from "../../controllers/user/progress.controller";

export const progressRoutes = new Elysia({ prefix: "/api/user/progress" })
  // Initialize progress for user (first time)
  .post("/initialize/:userId", ({ params: { userId } }) => UserProgressController.initializeProgress(userId), {
    params: t.Object({
      userId: t.Numeric()
    })
  })

  // Get overall progress
  .get("/:userId", ({ params: { userId } }) => UserProgressController.getOverallProgress(userId), {
    params: t.Object({
      userId: t.Numeric()
    })
  })

  // Get progress for specific level
  .get("/:userId/level/:levelId", ({ params: { userId, levelId } }) => UserProgressController.getLevelProgress(userId, levelId), {
    params: t.Object({
      userId: t.Numeric(),
      levelId: t.Numeric()
    })
  })

  // Get unlocked levels
  .get("/:userId/unlocked", ({ params: { userId } }) => UserProgressController.getUnlockedLevels(userId), {
    params: t.Object({
      userId: t.Numeric()
    })
  })

  // Start reading a material
  .post("/:userId/materials/:materialId/start", ({ params: { userId, materialId } }) => UserProgressController.startMaterial(userId, materialId), {
    params: t.Object({
      userId: t.Numeric(),
      materialId: t.Numeric()
    })
  })

  // Complete a material
  .post("/:userId/materials/:materialId/complete", ({ params: { userId, materialId } }) => UserProgressController.completeMaterial(userId, materialId), {
    params: t.Object({
      userId: t.Numeric(),
      materialId: t.Numeric()
    })
  });
