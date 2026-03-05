// ============================================
// USER TYPES
// ============================================

export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  totalXp: number;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'ADMIN' | 'DOSEN' | 'USER';

// ============================================
// AUTH TYPES
// ============================================

export interface LoginRequest {
  username: string;
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
  description?: string;
  iconUrl?: string;
}

export interface UserProgress {
  id: number;
  levelId: number;
  isUnlocked: boolean;
  materialsCompleted: number;
  challengesCompleted: number;
  totalXpEarned: number;
  progressPercentage: number;
}

// ============================================
// CHALLENGE TYPES
// ============================================

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export type ChallengeMethod = 
  | 'DRAG_AND_DROP' 
  | 'CODING_MANUAL' 
  | 'FIX_THE_BUG' 

export interface Challenge {
  id: number;
  levelId: number;
  title: string;
  description: string;
  difficulty: Difficulty;
  method: ChallengeMethod;
  idealTime: number;
  xpBase: number;
}

// ============================================
// MATERIAL TYPES
// ============================================

export interface Material {
  id: number;
  levelId: number;
  title: string;
  content: string;
  xpReward: number;
  order: number;
}

// ============================================
// BADGE TYPES
// ============================================

export type BadgeRarity = 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';

export interface Badge {
  id: number;
  name: string;
  description: string;
  iconUrl: string;
  rarity: BadgeRarity;
}

export interface UserBadge {
  id: number;
  badge: Badge;
  earnedAt: string;
}

// ============================================
// LEADERBOARD TYPES
// ============================================

export interface LeaderboardEntry {
  rank: number;
  userId: number;
  username: string;
  totalXp: number;
  totalTime: number;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}
