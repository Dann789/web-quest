const API_URL = import.meta.env.VITE_API_URL || '';

export interface UeqScale {
  scale: string;
  average: number;
  interpretation: string;
}

export interface UeqStatsResponse {
  totalSessions: number;
  totalRespondents: number;
  lastSubmission: string | null;
  scales: UeqScale[];
}

export interface MrcChartData {
  word: string;
  count: number;
}

export interface MrcStatsResponse {
  totalRespondents: number;
  totalWordsSelected: number;
  mostSelectedWord: string | null;
  chartData: MrcChartData[];
}

export interface MrcReason {
  id: number;
  userId: number;
  reason_text: string;
  createdAt: string;
  user?: {
    username: string;
    name: string;
    role: string;
  };
}

export interface MrcReasonsMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface MrcReasonsResponse {
  data: MrcReason[];
  meta: MrcReasonsMeta;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: MrcReasonsMeta;
  message?: string;
  error?: string;
}

async function fetchWithAuth<T>(url: string, token: string): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_URL}${url}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return response.json();
}

export class EvaluasiService {
  static async getUeqStats(token: string, startDate?: string, endDate?: string): Promise<ApiResponse<UeqStatsResponse>> {
    const qs = new URLSearchParams();
    if (startDate) qs.append('startDate', startDate);
    if (endDate) qs.append('endDate', endDate);
    
    return fetchWithAuth<UeqStatsResponse>(`/api/admin/evaluasi/ueq/stats?${qs.toString()}`, token);
  }

  static async getMrcStats(token: string, startDate?: string, endDate?: string): Promise<ApiResponse<MrcStatsResponse>> {
    const qs = new URLSearchParams();
    if (startDate) qs.append('startDate', startDate);
    if (endDate) qs.append('endDate', endDate);
    
    return fetchWithAuth<MrcStatsResponse>(`/api/admin/evaluasi/mrc/stats?${qs.toString()}`, token);
  }

  static async getMrcReasons(token: string, page: number, limit: number, search?: string, startDate?: string, endDate?: string): Promise<ApiResponse<MrcReason[]>> {
    const qs = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    });
    if (search) qs.append('search', search);
    if (startDate) qs.append('startDate', startDate);
    if (endDate) qs.append('endDate', endDate);
    
    return fetchWithAuth<MrcReason[]>(`/api/admin/evaluasi/mrc/reasons?${qs.toString()}`, token);
  }

  static async exportUeqCsv(token: string, startDate?: string, endDate?: string): Promise<boolean> {
    const qs = new URLSearchParams();
    if (startDate) qs.append('startDate', startDate);
    if (endDate) qs.append('endDate', endDate);
    
    const res = await fetchWithAuth<Record<string, string | number>[]>(`/api/admin/evaluasi/ueq/export?${qs.toString()}`, token);
    
    if (res.success && res.data && res.data.length > 0) {
      const data = res.data;
      const headers = Object.keys(data[0]).join(',');
      const rows = data.map((row) => Object.values(row).map(val => `"${String(val)}"`).join(','));
      const csv = [headers, ...rows].join('\n');
      
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', `ueq_export_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    }
    
    return false;
  }

  static async exportMrcCsv(token: string, startDate?: string, endDate?: string): Promise<boolean> {
    const qs = new URLSearchParams();
    if (startDate) qs.append('startDate', startDate);
    if (endDate) qs.append('endDate', endDate);
    
    const res = await fetchWithAuth<Record<string, string | number>[]>(`/api/admin/evaluasi/mrc/export?${qs.toString()}`, token);
    
    if (res.success && res.data && res.data.length > 0) {
      const data = res.data;
      const headers = Object.keys(data[0]).join(',');
      const rows = data.map((row) => Object.values(row).map(val => `"${String(val).replace(/"/g, '""')}"`).join(','));
      const csv = [headers, ...rows].join('\n');
      
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', `mrc_export_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    }
    
    return false;
  }
}
