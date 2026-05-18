import { UserRole } from "@prisma/client";
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
      const user = await prisma.user.findUnique({
        where: { id: userId, role: UserRole.MAHASISWA },
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

  static async checkAndAward(
    userId: number,
    category: "LEVEL" | "CHALLENGE" | "MATERIAL" | "LEADERBOARD"
  ): Promise<{ id: number; name: string; description: string; iconPath: string; rarity: string }[]> {
    const newBadges: { id: number; name: string; description: string; iconPath: string; rarity: string }[] = [];
    try {
      const userBadges = await prisma.userBadge.findMany({
        where: { userId },
        select: { badgeId: true },
      });
      const ownedIds = new Set(userBadges.map((ub) => ub.badgeId));

      if (category === "LEVEL") {
        const b1 = await this.checkUnlock3Levels(userId, ownedIds);
        const b2 = await this.checkCompleteLevel1(userId, ownedIds);
        const b3 = await this.checkUnlockAllLevels(userId, ownedIds);
        if (b1) newBadges.push(b1);
        if (b2) newBadges.push(b2);
        if (b3) newBadges.push(b3);
      }

      if (category === "CHALLENGE") {
        const b1 = await this.checkHard4(userId, ownedIds);
        const b2 = await this.checkHard12(userId, ownedIds);
        const b3 = await this.check5DayStreak(userId, ownedIds);
        if (b1) newBadges.push(b1);
        if (b2) newBadges.push(b2);
        if (b3) newBadges.push(b3);
      }

      if (category === "MATERIAL") {
        const b1 = await this.checkAllMaterialDone(userId, ownedIds);
        if (b1) newBadges.push(b1);
      }

      if (category === "LEADERBOARD") {
        const b1 = await this.checkTop3Leaderboard(userId, ownedIds);
        if (b1) newBadges.push(b1);
      }
    } catch (e) {
      console.error("[checkAndAward] Error:", e);
    }
    return newBadges;
  }

  private static async awardIfNew(
    userId: number,
    badgeName: string,
    ownedIds: Set<number>
  ): Promise<{ id: number; name: string; description: string; iconPath: string; rarity: string } | null> {
    const badge = await prisma.badge.findUnique({ where: { name: badgeName } });
    if (!badge) {
      console.warn(`[awardIfNew] Badge "${badgeName}" tidak ditemukan di database.`);
      return null;
    }
    if (!ownedIds.has(badge.id)) {
      await prisma.userBadge.create({ data: { userId, badgeId: badge.id } });
      ownedIds.add(badge.id);
      console.log(`[Badge] "${badgeName}" diberikan ke userId=${userId}`);
      return { id: badge.id, name: badge.name, description: badge.description, iconPath: badge.iconPath, rarity: badge.rarity };
    }
    return null;
  }

  private static async checkUnlock3Levels(
    userId: number,
    ownedIds: Set<number>
  ): Promise<{ id: number; name: string; description: string; iconPath: string; rarity: string } | null> {
    const unlockedCount = await prisma.progress.count({
      where: { userId, isUnlocked: true },
    });
    if (unlockedCount == 3) {
      return await this.awardIfNew(userId, "Web Explorer", ownedIds);
    }
    return null;
  }

  private static async checkCompleteLevel1(
    userId: number,
    ownedIds: Set<number>
  ): Promise<{ id: number; name: string; description: string; iconPath: string; rarity: string } | null> {
    const level1Done = await prisma.progress.findFirst({
      where: { userId, levelId: 1, completedAt: { not: null } },
    });
    if (level1Done) {
      return await this.awardIfNew(userId, "Web Beginner", ownedIds);
    }
    return null;
  }

  private static async checkUnlockAllLevels(
    userId: number,
    ownedIds: Set<number>
  ): Promise<{ id: number; name: string; description: string; iconPath: string; rarity: string } | null> {
    const totalLevels = await prisma.level.count();
    const unlockedByUser = await prisma.progress.count({ where: { userId, isUnlocked: true } });

    if (totalLevels > 0 && unlockedByUser == totalLevels) {
      return await this.awardIfNew(userId, "Web Adventurer", ownedIds);
    }
    return null;
  }

  private static async checkHard4(
    userId: number,
    ownedIds: Set<number>
  ): Promise<{ id: number; name: string; description: string; iconPath: string; rarity: string } | null> {
    const hardDone = await prisma.assignment.count({
      where: {
        userId,
        isCompleted: true,
        challenge: { difficulty: "HARD" },
      },
    });
    if (hardDone >= 4) {
      return await this.awardIfNew(userId, "Brave Coder", ownedIds);
    }
    return null;
  }

  private static async checkHard12(
    userId: number,
    ownedIds: Set<number>
  ): Promise<{ id: number; name: string; description: string; iconPath: string; rarity: string } | null> {
    const hardDone = await prisma.assignment.count({
      where: {
        userId,
        isCompleted: true,
        challenge: { difficulty: "HARD" },
      },
    });
    if (hardDone >= 12) {
      return await this.awardIfNew(userId, "Hard Challenger", ownedIds);
    }
    return null;
  }

  private static async checkAllMaterialDone(
    userId: number,
    ownedIds: Set<number>
  ): Promise<{ id: number; name: string; description: string; iconPath: string; rarity: string } | null> {
    const [totalMaterials, completedByUser] = await Promise.all([
      prisma.material.count(),
      prisma.materialProgress.count({
        where: { userId, isCompleted: true },
      }),
    ]);
    if (totalMaterials > 0 && completedByUser >= totalMaterials) {
      return await this.awardIfNew(userId, "Dedicated Learner", ownedIds);
    }
    return null;
  }

  private static async checkTop3Leaderboard(
  userId: number,
  ownedIds: Set<number>
): Promise<{ id: number; name: string; description: string; iconPath: string; rarity: string } | null> {
  try {
    const now = new Date();
    const day = now.getDay();
    if (day !== 5) return null;

    const startOfWeek = new Date(now);
    const diff = startOfWeek.getDate() - 4;
    startOfWeek.setDate(diff);
    startOfWeek.setHours(0, 0, 0, 0);

    const weeklyLeaderboard = await prisma.attempt.groupBy({
      by: ['userId'],
      where: {
        submittedAt: { gte: startOfWeek },
        xpEarned: { gt: 0 },
        user: { role: "MAHASISWA" }
      },
      _sum: { xpEarned: true },
      orderBy: { _sum: { xpEarned: 'desc' } },
      take: 3,
    });

    const userRankIndex = weeklyLeaderboard.findIndex((u) => u.userId === userId);

    if (userRankIndex !== -1) {
      const awardedBadge = await this.awardIfNew(userId, "Top Performer", ownedIds);

      if (awardedBadge) {
        const xpRewards = [150, 125, 100];
        const xpToAward = xpRewards[userRankIndex];

        await prisma.user.update({
          where: { id: userId },
          data: {
            totalXp: { increment: xpToAward },
          },
        });
        console.log(`User ${userId} mendapat ${xpToAward} XP karena Rank ${userRankIndex + 1}`);
        return awardedBadge;
      }
    }
    return null;
  } catch (error) {
    console.error("[checkTop3Leaderboard] Error:", error);
    return null;
  }
}



  private static async check5DayStreak(
    userId: number,
    ownedIds: Set<number>
  ): Promise<{ id: number; name: string; description: string; iconPath: string; rarity: string } | null> {
    const attempts = await prisma.attempt.findMany({
      where: { userId, xpEarned: { gt: 0 } },
      select: { submittedAt: true },
      orderBy: { submittedAt: "desc" },
    });

    const toDateStr = (d: Date) =>
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

    const uniqueDates = [
      ...new Set(attempts.map((a) => toDateStr(a.submittedAt))),
    ];
    uniqueDates.sort((a, b) => (a > b ? -1 : 1));

    let streak = 1;
    for (let i = 0; i < uniqueDates.length - 1; i++) {
      const curr = new Date(uniqueDates[i]!);
      const prev = new Date(uniqueDates[i + 1]!);
      const diffDays =
        (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
      if (diffDays === 1) {
        streak++;
        if (streak >= 5) break;
      } else {
        break;
      }
    }

    if (streak >= 5) {
      return await this.awardIfNew(userId, "Consistent Learner", ownedIds);
    }
    return null;
  }
}
