import { UserRole } from "@prisma/client";
import prisma from "../../config/database";
import { type CreateUserRequest, type UpdateUserRequest } from "../../types";

export class UserController {
  static async getAllUsers() {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          totalXp: true,
          createdAt: true,
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
      const { username, email, password, role = UserRole.USER } = options;

      if (!username || !email || !password) {
        return {
          success: false,
          message: "Username, email, and password are required",
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

      const hashedPassword = await Bun.password.hash(password);

      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          role,
          totalXp: 0,
        },
        select: {
          id: true,
          username: true,
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
      const { username, email, role } = options;

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

      // Prepare update data (only username, email, and role)
      const updateData: any = {};
      if (username) updateData.username = username;
      if (email) updateData.email = email;
      if (role) updateData.role = role;

      // Update user
      const user = await prisma.user.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          username: true,
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
}

