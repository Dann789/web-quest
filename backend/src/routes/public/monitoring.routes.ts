import { Elysia, t } from "elysia";
import { rateLimit } from "elysia-rate-limit";
import { MonitoringController } from "../../controllers/public/monitoring.controller";

export const monitoringRoutes = new Elysia({ prefix: "/monitoring" })
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
    .get("/current-progress", async ({ query: { page, limit } }) => {
        return MonitoringController.getCurrentProgress(Number(page ?? 1), Number(limit ?? 10));
    }, {
        query: t.Object({
            page: t.Optional(t.Numeric()),
            limit: t.Optional(t.Numeric())
        })
    });