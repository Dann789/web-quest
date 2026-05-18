import prisma from "../../config/database";
import { getSandboxDB, type Level } from "../../db/sandbox.db";

export class ChallengeSoalController {
  /**
   * Mengambil schema sandbox untuk soal tertentu.
   * Fungsi ini akan memicu pembuatan file .db dan inisialisasi tabel jika belum ada.
   */
  static async getSchema(userId: number, challengeId: number, level: Level) {
    try {
      // 1. Validasi apakah soal tersebut benar-benar ada di level tersebut
      const challenge = await prisma.challenge.findFirst({
        where: {
          id: challengeId,
          levelId: level === "php_level" ? 4 : 5, // Map level string ke ID database
        },
      });

      if (!challenge) {
        return {
          success: false,
          message: `Soal dengan ID ${challengeId} tidak ditemukan untuk level ${level}.`,
        };
      }

      const content = challenge.content as any || {};
      const templateName = content.sandboxTemplate as string | undefined;

      if (!templateName) {
        return {
          success: false,
          message: `Soal dengan ID ${challengeId} tidak dikonfigurasi menggunakan sandbox template.`,
        };
      }

      // 2. Panggil getSandboxDB (Fungsi ini otomatis membuat file .db & init table dari template SQL)
      const db = getSandboxDB(userId, templateName, level);

      // 3. (Opsional) Ambil daftar tabel untuk konfirmasi
      const tables = db.query("SELECT name FROM sqlite_master WHERE type='table'").all();

      return {
        success: true,
        message: "Sandbox database berhasil diinisialisasi.",
        data: {
          tables: tables.map((t: any) => t.name),
          databaseFile: `user_${userId}_template_${templateName}.db`
        }
      };

    } catch (error: any) {
      console.error("Error initializing sandbox schema:", error);
      return {
        success: false,
        message: "Gagal menginisialisasi sandbox database.",
        error: error.message
      };
    }
  }
}
