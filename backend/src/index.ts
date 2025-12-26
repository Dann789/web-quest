import { Elysia } from "elysia";
import { corsPlugin } from "./plugins/cors.plugin";
import { authRoutes } from "./routes/auth.routes";

const app = new Elysia()
  .use(corsPlugin)
  .use(authRoutes)
  .get("/", () => ({
    message: "🚀 Web Quest API - Gamification Learning Platform",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      admin: "/api/admin",
      user: "/api/user",
    }
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

console.log(`🚀 Web Quest API running at http://localhost:3000`);
console.log(`📚 Environment: ${process.env.NODE_ENV || "development"}`);
