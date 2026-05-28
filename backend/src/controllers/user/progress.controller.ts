import prisma from "../../config/database";
import { UserBadgeController } from "./badge.controller";

export class UserProgressController {
  static async getCompleteNodes(userId: number, levelId: number) {
    try {
      const completedNodes = await prisma.assignment.findMany({
        where: {
          userId: userId,
          levelId: levelId,
          isCompleted: true,
        },
        select: {
          nodeSlot: true,
        },
        orderBy: {
          nodeSlot: "asc",
        },
      });

      return {
        success: true,
        message: "Progres Node Challenge yang sudah selesai berhasil diambil",
        data: {
          completedNodes: completedNodes.map((node) => node.nodeSlot),
        },
      };
    } catch (error) {
      console.error("Error fetching completed nodes:", error);
      return {
        success: false,
        message: "Failed to fetch completed nodes",
      };
    }
  }

  static async addProgressMaterial(userId: number, materialId: number) {
    try {
      const materialProgressExists = await prisma.materialProgress.findUnique({
        where: {
          idx_material_progress_unique: {
            userId: userId,
            materialId: materialId,
          },
        },
      });

      if (materialProgressExists) {
        return {
          success: false,
          message: "Material progress sudah ada",
        };
      }

      const materialProgress = await prisma.materialProgress.create({
        data: {
          userId: userId,
          materialId: materialId,
          isCompleted: false,
          startedAt: new Date(),
        },
      });

      return {
        success: true,
        message: "Progres materi berhasil ditambahkan",
        data: {
          materialProgress: materialProgress,
        },
      };
    } catch (error) {
      console.error("Error adding material progress:", error);
      return {
        success: false,
        message: "Failed to add material progress",
      };
    }
  }

  static async updateStatusMaterial(userId: number, materialId: number) {
    try {
      const materialProgress = await prisma.materialProgress.findUnique({
        where: {
          idx_material_progress_unique: {
            userId: userId,
            materialId: materialId,
          },
        },
        include: {
          material: { select: { levelId: true } },
        },
      });

      if (!materialProgress) {
        return {
          success: false,
          message: "Material progress tidak ditemukan",
        };
      }

      if (materialProgress.isCompleted) {
        return {
          success: true,
          message: "Material sudah selesai sebelumnya",
        };
      }

      await prisma.materialProgress.update({
        where: {
          idx_material_progress_unique: {
            userId: userId,
            materialId: materialId,
          },
        },
        data: {
          isCompleted: true,
          completedAt: new Date(),
        },
      });
      const materialBadges = await UserBadgeController.checkAndAward(userId, "MATERIAL");

      const levelId = materialProgress.material.levelId;

      const totalMaterialsInLevel = await prisma.material.count({
        where: { levelId: levelId },
      });

      const completedMaterialsInLevel = await prisma.materialProgress.count({
        where: {
          userId: userId,
          isCompleted: true,
          material: { levelId: levelId },
        },
      });

      if (
        totalMaterialsInLevel > 0 &&
        completedMaterialsInLevel === totalMaterialsInLevel
      ) {
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            totalXp: {
              increment: 15,
            },
          },
        });
        const completionData = await this.checkLevelCompletion(userId, levelId);
        return {
          success: true,
          message:
            "Selamat! Semua materi di level ini tuntas. +15 XP didapatkan!",
          data: { 
            xpAwarded: 15,
            newBadges: [...materialBadges, ...(completionData.newBadges || [])],
            unlockedLevelName: completionData.unlockedLevelName
          },
        };
      }

      return {
        success: true,
        message:
          "Status materi berhasil diupdate, lanjutkan materi selanjutnya",
        data: {
          newBadges: materialBadges
        }
      };
    } catch (error) {
      console.error("Error updating material status:", error);
      return {
        success: false,
        message: "Failed to update material status",
      };
    }
  }

  static async checkLevelCompletion(
    userId: number,
    levelId: number
  ): Promise<{ unlockedLevelName: string | null; newBadges: any[] }> {
    const result = { unlockedLevelName: null as string | null, newBadges: [] as any[] };
    try {
      const currentProgress = await prisma.progress.findUnique({
        where: { idx_progress_unique: { userId, levelId } }
      });

      if (currentProgress?.completedAt) {
        return result;
      }

      const level = await prisma.level.findUnique({ where: { id: levelId } });
      if (!level) return result;

      const completedChallenges = await prisma.assignment.count({
        where: { userId, levelId, isCompleted: true },
      });

      const materialRes = await this.getMaterialProgress(userId, levelId);
      const isMaterialDone = materialRes.data?.isAllCompleted;

      const totalNodesNeeded =
        level.easyNodes + level.mediumNodes + level.hardNodes;

      if (completedChallenges >= totalNodesNeeded && isMaterialDone) {
        await prisma.progress.update({
          where: { idx_progress_unique: { userId, levelId } },
          data: {
            completedAt: new Date(),
            updatedAt: new Date(),
          },
        });

        const nextLevel = await prisma.level.findFirst({
          where: { id: { gt: levelId } },
          orderBy: { id: "asc" },
        });

        if (nextLevel) {
          await prisma.progress.upsert({
            where: { idx_progress_unique: { userId, levelId: nextLevel.id } },
            update: {
              isUnlocked: true,
              unlockedAt: new Date(),
            },
            create: {
              userId: userId,
              levelId: nextLevel.id,
              isUnlocked: true,
              unlockedAt: new Date(),
            },
          });
          console.log(`Level ${nextLevel.id} berhasil dibuka untuk user ${userId}`);
          result.unlockedLevelName = nextLevel.name;
        }

        // Tangkap badge kategori LEVEL
        result.newBadges = await UserBadgeController.checkAndAward(userId, "LEVEL");
      }
      return result;
    } catch (error) {
      console.error("Gagal update progres level:", error);
      return result;
    }
  }

  static async getMaterialProgress(userId: number, levelId: number) {
    try {
      const completedMaterials = await prisma.materialProgress.findMany({
        where: {
          userId: userId,
          isCompleted: true,
          material: {
            levelId: levelId,
          },
        },
        select: {
          materialId: true,
        },
      });

      const totalMaterials = await prisma.material.count({
        where: {
          levelId: levelId,
        },
      });

      const countCompleted = completedMaterials.length;
      const isAllCompleted =
        totalMaterials > 0 && countCompleted === totalMaterials;

      return {
        success: true,
        message: "Progres Materi yang sudah selesai berhasil diambil",
        data: {
          completedMaterials: completedMaterials.map(
            (material) => material.materialId,
          ),
          totalMaterials: totalMaterials,
          isAllCompleted: isAllCompleted,
        },
      };
    } catch (error) {
      console.error("Error fetching completed materials:", error);
      return {
        success: false,
        message: "Failed to fetch completed materials",
      };
    }
  }

  static async getProgressLevel(userId: number, levelId: number) {
    try {
      const level = await prisma.level.findUnique({
        where: {
          id: levelId,
        },
      });

      if (!level) {
        return {
          success: false,
          message: "Level tidak ditemukan",
        };
      }

      const completedNodes = await this.getCompleteNodes(userId, levelId);
      const completedMaterials = await this.getMaterialProgress(
        userId,
        levelId,
      );

      const totalNodes = level.easyNodes + level.mediumNodes + level.hardNodes + 1;
      const totalCompleted =
        (completedNodes.data?.completedNodes?.length || 0) +
        (completedMaterials.data?.isAllCompleted ? 1 : 0);
      const progressPercentage = Math.round((totalCompleted / totalNodes) * 100);

      await UserBadgeController.checkAndAward(userId, "LEVEL");

      return {
        success: true,
        message: "Progres Level yang sudah selesai berhasil diambil",
        data: {
          completedNodes: completedNodes.data?.completedNodes,
          completedMaterials: completedMaterials.data?.completedMaterials,
          totalMaterials: completedMaterials.data?.totalMaterials,
          isAllCompleted: completedMaterials.data?.isAllCompleted,
          totalNodes: totalNodes,
          totalCompleted: totalCompleted,
          progressPercentage: progressPercentage,
        },
      };
    } catch (error) {
      console.error("Error fetching level progress:", error);
      return {
        success: false,
        message: "Failed to fetch level progress",
      };
    }
  }

  static async getCompletedChallenge(userId: number) {
    try {
      const completedChallenges = await prisma.assignment.findMany({
        where: {
          userId: userId,
          isCompleted: true,
        },
        select: {
          challengeId: true,
        },
      });

      return {
        success: true,
        message: "Challenge yang sudah selesai berhasil diambil",
        data: {
          completedChallenges: completedChallenges.map(
            (challenge) => challenge.challengeId,
          ),
          totalCompleted: completedChallenges.length,
        },
      };
    } catch (error) {
      console.error("Error fetching completed challenges:", error);
      return {
        success: false,
        message: "Failed to fetch completed challenges",
      };
    }
  }

  static async getUserSummary(userId: number) {
    try {
      const now = new Date();
      // Helper for local YYYY-MM-DD
      const toLocalDateString = (date: Date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
      };

      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

      const [user, completedChallenges, completedLevels, totalLevels, earnedBadges, recentAttempts, attemptDates, materialDates] = await Promise.all([
        prisma.user.findUnique({
          where: { id: userId },
          select: { totalXp: true, name: true }
        }),
        prisma.assignment.count({
          where: { userId, isCompleted: true }
        }),
        prisma.progress.count({
          where: { userId, completedAt: { not: null } }
        }),
        prisma.level.count(),
        prisma.userBadge.count({
          where: { userId }
        }),
        prisma.attempt.findMany({
          where: {
            userId,
            submittedAt: { gte: sevenDaysAgo }
          },
          select: {
            timeSpent: true,
            submittedAt: true,
          }
        }),
        prisma.attempt.findMany({
          where: { userId },
          select: { submittedAt: true },
          distinct: ['submittedAt'],
        }),
        prisma.materialProgress.findMany({
          where: {
            userId,
            isCompleted: true,
            completedAt: { not: null }
          },
          select: { completedAt: true },
        }),
      ]);

      if (!user) {
        return {
          success: false,
          message: "User not found",
        };
      }

      const dayLabels = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
      const dailySecondsMap = new Map<string, number>();
      const orderedDays: { day: string; date: Date }[] = [];

      for (let i = 0; i < 7; i++) {
        const d = new Date(sevenDaysAgo);
        d.setDate(d.getDate() + i);
        const key = toLocalDateString(d);
        dailySecondsMap.set(key, 0);
        orderedDays.push({ day: dayLabels[d.getDay()] ?? '', date: d });
      }

      for (const attempt of recentAttempts) {
        const key = toLocalDateString(attempt.submittedAt);
        if (dailySecondsMap.has(key)) {
          dailySecondsMap.set(
            key,
            (dailySecondsMap.get(key) || 0) + attempt.timeSpent
          );
        }
      }

      const studyActivity = orderedDays.map(({ day, date }) => {
        const key = toLocalDateString(date);
        const totalSeconds = dailySecondsMap.get(key) || 0;
        return { 
          day, 
          minutes: Math.round(totalSeconds / 60) || (totalSeconds > 0 ? 1 : 0) // Ensure at least 1 min if there's activity
        };
      });

      const activityDateSet = new Set<string>();

      for (const a of attemptDates) {
        activityDateSet.add(toLocalDateString(a.submittedAt));
      }
      for (const m of materialDates) {
        if (m.completedAt) {
          activityDateSet.add(toLocalDateString(m.completedAt));
        }
      }

      const todayStr = toLocalDateString(today);
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = toLocalDateString(yesterday);

      let streakCount = 0;
      let checkDate: Date;

      if (activityDateSet.has(todayStr)) {
        checkDate = new Date(today);
      } else if (activityDateSet.has(yesterdayStr)) {
        checkDate = new Date(yesterday);
      } else {
        checkDate = new Date(today);
      }

      if (activityDateSet.has(todayStr) || activityDateSet.has(yesterdayStr)) {
        while (true) {
          const checkStr = toLocalDateString(checkDate);
          if (activityDateSet.has(checkStr)) {
            streakCount++;
            checkDate.setDate(checkDate.getDate() - 1);
          } else {
            break;
          }
        }
      }

      const currentLevelData = await prisma.level.findFirst({
        where: {
          xpRequired: { lte: user.totalXp }
        },
        orderBy: { xpRequired: "desc" },
        select: { id: true, name: true, xpRequired: true }
      });

      const nextLevelData = await prisma.level.findFirst({
        where: {
          xpRequired: { gt: user.totalXp }
        },
        orderBy: { xpRequired: "asc" },
        select: { id: true, name: true, xpRequired: true }
      });

      return {
        success: true,
        message: "User summary retrieved successfully",
        data: {
          userName: user.name,
          totalXp: user.totalXp,
          completedChallenges,
          completedLevels,
          totalLevels,
          earnedBadges,
          currentLevel: currentLevelData || { id: 1, name: "Newbie", xpRequired: 0 },
          nextLevel: nextLevelData || null,
          studyActivity,
          streakCount,
        }
      };
    } catch (error) {
      console.error("Error fetching user summary:", error);
      return {
        success: false,
        message: "Failed to fetch user summary",
      };
    }
  }

  static async getQuestionnaireStatus(userId: number) {
    try {
      const [ueqCount, mrcCount] = await Promise.all([
        prisma.uEQSession.count({ where: { userId } }),
        prisma.response.count({ where: { userId } }),
      ]);

      return {
        success: true,
        message: "Status kuesioner berhasil diambil",
        data: {
          ueqCompleted: ueqCount > 0,
          mrcCompleted: mrcCount > 0,
        },
      };
    } catch (error) {
      console.error("Error fetching questionnaire status:", error);
      return {
        success: false,
        message: "Failed to fetch questionnaire status",
      };
    }
  }
}

