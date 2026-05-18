import { Database } from "bun:sqlite";
import { existsSync, mkdirSync, readFileSync, rmSync } from "fs";
import { join } from "path";

export type Level = "php_level" | "db_level";

// Resolve ke root folder backend (satu level di atas src/)
const BACKEND_ROOT = join(import.meta.dir, "..", "..");

export function getSandboxPath(userId: number, templateName: string, level: Level): string {
  return join(BACKEND_ROOT, "sandbox", level, `user_${userId}_template_${templateName}.db`);
}

export function getTemplatePath(templateName: string, level: Level): string {
  return join(BACKEND_ROOT, "templates", level, `${templateName}_schema.sql`);
}

/**
 * Buka atau buat file .db milik user untuk soal tertentu.
 * Jika file baru (belum ada tabel), baca template SQL dan jalankan.
 */
/**
 * Buka atau buat file .db milik user berdasarkan nama template.
 * Format file: user_{userId}_template_{templateName}.db
 * Jika file baru (belum ada tabel), baca template SQL dan jalankan.
 */
export function getSandboxDB(userId: number, templateName: string, level: Level): Database {
  const dbPath = getSandboxPath(userId, templateName, level);
  const sandboxDir = join(BACKEND_ROOT, "sandbox", level);

  // Pastikan folder ada
  mkdirSync(sandboxDir, { recursive: true });

  const db = new Database(dbPath);

  // Aktifkan WAL mode untuk keamanan concurrent read
  db.run("PRAGMA journal_mode = WAL;");

  // Cek apakah DB sudah punya tabel
  const result = db
    .query<{ count: number }, []>(
      "SELECT COUNT(*) as count FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';"
    )
    .get();

  const tableCount = result?.count ?? 0;

  if (tableCount === 0) {
    // DB baru — inisialisasi dari template
    const templatePath = getTemplatePath(templateName, level);
    if (!existsSync(templatePath)) {
      throw new Error(`Template SQL tidak ditemukan: ${templatePath}`);
    }
    const schemaSql = readFileSync(templatePath, "utf-8");
    db.run(schemaSql);
  }

  return db;
}

/**
 * Hapus file .db user (beserta -wal dan -shm jika ada).
 * DB baru dibuat otomatis dari template saat user akses lagi.
 */
export function resetSandboxDB(userId: number, templateName: string, level: Level): void {
  const dbPath = getSandboxPath(userId, templateName, level);

  for (const ext of ["", "-wal", "-shm"]) {
    const filePath = dbPath + ext;
    if (existsSync(filePath)) {
      rmSync(filePath);
    }
  }
}
