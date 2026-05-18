import { PrismaClient, Difficulty, ChallengeMethod } from "@prisma/client";

export async function seedLevel2Challenge(prisma: PrismaClient) {
  console.log("🌱 Seeding Challenge Level 2: CSS Styling...");

  const challenges = [
    {
      id: 3,
      levelId: 2,
      title: "Mengubah Warna Teks",
      description: "Buatlah selektor CSS untuk tag paragraf (p) yang mengubah warna teks menjadi biru (blue)",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 120,
      xpBase: 10,
      hint: "Gunakan selektor 'p' lalu beri properti 'color: blue;'",
      starterCode: "/* Tulis CSS Anda di bawah ini */\n",
      content: {
        language: "css",
        sandboxEnabled: false,
        starterCode: "/* Tulis CSS Anda di bawah ini */\n",
        correctAnswer: "p {\n  color: blue;\n}",
      },
      testCases: [
        {
          input: null,
          expectedOutput: "p {\n  color: blue;\n}",
          isHidden: false,
          weight: 100,
        },
      ],
      isActive: true,
    },
    {
      id: 4,
      levelId: 2,
      title: "Membuat Box dengan Padding",
      description: "Buatlah aturan CSS untuk class '.box' dengan padding 20px dan warna latar belakang (background-color) #f0f0f0",
      difficulty: Difficulty.MEDIUM,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 180,
      xpBase: 20,
      hint: "Gunakan selektor '.box', properti 'padding', dan 'background-color'",
      starterCode: "/* Tulis CSS class .box di bawah ini */\n",
      content: {
        language: "css",
        sandboxEnabled: false,
        starterCode: "/* Tulis CSS class .box di bawah ini */\n",
        correctAnswer: ".box {\n  padding: 20px;\n  background-color: #f0f0f0;\n}",
      },
      testCases: [
        {
          input: null,
          expectedOutput: ".box {\n  padding: 20px;\n  background-color: #f0f0f0;\n}",
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

  console.log("✅ Challenge Level 2 CSS Styling seeding completed!");
}
