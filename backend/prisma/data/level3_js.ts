import { PrismaClient, Difficulty, ChallengeMethod } from "@prisma/client";

export async function seedLevel3(prisma: PrismaClient) {
  console.log('🌱 Seeding Level 3: JavaScript...');

  // 1. Seed Level
  const level = await prisma.level.upsert({
    where: { id: 3 },
    update: {
      name: "JavaScript Basics",
      xpRequired: 500,
      description: "Interaktivitas dan logika pemrograman dengan JavaScript",
      iconName: "fa-js",
      easyNodes: 4,
      mediumNodes: 7,
      hardNodes: 5,
    },
    create: {
      id: 3,
      name: "JavaScript Basics",
      xpRequired: 500,
      description: "Interaktivitas dan logika pemrograman dengan JavaScript",
      iconName: "fa-js",
      easyNodes: 4,
      mediumNodes: 7,
      hardNodes: 5,
    },
  });

  // 2. Seed Materials
  const materials = [
    {
      id: 301,
      levelId: level.id,
      title: "Pengenalan JavaScript",
      order: 1,
      content: `
        <h2>Apa itu JavaScript?</h2>
        <p>JavaScript adalah bahasa pemrograman scripting yang digunakan untuk membuat halaman web menjadi interaktif dan hidup.</p>
        <h3>Variabel dan Tipe Data</h3>
        <p>Gunakan keyword <code>let</code> atau <code>const</code> untuk membuat variabel:</p>
        <pre><code>let nama = "John"; // Variabel yang nilainya bisa diubah
const umur = 25;   // Variabel konstan (nilainya tetap)</code></pre>
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
      id: 301,
      levelId: level.id,
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
      id: 302,
      levelId: level.id,
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

  console.log('✅ Level 3 JavaScript seeding completed!');
}
