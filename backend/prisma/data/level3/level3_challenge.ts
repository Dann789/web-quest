import { PrismaClient, Difficulty, ChallengeMethod } from "@prisma/client";

export async function seedLevel3Challenge(prisma: PrismaClient) {
  console.log("🌱 Seeding Challenge Level 3: JavaScript...");

  const challenges = [
    {
      id: 5,
      levelId: 3,
      title: "Deklarasi Variabel",
      description: "Buatlah sebuah variabel dengan nama 'nama' yang bertipe string dengan nilai 'John Doe'",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 120,
      xpBase: 10,
      hint: "Gunakan 'let nama = \"John Doe\";' atau 'const nama = \"John Doe\";'",
      starterCode: "// Tulis deklarasi variabel Anda di bawah ini\n",
      content: {
        language: "javascript",
        sandboxEnabled: false,
        starterCode: "// Tulis deklarasi variabel Anda di bawah ini\n",
        correctAnswer: "let nama = \"John Doe\";",
      },
      testCases: [
        {
          input: null,
          expectedOutput: "let nama = \"John Doe\";",
          isHidden: false,
          weight: 100,
        },
      ],
      isActive: true,
    },
    {
      id: 6,
      levelId: 3,
      title: "Membuat Function Penjumlahan",
      description: "Perbaiki kode di bawah agar fungsi bernama 'tambah' dapat menjumlahkan dua parameter 'a' dan 'b' dengan benar.",
      difficulty: Difficulty.MEDIUM,
      method: ChallengeMethod.FIX_THE_BUG,
      idealTime: 180,
      xpBase: 20,
      hint: "Bug ada pada tanda kurang (-). Ubahlah menjadi tanda tambah (+)",
      starterCode: "function tambah(a, b) {\n  return a - b; // Bug di sini!\n}",
      content: {
        language: "javascript",
        sandboxEnabled: false,
        buggyCode: "function tambah(a, b) {\n  return a - b; // Bug di sini!\n}",
        correctAnswer: "function tambah(a, b) {\n  return a + b;\n}",
      },
      testCases: [
        {
          input: null,
          expectedOutput: "function tambah(a, b) {\n  return a + b;\n}",
          isHidden: false,
          weight: 100,
        },
      ],
      isActive: true,
    },
  ];

  for (const c of challenges) {
    await prisma.challenge.upsert({
      where: { id: c.id },
      update: {
        title: c.title,
        description: c.description,
        difficulty: c.difficulty,
        method: c.method,
        idealTime: c.idealTime,
        xpBase: c.xpBase,
        hint: c.hint,
        starterCode: c.starterCode,
        content: c.content,
        testCases: c.testCases,
        isActive: c.isActive,
      },
      create: c,
    });
  }

  console.log("✅ Challenge Level 3 JavaScript seeding completed!");
}
