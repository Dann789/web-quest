import type { ApiResponse, SubmitUeq } from "@/types";

const API_BASE = 'http://localhost:3000';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('web_quest_token');
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

export async function getUeqQuestions() {
    try {
    const response = await fetch(`${API_BASE}/api/ueq`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return await response.json();
  } catch (error) {
    return { success: false, message: 'Failed to get ueq questions' };
  }
}

export async function submitUeq(userId: number, body: SubmitUeq): Promise<ApiResponse<SubmitUeq>> {
  try {
    const response = await fetch(`${API_BASE}/api/ueq/${userId}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(body)
    });
    return await response.json();
  } catch (error) {
    return { success: false, message: 'Failed to submit evaluation'};
  }
}