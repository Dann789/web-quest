# Challenge System - Alur Data & Komponen

## 📁 Struktur Komponen Challenge

Sistem challenge ini terdiri dari komponen-komponen terpisah yang masing-masing menangani tipe soal berbeda:

```
frontend/src/
├── components/user/
│   ├── CodingEditor.tsx        → Untuk soal Coding Manual
│   ├── FixBugEditor.tsx        → Untuk soal Fix The Bug
│   ├── DragDropEditor.tsx      → Untuk soal Drag & Drop
│   └── ScenarioViewer.tsx      → Untuk soal Scenario Based
├── mocks/
│   └── levelMockData.ts        → Data soal & level
└── pages/user/
    └── ChallengePage.tsx       → Halaman utama pengerjaan
```

---

## 🎯 Alur Data dari Mock ke Tampilan

### 1. **Data Soal (levelMockData.ts)**

Data soal didefinisikan dalam file `levelMockData.ts`. Setiap challenge memiliki tipe dan data spesifiknya:

```typescript
// Contoh: Coding Manual
{
  id: 'e-0',
  title: 'Membuat Heading',
  type: 'coding',
  status: 'unlocked',
  xp: 10,
  description: 'Buatlah sebuah heading level 1...',
  initialCode: '<!-- Tulis kodemu di bawah ini -->\n',
  correctCode: '<h1>Selamat Datang!</h1>',
  hint: 'Gunakan tag <h1>'
}

// Contoh: Drag & Drop
{
  id: 'e-1',
  title: 'Susun Struktur HTML',
  type: 'drag-drop',
  dragItems: [
    { id: '1', content: '</html>' },
    { id: '2', content: '<body>...</body>' },
    // ...
  ],
  dragSolution: ['3', '4', '5', '2', '1']
}

// Contoh: Scenario Based
{
  id: 'm-0',
  title: 'Skenario: Toko Online',
  type: 'scenario',
  scenarioContext: 'Klien ingin setiap produk memiliki...',
  scenarioOptions: [
    { id: 'a', text: 'Menggunakan <table>...', isCorrect: false },
    { id: 'b', text: '<div class="product">...', isCorrect: true }
  ]
}
```

### 2. **Mengambil Data (ChallengePage.tsx)**

Di `ChallengePage.tsx`, data diambil menggunakan fungsi `getLevelData()`:

```typescript
// Import fungsi
import { getLevelData } from "@/mocks/levelMockData";

// Ambil semua data level
const levelData = getLevelData("1");

// Gabungkan semua challenge dari easy, medium, hard
const allChallenges = [
  ...levelData.challenges.easy,
  ...levelData.challenges.medium,
  ...levelData.challenges.hard,
];

// Cari challenge sesuai ID dari URL
const { challengeId } = useParams();
const activeChallenge = allChallenges.find((c) => c.id === challengeId);
```

### 3. **Render Komponen Sesuai Tipe**

Berdasarkan `activeChallenge.type`, halaman akan merender komponen yang sesuai:

```typescript
{
  /* Coding Manual */
}
{
  activeChallenge.type === "coding" && (
    <CodingEditor code={userCode} onChange={setUserCode} />
  );
}

{
  /* Fix The Bug */
}
{
  activeChallenge.type === "fix-bug" && (
    <FixBugEditor code={userCode} onChange={setUserCode} />
  );
}

{
  /* Drag & Drop */
}
{
  activeChallenge.type === "drag-drop" && (
    <DragDropEditor items={dragItems} onReorder={setDragItems} />
  );
}

{
  /* Scenario Based */
}
{
  activeChallenge.type === "scenario" && (
    <ScenarioViewer
      challenge={activeChallenge}
      selectedOption={scenarioSelection}
      onSelect={setScenarioSelection}
    />
  );
}
```

---

## 🔄 Alur Lengkap

```
┌─────────────────────┐
│ levelMockData.ts    │  ← Data soal didefinisikan
│ - Challenge data    │
│ - Type, title, desc │
│ - Initial code, etc │
└──────────┬──────────┘
           │
           │ getLevelData()
           ↓
┌─────────────────────┐
│ ChallengePage.tsx   │  ← Ambil data & state management
│ - Find by ID        │
│ - State: userCode   │
│ - State: dragItems  │
│ - State: selection  │
└──────────┬──────────┘
           │
           │ Conditional Rendering
           ↓
┌─────────────────────────────────────┐
│ Komponen Editor (berdasarkan type)  │
├─────────────────────────────────────┤
│ • CodingEditor     (coding)         │
│ • FixBugEditor     (fix-bug)        │
│ • DragDropEditor   (drag-drop)      │
│ • ScenarioViewer   (scenario)       │
└──────────┬──────────────────────────┘
           │
           │ User Interaction
           ↓
┌─────────────────────┐
│ Submit & Validation │  ← Cek jawaban vs correctCode/dragSolution
└─────────────────────┘
```

---

## 🚀 Cara Menambah Soal Baru

### 1. Tambahkan data di `levelMockData.ts`:

```typescript
// Untuk Coding Manual
{
  id: 'e-5',
  title: 'Buat Gambar',
  type: 'coding',
  status: 'unlocked',
  xp: 15,
  description: 'Tambahkan tag <img> dengan src="logo.png"',
  initialCode: '',
  correctCode: '<img src="logo.png" alt="Logo" />'
}

// Untuk Drag & Drop
{
  id: 'e-6',
  title: 'Urutan List',
  type: 'drag-drop',
  dragItems: [
    { id: '1', content: '<li>Item 1</li>' },
    { id: '2', content: '<ul>' },
    { id: '3', content: '</ul>' }
  ],
  dragSolution: ['2', '1', '3']
}
```

### 2. Soal akan otomatis muncul

- Di `LevelMapPage` sebagai node challenge
- Bisa diklik untuk membuka `ChallengePage`
- Komponen yang sesuai akan di-render otomatis

---

## 📝 Validasi Jawaban

```typescript
// Di ChallengePage.tsx > handleSubmit()
if (activeChallenge.type === "coding") {
  // Bandingkan userCode dengan correctCode
  isCorrect = userCode.trim() === activeChallenge.correctCode?.trim();
}

if (activeChallenge.type === "drag-drop") {
  // Bandingkan urutan ID
  const currentOrder = dragItems.map((i) => i.id);
  isCorrect =
    JSON.stringify(currentOrder) ===
    JSON.stringify(activeChallenge.dragSolution);
}

if (activeChallenge.type === "scenario") {
  // Cek pilihan yang benar
  const correctOption = activeChallenge.scenarioOptions.find(
    (o) => o.isCorrect
  );
  isCorrect = scenarioSelection === correctOption?.id;
}
```

---

## 🎨 Kustomisasi Komponen

Setiap komponen di `components/user/` bisa dikustomisasi secara independen:

- **CodingEditor.tsx**: Tambah syntax highlighting, autocomplete
- **FixBugEditor.tsx**: Tambah line numbers, error markers
- **DragDropEditor.tsx**: Animasi drag, visual feedback
- **ScenarioViewer.tsx**: Format teks, gambar ilustrasi

Semua perubahan tidak akan mempengaruhi komponen lain.

---

## ✅ Kesimpulan

**Soal ditampilkan dengan cara:**

1. ✅ Data didefinisikan di `levelMockData.ts`
2. ✅ `ChallengePage` mengambil data via `getLevelData()`
3. ✅ Komponen di-render berdasarkan `type` challenge
4. ✅ User berinteraksi lewat komponen yang sesuai
5. ✅ Validasi dilakukan saat submit

**Keuntungan Struktur Ini:**

- 🎯 Modular & mudah di-maintain
- 🔄 Mudah menambah tipe soal baru
- 🎨 Setiap komponen bisa dikustomisasi sendiri
- 📊 Data terpusat di satu file
