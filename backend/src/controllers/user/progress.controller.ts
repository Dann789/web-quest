import prisma from "../../config/database";
import { Decimal } from "@prisma/client/runtime/library";

export class UserProgressController {
  /**
   * Initialize progress for a new user (unlock Level 1)
   */
  static async initializeProgress(userId: number) {
    try {
      // Check if user exists
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return {
          success: false,
          message: "User not found",
        };
      }

      // Check if already initialized
      const existingProgress = await prisma.userProgress.findFirst({
        where: { userId },
      });

      if (existingProgress) {
        return {
          success: false,
          message: "Progress already initialized",
        };
      }

      // Get Level 1 (first level)
      const firstLevel = await prisma.level.findFirst({
        where: { order: 1 },
      });

      if (!firstLevel) {
        return {
          success: false,
          message: "Level 1 not found",
        };
      }

      // Create progress for Level 1 (unlocked)
      await prisma.userProgress.create({
        data: {
          userId,
          levelId: firstLevel.id,
          isUnlocked: true,
          unlockedAt: new Date(),
        },
      });

      return {
        success: true,
        message: "Progress initialized! Level 1 unlocked.",
        data: {
          levelId: firstLevel.id,
          levelName: firstLevel.name,
        },
      };
    } catch (e: unknown) {
      console.error(`Error initializing progress:`, e);
      return {
        success: false,
        message: `Failed to initialize progress: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  /**
   * Get overall progress for a user
   */
  static async getOverallProgress(userId: number) {
    try {
      // Get user with XP
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          username: true,
          totalXp: true,
        },
      });

      if (!user) {
        return {
          success: false,
          message: "User not found",
        };
      }

      // Get all levels with user progress
      const levels = await prisma.level.findMany({
        orderBy: { order: 'asc' },
        select: {
          id: true,
          name: true,
          order: true,
          xpRequired: true,
          _count: {
            select: {
              materials: true,
              challenges: true,
            },
          },
        },
      });

      // Get user progress for all levels
      const userProgress = await prisma.userProgress.findMany({
        where: { userId },
        select: {
          levelId: true,
          isUnlocked: true,
          materialsCompleted: true,
          challengesCompleted: true,
          totalXpEarned: true,
          progressPercentage: true,
          completedAt: true,
        },
      });

      // Create a map for quick lookup
      const progressMap = new Map(userProgress.map(p => [p.levelId, p]));

      // Combine levels with progress
      const levelProgress = levels.map(level => {
        const progress = progressMap.get(level.id);
        const canUnlock = user.totalXp >= level.xpRequired;
        
        return {
          levelId: level.id,
          levelName: level.name,
          order: level.order,
          xpRequired: level.xpRequired,
          totalMaterials: level._count.materials,
          totalChallenges: level._count.challenges,
          isUnlocked: progress?.isUnlocked || false,
          canUnlock: canUnlock && !progress?.isUnlocked,
          materialsCompleted: progress?.materialsCompleted || 0,
          challengesCompleted: progress?.challengesCompleted || 0,
          xpEarned: progress?.totalXpEarned || 0,
          progressPercentage: progress?.progressPercentage || 0,
          isCompleted: progress?.completedAt !== null && progress?.completedAt !== undefined,
        };
      });

      // Calculate overall stats
      const totalMaterials = levels.reduce((sum, l) => sum + l._count.materials, 0);
      const totalChallenges = levels.reduce((sum, l) => sum + l._count.challenges, 0);
      const completedMaterials = userProgress.reduce((sum, p) => sum + p.materialsCompleted, 0);
      const completedChallenges = userProgress.reduce((sum, p) => sum + p.challengesCompleted, 0);
      const unlockedLevels = userProgress.filter(p => p.isUnlocked).length;

      return {
        success: true,
        message: "Overall progress retrieved",
        data: {
          user: {
            id: user.id,
            username: user.username,
            totalXp: user.totalXp,
          },
          summary: {
            totalLevels: levels.length,
            unlockedLevels,
            completedLevels: userProgress.filter(p => p.completedAt).length,
            totalMaterials,
            completedMaterials,
            totalChallenges,
            completedChallenges,
          },
          levels: levelProgress,
        },
      };
    } catch (e: unknown) {
      console.error(`Error getting overall progress:`, e);
      return {
        success: false,
        message: `Failed to get progress: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  /**
   * Get detailed progress for a specific level
   */
  static async getLevelProgress(userId: number, levelId: number) {
    try {
      // Check if level exists
      const level = await prisma.level.findUnique({
        where: { id: levelId },
        select: {
          id: true,
          name: true,
          order: true,
          xpRequired: true,
          materials: {
            select: {
              id: true,
              title: true,
              xpReward: true,
              order: true,
            },
            orderBy: { order: 'asc' },
          },
          challenges: {
            where: { isActive: true },
            select: {
              id: true,
              title: true,
              difficulty: true,
              method: true,
              xpBase: true,
            },
          },
        },
      });

      if (!level) {
        return {
          success: false,
          message: "Level not found",
        };
      }

      // Get user progress for this level
      const userProgress = await prisma.userProgress.findUnique({
        where: {
          idx_user_progress_unique: {
            userId,
            levelId,
          },
        },
      });

      // Get material progress
      const materialProgress = await prisma.userMaterialProgress.findMany({
        where: {
          userId,
          materialId: { in: level.materials.map(m => m.id) },
        },
      });

      const materialProgressMap = new Map(materialProgress.map(p => [p.materialId, p]));

      // Get challenge attempts (first attempts only)
      const challengeAttempts = await prisma.userChallengeAttempt.findMany({
        where: {
          userId,
          challengeId: { in: level.challenges.map(c => c.id) },
          isFirstAttempt: true,
          isCorrect: true,
        },
        select: {
          challengeId: true,
          xpEarned: true,
        },
      });

      const completedChallenges = new Set(challengeAttempts.map(a => a.challengeId));

      // Combine materials with progress
      const materialsWithProgress = level.materials.map(material => ({
        ...material,
        isStarted: materialProgressMap.has(material.id),
        isCompleted: materialProgressMap.get(material.id)?.isCompleted || false,
        startedAt: materialProgressMap.get(material.id)?.startedAt || null,
        completedAt: materialProgressMap.get(material.id)?.completedAt || null,
      }));

      // Combine challenges with progress
      const challengesWithProgress = level.challenges.map(challenge => ({
        ...challenge,
        isCompleted: completedChallenges.has(challenge.id),
        xpEarned: challengeAttempts.find(a => a.challengeId === challenge.id)?.xpEarned || 0,
      }));

      return {
        success: true,
        message: `Progress for Level: ${level.name}`,
        data: {
          level: {
            id: level.id,
            name: level.name,
            order: level.order,
            xpRequired: level.xpRequired,
          },
          progress: {
            isUnlocked: userProgress?.isUnlocked || false,
            materialsCompleted: userProgress?.materialsCompleted || 0,
            challengesCompleted: userProgress?.challengesCompleted || 0,
            totalXpEarned: userProgress?.totalXpEarned || 0,
            progressPercentage: userProgress?.progressPercentage || 0,
            isCompleted: userProgress?.completedAt !== null && userProgress?.completedAt !== undefined,
          },
          materials: materialsWithProgress,
          challenges: challengesWithProgress,
        },
      };
    } catch (e: unknown) {
      console.error(`Error getting level progress:`, e);
      return {
        success: false,
        message: `Failed to get level progress: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  /**
   * Start reading a material
   */
  static async startMaterial(userId: number, materialId: number) {
    try {
      // Check if material exists
      const material = await prisma.material.findUnique({
        where: { id: materialId },
        include: { level: true },
      });

      if (!material) {
        return {
          success: false,
          message: "Material not found",
        };
      }

      // Check if level is unlocked
      const levelProgress = await prisma.userProgress.findUnique({
        where: {
          idx_user_progress_unique: {
            userId,
            levelId: material.levelId,
          },
        },
      });

      if (!levelProgress?.isUnlocked) {
        return {
          success: false,
          message: "Level is not unlocked yet",
        };
      }

      // Check if already started
      const existingProgress = await prisma.userMaterialProgress.findUnique({
        where: {
          idx_user_material_unique: {
            userId,
            materialId,
          },
        },
      });

      if (existingProgress) {
        return {
          success: true,
          message: "Material already started",
          data: existingProgress,
        };
      }

      // Create material progress
      const progress = await prisma.userMaterialProgress.create({
        data: {
          userId,
          materialId,
          startedAt: new Date(),
        },
      });

      return {
        success: true,
        message: "Material started!",
        data: {
          materialId: material.id,
          materialTitle: material.title,
          levelName: material.level.name,
          startedAt: progress.startedAt,
        },
      };
    } catch (e: unknown) {
      console.error(`Error starting material:`, e);
      return {
        success: false,
        message: `Failed to start material: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  /**
   * Complete a material and earn XP
   */
  static async completeMaterial(userId: number, materialId: number) {
    try {
      // Check if material exists
      const material = await prisma.material.findUnique({
        where: { id: materialId },
        include: { level: true },
      });

      if (!material) {
        return {
          success: false,
          message: "Material not found",
        };
      }

      // Check if level is unlocked
      const levelProgress = await prisma.userProgress.findUnique({
        where: {
          idx_user_progress_unique: {
            userId,
            levelId: material.levelId,
          },
        },
      });

      if (!levelProgress?.isUnlocked) {
        return {
          success: false,
          message: "Level is not unlocked yet",
        };
      }

      // Check if already completed
      const existingProgress = await prisma.userMaterialProgress.findUnique({
        where: {
          idx_user_material_unique: {
            userId,
            materialId,
          },
        },
      });

      if (existingProgress?.isCompleted) {
        return {
          success: false,
          message: "Material already completed",
        };
      }

      // Use transaction to update all related data
      const result = await prisma.$transaction(async (tx) => {
        // Update or create material progress
        const materialProgress = await tx.userMaterialProgress.upsert({
          where: {
            idx_user_material_unique: {
              userId,
              materialId,
            },
          },
          create: {
            userId,
            materialId,
            isCompleted: true,
            startedAt: new Date(),
            completedAt: new Date(),
          },
          update: {
            isCompleted: true,
            completedAt: new Date(),
          },
        });

        // Update user XP
        const user = await tx.user.update({
          where: { id: userId },
          data: {
            totalXp: { increment: material.xpReward },
          },
        });

        // Update level progress
        const totalMaterials = await tx.material.count({
          where: { levelId: material.levelId },
        });

        const completedMaterials = await tx.userMaterialProgress.count({
          where: {
            userId,
            isCompleted: true,
            material: { levelId: material.levelId },
          },
        });

        const completedChallenges = await tx.userChallengeAttempt.findMany({
          where: {
            userId,
            isCorrect: true,
            isFirstAttempt: true,
            challenge: { levelId: material.levelId },
          },
          distinct: ['challengeId'],
        });

        const totalChallenges = await tx.challenge.count({
          where: { levelId: material.levelId, isActive: true },
        });

        const totalItems = totalMaterials + totalChallenges;
        const completedItems = completedMaterials + completedChallenges.length;
        const progressPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

        const updatedLevelProgress = await tx.userProgress.update({
          where: {
            idx_user_progress_unique: {
              userId,
              levelId: material.levelId,
            },
          },
          data: {
            materialsCompleted: completedMaterials,
            totalXpEarned: { increment: material.xpReward },
            progressPercentage: new Decimal(progressPercentage.toFixed(2)),
            completedAt: progressPercentage >= 100 ? new Date() : null,
          },
        });

        return {
          materialProgress,
          user,
          levelProgress: updatedLevelProgress,
          completedMaterials,
          progressPercentage,
        };
      });

      // Check if new levels should be unlocked
      await this.checkAndUnlockLevels(userId, result.user.totalXp);

      return {
        success: true,
        message: "Material completed!",
        data: {
          materialId: material.id,
          materialTitle: material.title,
          xpEarned: material.xpReward,
          totalXp: result.user.totalXp,
          levelProgress: {
            materialsCompleted: result.completedMaterials,
            progressPercentage: result.progressPercentage,
          },
        },
      };
    } catch (e: unknown) {
      console.error(`Error completing material:`, e);
      return {
        success: false,
        message: `Failed to complete material: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  /**
   * Check and unlock levels based on XP
   */
  static async checkAndUnlockLevels(userId: number, totalXp: number) {
    try {
      // Get all levels user can unlock
      const levelsToUnlock = await prisma.level.findMany({
        where: {
          xpRequired: { lte: totalXp },
        },
        orderBy: { order: 'asc' },
      });

      const unlockedLevels: string[] = [];

      for (const level of levelsToUnlock) {
        // Check if already has progress
        const existing = await prisma.userProgress.findUnique({
          where: {
            idx_user_progress_unique: {
              userId,
              levelId: level.id,
            },
          },
        });

        if (!existing) {
          // Create new unlocked progress
          await prisma.userProgress.create({
            data: {
              userId,
              levelId: level.id,
              isUnlocked: true,
              unlockedAt: new Date(),
            },
          });
          unlockedLevels.push(level.name);
        } else if (!existing.isUnlocked) {
          // Update to unlocked
          await prisma.userProgress.update({
            where: { id: existing.id },
            data: {
              isUnlocked: true,
              unlockedAt: new Date(),
            },
          });
          unlockedLevels.push(level.name);
        }
      }

      return unlockedLevels;
    } catch (e: unknown) {
      console.error(`Error checking unlock levels:`, e);
      return [];
    }
  }

  /**
   * Get unlocked levels for user
   */
  static async getUnlockedLevels(userId: number) {
    try {
      const unlockedProgress = await prisma.userProgress.findMany({
        where: {
          userId,
          isUnlocked: true,
        },
        include: {
          level: {
            select: {
              id: true,
              name: true,
              order: true,
              xpRequired: true,
              _count: {
                select: {
                  materials: true,
                  challenges: true,
                },
              },
            },
          },
        },
        orderBy: {
          level: { order: 'asc' },
        },
      });

      const levels = unlockedProgress.map(p => ({
        levelId: p.level.id,
        levelName: p.level.name,
        order: p.level.order,
        totalMaterials: p.level._count.materials,
        totalChallenges: p.level._count.challenges,
        materialsCompleted: p.materialsCompleted,
        challengesCompleted: p.challengesCompleted,
        progressPercentage: p.progressPercentage,
        isCompleted: p.completedAt !== null,
        unlockedAt: p.unlockedAt,
      }));

      return {
        success: true,
        message: "Unlocked levels retrieved",
        data: {
          totalUnlocked: levels.length,
          levels,
        },
      };
    } catch (e: unknown) {
      console.error(`Error getting unlocked levels:`, e);
      return {
        success: false,
        message: `Failed to get unlocked levels: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }
}
