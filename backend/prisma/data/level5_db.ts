import { PrismaClient, Difficulty, ChallengeMethod } from "@prisma/client";

export async function seedLevel5(prisma: PrismaClient) {
  console.log('🌱 Seeding Level 5: Database SQL...');

  // 1. Seed Level
  const level = await prisma.level.upsert({
    where: { id: 5 },
    update: {
      name: "Database SQL",
      xpRequired: 2000,
      description: "Manajemen dan manipulasi database dengan SQL",
      iconName: "fa-database",
      easyNodes: 3,
      mediumNodes: 4,
      hardNodes: 3,
    },
    create: {
      id: 5,
      name: "Database SQL",
      xpRequired: 2000,
      description: "Manajemen dan manipulasi database dengan SQL",
      iconName: "fa-database",
      easyNodes: 3,
      mediumNodes: 4,
      hardNodes: 3,
    },
  });

  // 2. Seed Materials
  const materials = [
    {
      id: 501,
      levelId: level.id,
      title: "Pengenalan Database & SQL",
      order: 1,
      content: `
        <h2>Apa itu Database?</h2>
        <p>Database adalah kumpulan data terstruktur yang disimpan secara elektronik di dalam sistem komputer.</p>
        <h3>Apa itu SQL?</h3>
        <p>SQL (Structured Query Language) adalah bahasa standar yang digunakan untuk mengelola, memanipulasi, dan mengambil data dari database relasional.</p>
        <h3>Perintah SELECT Dasar</h3>
        <p>Perintah SELECT digunakan untuk mengambil data dari tabel:</p>
        <pre><code>SELECT * FROM nama_tabel; -- Mengambil semua data
SELECT kolom1, kolom2 FROM nama_tabel; -- Mengambil kolom tertentu</code></pre>
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
      id: 501,
      levelId: level.id,
      title: "SELECT Query Dasar",
      description: "Buatlah query SQL untuk mengambil/menampilkan semua kolom dari tabel bernama 'users'.",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 120,
      xpBase: 10,
      hint: "Gunakan 'SELECT * FROM users;'",
      starterCode: "-- Tulis query SQL Anda di bawah ini\n",
      content: {
        language: "sql",
        sandboxEnabled: true, // DB Level mengaktifkan SQLite sandbox
        starterCode: "-- Tulis query SQL Anda di bawah ini\n",
        correctAnswer: "SELECT * FROM users;",
      },
      testCases: [
        {
          input: null,
          expectedOutput: "SELECT * FROM users;",
          isHidden: false,
          weight: 100,
        },
      ],
      isActive: true,
    },
    {
      id: 502,
      levelId: level.id,
      title: "INSERT Query dengan Values",
      description: "Buatlah query SQL untuk menyisipkan (INSERT) data user baru ke tabel 'users' dengan kolom 'username' bernilai 'john' dan 'email' bernilai 'john@example.com'.",
      difficulty: Difficulty.MEDIUM,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 240,
      xpBase: 20,
      hint: "Gunakan syntax 'INSERT INTO tabel (kolom1, kolom2) VALUES (nilai1, nilai2);'",
      starterCode: "-- Tulis query INSERT Anda di bawah ini\n",
      content: {
        language: "sql",
        sandboxEnabled: true,
        starterCode: "-- Tulis query INSERT Anda di bawah ini\n",
        correctAnswer: "INSERT INTO users (username, email) VALUES ('john', 'john@example.com');",
      },
      testCases: [
        {
          input: null,
          expectedOutput: "INSERT INTO users (username, email) VALUES ('john', 'john@example.com');",
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

  console.log('✅ Level 5 Database SQL seeding completed!');
}
