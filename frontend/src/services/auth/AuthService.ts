import type { ApiResponse, User, RegisterRequest, LoginRequest, LoginResponse } from "@/types";

const API_BASE = "http://localhost:3000";

export const login = async (
  credentials: LoginRequest,
): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    return data as LoginResponse;
  } catch (error) {
    console.error(error);
    return { success: false, message: "An error occurred" };
  }
};

export const register = async (
  credentials: RegisterRequest,
): Promise<ApiResponse<{ user: User }>> => {
  try {
    const response = await fetch(`${API_BASE}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    return data as ApiResponse<{ user: User }>;
  } catch (error) {
    console.error(error);
    return { success: false, message: "An error occurred" };
  }
};
