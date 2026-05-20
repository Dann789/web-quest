const API_BASE = '';

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

export async function addProgressMaterial(userId: number, materialId: number) {
  try {
    const response = await fetch(
      `${API_BASE}/api/progress/${userId}/${materialId}/add-progress`,
      { method: 'POST', headers: getAuthHeaders() }
    );
    return await response.json();
  } catch (error) {
    return { success: false, message: 'Failed to add material progress' };
  }
}

export async function updateStatusMaterial(userId: number, materialId: number) {
  try {
    const response = await fetch(
      `${API_BASE}/api/progress/${userId}/${materialId}/update-status`,
      { method: 'PUT', headers: getAuthHeaders() }
    );
    return await response.json();
  } catch (error) {
    return { success: false, message: 'Failed to update material status' };
  }
}

export async function getProgressLevel(userId: number, levelId: number) {
  try {
    const response = await fetch(
      `${API_BASE}/api/progress/${userId}/${levelId}/progress-percentage`,
      { method: 'GET', headers: getAuthHeaders() }
    );
    return await response.json();
  } catch (error) {
    return { success: false, message: 'Failed to get progress percentage' };
  }
}

export async function getUserSummary(userId: number) {
  try {
    const response = await fetch(
      `${API_BASE}/api/progress/${userId}/summary`,
      { method: 'GET', headers: getAuthHeaders() }
    );
    return await response.json();
  } catch (error) {
    return { success: false, message: 'Failed to get user summary' };
  }
}