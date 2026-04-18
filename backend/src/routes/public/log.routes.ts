import { Elysia } from "elysia";
import { LogController } from "../../controllers/public/log.controller";

export const logRoutes = new Elysia({ prefix: "/log" })
    .get("/current-progress", async () => {
        return LogController.getCurrentProgress();
    });