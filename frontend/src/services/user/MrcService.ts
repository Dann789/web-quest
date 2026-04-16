import type { ApiResponse, SubmitEvaluation } from "@/types";

const API_BASE = 'http://localhost:3000';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('web_quest_token');
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

export async function getMrcWords() {
    try {
    const response = await fetch(`${API_BASE}/api/mrc`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return await response.json();
  } catch (error) {
    return { success: false, message: 'Failed to get mrc words' };
  }
}

export async function submitEvaluation(userId: number, body: SubmitEvaluation): Promise<ApiResponse<SubmitEvaluation>> {
  try {
    const response = await fetch(`${API_BASE}/api/mrc/submit-eval/${userId}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(body)
    });
    return await response.json();
  } catch (error) {
    return { success: false, message: 'Failed to submit evaluation'};
  }
}