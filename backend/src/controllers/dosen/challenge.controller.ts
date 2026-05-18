import { Difficulty, ChallengeMethod } from "@prisma/client";
import prisma from "../../config/database";
import {
  type CreateChallengeRequest,
  type UpdateChallengeRequest,
} from "../../types";

// ============================================================
// Helpers: build content & testCases JSON berdasarkan method
// ============================================================

/**
 * Build kolom `content` (konfigurasi struktur soal).
 * Backend yang bertanggung jawab membentuk JSON ini.
 */
function buildContent(method: string, options: Partial<CreateChallengeRequest>): object {
  const levelId = options.levelId ? Number(options.levelId) : 1;
  const languageMap: Record<number, string> = {
    1: 'html',
    2: 'css',
    3: 'javascript',
    4: 'php',
    5: 'sql',
  };
  const language = languageMap[levelId] ?? 'html';

  const baseContent: any = {
    language,
    sandboxEnabled: options.sandboxEnabled ?? false,
    sandboxTemplate: options.sandboxTemplate ?? null,
    sandboxLevel: options.sandboxLevel ?? null,
  };

  switch (method) {
    case 'CODING_MANUAL':
      return {
        ...baseContent,
        starterCode: options.starterCode ?? '',
        correctAnswer: options.correctAnswer ?? '',
      };
    case 'FIX_THE_BUG':
      return {
        ...baseContent,
        buggyCode: options.buggyCode ?? '',
        correctAnswer: options.correctAnswer ?? '',
      };
    case 'DRAG_AND_DROP':
      return {
        ...baseContent,
        blocks: options.blocks ?? [],
        expectedOrder: options.expectedOrder ?? [],
      };
    default:
      return baseContent;
  }
}

/**
 * Build kolom `testCases` (logika validasi jawaban).
 * Auto-generate dari kunci jawaban — tidak butuh input manual dari dosen.
 */
function buildTestCases(method: string, options: Partial<CreateChallengeRequest>): object[] {
  switch (method) {
    case 'CODING_MANUAL':
      return [{
        input: null,
        expectedOutput: options.correctAnswer ?? '',
        isHidden: false,
        weight: 100,
      }];
    case 'FIX_THE_BUG':
      return [{
        input: null,
        expectedOutput: options.correctAnswer ?? '',
        isHidden: false,
        weight: 100,
      }];
    case 'DRAG_AND_DROP':
      return [{
        input: null,
        // expectedOutput = urutan benar yang digabung dengan \n sebagai separator
        expectedOutput: (options.expectedOrder ?? []).join('\n'),
        isHidden: false,
        weight: 100,
      }];
    default:
      return [];
  }
}

// ============================================================
// Controller
// ============================================================

export class ChallengeController {
  /**
   * Get all challenges with pagination and optional filters
   */
  static async getAllChallenges(page: number = 1, limit: number = 10, levelId?: number, method?: ChallengeMethod) {
    try {
      const skip = (page - 1) * limit;
      const where: any = {};
      if (levelId) where.levelId = levelId;
      if (method) where.method = method;

      const [challenges, total] = await Promise.all([
        prisma.challenge.findMany({
          where,
          skip,
          take: limit,
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
        }),
        prisma.challenge.count({ where })
      ]);

      return {
        success: true,
        message: "List Data Challenge",
        data: challenges,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
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
   * Get challenge by ID
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
   * Backend yang membangun JSON untuk kolom `content` dan `testCases`
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
        hint,
        isActive = true,
      } = options;

      // Validasi field wajib
      if (!levelId || !title || !description || !difficulty || !method || !idealTime || !xpBase) {
        return {
          success: false,
          message: "Required fields: levelId, title, description, difficulty, method, idealTime, xpBase",
        };
      }

      // Validasi method-specific fields
      if (method === 'CODING_MANUAL' && !options.correctAnswer) {
        return { success: false, message: "CODING_MANUAL membutuhkan correctAnswer" };
      }
      if (method === 'FIX_THE_BUG' && (!options.buggyCode || !options.correctAnswer)) {
        return { success: false, message: "FIX_THE_BUG membutuhkan buggyCode dan correctAnswer" };
      }
      if (method === 'DRAG_AND_DROP' && (!options.expectedOrder || options.expectedOrder.length === 0)) {
        return { success: false, message: "DRAG_AND_DROP membutuhkan expectedOrder" };
      }

      // Cek level ada
      const levelExists = await prisma.level.findUnique({ where: { id: levelId } });
      if (!levelExists) {
        return { success: false, message: "Level not found" };
      }

      // Build JSON columns di backend
      const contentJson = buildContent(method, options);
      const testCasesJson = buildTestCases(method, options);

      // starterCode tetap disimpan ke kolom terpisah untuk akses cepat di frontend
      const starterCode =
        method === 'CODING_MANUAL' ? (options.starterCode ?? null) :
        method === 'FIX_THE_BUG' ? (options.buggyCode ?? null) :
        null;

      const challenge = await prisma.challenge.create({
        data: {
          levelId,
          title,
          description,
          difficulty: difficulty as Difficulty,
          method: method as ChallengeMethod,
          idealTime,
          xpBase,
          content: contentJson,
          starterCode,
          testCases: testCasesJson,
          hint: hint ?? null,
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
            select: { id: true, name: true },
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
   * Backend merekonstruksi JSON columns jika method-specific fields dikirim
   */
  static async updateChallenge(id: number, options: UpdateChallengeRequest) {
    try {
      const existingChallenge = await prisma.challenge.findUnique({ where: { id } });
      if (!existingChallenge) {
        return { success: false, message: "Challenge not found" };
      }

      // Gunakan method lama jika tidak diupdate
      const activeMethod = (options.method ?? existingChallenge.method) as string;

      if (options.levelId && options.levelId !== existingChallenge.levelId) {
        const levelExists = await prisma.level.findUnique({ where: { id: options.levelId } });
        if (!levelExists) {
          return { success: false, message: "Level not found" };
        }
      }

      const updateData: any = {};
      if (options.levelId !== undefined) updateData.levelId = options.levelId;
      if (options.title !== undefined) updateData.title = options.title;
      if (options.description !== undefined) updateData.description = options.description;
      if (options.difficulty !== undefined) updateData.difficulty = options.difficulty as Difficulty;
      if (options.method !== undefined) updateData.method = options.method as ChallengeMethod;
      if (options.idealTime !== undefined) updateData.idealTime = options.idealTime;
      if (options.xpBase !== undefined) updateData.xpBase = options.xpBase;
      if (options.hint !== undefined) updateData.hint = options.hint;
      if (options.isActive !== undefined) updateData.isActive = options.isActive;

      // Rebuild JSON columns jika ada field spesifik yang dikirim (termasuk properti sandbox)
      const hasMethodFields =
        options.starterCode !== undefined ||
        options.correctAnswer !== undefined ||
        options.buggyCode !== undefined ||
        options.blocks !== undefined ||
        options.expectedOrder !== undefined ||
        options.sandboxEnabled !== undefined ||
        options.sandboxTemplate !== undefined ||
        options.sandboxLevel !== undefined;
 
      if (hasMethodFields) {
        // Gabungkan content lama dengan properti baru untuk memastikan tidak kehilangan field yang tidak dikirim
        const oldContent = (existingChallenge.content as any) || {};
        const mergedOptions = {
          levelId: options.levelId !== undefined ? options.levelId : existingChallenge.levelId,
          ...oldContent,
          ...options
        };

        updateData.content = buildContent(activeMethod, mergedOptions as Partial<CreateChallengeRequest>);
        updateData.testCases = buildTestCases(activeMethod, mergedOptions as Partial<CreateChallengeRequest>);
 
        // Update starterCode kolom terpisah
        updateData.starterCode =
          activeMethod === 'CODING_MANUAL' ? (options.starterCode ?? existingChallenge.starterCode) :
          activeMethod === 'FIX_THE_BUG' ? (options.buggyCode ?? existingChallenge.starterCode) :
          null;
      }

      if (Object.keys(updateData).length === 0) {
        return { success: false, message: "No fields to update" };
      }

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
            select: { id: true, name: true },
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
   * Delete challenge
   */
  static async deleteChallenge(id: number) {
    try {
      const existingChallenge = await prisma.challenge.findUnique({ where: { id } });
      if (!existingChallenge) {
        return { success: false, message: "Challenge not found" };
      }

      await prisma.challenge.delete({ where: { id } });

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
      const level = await prisma.level.findUnique({ where: { id: levelId } });
      if (!level) {
        return { success: false, message: "Level not found" };
      }

      const challenges = await prisma.challenge.findMany({
        where: { levelId },
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
          challenges,
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
   * Get challenges filtered by method
   */
  static async getChallengeByMethod(method: ChallengeMethod) {
    try {
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
            select: { id: true, name: true },
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
