import type { ApiResponse, User, UserRole } from '@/types';

// Base API URL
const API_BASE = '/api';

/**
 * Get auth token from localStorage
 */
function getAuthToken(): string | null {
  return localStorage.getItem('web_quest_token');
}

/**
 * Create headers with auth token
 */
function createHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
}

// ============================================
// USER CRUD OPERATIONS
// ============================================

export interface CreateUserData {
  username: string;
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface UpdateUserData {
  username?: string;
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
}

/**
 * Get all users
 */
export async function getUsers(): Promise<ApiResponse<User[]>> {
  try {
    const response = await fetch(`${API_BASE}/api/users`, {
      method: 'GET',
      headers: createHeaders(),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    return {
      success: false,
      message: 'Network error. Please try again.',
    };
  }
}

export interface ActiveStudentData {
  todayCount: number;
  weeklyChart: { day: string; users: number }[];
}

/**
 * Get active students today
 */
export async function getActiveStudentsToday(): Promise<ApiResponse<ActiveStudentData>> {
  try {
    const response = await fetch(`${API_BASE}/api/users/active-today`, {
      method: 'GET',
      headers: createHeaders(),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching active students:', error);
    return {
      success: false,
      message: 'Network error. Please try again.',
      data: {
        todayCount: 0,
        weeklyChart: []
      }
    };
  }
}

export async function getNewStudentThisWeek(): Promise<ApiResponse<number>> {
  try {
    const response = await fetch(`${API_BASE}/api/users/new-user`, {
      method: 'GET',
      headers: createHeaders(),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching new students:', error);
    return {
      success: false,
      message: 'Network error. Please try again.',
      data: 0
    };
  }
}

/**
 * Get user by ID
 */
export async function getUserById(id: number): Promise<ApiResponse<User>> {
  try {
    const response = await fetch(`${API_BASE}/api/users/${id}`, {
      method: 'GET',
      headers: createHeaders(),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    return {
      success: false,
      message: 'Network error. Please try again.',
    };
  }
}

/**
 * Create new user
 */
export async function createUser(data: CreateUserData): Promise<ApiResponse<User>> {
  try {
    const response = await fetch(`${API_BASE}/api/users`, {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify(data),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error creating user:', error);
    return {
      success: false,
      message: 'Network error. Please try again.',
    };
  }
}

/**
 * Update existing user
 */
export async function updateUser(id: number, data: UpdateUserData): Promise<ApiResponse<User>> {
  try {
    const response = await fetch(`${API_BASE}/api/users/${id}`, {
      method: 'PATCH',
      headers: createHeaders(),
      body: JSON.stringify(data),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error updating user:', error);
    return {
      success: false,
      message: 'Network error. Please try again.',
    };
  }
}

/**
 * Delete user
 */
export async function deleteUser(id: number): Promise<ApiResponse<null>> {
  try {
    const response = await fetch(`${API_BASE}/api/users/${id}`, {
      method: 'DELETE',
      headers: createHeaders(),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting user:', error);
    return {
      success: false,
      message: 'Network error. Please try again.',
    };
  }
}
