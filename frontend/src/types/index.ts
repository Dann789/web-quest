// ============================================
// USER TYPES
// ============================================

export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  role: UserRole;
  totalXp: number;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = "ADMIN" | "DOSEN" | "MAHASISWA";

// ============================================
// AUTH TYPES
// ============================================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    token: string;
  };
}

export interface RegisterRequest {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// ============================================
// LEVEL & PROGRESS TYPES
// ============================================

export interface Level {
  id: number;
  name: string;
  order: number;
  xpRequired: number;
  description: string;
  iconName: string;
}

export type LevelCompletionItem = {
  levelId: number;
  levelName: string;
  completedCount: number;
};

export interface Progress {
  id: number;
  userId: number;
  levelId: number;
  isUnlocked: boolean;
}

export interface MaterialProgress {
  id: number;
  userId: number;
  materialId: number;
  isCompleted: boolean;
}

export interface Assignment {
  id: number;
  userId: number;
  levelId: number;
  nodeSlot: number;
  challengeId: number;
  isCompleted: boolean;
}

// ============================================
// CHALLENGE TYPES
// ============================================

export type Difficulty = "EASY" | "MEDIUM" | "HARD";

export type ChallengeMethod = "DRAG_AND_DROP" | "CODING_MANUAL" | "FIX_THE_BUG";

export interface Challenge {
  id: number;
  levelId: number;
  title: string;
  description: string;
  difficulty: Difficulty;
  method: ChallengeMethod;
  idealTime: number;
  xpBase: number;
  content: any; // Prisma Json column → bisa object atau null
  starterCode: string | null;
  testCases: any; // Prisma Json column → bisa object atau null
  hint: string | null;
  isActive: boolean;
}

export interface ChallengeNodeData {
  assignmentId: number;
  isCompleted: boolean;
  challenge: Challenge;
}

export interface DragItem {
  id: string;
  content: string;
}

export interface Attempt {
  id: number;
  userId: number;
  assignmentId: number;
  challengeId: number;
  isFirstAttempt: boolean;
  timeSpent: number;
  xpEarned: number;
}

export interface SubmitAnswerPayload {
  assignmentId: number;
  challengeId: number;
  method: ChallengeMethod;
  answerCode: string;
  timeSpent: number;
}

export interface SubmitAnswerResult {
  isCorrect: boolean;
  xpEarned: number;
  attemptId: number;
  isFirstAttempt: boolean;
  overTime: boolean;
}

// ============================================
// MATERIAL TYPES
// ============================================

export interface Material {
  id: number;
  levelId: number;
  title: string;
  content: string;
  order: number;
}

// ============================================
// BADGE TYPES
// ============================================

export type BadgeRarity = "COMMON" | "RARE" | "EPIC" | "LEGENDARY";

export interface BadgeItem {
  id: number;
  name: string;
  description: string;
  iconPath: string;
  rarity: BadgeRarity;
}

export interface UserBadge {
  id: number;
  badge: BadgeItem;
  earnedAt: string;
}

// ============================================
// LEADERBOARD TYPES
// ============================================

export interface LeaderboardItem {
  id: number;
  rank: number;
  name: string;
  avatar: string;
  totalXp: number;
  totalTimeSpent: number;
  isMe: boolean;
}

export interface DashboardStats {
  totalMahasiswa: number;
  totalLevel: number;
  totalChallenge: number;
}

export interface LeaderboardDisplayItem {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
}

export interface LevelChartItem {
  name: string;
  value: number;
  originalLevelName: string;
  color: string;
}

export interface mrcWords {
  id: number;
  word: string;
  translate: string;
  description: string;
}

export interface reason {
  id: number;
  userId: number;
  reason_text: string;
}

export interface SubmitEvaluation {
  mrcWordId: number[];
  reason: string;
} 

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}
