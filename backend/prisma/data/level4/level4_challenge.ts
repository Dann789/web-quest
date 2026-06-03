import { PrismaClient, Difficulty, ChallengeMethod } from "@prisma/client";

export async function seedLevel4Challenge(prisma: PrismaClient) {
  console.log("🌱 Seeding Challenge Level 4: PHP...");

  const challenges = [
    // ---------------------------------------------------------
    // EASY CHALLENGES (10 XP)
    // ---------------------------------------------------------
    {
      levelId: 4,
      title: "Variabel & Output",
      description: "Buatlah variabel bernama \`$nama\` yang berisi string \"Web-Quest\" dan cetak isinya menggunakan \`echo\`.",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 60,
      xpBase: 10,
      hint: "Gunakan tanda $ untuk variabel dan echo untuk mencetak.",
      isActive: true,
      testCases: [
        { 
          description: "Harus ada variabel $nama", 
          requirement: "$nama",
          weight: 100,
          isHidden: false,
          expectedOutput: JSON.stringify({
            php: "<?php\n/* Buat variabel $nama dan cetak dengan echo */\n$nama = \"Web-Quest\";\necho $nama;\n?>",
            php_process: "",
            php_connection: ""
          })
        }
      ],
      content: {
        language: "php",
        sandboxEnabled: true,
        sandboxLevel: "php_level",
        starterCode: JSON.stringify({
          php: "<?php\n/* Buat variabel $nama dan cetak dengan echo */\n\n?>",
          php_process: "",
          php_connection: ""
        }),
        correctAnswer: JSON.stringify({
          php: "<?php\n/* Buat variabel $nama dan cetak dengan echo */\n$nama = \"Web-Quest\";\necho $nama;\n?>",
          php_process: "",
          php_connection: ""
        })
      }
    },
    {
      levelId: 4,
      title: "Fix: Pengecekan Umur",
      description: "Kode berikut bertujuan mengecek apakah seseorang sudah cukup umur (17 tahun ke atas). Namun, terdapat kesalahan penulisan variabel dan operator. Perbaiki agar tidak error!",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.FIX_THE_BUG,
      idealTime: 60,
      xpBase: 10,
      hint: "Variabel di PHP harus diawali dengan tanda $. Operator perbandingan adalah >=, bukan =>.",
      isActive: true,
      testCases: [
        { 
          description: "Variabel harus diawali $", 
          requirement: "$umur",
          weight: 100,
          isHidden: false,
          expectedOutput: JSON.stringify({
            php: "<?php\n// Perbaiki deklarasi dan operator di bawah ini\n$umur = 18;\n\nif ($umur >= 17) {\n    echo \"Bisa membuat SIM\";\n} else {\n    echo \"Belum cukup umur\";\n}\n?>",
            php_process: "",
            php_connection: ""
          })
        }
      ],
      content: {
        language: "php",
        sandboxEnabled: true,
        sandboxLevel: "php_level",
        buggyCode: JSON.stringify({
          php: "<?php\n// Perbaiki deklarasi dan operator di bawah ini\numur = 18;\n\nif (umur => 17) {\n    echo \"Bisa membuat SIM\";\n} else {\n    echo \"Belum cukup umur\";\n}\n?>",
          php_process: "",
          php_connection: ""
        }),
        correctAnswer: JSON.stringify({
          php: "<?php\n// Perbaiki deklarasi dan operator di bawah ini\n$umur = 18;\n\nif ($umur >= 17) {\n    echo \"Bisa membuat SIM\";\n} else {\n    echo \"Belum cukup umur\";\n}\n?>",
          php_process: "",
          php_connection: ""
        })
      }
    },
    {
      levelId: 4,
      title: "Menyusun Looping Sederhana",
      description: "Susunlah baris kode berikut agar membentuk sebuah 'for loop' yang mencetak angka 1 sampai 3 berurutan ke bawah.",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.DRAG_AND_DROP,
      idealTime: 60,
      xpBase: 10,
      hint: "Inisialisasi $i = 1; lalu kondisi $i <= 3; dan increment $i++.",
      isActive: true,
      testCases: [],
      content: {
        language: "php",
        blocks: [
          "<?php",
          "for ($i = 1; $i <= 3; $i++) {",
          "    echo $i . \"<br>\";",
          "}",
          "?>"
        ],
        expectedOrder: [
          "<?php",
          "for ($i = 1; $i <= 3; $i++) {",
          "    echo $i . \"<br>\";",
          "}",
          "?>"
        ]
      }
    },
    {
      levelId: 4,
      title: "Membuat Function PHP",
      description: "Buatlah sebuah function bernama \`sapa\` yang menerima satu parameter \`$nama\` dan mengembalikan (\`return\`) string \"Halo \" diikuti dengan nama tersebut.",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 90,
      xpBase: 10,
      hint: "Gunakan kata kunci function sapa($nama) { return ... }",
      isActive: true,
      testCases: [
        { 
          description: "Harus ada function sapa", 
          requirement: "function sapa",
          weight: 100,
          isHidden: false,
          expectedOutput: JSON.stringify({
            php: "<?php\n/* Buat function sapa($nama) di bawah ini */\nfunction sapa($nama) {\n    return \"Halo \" . $nama;\n}\n\necho sapa(\"Programmer\");\n?>",
            php_process: "",
            php_connection: ""
          })
        }
      ],
      content: {
        language: "php",
        sandboxEnabled: true,
        sandboxLevel: "php_level",
        starterCode: JSON.stringify({
          php: "<?php\n/* Buat function sapa($nama) di bawah ini */\n\n\necho sapa(\"Programmer\");\n?>",
          php_process: "",
          php_connection: ""
        }),
        correctAnswer: JSON.stringify({
          php: "<?php\n/* Buat function sapa($nama) di bawah ini */\nfunction sapa($nama) {\n    return \"Halo \" . $nama;\n}\n\necho sapa(\"Programmer\");\n?>",
          php_process: "",
          php_connection: ""
        })
      }
    },

    // ---------------------------------------------------------
    // MEDIUM CHALLENGES (20 XP)
    // ---------------------------------------------------------
    {
      levelId: 4,
      title: "Fix: Associative Array",
      description: "Kode ini mencoba membuat dan menampilkan nilai dari Associative Array. Ada kesalahan ketik dalam penulisan pemetaan key-value dan cara memanggil key-nya. Temukan dan perbaiki!",
      difficulty: Difficulty.MEDIUM,
      method: ChallengeMethod.FIX_THE_BUG,
      idealTime: 120,
      xpBase: 20,
      hint: "Key ke value di PHP menggunakan '=>'. Dan panggil key string dengan kurung siku dan tanda kutip, misal $user['nama'].",
      isActive: true,
      testCases: [
        { 
          description: "Gunakan '=>' untuk memetakan key ke value", 
          requirement: "=>",
          weight: 100,
          isHidden: false,
          expectedOutput: JSON.stringify({
            php: "<?php\n// Perbaiki operator penugasan array dan pemanggilannya\n$mahasiswa = [\n    \"nama\" => \"Budi\",\n    \"jurusan\" => \"Informatika\"\n];\n\necho \"Nama: \" . $mahasiswa[\"nama\"];\n?>",
            php_process: "",
            php_connection: ""
          })
        }
      ],
      content: {
        language: "php",
        sandboxEnabled: true,
        sandboxLevel: "php_level",
        buggyCode: JSON.stringify({
          php: "<?php\n// Perbaiki operator penugasan array dan pemanggilannya\n$mahasiswa = [\n    \"nama\" = \"Budi\",\n    \"jurusan\" = \"Informatika\"\n];\n\necho \"Nama: \" . $mahasiswa[nama];\n?>",
          php_process: "",
          php_connection: ""
        }),
        correctAnswer: JSON.stringify({
          php: "<?php\n// Perbaiki operator penugasan array dan pemanggilannya\n$mahasiswa = [\n    \"nama\" => \"Budi\",\n    \"jurusan\" => \"Informatika\"\n];\n\necho \"Nama: \" . $mahasiswa[\"nama\"];\n?>",
          php_process: "",
          php_connection: ""
        })
      }
    },
    {
      levelId: 4,
      title: "Form Handling POST",
      description: "Kita memiliki form sederhana. Tidak perlu mengubah isi HTML. Di blok PHP yang disediakan, tulis kode untuk mengambil nilai dari form input bernama 'username' melalui metode POST, lalu cetak nilai tersebut menggunakan \`echo\`.",
      difficulty: Difficulty.MEDIUM,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 120,
      xpBase: 20,
      hint: "Gunakan variabel superglobal $_POST['username'].",
      isActive: true,
      testCases: [
        { 
          description: "Gunakan superglobal $_POST", 
          requirement: "$_POST",
          weight: 100,
          isHidden: false,
          expectedOutput: JSON.stringify({
            php: "<!-- Form HTML sudah disediakan, Anda cukup melengkapi PHP-nya -->\n<form method=\"POST\">\n    <input type=\"text\" name=\"username\" value=\"Admin\">\n    <button type=\"submit\">Kirim</button>\n</form>\n\n<?php\nif ($_SERVER[\"REQUEST_METHOD\"] == \"POST\") {\n    /* Ambil nilai 'username' dari $_POST lalu cetak (echo) */\n    $username = $_POST[\"username\"];\n    echo \"Halo \" . $username;\n}\n?>",
            php_process: "",
            php_connection: ""
          })
        }
      ],
      content: {
        language: "php",
        sandboxEnabled: true,
        sandboxLevel: "php_level",
        starterCode: JSON.stringify({
          php: "<!-- Form HTML sudah disediakan, Anda cukup melengkapi PHP-nya -->\n<form method=\"POST\">\n    <input type=\"text\" name=\"username\" value=\"Admin\">\n    <button type=\"submit\">Kirim</button>\n</form>\n\n<?php\nif ($_SERVER[\"REQUEST_METHOD\"] == \"POST\") {\n    // 1. Simpan nilai $_POST[\"username\"] ke dalam variabel $username\n    \n    \n    // 2. Cetak string \"Halo \" digabung dengan variabel $username menggunakan echo\n    \n}\n?>",
          php_process: "",
          php_connection: ""
        }),
        correctAnswer: JSON.stringify({
          php: "<!-- Form HTML sudah disediakan, Anda cukup melengkapi PHP-nya -->\n<form method=\"POST\">\n    <input type=\"text\" name=\"username\" value=\"Admin\">\n    <button type=\"submit\">Kirim</button>\n</form>\n\n<?php\nif ($_SERVER[\"REQUEST_METHOD\"] == \"POST\") {\n    /* Ambil nilai 'username' dari $_POST lalu cetak (echo) */\n    $username = $_POST[\"username\"];\n    echo \"Halo \" . $username;\n}\n?>",
          php_process: "",
          php_connection: ""
        })
      }
    },
    {
      levelId: 4,
      title: "Menyusun Session Logic",
      description: "Susunlah potongan kode berikut agar script PHP ini bisa memulai sesi (session), menyimpan data 'role' = 'admin', dan mencetaknya.",
      difficulty: Difficulty.MEDIUM,
      method: ChallengeMethod.DRAG_AND_DROP,
      idealTime: 90,
      xpBase: 20,
      hint: "Session harus selalu diawali dengan session_start() sebelum kita mengatur $_SESSION.",
      isActive: true,
      testCases: [],
      content: {
        language: "php",
        blocks: [
          "<?php",
          "session_start();",
          "$_SESSION['role'] = 'admin';",
          "echo 'Role anda: ' . $_SESSION['role'];",
          "?>"
        ],
        expectedOrder: [
          "<?php",
          "session_start();",
          "$_SESSION['role'] = 'admin';",
          "echo 'Role anda: ' . $_SESSION['role'];",
          "?>"
        ]
      }
    },
    {
      levelId: 4,
      title: "Fix: Database Connection",
      description: "Skrip ini bertugas menghubungkan aplikasi dengan database MySQL. Namun, urutan parameter untuk \`mysqli_connect\` tertukar letaknya dan parameter password seharusnya string kosong, bukan 'null'. Tolong perbaiki!",
      difficulty: Difficulty.MEDIUM,
      method: ChallengeMethod.FIX_THE_BUG,
      idealTime: 120,
      xpBase: 20,
      hint: "Ingat urutan parameter mysqli_connect yang benar adalah: (1) host, (2) username, (3) password, (4) nama_database.",
      isActive: true,
      testCases: [
        { 
          description: "Urutan parameter harus benar", 
          requirement: "localhost",
          weight: 100,
          isHidden: false,
          expectedOutput: JSON.stringify({
            php: "<?php\n// File ini menyertakan koneksi dari tab php_connection\ninclude 'connection.php';\n?>",
            php_process: "",
            php_connection: "<?php\n// Perbaiki urutan parameter mysqli_connect dan ubah 'null' menjadi \"\"\n$host = \"localhost\";\n$db   = \"db_sekolah\";\n$user = \"root\";\n$pass = \"\";\n\n// Koneksi saat ini: mysqli_connect(nama_database, password, username, host)\n$conn = mysqli_connect($host, $user, $pass, $db);\n\nif (!$conn) {\n    echo \"Koneksi gagal!\";\n} else {\n    echo \"Koneksi berhasil!\";\n}\n?>"
          })
        }
      ],
      content: {
        language: "php",
        sandboxEnabled: true,
        sandboxLevel: "php_level",
        buggyCode: JSON.stringify({
          php: "<?php\n// File ini menyertakan koneksi dari tab php_connection\ninclude 'connection.php';\n?>",
          php_process: "",
          php_connection: "<?php\n// Perbaiki urutan parameter mysqli_connect dan ubah 'null' menjadi \"\"\n$host = \"localhost\";\n$db   = \"db_sekolah\";\n$user = \"root\";\n$pass = null;\n\n// Koneksi saat ini: mysqli_connect(nama_database, password, username, host)\n$conn = mysqli_connect($db, $pass, $user, $host);\n\nif (!$conn) {\n    echo \"Koneksi gagal!\";\n} else {\n    echo \"Koneksi berhasil!\";\n}\n?>"
        }),
        correctAnswer: JSON.stringify({
          php: "<?php\n// File ini menyertakan koneksi dari tab php_connection\ninclude 'connection.php';\n?>",
          php_process: "",
          php_connection: "<?php\n// Perbaiki urutan parameter mysqli_connect dan ubah 'null' menjadi \"\"\n$host = \"localhost\";\n$db   = \"db_sekolah\";\n$user = \"root\";\n$pass = \"\";\n\n// Koneksi saat ini: mysqli_connect(nama_database, password, username, host)\n$conn = mysqli_connect($host, $user, $pass, $db);\n\nif (!$conn) {\n    echo \"Koneksi gagal!\";\n} else {\n    echo \"Koneksi berhasil!\";\n}\n?>"
        })
      }
    },

    // ---------------------------------------------------------
    // HARD CHALLENGES (30 XP)
    // ---------------------------------------------------------
    {
      levelId: 4,
      title: "Query Insert Data (CRUD)",
      description: "Dalam skenario ini, koneksi database sudah disiapkan. Tugas Anda adalah menulis perintah SQL INSERT ke tabel 'mahasiswa' dan mengeksekusinya menggunakan \`mysqli_query\`.",
      difficulty: Difficulty.HARD,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 150,
      xpBase: 30,
      hint: "Gunakan sintaks SQL INSERT INTO mahasiswa (nama) VALUES ('Budi') dan jalankan dengan mysqli_query($conn, $query).",
      isActive: true,
      testCases: [
        { 
          description: "Gunakan mysqli_query untuk eksekusi", 
          requirement: "mysqli_query",
          weight: 100,
          isHidden: false,
          expectedOutput: JSON.stringify({
            php: "<?php\ninclude 'connection.php';\n\n/* \n 1. Buat query INSERT INTO ke tabel 'mahasiswa' \n    dengan kolom 'nama' dan nilai 'Budi'\n 2. Jalankan query tersebut dengan mysqli_query()\n*/\n$query = \"INSERT INTO mahasiswa (nama) VALUES ('Budi')\";\nmysqli_query($conn, $query);\n\n// Cek jika berhasil\nif (mysqli_affected_rows($conn) > 0) {\n    echo \"Data berhasil disimpan\";\n}\n?>",
            php_process: "",
            php_connection: "<?php\n// Jangan ubah file ini! (Simulasi koneksi)\n$conn = mysqli_connect(\"localhost\", \"root\", \"\", \"db_sekolah\");\n?>"
          })
        }
      ],
      content: {
        language: "php",
        sandboxEnabled: true,
        sandboxLevel: "php_level",
        starterCode: JSON.stringify({
          php: "<?php\ninclude 'connection.php';\n\n/* \n 1. Buat query INSERT INTO ke tabel 'mahasiswa' \n    dengan kolom 'nama' dan nilai 'Budi'\n 2. Jalankan query tersebut dengan mysqli_query()\n*/\n$query = \"/* Tulis string INSERT INTO Anda di sini */\";\n// mysqli_query($conn, $query);\n\n\n// Cek jika berhasil\nif (mysqli_affected_rows($conn) > 0) {\n    echo \"Data berhasil disimpan\";\n}\n?>",
          php_process: "",
          php_connection: "<?php\n// Jangan ubah file ini! (Simulasi koneksi)\n$conn = mysqli_connect(\"localhost\", \"root\", \"\", \"db_sekolah\");\n?>"
        }),
        correctAnswer: JSON.stringify({
          php: "<?php\ninclude 'connection.php';\n\n/* \n 1. Buat query INSERT INTO ke tabel 'mahasiswa' \n    dengan kolom 'nama' dan nilai 'Budi'\n 2. Jalankan query tersebut dengan mysqli_query()\n*/\n$query = \"INSERT INTO mahasiswa (nama) VALUES ('Budi')\";\nmysqli_query($conn, $query);\n\n// Cek jika berhasil\nif (mysqli_affected_rows($conn) > 0) {\n    echo \"Data berhasil disimpan\";\n}\n?>",
          php_process: "",
          php_connection: "<?php\n// Jangan ubah file ini! (Simulasi koneksi)\n$conn = mysqli_connect(\"localhost\", \"root\", \"\", \"db_sekolah\");\n?>"
        })
      }
    },
    {
      levelId: 4,
      title: "Fix: Sistem Login Multi-Tab",
      description: "Anda memiliki halaman form login di tab PHP dan file pemrosesan di tab php_process. Sayangnya, script php_process.php gagal memproses data login dan malah error. Buka tab php_process, perhatikan baris atas (tambahkan session_start()), lalu perbaiki operator perbandingan yang salah (= menjadi ==) pada IF.",
      difficulty: Difficulty.HARD,
      method: ChallengeMethod.FIX_THE_BUG,
      idealTime: 180,
      xpBase: 30,
      hint: "Buka tab php_process. Periksa kembali variabel POST, session_start() yang hilang, dan pengkondisian di tab php_process.",
      isActive: true,
      testCases: [
        { 
          description: "Gunakan session_start() sebelum $_SESSION", 
          requirement: "session_start",
          weight: 100,
          isHidden: false,
          expectedOutput: JSON.stringify({
            php: "<!-- Form HTML Login -->\n<form action=\"process.php\" method=\"POST\">\n    <input type=\"text\" name=\"user\" value=\"admin\">\n    <input type=\"password\" name=\"pass\" value=\"12345\">\n    <button type=\"submit\">Login</button>\n</form>",
            php_process: "<?php\n// Perbaiki session dan if statement!\nsession_start();\n\n$username = $_POST['user'];\n$password = $_POST['pass'];\n\nif ($username == \"admin\" && $password == \"12345\") {\n    $_SESSION['login'] = true;\n    echo \"Berhasil login!\";\n} else {\n    echo \"Gagal login!\";\n}\n?>",
            php_connection: ""
          })
        }
      ],
      content: {
        language: "php",
        sandboxEnabled: true,
        sandboxLevel: "php_level",
        buggyCode: JSON.stringify({
          php: "<!-- Form HTML Login -->\n<form action=\"process.php\" method=\"POST\">\n    <input type=\"text\" name=\"user\" value=\"admin\">\n    <input type=\"password\" name=\"pass\" value=\"12345\">\n    <button type=\"submit\">Login</button>\n</form>",
          php_process: "<?php\n// Perbaiki session dan if statement!\n// session_start tidak dipanggil?\n\n$username = $_POST['user'];\n$password = $_POST['pass'];\n\nif ($username = \"admin\" && $password = \"12345\") {\n    $_SESSION['login'] = true;\n    echo \"Berhasil login!\";\n} else {\n    echo \"Gagal login!\";\n}\n?>",
          php_connection: ""
        }),
        correctAnswer: JSON.stringify({
          php: "<!-- Form HTML Login -->\n<form action=\"process.php\" method=\"POST\">\n    <input type=\"text\" name=\"user\" value=\"admin\">\n    <input type=\"password\" name=\"pass\" value=\"12345\">\n    <button type=\"submit\">Login</button>\n</form>",
          php_process: "<?php\n// Perbaiki session dan if statement!\nsession_start();\n\n$username = $_POST['user'];\n$password = $_POST['pass'];\n\nif ($username == \"admin\" && $password == \"12345\") {\n    $_SESSION['login'] = true;\n    echo \"Berhasil login!\";\n} else {\n    echo \"Gagal login!\";\n}\n?>",
          php_connection: ""
        })
      }
    },
    {
      levelId: 4,
      title: "Menyusun Block File Upload",
      description: "Anda ingin mengunggah file. Susunlah blok-blok ini agar membentuk logika upload gambar sederhana dengan variabel \`$_FILES\` yang dipindahkan menggunakan \`move_uploaded_file\`.",
      difficulty: Difficulty.HARD,
      method: ChallengeMethod.DRAG_AND_DROP,
      idealTime: 120,
      xpBase: 30,
      hint: "Dapatkan nama file dan nama temporer (tmp_name) dari $_FILES, lalu move_uploaded_file.",
      isActive: true,
      testCases: [],
      content: {
        language: "php",
        blocks: [
          "<?php",
          "$fileName = $_FILES['gambar']['name'];",
          "$tmpName = $_FILES['gambar']['tmp_name'];",
          "move_uploaded_file($tmpName, 'uploads/' . $fileName);",
          "echo 'Upload sukses!';",
          "?>"
        ],
        expectedOrder: [
          "<?php",
          "$fileName = $_FILES['gambar']['name'];",
          "$tmpName = $_FILES['gambar']['tmp_name'];",
          "move_uploaded_file($tmpName, 'uploads/' . $fileName);",
          "echo 'Upload sukses!';",
          "?>"
        ]
      }
    }
  ];

  // Hapus semua data yang ada sebelumnya, lalu buat baru
  await prisma.challenge.deleteMany({ where: { levelId: 4 } });

  for (const chal of challenges) {
    const { content, ...rest } = chal;
    const blocks = (chal as any).blocks;
    const expectedOrder = (chal as any).expectedOrder;

    await prisma.challenge.create({
      data: {
        ...rest,
        content: content,
      },
    });
  }

  console.log("✅ Challenge Level 4 PHP seeding completed!");
}
