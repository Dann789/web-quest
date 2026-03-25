import type { ApiResponse, Challenge} from '@/types';

// Base API URL
const API_BASE = 'http://localhost:3000';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('web_quest_token');
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

export async function getRandomChallenges(userId: number, levelId: number, nodeSlot: number): Promise<ApiResponse<Challenge[]>> {
  try {
    const response = await fetch(`${API_BASE}/api/user/challenges/${userId}/${levelId}/${nodeSlot}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: 'Failed to get random challenges' };
  }
}