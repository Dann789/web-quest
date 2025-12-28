import { Elysia, t } from "elysia";
import { LeaderboardController } from "../../controllers/user/leaderboard.controller";

export const leaderboardRoutes = new Elysia({ prefix: "/api/leaderboard" })
  // Get global leaderboard
  .get("/", ({ query }) => {
    const options: any = {};
    if (query.limit) options.limit = Number(query.limit);
    if (query.offset) options.offset = Number(query.offset);
    
    return LeaderboardController.getGlobalLeaderboard(options);
  }, {
    query: t.Object({
      limit: t.Optional(t.String()),
      offset: t.Optional(t.String())
    })
  })

  // Get top performers (for dashboard)
  .get("/top", ({ query }) => {
    const limit = query.limit ? Number(query.limit) : 5;
    return LeaderboardController.getTopPerformers(limit);
  }, {
    query: t.Object({
      limit: t.Optional(t.String())
    })
  })

  // Get leaderboard for specific level
  .get("/level/:levelId", ({ params: { levelId }, query }) => {
    const options: any = {};
    if (query.limit) options.limit = Number(query.limit);
    
    return LeaderboardController.getLevelLeaderboard(levelId, options);
  }, {
    params: t.Object({
      levelId: t.Numeric()
    }),
    query: t.Object({
      limit: t.Optional(t.String())
    })
  })

  // Get user's rank
  .get("/rank/:userId", ({ params: { userId } }) => LeaderboardController.getUserRank(userId), {
    params: t.Object({
      userId: t.Numeric()
    })
  });
