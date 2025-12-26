import prisma from "../config/database";
import { type LoginRequest, type LoginResponse, type JWTPayload } from "../types";

export class AuthController {
    /**
   * Login user with email and password
   */
    static async login(
        credentials: LoginRequest,
        jwtSign: (payload: JWTPayload) => Promise<string>
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
                    email: true,
                    password: true,
                    role: true,
                    totalXp: true,
                },
            });

            if (!user) {
                return {
                    success: false,
                    message: "Invalid email or password",
                };
            }
            // Verify password using Bun's built-in password verification
            const isValidPassword = await Bun.password.verify(password, user.password);

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

            // Log login activity
            await prisma.activityLog.create({
                data: {
                    userId: user.id,
                    actionType: "LOGIN",
                    details: {
                        description: `User ${user.username} logged in`,
                        ipAddress: null, // TODO: Get from request if needed
                    },
                },
            });

            return {
                success: true,
                message: "Login successful",
                data: {
                    token,
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        role: user.role,
                        totalXp: user.totalXp,
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
                    username: true,
                    email: true,
                    role: true,
                    totalXp: true,
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
            // Log logout activity
            await prisma.activityLog.create({
                data: {
                    userId,
                    actionType: "LOGOUT",
                    details: {
                        description: `User ${username} logged out`,
                        ipAddress: null, // TODO: Get from request if needed
                    },
                },
            });

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
}
