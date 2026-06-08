import { EvaluasiService } from "../../services/EvaluasiService";

export class EvaluasiController {
    static async getUeqStats(query: any) {
        try {
            const { startDate, endDate } = query;
            const start = startDate ? new Date(startDate as string) : undefined;
            const end = endDate ? new Date(endDate as string) : undefined;
            
            // Adjust end date to cover the whole day
            if (end) {
                end.setHours(23, 59, 59, 999);
            }

            const data = await EvaluasiService.getUeqStats(start, end);
            return {
                success: true,
                data
            };
        } catch (error: any) {
            console.error("Error getUeqStats:", error);
            return {
                success: false,
                message: "Gagal mengambil data statistik UEQ",
                error: error.message
            };
        }
    }

    static async getUeqExport(query: any) {
        try {
            const { startDate, endDate } = query;
            const start = startDate ? new Date(startDate as string) : undefined;
            const end = endDate ? new Date(endDate as string) : undefined;
            
            if (end) {
                end.setHours(23, 59, 59, 999);
            }

            const data = await EvaluasiService.getUeqExportData(start, end);
            return {
                success: true,
                data
            };
        } catch (error: any) {
            console.error("Error getUeqExport:", error);
            return {
                success: false,
                message: "Gagal mengambil data export UEQ",
                error: error.message
            };
        }
    }

    static async getMrcStats(query: any) {
        try {
            const { startDate, endDate } = query;
            const start = startDate ? new Date(startDate as string) : undefined;
            const end = endDate ? new Date(endDate as string) : undefined;
            
            if (end) {
                end.setHours(23, 59, 59, 999);
            }

            const data = await EvaluasiService.getMrcStats(start, end);
            return {
                success: true,
                data
            };
        } catch (error: any) {
            console.error("Error getMrcStats:", error);
            return {
                success: false,
                message: "Gagal mengambil data statistik MRC",
                error: error.message
            };
        }
    }

    static async getMrcReasons(query: any) {
        try {
            const { page = 1, limit = 10, search, startDate, endDate } = query;
            const start = startDate ? new Date(startDate as string) : undefined;
            const end = endDate ? new Date(endDate as string) : undefined;
            
            if (end) {
                end.setHours(23, 59, 59, 999);
            }

            const data = await EvaluasiService.getMrcReasons(Number(page), Number(limit), search as string, start, end);
            return {
                success: true,
                data: data.data,
                meta: data.meta
            };
        } catch (error: any) {
            console.error("Error getMrcReasons:", error);
            return {
                success: false,
                message: "Gagal mengambil data alasan MRC",
                error: error.message
            };
        }
    }
}
