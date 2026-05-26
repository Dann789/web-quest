import prisma from "../../config/database"
import type { SubmitUeqRequest } from "../../types";

export class UeqController {
    static async getUeqQuestions() {
        try {
            const questions = await prisma.uEQQuestion.findMany({
                select: {
                    id: true,
                    leftWord: true,
                    rightWord: true,
                    category: true,
                }
            })
            return {
                status: 200,
                success: true,
                message: "UEQ questions fetched successfully",
                data: questions,
            }
        } catch (error) {
            console.error("Failed to fetch UEQ questions", error);
            return {
                status: 500,
                success: false,
                message: "Failed to fetch UEQ questions",
                error: error,
            }
        }
    }

    static async submitUeq(userId: number, body: SubmitUeqRequest) {
        try {
            const { answer } = body;
            if (!Array.isArray(answer) || answer.length === 0) {
                return {
                    status: 400,
                    success: false,
                    message: "Data jawaban kuesioner tidak valid atau kosong"
                };
            }

            const result = await prisma.$transaction(async (tx) => {

                const session = await tx.uEQSession.create({
                    data: {
                        userId: userId
                    }
                });

                const answerData = answer.map((ans) => ({
                    sessionId: session.id,
                    questionId: ans.questionId,
                    value: ans.value
                }));

                await tx.uEQAnswer.createMany({
                    data: answerData
                });
                return session;
            });
            return {
                status: 201,
                success: true,
                message: "Kuesioner UEQ berhasil disimpan",
                data: result
            };
        } catch (error) {
            console.error("Submit UEQ error:", error);
            return {
                status: 500,
                success: false,
                message: "Gagal mengirim kuesioner UEQ"
            };
        }
    }
}