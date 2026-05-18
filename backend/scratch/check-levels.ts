import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const levels = await prisma.level.findMany({
    select: { id: true, name: true }
  });
  console.log("LEVEL_DATA:", JSON.stringify(levels));
  process.exit(0);
}

main();
