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
            name: string;
            email: string;
            role: UserRole;
            totalXp: number;
            createdAt: Date;
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
    name: string;
    email: string;
    password: string;
    role?: UserRole;
}

export interface UpdateUserRequest {
    username?: string;
    name?: string;
    email?: string;
    password?: string;
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

// LEVEL TYPES
export interface UpdateLevelRequest {
    name?: string;
    xpRequired?: number;
    description?: string;
    iconUrl?: string;
}

// CHALLENGE TYPES
export interface CreateChallengeRequest {
    levelId: number;
    title: string;
    description: string;
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
    method: 'DRAG_AND_DROP' | 'CODING_MANUAL' | 'FIX_THE_BUG' | 'SCENARIO_BASED' | 'MICRO_CHALLENGE_CHAIN';
    idealTime: number;
    xpBase: number;
    validationRules: object;
    isActive?: boolean;
}

export interface UpdateChallengeRequest {
    levelId?: number;
    title?: string;
    description?: string;
    difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
    method?: 'DRAG_AND_DROP' | 'CODING_MANUAL' | 'FIX_THE_BUG' | 'SCENARIO_BASED' | 'MICRO_CHALLENGE_CHAIN';
    idealTime?: number;
    xpBase?: number;
    validationRules?: object;
    isActive?: boolean;
}

// CHALLENGE VARIANT TYPES
export interface CreateVariantRequest {
    challengeId: number;
    questionContent: string;
    starterCode?: string;
    correctAnswer?: string;
    testCases?: object;
    difficultyWeight?: number;
}

export interface UpdateVariantRequest {
    questionContent?: string;
    starterCode?: string;
    correctAnswer?: string;
    testCases?: object;
    difficultyWeight?: number;
}

// CHALLENGE ATTEMPT TYPES
export interface SubmitAnswerRequest {
    challengeId: number;
    variantId: number;
    answerCode: string;
    timeSpent: number;
}
