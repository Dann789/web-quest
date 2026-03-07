import type { ApiResponse, Level } from '@/types';

// Base API URL
const API_BASE = 'http://localhost:3000';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('web_quest_token');
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

// Get all levels
export async function getLevels(): Promise<ApiResponse<Level[]>> {
  try {
    const response = await fetch(`${API_BASE}/api/levels`);
    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: 'Failed to fetch levels' };
  }
}

// Create a new level
export async function createLevel(levelData: { name: string; xpRequired: number; description: string; iconName: string }): Promise<ApiResponse<Level>> {
  try {
    const response = await fetch(`${API_BASE}/api/levels`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        name: levelData.name,
        xpRequired: levelData.xpRequired,
        description: levelData.description,
        iconName: levelData.iconName,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: 'Failed to create level' };
  }
}

// Update a level
export async function updateLevel(id: number, levelData: Partial<Level>): Promise<ApiResponse<Level>> {
  try {
    const response = await fetch(`${API_BASE}/api/levels/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(levelData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: 'Failed to update level' };
  }
}

// Delete a level
export async function deleteLevel(id: number): Promise<ApiResponse<void>> {
  try {
    const response = await fetch(`${API_BASE}/api/levels/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: 'Failed to delete level' };
  }
}