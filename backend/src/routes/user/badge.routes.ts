import { Elysia, t } from "elysia";
import { UserBadgeController } from "../../controllers/user/badge.controller";

export const badgeRoutes = new Elysia({ prefix: "/api/user/badges" })
  // Get all available badges
  .get("/all", () => UserBadgeController.getAllBadges())

  // Get user's badges (earned and progress)
  .get("/:userId", ({ params: { userId } }) => UserBadgeController.getUserBadges(userId), {
    params: t.Object({
      userId: t.Numeric()
    })
  })

  // Check and award badges to user
  .post("/:userId/check", async ({ params: { userId } }) => {
    const awarded = await UserBadgeController.checkAndAwardBadges(userId);
    return {
      success: true,
      message: awarded.length > 0 ? "New badges awarded!" : "No new badges",
      data: {
        newBadges: awarded,
        count: awarded.length,
      },
    };
  }, {
    params: t.Object({
      userId: t.Numeric()
    })
  })

  // Award specific badge to user (for testing/admin)
  .post("/:userId/award/:badgeId", ({ params: { userId, badgeId } }) => 
    UserBadgeController.awardBadge(userId, badgeId), {
    params: t.Object({
      userId: t.Numeric(),
      badgeId: t.Numeric()
    })
  });
