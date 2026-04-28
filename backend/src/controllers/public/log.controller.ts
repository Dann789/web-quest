import prisma from "../../config/database";
import { UserRole } from "@prisma/client";

export class LogController {
    static async getCurrentProgress() {
        try {
            const levels = await prisma.level.findMany({
                include: {
                    _count: {
                        select: {
                            materials: true,
                        }
                    }
                }
            });

            const users = await prisma.user.findMany({
                where: {
                    role: UserRole.MAHASISWA
                },
                orderBy: {
                    id: 'asc'
                },
                include: {
                    progress: {
                        include: { level: true },
                        orderBy: { level: { xpRequired: 'desc' } },
                        take: 1
                    },
                    materialProgress: {
                        where: { isCompleted: true },
                        include: { material: true }
                    },
                    assignments: {
                        where: { isCompleted: true },
                        include: {
                            challenge: {
                                select: { difficulty: true, levelId: true }
                            }
                        }
                    }
                }
            });

            const formattedData = users.map(user => {
                const currentProgress = user.progress[0];
                const currentLevelId = currentProgress?.levelId || 1;
                const currentLevelInfo = levels.find(l => l.id === currentLevelId);

                // Gunakan easyNodes/mediumNodes/hardNodes dari level yang sedang ditempuh user
                const easyMax = currentLevelInfo?.easyNodes ?? 0;
                const mediumMax = currentLevelInfo?.mediumNodes ?? 0;
                const hardMax = currentLevelInfo?.hardNodes ?? 0;

                // totalNodes = jumlah node challenge + 1 node untuk materi
                const totalNodes = easyMax + mediumMax + hardMax + 1;

                const levelAssignments = user.assignments.filter(a => a.challenge.levelId === currentLevelId);
                const completedMaterialsInLevel = user.materialProgress.filter(mp => mp.material.levelId === currentLevelId).length;

                const totalMaterialsInLevel = currentLevelInfo?._count.materials || 0;

                const challengesCount = {
                    easy: levelAssignments.filter(a => a.challenge.difficulty === 'EASY').length,
                    medium: levelAssignments.filter(a => a.challenge.difficulty === 'MEDIUM').length,
                    hard: levelAssignments.filter(a => a.challenge.difficulty === 'HARD').length
                };

                let materialStatus = 'not-started';
                if (totalMaterialsInLevel > 0) {
                    if (completedMaterialsInLevel === totalMaterialsInLevel) {
                        materialStatus = 'completed';
                    } else if (completedMaterialsInLevel > 0) {
                        materialStatus = 'in-progress';
                    }
                }

                const totalCompleted = levelAssignments.length + (materialStatus === 'completed' ? 1 : 0);

                const progressPercentage = totalNodes > 0
                    ? Math.min(100, Math.round((totalCompleted / totalNodes) * 100))
                    : 0;

                return {
                    id: user.id,
                    username: user.username,
                    name: user.name,
                    currentLevel: currentLevelInfo?.name || "Belum Memulai",
                    materialStatus: materialStatus,
                    challenges: challengesCount,
                    // Sertakan max node per difficulty sesuai level user saat ini
                    nodeMax: {
                        easy: easyMax,
                        medium: mediumMax,
                        hard: hardMax,
                    },
                    progress: progressPercentage,
                    xp: user.totalXp
                };
            });

            return {
                success: true,
                data: formattedData
            };
        } catch (error) {
            console.error(error);
            return {
                success: false,
                message: "Gagal mengambil data log aktivitas"
            };
        }
    }
}

