import { getSandboxDB } from "../../db/sandbox.db";
import { Database } from "bun:sqlite";

export class SqlRunnerController {
  static async run(body: {
    sql: string;
    userId?: number;
    templateName?: string;
    level?: "db_level";
  }) {
    const { sql, userId, templateName, level } = body;

    if (!sql) {
      return { success: false, message: "Query kosong." };
    }

    let db: Database | null = null;
    try {
      if (userId && templateName && level) {
        db = getSandboxDB(userId, templateName, level);
      } else {
        db = new Database(":memory:");
      }

      const cleanSql = sql.trim();
      if (!cleanSql) {
        return { success: true, data: { type: "empty", message: "Query kosong." } };
      }

      // Check if it is a SELECT/PRAGMA/EXPLAIN query
      const lowerSql = cleanSql.toLowerCase();
      const isSelect = lowerSql.startsWith("select") || 
                       lowerSql.startsWith("pragma") ||
                       lowerSql.startsWith("with") ||
                       lowerSql.startsWith("explain") ||
                       lowerSql.startsWith("show");

      if (isSelect) {
        // Ambil semua data baris
        const rows = db.query(cleanSql).all() as Record<string, any>[];

        const firstRow = rows[0];
        return {
          success: true,
          data: {
            type: "select",
            columns: firstRow ? Object.keys(firstRow) : [],
            rows: rows,
            affectedRows: rows.length
          }
        };
      } else {
        // Untuk query modifikasi data/skema (INSERT, UPDATE, DELETE, CREATE, DROP, dll)
        const result = db.run(cleanSql);
        return {
          success: true,
          data: {
            type: "write",
            changes: result.changes,
            lastInsertRowid: Number(result.lastInsertRowid),
            message: `Query berhasil dijalankan. ${result.changes} baris terpengaruh.`
          }
        };
      }
    } catch (error: any) {
      console.error("SQL Runner Error:", error);
      return {
        success: false,
        message: error.message || "Gagal menjalankan query SQL."
      };
    } finally {
      if (db) {
        try {
          db.close();
        } catch (closeErr) {
          console.error("Failed to close SQLite DB:", closeErr);
        }
      }
    }
  }
}
