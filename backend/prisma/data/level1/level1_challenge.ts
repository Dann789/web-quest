import { PrismaClient, Difficulty, ChallengeMethod } from "@prisma/client";

export async function seedLevel1Challenge(prisma: PrismaClient) {
  console.log("🌱 Seeding Challenge Level 1: HTML Basics...");

  const mkJson = (html: string, css: string, js: string) => {
    let finalHtml = html;
    if (!html) {
      finalHtml = "<!DOCTYPE html>\n<html>\n<head>\n    <title>Web Quest</title>\n</head>\n<body>\n    <!-- Tulis kode HTML Anda di bawah ini -->\n\n</body>\n</html>";
    } else if (!html.includes("<!DOCTYPE html>")) {
      finalHtml = "<!DOCTYPE html>\n<html>\n<head>\n    <title>Web Quest</title>\n</head>\n<body>\n" + html + "\n</body>\n</html>";
    }
    
    return finalHtml;
  };

  const htmlChallenges = [
    {
      levelId: 1,
      title: "Membuat Heading HTML",
      description: "Buatlah sebuah heading utama (h1) dengan teks 'Belajar Web'. Pastikan tag pembuka dan penutup ditulis dengan benar.",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 120,
      xpBase: 10,
      hint: "Gunakan tag <h1>",
      starterCode: mkJson("    <!-- Tambahkan tag h1 di bawah ini -->\n    ", "", ""),
      content: {
        language: "html",
        sandboxEnabled: false,
        starterCode: mkJson("    <!-- Tambahkan tag h1 di bawah ini -->\n    ", "", ""),
        correctAnswer: mkJson("    <!-- Tambahkan tag h1 di bawah ini -->\n    <h1>Belajar Web</h1>", "", ""),
      },
      testCases: [
        { input: null, expectedOutput: mkJson("    <!-- Tambahkan tag h1 di bawah ini -->\n    <h1>Belajar Web</h1>", "", ""), isHidden: false, weight: 100 }
      ],
      isActive: true,
    },
    {
      levelId: 1,
      title: "Menambahkan Paragraf",
      description: "Tambahkan dua buah paragraf. Paragraf pertama berisi 'Halo Dunia', dan paragraf kedua berisi 'Belajar Coding'.",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 120,
      xpBase: 10,
      hint: "Gunakan tag <p> untuk membuat paragraf",
      starterCode: mkJson("    <!-- Tambahkan 2 paragraf di bawah ini -->\n    ", "", ""),
      content: {
        language: "html",
        sandboxEnabled: false,
        starterCode: mkJson("    <!-- Tambahkan 2 paragraf di bawah ini -->\n    ", "", ""),
        correctAnswer: mkJson("    <!-- Tambahkan 2 paragraf di bawah ini -->\n    <p>Halo Dunia</p>\n    <p>Belajar Coding</p>", "", ""),
      },
      testCases: [
        { input: null, expectedOutput: mkJson("    <!-- Tambahkan 2 paragraf di bawah ini -->\n    <p>Halo Dunia</p>\n    <p>Belajar Coding</p>", "", ""), isHidden: false, weight: 100 }
      ],
      isActive: true,
    },
    {
      levelId: 1,
      title: "Membuat Link",
      description: "Buatlah sebuah link dengan tag <a> yang menuju 'https://google.com' dengan teks 'Google'.",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 150,
      xpBase: 10,
      hint: "Gunakan tag <a href='...'>",
      starterCode: mkJson("    <!-- Buat link Google di bawah ini -->\n    ", "", ""),
      content: {
        language: "html",
        sandboxEnabled: false,
        starterCode: mkJson("    <!-- Buat link Google di bawah ini -->\n    ", "", ""),
        correctAnswer: mkJson("    <!-- Buat link Google di bawah ini -->\n    <a href=\"https://google.com\">Google</a>", "", ""),
      },
      testCases: [
        { input: null, expectedOutput: mkJson("    <!-- Buat link Google di bawah ini -->\n    <a href=\"https://google.com\">Google</a>", "", ""), isHidden: false, weight: 100 }
      ],
      isActive: true,
    },
    {
      levelId: 1,
      title: "Menyusun Ordered List",
      description: "Susun tag-tag berikut agar menjadi sebuah daftar berurut (Ordered List) yang berisi 3 item.",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.DRAG_AND_DROP,
      idealTime: 120,
      xpBase: 10,
      hint: "Gunakan tag <ol> dan <li>",
      starterCode: null,
      content: {
        language: "html",
        sandboxEnabled: false,
        blocks: [
          "<li>JavaScript</li>",
          "<li>CSS</li>",
          "<ol>",
          "<li>HTML</li>",
          "</ol>"
        ],
        expectedOrder: [
          "<ol>",
          "<li>HTML</li>",
          "<li>CSS</li>",
          "<li>JavaScript</li>",
          "</ol>"
        ],
      },
      testCases: [
        { input: null, expectedOutput: "<ol>\n<li>HTML</li>\n<li>CSS</li>\n<li>JavaScript</li>\n</ol>", isHidden: false, weight: 100 }
      ],
      isActive: true,
    },
    {
      levelId: 1,
      title: "Memperbaiki Heading",
      description: "Heading ini tidak tertutup dengan benar. Perbaiki tag penutupnya.",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.FIX_THE_BUG,
      idealTime: 90,
      xpBase: 10,
      hint: "Tutup dengan </h2>",
      starterCode: mkJson("    <!-- Perbaiki tag di bawah ini -->\n    <h2>Sub Judul</h3>", "", ""),
      content: {
        language: "html",
        sandboxEnabled: false,
        buggyCode: mkJson("    <!-- Perbaiki tag di bawah ini -->\n    <h2>Sub Judul</h3>", "", ""),
        correctAnswer: mkJson("    <!-- Perbaiki tag di bawah ini -->\n    <h2>Sub Judul</h2>", "", ""),
      },
      testCases: [
        { input: null, expectedOutput: mkJson("    <!-- Perbaiki tag di bawah ini -->\n    <h2>Sub Judul</h2>", "", ""), isHidden: false, weight: 100 }
      ],
      isActive: true,
    },
    {
      levelId: 1,
      title: "Membuat Gambar HTML",
      description: "Tampilkan sebuah gambar dengan atribut src='logo.png' dan teks alternatif (alt) 'Logo'.",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 120,
      xpBase: 10,
      hint: "Gunakan tag <img src='...' alt='...'>",
      starterCode: mkJson("    <!-- Tambahkan gambar di bawah ini -->\n    ", "", ""),
      content: {
        language: "html",
        sandboxEnabled: false,
        starterCode: mkJson("    <!-- Tambahkan gambar di bawah ini -->\n    ", "", ""),
        correctAnswer: mkJson("    <!-- Tambahkan gambar di bawah ini -->\n    <img src=\"logo.png\" alt=\"Logo\">", "", ""),
      },
      testCases: [
        { input: null, expectedOutput: mkJson("    <!-- Tambahkan gambar di bawah ini -->\n    <img src=\"logo.png\" alt=\"Logo\">", "", ""), isHidden: false, weight: 100 }
      ],
      isActive: true,
    },
    {
      levelId: 1,
      title: "Menyusun Form Dasar",
      description: "Susun baris kode berikut sehingga membentuk formulir yang berisi input teks dan tombol submit.",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.DRAG_AND_DROP,
      idealTime: 180,
      xpBase: 10,
      hint: "Urutannya: form, label, input, button, tutup form.",
      starterCode: null,
      content: {
        language: "html",
        sandboxEnabled: false,
        blocks: [
          "<form>",
          "<label>Nama:</label>",
          "<input type=\"text\">",
          "<button type=\"submit\">Kirim</button>",
          "</form>"
        ],
        expectedOrder: [
          "<form>",
          "<label>Nama:</label>",
          "<input type=\"text\">",
          "<button type=\"submit\">Kirim</button>",
          "</form>"
        ],
      },
      testCases: [
        { input: null, expectedOutput: "<form>\n<label>Nama:</label>\n<input type=\"text\">\n<button type=\"submit\">Kirim</button>\n</form>", isHidden: false, weight: 100 }
      ],
      isActive: true,
    },
    {
      levelId: 1,
      title: "Memperbaiki Link HTML",
      description: "Atribut untuk menentukan tujuan link salah ketik. Perbaiki agar link dapat berfungsi.",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.FIX_THE_BUG,
      idealTime: 90,
      xpBase: 10,
      hint: "Gunakan atribut href",
      starterCode: mkJson("    <!-- Perbaiki atribut herf menjadi href -->\n    <a herf=\"https://google.com\">Google</a>", "", ""),
      content: {
        language: "html",
        sandboxEnabled: false,
        buggyCode: mkJson("    <!-- Perbaiki atribut herf menjadi href -->\n    <a herf=\"https://google.com\">Google</a>", "", ""),
        correctAnswer: mkJson("    <!-- Perbaiki atribut herf menjadi href -->\n    <a href=\"https://google.com\">Google</a>", "", ""),
      },
      testCases: [
        { input: null, expectedOutput: mkJson("    <!-- Perbaiki atribut herf menjadi href -->\n    <a href=\"https://google.com\">Google</a>", "", ""), isHidden: false, weight: 100 }
      ],
      isActive: true,
    },
    {
      levelId: 1,
      title: "Menyusun Unordered List",
      description: "Susun baris kode berikut untuk membentuk daftar tidak berurut (Unordered List) dengan dua item: Apel dan Mangga.",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.DRAG_AND_DROP,
      idealTime: 120,
      xpBase: 10,
      hint: "Gunakan tag <ul> untuk membungkus <li>",
      starterCode: null,
      content: {
        language: "html",
        sandboxEnabled: false,
        blocks: [
          "<li>Apel</li>",
          "</ul>",
          "<ul>",
          "<li>Mangga</li>"
        ],
        expectedOrder: [
          "<ul>",
          "<li>Apel</li>",
          "<li>Mangga</li>",
          "</ul>"
        ],
      },
      testCases: [
        { input: null, expectedOutput: "<ul>\n<li>Apel</li>\n<li>Mangga</li>\n</ul>", isHidden: false, weight: 100 }
      ],
      isActive: true,
    },
    {
      levelId: 1,
      title: "Tabel Lanjutan (Colspan)",
      description: "Buat sebuah tabel dengan satu baris (tr). Baris ini memiliki satu sel (td) dengan atribut colspan='2' dan teks 'Dua Kolom'.",
      difficulty: Difficulty.MEDIUM,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 180,
      xpBase: 20,
      hint: "Gunakan <td colspan='2'>",
      starterCode: mkJson("    <!-- Tulis tabel di bawah ini -->\n    <table>\n      <tr>\n        \n      </tr>\n    </table>", "", ""),
      content: {
        language: "html",
        sandboxEnabled: false,
        starterCode: mkJson("    <!-- Tulis tabel di bawah ini -->\n    <table>\n      <tr>\n        \n      </tr>\n    </table>", "", ""),
        correctAnswer: mkJson("    <!-- Tulis tabel di bawah ini -->\n    <table>\n      <tr>\n        <td colspan=\"2\">Dua Kolom</td>\n      </tr>\n    </table>", "", ""),
      },
      testCases: [
        { input: null, expectedOutput: mkJson("    <!-- Tulis tabel di bawah ini -->\n    <table>\n      <tr>\n        <td colspan=\"2\">Dua Kolom</td>\n      </tr>\n    </table>", "", ""), isHidden: false, weight: 100 }
      ],
      isActive: true,
    },
    {
      levelId: 1,
      title: "Form Input Validasi",
      description: "Tambahkan atribut 'required' pada input agar form tidak bisa dikirim jika kosong. Tambahkan juga 'placeholder' berisi teks 'Isi Nama'.",
      difficulty: Difficulty.MEDIUM,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 150,
      xpBase: 20,
      hint: "Gunakan atribut required dan placeholder='Isi Nama'",
      starterCode: mkJson("    <!-- Tambahkan atribut pada input ini -->\n    <form>\n      <input type=\"text\">\n      <button>Kirim</button>\n    </form>", "", ""),
      content: {
        language: "html",
        sandboxEnabled: false,
        starterCode: mkJson("    <!-- Tambahkan atribut pada input ini -->\n    <form>\n      <input type=\"text\">\n      <button>Kirim</button>\n    </form>", "", ""),
        correctAnswer: mkJson("    <!-- Tambahkan atribut pada input ini -->\n    <form>\n      <input type=\"text\" placeholder=\"Isi Nama\" required>\n      <button>Kirim</button>\n    </form>", "", ""),
      },
      testCases: [
        { input: null, expectedOutput: mkJson("    <!-- Tambahkan atribut pada input ini -->\n    <form>\n      <input type=\"text\" placeholder=\"Isi Nama\" required>\n      <button>Kirim</button>\n    </form>", "", ""), isHidden: false, weight: 100 }
      ],
      isActive: true,
    },
    {
      levelId: 1,
      title: "Menyusun Link Gambar Terbuka di Tab Baru",
      description: "Susun baris kode agar menjadi sebuah link yang membungkus gambar, dan jika diklik akan membuka di tab baru.",
      difficulty: Difficulty.MEDIUM,
      method: ChallengeMethod.DRAG_AND_DROP,
      idealTime: 180,
      xpBase: 20,
      hint: "Tag <a> harus menggunakan target='_blank'.",
      starterCode: null,
      content: {
        language: "html",
        sandboxEnabled: false,
        blocks: [
          "<img src=\"logo.png\">",
          "</a>",
          "target=\"_blank\">",
          "<a href=\"https://google.com\""
        ],
        expectedOrder: [
          "<a href=\"https://google.com\"",
          "target=\"_blank\">",
          "<img src=\"logo.png\">",
          "</a>"
        ],
      },
      testCases: [
        { input: null, expectedOutput: "<a href=\"https://google.com\"\ntarget=\"_blank\">\n<img src=\"logo.png\">\n</a>", isHidden: false, weight: 100 }
      ],
      isActive: true,
    },
    {
      levelId: 1,
      title: "Memperbaiki Logika Struktur List",
      description: "Elemen <li> tidak boleh berada di luar kontainer list. Ganti tag <div> pembungkusnya menjadi <ul> agar strukturnya valid.",
      difficulty: Difficulty.MEDIUM,
      method: ChallengeMethod.FIX_THE_BUG,
      idealTime: 120,
      xpBase: 20,
      hint: "Ubah <div> menjadi <ul>",
      starterCode: mkJson("    <!-- Ubah div menjadi ul -->\n    <div>\n      <li>Apel</li>\n      <li>Jeruk</li>\n    </div>", "", ""),
      content: {
        language: "html",
        sandboxEnabled: false,
        buggyCode: mkJson("    <!-- Ubah div menjadi ul -->\n    <div>\n      <li>Apel</li>\n      <li>Jeruk</li>\n    </div>", "", ""),
        correctAnswer: mkJson("    <!-- Ubah div menjadi ul -->\n    <ul>\n      <li>Apel</li>\n      <li>Jeruk</li>\n    </ul>", "", ""),
      },
      testCases: [
        { input: null, expectedOutput: mkJson("    <!-- Ubah div menjadi ul -->\n    <ul>\n      <li>Apel</li>\n      <li>Jeruk</li>\n    </ul>", "", ""), isHidden: false, weight: 100 }
      ],
      isActive: true,
    },
    {
      levelId: 1,
      title: "Nested List (List Bersarang)",
      description: "Di dalam tag <li>Buah</li>, tambahkan daftar berurut (ol) berisi 'Apel' dan 'Pisang'.",
      difficulty: Difficulty.MEDIUM,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 240,
      xpBase: 20,
      hint: "Letakkan <ol> sebelum tag </li> penutup dari Buah.",
      starterCode: mkJson("    <!-- Tambahkan ol di dalam item Buah -->\n    <ul>\n      <li>Sayur</li>\n      <li>Buah\n        \n      </li>\n    </ul>", "", ""),
      content: {
        language: "html",
        sandboxEnabled: false,
        starterCode: mkJson("    <!-- Tambahkan ol di dalam item Buah -->\n    <ul>\n      <li>Sayur</li>\n      <li>Buah\n        \n      </li>\n    </ul>", "", ""),
        correctAnswer: mkJson("    <!-- Tambahkan ol di dalam item Buah -->\n    <ul>\n      <li>Sayur</li>\n      <li>Buah\n        <ol>\n          <li>Apel</li>\n          <li>Pisang</li>\n        </ol>\n      </li>\n    </ul>", "", ""),
      },
      testCases: [
        { input: null, expectedOutput: mkJson("    <!-- Tambahkan ol di dalam item Buah -->\n    <ul>\n      <li>Sayur</li>\n      <li>Buah\n        <ol>\n          <li>Apel</li>\n          <li>Pisang</li>\n        </ol>\n      </li>\n    </ul>", "", ""), isHidden: false, weight: 100 }
      ],
      isActive: true,
    },
    {
      levelId: 1,
      title: "Memperbaiki Karakter Khusus",
      description: "Gunakan entitas karakter untuk menampilkan simbol 'kurang dari' (<) agar tidak dianggap sebagai awal tag.",
      difficulty: Difficulty.MEDIUM,
      method: ChallengeMethod.FIX_THE_BUG,
      idealTime: 90,
      xpBase: 20,
      hint: "Gunakan &lt;",
      starterCode: mkJson("    <!-- Perbaiki tanda '<' di bawah ini -->\n    <p>5 < 10</p>", "", ""),
      content: {
        language: "html",
        sandboxEnabled: false,
        buggyCode: mkJson("    <!-- Perbaiki tanda '<' di bawah ini -->\n    <p>5 < 10</p>", "", ""),
        correctAnswer: mkJson("    <!-- Perbaiki tanda '<' di bawah ini -->\n    <p>5 &lt; 10</p>", "", ""),
      },
      testCases: [
        { input: null, expectedOutput: mkJson("    <!-- Perbaiki tanda '<' di bawah ini -->\n    <p>5 &lt; 10</p>", "", ""), isHidden: false, weight: 100 }
      ],
      isActive: true,
    },
    // ===========================
    // 3 SOAL HARD
    // ===========================
    {
      levelId: 1,
      title: "Struktur Artikel Sederhana",
      description: "Buat sebuah elemen <article>. Di dalamnya, letakkan sebuah <h2> dengan teks 'Judul', dan sebuah <p> dengan teks 'Deskripsi'.",
      difficulty: Difficulty.HARD,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 180,
      xpBase: 30,
      hint: "Semuanya harus berada di dalam tag <article>.",
      starterCode: mkJson("    <!-- Buat elemen article di bawah ini -->\n    ", "", ""),
      content: {
        language: "html",
        sandboxEnabled: false,
        starterCode: mkJson("    <!-- Buat elemen article di bawah ini -->\n    ", "", ""),
        correctAnswer: mkJson("    <!-- Buat elemen article di bawah ini -->\n    <article>\n      <h2>Judul</h2>\n      <p>Deskripsi</p>\n    </article>", "", ""),
      },
      testCases: [
        { input: null, expectedOutput: mkJson("    <!-- Buat elemen article di bawah ini -->\n    <article>\n      <h2>Judul</h2>\n      <p>Deskripsi</p>\n    </article>", "", ""), isHidden: false, weight: 100 }
      ],
      isActive: true,
    },
    {
      levelId: 1,
      title: "Formulir Pendaftaran",
      description: "Buat sebuah <form>. Di dalamnya, buat satu input bertipe 'email' dan satu input bertipe 'password'. Terakhir, buat satu <button> dengan tipe 'submit' dan teks 'Daftar'.",
      difficulty: Difficulty.HARD,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 240,
      xpBase: 30,
      hint: "Urutannya: form > input email, input password, button submit.",
      starterCode: mkJson("    <!-- Buat formulir di bawah ini -->\n    ", "", ""),
      content: {
        language: "html",
        sandboxEnabled: false,
        starterCode: mkJson("    <!-- Buat formulir di bawah ini -->\n    ", "", ""),
        correctAnswer: mkJson("    <!-- Buat formulir di bawah ini -->\n    <form>\n      <input type=\"email\">\n      <input type=\"password\">\n      <button type=\"submit\">Daftar</button>\n    </form>", "", ""),
      },
      testCases: [
        { input: null, expectedOutput: mkJson("    <!-- Buat formulir di bawah ini -->\n    <form>\n      <input type=\"email\">\n      <input type=\"password\">\n      <button type=\"submit\">Daftar</button>\n    </form>", "", ""), isHidden: false, weight: 100 }
      ],
      isActive: true,
    },
    {
      levelId: 1,
      title: "Susun Layout Utama",
      description: "Susun tag-tag berikut sehingga membentuk sebuah layout dasar HTML5 Semantic yang valid dengan urutan: Header, Main (bersama Section), dan ditutup Footer.",
      difficulty: Difficulty.HARD,
      method: ChallengeMethod.DRAG_AND_DROP,
      idealTime: 180,
      xpBase: 30,
      hint: "Urutan dari atas: <header>, <main>, <section> di dalam main, lalu <footer>.",
      starterCode: null,
      content: {
        language: "html",
        sandboxEnabled: false,
        blocks: [
          "<header>Kepala</header>",
          "<footer>Kaki</footer>",
          "</main>",
          "<section>Isi</section>",
          "<main>"
        ],
        expectedOrder: [
          "<header>Kepala</header>",
          "<main>",
          "<section>Isi</section>",
          "</main>",
          "<footer>Kaki</footer>"
        ],
      },
      testCases: [
        { input: null, expectedOutput: "<header>Kepala</header>\n<main>\n<section>Isi</section>\n</main>\n<footer>Kaki</footer>", isHidden: false, weight: 100 }
      ],
      isActive: true,
    }
  ];

  for (const c of htmlChallenges) {
    const existing = await prisma.challenge.findFirst({
      where: { levelId: c.levelId, title: c.title },
    });
    const challengeData = { ...c, content: c.content as any, testCases: c.testCases as any };
    if (existing) {
      await prisma.challenge.update({ where: { id: existing.id }, data: challengeData });
    } else {
      await prisma.challenge.create({ data: challengeData });
    }
  }
  
  // Clean up unused challenges
  const activeTitles = htmlChallenges.map(c => c.title);
  await prisma.challenge.deleteMany({
    where: {
      levelId: 1,
      title: { notIn: activeTitles }
    }
  });

  console.log("✅ Challenge Level 1 HTML Basics seeding completed!");
}
