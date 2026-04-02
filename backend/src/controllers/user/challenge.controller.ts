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
   * Submit & validate answer — supports CODING_MANUAL, FIX_THE_BUG, DRAG_AND_DROP
   */
  static async submitAnswer(userId: number, body: SubmitAnswerRequest) {
    const { assignmentId, challengeId, method, answerCode, timeSpent } = body;

    try {
      // ─── 1. Ambil data assignment & challenge ──────────────────────────────
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

      // ─── 2. Validasi jawaban berdasarkan metode ────────────────────────────
      const normalizeCode = (code: string): string =>
        code
          .trim()
          .toLowerCase()
          .replace(/\r\n/g, "\n")
          .replace(/\s+/g, " ")
          .replace(/\s*=\s*/g, "=")
          .replace(/\s*\/>/g, "/>")
          .replace(/>\s+</g, "><");

      let isCorrect = false;

      if (method === "DRAG_AND_DROP") {
        // answerCode berisi JSON array urutan string (konten blok)
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
        // CODING_MANUAL & FIX_THE_BUG — validasi via testCases
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
          normalizeCode(answerCode) === normalizeCode(tc.expectedOutput ?? "")
        );
      }

      // ─── 3. Cek apakah ini percobaan pertama ──────────────────────────────
      // isFirstAttempt = true  → belum pernah mencoba sama sekali sebelumnya
      // isFirstAttempt = false → sudah pernah mencoba (salah atau benar sebelumnya)
      const previousAttempt = await prisma.attempt.findFirst({
        where: { userId, challengeId, xpEarned: { gt: 0 } },
      });
      const isFirstAttempt = previousAttempt === null;

      // ─── 4. Hitung XP ──────────────────────────────────────────────────────
      // XP hanya diberikan jika: jawaban benar AND ini adalah attempt pertama
      const idealTimeSec = challenge.idealTime ?? 0;
      const overTime = timeSpent > idealTimeSec;
      const xpEarned = (isCorrect && isFirstAttempt)
        ? Math.max(0, challenge.xpBase - (overTime ? 5 : 0))
        : 0;

      // ─── 5. Insert Attempt ─────────────────────────────────────────────────
      const attempt = await prisma.attempt.create({
        data: {
          userId,
          assignmentId,
          challengeId,
          isFirstAttempt,
          timeSpent,
          xpEarned, // 0 jika bukan attempt pertama atau jawaban salah
        },
      });

      // ─── 6. Jika benar: update Assignment & User.totalXp ──────────────────
      if (isCorrect) {
        // Update isCompleted & completedAt pada Assignment jika belum selesai
        if (!assignment.isCompleted) {
          await prisma.assignment.update({
            where: { id: assignmentId },
            data: {
              isCompleted: true,
              completedAt: new Date(),
            },
          });
        }

        // Tambahkan XP ke user HANYA jika ini adalah attempt pertama (is_first_attempt = true)
        if (isFirstAttempt && xpEarned > 0) {
          await prisma.user.update({
            where: { id: userId },
            data: { totalXp: { increment: xpEarned } },
          });
        }
      }

      return {
        success: true,
        message: isCorrect ? "Jawaban benar!" : "Jawaban salah. Coba lagi.",
        data: {
          isCorrect,
          xpEarned,           // 0 jika bukan attempt pertama atau salah
          attemptId: attempt.id,
          isFirstAttempt,
          overTime,
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
