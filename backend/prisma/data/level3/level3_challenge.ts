import { PrismaClient, Difficulty, ChallengeMethod } from "@prisma/client";

export async function seedLevel3Challenge(prisma: PrismaClient) {
  console.log("🌱 Seeding Challenge Level 3: JavaScript...");

  const javascriptChallenges = [
    {
      levelId: 3,
      levelName: "JavaScript Novice",
      title: "Menampilkan Hello World",
      description: "Tampilkan Hello World menggunakan console.log",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 80,
      xpBase: 10,
      hint: "Gunakan console.log()",
      isActive: true,
      starterCode: "console.log();",
      correctAnswer: null,
      buggyCode: null,
      blocks: null,
      expectedOrder: null,
      sandboxEnabled: false,
      sandboxTemplate: null,
      sandboxLevel: null,
      content: {
        language: "javascript",
        starterCode: '{"html":"","css":"","javascript":"console.log();"}',
        sandboxLevel: null,
        correctAnswer:
          '{"html":"","css":"","javascript":"console.log(\'Hello World\');"}',
        sandboxEnabled: false,
        sandboxTemplate: null,
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput:
            '{"html":"","css":"","javascript":"console.log(\'Hello World\');"}',
        },
      ],
    },

    {
      levelId: 3,
      levelName: "JavaScript Novice",
      title: "Variabel JavaScript",
      description: "Buat variabel bernama nama dengan isi Andi",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 90,
      xpBase: 10,
      hint: "Gunakan let",
      isActive: true,
      starterCode: "let nama;",
      correctAnswer: null,
      buggyCode: null,
      blocks: null,
      expectedOrder: null,
      sandboxEnabled: false,
      sandboxTemplate: null,
      sandboxLevel: null,
      content: {
        language: "javascript",
        starterCode: '{"html":"","css":"","javascript":"let nama;"}',
        sandboxLevel: null,
        correctAnswer:
          '{"html":"","css":"","javascript":"let nama = \'Andi\';"}',
        sandboxEnabled: false,
        sandboxTemplate: null,
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput:
            '{"html":"","css":"","javascript":"let nama = \'Andi\';"}',
        },
      ],
    },

    {
      levelId: 3,
      levelName: "JavaScript Novice",
      title: "Penjumlahan JavaScript",
      description: "Jumlahkan dua angka menggunakan JavaScript",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 90,
      xpBase: 10,
      hint: "Gunakan operator +",
      isActive: true,
      starterCode: "let a = 5;\nlet b = 3;",
      correctAnswer: null,
      buggyCode: null,
      blocks: null,
      expectedOrder: null,
      sandboxEnabled: false,
      sandboxTemplate: null,
      sandboxLevel: null,
      content: {
        language: "javascript",
        starterCode:
          '{"html":"","css":"","javascript":"let a = 5;\\nlet b = 3;"}',
        sandboxLevel: null,
        correctAnswer:
          '{"html":"","css":"","javascript":"let a = 5;\\nlet b = 3;\\nconsole.log(a + b);"}',
        sandboxEnabled: false,
        sandboxTemplate: null,
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput:
            '{"html":"","css":"","javascript":"let a = 5;\\nlet b = 3;\\nconsole.log(a + b);"}',
        },
      ],
    },

    {
      levelId: 3,
      levelName: "JavaScript Novice",
      title: "Susun Console Log",
      description: "Susun kode console.log berikut",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.DRAG_AND_DROP,
      idealTime: 80,
      xpBase: 10,
      hint: "Gunakan console.log",
      isActive: true,
      starterCode: null,
      correctAnswer: null,
      buggyCode: null,
      blocks: ["console.log('Halo');", "<script>", "</script>"],
      expectedOrder: ["<script>", "console.log('Halo');", "</script>"],
      sandboxEnabled: false,
      sandboxTemplate: null,
      sandboxLevel: null,
      content: {
        language: "javascript",
        blocks: ["console.log('Halo');", "<script>", "</script>"],
        expectedOrder: ["<script>", "console.log('Halo');", "</script>"],
        sandboxEnabled: false,
        sandboxTemplate: null,
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput: "<script>\\nconsole.log('Halo');\\n</script>",
        },
      ],
    },

    {
      levelId: 3,
      levelName: "JavaScript Novice",
      title: "Susun Variabel",
      description: "Susun deklarasi variabel JavaScript",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.DRAG_AND_DROP,
      idealTime: 80,
      xpBase: 10,
      hint: "Gunakan let",
      isActive: true,
      starterCode: null,
      correctAnswer: null,
      buggyCode: null,
      blocks: ["console.log(nama);", "let nama = 'Budi';"],
      expectedOrder: ["let nama = 'Budi';", "console.log(nama);"],
      sandboxEnabled: false,
      sandboxTemplate: null,
      sandboxLevel: null,
      content: {
        language: "javascript",
        blocks: ["console.log(nama);", "let nama = 'Budi';"],
        expectedOrder: ["let nama = 'Budi';", "console.log(nama);"],
        sandboxEnabled: false,
        sandboxTemplate: null,
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput: "let nama = 'Budi';\\nconsole.log(nama);",
        },
      ],
    },

    {
      levelId: 3,
      levelName: "JavaScript Novice",
      title: "Susun If Statement",
      description: "Susun percabangan if berikut",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.DRAG_AND_DROP,
      idealTime: 90,
      xpBase: 10,
      hint: "Gunakan if",
      isActive: true,
      starterCode: null,
      correctAnswer: null,
      buggyCode: null,
      blocks: ["console.log('Lulus');", "if(nilai >= 75) {", "}"],
      expectedOrder: ["if(nilai >= 75) {", "console.log('Lulus');", "}"],
      sandboxEnabled: false,
      sandboxTemplate: null,
      sandboxLevel: null,
      content: {
        language: "javascript",
        blocks: ["console.log('Lulus');", "if(nilai >= 75) {", "}"],
        expectedOrder: ["if(nilai >= 75) {", "console.log('Lulus');", "}"],
        sandboxEnabled: false,
        sandboxTemplate: null,
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput: "if(nilai >= 75) {\\nconsole.log('Lulus');\\n}",
        },
      ],
    },

    {
      levelId: 3,
      levelName: "JavaScript Novice",
      title: "Perbaiki Function",
      description: "Perbaiki syntax function berikut",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.FIX_THE_BUG,
      idealTime: 80,
      xpBase: 10,
      hint: "Keyword function salah",
      isActive: true,
      starterCode: "funtion test() {\n console.log('Hello');\n}",
      correctAnswer: null,
      buggyCode: "funtion test() {\n console.log('Hello');\n}",
      blocks: null,
      expectedOrder: null,
      sandboxEnabled: false,
      sandboxTemplate: null,
      sandboxLevel: null,
      content: {
        language: "javascript",
        buggyCode: "funtion test() {\n console.log('Hello');\n}",
        correctAnswer:
          '{"html":"","css":"","javascript":"function test() {\\n console.log(\'Hello\');\\n}"}',
        sandboxEnabled: false,
        sandboxTemplate: null,
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput:
            '{"html":"","css":"","javascript":"function test() {\\n console.log(\'Hello\');\\n}"}',
        },
      ],
    },

    {
      levelId: 3,
      levelName: "JavaScript Novice",
      title: "Perbaiki Console Log",
      description: "Perbaiki method console berikut",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.FIX_THE_BUG,
      idealTime: 70,
      xpBase: 10,
      hint: "Method console salah",
      isActive: true,
      starterCode: "console.logs('Halo');",
      correctAnswer: null,
      buggyCode: "console.logs('Halo');",
      blocks: null,
      expectedOrder: null,
      sandboxEnabled: false,
      sandboxTemplate: null,
      sandboxLevel: null,
      content: {
        language: "javascript",
        buggyCode: "console.logs('Halo');",
        correctAnswer:
          '{"html":"","css":"","javascript":"console.log(\'Halo\');"}',
        sandboxEnabled: false,
        sandboxTemplate: null,
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput:
            '{"html":"","css":"","javascript":"console.log(\'Halo\');"}',
        },
      ],
    },

    {
      levelId: 3,
      levelName: "JavaScript Novice",
      title: "Perbaiki Query Selector",
      description: "Perbaiki querySelector berikut",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.FIX_THE_BUG,
      idealTime: 80,
      xpBase: 10,
      hint: "Method salah penulisan",
      isActive: true,
      starterCode: "document.queryselecter('p');",
      correctAnswer: null,
      buggyCode: "document.queryselecter('p');",
      blocks: null,
      expectedOrder: null,
      sandboxEnabled: false,
      sandboxTemplate: null,
      sandboxLevel: null,
      content: {
        language: "javascript",
        buggyCode: "document.queryselecter('p');",
        correctAnswer:
          '{"html":"<p>Hello</p>","css":"","javascript":"document.querySelector(\'p\');"}',
        sandboxEnabled: false,
        sandboxTemplate: null,
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput:
            '{"html":"<p>Hello</p>","css":"","javascript":"document.querySelector(\'p\');"}',
        },
      ],
    },
    {
      levelId: 3,
      levelName: "JavaScript Novice",
      title: "Mengubah Text DOM",
      description: "Ubah isi heading menggunakan JavaScript",
      difficulty: Difficulty.MEDIUM,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 140,
      xpBase: 20,
      hint: "Gunakan innerText",
      isActive: true,
      starterCode:
        '{"html":"<h1 id=\\"judul\\">Halo</h1>","css":"","javascript":""}',
      correctAnswer: null,
      buggyCode: null,
      blocks: null,
      expectedOrder: null,
      sandboxEnabled: false,
      sandboxTemplate: null,
      sandboxLevel: null,
      content: {
        language: "javascript",
        starterCode:
          '{"html":"<h1 id=\\"judul\\">Halo</h1>","css":"","javascript":""}',
        sandboxLevel: null,
        correctAnswer:
          '{"html":"<h1 id=\\"judul\\">Halo</h1>","css":"","javascript":"document.getElementById(\'judul\').innerText = \'Belajar JavaScript\';"}',
        sandboxEnabled: false,
        sandboxTemplate: null,
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput:
            '{"html":"<h1 id=\\"judul\\">Halo</h1>","css":"","javascript":"document.getElementById(\'judul\').innerText = \'Belajar JavaScript\';"}',
        },
      ],
    },

    {
      levelId: 3,
      levelName: "JavaScript Novice",
      title: "Membuat Object Sederhana",
      description: "Buatlah object mahasiswa dengan properti nama dan jurusan",
      difficulty: Difficulty.MEDIUM,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 120,
      xpBase: 20,
      hint: "Gunakan kurung kurawal {}",
      isActive: true,
      starterCode: '{"html":"","css":"","javascript":"let mahasiswa = ;"}',
      correctAnswer: null,
      buggyCode: null,
      blocks: null,
      expectedOrder: null,
      sandboxEnabled: false,
      sandboxTemplate: null,
      sandboxLevel: null,
      content: {
        language: "javascript",
        starterCode: '{"html":"","css":"","javascript":"let mahasiswa = ;"}',
        sandboxLevel: null,
        correctAnswer: '{"html":"","css":"","javascript":"let mahasiswa = {\\n  nama: \'Budi\',\\n  jurusan: \'Informatika\'\\n};"}',
        sandboxEnabled: false,
        sandboxTemplate: null,
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput: '{"html":"","css":"","javascript":"let mahasiswa = {\\n  nama: \'Budi\',\\n  jurusan: \'Informatika\'\\n};"}',
        },
      ],
    },

    {
      levelId: 3,
      levelName: "JavaScript Novice",
      title: "Counter Sederhana",
      description: "Buat counter sederhana menggunakan JavaScript",
      difficulty: Difficulty.MEDIUM,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 180,
      xpBase: 20,
      hint: "Gunakan variabel count",
      isActive: true,
      starterCode:
        '{"html":"<p id=\\"count\\">0</p>","css":"","javascript":"let count = 0;"}',
      correctAnswer: null,
      buggyCode: null,
      blocks: null,
      expectedOrder: null,
      sandboxEnabled: false,
      sandboxTemplate: null,
      sandboxLevel: null,
      content: {
        language: "javascript",
        starterCode:
          '{"html":"<p id=\\"count\\">0</p>","css":"","javascript":"let count = 0;"}',
        sandboxLevel: null,
        correctAnswer:
          '{"html":"<p id=\\"count\\">0</p>","css":"","javascript":"let count = 0;\\ncount++;\\ndocument.getElementById(\'count\').innerText = count;"}',
        sandboxEnabled: false,
        sandboxTemplate: null,
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput:
            '{"html":"<p id=\\"count\\">0</p>","css":"","javascript":"let count = 0;\\ncount++;\\ndocument.getElementById(\'count\').innerText = count;"}',
        },
      ],
    },

    {
      levelId: 3,
      levelName: "JavaScript Novice",
      title: "Event Click Button",
      description: "Tambahkan event click pada button",
      difficulty: Difficulty.MEDIUM,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 160,
      xpBase: 20,
      hint: "Gunakan addEventListener",
      isActive: true,
      starterCode:
        '{"html":"<button id=\\"btn\\">Klik</button>","css":"","javascript":""}',
      correctAnswer: null,
      buggyCode: null,
      blocks: null,
      expectedOrder: null,
      sandboxEnabled: false,
      sandboxTemplate: null,
      sandboxLevel: null,
      content: {
        language: "javascript",
        starterCode:
          '{"html":"<button id=\\"btn\\">Klik</button>","css":"","javascript":""}',
        sandboxLevel: null,
        correctAnswer:
          '{"html":"<button id=\\"btn\\">Klik</button>","css":"","javascript":"document.getElementById(\'btn\').addEventListener(\'click\', function() {\\n console.log(\'Button diklik\');\\n});"}',
        sandboxEnabled: false,
        sandboxTemplate: null,
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput:
            '{"html":"<button id=\\"btn\\">Klik</button>","css":"","javascript":"document.getElementById(\'btn\').addEventListener(\'click\', function() {\\n console.log(\'Button diklik\');\\n});"}',
        },
      ],
    },

    {
      levelId: 3,
      levelName: "JavaScript Novice",
      title: "Susun Event Listener",
      description: "Susun event listener JavaScript",
      difficulty: Difficulty.MEDIUM,
      method: ChallengeMethod.DRAG_AND_DROP,
      idealTime: 120,
      xpBase: 20,
      hint: "Gunakan addEventListener",
      isActive: true,
      starterCode: null,
      correctAnswer: null,
      buggyCode: null,
      blocks: [
        "button.addEventListener('click', klik);",
        "const button = document.querySelector('button');",
        "function klik() {}",
      ],
      expectedOrder: [
        "const button = document.querySelector('button');",
        "function klik() {}",
        "button.addEventListener('click', klik);",
      ],
      sandboxEnabled: false,
      sandboxTemplate: null,
      sandboxLevel: null,
      content: {
        language: "javascript",
        blocks: [
          "button.addEventListener('click', klik);",
          "const button = document.querySelector('button');",
          "function klik() {}",
        ],
        expectedOrder: [
          "const button = document.querySelector('button');",
          "function klik() {}",
          "button.addEventListener('click', klik);",
        ],
        sandboxEnabled: false,
        sandboxTemplate: null,
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput:
            "const button = document.querySelector('button');\\nfunction klik() {}\\nbutton.addEventListener('click', klik);",
        },
      ],
    },

    {
      levelId: 3,
      levelName: "JavaScript Novice",
      title: "Susun For Loop",
      description: "Susun perulangan for JavaScript",
      difficulty: Difficulty.MEDIUM,
      method: ChallengeMethod.DRAG_AND_DROP,
      idealTime: 120,
      xpBase: 20,
      hint: "Gunakan for loop",
      isActive: true,
      starterCode: null,
      correctAnswer: null,
      buggyCode: null,
      blocks: ["console.log(i);", "for(let i = 0; i < 5; i++) {", "}"],
      expectedOrder: ["for(let i = 0; i < 5; i++) {", "console.log(i);", "}"],
      sandboxEnabled: false,
      sandboxTemplate: null,
      sandboxLevel: null,
      content: {
        language: "javascript",
        blocks: ["console.log(i);", "for(let i = 0; i < 5; i++) {", "}"],
        expectedOrder: ["for(let i = 0; i < 5; i++) {", "console.log(i);", "}"],
        sandboxEnabled: false,
        sandboxTemplate: null,
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput: "for(let i = 0; i < 5; i++) {\\nconsole.log(i);\\n}",
        },
      ],
    },

    {
      levelId: 3,
      levelName: "JavaScript Novice",
      title: "Perbaiki addEventListener",
      description: "Perbaiki syntax addEventListener berikut",
      difficulty: Difficulty.MEDIUM,
      method: ChallengeMethod.FIX_THE_BUG,
      idealTime: 100,
      xpBase: 20,
      hint: "Method salah penulisan",
      isActive: true,
      starterCode: "button.addEventlistner('click', test);",
      correctAnswer: null,
      buggyCode: "button.addEventlistner('click', test);",
      blocks: null,
      expectedOrder: null,
      sandboxEnabled: false,
      sandboxTemplate: null,
      sandboxLevel: null,
      content: {
        language: "javascript",
        buggyCode: "button.addEventlistner('click', test);",
        correctAnswer:
          '{"html":"<button>Test</button>","css":"","javascript":"button.addEventListener(\'click\', test);"}',
        sandboxEnabled: false,
        sandboxTemplate: null,
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput:
            '{"html":"<button>Test</button>","css":"","javascript":"button.addEventListener(\'click\', test);"}',
        },
      ],
    },

    {
      levelId: 3,
      levelName: "JavaScript Novice",
      title: "Perbaiki Array Push",
      description: "Perbaiki method push berikut",
      difficulty: Difficulty.MEDIUM,
      method: ChallengeMethod.FIX_THE_BUG,
      idealTime: 90,
      xpBase: 20,
      hint: "Method push salah",
      isActive: true,
      starterCode: "data.psuh('HTML');",
      correctAnswer: null,
      buggyCode: "data.psuh('HTML');",
      blocks: null,
      expectedOrder: null,
      sandboxEnabled: false,
      sandboxTemplate: null,
      sandboxLevel: null,
      content: {
        language: "javascript",
        buggyCode: "data.psuh('HTML');",
        correctAnswer:
          '{"html":"","css":"","javascript":"data.push(\'HTML\');"}',
        sandboxEnabled: false,
        sandboxTemplate: null,
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput:
            '{"html":"","css":"","javascript":"data.push(\'HTML\');"}',
        },
      ],
    },

    {
      levelId: 3,
      levelName: "JavaScript Novice",
      title: "Dark Mode Sederhana",
      description: "Buat fitur dark mode menggunakan classList",
      difficulty: Difficulty.MEDIUM,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 180,
      xpBase: 20,
      hint: "Gunakan classList.toggle",
      isActive: true,
      starterCode:
        '{"html":"<button onclick=\\"darkMode()\\">Dark Mode</button>","css":".dark { background-color: black; color: white; }","javascript":""}',
      correctAnswer: null,
      buggyCode: null,
      blocks: null,
      expectedOrder: null,
      sandboxEnabled: false,
      sandboxTemplate: null,
      sandboxLevel: null,
      content: {
        language: "javascript",
        starterCode:
          '{"html":"<button onclick=\\"darkMode()\\">Dark Mode</button>","css":".dark { background-color: black; color: white; }","javascript":""}',
        sandboxLevel: null,
        correctAnswer:
          '{"html":"<button onclick=\\"darkMode()\\">Dark Mode</button>","css":".dark { background-color: black; color: white; }","javascript":"function darkMode() {\\n document.body.classList.toggle(\'dark\');\\n}"}',
        sandboxEnabled: false,
        sandboxTemplate: null,
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput:
            '{"html":"<button onclick=\\"darkMode()\\">Dark Mode</button>","css":".dark { background-color: black; color: white; }","javascript":"function darkMode() {\\n document.body.classList.toggle(\'dark\');\\n}"}',
        },
      ],
    },

    {
      levelId: 3,
      levelName: "JavaScript Novice",
      title: "Menampilkan Data Array",
      description: "Tampilkan isi array ke console",
      difficulty: Difficulty.MEDIUM,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 150,
      xpBase: 20,
      hint: "Gunakan for of",
      isActive: true,
      starterCode:
        '{"html":"","css":"","javascript":"const data = [\'HTML\', \'CSS\', \'JS\'];"}',
      correctAnswer: null,
      buggyCode: null,
      blocks: null,
      expectedOrder: null,
      sandboxEnabled: false,
      sandboxTemplate: null,
      sandboxLevel: null,
      content: {
        language: "javascript",
        starterCode:
          '{"html":"","css":"","javascript":"const data = [\'HTML\', \'CSS\', \'JS\'];"}',
        sandboxLevel: null,
        correctAnswer:
          '{"html":"","css":"","javascript":"const data = [\'HTML\', \'CSS\', \'JS\'];\\nfor(let item of data) {\\n console.log(item);\\n}"}',
        sandboxEnabled: false,
        sandboxTemplate: null,
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput:
            '{"html":"","css":"","javascript":"const data = [\'HTML\', \'CSS\', \'JS\'];\\nfor(let item of data) {\\n console.log(item);\\n}"}',
        },
      ],
    },

    {
      levelId: 3,
      levelName: "JavaScript Novice",
      title: "Perbaiki Arrow Function",
      description: "Perbaiki syntax arrow function berikut",
      difficulty: Difficulty.MEDIUM,
      method: ChallengeMethod.FIX_THE_BUG,
      idealTime: 100,
      xpBase: 20,
      hint: "Arrow function salah syntax",
      isActive: true,
      starterCode: "const test = () = > {\\n console.log('Hello');\\n}",
      correctAnswer: null,
      buggyCode: "const test = () = > {\\n console.log('Hello');\\n}",
      blocks: null,
      expectedOrder: null,
      sandboxEnabled: false,
      sandboxTemplate: null,
      sandboxLevel: null,
      content: {
        language: "javascript",
        buggyCode: "const test = () = > {\\n console.log('Hello');\\n}",
        correctAnswer:
          '{"html":"","css":"","javascript":"const test = () => {\\n console.log(\'Hello\');\\n}"}',
        sandboxEnabled: false,
        sandboxTemplate: null,
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput:
            '{"html":"","css":"","javascript":"const test = () => {\\n console.log(\'Hello\');\\n}"}',
        },
      ],
    },
    {
      levelId: 3,
      levelName: "JavaScript Novice",
      title: "Todo List Sederhana",
      description: "Tambahkan item todo ke dalam list",
      difficulty: Difficulty.HARD,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 240,
      xpBase: 30,
      hint: "Gunakan createElement dan appendChild",
      isActive: true,
      starterCode:
        '{"html":"<input id=\\"todo\\">\\n<button onclick=\\"tambahTodo()\\">Tambah</button>\\n<ul id=\\"list\\"></ul>","css":"","javascript":""}',
      correctAnswer: null,
      buggyCode: null,
      blocks: null,
      expectedOrder: null,
      sandboxEnabled: false,
      sandboxTemplate: null,
      sandboxLevel: null,
      content: {
        language: "javascript",
        starterCode:
          '{"html":"<input id=\\"todo\\">\\n<button onclick=\\"tambahTodo()\\">Tambah</button>\\n<ul id=\\"list\\"></ul>","css":"","javascript":""}',
        sandboxLevel: null,
        correctAnswer:
          '{"html":"<input id=\\"todo\\">\\n<button onclick=\\"tambahTodo()\\">Tambah</button>\\n<ul id=\\"list\\"></ul>","css":"","javascript":"function tambahTodo() {\\n const text = document.getElementById(\'todo\').value;\\n const li = document.createElement(\'li\');\\n li.innerText = text;\\n document.getElementById(\'list\').appendChild(li);\\n}"}',
        sandboxEnabled: false,
        sandboxTemplate: null,
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput:
            '{"html":"<input id=\\"todo\\">\\n<button onclick=\\"tambahTodo()\\">Tambah</button>\\n<ul id=\\"list\\"></ul>","css":"","javascript":"function tambahTodo() {\\n const text = document.getElementById(\'todo\').value;\\n const li = document.createElement(\'li\');\\n li.innerText = text;\\n document.getElementById(\'list\').appendChild(li);\\n}"}',
        },
      ],
    },

    {
      levelId: 3,
      levelName: "JavaScript Novice",
      title: "Fetch API Sederhana",
      description: "Ambil data menggunakan fetch API",
      difficulty: Difficulty.HARD,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 240,
      xpBase: 30,
      hint: "Gunakan fetch()",
      isActive: true,
      starterCode:
        '{"html":"<button onclick=\\"getData()\\">Load</button>","css":"","javascript":""}',
      correctAnswer: null,
      buggyCode: null,
      blocks: null,
      expectedOrder: null,
      sandboxEnabled: false,
      sandboxTemplate: null,
      sandboxLevel: null,
      content: {
        language: "javascript",
        starterCode:
          '{"html":"<button onclick=\\"getData()\\">Load</button>","css":"","javascript":""}',
        sandboxLevel: null,
        correctAnswer:
          '{"html":"<button onclick=\\"getData()\\">Load</button>","css":"","javascript":"async function getData() {\\n const response = await fetch(\'https://jsonplaceholder.typicode.com/posts/1\');\\n const data = await response.json();\\n console.log(data);\\n}"}',
        sandboxEnabled: false,
        sandboxTemplate: null,
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput:
            '{"html":"<button onclick=\\"getData()\\">Load</button>","css":"","javascript":"async function getData() {\\n const response = await fetch(\'https://jsonplaceholder.typicode.com/posts/1\');\\n const data = await response.json();\\n console.log(data);\\n}"}',
        },
      ],
    },

    {
      levelId: 3,
      levelName: "JavaScript Novice",
      title: "Filter Array",
      description: "Gunakan filter untuk mengambil angka lebih dari 5",
      difficulty: Difficulty.HARD,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 220,
      xpBase: 30,
      hint: "Gunakan filter()",
      isActive: true,
      starterCode:
        '{"html":"","css":"","javascript":"const angka = [1,2,3,6,7,8];"}',
      correctAnswer: null,
      buggyCode: null,
      blocks: null,
      expectedOrder: null,
      sandboxEnabled: false,
      sandboxTemplate: null,
      sandboxLevel: null,
      content: {
        language: "javascript",
        starterCode:
          '{"html":"","css":"","javascript":"const angka = [1,2,3,6,7,8];"}',
        sandboxLevel: null,
        correctAnswer:
          '{"html":"","css":"","javascript":"const angka = [1,2,3,6,7,8];\\nconst hasil = angka.filter(item => item > 5);\\nconsole.log(hasil);"}',
        sandboxEnabled: false,
        sandboxTemplate: null,
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput:
            '{"html":"","css":"","javascript":"const angka = [1,2,3,6,7,8];\\nconst hasil = angka.filter(item => item > 5);\\nconsole.log(hasil);"}',
        },
      ],
    },

    {
      levelId: 3,
      levelName: "JavaScript Novice",
      title: "Susun Async Function",
      description: "Susun async function JavaScript",
      difficulty: Difficulty.HARD,
      method: ChallengeMethod.DRAG_AND_DROP,
      idealTime: 180,
      xpBase: 30,
      hint: "Gunakan async dan await",
      isActive: true,
      starterCode: null,
      correctAnswer: null,
      buggyCode: null,
      blocks: [
        "const data = await fetch(url);",
        "async function getData() {",
        "}",
      ],
      expectedOrder: [
        "async function getData() {",
        "const data = await fetch(url);",
        "}",
      ],
      sandboxEnabled: false,
      sandboxTemplate: null,
      sandboxLevel: null,
      content: {
        language: "javascript",
        blocks: [
          "const data = await fetch(url);",
          "async function getData() {",
          "}",
        ],
        expectedOrder: [
          "async function getData() {",
          "const data = await fetch(url);",
          "}",
        ],
        sandboxEnabled: false,
        sandboxTemplate: null,
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput:
            "async function getData() {\\nconst data = await fetch(url);\\n}",
        },
      ],
    },

    {
      levelId: 3,
      levelName: "JavaScript Novice",
      title: "Susun Try Catch",
      description: "Susun blok try catch JavaScript",
      difficulty: Difficulty.HARD,
      method: ChallengeMethod.DRAG_AND_DROP,
      idealTime: 160,
      xpBase: 30,
      hint: "Gunakan try catch",
      isActive: true,
      starterCode: null,
      correctAnswer: null,
      buggyCode: null,
      blocks: ["console.log(error);", "try {", "} catch(error) {", "}"],
      expectedOrder: ["try {", "} catch(error) {", "console.log(error);", "}"],
      sandboxEnabled: false,
      sandboxTemplate: null,
      sandboxLevel: null,
      content: {
        language: "javascript",
        blocks: ["console.log(error);", "try {", "} catch(error) {", "}"],
        expectedOrder: [
          "try {",
          "} catch(error) {",
          "console.log(error);",
          "}",
        ],
        sandboxEnabled: false,
        sandboxTemplate: null,
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput: "try {\\n} catch(error) {\\nconsole.log(error);\\n}",
        },
      ],
    },

    {
      levelId: 3,
      levelName: "JavaScript Novice",
      title: "Susun Map Array",
      description: "Susun penggunaan map array",
      difficulty: Difficulty.HARD,
      method: ChallengeMethod.DRAG_AND_DROP,
      idealTime: 160,
      xpBase: 30,
      hint: "Gunakan map()",
      isActive: true,
      starterCode: null,
      correctAnswer: null,
      buggyCode: null,
      blocks: [
        "const hasil = angka.map(item => item * 2);",
        "const angka = [1,2,3];",
      ],
      expectedOrder: [
        "const angka = [1,2,3];",
        "const hasil = angka.map(item => item * 2);",
      ],
      sandboxEnabled: false,
      sandboxTemplate: null,
      sandboxLevel: null,
      content: {
        language: "javascript",
        blocks: [
          "const hasil = angka.map(item => item * 2);",
          "const angka = [1,2,3];",
        ],
        expectedOrder: [
          "const angka = [1,2,3];",
          "const hasil = angka.map(item => item * 2);",
        ],
        sandboxEnabled: false,
        sandboxTemplate: null,
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput:
            "const angka = [1,2,3];\\nconst hasil = angka.map(item => item * 2);",
        },
      ],
    },

    {
      levelId: 3,
      levelName: "JavaScript Novice",
      title: "Perbaiki JSON Parse",
      description: "Perbaiki method JSON berikut",
      difficulty: Difficulty.HARD,
      method: ChallengeMethod.FIX_THE_BUG,
      idealTime: 100,
      xpBase: 30,
      hint: "Method JSON salah",
      isActive: true,
      starterCode: "JSON.parsing(data);",
      correctAnswer: null,
      buggyCode: "JSON.parsing(data);",
      blocks: null,
      expectedOrder: null,
      sandboxEnabled: false,
      sandboxTemplate: null,
      sandboxLevel: null,
      content: {
        language: "javascript",
        buggyCode: "JSON.parsing(data);",
        correctAnswer: '{"html":"","css":"","javascript":"JSON.parse(data);"}',
        sandboxEnabled: false,
        sandboxTemplate: null,
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput:
            '{"html":"","css":"","javascript":"JSON.parse(data);"}',
        },
      ],
    },

    {
      levelId: 3,
      levelName: "JavaScript Novice",
      title: "Perbaiki Await",
      description: "Perbaiki penggunaan await berikut",
      difficulty: Difficulty.HARD,
      method: ChallengeMethod.FIX_THE_BUG,
      idealTime: 100,
      xpBase: 30,
      hint: "await harus berada di dalam async function",
      isActive: true,
      starterCode: "function test() {\\n await fetch(url);\\n}",
      correctAnswer: null,
      buggyCode: "function test() {\\n await fetch(url);\\n}",
      blocks: null,
      expectedOrder: null,
      sandboxEnabled: false,
      sandboxTemplate: null,
      sandboxLevel: null,
      content: {
        language: "javascript",
        buggyCode: "function test() {\\n await fetch(url);\\n}",
        correctAnswer:
          '{"html":"","css":"","javascript":"async function test() {\\n await fetch(url);\\n}"}',
        sandboxEnabled: false,
        sandboxTemplate: null,
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput:
            '{"html":"","css":"","javascript":"async function test() {\\n await fetch(url);\\n}"}',
        },
      ],
    },

    {
      levelId: 3,
      levelName: "JavaScript Novice",
      title: "Validasi Login",
      description: "Buat validasi login sederhana",
      difficulty: Difficulty.HARD,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 260,
      xpBase: 30,
      hint: "Gunakan if dan value",
      isActive: true,
      starterCode:
        '{"html":"<input id=\\"username\\">\\n<input id=\\"password\\">\\n<button onclick=\\"login()\\">Login</button>","css":"","javascript":""}',
      correctAnswer: null,
      buggyCode: null,
      blocks: null,
      expectedOrder: null,
      sandboxEnabled: false,
      sandboxTemplate: null,
      sandboxLevel: null,
      content: {
        language: "javascript",
        starterCode:
          '{"html":"<input id=\\"username\\">\\n<input id=\\"password\\">\\n<button onclick=\\"login()\\">Login</button>","css":"","javascript":""}',
        sandboxLevel: null,
        correctAnswer:
          '{"html":"<input id=\\"username\\">\\n<input id=\\"password\\">\\n<button onclick=\\"login()\\">Login</button>","css":"","javascript":"function login() {\\n const username = document.getElementById(\'username\').value;\\n const password = document.getElementById(\'password\').value;\\n\\n if(username === \'admin\' && password === \'123\') {\\n  alert(\'Login berhasil\');\\n } else {\\n  alert(\'Login gagal\');\\n }\\n}"}',
        sandboxEnabled: false,
        sandboxTemplate: null,
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput:
            '{"html":"<input id=\\"username\\">\\n<input id=\\"password\\">\\n<button onclick=\\"login()\\">Login</button>","css":"","javascript":"function login() {\\n const username = document.getElementById(\'username\').value;\\n const password = document.getElementById(\'password\').value;\\n\\n if(username === \'admin\' && password === \'123\') {\\n  alert(\'Login berhasil\');\\n } else {\\n  alert(\'Login gagal\');\\n }\\n}"}',
        },
      ],
    },

    {
      levelId: 3,
      levelName: "JavaScript Novice",
      title: "Manipulasi DOM Lengkap",
      description: "Manipulasi DOM menggunakan JavaScript",
      difficulty: Difficulty.HARD,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 300,
      xpBase: 30,
      hint: "Gunakan DOM dan event listener",
      isActive: true,
      starterCode:
        '{"html":"<!DOCTYPE html>\\n<html lang=\\"id\\">\\n<head>\\n<meta charset=\\"UTF-8\\">\\n<title>Latihan DOM</title>\\n</head>\\n<body>\\n<h1 id=\\"judul\\">Halo Dunia!</h1>\\n<p class=\\"teks\\">Teks ini akan diubah oleh JavaScript.</p>\\n<button id=\\"tombol\\">Ubah Halaman</button>\\n<script src=\\"script.js\\"></script>\\n</body>\\n</html>","css":"","javascript":""}',
      correctAnswer: null,
      buggyCode: null,
      blocks: null,
      expectedOrder: null,
      sandboxEnabled: false,
      sandboxTemplate: null,
      sandboxLevel: null,
      content: {
        language: "javascript",
        starterCode:
          '{"html":"<!DOCTYPE html>\\n<html lang=\\"id\\">\\n<head>\\n<meta charset=\\"UTF-8\\">\\n<title>Latihan DOM</title>\\n</head>\\n<body>\\n<h1 id=\\"judul\\">Halo Dunia!</h1>\\n<p class=\\"teks\\">Teks ini akan diubah oleh JavaScript.</p>\\n<button id=\\"tombol\\">Ubah Halaman</button>\\n<script src=\\"script.js\\"></script>\\n</body>\\n</html>","css":"","javascript":""}',
        sandboxLevel: null,
        correctAnswer:
          '{"html":"<!DOCTYPE html>\\n<html lang=\\"id\\">\\n<head>\\n<meta charset=\\"UTF-8\\">\\n<title>Latihan DOM</title>\\n</head>\\n<body>\\n<h1 id=\\"judul\\">Halo Dunia!</h1>\\n<p class=\\"teks\\">Teks ini akan diubah oleh JavaScript.</p>\\n<button id=\\"tombol\\">Ubah Halaman</button>\\n<script src=\\"script.js\\"></script>\\n</body>\\n</html>","css":"","javascript":"const judul = document.getElementById(\'judul\');\\nconst paragraf = document.querySelector(\'.teks\');\\nconst tombol = document.getElementById(\'tombol\');\\n\\njudul.textContent = \'Belajar DOM\';\\njudul.style.color = \'blue\';\\n\\ntombol.addEventListener(\'click\', function() {\\n paragraf.textContent = \'Teks berhasil diubah\';\\n paragraf.style.backgroundColor = \'yellow\';\\n});"}',
        sandboxEnabled: false,
        sandboxTemplate: null,
      },
      testCases: [
        {
          input: null,
          weight: 100,
          isHidden: false,
          expectedOutput:
            '{"html":"<!DOCTYPE html>\\n<html lang=\\"id\\">\\n<head>\\n<meta charset=\\"UTF-8\\">\\n<title>Latihan DOM</title>\\n</head>\\n<body>\\n<h1 id=\\"judul\\">Halo Dunia!</h1>\\n<p class=\\"teks\\">Teks ini akan diubah oleh JavaScript.</p>\\n<button id=\\"tombol\\">Ubah Halaman</button>\\n<script src=\\"script.js\\"></script>\\n</body>\\n</html>","css":"","javascript":"const judul = document.getElementById(\'judul\');\\nconst paragraf = document.querySelector(\'.teks\');\\nconst tombol = document.getElementById(\'tombol\');\\n\\njudul.textContent = \'Belajar DOM\';\\njudul.style.color = \'blue\';\\n\\ntombol.addEventListener(\'click\', function() {\\n paragraf.textContent = \'Teks berhasil diubah\';\\n paragraf.style.backgroundColor = \'yellow\';\\n});"}',
        },
      ],
    },
  ];

  for (const c of javascriptChallenges) {
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

  console.log("✅ Challenge Level 3 JavaScript seeding completed!");
}

const p = new PrismaClient();
seedLevel3Challenge(p)
  .catch(console.error)
  .finally(() => p.$disconnect());
