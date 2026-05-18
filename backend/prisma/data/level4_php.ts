import { PrismaClient, Difficulty, ChallengeMethod } from "@prisma/client";

export async function seedLevel4(prisma: PrismaClient) {
  console.log('🌱 Seeding Level 4: PHP...');

  // 1. Seed Level
  const level = await prisma.level.upsert({
    where: { id: 4 },
    update: {
      name: "PHP Programming",
      xpRequired: 1000,
      description: "Pemrograman server-side dengan PHP",
      iconName: "fa-php",
      easyNodes: 3,
      mediumNodes: 4,
      hardNodes: 3,
    },
    create: {
      id: 4,
      name: "PHP Programming",
      xpRequired: 1000,
      description: "Pemrograman server-side dengan PHP",
      iconName: "fa-php",
      easyNodes: 3,
      mediumNodes: 4,
      hardNodes: 3,
    },
  });

  // 2. Seed Materials
  const materials = [
    {
      id: 401,
      levelId: level.id,
      title: "Pengenalan PHP",
      order: 1,
      content: `
        <h2>Apa itu PHP?</h2>
        <p>PHP (Hypertext Preprocessor) adalah bahasa pemrograman server-side yang dirancang khusus untuk pengembangan web dinamis.</p>
        <h3>Syntax Dasar PHP</h3>
        <p>Setiap script PHP harus dibungkus dengan tag pembuka dan penutup PHP:</p>
        <pre><code>&lt;?php
// Menampilkan output teks
echo "Halo dunia!";
?&gt;</code></pre>
      `,
    },
  ];

  for (const m of materials) {
    await prisma.material.upsert({
      where: { id: m.id },
      update: {
        title: m.title,
        content: m.content,
        order: m.order,
      },
      create: m,
    });
  }

  // 3. Seed Challenges
  const challenges = [
    {
      id: 401,
      levelId: level.id,
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
      id: 402,
      levelId: level.id,
      title: "PHP Array dan Loop",
      description: "Urutkan blok kode PHP di bawah ini agar membentuk array buah-buahan berisi 'Apel' dan 'Jeruk', lalu tampilkan setiap buah menggunakan 'foreach' loop.",
      difficulty: Difficulty.MEDIUM,
      method: ChallengeMethod.DRAG_AND_DROP,
      idealTime: 240,
      xpBase: 20,
      hint: "Urutan yang benar: inisialisasi array -> pembuka foreach -> echo item -> penutup foreach",
      starterCode: "", // Untuk Drag & Drop, block tersimpan di JSON content
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

  console.log('✅ Level 4 PHP seeding completed!');
}
