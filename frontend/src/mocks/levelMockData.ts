// Type Definitions
export interface MaterialSection {
  heading: string;
  content: string;
}

export interface MaterialContent {
  title: string;
  sections: MaterialSection[];
}

export type ChallengeType = 'coding' | 'drag-drop' | 'fix-bug' | 'scenario';

export interface DragItem {
  id: string;
  content: string;
}

export interface Challenge {
  id: string;
  title: string;
  type: ChallengeType;
  status: 'completed' | 'unlocked' | 'locked';
  xp: number;
  description: string;
  
  // Specific fields based on type
  initialCode?: string; // For coding & fix-bug
  correctCode?: string; // For verification
  hint?: string;
  
  // For Drag & Drop
  dragItems?: DragItem[];
  dragSolution?: string[]; // Array of IDs in correct order
  
  // For Scenario
  scenarioContext?: string;
  scenarioQuestion?: string;
  scenarioOptions?: { id: string; text: string; isCorrect: boolean }[]; // For multiple choice scenario
}

export interface LevelChallenges {
  easy: Challenge[];
  medium: Challenge[];
  hard: Challenge[];
}

export interface LevelData {
  title: string;
  description: string;
  materialContent: MaterialContent;
  challenges: LevelChallenges;
}

// Mock Data
export const mockLevelData: LevelData = {
  title: 'HTML Foundation',
  description: 'Pelajari dasar-dasar struktur web dengan HTML5.',
  materialContent: {
    title: "Pengenalan HTML & Struktur Dasar",
    sections: [
      { 
        heading: "Apa itu HTML?", 
        content: `HTML (HyperText Markup Language) adalah bahasa markup standar.
        
\`\`\`html
<!DOCTYPE html>
<html>
<body>
  <h1>Hello World</h1>
</body>
</html>
\`\`\`
` 
      },
      {
        heading: "Struktur Dokumen",
        content: `Struktur dasar HTML terdiri dari html, head, dan body.`
      }
    ]
  },
  challenges: {
    easy: [
      {
        id: 'e-0',
        title: 'Membuat Heading',
        type: 'coding',
        status: 'unlocked',
        xp: 10,
        description: 'Buatlah sebuah heading level 1 (h1) dengan teks "Selamat Datang!".',
        initialCode: '<!-- Tulis kodemu di bawah ini -->\n',
        correctCode: '<h1>Selamat Datang!</h1>',
        hint: 'Gunakan tag <h1>'
      },
      {
        id: 'e-1',
        title: 'Susun Struktur HTML',
        type: 'drag-drop',
        status: 'unlocked',
        xp: 15,
        description: 'Susunlah elemen-elemen berikut menjadi struktur HTML yang valid dari atas ke bawah.',
        dragItems: [
          { id: '1', content: '</html>' },
          { id: '2', content: '<body>...</body>' },
          { id: '3', content: '<!DOCTYPE html>' },
          { id: '4', content: '<html>' },
          { id: '5', content: '<head>...</head>' }
        ],
        dragSolution: ['3', '4', '5', '2', '1']
      },
      {
        id: 'e-2',
        title: 'Perbaiki Link Rusak',
        type: 'fix-bug',
        status: 'unlocked',
        xp: 15,
        description: 'Link di bawah ini tidak berfungsi karena atributnya salah. Perbaiki agar link mengarah ke "google.com".',
        initialCode: '<a href="google.com">Ke Google</a>',
        correctCode: '<a href="https://google.com">Ke Google</a>',
        hint: 'Ingat format absolute URL membutuhkan protocol (https://)'
      },
      {
        id: 'e-3',
        title: 'Paragraf Pertamaku',
        type: 'coding',
        status: 'unlocked',
        xp: 10,
        description: 'Buatlah elemen paragraf dengan teks "Saya belajar HTML".',
        initialCode: '',
        correctCode: '<p>Saya belajar HTML</p>'
      },
      {
        id: 'e-4',
        title: 'Title Halaman',
        type: 'coding',
        status: 'unlocked',
        xp: 10,
        description: 'Tambahkan elemen title dengan judul "Website Keren".',
        initialCode: '<head>\n\n</head>',
        correctCode: '<head>\n<title>Website Keren</title>\n</head>'
      }
    ],
    medium: [
      {
        id: 'm-0',
        title: 'Skenario: Toko Online',
        type: 'scenario',
        status: 'unlocked',
        xp: 25,
        description: 'Anda diminta membuat kartu produk untuk toko online. Manakah struktur HTML yang paling semantik dan tepat?',
        scenarioContext: 'Klien ingin setiap produk memiliki Gambar, Judul, Harga, dan Tombol Beli.',
        scenarioQuestion: 'Pilih struktur kode yang paling tepat:',
        scenarioOptions: [
            { id: 'a', text: 'Menggunakan <table> untuk layout produk.', isCorrect: false },
            { id: 'b', text: '<div class="product">\n  <img src="..." alt="Produk" />\n  <h3>Nama Produk</h3>\n  <p>Rp 50.000</p>\n  <button>Beli</button>\n</div>', isCorrect: true },
            { id: 'c', text: 'Menggunakan tag <br> untuk memisahkan setiap elemen tanpa container.', isCorrect: false }
        ]
      },
      {
        id: 'm-1',
        title: 'Skenario: Blog Post',
        type: 'scenario',
        status: 'unlocked',
        xp: 30,
        description: 'Anda sedang mendesain halaman artikel blog. Tentukan tag yang tepat untuk konten tersebut.',
        scenarioContext: 'Halaman membutuhkan: Judul Utama, Tanggal Publish, Paragraf Pembuka, dan Sub-judul.',
        scenarioQuestion: 'Tuliskan kode HTML sederhana untuk struktur tersebut.',
        initialCode: '<!-- Buat struktur artikel blog di sini -->\n',
        correctCode: '<article>\n<h1>Judul Artikel</h1>\n<time>12 Jan 2024</time>\n<p>Paragraf pembuka...</p>\n<h2>Sub Judul</h2>\n</article>'
      },
      {
        id: 'm-2',
        title: 'List Semantik',
        type: 'fix-bug',
        status: 'locked',
        xp: 20,
        description: 'Perbaiki penggunaan list item yang salah.',
        initialCode: '<ul>Item 1</ul>',
        correctCode: '<ul><li>Item 1</li></ul>'
      }
    ],
    hard: [
      {
        id: 'h-0',
        title: 'Landing Page Sederhana',
        type: 'coding',
        status: 'unlocked',
        xp: 50,
        description: 'Buatlah landing page sederhana yang menggabungkan semua konsep: Header, Main (dengan h1 & p), dan Footer.',
        initialCode: '<!DOCTYPE html>\n<html>\n<body>\n  <!-- Tulis kodemu di sini -->\n</body>\n</html>',
        correctCode: '<!DOCTYPE html>\n<html>\n<body>\n<header>...</header>\n<main>\n<h1>...</h1>\n<p>...</p>\n</main>\n<footer>...</footer>\n</body>\n</html>'
      }
    ]
  }
};

// Helper function to get level data by ID (for future API integration)
export function getLevelData(levelId: string): LevelData {
  // TODO: Replace with actual API call
  // For now, return mock data
  return mockLevelData;
}
