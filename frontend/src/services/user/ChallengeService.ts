import type { ApiResponse, ChallengeNodeData, SubmitAnswerResult, SubmitAnswerPayload } from '@/types';

const API_BASE = '';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('web_quest_token');
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

export async function getNodeChallenge(
  userId: number,
  levelId: number,
  nodeSlot: number
): Promise<ApiResponse<ChallengeNodeData>> {
  try {
    const response = await fetch(
      `${API_BASE}/api/user/challenges/${userId}/${levelId}/${nodeSlot}`,
      { method: 'GET', headers: getAuthHeaders() }
    );
    return await response.json();
  } catch (error) {
    return { success: false, message: 'Failed to get challenge for this node' };
  }
}

export async function submitAnswer(
  userId: number,
  payload: SubmitAnswerPayload
): Promise<ApiResponse<SubmitAnswerResult>> {
  try {
    const response = await fetch(
      `${API_BASE}/api/user/challenges/submit/${userId}`,
      {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      }
    );
    return await response.json();
  } catch (error) {
    return { success: false, message: 'Gagal terhubung ke server. Coba lagi.' };
  }
}

/**
 * Menjalankan kode PHP di server.
 * Sekarang mendukung parameter sandbox untuk level PHP/Database.
 */
export async function runPhpCode(
  codes: Record<string, string>,
  userId?: number,
  templateName?: string | null,
  level?: string | null,
  sandboxEnabled?: boolean | null
): Promise<ApiResponse<any>> {
  try {
    const response = await fetch(`${API_BASE}/api/user/challenges/run-php`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ 
        codes, 
        userId: userId || undefined, 
        templateName: templateName || undefined, 
        level: level || undefined,
        sandboxEnabled: sandboxEnabled ?? undefined
      }),
    });
    return await response.json();
  } catch (error) {
    return { success: false, message: 'Gagal menjalankan kode PHP. Coba lagi.' };
  }
}

/**
 * Inisialisasi database sandbox untuk soal tertentu.
 */
export async function getChallengeSchema(
  challengeId: number,
  level: string
): Promise<ApiResponse<any>> {
  try {
    const response = await fetch(
      `${API_BASE}/api/user/soal/${challengeId}/schema?level=${level}`,
      { method: 'GET', headers: getAuthHeaders() }
    );
    return await response.json();
  } catch (error) {
    return { success: false, message: 'Gagal menginisialisasi database sandbox.' };
  }
}

/**
 * Menjalankan query SQL di server terhadap SQLite sandbox mahasiswa (atau in-memory jika kosong).
 */
export async function runSqlCode(
  sql: string,
  userId?: number,
  templateName?: string,
  level?: string
): Promise<ApiResponse<any>> {
  try {
    const response = await fetch(`${API_BASE}/api/user/challenges/run-sql`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ 
        sql, 
        userId: userId || undefined, 
        templateName: templateName || undefined, 
        level: level || undefined 
      }),
    });
    return await response.json();
  } catch (error) {
    return { success: false, message: 'Gagal menjalankan query SQL. Coba lagi.' };
  }
}
