import { Decimal } from "@prisma/client/runtime/library";
import prisma from "../../config/database";
import { type SubmitAnswerRequest } from "../../types";
import { UserProgressController } from "./progress.controller";
import { UserBadgeController } from "./badge.controller";

export class ChallengeAttemptController {
  static async getRandomChallenge(userId: number, levelId: number, nodeSlot: number) {
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

      // Check if level is unlocked
      const levelProgress = await prisma.progress.findUnique({
        where: {
          idx_progress_unique: {
            userId,
            levelId,
          },
        },
      });

      if (!levelProgress?.isUnlocked) {
        return {
          success: false,
          message: "Level is not unlocked yet",
        };
      }

      // Check if node has been assigned before
      const existingAssignment = await prisma.assignment.findUnique({
        where: {
          idx_assignment_node_unique: {
            userId,
            levelId,
            nodeSlot,
          },
        },
        include: {
          challenge: {
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
            },
          },
        },
      });

      // If assignment already exists, return the same challenge (not random again)
      if (existingAssignment) {
        const challenge = existingAssignment.challenge;
        return {
          success: true,
          message: existingAssignment.isCompleted
            ? "Node sudah diselesaikan. Menampilkan soal yang sama."
            : "Melanjutkan soal yang sudah ditetapkan.",
          data: {
            assignmentId: existingAssignment.id,
            isCompleted: existingAssignment.isCompleted,
            challenge: {
              id: challenge.id,
              title: challenge.title,
              description: challenge.description,
              difficulty: challenge.difficulty,
              method: challenge.method,
              idealTime: challenge.idealTime,
              xpBase: challenge.xpBase,
              content: challenge.content,
              starterCode: challenge.starterCode,
              testCases: challenge.testCases,
              hint: challenge.hint,
            },
          },
        };
      }

      const levelConfig = await prisma.level.findUnique({
        where: { id: levelId },
        select: { easyNodes: true, mediumNodes: true, hardNodes: true }
      });
      if (!levelConfig) {
        return { success: false, message: "Konfigurasi level tidak ditemukan." };
      }

      const easyLimit = levelConfig.easyNodes;
      const mediumLimit = easyLimit + levelConfig.mediumNodes;
      const hardLimit = mediumLimit + levelConfig.hardNodes;

      type DifficultyType = "EASY" | "MEDIUM" | "HARD";
      let targetDifficulty: DifficultyType;

      if (nodeSlot >= 1 && nodeSlot <= easyLimit) {
        targetDifficulty = "EASY";
      } else if (nodeSlot > easyLimit && nodeSlot <= mediumLimit) {
        targetDifficulty = "MEDIUM";
      } else if (nodeSlot > mediumLimit && nodeSlot <= hardLimit) {
        targetDifficulty = "HARD";
      } else {
        return {
          success: false,
          message: `nodeSlot ${nodeSlot} tidak valid untuk level ini. Rentang maksimum: 1–${hardLimit}.`,
        };
      }

      // Get active challenges in this level based on difficulty
      const allChallenges = await prisma.challenge.findMany({
        where: { levelId, isActive: true, difficulty: targetDifficulty },
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
        },
      });

      if (allChallenges.length === 0) {
        return {
          success: false,
          message: "Tidak ada soal yang tersedia untuk level ini.",
        };
      }

      // Get challenges that have been assigned to other nodes for this user in this level
      const alreadyAssigned = await prisma.assignment.findMany({
        where: { userId, levelId },
        select: { challengeId: true },
      });

      const assignedIds = new Set(alreadyAssigned.map((a) => a.challengeId));

      // Filter only challenges that have not been used by other nodes
      const availableChallenges = allChallenges.filter((c) => !assignedIds.has(c.id));

      if (availableChallenges.length === 0) {
        return {
          success: false,
          message: `Tidak ada soal ${targetDifficulty} baru yang tersedia. Silakan hubungi pengajar untuk menambah bank soal.`,
        };
      }
      // If all challenges have been used by other nodes, fallback to all challenges
      const pool = availableChallenges;

      // Pilih secara acak
      const randomIndex = Math.floor(Math.random() * pool.length);
      const selectedChallenge = pool[randomIndex];

      if (!selectedChallenge) {
        return {
          success: false,
          message: "Gagal memilih soal.",
        };
      }

      // Simpan assignment baru ke database
      const newAssignment = await prisma.assignment.create({
        data: {
          userId,
          levelId,
          nodeSlot,
          challengeId: selectedChallenge.id,
          isCompleted: false,
        },
      });

      return {
        success: true,
        message: "Soal berhasil dipilih!",
        data: {
          assignmentId: newAssignment.id,
          isCompleted: false,
          challenge: {
            id: selectedChallenge.id,
            title: selectedChallenge.title,
            description: selectedChallenge.description,
            difficulty: selectedChallenge.difficulty,
            method: selectedChallenge.method,
            idealTime: selectedChallenge.idealTime,
            xpBase: selectedChallenge.xpBase,
            content: selectedChallenge.content,
            starterCode: selectedChallenge.starterCode,
            testCases: selectedChallenge.testCases,
            hint: selectedChallenge.hint,
          },
        },
      };
    } catch (e: unknown) {
      console.error(`Error getting random challenge:`, e);
      return {
        success: false,
        message: `Failed to get challenge: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  /**
   * Submit & validate answer — supports CODING_MANUAL, FIX_THE_BUG, DRAG_AND_DROP
   */
  static async submitAnswer(userId: number, body: SubmitAnswerRequest) {
    const { assignmentId, challengeId, method, answerCode, timeSpent } = body;

    try {
      // Get data assignment & challenge
      const assignment = await prisma.assignment.findUnique({
        where: { id: assignmentId },
        include: {
          challenge: {
            select: {
              id: true,
              idealTime: true,
              xpBase: true,
              testCases: true,
              content: true,
              method: true,
            },
          },
        },
      });

      if (!assignment) {
        return { success: false, message: "Assignment tidak ditemukan." };
      }

      if (assignment.userId !== userId) {
        return { success: false, message: "Anda tidak berhak mengakses assignment ini." };
      }

      const challenge = assignment.challenge;

      // Validate answer based on method
      const normalizeCode = (code: string): string => {
        if (!code) return "";
        return code
          .replace(/\r\n/g, "\n")
          .replace(/\r/g, "\n")
          .split(/;|\n/)
          .map((line) => line.trim())
          .filter((line) => line.length > 0)
          .sort()
          .join(";");
      };

      const compareCodes = (actual: string, expected: string): boolean => {
        const isJsonObj = (s: string) => {
          const t = s.trim();
          return t.startsWith("{") && t.endsWith("}");
        };

        if (isJsonObj(actual) && isJsonObj(expected)) {
          try {
            const actualObj: Record<string, string> = JSON.parse(actual);
            const expectedObj: Record<string, string> = JSON.parse(expected);

            const keys = Object.keys(expectedObj);
            if (keys.length === 0) return true;

            const result = keys.every((key) => {
              const actualVal = normalizeCode(String(actualObj[key] ?? ""));
              const expectedVal = normalizeCode(String(expectedObj[key] ?? ""));
              return actualVal === expectedVal;
            });

            if (!result) {
              const firstFail = keys.find((key) => {
                const a = normalizeCode(String(actualObj[key] ?? ""));
                const e = normalizeCode(String(expectedObj[key] ?? ""));
                return a !== e;
              });
              if (firstFail) {
                console.log(`[submitAnswer] Mismatch di key "${firstFail}"`);
                console.log(`  Actual   : ${normalizeCode(String(actualObj[firstFail] ?? "")).substring(0, 200)}`);
                console.log(`  Expected : ${normalizeCode(String(expectedObj[firstFail] ?? "")).substring(0, 200)}`);
              }
            }

            return result;
          } catch (parseErr) {
            console.warn("[submitAnswer] Gagal parse JSON, fallback ke string compare:", parseErr);
          }
        }

        const a = normalizeCode(actual);
        const e = normalizeCode(expected);
        if (a !== e) {
          console.log(`[submitAnswer] String mismatch`);
          console.log(`  Actual   : ${a.substring(0, 200)}`);
          console.log(`  Expected : ${e.substring(0, 200)}`);
        }
        return a === e;
      };

      let isCorrect = false;

      if (method === "DRAG_AND_DROP") {
        const content = challenge.content as { blocks: string[]; expectedOrder: string[] } | null;
        if (!content?.expectedOrder) {
          return { success: false, message: "Data soal drag & drop tidak valid." };
        }
        try {
          const userOrder: string[] = JSON.parse(answerCode);
          isCorrect =
            JSON.stringify(userOrder) === JSON.stringify(content.expectedOrder);
        } catch {
          return { success: false, message: "Format jawaban drag & drop tidak valid." };
        }
      } else {
        const testCases = challenge.testCases as Array<{
          input: string | null;
          weight: number;
          isHidden: boolean;
          expectedOutput: string;
        }> | null;

        if (!testCases || testCases.length === 0) {
          return { success: false, message: "Tidak ada test case untuk soal ini." };
        }

        const visible = testCases.filter((tc) => !tc.isHidden);
        const toCheck = visible.length > 0 ? visible : testCases;

        isCorrect = toCheck.every((tc) =>
          compareCodes(answerCode, tc.expectedOutput ?? "")
        );
      }

      const previousAttempt = await prisma.attempt.findFirst({
        where: { userId, challengeId, xpEarned: { gt: 0 } },
      });
      const isFirstAttempt = previousAttempt === null;
      const idealTimeSec = challenge.idealTime ?? 0;
      const overTime = timeSpent > idealTimeSec;
      const xpEarned = (isCorrect && isFirstAttempt)
        ? Math.max(0, challenge.xpBase - (overTime ? 5 : 0))
        : 0;

      // Insert Attempt
      const attempt = await prisma.attempt.create({
        data: {
          userId,
          assignmentId,
          challengeId,
          isFirstAttempt,
          timeSpent,
          xpEarned,
        },
      });

      // Update Assignment & User.totalXp
      let newBadges: { id: number; name: string; description: string; iconPath: string; rarity: string }[] = [];

      if (isCorrect) {
        if (!assignment.isCompleted) {
          await prisma.assignment.update({
            where: { id: assignmentId },
            data: {
              isCompleted: true,
              completedAt: new Date(),
            },
          });
        }

        if (isFirstAttempt && xpEarned > 0) {
          await prisma.user.update({
            where: { id: userId },
            data: { totalXp: { increment: xpEarned } },
          });
        }

        // Jalankan pengecekan level completion & badge, tangkap badge baru
        const levelResult = await UserProgressController.checkLevelCompletion(userId, assignment.levelId);
        const challengeBadges = await UserBadgeController.checkAndAward(userId, "CHALLENGE");

        // Gabungkan semua badge baru (LEVEL + CHALLENGE)
        newBadges = [...levelResult.newBadges, ...challengeBadges];

        return {
          success: true,
          message: "Jawaban benar!",
          data: {
            isCorrect,
            xpEarned,
            attemptId: attempt.id,
            isFirstAttempt,
            overTime,
            newBadges,
            unlockedLevelName: levelResult.unlockedLevelName,
          },
        };
      }

      return {
        success: true,
        message: "Jawaban salah. Coba lagi.",
        data: {
          isCorrect,
          xpEarned,
          attemptId: attempt.id,
          isFirstAttempt,
          overTime,
          newBadges: [],
          unlockedLevelName: null,
        },
      };
    } catch (e: unknown) {
      console.error("Error submitting answer:", e);
      return {
        success: false,
        message: `Gagal memproses jawaban: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }
}
