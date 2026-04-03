import { Elysia, t } from "elysia";
import { LeaderboardController } from "../../controllers/public/leaderboard.controller";

export const leaderboardRoutes = new Elysia({ prefix: "/api/leaderboard" }).get(
  "/:timeframe",
  ({ params: { timeframe } }) =>
    LeaderboardController.getLeaderboardData(timeframe),
  {
    params: t.Object({
      timeframe: t.String(),
    }),
  },
);
