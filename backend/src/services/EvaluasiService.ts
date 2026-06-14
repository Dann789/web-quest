import prisma from "../config/database";
import { Prisma } from "@prisma/client";

// Standar benchmark UEQ
const UEQ_BENCHMARKS = {
    ATTRACTIVENESS: { excellent: 1.84, good: 1.58, aboveAverage: 1.18, belowAverage: 0.69 },
    PERSPICUITY: { excellent: 2.00, good: 1.73, aboveAverage: 1.20, belowAverage: 0.72 },
    EFFICIENCY: { excellent: 1.88, good: 1.50, aboveAverage: 1.05, belowAverage: 0.60 },
    DEPENDABILITY: { excellent: 1.70, good: 1.48, aboveAverage: 1.14, belowAverage: 0.78 },
    STIMULATION: { excellent: 1.70, good: 1.35, aboveAverage: 1.00, belowAverage: 0.50 },
    NOVELTY: { excellent: 1.60, good: 1.12, aboveAverage: 0.70, belowAverage: 0.16 }
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

    static async getMrcExportData(startDate?: Date, endDate?: Date) {
        let dateFilter: Prisma.ReasonWhereInput = {};
        if (startDate && endDate) {
            dateFilter = {
                createdAt: {
                    gte: startDate,
                    lte: endDate
                }
            };
        }

        const reasons = await prisma.reason.findMany({
            where: dateFilter,
            include: {
                user: { select: { username: true, name: true, email: true } }
            },
            orderBy: { createdAt: 'desc' }
        });

        let responseFilter: Prisma.ResponseWhereInput = {};
        if (startDate && endDate) {
            responseFilter = {
                createdAt: {
                    gte: startDate,
                    lte: endDate
                }
            };
        }

        const responses = await prisma.response.findMany({
            where: responseFilter,
            include: {
                mrcWord: { select: { word: true } }
            }
        });

        const userWordsMap = new Map<number, string[]>();
        responses.forEach(r => {
            if (!userWordsMap.has(r.userId)) {
                userWordsMap.set(r.userId, []);
            }
            userWordsMap.get(r.userId)!.push(r.mrcWord.word);
        });

        const exportData = reasons.map(reason => {
            const words = userWordsMap.get(reason.userId) || [];
            
            return {
                userId: reason.userId,
                username: reason.user.username,
                name: reason.user.name,
                email: reason.user.email,
                word1: words[0] || "",
                word2: words[1] || "",
                word3: words[2] || "",
                word4: words[3] || "",
                word5: words[4] || "",
                reasonText: reason.reason_text,
                createdAt: reason.createdAt
            };
        });

        return exportData;
    }
}
