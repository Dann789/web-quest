import prisma from "../../config/database";
import { UserRole } from "@prisma/client";

export class LeaderboardController {
  static async getLeaderboardData(timeframe: string, page: number = 1, limit: number = 10) {
    let startDate: Date | undefined;
    let endDate: Date | undefined;
    const now = new Date();

    if (timeframe === "daily") {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    } else if (timeframe === "weekly") {
      const day = now.getDay();
      startDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - day,
      );
      endDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + (6 - day) + 1,
      );
    }

    try {
      const leaderboard = await prisma.user.findMany({
        where: { role: UserRole.MAHASISWA },
        select: {
          id: true,
          username: true,
          name: true,
          email: true,
          role: true,
          totalXp: true,
          attempts: {
            where:
              startDate && endDate
                ? {
                    submittedAt: {
                      gte: startDate,
                      lt: endDate,
                    },
                  }
                : undefined,
            select: {
              timeSpent: true,
              xpEarned: true,
            },
          },
          materialProgress: {
            where:
              startDate && endDate
                ? {
                    isCompleted: true,
                    completedAt: {
                      gte: startDate,
                      lt: endDate,
                    },
                  }
                : { isCompleted: true },
            select: {
              material: {
                select: { levelId: true },
              },
            },
          },
        },
        orderBy: { totalXp: "desc" },
      });

      const leaderboardWithAggregate = leaderboard
        .map((user) => {
          const totalTimeSpent = user.attempts.reduce(
            (acc, a) => acc + (a.timeSpent || 0),
            0,
          );

          const completedLevelIds = new Set(
            user.materialProgress.map((mp) => mp.material.levelId),
          );

          const displayXp =
            startDate && endDate
              ? user.attempts.reduce((acc, a) => acc + (a.xpEarned || 0), 0) +
                completedLevelIds.size * 15
              : user.totalXp;

          return {
            ...user,
            totalXp: displayXp,
            totalTimeSpent,
          };
        })
        .sort((a, b) => b.totalXp - a.totalXp)
        .map((user, index) => ({
          ...user,
          rank: index + 1
        }));

      const topThree = leaderboardWithAggregate.slice(0, 3);
      const others = leaderboardWithAggregate.slice(3);
      
      const total = others.length;
      const skip = (page - 1) * limit;
      const paginatedOthers = others.slice(skip, skip + limit);

      return {
        success: true,
        message: "Leaderboard retrieved successfully",
        data: {
          topThree,
          paginatedOthers,
        },
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Failed to retrieve leaderboard: " + error,
      };
    }
  }
}
