import { spawn } from "bun";
import { mkdir, writeFile, rm, copyFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { randomBytes } from "node:crypto";
import { existsSync } from "node:fs";
import { getSandboxDB } from "../../db/sandbox.db";
import type { Level } from "../../db/sandbox.db";

export class PhpRunnerController {
  static async run(body: { 
    codes: Record<string, string>, 
    userId?: number, 
    templateName?: string, 
    level?: "php_level" | "db_level",
    sandboxEnabled?: boolean 
  }) {
    const { codes, userId, templateName, level, sandboxEnabled } = body;
    
    const sessionId = randomBytes(8).toString("hex");
    const tempDirPath = join(tmpdir(), `webquest-php-${sessionId}`);

    try {
      await mkdir(tempDirPath, { recursive: true });

      const fileMap: Record<string, string> = {
        php: "index.php",
        php_process: "process.php",
        php_connection: "connection.php"
      };

      for (const [key, fileName] of Object.entries(fileMap)) {
        if (codes[key]) {
          await writeFile(join(tempDirPath, fileName), codes[key]);
        }
      }

      if (!codes.php) {
        await writeFile(join(tempDirPath, "index.php"), "<?php echo 'No index.php found'; ?>");
      }

      // ============================================================
      // LOGIC SANDBOX: Salin DB ke temp dir jika sandboxEnabled = true
      // Jika file .db belum ada, otomatis inisialisasi dari template SQL (self-healing)
      // ============================================================
      if (sandboxEnabled && userId && templateName && level) {
        const BACKEND_ROOT = join(import.meta.dir, "..", "..", "..");
        const sourceDbPath = join(BACKEND_ROOT, "sandbox", level, `user_${userId}_template_${templateName}.db`);
        const targetDbPath = join(tempDirPath, "sandbox.db");

        // Jika file .db belum ada, otomatis inisialisasi dari template SQL
        if (!existsSync(sourceDbPath)) {
          try {
            const db = getSandboxDB(userId, templateName, level as Level);
            db.close();
            console.log(`[PhpRunner] Auto-initialized sandbox DB: user_${userId}_template_${templateName}.db`);
          } catch (initErr: any) {
            console.error(`[PhpRunner] Failed to auto-initialize sandbox DB:`, initErr.message);
          }
        }

        if (existsSync(sourceDbPath)) {
          await copyFile(sourceDbPath, targetDbPath);
          for (const ext of ["-wal", "-shm"]) {
             const srcExt = sourceDbPath + ext;
             if (existsSync(srcExt)) {
               await copyFile(srcExt, targetDbPath + ext);
             }
          }
        }
      }

      const process = spawn(["php", join(tempDirPath, "index.php")], {
        cwd: tempDirPath,
        stdout: "pipe",
        stderr: "pipe"
      });

      const stdout = await new Response(process.stdout).text();
      const stderr = await new Response(process.stderr).text();
      const exitCode = await process.exited;

      return {
        success: true,
        data: { stdout, stderr, exitCode }
      };

    } catch (error: any) {
      console.error("PHP Runner Error:", error);
      return {
        success: false,
        message: "Gagal menjalankan kode PHP",
        data: { stderr: error.message }
      };
    } finally {
      try {
        await rm(tempDirPath, { recursive: true, force: true });
      } catch (err) {
        console.error("Failed to cleanup temp dir:", err);
      }
    }
  }
}
