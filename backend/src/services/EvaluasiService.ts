import prisma from "../config/database";
import { Prisma } from "@prisma/client";

// Standar benchmark UEQ
const UEQ_BENCHMARKS = {
    ATTRACTIVENESS: { excellent: 1.75, good: 1.41, aboveAverage: 0.96, belowAverage: 0.44 },
    PERSPICUITY: { excellent: 2.07, good: 1.84, aboveAverage: 1.14, belowAverage: 0.65 },
    EFFICIENCY: { excellent: 1.70, good: 1.43, aboveAverage: 0.98, belowAverage: 0.50 },
    DEPENDABILITY: { excellent: 1.70, good: 1.53, aboveAverage: 1.19, belowAverage: 0.81 },
    STIMULATION: { excellent: 1.56, good: 1.10, aboveAverage: 0.69, belowAverage: 0.07 },
    NOVELTY: { excellent: 1.12, good: 0.87, aboveAverage: 0.49, belowAverage: -0.22 }
};

function getUeqInterpretation(category: keyof typeof UEQ_BENCHMARKS, value: number): string {
    const bench = UEQ_BENCHMARKS[category];
    if (!bench) return "Unknown";
    if (value > bench.excellent) return "Excellent";
    if (value > bench.good) return "Good";
    if (value > bench.aboveAverage) return "Above Average";
    if (value > bench.belowAverage) return "Below Average";
    return "Bad";
}

export class EvaluasiService {
    static async getUeqStats(startDate?: Date, endDate?: Date) {
        let dateFilter: Prisma.UEQSessionWhereInput = {};
        if (startDate && endDate) {
            dateFilter = {
                createdAt: {
                    gte: startDate,
                    lte: endDate
                }
            };
        }

        // 1. Total Session
        const totalSessions = await prisma.uEQSession.count({
            where: dateFilter
        });

        // 2. Total Responden Unik
        const uniqueRespondents = await prisma.uEQSession.groupBy({
            by: ['userId'],
            where: dateFilter,
            _count: { userId: true }
        });
        const totalRespondents = uniqueRespondents.length;

        // 3. Terakhir Pengisian
        const lastSession = await prisma.uEQSession.findFirst({
            where: dateFilter,
            orderBy: { createdAt: 'desc' }
        });

        // 4. Hitung Rata-rata per Kategori
        // Di DB, value adalah 1-7. Konversi ke -3 s/d +3 adalah: value - 4.
        const answers = await prisma.uEQAnswer.findMany({
            where: {
                session: dateFilter
            },
            include: {
                question: true
            }
        });

        const categoryStats: Record<string, { total: number; count: number }> = {
            ATTRACTIVENESS: { total: 0, count: 0 },
            PERSPICUITY: { total: 0, count: 0 },
            EFFICIENCY: { total: 0, count: 0 },
            DEPENDABILITY: { total: 0, count: 0 },
            STIMULATION: { total: 0, count: 0 },
            NOVELTY: { total: 0, count: 0 }
        };

        for (const ans of answers) {
            const cat = ans.question.category as keyof typeof UEQ_BENCHMARKS;
            if (categoryStats[cat]) {
                const convertedValue = ans.value - 4; // convert 1-7 to -3 to +3
                categoryStats[cat].total += convertedValue;
                categoryStats[cat].count += 1;
            }
        }

        const scales = Object.keys(categoryStats).map(cat => {
            const stat = categoryStats[cat];
            const average = stat && stat.count > 0 ? stat.total / stat.count : 0;
            return {
                scale: cat,
                average: Number(average.toFixed(2)),
                interpretation: getUeqInterpretation(cat as keyof typeof UEQ_BENCHMARKS, average)
            };
        });

        return {
            totalSessions,
            totalRespondents,
            lastSubmission: lastSession ? lastSession.createdAt : null,
            scales
        };
    }

    static async getUeqExportData(startDate?: Date, endDate?: Date) {
        let dateFilter: Prisma.UEQSessionWhereInput = {};
        if (startDate && endDate) {
            dateFilter = {
                createdAt: {
                    gte: startDate,
                    lte: endDate
                }
            };
        }

        const sessions = await prisma.uEQSession.findMany({
            where: dateFilter,
            include: {
                user: { select: { username: true, name: true, email: true } },
                answers: {
                    include: { question: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        // Mapping raw data untuk CSV (1-7 scale)
        const exportData = sessions.map(session => {
            const row: Record<string, string | number | Date> = {
                userId: session.userId,
                username: session.user.username,
                name: session.user.name,
                email: session.user.email,
                createdAt: session.createdAt
            };

            session.answers.forEach(ans => {
                // Gunakan format "Q[ID]_[Category]"
                const key = `Q${ans.questionId}_${ans.question.category}`;
                row[key] = ans.value;
            });

            return row;
        });

        return exportData;
    }

    static async getMrcStats(startDate?: Date, endDate?: Date) {
        let dateFilter: Prisma.ResponseWhereInput = {};
        if (startDate && endDate) {
            dateFilter = {
                createdAt: {
                    gte: startDate,
                    lte: endDate
                }
            };
        }

        // Hitung unique respondents di MRC
        const uniqueMrcRespondents = await prisma.response.groupBy({
            by: ['userId'],
            where: dateFilter,
        });

        // Count selections per word
        const wordsStats = await prisma.response.groupBy({
            by: ['mrcWordId'],
            where: dateFilter,
            _count: {
                mrcWordId: true
            },
            orderBy: {
                _count: { mrcWordId: 'desc' }
            }
        });

        // Get word names
        const words = await prisma.mrcWords.findMany();
        const wordMap = new Map(words.map(w => [w.id, w.word]));

        let totalWordsSelected = 0;
        const chartData = wordsStats.map(stat => {
            totalWordsSelected += stat._count.mrcWordId;
            return {
                word: wordMap.get(stat.mrcWordId) || `Word ${stat.mrcWordId}`,
                count: stat._count.mrcWordId
            };
        });

        const mostSelectedWord = chartData.length > 0 ? chartData[0]?.word || null : null;

        return {
            totalRespondents: uniqueMrcRespondents.length,
            totalWordsSelected,
            mostSelectedWord,
            chartData
        };
    }

    static async getMrcReasons(page: number = 1, limit: number = 10, search?: string, startDate?: Date, endDate?: Date) {
        let dateFilter: Prisma.ReasonWhereInput = {};
        if (startDate && endDate) {
            dateFilter = {
                createdAt: {
                    gte: startDate,
                    lte: endDate
                }
            };
        }

        const skip = (page - 1) * limit;

        const whereClause: Prisma.ReasonWhereInput = { ...dateFilter };
        if (search) {
            whereClause.reason_text = {
                contains: search,
                mode: 'insensitive'
            };
        }

        const [total, reasons] = await prisma.$transaction([
            prisma.reason.count({ where: whereClause }),
            prisma.reason.findMany({
                where: whereClause,
                include: {
                    user: { select: { username: true, name: true, role: true } }
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit
            })
        ]);

        return {
            data: reasons,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        };
    }
}
