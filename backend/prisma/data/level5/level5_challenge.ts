import { PrismaClient, Difficulty, ChallengeMethod } from "@prisma/client";

export async function seedLevel5Challenge(prisma: PrismaClient) {
  console.log("🌱 Seeding Challenge Level 5: Database SQL...");

  const challenges = [
    {
      id: 9,
      levelId: 5,
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
        sandboxEnabled: true,
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
      id: 10,
      levelId: 5,
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

  console.log("✅ Challenge Level 5 Database SQL seeding completed!");
}
