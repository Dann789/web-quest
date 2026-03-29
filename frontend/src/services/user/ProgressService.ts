const API_BASE = 'http://localhost:3000';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('web_quest_token');
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

export async function getCompleteNodes(userId: number, levelId: number) {
  try {
    const response = await fetch(
      `${API_BASE}/api/progress/${userId}/${levelId}/complete-nodes`,
      { method: 'GET', headers: getAuthHeaders() }
    );
    return await response.json();
  } catch (error) {
    return { success: false, message: 'Failed to get complete nodes' };
  }
}

export async function getMaterialProgress(userId: number, levelId: number) {
  try {
    const response = await fetch(
      `${API_BASE}/api/progress/${userId}/${levelId}/complete-materials`,
      { method: 'GET', headers: getAuthHeaders() }
    );
    return await response.json();
  } catch (error) {
    return { success: false, message: 'Failed to get material progress' };
  }
}