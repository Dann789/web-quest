import type { ApiResponse } from "@/types";

const API_BASE = "/api";

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("web_quest_token");
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

export async function getCurrentProgress(page: number = 1, limit: number = 10): Promise<ApiResponse<any>> {
  const response = await fetch(`${API_BASE}/monitoring/current-progress?page=${page}&limit=${limit}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return response.json();
}

