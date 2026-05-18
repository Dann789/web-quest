# PROMPT: Implementasi SQLite Sandbox — Platform Pembelajaran Web Dinamis

---

## KONTEKS PROYEK

Kamu adalah senior backend engineer yang akan membangun fitur **SQLite Sandbox** untuk sebuah platform pembelajaran pemrograman web. Platform ini memiliki dua level materi:

- **`php_level`** → materi web dinamis (PHP)
- **`db_level`** → materi database (SQL)

Setiap level memiliki sejumlah **soal/studi kasus** dengan struktur database yang berbeda-beda. User mengerjakan soal dengan menulis dan menjalankan query SQL langsung di browser.

**Stack yang digunakan:**
- Runtime: **Bun**
- Framework: **Elysia JS**
- Database sandbox: **SQLite via `bun:sqlite`** (built-in, tidak perlu library tambahan)
- Bahasa: **TypeScript**

---

## ATURAN KERAS (JANGAN DILANGGAR)

1. **JANGAN** gunakan library SQLite pihak ketiga (better-sqlite3, prisma, drizzle, dll). Gunakan `bun:sqlite` yang sudah built-in di Bun.
2. **JANGAN** gunakan satu file `.db` untuk semua user. Setiap user **wajib** punya file `.db` sendiri per soal.
3. **JANGAN** buat schema database di dalam kode TypeScript. Schema **wajib** dibaca dari file `.sql` template.
4. **JANGAN** jalankan query user tanpa melewati `query-guard` terlebih dahulu.
5. **JANGAN** menyimpan file `.db` user di luar folder `sandbox/`.
6. **JANGAN** commit folder `sandbox/` ke git.
7. **JANGAN** gunakan ORM. Semua query ke SQLite langsung menggunakan API `bun:sqlite`.

---

## STRUKTUR FOLDER YANG WAJIB DIBUAT

```
learning-platform/
│
├── src/
│   ├── index.ts                   ← Entry point Elysia, mount semua route
│   ├── routes/
│   │   ├── sandbox.route.ts       ← POST /sandbox/run dan POST /sandbox/reset
│   │   └── soal.route.ts          ← GET /soal dan GET /soal/:id/schema
│   ├── middleware/
│   │   └── auth.middleware.ts     ← Derive user dari token/session
│   ├── db/
│   │   └── sandbox.db.ts          ← getSandboxDB(), resetSandboxDB(), helper paths
│   └── utils/
│       └── query-guard.ts         ← guardQuery(): validasi query sebelum dieksekusi
│
├── templates/
│   ├── php_level/
│   │   ├── soal_1_schema.sql
│   │   └── soal_2_schema.sql
│   └── db_level/
│       ├── soal_1_schema.sql
│       ├── soal_2_schema.sql
│       └── soal_3_schema.sql
│
├── sandbox/                       ← AUTO-GENERATED, ada di .gitignore
│   ├── php_level/
│   └── db_level/
│
├── .gitignore
└── package.json
```

---

## SPESIFIKASI TIAP FILE

### `src/db/sandbox.db.ts` — INTI SISTEM

File ini adalah jantung sandbox. Semua file lain bergantung padanya.

**Wajib export:**

```typescript
export type Level = "php_level" | "db_level";

// Buka atau buat file .db milik user untuk soal tertentu.
// Jika file baru (belum ada tabel), baca template SQL dan jalankan.
export function getSandboxDB(userId: number, soalId: number, level: Level): Database

// Hapus file .db user (beserta file -wal dan -shm jika ada).
// File baru akan otomatis dibuat dari template saat user akses lagi.
export function resetSandboxDB(userId: number, soalId: number, level: Level): void

// Path ke file .db user: ./sandbox/{level}/user_{userId}_soal_{soalId}.db
export function getSandboxPath(userId: number, soalId: number, level: Level): string

// Path ke template SQL: ./templates/{level}/soal_{soalId}_schema.sql
export function getTemplatePath(soalId: number, level: Level): string
```

**Logika `getSandboxDB`:**
1. Bentuk path file: `./sandbox/{level}/user_{userId}_soal_{soalId}.db`
2. Buka koneksi `new Database(dbPath)` — Bun otomatis membuat file jika belum ada
3. Aktifkan `PRAGMA journal_mode = WAL` untuk keamanan concurrent read
4. Cek jumlah tabel di `sqlite_master`. Jika 0 (DB baru):
   - Baca file template SQL dengan `readFileSync`
   - Jalankan dengan `db.run(schemaSql)` — ini mengisi tabel + seed data sekaligus
5. Return instance `Database`

**Logika `resetSandboxDB`:**
1. Bentuk path file yang sama
2. Jika file ada: hapus `.db`, `.db-wal`, `.db-shm`
3. Tidak perlu return apapun — DB baru dibuat otomatis saat akses berikutnya

---

### `src/utils/query-guard.ts`

```typescript
export type GuardResult = { safe: true } | { safe: false; reason: string };
export function guardQuery(sql: string): GuardResult
```

**Aturan validasi (semua case-insensitive):**

| Kondisi | Aksi |
|---|---|
| Query kosong setelah trim | Blokir |
| Lebih dari 1 statement (split by `;`, filter kosong, panjang > 1) | Blokir |
| Mengandung `ATTACH DATABASE` | Blokir |
| Mengandung `DETACH DATABASE` | Blokir |
| Mengandung `PRAGMA` (kecuali `PRAGMA table_info`) | Blokir |
| Mengandung `CREATE TRIGGER` | Blokir |
| Mengandung `load_extension` | Blokir |
| Mengandung `.import` atau `.read` | Blokir |

Semua yang lolos validasi → `{ safe: true }`

---

### `src/middleware/auth.middleware.ts`

Gunakan Elysia `.derive({ as: "global" })` untuk inject `user` ke semua route.

**Format token untuk development:** `"user-{id}"` → parse menjadi `{ id: number, name: string }`

Jika token tidak ada atau tidak valid → set status 401, throw error.

**Interface user yang di-derive:**
```typescript
{ id: number; name: string }
```

---

### `src/routes/sandbox.route.ts`

**Endpoint 1: `POST /sandbox/run`**

Request body (validasi dengan `t.Object` dari Elysia):
```typescript
{
  soalId: number  // minimum: 1
  level: "php_level" | "db_level"
  query: string   // minLength: 1
}
```

Alur:
1. Jalankan `guardQuery(query)` → jika tidak aman, return 400 + pesan error
2. Panggil `getSandboxDB(user.id, soalId, level)`
3. Deteksi jenis query: jika diawali `SELECT` (case-insensitive) → gunakan `.query().all()`, selain itu → `.run()`
4. Response SELECT: `{ success: true, type: "select", rowCount: number, rows: any[] }`
5. Response write: `{ success: true, type: "write", changes: number, lastInsertId: number | bigint }`
6. Jika SQLite throw error → return 422 + `{ success: false, error: string }`

**Endpoint 2: `POST /sandbox/reset`**

Request body:
```typescript
{
  soalId: number
  level: "php_level" | "db_level"
}
```

Alur: panggil `resetSandboxDB()`, return pesan sukses.

---

### `src/routes/soal.route.ts`

**Endpoint 1: `GET /soal?level=db_level`**

Kembalikan array metadata soal dari konstanta `SOAL_LIST` (hardcode untuk sekarang). Sertakan field `templateTersedia: boolean` berdasarkan `existsSync(getTemplatePath(...))`.

**Endpoint 2: `GET /soal/:id/schema?level=db_level`**

1. Panggil `getSandboxDB()` → ini sekaligus inisialisasi DB jika baru
2. Query `sqlite_master` untuk ambil daftar tabel
3. Untuk tiap tabel, jalankan `PRAGMA table_info(nama_tabel)` untuk ambil kolom
4. Return: `{ success: true, soalId, level, schema: Array<{ tabel: string, kolom: any[] }> }`

---

### `src/index.ts`

1. Buat folder `./sandbox/php_level` dan `./sandbox/db_level` dengan `mkdirSync(..., { recursive: true })` saat startup
2. Mount `authMiddleware`, `sandboxRoute`, `soalRoute`
3. Listen di port `3000`
4. Log URL server ke console

---

### File Template SQL (`templates/{level}/soal_{N}_schema.sql`)

Setiap file berisi DDL (`CREATE TABLE`) + seed data (`INSERT INTO`) yang langsung bisa dieksekusi sekaligus oleh `db.run()`.

**Buat template berikut:**

**`php_level/soal_1_schema.sql`** — Studi Kasus: Toko Online
- Tabel: `products` (id, name, price, stock, category), `customers` (id, name, email, phone), `orders` (id, customer_id, order_date, total, status), `order_items` (id, order_id, product_id, qty, price)
- Seed: minimal 4 products, 2 customers, 2 orders, 3 order_items

**`php_level/soal_2_schema.sql`** — Studi Kasus: Sistem Login & Register
- Tabel: `users` (id, username, email, password, role, created_at, is_active), `sessions` (id, user_id, token, created_at, expires_at)
- Seed: 1 admin + 2 user biasa

**`db_level/soal_1_schema.sql`** — Studi Kasus: Perpustakaan Digital
- Tabel: `books` (id, title, author, year, stock), `members` (id, name, email, joined_at), `loans` (id, book_id, member_id, loan_date, return_date, returned)
- Seed: 5 books, 3 members, 4 loans

**`db_level/soal_2_schema.sql`** — Studi Kasus: Klinik & Jadwal Dokter
- Tabel: `doctors` (id, name, specialist, phone), `patients` (id, name, dob, address), `appointments` (id, doctor_id, patient_id, schedule, complaint, status)
- Seed: 3 doctors, 3 patients, 4 appointments

**`db_level/soal_3_schema.sql`** — Studi Kasus: Sistem Nilai Mahasiswa
- Tabel: `students` (id, nim, name, prodi), `courses` (id, code, name, sks), `grades` (id, student_id, course_id, semester, score, grade) dengan UNIQUE constraint pada (student_id, course_id, semester)
- Seed: 3 students, 4 courses, 6 grades

---

### `.gitignore`

```
node_modules/
sandbox/
*.db
*.db-wal
*.db-shm
.env
```

### `package.json`

```json
{
  "name": "learning-platform",
  "scripts": {
    "dev": "bun run --watch src/index.ts",
    "start": "bun run src/index.ts"
  },
  "dependencies": {
    "elysia": "latest"
  },
  "devDependencies": {
    "bun-types": "latest"
  }
}
```

---

## CONTOH PENGGUNAAN (untuk verifikasi implementasi)

Setelah server jalan dengan `bun run dev`, endpoint berikut harus berfungsi:

```bash
# 1. Ambil daftar soal level database
GET /soal?level=db_level
Authorization: Bearer user-1

# 2. Lihat schema soal 1 (otomatis buat DB + isi template jika belum ada)
GET /soal/1/schema?level=db_level
Authorization: Bearer user-1

# 3. Jalankan query SELECT
POST /sandbox/run
Authorization: Bearer user-1
Body: { "soalId": 1, "level": "db_level", "query": "SELECT * FROM books" }

# 4. Jalankan query INSERT
POST /sandbox/run
Authorization: Bearer user-1
Body: { "soalId": 1, "level": "db_level", "query": "INSERT INTO members (name, email) VALUES ('Test User', 'test@email.com')" }

# 5. Reset sandbox soal 1 (hapus file .db, schema bersih saat akses berikutnya)
POST /sandbox/reset
Authorization: Bearer user-1
Body: { "soalId": 1, "level": "db_level" }

# 6. Query berbahaya harus ditolak (return 400)
POST /sandbox/run
Body: { "soalId": 1, "level": "db_level", "query": "ATTACH DATABASE '/etc/passwd' AS hack" }
```

---

## CHECKLIST SEBELUM SELESAI

Pastikan semua poin ini terpenuhi sebelum menyatakan implementasi selesai:

- [ ] `bun:sqlite` digunakan, bukan library eksternal
- [ ] File `.db` terbuat otomatis di `sandbox/{level}/user_{id}_soal_{id}.db` saat pertama diakses
- [ ] Schema diisi dari file `.sql` template, bukan dari kode TypeScript
- [ ] `WAL mode` diaktifkan di tiap koneksi DB
- [ ] `guardQuery` dipanggil sebelum setiap eksekusi query user
- [ ] Query SELECT dan write (INSERT/UPDATE/DELETE/CREATE) ditangani dengan method yang berbeda
- [ ] Reset menghapus file `.db`, `.db-wal`, dan `.db-shm`
- [ ] Folder `sandbox/` ada di `.gitignore`
- [ ] Semua endpoint tervalidasi dengan `t.Object` dari Elysia
- [ ] Auth middleware menggunakan `.derive({ as: "global" })` sehingga `user` tersedia di semua route
- [ ] Server log URL saat startup
- [ ] Tidak ada referensi ke Prisma, Drizzle, better-sqlite3, atau ORM lainnya
