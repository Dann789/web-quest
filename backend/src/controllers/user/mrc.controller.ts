import prisma from "../../config/database"
import type { SubmitEvaluationRequest } from "../../types"

export class MrcController {
    static async getMrcWords() {
        try {
            const mrcWords = await prisma.mrcWords.findMany({
                select: {
                    id: true,
                    word: true,
                    translate: true,
                    description: true
                }
            })
            return {
                success: true,
                data: mrcWords
            }
        } catch (error) {
            return {
                success: false,
                message: "Failed to get MRC words"
            }
        }
    }

    static async submitEvaluation(userId: number, body: SubmitEvaluationRequest) {
        try {
            const { mrcWordId, reason } = body;

            // Pastikan mrcWordId adalah array dan tidak kosong
            if (!Array.isArray(mrcWordId) || mrcWordId.length === 0) {
                return {
                    success: false,
                    message: "Data evaluasi tidak valid"
                };
            }

            await prisma.$transaction(async (tx) => {
                const responseData = mrcWordId.map(wordId => ({
                    userId: userId,
                    mrcWordId: wordId
                }));

                await tx.response.createMany({
                    data: responseData
                });

                if (reason && reason.trim()) {
                    await tx.reason.create({
                        data: {
                            userId: userId,
                            reason_text: reason
                        }
                    });
                }
            });

            return {
                success: true,
                message: "Evaluasi berhasil dikirim"
            };
        } catch (error) {
            console.error("Submit evaluation error:", error);
            return {
                success: false,
                message: "Gagal mengirim evaluasi"
            };
        }
    }
}