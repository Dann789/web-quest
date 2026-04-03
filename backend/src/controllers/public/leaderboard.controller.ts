import prisma from "../../config/database";
import { UserRole } from "@prisma/client";

export class LeaderboardController {
  static async getLeaderboardData(timeframe: string) {
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
        },
        orderBy: { totalXp: "desc" },
      });

      const leaderboardWithAggregate = leaderboard
        .map((user) => {
          const totalXp = user.attempts.reduce(
            (acc, a) => acc + (a.xpEarned || 0),
            0,
          );
          const totalTimeSpent = user.attempts.reduce(
            (acc, a) => acc + (a.timeSpent || 0),
            0,
          );
          return {
            ...user,
            totalXp,
            totalTimeSpent,
          };
        })
        .sort((a, b) => b.totalXp - a.totalXp);

      return {
        success: true,
        message: "Leaderboard retrieved successfully",
        data: leaderboardWithAggregate,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Failed to retrieve leaderboard: " + error,
      };
    }
  }

  // static async getLeaderboardData() {
  //   try {
  //     const leaderboard = await prisma.user.findMany({
  //       where: { role: UserRole.MAHASISWA },
  //       select: {
  //         id: true,
  //         username: true,
  //         name: true,
  //         email: true,
  //         role: true,
  //         totalXp: true,
  //         attempts: {
  //           select: {
  //             timeSpent: true,
  //           },
  //         },
  //       },
  //       orderBy: { totalXp: "desc" },
  //     });

  //     const leaderboardWithTime = leaderboard.map((user) => ({
  //       ...user,
  //       totalTimeSpent: user.attempts.reduce(
  //         (acc, curr) => acc + (curr.timeSpent || 0),
  //         0,
  //       ),
  //     }));

  //     return {
  //       success: true,
  //       message: "Leaderboard retrieved successfully",
  //       data: leaderboardWithTime,
  //     };
  //   } catch (error) {
  //     console.error(error);
  //     return {
  //       success: false,
  //       message: "Failed to retrieve leaderboard: " + error,
  //     };
  //   }
  // }
}
