import { PrismaClient, Difficulty, ChallengeMethod } from "@prisma/client";

export async function seedLevel1Challenge(prisma: PrismaClient) {
  console.log("🌱 Seeding Challenge Level 1: HTML Basics...");

  // 3. Seed Challenges
  const htmlChallenges = [
  {
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
    <title>Heading HTML</title>
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
    <title>Heading HTML</title>
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
    <title>Heading HTML</title>
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
    <title>Heading HTML</title>
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
    levelId: 1,
    title: "Menambahkan Paragraf",
    description:
      "Buatlah sebuah paragraf dengan teks 'HTML adalah dasar website'",
    difficulty: Difficulty.EASY,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 120,
    xpBase: 10,
    hint: "Gunakan tag <p>",
    starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Paragraf</title>
</head>
<body>

</body>
</html>
`,
    content: {
      language: "html",
      sandboxEnabled: false,
      starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Paragraf</title>
</head>
<body>

</body>
</html>
`,
      correctAnswer: `<!DOCTYPE html>
<html>
<head>
    <title>Paragraf</title>
</head>
<body>
    <p>HTML adalah dasar website</p>
</body>
</html>
`,
    },
    testCases: [
      {
        input: null,
        expectedOutput: `<!DOCTYPE html>
<html>
<head>
    <title>Paragraf</title>
</head>
<body>
    <p>HTML adalah dasar website</p>
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
    levelId: 1,
    title: "Membuat Link",
    description:
      "Buat link menuju https://google.com dengan teks Google",
    difficulty: Difficulty.EASY,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 120,
    xpBase: 10,
    hint: "Gunakan atribut href",
    starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Link</title>
</head>
<body>

</body>
</html>
`,
    content: {
      language: "html",
      sandboxEnabled: false,
      starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Link</title>
</head>
<body>

</body>
</html>
`,
      correctAnswer: `<!DOCTYPE html>
<html>
<head>
    <title>Link</title>
</head>
<body>
    <a href="https://google.com">Google</a>
</body>
</html>
`,
    },
    testCases: [
      {
        input: null,
        expectedOutput: `<!DOCTYPE html>
<html>
<head>
    <title>Link</title>
</head>
<body>
    <a href="https://google.com">Google</a>
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
    levelId: 1,
    title: "Menyusun Ordered List",
    description:
      "Susun kode agar menjadi ordered list yang valid",
    difficulty: Difficulty.EASY,
    method: ChallengeMethod.DRAG_AND_DROP,
    idealTime: 90,
    xpBase: 10,
    hint: "Gunakan tag ol dan li",
    content: {
      language: "html",
      sandboxEnabled: false,
      blocks: [
        "<li>HTML</li>",
        "</ol>",
        "<ol>",
      ],
      expectedOrder: [
        "<ol>",
        "<li>HTML</li>",
        "</ol>",
      ],
    },
    testCases: [
      {
        input: null,
        expectedOutput: `<ol>
<li>HTML</li>
</ol>`,
        isHidden: false,
        weight: 100,
      },
    ],
    isActive: true,
  },

  {
    levelId: 1,
    title: "Memperbaiki Heading",
    description:
      "Perbaiki tag heading berikut agar valid",
    difficulty: Difficulty.EASY,
    method: ChallengeMethod.FIX_THE_BUG,
    idealTime: 60,
    xpBase: 10,
    hint: "Tag penutup heading salah",
    starterCode: `<h1>Belajar HTML</h2>`,
    content: {
      language: "html",
      sandboxEnabled: false,
      buggyCode: `<h1>Belajar HTML</h2>`,
      correctAnswer: `<h1>Belajar HTML</h1>`,
    },
    testCases: [
      {
        input: null,
        expectedOutput: `<h1>Belajar HTML</h1>`,
        isHidden: false,
        weight: 100,
      },
    ],
    isActive: true,
  },

  {
    levelId: 1,
    title: "Membuat Gambar HTML",
    description:
      "Tambahkan gambar dengan source logo.png",
    difficulty: Difficulty.EASY,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 120,
    xpBase: 10,
    hint: "Gunakan tag img",
    starterCode: `<!DOCTYPE html>
<html>
<body>

</body>
</html>
`,
    content: {
      language: "html",
      sandboxEnabled: false,
      starterCode: `<!DOCTYPE html>
<html>
<body>

</body>
</html>
`,
      correctAnswer: `<!DOCTYPE html>
<html>
<body>
    <img src="logo.png" alt="Logo">
</body>
</html>
`,
    },
    testCases: [
      {
        input: null,
        expectedOutput: `<!DOCTYPE html>
<html>
<body>
    <img src="logo.png" alt="Logo">
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
    levelId: 1,
    title: "Menyusun Form HTML",
    description:
      "Susun struktur form HTML sederhana",
    difficulty: Difficulty.EASY,
    method: ChallengeMethod.DRAG_AND_DROP,
    idealTime: 90,
    xpBase: 10,
    hint: "Gunakan form dan input",
    content: {
      language: "html",
      sandboxEnabled: false,
      blocks: [
        "</form>",
        "<input type='text'>",
        "<form>",
      ],
      expectedOrder: [
        "<form>",
        "<input type='text'>",
        "</form>",
      ],
    },
    testCases: [
      {
        input: null,
        expectedOutput: `<form>
<input type='text'>
</form>`,
        isHidden: false,
        weight: 100,
      },
    ],
    isActive: true,
  },

  {
    levelId: 1,
    title: "Memperbaiki Link HTML",
    description:
      "Perbaiki atribut link berikut",
    difficulty: Difficulty.EASY,
    method: ChallengeMethod.FIX_THE_BUG,
    idealTime: 60,
    xpBase: 10,
    hint: "Atribut href salah penulisan",
    starterCode: `<a herf="https://google.com">Google</a>`,
    content: {
      language: "html",
      sandboxEnabled: false,
      buggyCode: `<a herf="https://google.com">Google</a>`,
      correctAnswer: `<a href="https://google.com">Google</a>`,
    },
    testCases: [
      {
        input: null,
        expectedOutput: `<a href="https://google.com">Google</a>`,
        isHidden: false,
        weight: 100,
      },
    ],
    isActive: true,
  },

  {
    levelId: 1,
    title: "Membuat Button HTML",
    description:
      "Buat tombol dengan teks Klik Saya",
    difficulty: Difficulty.EASY,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 120,
    xpBase: 10,
    hint: "Gunakan tag button",
    starterCode: `<!DOCTYPE html>
<html>
<body>

</body>
</html>
`,
    content: {
      language: "html",
      sandboxEnabled: false,
      starterCode: `<!DOCTYPE html>
<html>
<body>

</body>
</html>
`,
      correctAnswer: `<!DOCTYPE html>
<html>
<body>
    <button>Klik Saya</button>
</body>
</html>
`,
    },
    testCases: [
      {
        input: null,
        expectedOutput: `<!DOCTYPE html>
<html>
<body>
    <button>Klik Saya</button>
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
    levelId: 1,
    title: "Menyusun Unordered List",
    description:
      "Susun unordered list berikut",
    difficulty: Difficulty.EASY,
    method: ChallengeMethod.DRAG_AND_DROP,
    idealTime: 90,
    xpBase: 10,
    hint: "Gunakan ul",
    content: {
      language: "html",
      sandboxEnabled: false,
      blocks: [
        "<li>CSS</li>",
        "</ul>",
        "<ul>",
      ],
      expectedOrder: [
        "<ul>",
        "<li>CSS</li>",
        "</ul>",
      ],
    },
    testCases: [
      {
        input: null,
        expectedOutput: `<ul>
<li>CSS</li>
</ul>`,
        isHidden: false,
        weight: 100,
      },
    ],
    isActive: true,
  },

  // =========================
  // MEDIUM
  // =========================

  {
    levelId: 1,
    title: "Tabel Lanjutan (Colspan)",
    description:
      "Buat tabel 2x2. Pada baris pertama, gabungkan dua kolom menjadi satu menggunakan atribut colspan='2' pada tag th dengan teks 'Data Pegawai'. Baris kedua berisi dua td (Andi, 20).",
    difficulty: Difficulty.MEDIUM,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 180,
    xpBase: 20,
    hint: "Gunakan <th colspan='2'> pada baris pertama",
    starterCode: `<!DOCTYPE html>\n<html>\n<body>\n    <table border="1">\n        \n    </table>\n</body>\n</html>\n`,
    content: {
      language: "html",
      sandboxEnabled: false,
      starterCode: `<!DOCTYPE html>\n<html>\n<body>\n    <table border="1">\n        \n    </table>\n</body>\n</html>\n`,
      correctAnswer: `<!DOCTYPE html>\n<html>\n<body>\n    <table border="1">\n        <tr>\n            <th colspan="2">Data Pegawai</th>\n        </tr>\n        <tr>\n            <td>Andi</td>\n            <td>20</td>\n        </tr>\n    </table>\n</body>\n</html>\n`,
    },
    testCases: [
      {
        input: null,
        expectedOutput: `<!DOCTYPE html>\n<html>\n<body>\n    <table border="1">\n        <tr>\n            <th colspan="2">Data Pegawai</th>\n        </tr>\n        <tr>\n            <td>Andi</td>\n            <td>20</td>\n        </tr>\n    </table>\n</body>\n</html>\n`,
        isHidden: false,
        weight: 100,
      },
    ],
    isActive: true,
  },

  {
    levelId: 1,
    title: "Form Input Validasi",
    description:
      "Lengkapi form berikut dengan input 'email' yang wajib diisi (required), input 'password', dan tombol submit.",
    difficulty: Difficulty.MEDIUM,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 180,
    xpBase: 20,
    hint: "Tambahkan type='email' required, type='password', dan type='submit'",
    starterCode: `<!DOCTYPE html>\n<html>\n<body>\n    <form>\n        \n    </form>\n</body>\n</html>\n`,
    content: {
      language: "html",
      sandboxEnabled: false,
      starterCode: `<!DOCTYPE html>\n<html>\n<body>\n    <form>\n        \n    </form>\n</body>\n</html>\n`,
      correctAnswer: `<!DOCTYPE html>\n<html>\n<body>\n    <form>\n        <input type="email" name="email" required>\n        <input type="password" name="password">\n        <button type="submit">Daftar</button>\n    </form>\n</body>\n</html>\n`,
    },
    testCases: [
      {
        input: null,
        expectedOutput: `<!DOCTYPE html>\n<html>\n<body>\n    <form>\n        <input type="email" name="email" required>\n        <input type="password" name="password">\n        <button type="submit">Daftar</button>\n    </form>\n</body>\n</html>\n`,
        isHidden: false,
        weight: 100,
      },
    ],
    isActive: true,
  },

  {
    levelId: 1,
    title: "Menyusun Link Gambar Terbuka di Tab Baru",
    description:
      "Susun potongan kode berikut agar logo.png bisa diklik dan akan membuka 'https://google.com' di tab baru.",
    difficulty: Difficulty.MEDIUM,
    method: ChallengeMethod.DRAG_AND_DROP,
    idealTime: 120,
    xpBase: 20,
    hint: "Bungkus tag <img> dengan tag <a> yang memiliki target='_blank'",
    content: {
      language: "html",
      sandboxEnabled: false,
      blocks: [
        "<img src='logo.png' alt='Logo'>",
        "</a>",
        "<a href='https://google.com' target='_blank'>",
      ],
      expectedOrder: [
        "<a href='https://google.com' target='_blank'>",
        "<img src='logo.png' alt='Logo'>",
        "</a>",
      ],
    },
    testCases: [
      {
        input: null,
        expectedOutput: `<a href='https://google.com' target='_blank'>\n<img src='logo.png' alt='Logo'>\n</a>`,
        isHidden: false,
        weight: 100,
      },
    ],
    isActive: true,
  },

  {
    levelId: 1,
    title: "Memperbaiki Logika Struktur List",
    description:
      "Perbaiki urutan dan struktur HTML berikut. Terdapat kesalahan logika di mana list item (li) berada di luar dari blok unordered list (ul).",
    difficulty: Difficulty.MEDIUM,
    method: ChallengeMethod.FIX_THE_BUG,
    idealTime: 120,
    xpBase: 20,
    hint: "Pindahkan <li> ke dalam pasangan <ul>...</ul>",
    starterCode: `<ul></ul>\n<li>Apel</li>\n<li>Jeruk</li>`,
    content: {
      language: "html",
      sandboxEnabled: false,
      buggyCode: `<ul></ul>\n<li>Apel</li>\n<li>Jeruk</li>`,
      correctAnswer: `<ul>\n<li>Apel</li>\n<li>Jeruk</li>\n</ul>`,
    },
    testCases: [
      {
        input: null,
        expectedOutput: `<ul>\n<li>Apel</li>\n<li>Jeruk</li>\n</ul>`,
        isHidden: false,
        weight: 100,
      },
    ],
    isActive: true,
  },

  {
    levelId: 1,
    title: "Nested List (List Bersarang)",
    description:
      "Buat unordered list berisi 1 item 'Buah', lalu di DALAM list item tersebut buatlah ordered list berisi 'Apel' dan 'Mangga'.",
    difficulty: Difficulty.MEDIUM,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 180,
    xpBase: 20,
    hint: "Letakkan <ol> di antara tag <li>Buah dan </li>",
    starterCode: `<!DOCTYPE html>\n<html>\n<body>\n    \n</body>\n</html>\n`,
    content: {
      language: "html",
      sandboxEnabled: false,
      starterCode: `<!DOCTYPE html>\n<html>\n<body>\n    \n</body>\n</html>\n`,
      correctAnswer: `<!DOCTYPE html>\n<html>\n<body>\n    <ul>\n        <li>Buah\n            <ol>\n                <li>Apel</li>\n                <li>Mangga</li>\n            </ol>\n        </li>\n    </ul>\n</body>\n</html>\n`,
    },
    testCases: [
      {
        input: null,
        expectedOutput: `<!DOCTYPE html>\n<html>\n<body>\n    <ul>\n        <li>Buah\n            <ol>\n                <li>Apel</li>\n                <li>Mangga</li>\n            </ol>\n        </li>\n    </ul>\n</body>\n</html>\n`,
        isHidden: false,
        weight: 100,
      },
    ],
    isActive: true,
  },

  // =========================
  // HARD
  // =========================

  {
    levelId: 1,
    title: "Semantic Layout Berhirarki",
    description:
      "Buat kerangka halaman website menggunakan Semantic HTML dengan urutan: <header>, lalu <main> (yang di dalamnya terdapat <section> dan <aside>), dan terakhir <footer>.",
    difficulty: Difficulty.HARD,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 300,
    xpBase: 30,
    hint: "Pastikan section dan aside berada di dalam main",
    starterCode: `<!DOCTYPE html>\n<html>\n<body>\n    \n</body>\n</html>\n`,
    content: {
      language: "html",
      sandboxEnabled: false,
      starterCode: `<!DOCTYPE html>\n<html>\n<body>\n    \n</body>\n</html>\n`,
      correctAnswer: `<!DOCTYPE html>\n<html>\n<body>\n    <header></header>\n    <main>\n        <section></section>\n        <aside></aside>\n    </main>\n    <footer></footer>\n</body>\n</html>\n`,
    },
    testCases: [
      {
        input: null,
        expectedOutput: `<!DOCTYPE html>\n<html>\n<body>\n    <header></header>\n    <main>\n        <section></section>\n        <aside></aside>\n    </main>\n    <footer></footer>\n</body>\n</html>\n`,
        isHidden: false,
        weight: 100,
      },
    ],
    isActive: true,
  },

  {
    levelId: 1,
    title: "Artikel Komprehensif",
    description:
      "Buat artikel terstruktur yang dibungkus oleh tag <article>. Di dalamnya terdapat <h2> berjudul 'Web Dev', paragraf <p> berisi sebuah <a href='/html'>link HTML</a>, dan ditutup dengan tag Horizontal Rule (<hr>).",
    difficulty: Difficulty.HARD,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 300,
    xpBase: 30,
    hint: "Perhatikan urutan tag pembungkus dan penutup",
    starterCode: `<!DOCTYPE html>\n<html>\n<body>\n    \n</body>\n</html>\n`,
    content: {
      language: "html",
      sandboxEnabled: false,
      starterCode: `<!DOCTYPE html>\n<html>\n<body>\n    \n</body>\n</html>\n`,
      correctAnswer: `<!DOCTYPE html>\n<html>\n<body>\n    <article>\n        <h2>Web Dev</h2>\n        <p>Belajar <a href="/html">link HTML</a></p>\n        <hr>\n    </article>\n</body>\n</html>\n`,
    },
    testCases: [
      {
        input: null,
        expectedOutput: `<!DOCTYPE html>\n<html>\n<body>\n    <article>\n        <h2>Web Dev</h2>\n        <p>Belajar <a href="/html">link HTML</a></p>\n        <hr>\n    </article>\n</body>\n</html>\n`,
        isHidden: false,
        weight: 100,
      },
    ],
    isActive: true,
  },

  {
    levelId: 1,
    title: "Menebalkan Teks",
    description: "Buatlah teks 'Teks Penting' menjadi tebal menggunakan tag HTML yang sesuai.",
    difficulty: Difficulty.EASY,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 60,
    xpBase: 10,
    hint: "Gunakan tag <b>",
    starterCode: `<!DOCTYPE html>\n<html>\n<body>\n    \n</body>\n</html>`,
    content: {
      language: "html",
      sandboxEnabled: false,
      starterCode: `<!DOCTYPE html>\n<html>\n<body>\n    \n</body>\n</html>`,
      correctAnswer: `<!DOCTYPE html>\n<html>\n<body>\n    <b>Teks Penting</b>\n</body>\n</html>`,
    },
    testCases: [
      {
        input: null,
        expectedOutput: `<!DOCTYPE html>\n<html>\n<body>\n    <b>Teks Penting</b>\n</body>\n</html>`,
        isHidden: false,
        weight: 100,
      },
    ],
    isActive: true,
  },

  {
    levelId: 1,
    title: "Menambahkan Audio",
    description: "Susun tag HTML untuk menambahkan pemutar audio ke halaman.",
    difficulty: Difficulty.MEDIUM,
    method: ChallengeMethod.DRAG_AND_DROP,
    idealTime: 90,
    xpBase: 20,
    hint: "Gunakan tag audio dan source",
    content: {
      language: "html",
      sandboxEnabled: false,
      blocks: [
        "</audio>",
        "<source src='musik.mp3' type='audio/mpeg'>",
        "<audio controls>",
      ],
      expectedOrder: [
        "<audio controls>",
        "<source src='musik.mp3' type='audio/mpeg'>",
        "</audio>",
      ],
    },
    testCases: [
      {
        input: null,
        expectedOutput: `<audio controls>\n<source src='musik.mp3' type='audio/mpeg'>\n</audio>`,
        isHidden: false,
        weight: 100,
      },
    ],
    isActive: true,
  },

  {
    levelId: 1,
    title: "Memperbaiki Karakter Khusus",
    description: "Tampilkan teks '<p>Hello</p>' di dalam sebuah paragraf tanpa merendernya sebagai elemen HTML sungguhan.",
    difficulty: Difficulty.EASY,
    method: ChallengeMethod.FIX_THE_BUG,
    idealTime: 60,
    xpBase: 10,
    hint: "Gunakan &lt; dan &gt;",
    starterCode: `<p><p>Hello</p></p>`,
    content: {
      language: "html",
      sandboxEnabled: false,
      buggyCode: `<p><p>Hello</p></p>`,
      correctAnswer: `<p>&lt;p&gt;Hello&lt;/p&gt;</p>`,
    },
    testCases: [
      {
        input: null,
        expectedOutput: `<p>&lt;p&gt;Hello&lt;/p&gt;</p>`,
        isHidden: false,
        weight: 100,
      },
    ],
    isActive: true,
  },

  {
    levelId: 1,
    title: "Menambahkan Meta Charset",
    description: "Tambahkan tag meta dengan charset UTF-8 di dalam bagian head.",
    difficulty: Difficulty.MEDIUM,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 120,
    xpBase: 20,
    hint: "Gunakan tag <meta charset=\"UTF-8\">",
    starterCode: `<!DOCTYPE html>\n<html>\n<head>\n    <title>Meta Tags</title>\n    \n</head>\n<body>\n    <p>Belajar Meta Tags</p>\n</body>\n</html>`,
    content: {
      language: "html",
      sandboxEnabled: false,
      starterCode: `<!DOCTYPE html>\n<html>\n<head>\n    <title>Meta Tags</title>\n    \n</head>\n<body>\n    <p>Belajar Meta Tags</p>\n</body>\n</html>`,
      correctAnswer: `<!DOCTYPE html>\n<html>\n<head>\n    <title>Meta Tags</title>\n    <meta charset="UTF-8">\n</head>\n<body>\n    <p>Belajar Meta Tags</p>\n</body>\n</html>`,
    },
    testCases: [
      {
        input: null,
        expectedOutput: `<!DOCTYPE html>\n<html>\n<head>\n    <title>Meta Tags</title>\n    <meta charset="UTF-8">\n</head>\n<body>\n    <p>Belajar Meta Tags</p>\n</body>\n</html>`,
        isHidden: false,
        weight: 100,
      },
    ],
    isActive: true,
  }
];

  for (const c of htmlChallenges) {
    // 1. Cari apakah tantangan dengan judul dan level yang sama sudah ada di DB
    const existing = await prisma.challenge.findFirst({
      where: {
        levelId: c.levelId,
        title: c.title,
      },
    });

    // 2. Saring data agar hanya kolom yang valid di schema Prisma yang dikirim
    const challengeData = {
      levelId: c.levelId,
      title: c.title,
      description: c.description,
      difficulty: c.difficulty,
      method: c.method,
      idealTime: c.idealTime,
      xpBase: c.xpBase,
      isActive: c.isActive !== undefined ? c.isActive : true,
      hint: c.hint || null,
      starterCode: c.starterCode || null,
      content: c.content ? (c.content as any) : null,
      testCases: c.testCases ? (c.testCases as any) : null,
    };

    if (existing) {
      // Jika data sudah ada, lakukan update
      await prisma.challenge.update({
        where: { id: existing.id },
        data: challengeData,
      });
    } else {
      // Jika data belum ada, buat baru (ID akan diisi oleh auto-increment database)
      await prisma.challenge.create({
        data: challengeData,
      });
    }
  }

  console.log("✅ Challenge Level 1 HTML Basics seeding completed!");
}

// Runner untuk eksekusi langsung via bun
const p = new PrismaClient();
seedLevel1Challenge(p)
  .catch(console.error)
  .finally(() => p.$disconnect());