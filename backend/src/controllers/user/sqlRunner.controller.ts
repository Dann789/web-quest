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

      const statements = cleanSql.split(';').map(s => s.trim()).filter(s => s.length > 0);
      let lastResult: any = null;
      let totalChanges = 0;

      for (let i = 0; i < statements.length; i++) {
        const stmtStr = statements[i];
        // Menghapus komentar SQL sebelum pengecekan
        const sqlWithoutComments = stmtStr.replace(/--.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '').trim();
        const lowerSql = sqlWithoutComments.toLowerCase();
        
        const isSelect = lowerSql.startsWith("select") || 
                         lowerSql.startsWith("pragma") ||
                         lowerSql.startsWith("with") ||
                         lowerSql.startsWith("explain") ||
                         lowerSql.startsWith("show");
                         
        if (isSelect) {
           const rows = db.query(stmtStr).all() as Record<string, any>[];
           lastResult = {
             type: "select",
             columns: rows[0] ? Object.keys(rows[0]) : [],
             rows: rows,
             affectedRows: rows.length
           };
        } else {
           const res = db.run(stmtStr);
           totalChanges += res.changes;
           lastResult = {
             type: "write",
             changes: totalChanges,
             lastInsertRowid: Number(res.lastInsertRowid),
             message: `Query berhasil dijalankan. ${totalChanges} baris terpengaruh.`
           };
        }
      }
      
      return {
         success: true,
         data: lastResult || { type: "empty", message: "Tidak ada query dieksekusi." }
      };
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
