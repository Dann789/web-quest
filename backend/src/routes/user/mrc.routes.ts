import { Elysia, t } from "elysia";
import { rateLimit } from "elysia-rate-limit";
import { MrcController } from "../../controllers/user/mrc.controller";

export const mrcRoutes = new Elysia({ prefix: "/api/mrc" })
    .get("/", () => MrcController.getMrcWords())

    // Rate limiter khusus untuk submit — kuesioner hanya perlu diisi 1x per sesi
    .use(
      rateLimit({
        scoping: "scoped",
        max: 5,
        duration: 300_000, // 5 menit
        errorResponse: new Response(
          JSON.stringify({
            success: false,
            message: "Terlalu banyak permintaan. Coba lagi dalam 5 menit.",
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

    .post("/submit-eval/:userId", ({ params: { userId }, body }) => MrcController.submitEvaluation(userId, body as any), {
       params: t.Object({
       userId: t.Numeric(),
      }),
      body: t.Object({
        mrcWordId: t.Array(t.Number()),
        reason: t.String(),
      }),
    });