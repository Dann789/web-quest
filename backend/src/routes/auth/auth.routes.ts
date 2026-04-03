import { Elysia, t } from "elysia";
import { jwtPlugin } from "../../plugins/jwt.plugin";
import { AuthController } from "../../controllers/auth/auth.controller";
import type { JWTPayload } from "../../types";

export const authRoutes = new Elysia({ prefix: "/api/auth" })
  .use(jwtPlugin)

  // POST /api/auth/login
  .post(
    "/login",
    async ({ body, jwt, set }) => {
      const result = await AuthController.login(body, jwt.sign);

      if (!result.success) {
        set.status = 401;
      }

      return result;
    },
    {
      body: t.Object({
        email: t.String({ format: "email", maxLength: 100 }),
        password: t.String({ minLength: 6 }),
      }),
      detail: {
        summary: "User login",
        description: "Login with email and password to get JWT token",
        tags: ["Authentication"],
      },
    },
  )

  // GET /api/auth/me (Protected route)
  .derive(async ({ headers, jwt, set }) => {
    const authHeader = headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      set.status = 401;
      throw new Error("Unauthorized: No token provided");
    }

    const token = authHeader.split(" ")[1];
    const payload = await jwt.verify(token);

    if (!payload) {
      set.status = 401;
      throw new Error("Unauthorized: Invalid token");
    }

    return {
      user: payload as JWTPayload,
    };
  })
  .get(
    "/me",
    async ({ user, set }) => {
      const result = await AuthController.verifyToken(user.id);

      if (!result.success) {
        set.status = 404;
      }

      return result;
    },
    {
      detail: {
        summary: "Get current user",
        description: "Get current authenticated user data from JWT token",
        tags: ["Authentication"],
      },
    },
  )

  // POST /api/auth/logout (Protected route)
  .post(
    "/logout",
    async ({ user, set }) => {
      const result = await AuthController.logout(user.id, user.username);

      if (!result.success) {
        set.status = 500;
      }

      return result;
    },
    {
      detail: {
        summary: "User logout",
        description:
          "Logout user and log activity. Client must remove token after this.",
        tags: ["Authentication"],
      },
    },
  );
