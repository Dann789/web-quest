import { Elysia, t } from "elysia";
import { UserBadgeController } from "../../controllers/user/badge.controller";

export const badgeRoutes = new Elysia({ prefix: "/api/badges" })
  .get("/", () => UserBadgeController.getAllBadges())

  .get("/:userId", ({ params: { userId } }) => UserBadgeController.getUserBadges(userId), {
    params: t.Object({
      userId: t.Numeric()
    })
  })

  .post("/:badgeId/:userId", ({ params: { badgeId, userId} }) => UserBadgeController.earnedBadge(userId, badgeId), {
    params: t.Object({
      userId: t.Numeric(),
      badgeId: t.Numeric()
    })
  });
