import { PrismaClient, Difficulty, ChallengeMethod } from "@prisma/client";

export async function seedLevel4Challenge(prisma: PrismaClient) {
  console.log("🌱 Seeding Challenge Level 4: PHP...");

  const phpChallenges = [
  {
    levelId: 4,
    levelName: "PHP Basic",
    title: "Menampilkan Hello World",
    description: "Tampilkan teks Hello World menggunakan PHP",
    difficulty: Difficulty.EASY,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 120,
    xpBase: 10,
    hint: "Gunakan echo",
    isActive: true,
    starterCode:
      "{\"php\":\"<?php\\r\\n\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"\"}",
    correctAnswer: null,
    buggyCode: null,
    blocks: null,
    expectedOrder: null,
    sandboxEnabled: true,
    sandboxTemplate: null,
    sandboxLevel: "php_level",
    content: {
      language: "php",
      starterCode:
        "{\"php\":\"<?php\\r\\n\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"\"}",
      sandboxLevel: "php_level",
      correctAnswer:
        "{\"php\":\"<?php\\r\\necho 'Hello World';\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"\"}",
      sandboxEnabled: true,
      sandboxTemplate: null
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput:
          "{\"php\":\"<?php\\r\\necho 'Hello World';\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"\"}"
      }
    ]
  },

  {
    levelId: 4,
    levelName: "PHP Basic",
    title: "Variabel PHP",
    description: "Buat variabel nama dan tampilkan nilainya",
    difficulty: Difficulty.EASY,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 150,
    xpBase: 10,
    hint: "Gunakan tanda $ untuk variabel",
    isActive: true,
    starterCode:
      "{\"php\":\"<?php\\r\\n\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"\"}",
    correctAnswer: null,
    buggyCode: null,
    blocks: null,
    expectedOrder: null,
    sandboxEnabled: true,
    sandboxTemplate: null,
    sandboxLevel: "php_level",
    content: {
      language: "php",
      starterCode:
        "{\"php\":\"<?php\\r\\n\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"\"}",
      sandboxLevel: "php_level",
      correctAnswer:
        "{\"php\":\"<?php\\r\\n$nama = 'Andi';\\r\\necho $nama;\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"\"}",
      sandboxEnabled: true,
      sandboxTemplate: null
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput:
          "{\"php\":\"<?php\\r\\n$nama = 'Andi';\\r\\necho $nama;\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"\"}"
      }
    ]
  },

  {
    levelId: 4,
    levelName: "PHP Basic",
    title: "Percabangan PHP",
    description: "Buat percabangan sederhana menggunakan if",
    difficulty: Difficulty.EASY,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 180,
    xpBase: 10,
    hint: "Gunakan if",
    isActive: true,
    starterCode:
      "{\"php\":\"<?php\\r\\n$nilai = 80;\\r\\n\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"\"}",
    correctAnswer: null,
    buggyCode: null,
    blocks: null,
    expectedOrder: null,
    sandboxEnabled: true,
    sandboxTemplate: null,
    sandboxLevel: "php_level",
    content: {
      language: "php",
      starterCode:
        "{\"php\":\"<?php\\r\\n$nilai = 80;\\r\\n\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"\"}",
      sandboxLevel: "php_level",
      correctAnswer:
        "{\"php\":\"<?php\\r\\n$nilai = 80;\\r\\n\\r\\nif($nilai >= 75) {\\r\\n echo 'Lulus';\\r\\n}\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"\"}",
      sandboxEnabled: true,
      sandboxTemplate: null
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput:
          "{\"php\":\"<?php\\r\\n$nilai = 80;\\r\\n\\r\\nif($nilai >= 75) {\\r\\n echo 'Lulus';\\r\\n}\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"\"}"
      }
    ]
  },

  {
    levelId: 4,
    levelName: "PHP Basic",
    title: "Susun Echo PHP",
    description: "Susun kode echo PHP berikut",
    difficulty: Difficulty.EASY,
    method: ChallengeMethod.DRAG_AND_DROP,
    idealTime: 120,
    xpBase: 10,
    hint: "Gunakan echo",
    isActive: true,
    starterCode: null,
    correctAnswer: null,
    buggyCode: null,
    blocks: [
      "echo 'Halo PHP';",
      "<?php",
      "?>"
    ],
    expectedOrder: [
      "<?php",
      "echo 'Halo PHP';",
      "?>"
    ],
    sandboxEnabled: true,
    sandboxTemplate: null,
    sandboxLevel: "php_level",
    content: {
      language: "php",
      blocks: [
        "echo 'Halo PHP';",
        "<?php",
        "?>"
      ],
      expectedOrder: [
        "<?php",
        "echo 'Halo PHP';",
        "?>"
      ],
      sandboxLevel: "php_level",
      sandboxEnabled: true,
      sandboxTemplate: null
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput:
          "<?php\\necho 'Halo PHP';\\n?>"
      }
    ]
  },

  {
    levelId: 4,
    levelName: "PHP Basic",
    title: "Perbaiki Syntax Echo",
    description: "Perbaiki syntax echo berikut",
    difficulty: Difficulty.EASY,
    method: ChallengeMethod.FIX_THE_BUG,
    idealTime: 120,
    xpBase: 10,
    hint: "Terdapat kesalahan pada keyword echo",
    isActive: true,
    starterCode:
      "<?php\\r\\nech 'Hello';\\r\\n?>",
    correctAnswer: null,
    buggyCode:
      "<?php\\r\\nech 'Hello';\\r\\n?>",
    blocks: null,
    expectedOrder: null,
    sandboxEnabled: true,
    sandboxTemplate: null,
    sandboxLevel: "php_level",
    content: {
      language: "php",
      buggyCode:
        "<?php\\r\\nech 'Hello';\\r\\n?>",
      sandboxLevel: "php_level",
      correctAnswer:
        "{\"php\":\"<?php\\r\\necho 'Hello';\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"\"}",
      sandboxEnabled: true,
      sandboxTemplate: null
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput:
          "{\"php\":\"<?php\\r\\necho 'Hello';\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"\"}"
      }
    ]
  },

  {
    levelId: 4,
    levelName: "PHP Basic",
    title: "Koneksi Database SQLite",
    description: "Buat koneksi SQLite menggunakan PDO",
    difficulty: Difficulty.MEDIUM,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 300,
    xpBase: 20,
    hint: "Gunakan PDO sqlite",
    isActive: true,
    starterCode:
      "{\"php\":\"\",\"php_process\":\"\",\"php_connection\":\"<?php\\r\\n\\r\\n?>\"}",
    correctAnswer: null,
    buggyCode: null,
    blocks: null,
    expectedOrder: null,
    sandboxEnabled: true,
    sandboxTemplate: null,
    sandboxLevel: "php_level",
    content: {
      language: "php",
      starterCode:
        "{\"php\":\"\",\"php_process\":\"\",\"php_connection\":\"<?php\\r\\n\\r\\n?>\"}",
      sandboxLevel: "php_level",
      correctAnswer:
        "{\"php\":\"\",\"php_process\":\"\",\"php_connection\":\"<?php\\r\\n$db = new PDO('sqlite:' . __DIR__ . '/sandbox.db');\\r\\n$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);\"}",
      sandboxEnabled: true,
      sandboxTemplate: null
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput:
          "{\"php\":\"\",\"php_process\":\"\",\"php_connection\":\"<?php\\r\\n$db = new PDO('sqlite:' . __DIR__ . '/sandbox.db');\\r\\n$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);\"}"
      }
    ]
  },

  {
    levelId: 4,
    levelName: "PHP Basic",
    title: "Query Semua Data",
    description: "Ambil semua data dari tabel users",
    difficulty: Difficulty.MEDIUM,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 400,
    xpBase: 20,
    hint: "Gunakan query SELECT",
    isActive: true,
    starterCode:
      "{\"php\":\"\",\"php_process\":\"<?php\\r\\n\\r\\n\",\"php_connection\":\"<?php\\r\\n$db = new PDO('sqlite:' . __DIR__ . '/sandbox.db');\"}",
    correctAnswer: null,
    buggyCode: null,
    blocks: null,
    expectedOrder: null,
    sandboxEnabled: true,
    sandboxTemplate: null,
    sandboxLevel: "php_level",
    content: {
      language: "php",
      starterCode:
        "{\"php\":\"\",\"php_process\":\"<?php\\r\\n\\r\\n\",\"php_connection\":\"<?php\\r\\n$db = new PDO('sqlite:' . __DIR__ . '/sandbox.db');\"}",
      sandboxLevel: "php_level",
      correctAnswer:
        "{\"php\":\"\",\"php_process\":\"<?php\\r\\nfunction getUsers($db) {\\r\\n $stmt = $db->query('SELECT * FROM users');\\r\\n return $stmt->fetchAll(PDO::FETCH_ASSOC);\\r\\n}\",\"php_connection\":\"<?php\\r\\n$db = new PDO('sqlite:' . __DIR__ . '/sandbox.db');\"}",
      sandboxEnabled: true,
      sandboxTemplate: null
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput:
          "{\"php\":\"\",\"php_process\":\"<?php\\r\\nfunction getUsers($db) {\\r\\n $stmt = $db->query('SELECT * FROM users');\\r\\n return $stmt->fetchAll(PDO::FETCH_ASSOC);\\r\\n}\",\"php_connection\":\"<?php\\r\\n$db = new PDO('sqlite:' . __DIR__ . '/sandbox.db');\"}"
      }
    ]
  },
  {
    levelId: 4,
    levelName: "PHP Basic",
    title: "Menampilkan Data User",
    description: "Tampilkan semua data user dari database ke dalam tabel HTML",
    difficulty: Difficulty.MEDIUM,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 450,
    xpBase: 20,
    hint: "Gunakan foreach untuk menampilkan data",
    isActive: true,
    starterCode: "{\"php\":\"\",\"php_process\":\"\",\"php_connection\":\"\"}",
    correctAnswer: null,
    buggyCode: null,
    blocks: null,
    expectedOrder: null,
    sandboxEnabled: true,
    sandboxTemplate: null,
    sandboxLevel: "php_level",
    content: {
      language: "php",
      starterCode: "{\"php\":\"\",\"php_process\":\"\",\"php_connection\":\"\"}",
      sandboxLevel: "php_level",
      correctAnswer: "{\"php\":\"<?php\\r\\nrequire_once 'connection.php';\\r\\nrequire_once 'process.php';\\r\\n\\r\\n$users = getUsers($db);\\r\\n?>\\r\\n<table border=\\\"1\\\">\\r\\n<?php foreach($users as $user): ?>\\r\\n<tr>\\r\\n<td><?= $user['name'] ?></td>\\r\\n</tr>\\r\\n<?php endforeach; ?>\\r\\n</table>\",\"php_process\":\"<?php\\r\\nfunction getUsers($db) {\\r\\n return $db->query('SELECT * FROM users')->fetchAll(PDO::FETCH_ASSOC);\\r\\n}\",\"php_connection\":\"<?php\\r\\n$db = new PDO('sqlite:' . __DIR__ . '/sandbox.db');\"}",
      sandboxEnabled: true,
      sandboxTemplate: null
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput: "{\"php\":\"<?php\\r\\nrequire_once 'connection.php';\\r\\nrequire_once 'process.php';\\r\\n\\r\\n$users = getUsers($db);\\r\\n?>\\r\\n<table border=\\\"1\\\">\\r\\n<?php foreach($users as $user): ?>\\r\\n<tr>\\r\\n<td><?= $user['name'] ?></td>\\r\\n</tr>\\r\\n<?php endforeach; ?>\\r\\n</table>\",\"php_process\":\"<?php\\r\\nfunction getUsers($db) {\\r\\n return $db->query('SELECT * FROM users')->fetchAll(PDO::FETCH_ASSOC);\\r\\n}\",\"php_connection\":\"<?php\\r\\n$db = new PDO('sqlite:' . __DIR__ . '/sandbox.db');\"}"
      }
    ]
  },

  {
    levelId: 4,
    levelName: "PHP Basic",
    title: "Susun Koneksi PDO",
    description: "Susun kode koneksi PDO berikut",
    difficulty: Difficulty.MEDIUM,
    method: ChallengeMethod.DRAG_AND_DROP,
    idealTime: 300,
    xpBase: 20,
    hint: "Gunakan PDO SQLite",
    isActive: true,
    starterCode: null,
    correctAnswer: null,
    buggyCode: null,
    blocks: [
      "$db = new PDO('sqlite:' . __DIR__ . '/sandbox.db');",
      "<?php",
      "?>"
    ],
    expectedOrder: [
      "<?php",
      "$db = new PDO('sqlite:' . __DIR__ . '/sandbox.db');",
      "?>"
    ],
    sandboxEnabled: true,
    sandboxTemplate: null,
    sandboxLevel: "php_level",
    content: {
      language: "php",
      blocks: [
        "$db = new PDO('sqlite:' . __DIR__ . '/sandbox.db');",
        "<?php",
        "?>"
      ],
      expectedOrder: [
        "<?php",
        "$db = new PDO('sqlite:' . __DIR__ . '/sandbox.db');",
        "?>"
      ],
      sandboxLevel: "php_level",
      sandboxEnabled: true,
      sandboxTemplate: null
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput: "<?php\\n$db = new PDO('sqlite:' . __DIR__ . '/sandbox.db');\\n?>"
      }
    ]
  },

  {
    levelId: 4,
    levelName: "PHP Basic",
    title: "Perbaiki Query SQL",
    description: "Perbaiki query SQL berikut",
    difficulty: Difficulty.MEDIUM,
    method: ChallengeMethod.FIX_THE_BUG,
    idealTime: 250,
    xpBase: 20,
    hint: "Keyword SELECT salah",
    isActive: true,
    starterCode: "SELEC * FROM users",
    correctAnswer: null,
    buggyCode: "SELEC * FROM users",
    blocks: null,
    expectedOrder: null,
    sandboxEnabled: true,
    sandboxTemplate: null,
    sandboxLevel: "php_level",
    content: {
      language: "php",
      buggyCode: "SELEC * FROM users",
      sandboxLevel: "php_level",
      correctAnswer: "{\"php\":\"<?php\\r\\n$db->query('SELECT * FROM users');\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"<?php\\r\\n$db = new PDO('sqlite:' . __DIR__ . '/sandbox.db');\"}",
      sandboxEnabled: true,
      sandboxTemplate: null
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput: "{\"php\":\"<?php\\r\\n$db->query('SELECT * FROM users');\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"<?php\\r\\n$db = new PDO('sqlite:' . __DIR__ . '/sandbox.db');\"}"
      }
    ]
  },

  {
    levelId: 4,
    levelName: "PHP Basic",
    title: "Insert Data User",
    description: "Tambahkan data user baru ke database",
    difficulty: Difficulty.MEDIUM,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 500,
    xpBase: 25,
    hint: "Gunakan INSERT INTO",
    isActive: true,
    starterCode: "{\"php\":\"\",\"php_process\":\"\",\"php_connection\":\"\"}",
    correctAnswer: null,
    buggyCode: null,
    blocks: null,
    expectedOrder: null,
    sandboxEnabled: true,
    sandboxTemplate: null,
    sandboxLevel: "php_level",
    content: {
      language: "php",
      starterCode: "{\"php\":\"\",\"php_process\":\"\",\"php_connection\":\"\"}",
      sandboxLevel: "php_level",
      correctAnswer: "{\"php\":\"<?php\\r\\nrequire_once 'connection.php';\\r\\n$db->exec(\\\"INSERT INTO users(name) VALUES('Andi')\\\");\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"<?php\\r\\n$db = new PDO('sqlite:' . __DIR__ . '/sandbox.db');\"}",
      sandboxEnabled: true,
      sandboxTemplate: null
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput: "{\"php\":\"<?php\\r\\nrequire_once 'connection.php';\\r\\n$db->exec(\\\"INSERT INTO users(name) VALUES('Andi')\\\");\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"<?php\\r\\n$db = new PDO('sqlite:' . __DIR__ . '/sandbox.db');\"}"
      }
    ]
  },

  {
    levelId: 4,
    levelName: "PHP Basic",
    title: "Update Data User",
    description: "Update nama user berdasarkan id",
    difficulty: Difficulty.MEDIUM,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 500,
    xpBase: 25,
    hint: "Gunakan UPDATE",
    isActive: true,
    starterCode: "{\"php\":\"\",\"php_process\":\"\",\"php_connection\":\"\"}",
    correctAnswer: null,
    buggyCode: null,
    blocks: null,
    expectedOrder: null,
    sandboxEnabled: true,
    sandboxTemplate: null,
    sandboxLevel: "php_level",
    content: {
      language: "php",
      starterCode: "{\"php\":\"\",\"php_process\":\"\",\"php_connection\":\"\"}",
      sandboxLevel: "php_level",
      correctAnswer: "{\"php\":\"<?php\\r\\nrequire_once 'connection.php';\\r\\n$db->exec(\\\"UPDATE users SET name='Budi' WHERE id=1\\\");\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"<?php\\r\\n$db = new PDO('sqlite:' . __DIR__ . '/sandbox.db');\"}",
      sandboxEnabled: true,
      sandboxTemplate: null
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput: "{\"php\":\"<?php\\r\\nrequire_once 'connection.php';\\r\\n$db->exec(\\\"UPDATE users SET name='Budi' WHERE id=1\\\");\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"<?php\\r\\n$db = new PDO('sqlite:' . __DIR__ . '/sandbox.db');\"}"
      }
    ]
  },

  {
    levelId: 4,
    levelName: "PHP Basic",
    title: "Delete Data User",
    description: "Hapus data user berdasarkan id",
    difficulty: Difficulty.MEDIUM,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 500,
    xpBase: 25,
    hint: "Gunakan DELETE FROM",
    isActive: true,
    starterCode: "{\"php\":\"\",\"php_process\":\"\",\"php_connection\":\"\"}",
    correctAnswer: null,
    buggyCode: null,
    blocks: null,
    expectedOrder: null,
    sandboxEnabled: true,
    sandboxTemplate: null,
    sandboxLevel: "php_level",
    content: {
      language: "php",
      starterCode: "{\"php\":\"\",\"php_process\":\"\",\"php_connection\":\"\"}",
      sandboxLevel: "php_level",
      correctAnswer: "{\"php\":\"<?php\\r\\nrequire_once 'connection.php';\\r\\n$db->exec(\\\"DELETE FROM users WHERE id=1\\\");\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"<?php\\r\\n$db = new PDO('sqlite:' . __DIR__ . '/sandbox.db');\"}",
      sandboxEnabled: true,
      sandboxTemplate: null
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput: "{\"php\":\"<?php\\r\\nrequire_once 'connection.php';\\r\\n$db->exec(\\\"DELETE FROM users WHERE id=1\\\");\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"<?php\\r\\n$db = new PDO('sqlite:' . __DIR__ . '/sandbox.db');\"}"
      }
    ]
  },

  {
    levelId: 4,
    levelName: "PHP Basic",
    title: "Susun Foreach PHP",
    description: "Susun perulangan foreach PHP",
    difficulty: Difficulty.MEDIUM,
    method: ChallengeMethod.DRAG_AND_DROP,
    idealTime: 250,
    xpBase: 20,
    hint: "Gunakan foreach",
    isActive: true,
    starterCode: null,
    correctAnswer: null,
    buggyCode: null,
    blocks: [
      "echo $item;",
      "foreach($data as $item) {",
      "}"
    ],
    expectedOrder: [
      "foreach($data as $item) {",
      "echo $item;",
      "}"
    ],
    sandboxEnabled: true,
    sandboxTemplate: null,
    sandboxLevel: "php_level",
    content: {
      language: "php",
      blocks: [
        "echo $item;",
        "foreach($data as $item) {",
        "}"
      ],
      expectedOrder: [
        "foreach($data as $item) {",
        "echo $item;",
        "}"
      ],
      sandboxLevel: "php_level",
      sandboxEnabled: true,
      sandboxTemplate: null
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput: "foreach($data as $item) {\\necho $item;\\n}"
      }
    ]
  },

  {
    levelId: 4,
    levelName: "PHP Basic",
    title: "Perbaiki PDO",
    description: "Perbaiki penulisan PDO berikut",
    difficulty: Difficulty.MEDIUM,
    method: ChallengeMethod.FIX_THE_BUG,
    idealTime: 200,
    xpBase: 20,
    hint: "Class PDO salah penulisan",
    isActive: true,
    starterCode: "$db = new PD0('sqlite:test.db');",
    correctAnswer: null,
    buggyCode: "$db = new PD0('sqlite:test.db');",
    blocks: null,
    expectedOrder: null,
    sandboxEnabled: true,
    sandboxTemplate: null,
    sandboxLevel: "php_level",
    content: {
      language: "php",
      buggyCode: "$db = new PD0('sqlite:test.db');",
      sandboxLevel: "php_level",
      correctAnswer: "{\"php\":\"<?php\\r\\n$db = new PDO('sqlite:test.db');\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"\"}",
      sandboxEnabled: true,
      sandboxTemplate: null
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput: "{\"php\":\"<?php\\r\\n$db = new PDO('sqlite:test.db');\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"\"}"
      }
    ]
  },

  {
    levelId: 4,
    levelName: "PHP Basic",
    title: "Prepared Statement",
    description: "Gunakan prepared statement untuk insert data",
    difficulty: Difficulty.HARD,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 700,
    xpBase: 40,
    hint: "Gunakan prepare dan execute",
    isActive: true,
    starterCode: "{\"php\":\"\",\"php_process\":\"\",\"php_connection\":\"\"}",
    correctAnswer: null,
    buggyCode: null,
    blocks: null,
    expectedOrder: null,
    sandboxEnabled: true,
    sandboxTemplate: null,
    sandboxLevel: "php_level",
    content: {
      language: "php",
      starterCode: "{\"php\":\"\",\"php_process\":\"\",\"php_connection\":\"\"}",
      sandboxLevel: "php_level",
      correctAnswer: "{\"php\":\"<?php\\r\\nrequire_once 'connection.php';\\r\\n$stmt = $db->prepare('INSERT INTO users(name) VALUES(?)');\\r\\n$stmt->execute(['Andi']);\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"<?php\\r\\n$db = new PDO('sqlite:' . __DIR__ . '/sandbox.db');\"}",
      sandboxEnabled: true,
      sandboxTemplate: null
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput: "{\"php\":\"<?php\\r\\nrequire_once 'connection.php';\\r\\n$stmt = $db->prepare('INSERT INTO users(name) VALUES(?)');\\r\\n$stmt->execute(['Andi']);\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"<?php\\r\\n$db = new PDO('sqlite:' . __DIR__ . '/sandbox.db');\"}"
      }
    ]
  },

  {
    levelId: 4,
    levelName: "PHP Basic",
    title: "Login Sederhana PHP",
    description: "Buat validasi login sederhana menggunakan PHP",
    difficulty: Difficulty.HARD,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 750,
    xpBase: 40,
    hint: "Gunakan if dan POST",
    isActive: true,
    starterCode: "{\"php\":\"\",\"php_process\":\"\",\"php_connection\":\"\"}",
    correctAnswer: null,
    buggyCode: null,
    blocks: null,
    expectedOrder: null,
    sandboxEnabled: true,
    sandboxTemplate: null,
    sandboxLevel: "php_level",
    content: {
      language: "php",
      starterCode: "{\"php\":\"\",\"php_process\":\"\",\"php_connection\":\"\"}",
      sandboxLevel: "php_level",
      correctAnswer: "{\"php\":\"<?php\\r\\n$username = $_POST['username'];\\r\\n$password = $_POST['password'];\\r\\n\\r\\nif($username == 'admin' && $password == '123') {\\r\\n echo 'Login berhasil';\\r\\n} else {\\r\\n echo 'Login gagal';\\r\\n}\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"\"}",
      sandboxEnabled: true,
      sandboxTemplate: null
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput: "{\"php\":\"<?php\\r\\n$username = $_POST['username'];\\r\\n$password = $_POST['password'];\\r\\n\\r\\nif($username == 'admin' && $password == '123') {\\r\\n echo 'Login berhasil';\\r\\n} else {\\r\\n echo 'Login gagal';\\r\\n}\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"\"}"
      }
    ]
  },
  {
    levelId: 4,
    levelName: "PHP Basic",
    title: "Menampilkan Daftar Produk",
    description: "Tampilkan semua data produk dalam bentuk tabel HTML",
    difficulty: Difficulty.HARD,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 800,
    xpBase: 50,
    hint: "Gunakan foreach dan query SELECT",
    isActive: true,
    starterCode: "{\"php\":\"\",\"php_process\":\"\",\"php_connection\":\"\"}",
    correctAnswer: null,
    buggyCode: null,
    blocks: null,
    expectedOrder: null,
    sandboxEnabled: true,
    sandboxTemplate: null,
    sandboxLevel: "php_level",
    content: {
      language: "php",
      starterCode: "{\"php\":\"\",\"php_process\":\"\",\"php_connection\":\"\"}",
      sandboxLevel: "php_level",
      correctAnswer: "{\"php\":\"<?php\\r\\nrequire_once 'connection.php';\\r\\nrequire_once 'process.php';\\r\\n$products = getProducts($db);\\r\\n?>\\r\\n<table border=\\\"1\\\">\\r\\n<?php foreach($products as $product): ?>\\r\\n<tr>\\r\\n<td><?= $product['name'] ?></td>\\r\\n<td><?= $product['price'] ?></td>\\r\\n</tr>\\r\\n<?php endforeach; ?>\\r\\n</table>\",\"php_process\":\"<?php\\r\\nfunction getProducts($db) {\\r\\n return $db->query('SELECT * FROM products')->fetchAll(PDO::FETCH_ASSOC);\\r\\n}\",\"php_connection\":\"<?php\\r\\n$db = new PDO('sqlite:' . __DIR__ . '/sandbox.db');\"}",
      sandboxEnabled: true,
      sandboxTemplate: null
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput: "{\"php\":\"<?php\\r\\nrequire_once 'connection.php';\\r\\nrequire_once 'process.php';\\r\\n$products = getProducts($db);\\r\\n?>\\r\\n<table border=\\\"1\\\">\\r\\n<?php foreach($products as $product): ?>\\r\\n<tr>\\r\\n<td><?= $product['name'] ?></td>\\r\\n<td><?= $product['price'] ?></td>\\r\\n</tr>\\r\\n<?php endforeach; ?>\\r\\n</table>\",\"php_process\":\"<?php\\r\\nfunction getProducts($db) {\\r\\n return $db->query('SELECT * FROM products')->fetchAll(PDO::FETCH_ASSOC);\\r\\n}\",\"php_connection\":\"<?php\\r\\n$db = new PDO('sqlite:' . __DIR__ . '/sandbox.db');\"}"
      }
    ]
  },

  {
    levelId: 4,
    levelName: "PHP Basic",
    title: "Cari Data User",
    description: "Cari data user berdasarkan id",
    difficulty: Difficulty.HARD,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 700,
    xpBase: 40,
    hint: "Gunakan WHERE id = ?",
    isActive: true,
    starterCode: "{\"php\":\"\",\"php_process\":\"\",\"php_connection\":\"\"}",
    correctAnswer: null,
    buggyCode: null,
    blocks: null,
    expectedOrder: null,
    sandboxEnabled: true,
    sandboxTemplate: null,
    sandboxLevel: "php_level",
    content: {
      language: "php",
      starterCode: "{\"php\":\"\",\"php_process\":\"\",\"php_connection\":\"\"}",
      sandboxLevel: "php_level",
      correctAnswer: "{\"php\":\"<?php\\r\\n$user = getUserById($db, 1);\\r\\necho $user['name'];\\r\\n?>\",\"php_process\":\"<?php\\r\\nfunction getUserById($db, $id) {\\r\\n $stmt = $db->prepare('SELECT * FROM users WHERE id = ?');\\r\\n $stmt->execute([$id]);\\r\\n return $stmt->fetch(PDO::FETCH_ASSOC);\\r\\n}\",\"php_connection\":\"<?php\\r\\n$db = new PDO('sqlite:' . __DIR__ . '/sandbox.db');\"}",
      sandboxEnabled: true,
      sandboxTemplate: null
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput: "{\"php\":\"<?php\\r\\n$user = getUserById($db, 1);\\r\\necho $user['name'];\\r\\n?>\",\"php_process\":\"<?php\\r\\nfunction getUserById($db, $id) {\\r\\n $stmt = $db->prepare('SELECT * FROM users WHERE id = ?');\\r\\n $stmt->execute([$id]);\\r\\n return $stmt->fetch(PDO::FETCH_ASSOC);\\r\\n}\",\"php_connection\":\"<?php\\r\\n$db = new PDO('sqlite:' . __DIR__ . '/sandbox.db');\"}"
      }
    ]
  },

  {
    levelId: 4,
    levelName: "PHP Basic",
    title: "Susun Prepared Statement",
    description: "Susun prepared statement PHP",
    difficulty: Difficulty.HARD,
    method: ChallengeMethod.DRAG_AND_DROP,
    idealTime: 350,
    xpBase: 30,
    hint: "Gunakan prepare dan execute",
    isActive: true,
    starterCode: null,
    correctAnswer: null,
    buggyCode: null,
    blocks: [
      "$stmt->execute([$name]);",
      "$stmt = $db->prepare('INSERT INTO users(name) VALUES(?)');",
      "$name = 'Andi';"
    ],
    expectedOrder: [
      "$name = 'Andi';",
      "$stmt = $db->prepare('INSERT INTO users(name) VALUES(?)');",
      "$stmt->execute([$name]);"
    ],
    sandboxEnabled: true,
    sandboxTemplate: null,
    sandboxLevel: "php_level",
    content: {
      language: "php",
      blocks: [
        "$stmt->execute([$name]);",
        "$stmt = $db->prepare('INSERT INTO users(name) VALUES(?)');",
        "$name = 'Andi';"
      ],
      expectedOrder: [
        "$name = 'Andi';",
        "$stmt = $db->prepare('INSERT INTO users(name) VALUES(?)');",
        "$stmt->execute([$name]);"
      ],
      sandboxLevel: "php_level",
      sandboxEnabled: true,
      sandboxTemplate: null
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput: "$name = 'Andi';\\n$stmt = $db->prepare('INSERT INTO users(name) VALUES(?)');\\n$stmt->execute([$name]);"
      }
    ]
  },

  {
    levelId: 4,
    levelName: "PHP Basic",
    title: "Susun Function PHP",
    description: "Susun function PHP berikut",
    difficulty: Difficulty.HARD,
    method: ChallengeMethod.DRAG_AND_DROP,
    idealTime: 300,
    xpBase: 30,
    hint: "Gunakan function",
    isActive: true,
    starterCode: null,
    correctAnswer: null,
    buggyCode: null,
    blocks: [
      "return $a + $b;",
      "function tambah($a, $b) {",
      "}"
    ],
    expectedOrder: [
      "function tambah($a, $b) {",
      "return $a + $b;",
      "}"
    ],
    sandboxEnabled: true,
    sandboxTemplate: null,
    sandboxLevel: "php_level",
    content: {
      language: "php",
      blocks: [
        "return $a + $b;",
        "function tambah($a, $b) {",
        "}"
      ],
      expectedOrder: [
        "function tambah($a, $b) {",
        "return $a + $b;",
        "}"
      ],
      sandboxLevel: "php_level",
      sandboxEnabled: true,
      sandboxTemplate: null
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput: "function tambah($a, $b) {\\nreturn $a + $b;\\n}"
      }
    ]
  },

  {
    levelId: 4,
    levelName: "PHP Basic",
    title: "Perbaiki Foreach",
    description: "Perbaiki syntax foreach berikut",
    difficulty: Difficulty.HARD,
    method: ChallengeMethod.FIX_THE_BUG,
    idealTime: 250,
    xpBase: 25,
    hint: "Keyword foreach salah",
    isActive: true,
    starterCode: "forach($data as $item) { echo $item; }",
    correctAnswer: null,
    buggyCode: "forach($data as $item) { echo $item; }",
    blocks: null,
    expectedOrder: null,
    sandboxEnabled: true,
    sandboxTemplate: null,
    sandboxLevel: "php_level",
    content: {
      language: "php",
      buggyCode: "forach($data as $item) { echo $item; }",
      sandboxLevel: "php_level",
      correctAnswer: "{\"php\":\"<?php\\r\\nforeach($data as $item) {\\r\\n echo $item;\\r\\n}\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"\"}",
      sandboxEnabled: true,
      sandboxTemplate: null
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput: "{\"php\":\"<?php\\r\\nforeach($data as $item) {\\r\\n echo $item;\\r\\n}\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"\"}"
      }
    ]
  },

  {
    levelId: 4,
    levelName: "PHP Basic",
    title: "Perbaiki Prepare",
    description: "Perbaiki method prepare berikut",
    difficulty: Difficulty.HARD,
    method: ChallengeMethod.FIX_THE_BUG,
    idealTime: 250,
    xpBase: 25,
    hint: "Method prepare salah",
    isActive: true,
    starterCode: "$db->preapre('SELECT * FROM users');",
    correctAnswer: null,
    buggyCode: "$db->preapre('SELECT * FROM users');",
    blocks: null,
    expectedOrder: null,
    sandboxEnabled: true,
    sandboxTemplate: null,
    sandboxLevel: "php_level",
    content: {
      language: "php",
      buggyCode: "$db->preapre('SELECT * FROM users');",
      sandboxLevel: "php_level",
      correctAnswer: "{\"php\":\"<?php\\r\\n$db->prepare('SELECT * FROM users');\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"\"}",
      sandboxEnabled: true,
      sandboxTemplate: null
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput: "{\"php\":\"<?php\\r\\n$db->prepare('SELECT * FROM users');\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"\"}"
      }
    ]
  },

  {
    levelId: 4,
    levelName: "PHP Basic",
    title: "Perbaiki PDO Attribute",
    description: "Perbaiki constant PDO berikut",
    difficulty: Difficulty.HARD,
    method: ChallengeMethod.FIX_THE_BUG,
    idealTime: 250,
    xpBase: 25,
    hint: "Constant PDO salah",
    isActive: true,
    starterCode: "$db->setAttribute(PDO::ATTR_ERRMOD, PDO::ERRMODE_EXCEPTION);",
    correctAnswer: null,
    buggyCode: "$db->setAttribute(PDO::ATTR_ERRMOD, PDO::ERRMODE_EXCEPTION);",
    blocks: null,
    expectedOrder: null,
    sandboxEnabled: true,
    sandboxTemplate: null,
    sandboxLevel: "php_level",
    content: {
      language: "php",
      buggyCode: "$db->setAttribute(PDO::ATTR_ERRMOD, PDO::ERRMODE_EXCEPTION);",
      sandboxLevel: "php_level",
      correctAnswer: "{\"php\":\"<?php\\r\\n$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"\"}",
      sandboxEnabled: true,
      sandboxTemplate: null
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput: "{\"php\":\"<?php\\r\\n$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"\"}"
      }
    ]
  },

  {
    levelId: 4,
    levelName: "PHP Basic",
    title: "Pagination Sederhana",
    description: "Buat pagination sederhana menggunakan LIMIT",
    difficulty: Difficulty.HARD,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 800,
    xpBase: 50,
    hint: "Gunakan LIMIT pada query",
    isActive: true,
    starterCode: "{\"php\":\"\",\"php_process\":\"\",\"php_connection\":\"\"}",
    correctAnswer: null,
    buggyCode: null,
    blocks: null,
    expectedOrder: null,
    sandboxEnabled: true,
    sandboxTemplate: null,
    sandboxLevel: "php_level",
    content: {
      language: "php",
      starterCode: "{\"php\":\"\",\"php_process\":\"\",\"php_connection\":\"\"}",
      sandboxLevel: "php_level",
      correctAnswer: "{\"php\":\"<?php\\r\\n$page = 1;\\r\\n$limit = 10;\\r\\n$offset = ($page - 1) * $limit;\\r\\n\\r\\n$stmt = $db->query(\\\"SELECT * FROM users LIMIT $limit OFFSET $offset\\\");\\r\\n$data = $stmt->fetchAll(PDO::FETCH_ASSOC);\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"<?php\\r\\n$db = new PDO('sqlite:' . __DIR__ . '/sandbox.db');\"}",
      sandboxEnabled: true,
      sandboxTemplate: null
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput: "{\"php\":\"<?php\\r\\n$page = 1;\\r\\n$limit = 10;\\r\\n$offset = ($page - 1) * $limit;\\r\\n\\r\\n$stmt = $db->query(\\\"SELECT * FROM users LIMIT $limit OFFSET $offset\\\");\\r\\n$data = $stmt->fetchAll(PDO::FETCH_ASSOC);\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"<?php\\r\\n$db = new PDO('sqlite:' . __DIR__ . '/sandbox.db');\"}"
      }
    ]
  },

  {
    levelId: 4,
    levelName: "PHP Basic",
    title: "CRUD Produk Lengkap",
    description: "Buat fungsi CRUD sederhana untuk produk",
    difficulty: Difficulty.HARD,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 1200,
    xpBase: 70,
    hint: "Buat function createProduct",
    isActive: true,
    starterCode: "{\"php\":\"\",\"php_process\":\"\",\"php_connection\":\"\"}",
    correctAnswer: null,
    buggyCode: null,
    blocks: null,
    expectedOrder: null,
    sandboxEnabled: true,
    sandboxTemplate: null,
    sandboxLevel: "php_level",
    content: {
      language: "php",
      starterCode: "{\"php\":\"\",\"php_process\":\"\",\"php_connection\":\"\"}",
      sandboxLevel: "php_level",
      correctAnswer: "{\"php\":\"<?php\\r\\nrequire_once 'connection.php';\\r\\nrequire_once 'process.php';\\r\\n\\r\\ncreateProduct($db, 'Laptop', 12000000);\\r\\n?>\",\"php_process\":\"<?php\\r\\nfunction createProduct($db, $name, $price) {\\r\\n $stmt = $db->prepare('INSERT INTO products(name, price) VALUES(?, ?)');\\r\\n $stmt->execute([$name, $price]);\\r\\n}\",\"php_connection\":\"<?php\\r\\n$db = new PDO('sqlite:' . __DIR__ . '/sandbox.db');\\r\\n$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);\"}",
      sandboxEnabled: true,
      sandboxTemplate: null
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput: "{\"php\":\"<?php\\r\\nrequire_once 'connection.php';\\r\\nrequire_once 'process.php';\\r\\n\\r\\ncreateProduct($db, 'Laptop', 12000000);\\r\\n?>\",\"php_process\":\"<?php\\r\\nfunction createProduct($db, $name, $price) {\\r\\n $stmt = $db->prepare('INSERT INTO products(name, price) VALUES(?, ?)');\\r\\n $stmt->execute([$name, $price]);\\r\\n}\",\"php_connection\":\"<?php\\r\\n$db = new PDO('sqlite:' . __DIR__ . '/sandbox.db');\\r\\n$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);\"}"
      }
    ]
  },

  {
    levelId: 4,
    levelName: "PHP Basic",
    title: "Autentikasi Session",
    description: "Gunakan session untuk autentikasi login",
    difficulty: Difficulty.HARD,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 900,
    xpBase: 60,
    hint: "Gunakan session_start",
    isActive: true,
    starterCode: "{\"php\":\"\",\"php_process\":\"\",\"php_connection\":\"\"}",
    correctAnswer: null,
    buggyCode: null,
    blocks: null,
    expectedOrder: null,
    sandboxEnabled: true,
    sandboxTemplate: null,
    sandboxLevel: "php_level",
    content: {
      language: "php",
      starterCode: "{\"php\":\"\",\"php_process\":\"\",\"php_connection\":\"\"}",
      sandboxLevel: "php_level",
      correctAnswer: "{\"php\":\"<?php\\r\\nsession_start();\\r\\n\\r\\n$_SESSION['user'] = 'admin';\\r\\necho 'Login berhasil';\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"\"}",
      sandboxEnabled: true,
      sandboxTemplate: null
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput: "{\"php\":\"<?php\\r\\nsession_start();\\r\\n\\r\\n$_SESSION['user'] = 'admin';\\r\\necho 'Login berhasil';\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"\"}"
      }
    ]
  },
  {
    levelId: 4,
    levelName: "PHP Basic",
    title: "Operasi Matematika PHP",
    description: "Hitung luas persegi panjang (panjang 10, lebar 5)",
    difficulty: Difficulty.EASY,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 120,
    xpBase: 10,
    hint: "Gunakan operator *",
    isActive: true,
    starterCode: "{\"php\":\"<?php\\r\\n\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"\"}",
    correctAnswer: null,
    buggyCode: null,
    blocks: null,
    expectedOrder: null,
    sandboxEnabled: true,
    sandboxTemplate: null,
    sandboxLevel: "php_level",
    content: {
      language: "php",
      starterCode: "{\"php\":\"<?php\\r\\n\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"\"}",
      sandboxLevel: "php_level",
      correctAnswer: "{\"php\":\"<?php\\r\\n$panjang = 10;\\r\\n$lebar = 5;\\r\\necho $panjang * $lebar;\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"\"}",
      sandboxEnabled: true,
      sandboxTemplate: null
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput: "{\"php\":\"<?php\\r\\n$panjang = 10;\\r\\n$lebar = 5;\\r\\necho $panjang * $lebar;\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"\"}"
      }
    ]
  },
  {
    levelId: 4,
    levelName: "PHP Basic",
    title: "Membuat Array Buah",
    description: "Buatlah array berindeks bernama buah berisi 'Apel' dan 'Jeruk', lalu tampilkan Apel",
    difficulty: Difficulty.MEDIUM,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 180,
    xpBase: 20,
    hint: "Gunakan index 0",
    isActive: true,
    starterCode: "{\"php\":\"<?php\\r\\n\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"\"}",
    correctAnswer: null,
    buggyCode: null,
    blocks: null,
    expectedOrder: null,
    sandboxEnabled: true,
    sandboxTemplate: null,
    sandboxLevel: "php_level",
    content: {
      language: "php",
      starterCode: "{\"php\":\"<?php\\r\\n\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"\"}",
      sandboxLevel: "php_level",
      correctAnswer: "{\"php\":\"<?php\\r\\n$buah = ['Apel', 'Jeruk'];\\r\\necho $buah[0];\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"\"}",
      sandboxEnabled: true,
      sandboxTemplate: null
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput: "{\"php\":\"<?php\\r\\n$buah = ['Apel', 'Jeruk'];\\r\\necho $buah[0];\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"\"}"
      }
    ]
  },
  {
    levelId: 4,
    levelName: "PHP Basic",
    title: "Susun Set Cookie",
    description: "Susun kode setcookie PHP dengan benar",
    difficulty: Difficulty.MEDIUM,
    method: ChallengeMethod.DRAG_AND_DROP,
    idealTime: 150,
    xpBase: 20,
    hint: "Format: setcookie(name, value, expire)",
    isActive: true,
    starterCode: null,
    correctAnswer: null,
    buggyCode: null,
    blocks: [
      "<?php",
      "setcookie('user', 'Andi', time() + 3600);",
      "?>"
    ],
    expectedOrder: [
      "<?php",
      "setcookie('user', 'Andi', time() + 3600);",
      "?>"
    ],
    sandboxEnabled: true,
    sandboxTemplate: null,
    sandboxLevel: "php_level",
    content: {
      language: "php",
      blocks: [
        "<?php",
        "setcookie('user', 'Andi', time() + 3600);",
        "?>"
      ],
      expectedOrder: [
        "<?php",
        "setcookie('user', 'Andi', time() + 3600);",
        "?>"
      ],
      sandboxLevel: "php_level",
      sandboxEnabled: true,
      sandboxTemplate: null
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput: "<?php\\nsetcookie('user', 'Andi', time() + 3600);\\n?>"
      }
    ]
  },
  {
    levelId: 4,
    levelName: "PHP Basic",
    title: "Perbaiki Variabel Upload",
    description: "Perbaiki variabel superglobal file upload berikut",
    difficulty: Difficulty.MEDIUM,
    method: ChallengeMethod.FIX_THE_BUG,
    idealTime: 120,
    xpBase: 20,
    hint: "Gunakan $_FILES",
    isActive: true,
    starterCode: "<?php\\r\\n$nama_file = $_FILE['gambar']['name'];\\r\\n?>",
    correctAnswer: null,
    buggyCode: "<?php\\r\\n$nama_file = $_FILE['gambar']['name'];\\r\\n?>",
    blocks: null,
    expectedOrder: null,
    sandboxEnabled: true,
    sandboxTemplate: null,
    sandboxLevel: "php_level",
    content: {
      language: "php",
      buggyCode: "<?php\\r\\n$nama_file = $_FILE['gambar']['name'];\\r\\n?>",
      sandboxLevel: "php_level",
      correctAnswer: "{\"php\":\"<?php\\r\\n$nama_file = $_FILES['gambar']['name'];\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"\"}",
      sandboxEnabled: true,
      sandboxTemplate: null
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput: "{\"php\":\"<?php\\r\\n$nama_file = $_FILES['gambar']['name'];\\r\\n?>\",\"php_process\":\"\",\"php_connection\":\"\"}"
      }
    ]
  }
];

  for (const c of phpChallenges) {
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

  console.log("✅ Challenge Level 4 PHP seeding completed!");
}

const p = new PrismaClient();
seedLevel4Challenge(p)
  .catch(console.error)
  .finally(() => p.$disconnect());