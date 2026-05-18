import { Elysia, t } from "elysia";
import { MonitoringController } from "../../controllers/public/monitoring.controller";

export const monitoringRoutes = new Elysia({ prefix: "/monitoring" })
    .get("/current-progress", async ({ query: { page, limit } }) => {
        return MonitoringController.getCurrentProgress(Number(page ?? 1), Number(limit ?? 10));
    }, {
        query: t.Object({
            page: t.Optional(t.Numeric()),
            limit: t.Optional(t.Numeric())
        })
    });