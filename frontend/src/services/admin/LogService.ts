import type { ApiResponse } from '@/types';

const API_BASE = '/api';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("web_quest_token");
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

export async function getDosenLevelLogs(query?: { page?: number; limit?: number; startDate?: string; endDate?: string; }): Promise<ApiResponse<any>> {
  const url = `${API_BASE}/api/logs/dosen/levels?page=${query?.page || 1}&limit=${query?.limit || 20}&startDate=${query?.startDate || ''}&endDate=${query?.endDate || ''}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return response.json();
}

export async function getDosenMaterialLogs(query?: { page?: number; limit?: number; startDate?: string; endDate?: string; }): Promise<ApiResponse<any>> {
  const url = `${API_BASE}/api/logs/dosen/materials?page=${query?.page || 1}&limit=${query?.limit || 20}&startDate=${query?.startDate || ''}&endDate=${query?.endDate || ''}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return response.json();
}

export async function getDosenChallengeLogs(query?: { page?: number; limit?: number; startDate?: string; endDate?: string; }): Promise<ApiResponse<any>> {
  const url = `${API_BASE}/api/logs/dosen/challenges?page=${query?.page || 1}&limit=${query?.limit || 20}&startDate=${query?.startDate || ''}&endDate=${query?.endDate || ''}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return response.json();
}

export async function getMahasiswaMaterialLogs(query?: { page?: number; limit?: number; startDate?: string; endDate?: string; }): Promise<ApiResponse<any>> {
  const url = `${API_BASE}/api/logs/mahasiswa/materials?page=${query?.page || 1}&limit=${query?.limit || 20}&startDate=${query?.startDate || ''}&endDate=${query?.endDate || ''}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return response.json();
}

export async function getMahasiswaChallengeLogs(query?: { page?: number; limit?: number; startDate?: string; endDate?: string; }): Promise<ApiResponse<any>> {
  const url = `${API_BASE}/api/logs/mahasiswa/challenges?page=${query?.page || 1}&limit=${query?.limit || 20}&startDate=${query?.startDate || ''}&endDate=${query?.endDate || ''}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return response.json();
}

export async function getMahasiswaLevelLogs(query?: { page?: number; limit?: number; startDate?: string; endDate?: string; }): Promise<ApiResponse<any>> {
  const url = `${API_BASE}/api/logs/mahasiswa/levels?page=${query?.page || 1}&limit=${query?.limit || 20}&startDate=${query?.startDate || ''}&endDate=${query?.endDate || ''}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return response.json();
}

export async function getMahasiswaBadgeLogs(query?: { page?: number; limit?: number; startDate?: string; endDate?: string; }): Promise<ApiResponse<any>> {
  const url = `${API_BASE}/api/logs/mahasiswa/badges?page=${query?.page || 1}&limit=${query?.limit || 20}&startDate=${query?.startDate || ''}&endDate=${query?.endDate || ''}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return response.json();
}
