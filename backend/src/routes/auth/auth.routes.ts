import { Elysia, t } from "elysia";
import { rateLimit } from "elysia-rate-limit";
import { jwtPlugin } from "../../plugins/jwt.plugin";
import { AuthController } from "../../controllers/auth/auth.controller";
import type { JWTPayload, RegisterRequest } from "../../types";
import { UserRole } from "@prisma/client";

/*
 * Ekstrak field JWTPayload dari hasil jwt.verify() secara aman.
 * jwt.verify() mengembalikan JWTPayloadSpec (iat, exp, dll) yang digabung dengan payload kustom.
 */
function extractJwtPayload(verified: Record<string, unknown>): JWTPayload | null {
  const { id, username, role } = verified;
  if (
    typeof id !== "number" ||
    typeof username !== "string" ||
    typeof role !== "string" ||
    !Object.values(UserRole).includes(role as UserRole)
  ) {
    return null;
  }
  return { id, username, role: role as UserRole };
}

export const authRoutes = new Elysia({ prefix: "/api/auth" })
  .use(
    rateLimit({
      scoping: "scoped",
      max: 10,
      duration: 60_000,
      errorResponse: new Response(
        JSON.stringify({
          success: false,
          message: "Terlalu banyak permintaan. Coba lagi dalam 1 menit.",
        }),
        { status: 429, headers: { "Content-Type": "application/json" } },
      ),
      generator: (req, server) => {
        // Fallback manual agar tidak muncul warning saat server belum ter-inject sempurna
        const ip = server?.requestIP?.(req)?.address;
        if (ip) return ip;
        return req.headers.get("x-forwarded-for") || "127.0.0.1";
      },
    }),
  )
  .use(jwtPlugin)


  // POST /api/auth/login
  .post(
    "/login",
    async ({ body, jwt, set }) => {
      const result = await AuthController.login(
        body,
        (payload: JWTPayload) => jwt.sign({ id: payload.id, username: payload.username, role: payload.role }),
      );

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

  .post(
    "/register",
    async ({ body, jwt, set }) => {
      const result = await AuthController.register(
        body as RegisterRequest,
        (payload: JWTPayload) => jwt.sign({ id: payload.id, username: payload.username, role: payload.role }),
      );

      if (!result.success) {
        set.status = 400;
      }

      return result;
    },
    {
      body: t.Object({
        username: t.String({
          minLength: 10,
          maxLength: 30,
        }),
        name: t.String({
          minLength: 5,
          maxLength: 100,
        }),
        email: t.String({
          format: "email",
          minLength: 6,
          maxLength: 100,
        }),
        password: t.String({
          minLength: 10,
          maxLength: 16,
        }),
      }),
      detail: {
        summary: "User registration",
        description:
          "Register a new user with name, username, email and password",
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

    const jwtUser = extractJwtPayload(payload as Record<string, unknown>);
    if (!jwtUser) {
      set.status = 401;
      throw new Error("Unauthorized: Invalid token payload");
    }

    return {
      user: jwtUser,
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
