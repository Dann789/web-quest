import { getSandboxDB } from "./src/db/sandbox.db";

// Buat sandbox DB untuk template soal_1 (users + products dasar)
// yang dibutuhkan oleh semua soal DB PHP selain "Menampilkan Daftar Produk"
async function main() {
  const templates = [
    { userId: 2, templateName: "soal_1", level: "php_level" as const },
    { userId: 2, templateName: "soal_2", level: "php_level" as const },
    { userId: 2, templateName: "soal_18", level: "php_level" as const },
  ];

  for (const t of templates) {
    try {
      console.log(`\nCreating DB: user_${t.userId}_template_${t.templateName}.db in ${t.level}/...`);
      const db = getSandboxDB(t.userId, t.templateName, t.level);
      const tables = db.query("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").all();
      console.log(`  ✅ Tables: ${tables.map((r: any) => r.name).join(", ")}`);
      db.close();
    } catch (err: any) {
      console.error(`  ❌ Failed: ${err.message}`);
    }
  }
  
  console.log("\n✅ Done! All sandbox DBs initialized.");
}

main();
