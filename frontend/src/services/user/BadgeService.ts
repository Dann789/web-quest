const API_BASE = '/api';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('web_quest_token');
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

export async function getAllBadges() {
  try {
    const response = await fetch(`${API_BASE}/api/badges`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return await response.json();
  } catch (error) {
    return { success: false, message: 'Failed to get badges' };
  }
}

export async function getUserBadges(userId: number) {
  try {
    const response = await fetch(`${API_BASE}/api/badges/${userId}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return await response.json();
  } catch (error) {
    return { success: false, message: 'Failed to get user badges' };
  }
}

export async function earnedBadge(userId: number, badgeId: number) {
  try {
    const response = await fetch(`${API_BASE}/api/badges/${badgeId}/${userId}`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    return await response.json();
  } catch (error) {
    return { success: false, message: 'Failed to earn badge' };
  }
}