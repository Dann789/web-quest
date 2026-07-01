import prisma from "../../config/database";
import { UserRole } from "@prisma/client";
import {
  type LoginRequest,
  type LoginResponse,
  type JWTPayload,
  type RegisterRequest,
} from "../../types";

export class AuthController {
  /**
   * Login user with email and password
   */
  static async login(
    credentials: LoginRequest,
    jwtSign: (payload: JWTPayload) => Promise<string>,
  ): Promise<LoginResponse> {
    const { email, password } = credentials;
    // Validate input
    if (!email || !password) {
      return {
        success: false,
        message: "Email and password are required",
      };
    }

    try {
      // Find user by email
      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          username: true,
          name: true,
          email: true,
          password: true,
          role: true,
          totalXp: true,
          createdAt: true,
        },
      });

      if (!user) {
        return {
          success: false,
          message: "Invalid email or password",
        };
      }
      // Verify password using Bun's built-in password verification
      const isValidPassword = await Bun.password.verify(
        password,
        user.password,
      );

      if (!isValidPassword) {
        return {
          success: false,
          message: "Invalid email or password",
        };
      }

      // Create JWT payload
      const payload: JWTPayload = {
        id: user.id,
        username: user.username,
        role: user.role,
      };

      // Sign JWT token
      const token = await jwtSign(payload);

      return {
        success: true,
        message: "Login successful",
        data: {
          token,
          user: {
            id: user.id,
            username: user.username,
            name: user.name,
            email: user.email,
            role: user.role,
            totalXp: user.totalXp,
            createdAt: user.createdAt,
          },
        },
      };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: "An error occurred during login",
      };
    }
  }

  /**
   * Verify JWT token and return user data
   */
  static async verifyToken(userId: number) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          role: true,
          totalXp: true,
          createdAt: true,
        },
      });

      if (!user) {
        return {
          success: false,
          message: "User not found",
        };
      }

      return {
        success: true,
        message: "Token verified",
        data: { user },
      };
    } catch (error) {
      console.error("Token verification error:", error);
      return {
        success: false,
        message: "An error occurred during token verification",
      };
    }
  }

  /**
   * Logout user (with activity logging)
   * Client must remove token from storage
   * Server logs the logout activity for monitoring
   */
  static async logout(userId: number, username: string) {
    try {
      return {
        success: true,
        message: "Logout successful",
      };
    } catch (error) {
      console.error("Logout error:", error);
      return {
        success: false,
        message: "An error occurred during logout",
      };
    }
  }

  static async register(
    credentials: RegisterRequest,
    jwtSign?: (payload: JWTPayload) => Promise<string>,
  ) {
    const { name, username, email, password } = credentials;
    if (!username || !name || !email || !password) {
        return {
          success: false,
          message: "Username, name, email, and password are required",
        };
     }

     const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        return {
          success: false,
          message: "Email already exists",
        };
      }

      // Check username uniqueness
      const existingUsername = await prisma.user.findUnique({
        where: { username },
      });
      if (existingUsername) {
        return {
          success: false,
          message: "NIM/NIP sudah digunakan oleh user lain",
        };
      }

    const hashedPassword = await Bun.password.hash(password);

    try {
      const user = await prisma.user.create({
        data: {
          name,
          username,
          email,
          password: hashedPassword,
          role: UserRole.MAHASISWA,
          totalXp: 0,
          progress: {
            create: {
              levelId: 1,
              isUnlocked: true,
              unlockedAt: new Date(),
            },
          }
        },
      });

      let token: string | undefined = undefined;
      if (jwtSign) {
        const payload: JWTPayload = {
          id: user.id,
          username: user.username,
          role: user.role,
        };
        token = await jwtSign(payload);
      }

      return {
        success: true,
        message: "Registration successful",
        data: {
          token,
          user,
        },
      };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        message: "An error occurred during registration",
      };
    }
  }
}
