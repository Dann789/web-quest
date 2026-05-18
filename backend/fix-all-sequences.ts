import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🔧 Memperbaiki sequence ID tabel user_progress...\n");

  await prisma.$executeRawUnsafe(
    `SELECT setval('user_progress_id_seq', COALESCE((SELECT MAX(id) FROM "user_progress"), 0) + 1, false)`
  );

  console.log("✅ Selesai! Sequence ID user_progress sudah diperbaiki.");
}

main()
  .catch((e) => console.error("❌ Gagal:", e))
  .finally(() => prisma.$disconnect());
