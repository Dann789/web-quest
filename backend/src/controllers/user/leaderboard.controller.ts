import prisma from "../../config/database";

export class LeaderboardController {
  /**
   * Get global leaderboard (all users ranked by XP)
   */
  static async getGlobalLeaderboard(options?: { limit?: number; offset?: number }) {
    try {
      const limit = options?.limit || 10;
      const offset = options?.offset || 0;

      // Get users sorted by XP
      const users = await prisma.user.findMany({
        where: {
          role: 'USER', // Only students, not admins
        },
        select: {
          id: true,
          username: true,
          totalXp: true,
          createdAt: true,
          _count: {
            select: {
              userChallengeAttempts: {
                where: {
                  isCorrect: true,
                  isFirstAttempt: true,
                },
              },
              userMaterialProgress: {
                where: {
                  isCompleted: true,
                },
              },
            },
          },
        },
        orderBy: [
          { totalXp: 'desc' },
          { createdAt: 'asc' }, // Earlier users win ties
        ],
        skip: offset,
        take: limit,
      });

      // Add ranking
      const leaderboard = users.map((user, index) => ({
        rank: offset + index + 1,
        userId: user.id,
        username: user.username,
        totalXp: user.totalXp,
        challengesCompleted: user._count.userChallengeAttempts,
        materialsCompleted: user._count.userMaterialProgress,
      }));

      // Get total count
      const totalUsers = await prisma.user.count({
        where: { role: 'USER' },
      });

      return {
        success: true,
        message: "Global leaderboard retrieved",
        data: {
          leaderboard,
          pagination: {
            total: totalUsers,
            limit,
            offset,
            hasMore: offset + limit < totalUsers,
          },
        },
      };
    } catch (e: unknown) {
      console.error(`Error getting global leaderboard:`, e);
      return {
        success: false,
        message: `Failed to get leaderboard: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  /**
   * Get leaderboard for a specific level
   */
  static async getLevelLeaderboard(levelId: number, options?: { limit?: number }) {
    try {
      const limit = options?.limit || 10;

      // Check if level exists
      const level = await prisma.level.findUnique({
        where: { id: levelId },
      });

      if (!level) {
        return {
          success: false,
          message: "Level not found",
        };
      }

      // Get user progress for this level, sorted by XP earned
      const userProgress = await prisma.userProgress.findMany({
        where: {
          levelId,
          isUnlocked: true,
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              role: true,
            },
          },
        },
        orderBy: [
          { totalXpEarned: 'desc' },
          { progressPercentage: 'desc' },
        ],
        take: limit,
      });

      // Filter out admins and add ranking
      const leaderboard = userProgress
        .filter(up => up.user.role === 'USER')
        .map((up, index) => ({
          rank: index + 1,
          userId: up.user.id,
          username: up.user.username,
          xpEarned: up.totalXpEarned,
          materialsCompleted: up.materialsCompleted,
          challengesCompleted: up.challengesCompleted,
          progressPercentage: up.progressPercentage,
          isCompleted: up.completedAt !== null,
        }));

      return {
        success: true,
        message: `Leaderboard for Level: ${level.name}`,
        data: {
          level: {
            id: level.id,
            name: level.name,
            order: level.order,
          },
          leaderboard,
          total: leaderboard.length,
        },
      };
    } catch (e: unknown) {
      console.error(`Error getting level leaderboard:`, e);
      return {
        success: false,
        message: `Failed to get leaderboard: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  /**
   * Get user's rank in global leaderboard
   */
  static async getUserRank(userId: number) {
    try {
      // Check if user exists
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          username: true,
          totalXp: true,
          role: true,
        },
      });

      if (!user) {
        return {
          success: false,
          message: "User not found",
        };
      }

      // Count users with higher XP
      const usersAbove = await prisma.user.count({
        where: {
          role: 'USER',
          totalXp: { gt: user.totalXp },
        },
      });

      const rank = usersAbove + 1;

      // Get total users
      const totalUsers = await prisma.user.count({
        where: { role: 'USER' },
      });

      // Get users around this user (2 above, 2 below)
      const usersAround = await prisma.user.findMany({
        where: {
          role: 'USER',
          OR: [
            { totalXp: { gt: user.totalXp } },
            { totalXp: user.totalXp },
            { totalXp: { lt: user.totalXp } },
          ],
        },
        select: {
          id: true,
          username: true,
          totalXp: true,
        },
        orderBy: { totalXp: 'desc' },
        take: 10,
      });

      // Get user's stats
      const completedChallenges = await prisma.userChallengeAttempt.count({
        where: {
          userId,
          isCorrect: true,
          isFirstAttempt: true,
        },
      });

      const completedMaterials = await prisma.userMaterialProgress.count({
        where: {
          userId,
          isCompleted: true,
        },
      });

      return {
        success: true,
        message: "User rank retrieved",
        data: {
          user: {
            id: user.id,
            username: user.username,
            totalXp: user.totalXp,
          },
          rank,
          totalUsers,
          percentile: totalUsers > 0 ? Math.round(((totalUsers - rank) / totalUsers) * 100) : 0,
          stats: {
            challengesCompleted: completedChallenges,
            materialsCompleted: completedMaterials,
          },
          nearbyUsers: usersAround.map((u, index) => ({
            rank: index + 1,
            userId: u.id,
            username: u.username,
            totalXp: u.totalXp,
            isCurrentUser: u.id === userId,
          })),
        },
      };
    } catch (e: unknown) {
      console.error(`Error getting user rank:`, e);
      return {
        success: false,
        message: `Failed to get rank: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  /**
   * Get top performers (for homepage/dashboard)
   */
  static async getTopPerformers(limit: number = 5) {
    try {
      const topUsers = await prisma.user.findMany({
        where: { role: 'USER' },
        select: {
          id: true,
          username: true,
          totalXp: true,
        },
        orderBy: { totalXp: 'desc' },
        take: limit,
      });

      return {
        success: true,
        message: "Top performers retrieved",
        data: topUsers.map((user, index) => ({
          rank: index + 1,
          userId: user.id,
          username: user.username,
          totalXp: user.totalXp,
        })),
      };
    } catch (e: unknown) {
      console.error(`Error getting top performers:`, e);
      return {
        success: false,
        message: `Failed to get top performers: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }
}
