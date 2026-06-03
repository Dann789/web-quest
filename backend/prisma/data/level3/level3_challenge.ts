import { PrismaClient, Difficulty, ChallengeMethod } from "@prisma/client";

export async function seedLevel3Challenge(prisma: PrismaClient) {
  console.log("🌱 Seeding Challenge Level 3: JavaScript...");

  const javascriptChallenges = [
    // --- EASY ---
    {
      levelId: 3,
      title: "Membuat Variabel JavaScript",
      description: "Buat sebuah variabel bernama 'playerName' menggunakan let dan isi nilainya dengan 'Andi'. Lalu buat konstanta 'level' menggunakan const dengan nilai 1.",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 90,
      xpBase: 10,
      hint: "Gunakan 'let playerName = ...;' dan 'const level = ...;'",
      isActive: true,
      starterCode: JSON.stringify({
        html: "<!DOCTYPE html>\n<html>\n<body>\n    <h1>Belajar Variabel</h1>\n    <p>Lihat Console untuk hasilnya.</p>\n</body>\n</html>",
        css: "/* Tidak ada CSS tambahan */\n",
        javascript: "/* \n Buatlah sebuah variabel dengan nama 'playerName' menggunakan let, \n dan isi nilainya dengan string \"Andi\".\n Lalu, buat konstanta 'level' menggunakan const dengan nilai 1.\n*/\n"
      }),
      content: {
        language: "javascript",
        sandboxEnabled: true,
        sandboxLevel: "html_css_js",
        starterCode: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <h1>Belajar Variabel</h1>\n    <p>Lihat Console untuk hasilnya.</p>\n</body>\n</html>",
          css: "/* Tidak ada CSS tambahan */\n",
          javascript: "/* \n Buatlah sebuah variabel dengan nama 'playerName' menggunakan let, \n dan isi nilainya dengan string \"Andi\".\n Lalu, buat konstanta 'level' menggunakan const dengan nilai 1.\n*/\n"
        }),
        correctAnswer: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <h1>Belajar Variabel</h1>\n    <p>Lihat Console untuk hasilnya.</p>\n</body>\n</html>",
          css: "/* Tidak ada CSS tambahan */\n",
          javascript: "/* \n Buatlah sebuah variabel dengan nama 'playerName' menggunakan let, \n dan isi nilainya dengan string \"Andi\".\n Lalu, buat konstanta 'level' menggunakan const dengan nilai 1.\n*/\nlet playerName = \"Andi\";\nconst level = 1;"
        })
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput: JSON.stringify({
            html: "<!DOCTYPE html>\n<html>\n<body>\n    <h1>Belajar Variabel</h1>\n    <p>Lihat Console untuk hasilnya.</p>\n</body>\n</html>",
            css: "/* Tidak ada CSS tambahan */\n",
            javascript: "/* \n Buatlah sebuah variabel dengan nama 'playerName' menggunakan let, \n dan isi nilainya dengan string \"Andi\".\n Lalu, buat konstanta 'level' menggunakan const dengan nilai 1.\n*/\nlet playerName = \"Andi\";\nconst level = 1;"
          })
        }
      ]
    },
    {
      levelId: 3,
      title: "Pengkondisian Umur",
      description: "Lengkapi kondisi if-else untuk mengecek apakah seseorang cukup umur membuat SIM.",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 120,
      xpBase: 10,
      hint: "Gunakan if (umur >= 17) { ... } else { ... }",
      isActive: true,
      starterCode: JSON.stringify({
        html: "<!DOCTYPE html>\n<html>\n<body>\n    <h1>Pengecekan Umur</h1>\n    <p>Buka console untuk melihat hasil.</p>\n</body>\n</html>",
        css: "/* Tidak ada CSS tambahan */\n",
        javascript: "let umur = 15;\n/* \n Buat kondisi if-else. \n Jika umur >= 17, console.log(\"Bisa membuat SIM\");\n Jika tidak (else), console.log(\"Belum cukup umur\");\n*/\n"
      }),
      content: {
        language: "javascript",
        sandboxEnabled: true,
        sandboxLevel: "html_css_js",
        starterCode: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <h1>Pengecekan Umur</h1>\n    <p>Buka console untuk melihat hasil.</p>\n</body>\n</html>",
          css: "/* Tidak ada CSS tambahan */\n",
          javascript: "let umur = 15;\n/* \n Buat kondisi if-else. \n Jika umur >= 17, console.log(\"Bisa membuat SIM\");\n Jika tidak (else), console.log(\"Belum cukup umur\");\n*/\n"
        }),
        correctAnswer: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <h1>Pengecekan Umur</h1>\n    <p>Buka console untuk melihat hasil.</p>\n</body>\n</html>",
          css: "/* Tidak ada CSS tambahan */\n",
          javascript: "let umur = 15;\n/* \n Buat kondisi if-else. \n Jika umur >= 17, console.log(\"Bisa membuat SIM\");\n Jika tidak (else), console.log(\"Belum cukup umur\");\n*/\nif (umur >= 17) {\n  console.log(\"Bisa membuat SIM\");\n} else {\n  console.log(\"Belum cukup umur\");\n}"
        })
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput: JSON.stringify({
            html: "<!DOCTYPE html>\n<html>\n<body>\n    <h1>Pengecekan Umur</h1>\n    <p>Buka console untuk melihat hasil.</p>\n</body>\n</html>",
            css: "/* Tidak ada CSS tambahan */\n",
            javascript: "let umur = 15;\n/* \n Buat kondisi if-else. \n Jika umur >= 17, console.log(\"Bisa membuat SIM\");\n Jika tidak (else), console.log(\"Belum cukup umur\");\n*/\nif (umur >= 17) {\n  console.log(\"Bisa membuat SIM\");\n} else {\n  console.log(\"Belum cukup umur\");\n}"
          })
        }
      ]
    },
    {
      levelId: 3,
      title: "Menyusun Looping For",
      description: "Susun blok kode berikut agar membentuk perulangan 'for' yang menghitung dari 1 sampai 5.",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.DRAG_AND_DROP,
      idealTime: 90,
      xpBase: 10,
      hint: "Strukturnya adalah: for(...) { ... }",
      isActive: true,
      content: {
        language: "javascript",
        sandboxEnabled: true,
        sandboxLevel: "html_css_js",
        blocks: [
          "}",
          "for (let i = 1; i <= 5; i++) {",
          "  console.log(\"Angka: \" + i);"
        ],
        expectedOrder: [
          "for (let i = 1; i <= 5; i++) {",
          "  console.log(\"Angka: \" + i);",
          "}"
        ]
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput: "for (let i = 1; i <= 5; i++) {\n  console.log(\"Angka: \" + i);\n}"
        }
      ]
    },
    {
      levelId: 3,
      title: "Typo Array Push",
      description: "Kode berikut bertujuan menambahkan item ke dalam array, tapi method-nya salah ketik. Perbaiki menjadi method yang benar.",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.FIX_THE_BUG,
      idealTime: 60,
      xpBase: 10,
      hint: "Method untuk menambah ke array adalah push()",
      isActive: true,
      content: {
        language: "javascript",
        sandboxEnabled: true,
        sandboxLevel: "html_css_js",
        buggyCode: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <h1>Array Push</h1>\n</body>\n</html>",
          css: "/* CSS kosong */\n",
          javascript: "/* Perbaiki penulisan method push di bawah ini */\nlet buah = [\"Apel\", \"Mangga\"];\nbuah.psuh(\"Jeruk\");\nconsole.log(buah);"
        }),
        correctAnswer: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <h1>Array Push</h1>\n</body>\n</html>",
          css: "/* CSS kosong */\n",
          javascript: "/* Perbaiki penulisan method push di bawah ini */\nlet buah = [\"Apel\", \"Mangga\"];\nbuah.push(\"Jeruk\");\nconsole.log(buah);"
        })
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput: JSON.stringify({
            html: "<!DOCTYPE html>\n<html>\n<body>\n    <h1>Array Push</h1>\n</body>\n</html>",
            css: "/* CSS kosong */\n",
            javascript: "/* Perbaiki penulisan method push di bawah ini */\nlet buah = [\"Apel\", \"Mangga\"];\nbuah.push(\"Jeruk\");\nconsole.log(buah);"
          })
        }
      ]
    },
    {
      levelId: 3,
      title: "Fungsi Perkalian",
      description: "Buatlah sebuah function bernama 'kali' yang menerima 2 parameter (a dan b), lalu mengembalikan (return) hasil a dikali b.",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 120,
      xpBase: 10,
      hint: "Gunakan kata kunci function, berikan nama kali, dan gunakan return a * b;",
      isActive: true,
      starterCode: JSON.stringify({
        html: "<!DOCTYPE html>\n<html>\n<body>\n    <h1>Function Perkalian</h1>\n</body>\n</html>",
        css: "/* CSS kosong */\n",
        javascript: "/*\n Buat sebuah function bernama 'kali' yang menerima 2 parameter (a dan b).\n Function ini harus mengembalikan (return) hasil a dikali b.\n*/\n"
      }),
      content: {
        language: "javascript",
        sandboxEnabled: true,
        sandboxLevel: "html_css_js",
        starterCode: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <h1>Function Perkalian</h1>\n</body>\n</html>",
          css: "/* CSS kosong */\n",
          javascript: "/*\n Buat sebuah function bernama 'kali' yang menerima 2 parameter (a dan b).\n Function ini harus mengembalikan (return) hasil a dikali b.\n*/\n"
        }),
        correctAnswer: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <h1>Function Perkalian</h1>\n</body>\n</html>",
          css: "/* CSS kosong */\n",
          javascript: "/*\n Buat sebuah function bernama 'kali' yang menerima 2 parameter (a dan b).\n Function ini harus mengembalikan (return) hasil a dikali b.\n*/\nfunction kali(a, b) {\n  return a * b;\n}"
        })
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput: JSON.stringify({
            html: "<!DOCTYPE html>\n<html>\n<body>\n    <h1>Function Perkalian</h1>\n</body>\n</html>",
            css: "/* CSS kosong */\n",
            javascript: "/*\n Buat sebuah function bernama 'kali' yang menerima 2 parameter (a dan b).\n Function ini harus mengembalikan (return) hasil a dikali b.\n*/\nfunction kali(a, b) {\n  return a * b;\n}"
          })
        }
      ]
    },

    // --- MEDIUM ---
    {
      levelId: 3,
      title: "Membuat Object Sederhana",
      description: "Buat object bernama 'user' dengan properti nama, umur, dan role.",
      difficulty: Difficulty.MEDIUM,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 120,
      xpBase: 20,
      hint: "Gunakan tanda kurung kurawal {} dan pisahkan dengan koma.",
      isActive: true,
      starterCode: JSON.stringify({
        html: "<!DOCTYPE html>\n<html>\n<body>\n    <h1>Belajar Object</h1>\n</body>\n</html>",
        css: "",
        javascript: "/*\n Buat object bernama 'user' dengan properti:\n - nama (isi dengan \"Budi\")\n - umur (isi dengan 20)\n - role (isi dengan \"Admin\")\n*/\n"
      }),
      content: {
        language: "javascript",
        sandboxEnabled: true,
        sandboxLevel: "html_css_js",
        starterCode: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <h1>Belajar Object</h1>\n</body>\n</html>",
          css: "",
          javascript: "/*\n Buat object bernama 'user' dengan properti:\n - nama (isi dengan \"Budi\")\n - umur (isi dengan 20)\n - role (isi dengan \"Admin\")\n*/\n"
        }),
        correctAnswer: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <h1>Belajar Object</h1>\n</body>\n</html>",
          css: "",
          javascript: "/*\n Buat object bernama 'user' dengan properti:\n - nama (isi dengan \"Budi\")\n - umur (isi dengan 20)\n - role (isi dengan \"Admin\")\n*/\nlet user = {\n  nama: \"Budi\",\n  umur: 20,\n  role: \"Admin\"\n};"
        })
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput: JSON.stringify({
            html: "<!DOCTYPE html>\n<html>\n<body>\n    <h1>Belajar Object</h1>\n</body>\n</html>",
            css: "",
            javascript: "/*\n Buat object bernama 'user' dengan properti:\n - nama (isi dengan \"Budi\")\n - umur (isi dengan 20)\n - role (isi dengan \"Admin\")\n*/\nlet user = {\n  nama: \"Budi\",\n  umur: 20,\n  role: \"Admin\"\n};"
          })
        }
      ]
    },
    {
      levelId: 3,
      title: "Manipulasi DOM InnerText",
      description: "Ambil elemen dengan id 'judul' lalu ubah teksnya menggunakan JavaScript.",
      difficulty: Difficulty.MEDIUM,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 120,
      xpBase: 20,
      hint: "Gunakan document.getElementById() dan property .innerText",
      isActive: true,
      starterCode: JSON.stringify({
        html: "<!DOCTYPE html>\n<html>\n<body>\n    <h1 id=\"judul\">Teks Lama</h1>\n</body>\n</html>",
        css: "",
        javascript: "/*\n Ambil elemen dengan id 'judul' menggunakan document.getElementById().\n Lalu ubah innerText-nya menjadi \"Belajar DOM JavaScript\".\n*/\n"
      }),
      content: {
        language: "javascript",
        sandboxEnabled: true,
        sandboxLevel: "html_css_js",
        starterCode: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <h1 id=\"judul\">Teks Lama</h1>\n</body>\n</html>",
          css: "",
          javascript: "/*\n Ambil elemen dengan id 'judul' menggunakan document.getElementById().\n Lalu ubah innerText-nya menjadi \"Belajar DOM JavaScript\".\n*/\n"
        }),
        correctAnswer: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <h1 id=\"judul\">Teks Lama</h1>\n</body>\n</html>",
          css: "",
          javascript: "/*\n Ambil elemen dengan id 'judul' menggunakan document.getElementById().\n Lalu ubah innerText-nya menjadi \"Belajar DOM JavaScript\".\n*/\ndocument.getElementById(\"judul\").innerText = \"Belajar DOM JavaScript\";"
        })
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput: JSON.stringify({
            html: "<!DOCTYPE html>\n<html>\n<body>\n    <h1 id=\"judul\">Teks Lama</h1>\n</body>\n</html>",
            css: "",
            javascript: "/*\n Ambil elemen dengan id 'judul' menggunakan document.getElementById().\n Lalu ubah innerText-nya menjadi \"Belajar DOM JavaScript\".\n*/\ndocument.getElementById(\"judul\").innerText = \"Belajar DOM JavaScript\";"
          })
        }
      ]
    },
    {
      levelId: 3,
      title: "Event Listener Typo",
      description: "Terdapat kesalahan penulisan (typo) pada event listener di bawah. Perbaiki agar fungsi click berjalan.",
      difficulty: Difficulty.MEDIUM,
      method: ChallengeMethod.FIX_THE_BUG,
      idealTime: 90,
      xpBase: 20,
      hint: "Method yang benar menggunakan 'L' besar: addEventListener",
      isActive: true,
      content: {
        language: "javascript",
        sandboxEnabled: true,
        sandboxLevel: "html_css_js",
        buggyCode: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <button id=\"tombol\">Klik Saya</button>\n</body>\n</html>",
          css: "",
          javascript: "/* Terdapat kesalahan penulisan (typo) pada metode addEventListener */\nconst btn = document.getElementById(\"tombol\");\n\nbtn.addEventlistener(\"click\", function() {\n  console.log(\"Tombol ditekan\");\n});"
        }),
        correctAnswer: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <button id=\"tombol\">Klik Saya</button>\n</body>\n</html>",
          css: "",
          javascript: "/* Terdapat kesalahan penulisan (typo) pada metode addEventListener */\nconst btn = document.getElementById(\"tombol\");\n\nbtn.addEventListener(\"click\", function() {\n  console.log(\"Tombol ditekan\");\n});"
        })
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput: JSON.stringify({
            html: "<!DOCTYPE html>\n<html>\n<body>\n    <button id=\"tombol\">Klik Saya</button>\n</body>\n</html>",
            css: "",
            javascript: "/* Terdapat kesalahan penulisan (typo) pada metode addEventListener */\nconst btn = document.getElementById(\"tombol\");\n\nbtn.addEventListener(\"click\", function() {\n  console.log(\"Tombol ditekan\");\n});"
          })
        }
      ]
    },
    {
      levelId: 3,
      title: "Filter Array Sederhana",
      description: "Susun kode berikut agar menggunakan method array filter() dengan benar untuk mengambil nilai >= 75.",
      difficulty: Difficulty.MEDIUM,
      method: ChallengeMethod.DRAG_AND_DROP,
      idealTime: 100,
      xpBase: 20,
      hint: "Mulai dari inisialisasi filter, lalu kondisinya, dan penutup.",
      isActive: true,
      content: {
        language: "javascript",
        sandboxEnabled: true,
        sandboxLevel: "html_css_js",
        blocks: [
          "  return n >= 75;",
          "const lulus = nilai.filter(function(n) {",
          "});",
          "const nilai = [60, 75, 80, 90, 50];"
        ],
        expectedOrder: [
          "const nilai = [60, 75, 80, 90, 50];",
          "const lulus = nilai.filter(function(n) {",
          "  return n >= 75;",
          "});"
        ]
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput: "const nilai = [60, 75, 80, 90, 50];\nconst lulus = nilai.filter(function(n) {\n  return n >= 75;\n});"
        }
      ]
    },
    {
      levelId: 3,
      title: "Mencegah Default Form",
      description: "Setiap form HTML memiliki sifat bawaan me-refresh halaman ketika tombol submit diklik. Hentikan sifat bawaan ini.",
      difficulty: Difficulty.MEDIUM,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 120,
      xpBase: 20,
      hint: "Gunakan method event.preventDefault(); di dalam function callback.",
      isActive: true,
      starterCode: JSON.stringify({
        html: "<!DOCTYPE html>\n<html>\n<body>\n    <form id=\"loginForm\">\n        <button type=\"submit\">Kirim</button>\n    </form>\n</body>\n</html>",
        css: "",
        javascript: "const form = document.getElementById(\"loginForm\");\n\nform.addEventListener(\"submit\", function(event) {\n  /*\n   Cegah form agar tidak melakukan refresh halaman secara otomatis \n   saat di-submit. \n  */\n  \n  // Ketikkan event.preventDefault(); pada baris di bawah ini:\n  \n});"
      }),
      content: {
        language: "javascript",
        sandboxEnabled: true,
        sandboxLevel: "html_css_js",
        starterCode: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <form id=\"loginForm\">\n        <button type=\"submit\">Kirim</button>\n    </form>\n</body>\n</html>",
          css: "",
          javascript: "const form = document.getElementById(\"loginForm\");\n\nform.addEventListener(\"submit\", function(event) {\n  /*\n   Cegah form agar tidak melakukan refresh halaman secara otomatis \n   saat di-submit. \n  */\n  \n  // Ketikkan event.preventDefault(); pada baris di bawah ini:\n  \n});"
        }),
        correctAnswer: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <form id=\"loginForm\">\n        <button type=\"submit\">Kirim</button>\n    </form>\n</body>\n</html>",
          css: "",
          javascript: "const form = document.getElementById(\"loginForm\");\n\nform.addEventListener(\"submit\", function(event) {\n  /*\n   Cegah form agar tidak melakukan refresh halaman secara otomatis \n   saat di-submit. (Gunakan event.preventDefault())\n  */\n  event.preventDefault();\n});"
        })
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput: JSON.stringify({
            html: "<!DOCTYPE html>\n<html>\n<body>\n    <form id=\"loginForm\">\n        <button type=\"submit\">Kirim</button>\n    </form>\n</body>\n</html>",
            css: "",
            javascript: "const form = document.getElementById(\"loginForm\");\n\nform.addEventListener(\"submit\", function(event) {\n  /*\n   Cegah form agar tidak melakukan refresh halaman secara otomatis \n   saat di-submit. (Gunakan event.preventDefault())\n  */\n  event.preventDefault();\n});"
          })
        }
      ]
    },

    // --- HARD ---
    {
      levelId: 3,
      title: "Menambah Elemen DOM Baru",
      description: "Buat elemen <li> baru menggunakan JavaScript, dan tambahkan ke dalam ul yang sudah ada.",
      difficulty: Difficulty.HARD,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 240,
      xpBase: 30,
      hint: "Gunakan document.createElement(), atur innerText, dan gunakan appendChild() ke ul.",
      isActive: true,
      starterCode: JSON.stringify({
        html: "<!DOCTYPE html>\n<html>\n<body>\n    <ul id=\"daftar-tugas\">\n        <li>Tugas 1</li>\n    </ul>\n</body>\n</html>",
        css: "",
        javascript: "/*\n 1. Buat elemen <li> baru menggunakan document.createElement().\n 2. Isi text elemen tersebut dengan \"Tugas 2\".\n 3. Masukkan elemen baru tersebut ke dalam <ul id=\"daftar-tugas\"> \n    menggunakan appendChild().\n*/\n\n// 1. const liBaru = document.createElement(\"...\");\n\n// 2. liBaru.innerText = \"...\";\n\n// 3. Ambil elemen ul dengan document.getElementById, lalu gunakan .appendChild(liBaru);\n"
      }),
      content: {
        language: "javascript",
        sandboxEnabled: true,
        sandboxLevel: "html_css_js",
        starterCode: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <ul id=\"daftar-tugas\">\n        <li>Tugas 1</li>\n    </ul>\n</body>\n</html>",
          css: "",
          javascript: "/*\n 1. Buat elemen <li> baru menggunakan document.createElement().\n 2. Isi text elemen tersebut dengan \"Tugas 2\".\n 3. Masukkan elemen baru tersebut ke dalam <ul id=\"daftar-tugas\"> \n    menggunakan appendChild().\n*/\n\n// 1. const liBaru = document.createElement(\"...\");\n\n// 2. liBaru.innerText = \"...\";\n\n// 3. Ambil elemen ul dengan document.getElementById, lalu gunakan .appendChild(liBaru);\n"
        }),
        correctAnswer: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <ul id=\"daftar-tugas\">\n        <li>Tugas 1</li>\n    </ul>\n</body>\n</html>",
          css: "",
          javascript: "/*\n 1. Buat elemen <li> baru menggunakan document.createElement().\n 2. Isi text elemen tersebut dengan \"Tugas 2\".\n 3. Masukkan elemen baru tersebut ke dalam <ul id=\"daftar-tugas\"> \n    menggunakan appendChild().\n*/\nconst liBaru = document.createElement(\"li\");\nliBaru.innerText = \"Tugas 2\";\ndocument.getElementById(\"daftar-tugas\").appendChild(liBaru);"
        })
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput: JSON.stringify({
            html: "<!DOCTYPE html>\n<html>\n<body>\n    <ul id=\"daftar-tugas\">\n        <li>Tugas 1</li>\n    </ul>\n</body>\n</html>",
            css: "",
            javascript: "/*\n 1. Buat elemen <li> baru menggunakan document.createElement().\n 2. Isi text elemen tersebut dengan \"Tugas 2\".\n 3. Masukkan elemen baru tersebut ke dalam <ul id=\"daftar-tugas\"> \n    menggunakan appendChild().\n*/\nconst liBaru = document.createElement(\"li\");\nliBaru.innerText = \"Tugas 2\";\ndocument.getElementById(\"daftar-tugas\").appendChild(liBaru);"
          })
        }
      ]
    },
    {
      levelId: 3,
      title: "Toggle Fitur Dark Mode",
      description: "Gunakan classList.toggle untuk menambahkan dan menghapus class 'dark' pada elemen body saat tombol diklik.",
      difficulty: Difficulty.HARD,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 240,
      xpBase: 30,
      hint: "Gunakan addEventListener('click', function(){}) lalu panggil document.body.classList.toggle('dark');",
      isActive: true,
      starterCode: JSON.stringify({
        html: "<!DOCTYPE html>\n<html>\n<body>\n    <button id=\"toggleBtn\">Ubah Tema</button>\n</body>\n</html>",
        css: ".dark {\n  background-color: black;\n  color: white;\n}\n",
        javascript: "const btn = document.getElementById(\"toggleBtn\");\n\n/*\n Tambahkan event listener 'click' pada 'btn'.\n Di dalamnya, gunakan document.body.classList.toggle('dark') \n untuk memanipulasi class CSS.\n*/\n"
      }),
      content: {
        language: "javascript",
        sandboxEnabled: true,
        sandboxLevel: "html_css_js",
        starterCode: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <button id=\"toggleBtn\">Ubah Tema</button>\n</body>\n</html>",
          css: ".dark {\n  background-color: black;\n  color: white;\n}\n",
          javascript: "const btn = document.getElementById(\"toggleBtn\");\n\n/*\n Tambahkan event listener 'click' pada 'btn'.\n Di dalamnya, gunakan document.body.classList.toggle('dark') \n untuk memanipulasi class CSS.\n*/\n"
        }),
        correctAnswer: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <button id=\"toggleBtn\">Ubah Tema</button>\n</body>\n</html>",
          css: ".dark {\n  background-color: black;\n  color: white;\n}\n",
          javascript: "const btn = document.getElementById(\"toggleBtn\");\n\n/*\n Tambahkan event listener 'click' pada 'btn'.\n Di dalamnya, gunakan document.body.classList.toggle('dark') \n untuk memanipulasi class CSS.\n*/\nbtn.addEventListener(\"click\", function() {\n  document.body.classList.toggle(\"dark\");\n});"
        })
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput: JSON.stringify({
            html: "<!DOCTYPE html>\n<html>\n<body>\n    <button id=\"toggleBtn\">Ubah Tema</button>\n</body>\n</html>",
            css: ".dark {\n  background-color: black;\n  color: white;\n}\n",
            javascript: "const btn = document.getElementById(\"toggleBtn\");\n\n/*\n Tambahkan event listener 'click' pada 'btn'.\n Di dalamnya, gunakan document.body.classList.toggle('dark') \n untuk memanipulasi class CSS.\n*/\nbtn.addEventListener(\"click\", function() {\n  document.body.classList.toggle(\"dark\");\n});"
          })
        }
      ]
    },
    {
      levelId: 3,
      title: "Menyusun Async Fetch API",
      description: "Susun baris kode berikut agar membentuk satu fungsi asinkron (async/await) yang men-download dan mengubah data JSON dengan benar.",
      difficulty: Difficulty.HARD,
      method: ChallengeMethod.DRAG_AND_DROP,
      idealTime: 200,
      xpBase: 30,
      hint: "Susun async function, fetch(), lalu .json()",
      isActive: true,
      content: {
        language: "javascript",
        sandboxEnabled: true,
        sandboxLevel: "html_css_js",
        blocks: [
          "  const response = await fetch(\"https://api.example.com/data\");",
          "  console.log(data);",
          "}",
          "  const data = await response.json();",
          "async function ambilData() {"
        ],
        expectedOrder: [
          "async function ambilData() {",
          "  const response = await fetch(\"https://api.example.com/data\");",
          "  const data = await response.json();",
          "  console.log(data);",
          "}"
        ]
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput: "async function ambilData() {\n  const response = await fetch(\"https://api.example.com/data\");\n  const data = await response.json();\n  console.log(data);\n}"
        }
      ]
    }
  ];

  for (const c of javascriptChallenges) {
    const existing = await prisma.challenge.findFirst({
      where: { levelId: c.levelId, title: c.title },
    });
    
    // Validasi & strip out unused fields agar tidak error di Prisma
    const challengeData = { ...c, content: c.content as any, testCases: c.testCases as any };
    
    if (existing) {
      await prisma.challenge.update({ where: { id: existing.id }, data: challengeData });
    } else {
      await prisma.challenge.create({ data: challengeData });
    }
  }
  
  // Clean up unused challenges
  const activeTitles = javascriptChallenges.map(c => c.title);
  await prisma.challenge.deleteMany({
    where: {
      levelId: 3,
      title: { notIn: activeTitles }
    }
  });

  console.log("✅ Challenge Level 3 JavaScript seeding completed!");
}
