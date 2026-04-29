import { Elysia } from "elysia";
import { corsPlugin } from "./plugins/cors.plugin";
import { authRoutes } from "./routes/auth/auth.routes";
import { userRoutes } from "./routes/admin/user.routes";
import { materialRoutes } from "./routes/dosen/material.routes";
import { levelRoutes } from "./routes/dosen/level.routes";
import { challengeRoutes } from "./routes/dosen/challenge.routes";
import { progressRoutes } from "./routes/user/progress.routes";
import { challengeAttemptRoutes } from "./routes/user/challenge.routes";
import { badgeRoutes } from "./routes/user/badge.routes";
import { leaderboardRoutes } from "./routes/public/leaderboard.routes";
import { mrcRoutes } from "./routes/user/mrc.routes";
import { monitoringRoutes } from "./routes/public/monitoring.routes";

const app = new Elysia()
  .use(corsPlugin)
  .use(authRoutes)
  .use(userRoutes)
  .use(materialRoutes)
  .use(levelRoutes)
  .use(challengeRoutes)
  .use(progressRoutes)
  .use(challengeAttemptRoutes)
  .use(badgeRoutes)
  .use(leaderboardRoutes)
  .use(mrcRoutes)
  .use(monitoringRoutes)
  .get("/", () => ({
    message: "Web Quest API - Gamification Learning Platform",
    version: "1.0.0",
  }))
  .onError(({ code, error, set }) => {
    console.error(`[${code}] ${error}`);

    if (code === "NOT_FOUND") {
      set.status = 404;
      return {
        success: false,
        message: "Route not found",
      };
    }

    if (code === "VALIDATION") {
      set.status = 400;
      return {
        success: false,
        message: "Validation error",
        error: error,
      };
    }

    set.status = 500;
    return {
      success: false,
      message: error || "Internal server error",
    };
  })
  .listen(3000);

console.log(` Web Quest API running at http://localhost:3000`);
console.log(` Environment: ${process.env.NODE_ENV || "development"}`);
