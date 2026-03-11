import { Difficulty, ChallengeMethod } from "@prisma/client";
import prisma from "../../config/database";
import {
  type CreateChallengeRequest,
  type UpdateChallengeRequest,
} from "../../types";

export class ChallengeController {
  /**
   * Get all challenges
   */
  static async getAllChallenges() {
    try {
      const challenges = await prisma.challenge.findMany({
        select: {
          id: true,
          levelId: true,
          title: true,
          description: true,
          difficulty: true,
          method: true,
          idealTime: true,
          xpBase: true,
          content: true,
          starterCode: true,
          testCases: true,
          hint: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
          level: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: [
          { levelId: 'asc' },
          { difficulty: 'asc' },
        ],
      });

      return {
        success: true,
        message: "List Data Challenge",
        data: challenges,
      };
    } catch (e: unknown) {
      console.error(`Error getting challenges:`, e);
      return {
        success: false,
        message: `Failed to get challenges: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  /**
   * Get challenge by ID with variants
   */
  static async getChallengeById(id: number) {
    try {
      const challenge = await prisma.challenge.findUnique({
        where: { id },
        select: {
          id: true,
          levelId: true,
          title: true,
          description: true,
          difficulty: true,
          method: true,
          idealTime: true,
          xpBase: true,
          content: true,
          starterCode: true,
          testCases: true,
          hint: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
          level: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      if (!challenge) {
        return {
          success: false,
          message: "Challenge not found",
        };
      }

      return {
        success: true,
        message: "Challenge Found!",
        data: challenge
      };
    } catch (e: unknown) {
      console.error(`Error getting challenge by id:`, e);
      return {
        success: false,
        message: `Failed to get challenge: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  /**
   * Create new challenge
   */
  static async createChallenge(options: CreateChallengeRequest) {
    try {
      const {
        levelId,
        title,
        description,
        difficulty,
        method,
        idealTime,
        xpBase,
        content,
        starterCode,
        testCases,
        hint,
        isActive = true,
      } = options;

      // Validation — only truly required fields
      if (!levelId || !title || !description || !difficulty || !method || !idealTime || !xpBase) {
        return {
          success: false,
          message: "Required fields: levelId, title, description, difficulty, method, idealTime, xpBase",
        };
      }

      // Check if level exists
      const levelExists = await prisma.level.findUnique({
        where: { id: levelId },
      });

      if (!levelExists) {
        return {
          success: false,
          message: "Level not found",
        };
      }

      // Create challenge
      const challenge = await prisma.challenge.create({
        data: {
          levelId,
          title,
          description,
          difficulty: difficulty as Difficulty,
          method: method as ChallengeMethod,
          idealTime,
          xpBase,
          content,
          starterCode,
          testCases,
          hint,
          isActive,
        },
        select: {
          id: true,
          levelId: true,
          title: true,
          description: true,
          difficulty: true,
          method: true,
          idealTime: true,
          xpBase: true,
          content: true,
          starterCode: true,
          testCases: true,
          hint: true,
          isActive: true,
          createdAt: true,
          level: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return {
        success: true,
        message: "Challenge Created Successfully!",
        data: challenge,
      };
    } catch (e: unknown) {
      console.error(`Error creating challenge:`, e);
      return {
        success: false,
        message: `Failed to create challenge: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  /**
   * Update challenge
   */
  static async updateChallenge(id: number, options: UpdateChallengeRequest) {
    try {
      // Check if challenge exists
      const existingChallenge = await prisma.challenge.findUnique({
        where: { id },
      });

      if (!existingChallenge) {
        return {
          success: false,
          message: "Challenge not found",
        };
      }

      // If levelId is being updated, check if new level exists
      if (options.levelId && options.levelId !== existingChallenge.levelId) {
        const levelExists = await prisma.level.findUnique({
          where: { id: options.levelId },
        });

        if (!levelExists) {
          return {
            success: false,
            message: "Level not found",
          };
        }
      }

      // Prepare update data
      const updateData: any = {};
      if (options.levelId !== undefined) updateData.levelId = options.levelId;
      if (options.title !== undefined) updateData.title = options.title;
      if (options.description !== undefined) updateData.description = options.description;
      if (options.difficulty !== undefined) updateData.difficulty = options.difficulty as Difficulty;
      if (options.method !== undefined) updateData.method = options.method as ChallengeMethod;
      if (options.idealTime !== undefined) updateData.idealTime = options.idealTime;
      if (options.xpBase !== undefined) updateData.xpBase = options.xpBase;
      if (options.content !== undefined) updateData.content = options.content;
      if (options.starterCode !== undefined) updateData.starterCode = options.starterCode;
      if (options.testCases !== undefined) updateData.testCases = options.testCases;
      if (options.hint !== undefined) updateData.hint = options.hint;
      if (options.isActive !== undefined) updateData.isActive = options.isActive;

      // Check if there's anything to update
      if (Object.keys(updateData).length === 0) {
        return {
          success: false,
          message: "No fields to update",
        };
      }

      // Update challenge
      const challenge = await prisma.challenge.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          levelId: true,
          title: true,
          description: true,
          difficulty: true,
          method: true,
          idealTime: true,
          xpBase: true,
          content: true,
          starterCode: true,
          testCases: true,
          hint: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
          level: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return {
        success: true,
        message: "Challenge Updated Successfully!",
        data: challenge,
      };
    } catch (e: unknown) {
      console.error(`Error updating challenge:`, e);
      return {
        success: false,
        message: `Failed to update challenge: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  /**
   * Delete challenge (will cascade delete variants)
   */
  static async deleteChallenge(id: number) {
    try {
      // Check if challenge exists
      const existingChallenge = await prisma.challenge.findUnique({
        where: { id }
      });

      if (!existingChallenge) {
        return {
          success: false,
          message: "Challenge not found",
        };
      }

      // Delete challenge (variants will be cascade deleted)
      await prisma.challenge.delete({
        where: { id },
      });

      return {
        success: true,
        message: "Challenge Deleted Successfully!",
      };
    } catch (e: unknown) {
      console.error(`Error deleting challenge:`, e);
      return {
        success: false,
        message: `Failed to delete challenge: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  /**
   * Get challenges by level
   */
  static async getChallengesByLevel(levelId: number) {
    try {
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

      const challenges = await prisma.challenge.findMany({
        where: { levelId }, // Dosen bisa melihat semua challenge termasuk inactive
        select: {
          id: true,
          title: true,
          description: true,
          difficulty: true,
          method: true,
          idealTime: true,
          xpBase: true,
          content: true,
          starterCode: true,
          testCases: true,
          hint: true,
          isActive: true,
          createdAt: true,
        },
        orderBy: { difficulty: 'asc' },
      });

      return {
        success: true,
        message: `Challenges for Level: ${level.name}`,
        data: {
          level,
          challenges: challenges,
          totalChallenges: challenges.length,
        },
      };
    } catch (e: unknown) {
      console.error(`Error getting challenges by level:`, e);
      return {
        success: false,
        message: `Failed to get challenges: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  /**
   * Get challenges filtered by method (DRAG_AND_DROP, CODING_MANUAL, FIX_THE_BUG)
   */
  static async getChallengeByMethod(method: ChallengeMethod) {
    try {
      // method is NOT @unique, so use findMany to get all challenges with that method
      const challenges = await prisma.challenge.findMany({
        where: { method },
        select: {
          id: true,
          levelId: true,
          title: true,
          description: true,
          difficulty: true,
          method: true,
          idealTime: true,
          xpBase: true,
          content: true,
          starterCode: true,
          testCases: true,
          hint: true,
          isActive: true,
          createdAt: true,
          level: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: [
          { levelId: 'asc' },
          { difficulty: 'asc' },
        ],
      });

      return {
        success: true,
        message: `Challenges with method: ${method}`,
        data: {
          method,
          challenges,
          total: challenges.length,
        },
      };
    } catch (e: unknown) {
      console.error(`Error getting challenges by method:`, e);
      return {
        success: false,
        message: `Failed to get challenges by method: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }
}
