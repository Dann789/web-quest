import { ChallengeMethod, UserRole } from "@prisma/client";

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

export interface RegisterRequest {
  name: string;
  username: string;
  email: string;
  password: string;
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
  order: number;
}

export interface UpdateMaterialRequest {
  levelId?: number;
  title?: string;
  content?: string;
  order?: number;
}

// LEVEL TYPES
export interface CreateLevelRequest {
  name: string;
  xpRequired: number;
  description: string;
  iconName: string;
  easyNodes: number;
  mediumNodes: number;
  hardNodes: number;
}

export interface UpdateLevelRequest {
  name?: string;
  xpRequired?: number;
  description?: string;
  iconName?: string;
  easyNodes?: number;
  mediumNodes?: number;
  hardNodes?: number;
}

// Assignment Types
export interface CreateAssignmentRequest {
  userId: number;
  levelId: number;
  challengeId: number;
  nodeSlot: number;
  isCompleted: boolean;
}

export interface UpdateAssignmentRequest {
  userId?: number;
  levelId?: number;
  challengeId?: number;
  nodeSlot?: number;
  isCompleted?: boolean;
}

export interface CreateAttemptRequest {
  userId: number;
  assignmentId: number;
  challengeId: number;
  isFirstAttempt: boolean;
  timeSpent: number;
  xpEarned: number;
}

// CHALLENGE TYPES

export interface CreateChallengeRequest {
  levelId: number;
  title: string;
  description: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  method: "DRAG_AND_DROP" | "CODING_MANUAL" | "FIX_THE_BUG";
  idealTime: number;
  xpBase: number;
  hint?: string | null;
  isActive?: boolean;

  // Field spesifik per metode (backend yang build JSON)
  starterCode?: string | null; // CODING_MANUAL: kode awal
  correctAnswer?: string | null; // CODING_MANUAL & FIX_THE_BUG: kunci jawaban
  buggyCode?: string | null; // FIX_THE_BUG: kode yang sengaja salah
  blocks?: string[] | null; // DRAG_AND_DROP: blok acak
  expectedOrder?: string[] | null; // DRAG_AND_DROP: urutan benar

  // Properti Sandbox (disimpan di kolom content)
  sandboxEnabled?: boolean;
  sandboxTemplate?: string | null;
  sandboxLevel?: string | null;
}

export interface UpdateChallengeRequest {
  levelId?: number;
  title?: string;
  description?: string;
  difficulty?: "EASY" | "MEDIUM" | "HARD";
  method?: "DRAG_AND_DROP" | "CODING_MANUAL" | "FIX_THE_BUG";
  idealTime?: number;
  xpBase?: number;
  hint?: string | null;
  isActive?: boolean;

  // Field spesifik per metode
  starterCode?: string | null;
  correctAnswer?: string | null;
  buggyCode?: string | null;
  blocks?: string[] | null;
  expectedOrder?: string[] | null;

  // Properti Sandbox
  sandboxEnabled?: boolean;
  sandboxTemplate?: string | null;
  sandboxLevel?: string | null;
}

// // CHALLENGE ATTEMPT TYPES
export interface SubmitAnswerRequest {
  assignmentId: number;
  challengeId: number;
  method: ChallengeMethod;
  answerCode: string; // Untuk CODING_MANUAL & FIX_THE_BUG: kode user. Untuk DRAG_AND_DROP: JSON array urutan blok
  timeSpent: number; // detik, dari timer di frontend
}

export interface SubmitEvaluationRequest {
  mrcWordId: number[];
  reason: string;
}
