import { Elysia, t } from "elysia";
import { LeaderboardController } from "../../controllers/public/leaderboard.controller";

export const leaderboardRoutes = new Elysia({ prefix: "/api/leaderboard" }).get(
  "/:timeframe",
  ({ params: { timeframe }, query: { page, limit } }) =>
    LeaderboardController.getLeaderboardData(timeframe, Number(page ?? 1), Number(limit ?? 10)),
  {
    params: t.Object({
      timeframe: t.String(),
    }),
    query: t.Object({
      page: t.Optional(t.Numeric()),
      limit: t.Optional(t.Numeric())
    })
  },
);
