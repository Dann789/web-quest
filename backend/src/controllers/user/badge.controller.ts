import prisma from "../../config/database";

export class UserBadgeController {
  /**
   * Get all available badges
   */
  static async getAllBadges() {
    try {
      const badges = await prisma.badge.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          conditionType: true,
          conditionValue: true,
          iconUrl: true,
          rarity: true,
          createdAt: true,
          _count: {
            select: {
              userBadges: true,
            },
          },
        },
        orderBy: [
          { rarity: 'asc' },
          { name: 'asc' },
        ],
      });

      const formattedBadges = badges.map(badge => ({
        ...badge,
        totalEarned: badge._count.userBadges,
        _count: undefined,
      }));

      return {
        success: true,
        message: "All badges retrieved",
        data: {
          badges: formattedBadges,
          total: formattedBadges.length,
        },
      };
    } catch (e: unknown) {
      console.error(`Error getting all badges:`, e);
      return {
        success: false,
        message: `Failed to get badges: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  /**
   * Get badges earned by a specific user
   */
  static async getUserBadges(userId: number) {
    try {
      // Check if user exists
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

      // Get user's earned badges
      const userBadges = await prisma.userBadge.findMany({
        where: { userId },
        include: {
          badge: {
            select: {
              id: true,
              name: true,
              description: true,
              iconUrl: true,
              rarity: true,
            },
          },
        },
        orderBy: { earnedAt: 'desc' },
      });

      // Get all badges to show progress
      const allBadges = await prisma.badge.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          conditionType: true,
          conditionValue: true,
          iconUrl: true,
          rarity: true,
        },
      });

      const earnedBadgeIds = new Set(userBadges.map(ub => ub.badgeId));

      const badgesWithStatus = allBadges.map(badge => ({
        ...badge,
        isEarned: earnedBadgeIds.has(badge.id),
        earnedAt: userBadges.find(ub => ub.badgeId === badge.id)?.earnedAt || null,
      }));

      return {
        success: true,
        message: `Badges for ${user.username}`,
        data: {
          user: {
            id: user.id,
            username: user.username,
            totalXp: user.totalXp,
          },
          earned: userBadges.map(ub => ({
            badgeId: ub.badge.id,
            name: ub.badge.name,
            description: ub.badge.description,
            iconUrl: ub.badge.iconUrl,
            rarity: ub.badge.rarity,
            earnedAt: ub.earnedAt,
          })),
          all: badgesWithStatus,
          stats: {
            totalBadges: allBadges.length,
            earnedBadges: userBadges.length,
            progress: allBadges.length > 0 ? Math.round((userBadges.length / allBadges.length) * 100) : 0,
          },
        },
      };
    } catch (e: unknown) {
      console.error(`Error getting user badges:`, e);
      return {
        success: false,
        message: `Failed to get user badges: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  /**
   * Check and award badges to user based on their achievements
   */
  static async checkAndAwardBadges(userId: number): Promise<string[]> {
    const awardedBadges: string[] = [];

    try {
      // Get user data
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) return awardedBadges;

      // Get all badges
      const badges = await prisma.badge.findMany();

      // Get user's current badges
      const userBadges = await prisma.userBadge.findMany({
        where: { userId },
        select: { badgeId: true },
      });

      const earnedBadgeIds = new Set(userBadges.map(ub => ub.badgeId));

      // Get user stats
      const stats = await this.getUserStats(userId);

      // Check each badge condition
      for (const badge of badges) {
        if (earnedBadgeIds.has(badge.id)) continue;

        const condition = badge.conditionValue as any;
        let shouldAward = false;

        switch (badge.conditionType) {
          case 'XP_TOTAL':
            shouldAward = user.totalXp >= (condition.value || 0);
            break;
          case 'CHALLENGE_COMPLETE':
            shouldAward = stats.completedChallenges >= (condition.value || 0);
            break;
          case 'MATERIAL_COMPLETE':
            shouldAward = stats.completedMaterials >= (condition.value || 0);
            break;
          case 'LEVEL_COMPLETE':
            shouldAward = stats.completedLevels >= (condition.value || 0);
            break;
          case 'FIRST_ATTEMPT_STREAK':
            shouldAward = stats.firstAttemptStreak >= (condition.value || 0);
            break;
          case 'PERFECT_SCORE':
            shouldAward = stats.perfectScores >= (condition.value || 0);
            break;
          case 'LOGIN_STREAK':
            // This would need separate tracking
            break;
          default:
            console.log(`Unknown condition type: ${badge.conditionType}`);
        }

        if (shouldAward) {
          await prisma.userBadge.create({
            data: {
              userId,
              badgeId: badge.id,
            },
          });
          awardedBadges.push(badge.name);
        }
      }

      return awardedBadges;
    } catch (e: unknown) {
      console.error(`Error checking badges:`, e);
      return awardedBadges;
    }
  }

  /**
   * Get user stats for badge checking
   */
  static async getUserStats(userId: number) {
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

    const completedLevels = await prisma.userProgress.count({
      where: {
        userId,
        completedAt: { not: null },
      },
    });

    const firstAttemptCorrect = await prisma.userChallengeAttempt.count({
      where: {
        userId,
        isCorrect: true,
        isFirstAttempt: true,
      },
    });

    // For perfect scores, count challenges completed under ideal time
    const perfectScores = await prisma.userChallengeAttempt.count({
      where: {
        userId,
        isCorrect: true,
        isFirstAttempt: true,
      },
    });

    return {
      completedChallenges,
      completedMaterials,
      completedLevels,
      firstAttemptStreak: firstAttemptCorrect, // Simplified
      perfectScores,
    };
  }

  /**
   * Award a specific badge to user (manual award)
   */
  static async awardBadge(userId: number, badgeId: number) {
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

      // Check if badge exists
      const badge = await prisma.badge.findUnique({
        where: { id: badgeId },
      });

      if (!badge) {
        return {
          success: false,
          message: "Badge not found",
        };
      }

      // Check if already has badge
      const existing = await prisma.userBadge.findUnique({
        where: {
          idx_user_badge_unique: {
            userId,
            badgeId,
          },
        },
      });

      if (existing) {
        return {
          success: false,
          message: "User already has this badge",
        };
      }

      // Award badge
      const userBadge = await prisma.userBadge.create({
        data: {
          userId,
          badgeId,
        },
        include: {
          badge: true,
        },
      });

      return {
        success: true,
        message: `Badge "${badge.name}" awarded!`,
        data: {
          badge: userBadge.badge,
          earnedAt: userBadge.earnedAt,
        },
      };
    } catch (e: unknown) {
      console.error(`Error awarding badge:`, e);
      return {
        success: false,
        message: `Failed to award badge: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }
}
