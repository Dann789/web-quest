import { Difficulty, ChallengeMethod } from "@prisma/client";
import prisma from "../../config/database";
import {
  type CreateChallengeRequest,
  type UpdateChallengeRequest,
  type CreateVariantRequest,
  type UpdateVariantRequest,
} from "../../types";

export class ChallengeController {
  // ============================================
  // CHALLENGE CRUD
  // ============================================

  /**
   * Get all challenges with optional filters
   */
  static async getAllChallenges(filters?: {
    levelId?: number;
    difficulty?: Difficulty;
    method?: ChallengeMethod;
    isActive?: boolean;
  }) {
    try {
      const whereClause: any = {};

      if (filters?.levelId) whereClause.levelId = filters.levelId;
      if (filters?.difficulty) whereClause.difficulty = filters.difficulty;
      if (filters?.method) whereClause.method = filters.method;
      if (filters?.isActive !== undefined) whereClause.isActive = filters.isActive;

      const challenges = await prisma.challenge.findMany({
        where: whereClause,
        select: {
          id: true,
          levelId: true,
          title: true,
          description: true,
          difficulty: true,
          method: true,
          idealTime: true,
          xpBase: true,
          validationRules: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
          level: {
            select: {
              id: true,
              name: true,
              order: true,
            },
          },
          _count: {
            select: {
              challengeVariants: true,
            },
          },
        },
        orderBy: [
          { levelId: 'asc' },
          { difficulty: 'asc' },
        ],
      });

      // Format response
      const formattedChallenges = challenges.map(challenge => ({
        ...challenge,
        totalVariants: challenge._count.challengeVariants,
        _count: undefined,
      }));

      return {
        success: true,
        message: "List Data Challenge",
        data: formattedChallenges,
        total: formattedChallenges.length,
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
          validationRules: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
          level: {
            select: {
              id: true,
              name: true,
              order: true,
            },
          },
          challengeVariants: {
            select: {
              id: true,
              questionContent: true,
              starterCode: true,
              correctAnswer: true,
              testCases: true,
              difficultyWeight: true,
              createdAt: true,
            },
            orderBy: { id: 'asc' },
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
        data: {
          ...challenge,
          totalVariants: challenge.challengeVariants.length,
        },
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
        validationRules,
        isActive = true,
      } = options;

      // Validation
      if (!levelId || !title || !description || !difficulty || !method || !idealTime || !xpBase || !validationRules) {
        return {
          success: false,
          message: "All fields are required: levelId, title, description, difficulty, method, idealTime, xpBase, validationRules",
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
          validationRules,
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
          validationRules: true,
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
      if (options.validationRules !== undefined) updateData.validationRules = options.validationRules;
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
          validationRules: true,
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
        where: { id },
        include: {
          _count: {
            select: { challengeVariants: true },
          },
        },
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
        message: `Challenge Deleted Successfully! (${existingChallenge._count.challengeVariants} variants also deleted)`,
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
        where: { levelId, isActive: true },
        select: {
          id: true,
          title: true,
          description: true,
          difficulty: true,
          method: true,
          idealTime: true,
          xpBase: true,
          isActive: true,
          _count: {
            select: { challengeVariants: true },
          },
        },
        orderBy: { difficulty: 'asc' },
      });

      const formattedChallenges = challenges.map(c => ({
        ...c,
        totalVariants: c._count.challengeVariants,
        _count: undefined,
      }));

      return {
        success: true,
        message: `Challenges for Level: ${level.name}`,
        data: {
          level,
          challenges: formattedChallenges,
          totalChallenges: formattedChallenges.length,
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

  // ============================================
  // CHALLENGE VARIANT CRUD
  // ============================================

  /**
   * Add variant to challenge
   */
  static async addVariant(options: CreateVariantRequest) {
    try {
      const {
        challengeId,
        questionContent,
        starterCode,
        correctAnswer,
        testCases,
        difficultyWeight = 1.0,
      } = options;

      // Validation
      if (!challengeId || !questionContent) {
        return {
          success: false,
          message: "challengeId and questionContent are required",
        };
      }

      // Check if challenge exists
      const challenge = await prisma.challenge.findUnique({
        where: { id: challengeId },
      });

      if (!challenge) {
        return {
          success: false,
          message: "Challenge not found",
        };
      }

      // Check variant count (max 3 per challenge)
      const variantCount = await prisma.challengeVariant.count({
        where: { challengeId },
      });

      if (variantCount >= 3) {
        return {
          success: false,
          message: "Maximum 3 variants per challenge",
        };
      }

      // Create variant
      const variant = await prisma.challengeVariant.create({
        data: {
          challengeId,
          questionContent,
          starterCode,
          correctAnswer,
          testCases: testCases || {},
          difficultyWeight,
        },
        select: {
          id: true,
          challengeId: true,
          questionContent: true,
          starterCode: true,
          correctAnswer: true,
          testCases: true,
          difficultyWeight: true,
          createdAt: true,
        },
      });

      return {
        success: true,
        message: "Variant Added Successfully!",
        data: variant,
      };
    } catch (e: unknown) {
      console.error(`Error adding variant:`, e);
      return {
        success: false,
        message: `Failed to add variant: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  /**
   * Update variant
   */
  static async updateVariant(variantId: number, options: UpdateVariantRequest) {
    try {
      // Check if variant exists
      const existingVariant = await prisma.challengeVariant.findUnique({
        where: { id: variantId },
      });

      if (!existingVariant) {
        return {
          success: false,
          message: "Variant not found",
        };
      }

      // Prepare update data
      const updateData: any = {};
      if (options.questionContent !== undefined) updateData.questionContent = options.questionContent;
      if (options.starterCode !== undefined) updateData.starterCode = options.starterCode;
      if (options.correctAnswer !== undefined) updateData.correctAnswer = options.correctAnswer;
      if (options.testCases !== undefined) updateData.testCases = options.testCases;
      if (options.difficultyWeight !== undefined) updateData.difficultyWeight = options.difficultyWeight;

      // Check if there's anything to update
      if (Object.keys(updateData).length === 0) {
        return {
          success: false,
          message: "No fields to update",
        };
      }

      // Update variant
      const variant = await prisma.challengeVariant.update({
        where: { id: variantId },
        data: updateData,
        select: {
          id: true,
          challengeId: true,
          questionContent: true,
          starterCode: true,
          correctAnswer: true,
          testCases: true,
          difficultyWeight: true,
          createdAt: true,
        },
      });

      return {
        success: true,
        message: "Variant Updated Successfully!",
        data: variant,
      };
    } catch (e: unknown) {
      console.error(`Error updating variant:`, e);
      return {
        success: false,
        message: `Failed to update variant: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  /**
   * Delete variant
   */
  static async deleteVariant(variantId: number) {
    try {
      // Check if variant exists
      const existingVariant = await prisma.challengeVariant.findUnique({
        where: { id: variantId },
      });

      if (!existingVariant) {
        return {
          success: false,
          message: "Variant not found",
        };
      }

      // Delete variant
      await prisma.challengeVariant.delete({
        where: { id: variantId },
      });

      return {
        success: true,
        message: "Variant Deleted Successfully!",
      };
    } catch (e: unknown) {
      console.error(`Error deleting variant:`, e);
      return {
        success: false,
        message: `Failed to delete variant: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  /**
   * Get all variants for a challenge
   */
  static async getVariantsByChallenge(challengeId: number) {
    try {
      // Check if challenge exists
      const challenge = await prisma.challenge.findUnique({
        where: { id: challengeId },
        select: {
          id: true,
          title: true,
          method: true,
        },
      });

      if (!challenge) {
        return {
          success: false,
          message: "Challenge not found",
        };
      }

      const variants = await prisma.challengeVariant.findMany({
        where: { challengeId },
        select: {
          id: true,
          questionContent: true,
          starterCode: true,
          correctAnswer: true,
          testCases: true,
          difficultyWeight: true,
          createdAt: true,
        },
        orderBy: { id: 'asc' },
      });

      return {
        success: true,
        message: `Variants for Challenge: ${challenge.title}`,
        data: {
          challenge,
          variants,
          totalVariants: variants.length,
        },
      };
    } catch (e: unknown) {
      console.error(`Error getting variants:`, e);
      return {
        success: false,
        message: `Failed to get variants: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }
}
