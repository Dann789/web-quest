import type { ApiResponse } from "../../types";

const API_BASE = "";

function getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem("web_quest_token");
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    return headers;
}

export const getFormSetting = async (): Promise<ApiResponse<{ isActive: boolean }>> => {
  try {
    const response = await fetch(`${API_BASE}/api/admin/settings/form-setting`, {
        method: "GET",
        headers: getAuthHeaders(),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: "Failed to get form setting" };
  }
};

export const toggleFormSetting = async (
  isActive: boolean,
): Promise<ApiResponse<{ isActive: boolean }>> => {
  try {
    const response = await fetch(`${API_BASE}/api/admin/settings/toggle`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ isActive }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: "Failed to toggle form setting" };
  }
};
