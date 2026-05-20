import type { ApiResponse } from "@/types";

const API_BASE = "";

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("web_quest_token");
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

export async function getLeaderboardData(
  timeframe: string,
  page: number = 1,
  limit: number = 10,
): Promise<ApiResponse<any>> {
  const response = await fetch(`${API_BASE}/api/leaderboard/${timeframe}?page=${page}&limit=${limit}`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  return data;
}
