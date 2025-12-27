import { UserRole } from "@prisma/client";


// AUTH TYPES
export interface JWTPayload {
    id: number;
    username: string;
    role: UserRole;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    data?: {
        token: string;
        user: {
            id: number;
            username: string;
            email: string;
            role: UserRole;
            totalXp: number;
        };
    };
}

export interface AuthError {
    success: false;
    message: string;
}

// API RESPONSE TYPES
export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
}

// CONTEXT TYPES (for Elysia)
export interface AuthContext {
    user: JWTPayload;
}

export interface CreateUserRequest {
    username: string;
    email: string;
    password: string;
    role?: UserRole;
}

export interface UpdateUserRequest {
    username?: string;
    email?: string;
    role?: UserRole;
}

// MATERIAL TYPES
export interface CreateMaterialRequest {
    levelId: number;
    title: string;
    content: string;
    xpReward: number;
    order: number;
}

export interface UpdateMaterialRequest {
    levelId?: number;
    title?: string;
    content?: string;
    xpReward?: number;
    order?: number;
}
