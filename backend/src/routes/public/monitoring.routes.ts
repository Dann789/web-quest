import { Elysia } from "elysia";
import { MonitoringController } from "../../controllers/public/monitoring.controller";

export const monitoringRoutes = new Elysia({ prefix: "/monitoring" })
    .get("/current-progress", async () => {
        return MonitoringController.getCurrentProgress();
    });