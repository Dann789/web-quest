import type { ApiResponse, User } from "@/types";

const API_BASE = "http://localhost:3000";

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("web_quest_token");
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

export async function getLeaderboardData(
  timeframe: string,
): Promise<ApiResponse<{ leaderboard: User[] }>> {
  const response = await fetch(`${API_BASE}/api/leaderboard/${timeframe}`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  return data;
}
