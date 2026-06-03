import { PrismaClient, Difficulty, ChallengeMethod } from "@prisma/client";

export async function seedLevel2Challenge(prisma: PrismaClient) {
  console.log("🌱 Seeding Challenge Level 2: CSS Styling...");

  const cssChallenges = [
    // --- EASY ---
    {
      levelId: 2,
      title: "Warna Teks dengan Element Selector",
      description: "Gunakan Element Selector untuk mengubah warna seluruh teks paragraf (<p>) menjadi 'blue'.",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 120,
      xpBase: 10,
      hint: "Gunakan selector p { ... } dan properti color",
      isActive: true,
      starterCode: JSON.stringify({
        html: "<!DOCTYPE html>\n<html>\n<body>\n    <!-- Tulis HTML di sini -->\n    <p>Ini adalah paragraf pertama.</p>\n    <p>Ini adalah paragraf kedua.</p>\n</body>\n</html>",
        css: "/* Tambahkan CSS untuk p di bawah ini */\n"
      }),
      content: {
        language: "css",
        sandboxEnabled: true,
        sandboxLevel: "html_css_js",
        starterCode: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <!-- Tulis HTML di sini -->\n    <p>Ini adalah paragraf pertama.</p>\n    <p>Ini adalah paragraf kedua.</p>\n</body>\n</html>",
          css: "/* Tambahkan CSS untuk p di bawah ini */\n"
        }),
        correctAnswer: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <!-- Tulis HTML di sini -->\n    <p>Ini adalah paragraf pertama.</p>\n    <p>Ini adalah paragraf kedua.</p>\n</body>\n</html>",
          css: "/* Tambahkan CSS untuk p di bawah ini */\np {\n  color: blue;\n}"
        })
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput: JSON.stringify({
            html: "<!DOCTYPE html>\n<html>\n<body>\n    <!-- Tulis HTML di sini -->\n    <p>Ini adalah paragraf pertama.</p>\n    <p>Ini adalah paragraf kedua.</p>\n</body>\n</html>",
            css: "/* Tambahkan CSS untuk p di bawah ini */\np {\n  color: blue;\n}"
          })
        }
      ]
    },
    {
      levelId: 2,
      title: "Menggunakan Class Selector",
      description: "Gunakan Class Selector (.highlight) untuk memberi latar belakang (background-color) berwarna 'yellow' pada teks yang memiliki class tersebut.",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 120,
      xpBase: 10,
      hint: "Gunakan selector .highlight { ... }",
      isActive: true,
      starterCode: JSON.stringify({
        html: "<!DOCTYPE html>\n<html>\n<body>\n    <p>Teks biasa.</p>\n    <p class=\"highlight\">Teks ini harus berlatar kuning.</p>\n</body>\n</html>",
        css: "/* Tambahkan CSS untuk class highlight di bawah ini */\n"
      }),
      content: {
        language: "css",
        sandboxEnabled: true,
        sandboxLevel: "html_css_js",
        starterCode: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <p>Teks biasa.</p>\n    <p class=\"highlight\">Teks ini harus berlatar kuning.</p>\n</body>\n</html>",
          css: "/* Tambahkan CSS untuk class highlight di bawah ini */\n"
        }),
        correctAnswer: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <p>Teks biasa.</p>\n    <p class=\"highlight\">Teks ini harus berlatar kuning.</p>\n</body>\n</html>",
          css: "/* Tambahkan CSS untuk class highlight di bawah ini */\n.highlight {\n  background-color: yellow;\n}"
        })
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput: JSON.stringify({
            html: "<!DOCTYPE html>\n<html>\n<body>\n    <p>Teks biasa.</p>\n    <p class=\"highlight\">Teks ini harus berlatar kuning.</p>\n</body>\n</html>",
            css: "/* Tambahkan CSS untuk class highlight di bawah ini */\n.highlight {\n  background-color: yellow;\n}"
          })
        }
      ]
    },
    {
      levelId: 2,
      title: "Menggunakan ID Selector",
      description: "Gunakan ID Selector (#header-utama) untuk menebalkan teks dengan properti font-weight bernilai 'bold'.",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 120,
      xpBase: 10,
      hint: "Gunakan selector #header-utama { ... }",
      isActive: true,
      starterCode: JSON.stringify({
        html: "<!DOCTYPE html>\n<html>\n<body>\n    <p id=\"header-utama\">Ini adalah Judul Utama</p>\n    <p>Ini adalah teks biasa.</p>\n</body>\n</html>",
        css: "/* Tambahkan CSS untuk id header-utama di bawah ini */\n"
      }),
      content: {
        language: "css",
        sandboxEnabled: true,
        sandboxLevel: "html_css_js",
        starterCode: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <p id=\"header-utama\">Ini adalah Judul Utama</p>\n    <p>Ini adalah teks biasa.</p>\n</body>\n</html>",
          css: "/* Tambahkan CSS untuk id header-utama di bawah ini */\n"
        }),
        correctAnswer: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <p id=\"header-utama\">Ini adalah Judul Utama</p>\n    <p>Ini adalah teks biasa.</p>\n</body>\n</html>",
          css: "/* Tambahkan CSS untuk id header-utama di bawah ini */\n#header-utama {\n  font-weight: bold;\n}"
        })
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput: JSON.stringify({
            html: "<!DOCTYPE html>\n<html>\n<body>\n    <p id=\"header-utama\">Ini adalah Judul Utama</p>\n    <p>Ini adalah teks biasa.</p>\n</body>\n</html>",
            css: "/* Tambahkan CSS untuk id header-utama di bawah ini */\n#header-utama {\n  font-weight: bold;\n}"
          })
        }
      ]
    },
    {
      levelId: 2,
      title: "Memperbaiki Syntax CSS",
      description: "Kode CSS di bawah ini memiliki bug karena kehilangan tanda titik koma (;) pada akhir properti. Perbaiki sintaksnya agar berjalan benar.",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.FIX_THE_BUG,
      idealTime: 90,
      xpBase: 10,
      hint: "Tambahkan titik koma (;) setelah kata red",
      isActive: true,
      starterCode: JSON.stringify({
        html: "<!DOCTYPE html>\n<html>\n<body>\n    <h1>Teks Merah di Tengah</h1>\n</body>\n</html>",
        css: "/* Perbaiki bug di bawah ini */\nh1 {\n  color: red\n  text-align: center;\n}"
      }),
      content: {
        language: "css",
        sandboxEnabled: true,
        sandboxLevel: "html_css_js",
        buggyCode: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <h1>Teks Merah di Tengah</h1>\n</body>\n</html>",
          css: "/* Perbaiki bug di bawah ini */\nh1 {\n  color: red\n  text-align: center;\n}"
        }),
        correctAnswer: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <h1>Teks Merah di Tengah</h1>\n</body>\n</html>",
          css: "/* Perbaiki bug di bawah ini */\nh1 {\n  color: red;\n  text-align: center;\n}"
        })
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput: JSON.stringify({
            html: "<!DOCTYPE html>\n<html>\n<body>\n    <h1>Teks Merah di Tengah</h1>\n</body>\n</html>",
            css: "/* Perbaiki bug di bawah ini */\nh1 {\n  color: red;\n  text-align: center;\n}"
          })
        }
      ]
    },
    {
      levelId: 2,
      title: "Menyusun Box Model",
      description: "Susun blok CSS berikut agar membentuk kelas '.box' yang memiliki padding 10px, border 2px solid black, dan margin 20px.",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.DRAG_AND_DROP,
      idealTime: 120,
      xpBase: 10,
      hint: "Susun berurutan mulai dari pembuka kelas .box { hingga penutup }.",
      isActive: true,
      content: {
        language: "css",
        sandboxEnabled: true,
        sandboxLevel: "html_css_js",
        blocks: [
          "}",
          "  padding: 10px;",
          ".box {",
          "  border: 2px solid black;",
          "  margin: 20px;"
        ],
        expectedOrder: [
          ".box {",
          "  padding: 10px;",
          "  border: 2px solid black;",
          "  margin: 20px;",
          "}"
        ]
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput: ".box {\n  padding: 10px;\n  border: 2px solid black;\n  margin: 20px;\n}"
        }
      ]
    },
    {
      levelId: 2,
      title: "Tipografi Dasar",
      description: "Ubah font dari elemen dengan id 'judul' menjadi 'Arial', dan atur perataannya (text-align) ke 'center'.",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 120,
      xpBase: 10,
      hint: "Gunakan font-family dan text-align",
      isActive: true,
      starterCode: JSON.stringify({
        html: "<!DOCTYPE html>\n<html>\n<body>\n    <h2 id=\"judul\">Tipografi Web</h2>\n</body>\n</html>",
        css: "/* Tambahkan CSS di bawah ini */\n#judul {\n  \n}"
      }),
      content: {
        language: "css",
        sandboxEnabled: true,
        sandboxLevel: "html_css_js",
        starterCode: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <h2 id=\"judul\">Tipografi Web</h2>\n</body>\n</html>",
          css: "/* Tambahkan CSS di bawah ini */\n#judul {\n  \n}"
        }),
        correctAnswer: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <h2 id=\"judul\">Tipografi Web</h2>\n</body>\n</html>",
          css: "/* Tambahkan CSS di bawah ini */\n#judul {\n  font-family: Arial;\n  text-align: center;\n}"
        })
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput: JSON.stringify({
            html: "<!DOCTYPE html>\n<html>\n<body>\n    <h2 id=\"judul\">Tipografi Web</h2>\n</body>\n</html>",
            css: "/* Tambahkan CSS di bawah ini */\n#judul {\n  font-family: Arial;\n  text-align: center;\n}"
          })
        }
      ]
    },

    // --- MEDIUM ---
    {
      levelId: 2,
      title: "Mengatur Display",
      description: "Berikan properti display bernilai 'none' pada class .sembunyi untuk menyembunyikan teks, dan display bernilai 'inline-block' pada class .tombol.",
      difficulty: Difficulty.MEDIUM,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 150,
      xpBase: 20,
      hint: "Gunakan properti display",
      isActive: true,
      starterCode: JSON.stringify({
        html: "<!DOCTYPE html>\n<html>\n<body>\n    <div class=\"sembunyi\">Teks ini harus hilang</div>\n    <div class=\"tombol\">Tombol 1</div>\n    <div class=\"tombol\">Tombol 2</div>\n</body>\n</html>",
        css: "/* Tambahkan CSS di bawah ini */\n.sembunyi {\n  \n}\n.tombol {\n  \n  background-color: lightblue;\n  padding: 10px;\n}"
      }),
      content: {
        language: "css",
        sandboxEnabled: true,
        sandboxLevel: "html_css_js",
        starterCode: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <div class=\"sembunyi\">Teks ini harus hilang</div>\n    <div class=\"tombol\">Tombol 1</div>\n    <div class=\"tombol\">Tombol 2</div>\n</body>\n</html>",
          css: "/* Tambahkan CSS di bawah ini */\n.sembunyi {\n  \n}\n.tombol {\n  \n  background-color: lightblue;\n  padding: 10px;\n}"
        }),
        correctAnswer: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <div class=\"sembunyi\">Teks ini harus hilang</div>\n    <div class=\"tombol\">Tombol 1</div>\n    <div class=\"tombol\">Tombol 2</div>\n</body>\n</html>",
          css: "/* Tambahkan CSS di bawah ini */\n.sembunyi {\n  display: none;\n}\n.tombol {\n  display: inline-block;\n  background-color: lightblue;\n  padding: 10px;\n}"
        })
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput: JSON.stringify({
            html: "<!DOCTYPE html>\n<html>\n<body>\n    <div class=\"sembunyi\">Teks ini harus hilang</div>\n    <div class=\"tombol\">Tombol 1</div>\n    <div class=\"tombol\">Tombol 2</div>\n</body>\n</html>",
            css: "/* Tambahkan CSS di bawah ini */\n.sembunyi {\n  display: none;\n}\n.tombol {\n  display: inline-block;\n  background-color: lightblue;\n  padding: 10px;\n}"
          })
        }
      ]
    },
    {
      levelId: 2,
      title: "Posisi Absolut yang Salah",
      description: "Elemen child seharusnya berada di pojok kanan atas parent. Tambahkan properti top dan right yang bernilai 0 pada class .child.",
      difficulty: Difficulty.MEDIUM,
      method: ChallengeMethod.FIX_THE_BUG,
      idealTime: 120,
      xpBase: 20,
      hint: "Tambahkan top: 0; dan right: 0; pada class .child",
      isActive: true,
      starterCode: JSON.stringify({
        html: "<!DOCTYPE html>\n<html>\n<body>\n    <div class=\"parent\">\n        <div class=\"child\">Kanan Atas</div>\n    </div>\n</body>\n</html>",
        css: "/* Perbaiki posisi child di bawah ini */\n.parent {\n  position: relative;\n  width: 200px; height: 200px; background: #eee;\n}\n.child {\n  position: absolute;\n  background: red; color: white;\n}"
      }),
      content: {
        language: "css",
        sandboxEnabled: true,
        sandboxLevel: "html_css_js",
        buggyCode: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <div class=\"parent\">\n        <div class=\"child\">Kanan Atas</div>\n    </div>\n</body>\n</html>",
          css: "/* Perbaiki posisi child di bawah ini */\n.parent {\n  position: relative;\n  width: 200px; height: 200px; background: #eee;\n}\n.child {\n  position: absolute;\n  background: red; color: white;\n}"
        }),
        correctAnswer: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <div class=\"parent\">\n        <div class=\"child\">Kanan Atas</div>\n    </div>\n</body>\n</html>",
          css: "/* Perbaiki posisi child di bawah ini */\n.parent {\n  position: relative;\n  width: 200px; height: 200px; background: #eee;\n}\n.child {\n  position: absolute;\n  top: 0;\n  right: 0;\n  background: red; color: white;\n}"
        })
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput: JSON.stringify({
            html: "<!DOCTYPE html>\n<html>\n<body>\n    <div class=\"parent\">\n        <div class=\"child\">Kanan Atas</div>\n    </div>\n</body>\n</html>",
            css: "/* Perbaiki posisi child di bawah ini */\n.parent {\n  position: relative;\n  width: 200px; height: 200px; background: #eee;\n}\n.child {\n  position: absolute;\n  top: 0;\n  right: 0;\n  background: red; color: white;\n}"
          })
        }
      ]
    },
    {
      levelId: 2,
      title: "Membuat Flexbox Dasar",
      description: "Jadikan class .flex-container sebagai flexbox dengan menambahkan display: flex. Lalu atur properti justify-content ke 'space-between' agar elemen di dalamnya terbagi jaraknya.",
      difficulty: Difficulty.MEDIUM,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 180,
      xpBase: 20,
      hint: "Gunakan display: flex; dan justify-content: space-between;",
      isActive: true,
      starterCode: JSON.stringify({
        html: "<!DOCTYPE html>\n<html>\n<body>\n    <div class=\"flex-container\">\n        <div class=\"item\">Kiri</div>\n        <div class=\"item\">Tengah</div>\n        <div class=\"item\">Kanan</div>\n    </div>\n</body>\n</html>",
        css: "/* Tambahkan flexbox di bawah ini */\n.flex-container {\n  \n  background: lightgray;\n  padding: 10px;\n}\n.item {\n  background: teal; color: white; padding: 10px;\n}"
      }),
      content: {
        language: "css",
        sandboxEnabled: true,
        sandboxLevel: "html_css_js",
        starterCode: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <div class=\"flex-container\">\n        <div class=\"item\">Kiri</div>\n        <div class=\"item\">Tengah</div>\n        <div class=\"item\">Kanan</div>\n    </div>\n</body>\n</html>",
          css: "/* Tambahkan flexbox di bawah ini */\n.flex-container {\n  \n  background: lightgray;\n  padding: 10px;\n}\n.item {\n  background: teal; color: white; padding: 10px;\n}"
        }),
        correctAnswer: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <div class=\"flex-container\">\n        <div class=\"item\">Kiri</div>\n        <div class=\"item\">Tengah</div>\n        <div class=\"item\">Kanan</div>\n    </div>\n</body>\n</html>",
          css: "/* Tambahkan flexbox di bawah ini */\n.flex-container {\n  display: flex;\n  justify-content: space-between;\n  background: lightgray;\n  padding: 10px;\n}\n.item {\n  background: teal; color: white; padding: 10px;\n}"
        })
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput: JSON.stringify({
            html: "<!DOCTYPE html>\n<html>\n<body>\n    <div class=\"flex-container\">\n        <div class=\"item\">Kiri</div>\n        <div class=\"item\">Tengah</div>\n        <div class=\"item\">Kanan</div>\n    </div>\n</body>\n</html>",
            css: "/* Tambahkan flexbox di bawah ini */\n.flex-container {\n  display: flex;\n  justify-content: space-between;\n  background: lightgray;\n  padding: 10px;\n}\n.item {\n  background: teal; color: white; padding: 10px;\n}"
          })
        }
      ]
    },
    {
      levelId: 2,
      title: "Menyusun Grid Layout",
      description: "Susun baris CSS berikut agar membentuk container Grid yang memiliki 3 kolom sama besar (1fr) dan gap sebesar 20px.",
      difficulty: Difficulty.MEDIUM,
      method: ChallengeMethod.DRAG_AND_DROP,
      idealTime: 120,
      xpBase: 20,
      hint: "Gunakan display: grid, grid-template-columns, lalu gap.",
      isActive: true,
      content: {
        language: "css",
        sandboxEnabled: true,
        sandboxLevel: "html_css_js",
        blocks: [
          "  display: grid;",
          ".grid-container {",
          "  gap: 20px;",
          "}",
          "  grid-template-columns: repeat(3, 1fr);"
        ],
        expectedOrder: [
          ".grid-container {",
          "  display: grid;",
          "  grid-template-columns: repeat(3, 1fr);",
          "  gap: 20px;",
          "}"
        ]
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput: ".grid-container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n}"
        }
      ]
    },
    {
      levelId: 2,
      title: "Menambahkan Efek Hover",
      description: "Gunakan pseudo-class :hover pada elemen '.tombol' agar background-color berubah menjadi 'darkblue' saat dilewati kursor mouse.",
      difficulty: Difficulty.MEDIUM,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 150,
      xpBase: 20,
      hint: "Gunakan .tombol:hover { ... }",
      isActive: true,
      starterCode: JSON.stringify({
        html: "<!DOCTYPE html>\n<html>\n<body>\n    <button class=\"tombol\">Arahkan Mouse</button>\n</body>\n</html>",
        css: "/* Tambahkan efek hover di bawah ini */\n.tombol {\n  background-color: blue;\n  color: white;\n  padding: 10px;\n}\n"
      }),
      content: {
        language: "css",
        sandboxEnabled: true,
        sandboxLevel: "html_css_js",
        starterCode: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <button class=\"tombol\">Arahkan Mouse</button>\n</body>\n</html>",
          css: "/* Tambahkan efek hover di bawah ini */\n.tombol {\n  background-color: blue;\n  color: white;\n  padding: 10px;\n}\n"
        }),
        correctAnswer: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <button class=\"tombol\">Arahkan Mouse</button>\n</body>\n</html>",
          css: "/* Tambahkan efek hover di bawah ini */\n.tombol {\n  background-color: blue;\n  color: white;\n  padding: 10px;\n}\n.tombol:hover {\n  background-color: darkblue;\n}"
        })
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput: JSON.stringify({
            html: "<!DOCTYPE html>\n<html>\n<body>\n    <button class=\"tombol\">Arahkan Mouse</button>\n</body>\n</html>",
            css: "/* Tambahkan efek hover di bawah ini */\n.tombol {\n  background-color: blue;\n  color: white;\n  padding: 10px;\n}\n.tombol:hover {\n  background-color: darkblue;\n}"
          })
        }
      ]
    },

    // --- HARD ---
    {
      levelId: 2,
      title: "Membuat Layout Card Lengkap",
      description: "Lengkapi CSS untuk kelas '.card' agar menjadi flex container dengan arah kolom (flex-direction: column), teks rata tengah (align-items: center), dan tambahkan padding sebesar 20px.",
      difficulty: Difficulty.HARD,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 240,
      xpBase: 30,
      hint: "Gunakan display: flex, flex-direction: column, align-items: center, dan padding: 20px.",
      isActive: true,
      starterCode: JSON.stringify({
        html: "<!DOCTYPE html>\n<html>\n<body>\n    <div class=\"card\">\n        <img src=\"avatar.png\" alt=\"Avatar\">\n        <h3>John Doe</h3>\n        <p>Web Developer</p>\n    </div>\n</body>\n</html>",
        css: "/* Lengkapi CSS card di bawah ini */\n.card {\n  border: 1px solid #ccc;\n  \n}"
      }),
      content: {
        language: "css",
        sandboxEnabled: true,
        sandboxLevel: "html_css_js",
        starterCode: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <div class=\"card\">\n        <img src=\"avatar.png\" alt=\"Avatar\">\n        <h3>John Doe</h3>\n        <p>Web Developer</p>\n    </div>\n</body>\n</html>",
          css: "/* Lengkapi CSS card di bawah ini */\n.card {\n  border: 1px solid #ccc;\n  \n}"
        }),
        correctAnswer: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <div class=\"card\">\n        <img src=\"avatar.png\" alt=\"Avatar\">\n        <h3>John Doe</h3>\n        <p>Web Developer</p>\n    </div>\n</body>\n</html>",
          css: "/* Lengkapi CSS card di bawah ini */\n.card {\n  border: 1px solid #ccc;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 20px;\n}"
        })
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput: JSON.stringify({
            html: "<!DOCTYPE html>\n<html>\n<body>\n    <div class=\"card\">\n        <img src=\"avatar.png\" alt=\"Avatar\">\n        <h3>John Doe</h3>\n        <p>Web Developer</p>\n    </div>\n</body>\n</html>",
            css: "/* Lengkapi CSS card di bawah ini */\n.card {\n  border: 1px solid #ccc;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 20px;\n}"
          })
        }
      ]
    },
    {
      levelId: 2,
      title: "Responsive Grid dengan Media Query",
      description: "Gunakan Media Query (@media) untuk membuat '.container' merespons layar kecil. Jika lebar layar maksimal 600px (max-width: 600px), ubah grid-template-columns dari kelas '.container' menjadi 1fr saja.",
      difficulty: Difficulty.HARD,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 240,
      xpBase: 30,
      hint: "Gunakan @media screen and (max-width: 600px) { .container { ... } }",
      isActive: true,
      starterCode: JSON.stringify({
        html: "<!DOCTYPE html>\n<html>\n<body>\n    <div class=\"container\">\n        <div>Box 1</div>\n        <div>Box 2</div>\n        <div>Box 3</div>\n    </div>\n</body>\n</html>",
        css: ".container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 15px;\n}\n/* Tambahkan Media Query di bawah ini */\n"
      }),
      content: {
        language: "css",
        sandboxEnabled: true,
        sandboxLevel: "html_css_js",
        starterCode: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <div class=\"container\">\n        <div>Box 1</div>\n        <div>Box 2</div>\n        <div>Box 3</div>\n    </div>\n</body>\n</html>",
          css: ".container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 15px;\n}\n/* Tambahkan Media Query di bawah ini */\n"
        }),
        correctAnswer: JSON.stringify({
          html: "<!DOCTYPE html>\n<html>\n<body>\n    <div class=\"container\">\n        <div>Box 1</div>\n        <div>Box 2</div>\n        <div>Box 3</div>\n    </div>\n</body>\n</html>",
          css: ".container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 15px;\n}\n/* Tambahkan Media Query di bawah ini */\n@media screen and (max-width: 600px) {\n  .container {\n    grid-template-columns: 1fr;\n  }\n}"
        })
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput: JSON.stringify({
            html: "<!DOCTYPE html>\n<html>\n<body>\n    <div class=\"container\">\n        <div>Box 1</div>\n        <div>Box 2</div>\n        <div>Box 3</div>\n    </div>\n</body>\n</html>",
            css: ".container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 15px;\n}\n/* Tambahkan Media Query di bawah ini */\n@media screen and (max-width: 600px) {\n  .container {\n    grid-template-columns: 1fr;\n  }\n}"
          })
        }
      ]
    },
    {
      levelId: 2,
      title: "Susun Animasi Transisi Button",
      description: "Susun blok CSS berikut untuk menambahkan transisi halus pada '.tombol' dan mengatur efek hover agar tombol membesar (transform: scale(1.1)) serta berubah warna (background-color: darkred).",
      difficulty: Difficulty.HARD,
      method: ChallengeMethod.DRAG_AND_DROP,
      idealTime: 180,
      xpBase: 30,
      hint: "Urutkan blok transition di dalam .tombol, lalu susun bagian :hover.",
      isActive: true,
      content: {
        language: "css",
        sandboxEnabled: true,
        sandboxLevel: "html_css_js",
        blocks: [
          "}",
          ".tombol { transition: 0.3s ease; }",
          "  background-color: darkred;",
          "  transform: scale(1.1);",
          ".tombol:hover {"
        ],
        expectedOrder: [
          ".tombol { transition: 0.3s ease; }",
          ".tombol:hover {",
          "  transform: scale(1.1);",
          "  background-color: darkred;",
          "}"
        ]
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput: ".tombol { transition: 0.3s ease; }\n.tombol:hover {\n  transform: scale(1.1);\n  background-color: darkred;\n}"
        }
      ]
    }
  ];

  for (const c of cssChallenges) {
    const existing = await prisma.challenge.findFirst({
      where: { levelId: c.levelId, title: c.title },
    });
    
    // We already do not have invalid fields at the root of the objects above.
    const challengeData = { ...c, content: c.content as any, testCases: c.testCases as any };
    
    if (existing) {
      await prisma.challenge.update({ where: { id: existing.id }, data: challengeData });
    } else {
      await prisma.challenge.create({ data: challengeData });
    }
  }
  
  // Clean up unused challenges
  const activeTitles = cssChallenges.map(c => c.title);
  await prisma.challenge.deleteMany({
    where: {
      levelId: 2,
      title: { notIn: activeTitles }
    }
  });

  console.log("✅ Challenge Level 2 CSS Styling seeding completed!");
}
