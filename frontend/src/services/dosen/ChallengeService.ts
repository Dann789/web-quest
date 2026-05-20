import type { ApiResponse, Challenge, ChallengeMethod } from '@/types';

// Base API URL
const API_BASE = 'http://localhost:3000';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('web_quest_token');
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

export async function getChallenges(page: number = 1, limit: number = 10, levelId?: number, method?: ChallengeMethod): Promise<ApiResponse<Challenge[]>> {
  try {
    let url = `${API_BASE}/api/challenges?page=${page}&limit=${limit}`;
    if (levelId) url += `&levelId=${levelId}`;
    if (method) url += `&method=${method}`;
    
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: 'Failed to fetch challenges' };
  }
}

export async function getChallengesById(id: number): Promise<ApiResponse<Challenge>> {
  try {
    const response = await fetch(`${API_BASE}/api/challenges/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: 'Failed to fetch challenge' };
  }
}

export async function getChallengesByLevelId(levelId: number): Promise<ApiResponse<Challenge[]>> {
  try {
    const response = await fetch(`${API_BASE}/api/challenges/level/${levelId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: 'Failed to fetch challenges' };
  }
}

export async function getChallengesByMethod(method: ChallengeMethod): Promise<ApiResponse<Challenge[]>> {
  try {
    const response = await fetch(`${API_BASE}/api/challenges/method/${method}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: 'Failed to fetch challenges' };
  }
}

export async function createChallenge(challenge: Challenge): Promise<ApiResponse<Challenge>> {
  try {
    const response = await fetch(`${API_BASE}/api/challenges`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(challenge),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: 'Failed to create challenge' };
  }
}

export async function updateChallenge(id: number, challenge: Partial<Challenge>): Promise<ApiResponse<Challenge>> {
  try {
    const response = await fetch(`${API_BASE}/api/challenges/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(challenge),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: 'Failed to edit challenge' };
  }
}

export async function deleteChallenge(id: number): Promise<ApiResponse<void>> {
  try {
    const response = await fetch(`${API_BASE}/api/challenges/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: 'Failed to delete challenge' };
  }
}

/**
 * Mengambil SEMUA challenge (tanpa batasan pagination) untuk keperluan export.
 * Gunakan limit besar agar seluruh data terambil dalam satu request.
 */
export async function exportAllChallenges(): Promise<ApiResponse<Challenge[]>> {
  try {
    const response = await fetch(`${API_BASE}/api/challenges?page=1&limit=9999`, {
      headers: getAuthHeaders(),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: 'Failed to export challenges' };
  }
}