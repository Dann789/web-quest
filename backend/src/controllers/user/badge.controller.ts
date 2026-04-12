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
          iconPath: true,
          rarity: true,
          createdAt: true,
        },
        orderBy: { rarity: "asc" },
      });

      return {
        success: true,
        message: "All badges retrieved",
        data: {
          badges: badges,
          // total: badges.length,
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
              iconPath: true,
              rarity: true,
            },
          },
        },
        orderBy: { earnedAt: "desc" },
      });

      // Get all badges to show progress
      const allBadges = await prisma.badge.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          iconPath: true,
          rarity: true,
        },
      });

      const earnedBadgeIds = new Set(userBadges.map((ub) => ub.badgeId));

      const badgesWithStatus = allBadges.map((badge) => ({
        ...badge,
        isEarned: earnedBadgeIds.has(badge.id),
        earnedAt:
          userBadges.find((ub) => ub.badgeId === badge.id)?.earnedAt || null,
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
          earned: userBadges.map((ub) => ({
            badgeId: ub.badge.id,
            name: ub.badge.name,
            description: ub.badge.description,
            iconPath: ub.badge.iconPath,
            rarity: ub.badge.rarity,
            earnedAt: ub.earnedAt,
          })),
          all: badgesWithStatus,
          stats: {
            // totalBadges: allBadges.length,
            earnedBadges: userBadges.length,
            progress:
              allBadges.length > 0
                ? Math.round((userBadges.length / allBadges.length) * 100)
                : 0,
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

  static async earnedBadge(userId: number, badgeId: number) {
    try {
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
        message: `Badge "${userBadge.badge.name}" awarded!`,
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
