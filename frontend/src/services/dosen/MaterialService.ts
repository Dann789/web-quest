import type { ApiResponse, Material } from "@/types";

// Base API URL
const API_BASE = "http://localhost:3000";

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("web_quest_token");
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

// Get all Materials with pagination and optional level filter
export async function getMaterials(page: number = 1, limit: number = 10, levelId?: number): Promise<ApiResponse<Material[]>> {
  try {
    let url = `${API_BASE}/api/materials?page=${page}&limit=${limit}`;
    if (levelId) url += `&levelId=${levelId}`;
    
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: "Failed to fetch materials" + error };
  }
}

export async function getMaterialsById(
  id: number,
): Promise<ApiResponse<Material>> {
  try {
    const response = await fetch(`${API_BASE}/api/materials/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: "Failed to fetch material" + error };
  }
}

export async function getMaterialsByLevelId(
  levelId: number,
): Promise<
  ApiResponse<{
    level: { id: number; name: string };
    materials: Material[];
    totalMaterials: number;
  }>
> {
  try {
    const response = await fetch(`${API_BASE}/api/materials/level/${levelId}`, {
      headers: getAuthHeaders(),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: "Failed to fetch material" };
  }
}

// Create a new material
export async function createMaterial(materialData: {
  levelId: number;
  title: string;
  content: string;
  order: number;
}): Promise<ApiResponse<Material>> {
  try {
    const response = await fetch(`${API_BASE}/api/materials`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        levelId: materialData.levelId,
        title: materialData.title,
        content: materialData.content,
        order: materialData.order,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: "Failed to create material" };
  }
}

// Update a material
export async function updateMaterial(
  id: number,
  materialData: Partial<Material>,
): Promise<ApiResponse<Material>> {
  try {
    const response = await fetch(`${API_BASE}/api/materials/${id}`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify(materialData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: "Failed to update material" };
  }
}

// Delete a Material
export async function deleteMaterial(id: number): Promise<ApiResponse<void>> {
  try {
    const response = await fetch(`${API_BASE}/api/materials/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: "Failed to delete materials" };
  }
}
