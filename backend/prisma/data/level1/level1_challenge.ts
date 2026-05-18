import { PrismaClient, Difficulty, ChallengeMethod } from "@prisma/client";

export async function seedLevel1Challenge(prisma: PrismaClient) {
  console.log("🌱 Seeding Challenge Level 1: HTML Basics...");

  // 3. Seed Challenges
  const challenges = [
    {
      id: 1,
      levelId: 1,
      title: "Membuat Heading HTML",
      description:
        "Buatlah sebuah heading level 1 (h1) dengan teks 'Belajar HTML'",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 120,
      xpBase: 10,
      hint: "Gunakan tag <h1> dan tutup dengan </h1>",
      starterCode: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Judul Website Saya</title>
</head>
<body>
    
</body>
</html>
`,
      content: {
        language: "html",
        sandboxEnabled: false,
        starterCode: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Judul Website Saya</title>
</head>
<body>
    
</body>
</html>
`,
        correctAnswer: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Judul Website Saya</title>
</head>
<body>
    <h1>Belajar HTML</h1>
</body>
</html>
`,
      },
      testCases: [
        {
          input: null,
          expectedOutput: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Judul Website Saya</title>
</head>
<body>
    <h1>Belajar HTML</h1>
</body>
</html>
`,
          isHidden: false,
          weight: 100,
        },
      ],
      isActive: true,
    },
    {
      id: 2,
      levelId: 1,
      title: "Membuat List HTML",
      description:
        "Buatlah unordered list (ul) dengan 3 item (li): HTML, CSS, dan JavaScript",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 180,
      xpBase: 20,
      hint: "Gunakan tag <ul> lalu bungkus setiap item dengan tag <li>",
      starterCode: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Judul Website Saya</title>
</head>
<body>
    
</body>
</html>
`,
      content: {
        language: "html",
        sandboxEnabled: false,
        starterCode: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Judul Website Saya</title>
</head>
<body>
    
</body>
</html>
`,
        correctAnswer: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Judul Website Saya</title>
</head>
<body>
    <ul>
      <li>HTML</li>
      <li>CSS</li>
      <li>JavaScript</li>
    </ul>
</body>
</html>
`,
      },
      testCases: [
        {
          input: null,
          expectedOutput: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Judul Website Saya</title>
</head>
<body>
    <ul>
      <li>HTML</li>
      <li>CSS</li>
      <li>JavaScript</li>
    </ul>
</body>
</html>
`,
          isHidden: false,
          weight: 100,
        },
      ],
      isActive: true,
    },
    {
  id: 3,
  levelId: 1,
  title: "Membuat Paragraf",
  description:
    "Buatlah sebuah paragraf dengan teks 'Saya sedang belajar HTML dasar'",
  difficulty: Difficulty.EASY,
  method: ChallengeMethod.CODING_MANUAL,
  idealTime: 120,
  xpBase: 10,
  hint: "Gunakan tag <p>",
  starterCode: `<!DOCTYPE html>
<html>
<body>

</body>
</html>`,
  content: {
    language: "html",
    sandboxEnabled: false,
    starterCode: `<!DOCTYPE html>
<html>
<body>

</body>
</html>`,
    correctAnswer: `<!DOCTYPE html>
<html>
<body>
    <p>Saya sedang belajar HTML dasar</p>
</body>
</html>`,
  },
  testCases: [
    {
      input: null,
      expectedOutput: `<!DOCTYPE html>
<html>
<body>
    <p>Saya sedang belajar HTML dasar</p>
</body>
</html>`,
      isHidden: false,
      weight: 100,
    },
  ],
  isActive: true,
},

{
  id: 4,
  levelId: 1,
  title: "Menambahkan Gambar",
  description:
    "Tambahkan gambar dengan source 'logo.png' dan alt 'Logo Website'",
  difficulty: Difficulty.EASY,
  method: ChallengeMethod.CODING_MANUAL,
  idealTime: 180,
  xpBase: 10,
  hint: "Gunakan tag <img>",
  starterCode: `<!DOCTYPE html>
<html>
<body>

</body>
</html>`,
  content: {
    language: "html",
    sandboxEnabled: false,
    starterCode: `<!DOCTYPE html>
<html>
<body>

</body>
</html>`,
    correctAnswer: `<!DOCTYPE html>
<html>
<body>
    <img src="logo.png" alt="Logo Website">
</body>
</html>`,
  },
  testCases: [
    {
      input: null,
      expectedOutput: `<!DOCTYPE html>
<html>
<body>
    <img src="logo.png" alt="Logo Website">
</body>
</html>`,
      isHidden: false,
      weight: 100,
    },
  ],
  isActive: true,
},

{
  id: 5,
  levelId: 1,
  title: "Membuat Link",
  description:
    "Buat link menuju https://google.com dengan teks 'Kunjungi Google'",
  difficulty: Difficulty.EASY,
  method: ChallengeMethod.CODING_MANUAL,
  idealTime: 180,
  xpBase: 10,
  hint: "Gunakan tag <a> dan atribut href",
  starterCode: `<!DOCTYPE html>
<html>
<body>

</body>
</html>`,
  content: {
    language: "html",
    sandboxEnabled: false,
    starterCode: `<!DOCTYPE html>
<html>
<body>

</body>
</html>`,
    correctAnswer: `<!DOCTYPE html>
<html>
<body>
    <a href="https://google.com">Kunjungi Google</a>
</body>
</html>`,
  },
  testCases: [
    {
      input: null,
      expectedOutput: `<!DOCTYPE html>
<html>
<body>
    <a href="https://google.com">Kunjungi Google</a>
</body>
</html>`,
      isHidden: false,
      weight: 100,
    },
  ],
  isActive: true,
},

{
  id: 6,
  levelId: 1,
  title: "Membuat List Buah",
  description:
    "Buat unordered list berisi Apel, Mangga, dan Jeruk",
  difficulty: Difficulty.MEDIUM,
  method: ChallengeMethod.CODING_MANUAL,
  idealTime: 240,
  xpBase: 20,
  hint: "Gunakan tag <ul> dan <li>",
  starterCode: `<!DOCTYPE html>
<html>
<body>

</body>
</html>`,
  content: {
    language: "html",
    sandboxEnabled: false,
    starterCode: `<!DOCTYPE html>
<html>
<body>

</body>
</html>`,
    correctAnswer: `<!DOCTYPE html>
<html>
<body>
    <ul>
        <li>Apel</li>
        <li>Mangga</li>
        <li>Jeruk</li>
    </ul>
</body>
</html>`,
  },
  testCases: [
    {
      input: null,
      expectedOutput: `<!DOCTYPE html>
<html>
<body>
    <ul>
        <li>Apel</li>
        <li>Mangga</li>
        <li>Jeruk</li>
    </ul>
</body>
</html>`,
      isHidden: false,
      weight: 100,
    },
  ],
  isActive: true,
},

{
  id: 7,
  levelId: 1,
  title: "Membuat Form Input Nama",
  description:
    "Buat form dengan input text dan tombol submit",
  difficulty: Difficulty.MEDIUM,
  method: ChallengeMethod.CODING_MANUAL,
  idealTime: 300,
  xpBase: 20,
  hint: "Gunakan tag <form>, <input>, dan <button>",
  starterCode: `<!DOCTYPE html>
<html>
<body>

</body>
</html>`,
  content: {
    language: "html",
    sandboxEnabled: false,
    starterCode: `<!DOCTYPE html>
<html>
<body>

</body>
</html>`,
    correctAnswer: `<!DOCTYPE html>
<html>
<body>
    <form>
        <input type="text" placeholder="Masukkan nama">
        <button type="submit">Kirim</button>
    </form>
</body>
</html>`,
  },
  testCases: [
    {
      input: null,
      expectedOutput: `<!DOCTYPE html>
<html>
<body>
    <form>
        <input type="text" placeholder="Masukkan nama">
        <button type="submit">Kirim</button>
    </form>
</body>
</html>`,
      isHidden: false,
      weight: 100,
    },
  ],
  isActive: true,
},

{
  id: 8,
  levelId: 1,
  title: "Membuat Tabel Siswa",
  description:
    "Buat tabel dengan kolom Nama dan Umur serta satu data Andi - 17",
  difficulty: Difficulty.HARD,
  method: ChallengeMethod.CODING_MANUAL,
  idealTime: 420,
  xpBase: 30,
  hint: "Gunakan tag <table>, <tr>, <th>, dan <td>",
  starterCode: `<!DOCTYPE html>
<html>
<body>

</body>
</html>`,
  content: {
    language: "html",
    sandboxEnabled: false,
    starterCode: `<!DOCTYPE html>
<html>
<body>

</body>
</html>`,
    correctAnswer: `<!DOCTYPE html>
<html>
<body>
    <table border="1">
        <tr>
            <th>Nama</th>
            <th>Umur</th>
        </tr>
        <tr>
            <td>Andi</td>
            <td>17</td>
        </tr>
    </table>
</body>
</html>`,
  },
  testCases: [
    {
      input: null,
      expectedOutput: `<!DOCTYPE html>
<html>
<body>
    <table border="1">
        <tr>
            <th>Nama</th>
            <th>Umur</th>
        </tr>
        <tr>
            <td>Andi</td>
            <td>17</td>
        </tr>
    </table>
</body>
</html>`,
      isHidden: false,
      weight: 100,
    },
  ],
  isActive: true,
},

{
  id: 9,
  levelId: 1,
  title: "Membuat Layout Semantic",
  description:
    "Buat layout semantic menggunakan header, main, dan footer",
  difficulty: Difficulty.HARD,
  method: ChallengeMethod.CODING_MANUAL,
  idealTime: 480,
  xpBase: 30,
  hint: "Gunakan tag semantic HTML",
  starterCode: `<!DOCTYPE html>
<html>
<body>

</body>
</html>`,
  content: {
    language: "html",
    sandboxEnabled: false,
    starterCode: `<!DOCTYPE html>
<html>
<body>

</body>
</html>`,
    correctAnswer: `<!DOCTYPE html>
<html>
<body>
    <header>
        <h1>Website Saya</h1>
    </header>

    <main>
        <p>Konten utama</p>
    </main>

    <footer>
        <p>Copyright 2026</p>
    </footer>
</body>
</html>`,
  },
  testCases: [
    {
      input: null,
      expectedOutput: `<!DOCTYPE html>
<html>
<body>
    <header>
        <h1>Website Saya</h1>
    </header>

    <main>
        <p>Konten utama</p>
    </main>

    <footer>
        <p>Copyright 2026</p>
    </footer>
</body>
</html>`,
      isHidden: false,
      weight: 100,
    },
  ],
  isActive: true,
},

{
  id: 10,
  levelId: 1,
  title: "Susun Heading HTML",
  description:
    "Susun potongan kode untuk membuat heading HTML",
  difficulty: Difficulty.EASY,
  method: ChallengeMethod.DRAG_AND_DROP,
  idealTime: 90,
  xpBase: 10,
  hint: "Gunakan tag h1",
  starterCode: "",
  content: {
    blocks: [
      "<html>",
      "<!DOCTYPE html>",
      "<h1>Belajar HTML</h1>",
      "<body>",
      "</html>",
      "</body>",
    ],
    expectedOrder: [
      "<!DOCTYPE html>",
      "<html>",
      "<body>",
      "<h1>Belajar HTML</h1>",
      "</body>",
      "</html>"
    ],
  },
  testCases: [
    {
      input: null,
      expectedOutput: `<!DOCTYPE html>\n<html>\n<body>\n<h1>Belajar HTML</h1>\n</body>\n</html>`,
      isHidden: false,
      weight: 100,
    },
  ],
  isActive: true,
},

{
  id: 11,
  levelId: 1,
  title: "Susun Paragraf HTML",
  description:
    "Susun kode untuk membuat paragraf",
  difficulty: Difficulty.EASY,
  method: ChallengeMethod.DRAG_AND_DROP,
  idealTime: 90,
  xpBase: 10,
  hint: "Gunakan tag p",
  starterCode: "",
  content: {
    language: "html",
    sandboxEnabled: false,
    starterCode: "",
    correctAnswer: `<!DOCTYPE html>
<html>
<body>
    <p>Saya belajar HTML</p>
</body>
</html>`,
blocks: [
      "<html>",
      "<!DOCTYPE html>",
      "<p>Saya belajar HTML</p>",
      "<body>",
      "</html>",
      "</body>",
    ],
    expectedOrder: [
      "<!DOCTYPE html>",
      "<html>",
      "<body>",
      "<p>Saya belajar HTML</p>",
      "</body>",
      "</html>"
    ],
  },
  testCases: [
    {
      input: null,
      expectedOutput: `<!DOCTYPE html>\n<html>\n<body>\n<p>Saya belajar HTML</p>\n</body>\n</html>`,
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

  console.log("✅ Challenge Level 1 HTML Basics seeding completed!");
}
