import { PrismaClient, Difficulty, ChallengeMethod } from "@prisma/client";

export async function seedLevel2Challenge(prisma: PrismaClient) {
  console.log("🌱 Seeding Challenge Level 2: CSS Styling...");

    const cssChallenges = [
  {
    levelId: 2,
    levelName: "CSS Styling",
    title: "Beri Warna Teks",
    description: "Beri warna biru pada teks paragraf",
    difficulty: Difficulty.EASY,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 80,
    xpBase: 10,
    hint: "Gunakan property color",
    isActive: true,
    starterCode:
      "{\"html\":\"<p>Warnai teks ini</p>\",\"css\":\"p {\\r\\n  \\r\\n}\"}",
    correctAnswer: null,
    buggyCode: null,
    blocks: null,
    expectedOrder: null,
    sandboxEnabled: false,
    sandboxTemplate: null,
    sandboxLevel: null,
    content: {
      language: "html",
      starterCode:
        "{\"html\":\"<p>Warnai teks ini</p>\",\"css\":\"p {\\r\\n  \\r\\n}\"}",
      correctAnswer:
        "{\"html\":\"<p>Warnai teks ini</p>\",\"css\":\"p {\\r\\n  color: blue;\\r\\n}\"}",
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput:
          "{\"html\":\"<p>Warnai teks ini</p>\",\"css\":\"p {\\r\\n  color: blue;\\r\\n}\"}",
      },
    ],
  },

  {
    levelId: 2,
    levelName: "CSS Styling",
    title: "Atur Ukuran Font",
    description: "Atur ukuran font menjadi 24px",
    difficulty: Difficulty.EASY,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 90,
    xpBase: 10,
    hint: "Gunakan font-size",
    isActive: true,
    starterCode:
      "{\"html\":\"<h1>Belajar CSS</h1>\",\"css\":\"h1 {\\r\\n\\r\\n}\"}",
    correctAnswer: null,
    buggyCode: null,
    blocks: null,
    expectedOrder: null,
    sandboxEnabled: false,
    sandboxTemplate: null,
    sandboxLevel: null,
    content: {
      language: "html",
      starterCode:
        "{\"html\":\"<h1>Belajar CSS</h1>\",\"css\":\"h1 {\\r\\n\\r\\n}\"}",
      correctAnswer:
        "{\"html\":\"<h1>Belajar CSS</h1>\",\"css\":\"h1 {\\r\\n  font-size: 24px;\\r\\n}\"}",
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput:
          "{\"html\":\"<h1>Belajar CSS</h1>\",\"css\":\"h1 {\\r\\n  font-size: 24px;\\r\\n}\"}",
      },
    ],
  },

  {
    levelId: 2,
    levelName: "CSS Styling",
    title: "Background Color",
    description: "Tambahkan background kuning pada div",
    difficulty: Difficulty.EASY,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 90,
    xpBase: 10,
    hint: "Gunakan background-color",
    isActive: true,
    starterCode:
      "{\"html\":\"<div>Konten</div>\",\"css\":\"div {\\r\\n\\r\\n}\"}",
    correctAnswer: null,
    buggyCode: null,
    blocks: null,
    expectedOrder: null,
    sandboxEnabled: false,
    sandboxTemplate: null,
    sandboxLevel: null,
    content: {
      language: "html",
      starterCode:
        "{\"html\":\"<div>Konten</div>\",\"css\":\"div {\\r\\n\\r\\n}\"}",
      correctAnswer:
        "{\"html\":\"<div>Konten</div>\",\"css\":\"div {\\r\\n  background-color: yellow;\\r\\n}\"}",
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput:
          "{\"html\":\"<div>Konten</div>\",\"css\":\"div {\\r\\n  background-color: yellow;\\r\\n}\"}",
      },
    ],
  },

  {
    levelId: 2,
    levelName: "CSS Styling",
    title: "Susun Selector CSS",
    description: "Susun selector CSS agar valid",
    difficulty: Difficulty.EASY,
    method: ChallengeMethod.DRAG_AND_DROP,
    idealTime: 90,
    xpBase: 10,
    hint: "Gunakan selector p",
    isActive: true,
    starterCode: null,
    correctAnswer: null,
    buggyCode: null,
    blocks: ["}", "color: red;", "p {"],
    expectedOrder: ["p {", "color: red;", "}"],
    sandboxEnabled: false,
    sandboxTemplate: null,
    sandboxLevel: null,
    content: {
      language: "html",
      blocks: ["}", "color: red;", "p {"],
      expectedOrder: ["p {", "color: red;", "}"],
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput: "p {\\ncolor: red;\\n}",
      },
    ],
  },

  {
    levelId: 2,
    levelName: "CSS Styling",
    title: "Perbaiki Color Property",
    description: "Perbaiki property CSS berikut",
    difficulty: Difficulty.EASY,
    method: ChallengeMethod.FIX_THE_BUG,
    idealTime: 70,
    xpBase: 10,
    hint: "Property color salah",
    isActive: true,
    starterCode: "p {\\r\\n  colours: blue;\\r\\n}",
    correctAnswer: null,
    buggyCode: "p {\\r\\n  colours: blue;\\r\\n}",
    blocks: null,
    expectedOrder: null,
    sandboxEnabled: false,
    sandboxTemplate: null,
    sandboxLevel: null,
    content: {
      language: "html",
      buggyCode: "p {\\r\\n  colours: blue;\\r\\n}",
      correctAnswer:
        "{\"html\":\"<p>Hello</p>\",\"css\":\"p {\\r\\n  color: blue;\\r\\n}\"}",
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput:
          "{\"html\":\"<p>Hello</p>\",\"css\":\"p {\\r\\n  color: blue;\\r\\n}\"}",
      },
    ],
  },

  {
    levelId: 2,
    levelName: "CSS Styling",
    title: "Text Align",
    description: "Posisikan teks ke tengah",
    difficulty: Difficulty.EASY,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 80,
    xpBase: 10,
    hint: "Gunakan text-align",
    isActive: true,
    starterCode:
      "{\"html\":\"<h1>Judul</h1>\",\"css\":\"h1 {\\r\\n\\r\\n}\"}",
    correctAnswer: null,
    buggyCode: null,
    blocks: null,
    expectedOrder: null,
    sandboxEnabled: false,
    sandboxTemplate: null,
    sandboxLevel: null,
    content: {
      language: "html",
      starterCode:
        "{\"html\":\"<h1>Judul</h1>\",\"css\":\"h1 {\\r\\n\\r\\n}\"}",
      correctAnswer:
        "{\"html\":\"<h1>Judul</h1>\",\"css\":\"h1 {\\r\\n  text-align: center;\\r\\n}\"}",
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput:
          "{\"html\":\"<h1>Judul</h1>\",\"css\":\"h1 {\\r\\n  text-align: center;\\r\\n}\"}",
      },
    ],
  },

  {
    levelId: 2,
    levelName: "CSS Styling",
    title: "Susun Background CSS",
    description: "Susun background-color CSS",
    difficulty: Difficulty.EASY,
    method: ChallengeMethod.DRAG_AND_DROP,
    idealTime: 80,
    xpBase: 10,
    hint: "Gunakan background-color",
    isActive: true,
    starterCode: null,
    correctAnswer: null,
    buggyCode: null,
    blocks: ["}", "background-color: black;", "body {"],
    expectedOrder: ["body {", "background-color: black;", "}"],
    sandboxEnabled: false,
    sandboxTemplate: null,
    sandboxLevel: null,
    content: {
      language: "html",
      blocks: ["}", "background-color: black;", "body {"],
      expectedOrder: ["body {", "background-color: black;", "}"],
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput: "body {\\nbackground-color: black;\\n}",
      },
    ],
  },

  {
    levelId: 2,
    levelName: "CSS Styling",
    title: "Perbaiki Font Size",
    description: "Perbaiki syntax font-size",
    difficulty: Difficulty.EASY,
    method: ChallengeMethod.FIX_THE_BUG,
    idealTime: 70,
    xpBase: 10,
    hint: "Property salah penulisan",
    isActive: true,
    starterCode: "h1 {\\r\\n  fonts-size: 20px;\\r\\n}",
    correctAnswer: null,
    buggyCode: "h1 {\\r\\n  fonts-size: 20px;\\r\\n}",
    blocks: null,
    expectedOrder: null,
    sandboxEnabled: false,
    sandboxTemplate: null,
    sandboxLevel: null,
    content: {
      language: "html",
      buggyCode: "h1 {\\r\\n  fonts-size: 20px;\\r\\n}",
      correctAnswer:
        "{\"html\":\"<h1>Belajar CSS</h1>\",\"css\":\"h1 {\\r\\n  font-size: 20px;\\r\\n}\"}",
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput:
          "{\"html\":\"<h1>Belajar CSS</h1>\",\"css\":\"h1 {\\r\\n  font-size: 20px;\\r\\n}\"}",
      },
    ],
  },

  {
    levelId: 2,
    levelName: "CSS Styling",
    title: "Box Model Lengkap",
    description: "Tambahkan padding 15px, margin 10px, dan border 2px solid black pada box",
    difficulty: Difficulty.MEDIUM,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 120,
    xpBase: 20,
    hint: "Gunakan property padding, margin, dan border",
    isActive: true,
    starterCode:
      "{\"html\":\"<div class=\\\"box\\\">Box</div>\",\"css\":\".box {\\r\\n\\r\\n}\"}",
    content: {
      language: "html",
      starterCode:
        "{\"html\":\"<div class=\\\"box\\\">Box</div>\",\"css\":\".box {\\r\\n\\r\\n}\"}",
      correctAnswer:
        "{\"html\":\"<div class=\\\"box\\\">Box</div>\",\"css\":\".box {\\r\\n  padding: 15px;\\r\\n  margin: 10px;\\r\\n  border: 2px solid black;\\r\\n}\"}",
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput:
          "{\"html\":\"<div class=\\\"box\\\">Box</div>\",\"css\":\".box {\\r\\n  padding: 15px;\\r\\n  margin: 10px;\\r\\n  border: 2px solid black;\\r\\n}\"}",
      },
    ],
  },

  {
    levelId: 2,
    levelName: "CSS Styling",
    title: "Flexbox Tengah Vertikal Horizontal",
    description: "Gunakan flexbox untuk memposisikan konten di tengah secara vertikal dan horizontal",
    difficulty: Difficulty.MEDIUM,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 140,
    xpBase: 20,
    hint: "Gunakan justify-content dan align-items",
    isActive: true,
    starterCode:
      "{\"html\":\"<div class=\\\"container\\\">Konten</div>\",\"css\":\".container {\\r\\n  display: flex;\\r\\n\\r\\n}\"}",
    content: {
      language: "html",
      starterCode:
        "{\"html\":\"<div class=\\\"container\\\">Konten</div>\",\"css\":\".container {\\r\\n  display: flex;\\r\\n\\r\\n}\"}",
      correctAnswer:
        "{\"html\":\"<div class=\\\"container\\\">Konten</div>\",\"css\":\".container {\\r\\n  display: flex;\\r\\n  justify-content: center;\\r\\n  align-items: center;\\r\\n}\"}",
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput:
          "{\"html\":\"<div class=\\\"container\\\">Konten</div>\",\"css\":\".container {\\r\\n  display: flex;\\r\\n  justify-content: center;\\r\\n  align-items: center;\\r\\n}\"}",
      },
    ],
  },

  // =========================
  // MEDIUM
  // =========================

  {
    levelId: 2,
    levelName: "CSS Styling",
    title: "Susun Efek Transform Hover",
    description: "Susun efek agar tombol membesar saat di-hover",
    difficulty: Difficulty.MEDIUM,
    method: ChallengeMethod.DRAG_AND_DROP,
    idealTime: 120,
    xpBase: 20,
    hint: "Gunakan transform: scale",
    isActive: true,
    blocks: ["}", "transform: scale(1.1);", "button:hover {"],
    expectedOrder: ["button:hover {", "transform: scale(1.1);", "}"],
    content: {
      language: "html",
      blocks: ["}", "transform: scale(1.1);", "button:hover {"],
      expectedOrder: ["button:hover {", "transform: scale(1.1);", "}"],
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput: "button:hover {\\ntransform: scale(1.1);\\n}",
      },
    ],
  },

  {
    levelId: 2,
    levelName: "CSS Styling",
    title: "Perbaiki Shorthand Padding",
    description: "Perbaiki property padding yang kehilangan satuan pixel",
    difficulty: Difficulty.MEDIUM,
    method: ChallengeMethod.FIX_THE_BUG,
    idealTime: 100,
    xpBase: 20,
    hint: "Satuan px kurang pada angka 20",
    isActive: true,
    starterCode: "div {\\r\\n  padding: 10px 20 30px;\\r\\n}",
    buggyCode: "div {\\r\\n  padding: 10px 20 30px;\\r\\n}",
    content: {
      language: "html",
      buggyCode: "div {\\r\\n  padding: 10px 20 30px;\\r\\n}",
      correctAnswer:
        "{\"html\":\"<div>Box</div>\",\"css\":\"div {\\r\\n  padding: 10px 20px 30px;\\r\\n}\"}",
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput:
          "{\"html\":\"<div>Box</div>\",\"css\":\"div {\\r\\n  padding: 10px 20px 30px;\\r\\n}\"}",
      },
    ],
  },

  {
    levelId: 2,
    levelName: "CSS Styling",
    title: "Margin Auto",
    description: "Gunakan margin agar elemen berada di tengah secara otomatis",
    difficulty: Difficulty.MEDIUM,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 120,
    xpBase: 20,
    hint: "Gunakan margin: auto",
    isActive: true,
    starterCode:
      "{\"html\":\"<div class=\\\"card\\\">Card</div>\",\"css\":\".card {\\r\\n  width: 200px;\\r\\n\\r\\n}\"}",
    content: {
      language: "html",
      starterCode:
        "{\"html\":\"<div class=\\\"card\\\">Card</div>\",\"css\":\".card {\\r\\n  width: 200px;\\r\\n\\r\\n}\"}",
      correctAnswer:
        "{\"html\":\"<div class=\\\"card\\\">Card</div>\",\"css\":\".card {\\r\\n  width: 200px;\\r\\n  margin: auto;\\r\\n}\"}",
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput:
          "{\"html\":\"<div class=\\\"card\\\">Card</div>\",\"css\":\".card {\\r\\n  width: 200px;\\r\\n  margin: auto;\\r\\n}\"}",
      },
    ],
  },

  {
    levelId: 2,
    levelName: "CSS Styling",
    title: "Susun Circle Avatar",
    description: "Susun border-radius untuk membuat gambar lingkaran penuh",
    difficulty: Difficulty.MEDIUM,
    method: ChallengeMethod.DRAG_AND_DROP,
    idealTime: 120,
    xpBase: 20,
    hint: "Gunakan border-radius: 50%",
    isActive: true,
    blocks: ["}", "border-radius: 50%;", ".avatar {"],
    expectedOrder: [".avatar {", "border-radius: 50%;", "}"],
    content: {
      language: "html",
      blocks: ["}", "border-radius: 50%;", ".avatar {"],
      expectedOrder: [".avatar {", "border-radius: 50%;", "}"],
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput: ".avatar {\\nborder-radius: 50%;\\n}",
      },
    ],
  },

  {
    levelId: 2,
    levelName: "CSS Styling",
    title: "Perbaiki Properti Flexbox",
    description: "Perbaiki syntax align-items yang salah ketik",
    difficulty: Difficulty.MEDIUM,
    method: ChallengeMethod.FIX_THE_BUG,
    idealTime: 100,
    xpBase: 20,
    hint: "Terdapat huruf s tambahan pada property align-items",
    isActive: true,
    starterCode: ".container {\\r\\n  align-itemss: center;\\r\\n}",
    buggyCode: ".container {\\r\\n  align-itemss: center;\\r\\n}",
    content: {
      language: "html",
      buggyCode: ".container {\\r\\n  align-itemss: center;\\r\\n}",
      correctAnswer:
        "{\"html\":\"<div class=\\\"container\\\"></div>\",\"css\":\".container {\\r\\n  align-items: center;\\r\\n}\"}",
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput:
          "{\"html\":\"<div class=\\\"container\\\"></div>\",\"css\":\".container {\\r\\n  align-items: center;\\r\\n}\"}",
      },
    ],
  },

  // =========================
  // HARD
  // =========================

  {
    levelId: 2,
    levelName: "CSS Styling",
    title: "CSS Grid Layout Lengkap",
    description: "Buat layout grid 3 kolom dengan gap 20px",
    difficulty: Difficulty.HARD,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 180,
    xpBase: 30,
    hint: "Gunakan repeat(3, 1fr)",
    isActive: true,
    starterCode:
      "{\"html\":\"<div class=\\\"grid\\\"></div>\",\"css\":\".grid {\\r\\n  display: grid;\\r\\n\\r\\n}\"}",
    content: {
      language: "html",
      starterCode:
        "{\"html\":\"<div class=\\\"grid\\\"></div>\",\"css\":\".grid {\\r\\n  display: grid;\\r\\n\\r\\n}\"}",
      correctAnswer:
        "{\"html\":\"<div class=\\\"grid\\\"></div>\",\"css\":\".grid {\\r\\n  display: grid;\\r\\n  grid-template-columns: repeat(3, 1fr);\\r\\n  gap: 20px;\\r\\n}\"}",
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput:
          "{\"html\":\"<div class=\\\"grid\\\"></div>\",\"css\":\".grid {\\r\\n  display: grid;\\r\\n  grid-template-columns: repeat(3, 1fr);\\r\\n  gap: 20px;\\r\\n}\"}",
      },
    ],
  },

  {
    levelId: 2,
    levelName: "CSS Styling",
    title: "Susun Media Query",
    description: "Susun media query untuk responsive",
    difficulty: Difficulty.HARD,
    method: ChallengeMethod.DRAG_AND_DROP,
    idealTime: 180,
    xpBase: 30,
    hint: "Gunakan @media",
    isActive: true,
    starterCode: null,
    correctAnswer: null,
    buggyCode: null,
    blocks: [
      "}",
      "body {\\nfont-size: 14px;\\n}",
      "@media (max-width: 768px) {"
    ],
    expectedOrder: [
      "@media (max-width: 768px) {",
      "body {\\nfont-size: 14px;\\n}",
      "}"
    ],
    sandboxEnabled: false,
    sandboxTemplate: null,
    sandboxLevel: null,
    content: {
      language: "html",
      blocks: [
        "}",
        "body {\\nfont-size: 14px;\\n}",
        "@media (max-width: 768px) {"
      ],
      expectedOrder: [
        "@media (max-width: 768px) {",
        "body {\\nfont-size: 14px;\\n}",
        "}"
      ],
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput:
          "@media (max-width: 768px) {\\nbody {\\nfont-size: 14px;\\n}\\n}",
      },
    ],
  },

  {
    levelId: 2,
    levelName: "CSS Styling",
    title: "Perbaiki Media Query",
    description: "Perbaiki syntax media query",
    difficulty: Difficulty.HARD,
    method: ChallengeMethod.FIX_THE_BUG,
    idealTime: 120,
    xpBase: 30,
    hint: "Keyword media salah",
    isActive: true,
    starterCode:
      "@medias (max-width: 768px) {\\r\\nbody {\\r\\nfont-size: 14px;\\r\\n}\\r\\n}",
    correctAnswer: null,
    buggyCode:
      "@medias (max-width: 768px) {\\r\\nbody {\\r\\nfont-size: 14px;\\r\\n}\\r\\n}",
    blocks: null,
    expectedOrder: null,
    sandboxEnabled: false,
    sandboxTemplate: null,
    sandboxLevel: null,
    content: {
      language: "html",
      buggyCode:
        "@medias (max-width: 768px) {\\r\\nbody {\\r\\nfont-size: 14px;\\r\\n}\\r\\n}",
      correctAnswer:
        "{\"html\":\"<body></body>\",\"css\":\"@media (max-width: 768px) {\\r\\nbody {\\r\\nfont-size: 14px;\\r\\n}\\r\\n}\"}",
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput:
          "{\"html\":\"<body></body>\",\"css\":\"@media (max-width: 768px) {\\r\\nbody {\\r\\nfont-size: 14px;\\r\\n}\\r\\n}\"}",
      },
    ],
  },

  {
    levelId: 2,
    levelName: "CSS Styling",
    title: "Menggunakan ID Selector",
    description: "Beri warna merah pada elemen yang memiliki ID 'header-utama'.",
    difficulty: Difficulty.EASY,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 80,
    xpBase: 10,
    hint: "Gunakan tanda pagar (#)",
    isActive: true,
    starterCode:
      "{\"html\":\"<h1 id=\\\"header-utama\\\">Judul</h1>\",\"css\":\"/* Tulis CSS Anda di sini */\\r\\n\\r\\n\"}",
    content: {
      language: "html",
      starterCode:
        "{\"html\":\"<h1 id=\\\"header-utama\\\">Judul</h1>\",\"css\":\"/* Tulis CSS Anda di sini */\\r\\n\\r\\n\"}",
      correctAnswer:
        "{\"html\":\"<h1 id=\\\"header-utama\\\">Judul</h1>\",\"css\":\"#header-utama {\\r\\n  color: red;\\r\\n}\"}",
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput:
          "{\"html\":\"<h1 id=\\\"header-utama\\\">Judul</h1>\",\"css\":\"#header-utama {\\r\\n  color: red;\\r\\n}\"}",
      },
    ],
  },

  {
    levelId: 2,
    levelName: "CSS Styling",
    title: "Menyembunyikan Elemen",
    description: "Sembunyikan elemen dengan class 'hidden' menggunakan property display.",
    difficulty: Difficulty.MEDIUM,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 90,
    xpBase: 20,
    hint: "Gunakan display: none",
    isActive: true,
    starterCode:
      "{\"html\":\"<div class=\\\"hidden\\\">Rahasia</div>\",\"css\":\".hidden {\\r\\n\\r\\n}\"}",
    content: {
      language: "html",
      starterCode:
        "{\"html\":\"<div class=\\\"hidden\\\">Rahasia</div>\",\"css\":\".hidden {\\r\\n\\r\\n}\"}",
      correctAnswer:
        "{\"html\":\"<div class=\\\"hidden\\\">Rahasia</div>\",\"css\":\".hidden {\\r\\n  display: none;\\r\\n}\"}",
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput:
          "{\"html\":\"<div class=\\\"hidden\\\">Rahasia</div>\",\"css\":\".hidden {\\r\\n  display: none;\\r\\n}\"}",
      },
    ],
  },

  {
    levelId: 2,
    levelName: "CSS Styling",
    title: "Transisi Hover Halus",
    description: "Tambahkan efek transisi pada '.btn' agar perubahan background halus selama 0.3s.",
    difficulty: Difficulty.MEDIUM,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 120,
    xpBase: 20,
    hint: "Gunakan property transition",
    isActive: true,
    starterCode:
      "{\"html\":\"<button class=\\\"btn\\\">Klik</button>\",\"css\":\".btn {\\r\\n  background-color: blue;\\r\\n  \\r\\n}\\r\\n.btn:hover {\\r\\n  background-color: red;\\r\\n}\"}",
    content: {
      language: "html",
      starterCode:
        "{\"html\":\"<button class=\\\"btn\\\">Klik</button>\",\"css\":\".btn {\\r\\n  background-color: blue;\\r\\n  \\r\\n}\\r\\n.btn:hover {\\r\\n  background-color: red;\\r\\n}\"}",
      correctAnswer:
        "{\"html\":\"<button class=\\\"btn\\\">Klik</button>\",\"css\":\".btn {\\r\\n  background-color: blue;\\r\\n  transition: 0.3s;\\r\\n}\\r\\n.btn:hover {\\r\\n  background-color: red;\\r\\n}\"}",
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput:
          "{\"html\":\"<button class=\\\"btn\\\">Klik</button>\",\"css\":\".btn {\\r\\n  background-color: blue;\\r\\n  transition: 0.3s;\\r\\n}\\r\\n.btn:hover {\\r\\n  background-color: red;\\r\\n}\"}",
      },
    ],
  },

  {
    levelId: 2,
    levelName: "CSS Styling",
    title: "Position Absolute",
    description: "Posisikan elemen '.child' di sudut kanan atas '.parent' menggunakan absolute.",
    difficulty: Difficulty.HARD,
    method: ChallengeMethod.CODING_MANUAL,
    idealTime: 150,
    xpBase: 30,
    hint: "top 0, right 0",
    isActive: true,
    starterCode:
      "{\"html\":\"<div class=\\\"parent\\\"><div class=\\\"child\\\"></div></div>\",\"css\":\".parent {\\r\\n  position: relative;\\r\\n}\\r\\n.child {\\r\\n  \\r\\n}\"}",
    content: {
      language: "html",
      starterCode:
        "{\"html\":\"<div class=\\\"parent\\\"><div class=\\\"child\\\"></div></div>\",\"css\":\".parent {\\r\\n  position: relative;\\r\\n}\\r\\n.child {\\r\\n  \\r\\n}\"}",
      correctAnswer:
        "{\"html\":\"<div class=\\\"parent\\\"><div class=\\\"child\\\"></div></div>\",\"css\":\".parent {\\r\\n  position: relative;\\r\\n}\\r\\n.child {\\r\\n  position: absolute;\\r\\n  top: 0;\\r\\n  right: 0;\\r\\n}\"}",
    },
    testCases: [
      {
        input: null,
        weight: 100,
        isHidden: false,
        expectedOutput:
          "{\"html\":\"<div class=\\\"parent\\\"><div class=\\\"child\\\"></div></div>\",\"css\":\".parent {\\r\\n  position: relative;\\r\\n}\\r\\n.child {\\r\\n  position: absolute;\\r\\n  top: 0;\\r\\n  right: 0;\\r\\n}\"}",
      },
    ],
  }
];

  for (const c of cssChallenges) {
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

  console.log("✅ Challenge Level 2 CSS Styling seeding completed!");
}

const p = new PrismaClient();
seedLevel2Challenge(p)
  .catch(console.error)
  .finally(() => p.$disconnect());
