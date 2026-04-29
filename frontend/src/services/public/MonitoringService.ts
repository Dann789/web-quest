import type { ApiResponse } from "@/types";

const API_BASE = "http://localhost:3000";

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("web_quest_token");
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

export async function getCurrentProgress(): Promise<ApiResponse<any>> {
  const response = await fetch(`${API_BASE}/monitoring/current-progress`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return response.json();
}

