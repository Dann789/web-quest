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

export type UserRole = 'ADMIN' | 'DOSEN' | 'MAHASISWA';

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
  content: string;
  starterCode: string;
  testCases: string;
  hint: string;
  isActive: boolean;
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
