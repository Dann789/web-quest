import { UserRole } from "@prisma/client";
import prisma from "../../config/database";
import { type CreateUserRequest, type UpdateUserRequest } from "../../types";

export class UserController {
  static async getAllUsers() {
    try {
      const users = await prisma.user.findMany({
        where: {
          role: {
            in: [UserRole.DOSEN, UserRole.MAHASISWA],
          },
        },
        select: {
          id: true,
          username: true,
          name: true,
          email: true,
          role: true,
          totalXp: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
      return {
        success: true,
        message: "List Data User",
        data: users,
      };
    } catch (e: unknown) {
      console.error(`Error getting users: ${e}`);
      return {
        success: false,
        message: "Failed to get users",
      };
    }
  }

  static async createUser(options: CreateUserRequest) {
    try {
      const { username, name, email, password, role } = options;

      if (!username || !name || !email || !password) {
        return {
          success: false,
          message: "Username, name, email, and password are required",
        };
      }

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        return {
          success: false,
          message: "Email already exists",
        };
      }

      // Check username uniqueness
      const existingUsername = await prisma.user.findUnique({
        where: { username },
      });
      if (existingUsername) {
        return {
          success: false,
          message: "NIM/NIP sudah digunakan oleh user lain",
        };
      }

      const hashedPassword = await Bun.password.hash(password);
      const resolvedRole = role ?? UserRole.MAHASISWA;

      const user = await prisma.user.create({
        data: {
          username,
          name,
          email,
          password: hashedPassword,
          role: resolvedRole,
          totalXp: 0,
          ...(resolvedRole === UserRole.MAHASISWA && {
            progress: {
              create: {
                levelId: 1,
                isUnlocked: true,
                unlockedAt: new Date(),
              },
            },
          }),
        },
        select: {
          id: true,
          username: true,
          name: true,
          email: true,
          role: true,
          totalXp: true,
          createdAt: true,
        },
      });

      return {
        success: true,
        message: "User Created Successfully!",
        data: user,
      };
    } catch (e: unknown) {
      console.error(`Error creating user: ${e}`);
      return {
        success: false,
        message: "Failed to create user",
      };
    }
  }

  static async getUserById(id: number) {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          totalXp: true,
          createdAt: true,
        },
      });

      if (!user) {
        return {
          success: false,
          message: "User not found",
        };
      }

      return {
        success: true,
        message: "User Found!",
        data: user,
      };
    } catch (e: unknown) {
      console.error(`Error getting user by id: ${e}`);
      return {
        success: false,
        message: "Failed to get user by id",
      };
    }
  }

  static async updateUser(id: number, options: UpdateUserRequest) {
    try {
      const { username, name, email, password, role } = options;

      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { id },
      });

      if (!existingUser) {
        return {
          success: false,
          message: "User not found",
        };
      }

      // Check email uniqueness if email is being updated
      if (email && email !== existingUser.email) {
        const emailExists = await prisma.user.findUnique({
          where: { email },
        });

        if (emailExists) {
          return {
            success: false,
            message: "Email already exists",
          };
        }
      }

      // Prepare update data
      const updateData: any = {};
      if (username) updateData.username = username;
      if (name) updateData.name = name;
      if (email) updateData.email = email;
      if (role) updateData.role = role;
      if (password) {
        updateData.password = await Bun.password.hash(password);
      }

      // Update user
      const user = await prisma.user.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          username: true,
          name: true,
          email: true,
          role: true,
          totalXp: true,
          updatedAt: true,
        },
      });

      return {
        success: true,
        message: "User Updated Successfully!",
        data: user,
      };
    } catch (e: unknown) {
      console.error(`Error updating user: ${e}`);
      return {
        success: false,
        message: "Failed to update user",
      };
    }
  }

  static async deleteUser(id: number) {
    try {
      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { id },
      });

      if (!existingUser) {
        return {
          success: false,
          message: "User not found",
        };
      }

      // Prevent deleting the last admin
      if (existingUser.role === UserRole.ADMIN) {
        const adminCount = await prisma.user.count({
          where: { role: UserRole.ADMIN },
        });

        if (adminCount <= 1) {
          return {
            success: false,
            message: "Cannot delete the last admin account",
          };
        }
      }

      // Delete user
      await prisma.user.delete({
        where: { id },
      });

      return {
        success: true,
        message: "User Deleted Successfully!",
      };
    } catch (e: unknown) {
      console.error(`Error deleting user: ${e}`);
      return {
        success: false,
        message: "Failed to delete user",
      };
    }
  }

  static async getActiveStudentsToday() {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Generate the last 7 days timestamps (from 6 days ago up to today)
      const days = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        d.setHours(0, 0, 0, 0);
        days.push(d);
      }

      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      // We run 7 queries in parallel to be as fast as possible
      const activityPromises = days.map(async (dayStart) => {
        const dayEnd = new Date(dayStart);
        dayEnd.setDate(dayEnd.getDate() + 1); // midnight of the next day

        const count = await prisma.user.count({
          where: {
            role: UserRole.MAHASISWA,
            OR: [
              {
                attempts: {
                  some: {
                    submittedAt: { gte: dayStart, lt: dayEnd },
                  },
                },
              },
              {
                materialProgress: {
                  some: {
                    OR: [
                      { startedAt: { gte: dayStart, lt: dayEnd } },
                      { completedAt: { gte: dayStart, lt: dayEnd } },
                    ],
                  },
                },
              },
            ],
          },
        });

        return {
          day: dayNames[dayStart.getDay()],
          users: count,
        };
      });

      const weeklyChart = await Promise.all(activityPromises);

      // The last element in the array represents 'today'
      const activeCount = weeklyChart[weeklyChart.length - 1]?.users || 0;

      return {
        success: true,
        message: "Active students counted successfully",
        data: {
          todayCount: activeCount,
          weeklyChart: weeklyChart,
        },
      };
    } catch (e: unknown) {
      console.error(`Error getting active students today: ${e}`);
      return {
        success: false,
        message: "Failed to count active students",
        data: {
          todayCount: 0,
          weeklyChart: [],
        },
      };
    }
  }

  static async getNewUserThisWeek() {
    try {
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      startOfWeek.setHours(0, 0, 0, 0);

      const newUserCount = await prisma.user.count({
        where: {
          role: UserRole.MAHASISWA,
          createdAt: { gte: startOfWeek },
        },
      });

      return {
        success: true,
        message: "New users counted successfully",
        data: newUserCount,
      };
    } catch (e: unknown) {
      console.error(`Error getting new users this week: ${e}`);
      return {
        success: false,
        message: "Failed to count new users",
        data: 0,
      };
    }
  }
}
