import { Elysia, t } from "elysia";
import { rateLimit } from "elysia-rate-limit";
import { LeaderboardController } from "../../controllers/public/leaderboard.controller";

export const leaderboardRoutes = new Elysia({ prefix: "/api/leaderboard" })
  .use(
    rateLimit({
      scoping: "scoped",
      max: 30,
      duration: 60_000,
      errorResponse: new Response(
        JSON.stringify({
          success: false,
          message: "Terlalu banyak permintaan. Coba lagi dalam 1 menit.",
        }),
        { status: 429, headers: { "Content-Type": "application/json" } },
      ),
      generator: (req, server) => {
        const ip = server?.requestIP?.(req)?.address;
        if (ip) return ip;
        return req.headers.get("x-forwarded-for") || "127.0.0.1";
      },
    }),
  )
  .get(
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
