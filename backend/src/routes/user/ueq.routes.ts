import { Elysia, t } from "elysia";
import { rateLimit } from "elysia-rate-limit";
import { UeqController } from "../../controllers/user/ueq.controller";

export const ueqRoutes = new Elysia({
    prefix: '/api/ueq',
})
    .get("/", () => UeqController.getUeqQuestions())

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

    .post('/:userId', ({ params: { userId }, body }) => UeqController.submitUeq(Number(userId), body as any), {
        params: t.Object({
            userId: t.Numeric()
        }),
        body: t.Object({
            answer: t.Array(
                t.Object({
                    questionId: t.Number(),
                    value: t.Number()
                })
            )
        })
    });