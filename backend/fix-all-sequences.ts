import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🔧 Memperbaiki sequence ID untuk seluruh tabel di database...\n");

  const tables = [
    { name: "users", seq: "users_id_seq" },
    { name: "levels", seq: "levels_id_seq" },
    { name: "materials", seq: "materials_id_seq" },
    { name: "challenges", seq: "challenges_id_seq" },
    { name: "user_progress", seq: "user_progress_id_seq" },
    { name: "material_progress", seq: "material_progress_id_seq" },
    { name: "assignments", seq: "assignments_id_seq" },
    { name: "attempts", seq: "attempts_id_seq" },
    { name: "badges", seq: "badges_id_seq" },
    { name: "user_badges", seq: "user_badges_id_seq" },
    { name: "mrc_words", seq: "mrc_words_id_seq" },
    { name: "reason", seq: "reason_id_seq" },
    { name: "response", seq: "response_id_seq" },
  ];

  for (const table of tables) {
    try {
      await prisma.$executeRawUnsafe(
        `SELECT setval('${table.seq}', COALESCE((SELECT MAX(id) FROM "${table.name}"), 0) + 1, false)`
      );
      console.log(`✅ Sequence ID untuk tabel "${table.name}" berhasil diperbaiki.`);
    } catch (error: any) {
      console.warn(`⚠️ Gagal memperbaiki sequence untuk "${table.name}": ${error.message}`);
    }
  }

  console.log("\n🎉 Selesai! Seluruh sequence ID tabel database sudah diperbaiki.");
}

main()
  .catch((e) => console.error("❌ Gagal:", e))
  .finally(() => prisma.$disconnect());

