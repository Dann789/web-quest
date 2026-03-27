import { Decimal } from "@prisma/client/runtime/library";
import prisma from "../../config/database";
import { type SubmitAnswerRequest } from "../../types";
import { UserProgressController } from "./progress.controller";

export class ChallengeAttemptController {
  /**
   * Get a random challenge for user to attempt
   */
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

      // ─── Cek apakah node ini sudah pernah dibuka sebelumnya ───────────────
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

      // Jika assignment sudah ada, kembalikan challenge yang sama (tidak random ulang)
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

      // ─── Node baru: lakukan randomisasi challenge ─────────────────────────

      // Tentukan difficulty berdasarkan nodeSlot
      // nodeSlot 1–5   → EASY
      // nodeSlot 6–15  → MEDIUM
      // nodeSlot 16–18 → HARD
      type DifficultyType = "EASY" | "MEDIUM" | "HARD";
      let targetDifficulty: DifficultyType;

      if (nodeSlot >= 1 && nodeSlot <= 5) {
        targetDifficulty = "EASY";
      } else if (nodeSlot >= 6 && nodeSlot <= 15) {
        targetDifficulty = "MEDIUM";
      } else if (nodeSlot >= 16 && nodeSlot <= 18) {
        targetDifficulty = "HARD";
      } else {
        return {
          success: false,
          message: `nodeSlot ${nodeSlot} tidak valid. Rentang yang diizinkan: 1–18.`,
        };
      }

      // Ambil challenge aktif di level ini sesuai difficulty yang ditentukan
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

      // Ambil challenge yang sudah ditetapkan ke node-node lain milik user di level ini
      const alreadyAssigned = await prisma.assignment.findMany({
        where: { userId, levelId },
        select: { challengeId: true },
      });

      const assignedIds = new Set(alreadyAssigned.map((a) => a.challengeId));

      // Filter hanya challenge yang belum dipakai oleh node lain
      const availableChallenges = allChallenges.filter((c) => !assignedIds.has(c.id));

      // Jika semua challenge sudah terpakai di node lain, fallback ke semua challenge
      const pool = availableChallenges.length > 0 ? availableChallenges : allChallenges;

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
   * Submit answer for a challenge
   */
  // static async submitAnswer(userId: number, data: SubmitAnswerRequest) {
  //   try {
  //     const { challengeId, variantId, answerCode, timeSpent } = data;

  //     // Check if user exists
  //     const user = await prisma.user.findUnique({
  //       where: { id: userId },
  //     });

  //     if (!user) {
  //       return {
  //         success: false,
  //         message: "User not found",
  //       };
  //     }

  //     // Get challenge with variant
  //     const challenge = await prisma.challenge.findUnique({
  //       where: { id: challengeId },
  //       include: {
  //         level: true,
  //         challengeVariants: {
  //           where: { id: variantId },
  //         },
  //       },
  //     });

  //     if (!challenge) {
  //       return {
  //         success: false,
  //         message: "Challenge not found",
  //       };
  //     }

  //     if (challenge.challengeVariants.length === 0) {
  //       return {
  //         success: false,
  //         message: "Variant not found",
  //       };
  //     }

  //     const variant = challenge.challengeVariants[0];

  //     if (!variant) {
  //       return {
  //         success: false,
  //         message: "Variant not found",
  //       };
  //     }

  //     // Check if level is unlocked
  //     const levelProgress = await prisma.progress.findUnique({
  //       where: {
  //         idx_progress_unique: {
  //           userId,
  //           levelId: challenge.levelId,
  //         },
  //       },
  //     });

  //     if (!levelProgress?.isUnlocked) {
  //       return {
  //         success: false,
  //         message: "Level is not unlocked yet",
  //       };
  //     }

  //     // Check if this is first attempt for this challenge
  //     const previousAttempt = await prisma.attempt.findFirst({
  //       where: {
  //         userId,
  //         challengeId,
  //       },
  //     });

  //     const isFirstAttempt = !previousAttempt;

  //     // Check if already completed correctly
  //     const alreadyCorrect = await prisma.attempt.findFirst({
  //       where: {
  //         userId,
  //         challengeId,
  //       },
  //     });

  //     if (alreadyCorrect) {
  //       return {
  //         success: false,
  //         message: "You have already completed this challenge correctly",
  //       };
  //     }

  //     // Validate the answer
  //     const isCorrect = this.validateAnswer(answerCode, variant.correctAnswer, challenge.validationRules);

  //     // Calculate XP
  //     let xpEarned = 0;
  //     if (isCorrect) {
  //       xpEarned = this.calculateXP(
  //         challenge.xpBase,
  //         Number(variant.difficultyWeight),
  //         timeSpent,
  //         challenge.idealTime,
  //         isFirstAttempt
  //       );
  //     }

  //     // Use transaction to save attempt and update progress
  //     const result = await prisma.$transaction(async (tx) => {
  //       // Save attempt
  //       const attempt = await tx.userChallengeAttempt.create({
  //         data: {
  //           userId,
  //           challengeId,
  //           variantId,
  //           answerCode,
  //           isCorrect,
  //           isFirstAttempt,
  //           timeSpent,
  //           xpEarned,
  //         },
  //       });

  //       if (isCorrect) {
  //         // Update user XP
  //         const updatedUser = await tx.user.update({
  //           where: { id: userId },
  //           data: {
  //             totalXp: { increment: xpEarned },
  //           },
  //         });

  //         // Update level progress
  //         const completedChallenges = await tx.userChallengeAttempt.findMany({
  //           where: {
  //             userId,
  //             isCorrect: true,
  //             isFirstAttempt: true,
  //             challenge: { levelId: challenge.levelId },
  //           },
  //           distinct: ['challengeId'],
  //         });

  //         const totalChallenges = await tx.challenge.count({
  //           where: { levelId: challenge.levelId, isActive: true },
  //         });

  //         const totalMaterials = await tx.material.count({
  //           where: { levelId: challenge.levelId },
  //         });

  //         const completedMaterials = await tx.userMaterialProgress.count({
  //           where: {
  //             userId,
  //             isCompleted: true,
  //             material: { levelId: challenge.levelId },
  //           },
  //         });

  //         const totalItems = totalMaterials + totalChallenges;
  //         const completedItems = completedMaterials + completedChallenges.length;
  //         const progressPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  //         await tx.userProgress.update({
  //           where: {
  //             idx_user_progress_unique: {
  //               userId,
  //               levelId: challenge.levelId,
  //             },
  //           },
  //           data: {
  //             challengesCompleted: completedChallenges.length,
  //             totalXpEarned: { increment: xpEarned },
  //             progressPercentage: new Decimal(progressPercentage.toFixed(2)),
  //             completedAt: progressPercentage >= 100 ? new Date() : null,
  //           },
  //         });

  //         return {
  //           attempt,
  //           updatedUser,
  //           completedChallengesCount: completedChallenges.length,
  //           progressPercentage,
  //         };
  //       }

  //       return {
  //         attempt,
  //         updatedUser: user,
  //         completedChallengesCount: 0,
  //         progressPercentage: 0,
  //       };
  //     });

  //     // Check and unlock new levels if correct
  //     if (isCorrect) {
  //       await UserProgressController.checkAndUnlockLevels(userId, result.updatedUser.totalXp);
  //     }

  //     // Generate feedback
  //     const feedback = this.generateFeedback(isCorrect, isFirstAttempt, timeSpent, challenge.idealTime);

  //     return {
  //       success: true,
  //       message: isCorrect ? "Correct answer!" : "Incorrect answer. Try again!",
  //       data: {
  //         isCorrect,
  //         isFirstAttempt,
  //         timeSpent,
  //         idealTime: challenge.idealTime,
  //         xpEarned,
  //         totalXp: result.updatedUser.totalXp,
  //         feedback,
  //         levelProgress: isCorrect ? {
  //           challengesCompleted: result.completedChallengesCount,
  //           progressPercentage: result.progressPercentage,
  //         } : null,
  //       },
  //     };
  //   } catch (e: unknown) {
  //     console.error(`Error submitting answer:`, e);
  //     return {
  //       success: false,
  //       message: `Failed to submit answer: ${e instanceof Error ? e.message : String(e)}`,
  //     };
  //   }
  // }

  /**
   * Validate user's answer against correct answer
   */
  // static validateAnswer(userAnswer: string, correctAnswer: string | null, validationRules: any): boolean {
  //   if (!correctAnswer) {
  //     // If no correct answer, use custom validation
  //     return this.customValidation(userAnswer, validationRules);
  //   }

  //   // Normalize answers for comparison
  //   const normalizedUser = this.normalizeCode(userAnswer);
  //   const normalizedCorrect = this.normalizeCode(correctAnswer);

  //   // Simple string comparison (can be enhanced)
  //   return normalizedUser === normalizedCorrect;
  // }

  // /**
  //  * Normalize code for comparison
  //  */
  // static normalizeCode(code: string): string {
  //   return code
  //     .toLowerCase()
  //     .replace(/\s+/g, ' ')
  //     .replace(/>\s+</g, '><')
  //     .trim();
  // }

  // /**
  //  * Custom validation using validation rules
  //  */
  // static customValidation(userAnswer: string, rules: any): boolean {
  //   // This can be expanded based on validation rules
  //   // For now, just check if answer is not empty
  //   if (!userAnswer || userAnswer.trim().length === 0) {
  //     return false;
  //   }

  //   // If rules has specific checks
  //   if (rules && rules.rules) {
  //     for (const rule of rules.rules) {
  //       if (rule.check === 'tag_exists') {
  //         const tagRegex = new RegExp(`<${rule.tag}[^>]*>`, 'i');
  //         if (!tagRegex.test(userAnswer)) {
  //           return false;
  //         }
  //       }
  //       if (rule.check === 'text_contains') {
  //         if (!userAnswer.toLowerCase().includes(rule.text.toLowerCase())) {
  //           return false;
  //         }
  //       }
  //     }
  //   }

  //   return true;
  // }

  // /**
  //  * Calculate XP earned
  //  */
  // static calculateXP(
  //   xpBase: number,
  //   difficultyWeight: number,
  //   timeSpent: number,
  //   idealTime: number,
  //   isFirstAttempt: boolean
  // ): number {
  //   let xp = xpBase;

  //   // Apply difficulty weight
  //   xp *= difficultyWeight;

  //   // Time bonus (if under ideal time)
  //   if (timeSpent <= idealTime) {
  //     xp *= 1.2; // +20% bonus
  //   } else if (timeSpent <= idealTime * 1.5) {
  //     xp *= 1.0; // No bonus or penalty
  //   } else {
  //     xp *= 0.8; // -20% penalty for taking too long
  //   }

  //   // First attempt bonus
  //   if (isFirstAttempt) {
  //     xp *= 1.5; // +50% bonus
  //   } else {
  //     xp *= 0.5; // -50% for retry
  //   }

  //   return Math.round(xp);
  // }

  // /**
  //  * Generate feedback message
  //  */
  // static generateFeedback(
  //   isCorrect: boolean,
  //   isFirstAttempt: boolean,
  //   timeSpent: number,
  //   idealTime: number
  // ): string {
  //   if (!isCorrect) {
  //     return "Jawaban kurang tepat. Periksa kembali kode Anda dan coba lagi!";
  //   }

  //   const messages: string[] = [];

  //   if (isFirstAttempt) {
  //     messages.push("🎯 Perfect! Jawaban benar di percobaan pertama!");
  //   } else {
  //     messages.push("✅ Bagus! Jawaban benar!");
  //   }

  //   if (timeSpent <= idealTime) {
  //     messages.push(`⚡ Cepat sekali! Anda menyelesaikan dalam ${timeSpent} detik.`);
  //   } else if (timeSpent <= idealTime * 1.5) {
  //     messages.push(`⏱️ Waktu yang baik: ${timeSpent} detik.`);
  //   } else {
  //     messages.push(`⏰ Selesai dalam ${timeSpent} detik. Coba lebih cepat lain kali!`);
  //   }

  //   return messages.join(" ");
  // }

  /**
   * Get attempt history for user
   */
  // static async getAttemptHistory(userId: number, options?: { levelId?: number; limit?: number }) {
  //   try {
  //     const whereClause: any = { userId };

  //     if (options?.levelId) {
  //       whereClause.challenge = { levelId: options.levelId };
  //     }

  //     const attempts = await prisma.userChallengeAttempt.findMany({
  //       where: whereClause,
  //       include: {
  //         challenge: {
  //           select: {
  //             id: true,
  //             title: true,
  //             difficulty: true,
  //             method: true,
  //             level: {
  //               select: {
  //                 id: true,
  //                 name: true,
  //               },
  //             },
  //           },
  //         },
  //         variant: {
  //           select: {
  //             id: true,
  //             questionContent: true,
  //           },
  //         },
  //       },
  //       orderBy: { submittedAt: 'desc' },
  //       take: options?.limit || 20,
  //     });

  //     const stats = await prisma.userChallengeAttempt.aggregate({
  //       where: { userId },
  //       _count: { id: true },
  //       _sum: { xpEarned: true },
  //       _avg: { timeSpent: true },
  //     });

  //     const correctAttempts = await prisma.userChallengeAttempt.count({
  //       where: { userId, isCorrect: true },
  //     });

  //     return {
  //       success: true,
  //       message: "Attempt history retrieved",
  //       data: {
  //         attempts: attempts.map(a => ({
  //           id: a.id,
  //           challengeId: a.challengeId,
  //           challengeTitle: a.challenge.title,
  //           levelName: a.challenge.level.name,
  //           difficulty: a.challenge.difficulty,
  //           method: a.challenge.method,
  //           isCorrect: a.isCorrect,
  //           isFirstAttempt: a.isFirstAttempt,
  //           timeSpent: a.timeSpent,
  //           xpEarned: a.xpEarned,
  //           submittedAt: a.submittedAt,
  //         })),
  //         stats: {
  //           totalAttempts: stats._count.id,
  //           correctAttempts,
  //           accuracy: stats._count.id > 0 ? Math.round((correctAttempts / stats._count.id) * 100) : 0,
  //           totalXpEarned: stats._sum.xpEarned || 0,
  //           averageTime: Math.round(stats._avg.timeSpent || 0),
  //         },
  //       },
  //     };
  //   } catch (e: unknown) {
  //     console.error(`Error getting attempt history:`, e);
  //     return {
  //       success: false,
  //       message: `Failed to get history: ${e instanceof Error ? e.message : String(e)}`,
  //     };
  //   }
  // }

  /**
   * Get specific attempt result
   */
//   static async getAttemptById(attemptId: number, userId: number) {
//     try {
//       const attempt = await prisma.userChallengeAttempt.findFirst({
//         where: {
//           id: attemptId,
//           userId, // Ensure user can only see their own attempts
//         },
//         include: {
//           challenge: {
//             select: {
//               id: true,
//               title: true,
//               description: true,
//               difficulty: true,
//               method: true,
//               idealTime: true,
//               level: {
//                 select: {
//                   id: true,
//                   name: true,
//                 },
//               },
//             },
//           },
//           variant: {
//             select: {
//               id: true,
//               questionContent: true,
//               // Include correct answer only if attempt is correct
//             },
//           },
//         },
//       });

//       if (!attempt) {
//         return {
//           success: false,
//           message: "Attempt not found",
//         };
//       }

//       return {
//         success: true,
//         message: "Attempt retrieved",
//         data: {
//           id: attempt.id,
//           challenge: attempt.challenge,
//           variant: {
//             id: attempt.variant.id,
//             questionContent: attempt.variant.questionContent,
//           },
//           answerCode: attempt.answerCode,
//           isCorrect: attempt.isCorrect,
//           isFirstAttempt: attempt.isFirstAttempt,
//           timeSpent: attempt.timeSpent,
//           xpEarned: attempt.xpEarned,
//           submittedAt: attempt.submittedAt,
//         },
//       };
//     } catch (e: unknown) {
//       console.error(`Error getting attempt:`, e);
//       return {
//         success: false,
//         message: `Failed to get attempt: ${e instanceof Error ? e.message : String(e)}`,
//       };
//     }
//   }
}
