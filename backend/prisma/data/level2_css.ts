import { PrismaClient, Difficulty, ChallengeMethod } from "@prisma/client";

export async function seedLevel2(prisma: PrismaClient) {
  console.log('🌱 Seeding Level 2: CSS Styling...');

  // 1. Seed Level
  const level = await prisma.level.upsert({
    where: { id: 2 },
    update: {
      name: "CSS Styling",
      xpRequired: 250,
      description: "Styling dan layout halaman web dengan CSS",
      iconName: "fa-css3",
      easyNodes: 5,
      mediumNodes: 8,
      hardNodes: 3,
    },
    create: {
      id: 2,
      name: "CSS Styling",
      xpRequired: 250,
      description: "Styling dan layout halaman web dengan CSS",
      iconName: "fa-css3-alt",
      easyNodes: 5,
      mediumNodes: 8,
      hardNodes: 3,
    },
  });

  // 2. Seed Materials
  const materials = [
    {
      id: 201,
      levelId: level.id,
      title: "Pengenalan CSS",
      order: 1,
      content: `
        <h2>Apa itu CSS?</h2>
        <p>CSS (Cascading Style Sheets) digunakan untuk mengatur tampilan, warna, font, dan layout halaman web.</p>
        <h3>Cara Menambahkan CSS</h3>
        <p>Ada 3 cara menambahkan CSS ke HTML:</p>
        <ol>
          <li><strong>Inline CSS:</strong> Menggunakan atribut <code>style</code> pada tag HTML.</li>
          <li><strong>Internal CSS:</strong> Menulis aturan di dalam tag <code>&lt;style&gt;</code> di dalam tag <code>&lt;head&gt;</code>.</li>
          <li><strong>External CSS:</strong> Menghubungkan file .css eksternal menggunakan tag <code>&lt;link&gt;</code>.</li>
        </ol>
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
      id: 201,
      levelId: level.id,
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
      id: 202,
      levelId: level.id,
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

  console.log('✅ Level 2 CSS Styling seeding completed!');
}
