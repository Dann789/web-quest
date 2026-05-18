import { PrismaClient, Difficulty, ChallengeMethod } from "@prisma/client";

export async function seedLevel4Challenge(prisma: PrismaClient) {
  console.log("🌱 Seeding Challenge Level 4: PHP...");

  const challenges = [
    {
      id: 7,
      levelId: 4,
      title: "Echo Statement PHP",
      description: "Gunakan statemen 'echo' untuk menampilkan teks 'Hello PHP' di layar.",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 120,
      xpBase: 10,
      hint: "Tulis '<?php echo \"Hello PHP\"; ?>'",
      starterCode: "<?php\n// Tulis kode Anda di bawah ini\n\n?>",
      content: {
        language: "php",
        sandboxEnabled: false,
        starterCode: "<?php\n// Tulis kode Anda di bawah ini\n\n?>",
        correctAnswer: "<?php\necho \"Hello PHP\";\n?>",
      },
      testCases: [
        {
          input: null,
          expectedOutput: "<?php\necho \"Hello PHP\";\n?>",
          isHidden: false,
          weight: 100,
        },
      ],
      isActive: true,
    },
    {
      id: 8,
      levelId: 4,
      title: "PHP Array dan Loop",
      description: "Urutkan blok kode PHP di bawah ini agar membentuk array buah-buahan berisi 'Apel' dan 'Jeruk', lalu tampilkan setiap buah menggunakan 'foreach' loop.",
      difficulty: Difficulty.MEDIUM,
      method: ChallengeMethod.DRAG_AND_DROP,
      idealTime: 240,
      xpBase: 20,
      hint: "Urutan yang benar: inisialisasi array -> pembuka foreach -> echo item -> penutup foreach",
      starterCode: "",
      content: {
        language: "php",
        sandboxEnabled: false,
        blocks: [
          "$buah = ['Apel', 'Jeruk'];",
          "foreach ($buah as $item) {",
          "  echo $item;",
          "}",
        ],
        expectedOrder: [
          "$buah = ['Apel', 'Jeruk'];",
          "foreach ($buah as $item) {",
          "  echo $item;",
          "}",
        ],
      },
      testCases: [
        {
          input: null,
          expectedOutput: "$buah = ['Apel', 'Jeruk'];\nforeach ($buah as $item) {\n  echo $item;\n}",
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

  console.log("✅ Challenge Level 4 PHP seeding completed!");
}
