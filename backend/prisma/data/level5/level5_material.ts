import { PrismaClient } from "@prisma/client";

export async function seedLevel5Material(prisma: PrismaClient) {
  console.log("🌱 Seeding Material Level 5: Database SQL...");

  const level = await prisma.level.upsert({
    where: { id: 5 },
    update: {
      name: "Database",
      xpRequired: 2000,
      description: "Manajemen dan manipulasi database dengan SQL",
      iconName: "fa-database",
      easyNodes: 4,
      mediumNodes: 4,
      hardNodes: 3,
    },
    create: {
      id: 5,
      name: "Database",
      xpRequired: 2000,
      description: "Manajemen dan manipulasi database dengan SQL",
      iconName: "fa-database",
      easyNodes: 4,
      mediumNodes: 4,
      hardNodes: 3,
    },
  });

  const materials = [
    {
      id: 55,
      levelId: level.id,
      title: "Pengenalan Database & SQL",
      order: 1,
      content: `
        <h2>Apa itu Database?</h2>
        <p>Database (Basis Data) adalah kumpulan data atau informasi terstruktur yang disimpan secara elektronik di dalam sistem komputer. Untuk mengelola database relasional, kita menggunakan perangkat lunak yang disebut RDBMS (Relational Database Management System) seperti MySQL, PostgreSQL, SQLite, atau SQL Server.</p>

        <h2>Apa itu SQL?</h2>
        <p>SQL (Structured Query Language) adalah bahasa standar yang digunakan untuk berkomunikasi dengan database relasional. SQL digunakan untuk memasukkan, mencari, memperbarui, dan menghapus catatan di dalam database.</p>

        <h3>Tiga Kategori Perintah SQL Utama</h3>
        <ul>
          <li><strong>DDL (Data Definition Language):</strong> Perintah untuk mendefinisikan struktur database (e.g. <code>CREATE TABLE</code>, <code>DROP TABLE</code>, <code>ALTER TABLE</code>).</li>
          <li><strong>DML (Data Manipulation Language):</strong> Perintah untuk memanipulasi data di dalam tabel (e.g. <code>SELECT</code>, <code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>).</li>
          <li><strong>DCL (Data Control Language):</strong> Perintah untuk mengatur hak akses pengguna (e.g. <code>GRANT</code>, <code>REVOKE</code>).</li>
        </ul>

        <h3>Pengertian RDBMS</h3>

<p>
RDBMS (Relational Database Management System) adalah sistem manajemen database yang menyimpan data dalam bentuk tabel dan memiliki hubungan antar tabel.
</p>

<h3>Ciri-Ciri RDBMS</h3>

<ul>
    <li>Data disimpan dalam tabel</li>
    <li>Menggunakan relasi antar tabel</li>
    <li>Menggunakan SQL</li>
    <li>Mendukung primary key dan foreign key</li>
</ul>

<h3>Contoh RDBMS</h3>

<ul>
    <li>MySQL</li>
    <li>PostgreSQL</li>
    <li>MariaDB</li>
    <li>Oracle Database</li>
</ul>
      `,
    },
    {
      id: 56,
      levelId: level.id,
      title: "Primary dan Foreign Key",
      order: 2,
      content: `
        <h3>Pengertian Primary Key</h3>

<p>
Primary key adalah kolom yang digunakan sebagai identitas unik setiap data.
</p>

<h3>Ciri-Ciri Primary Key</h3>

<ul>
    <li>Tidak boleh duplicate</li>
    <li>Tidak boleh kosong</li>
    <li>Nilai harus unik</li>
</ul>

<h3>Contoh Primary Key</h3>

<pre><code>CREATE TABLE mahasiswa (
    id INT PRIMARY KEY,
    nama VARCHAR(100)
);
</code></pre>

<h3>Pengertian Foreign Key</h3>

<p>
Foreign key adalah kolom yang digunakan untuk menghubungkan tabel dengan tabel lain.
</p>

<h3>Contoh Relasi</h3>

<ul>
    <li>Tabel mahasiswa</li>
    <li>Tabel kelas</li>
</ul>

<h3>Contoh Foreign Key</h3>

<pre><code>CREATE TABLE kelas (
    id INT PRIMARY KEY,
    nama_kelas VARCHAR(100)
);

CREATE TABLE mahasiswa (
    id INT PRIMARY KEY,
    nama VARCHAR(100),
    kelas_id INT,

    FOREIGN KEY (kelas_id)
    REFERENCES kelas(id)
);
</code></pre>
      `,
    },
    {
      id: 57,
      levelId: level.id,
      title: "Relationship",
      order: 3,
      content: `
        <h3>Pengertian Relationship</h3>

<p>
Relationship adalah hubungan antar tabel dalam database.
</p>

<h3>Jenis Relationship</h3>

<table>
    <thead>
        <tr>
            <th>Relationship</th>
            <th>Penjelasan</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>One To One</td>
            <td>Satu data berhubungan dengan satu data</td>
        </tr>
        <tr>
            <td>One To Many</td>
            <td>Satu data memiliki banyak data</td>
        </tr>
        <tr>
            <td>Many To Many</td>
            <td>Banyak data saling berhubungan</td>
        </tr>
    </tbody>
</table>

<h3>Contoh One To Many</h3>

<p>
Satu kelas memiliki banyak mahasiswa.
</p>

<hr>

<h2>10. SELECT</h2>

<h3>Pengertian SELECT</h3>

<p>
SELECT digunakan untuk mengambil data dari database.
</p>

<h3>Menampilkan Semua Data</h3>

<pre><code>SELECT * FROM mahasiswa;
</code></pre>

<h3>Menampilkan Kolom Tertentu</h3>

<pre><code>SELECT nama, jurusan
FROM mahasiswa;
</code></pre>
      `,
    },
    {
      id: 58,
      levelId: level.id,
      title: "Perintah SELECT Dasar",
      order: 4,
      content: `
        <h2>Mengambil Data dengan SELECT</h2>
        <p>Perintah <code>SELECT</code> digunakan untuk mengambil atau menampilkan data dari satu atau lebih tabel database. Hasil pencarian data tersebut dikembalikan dalam bentuk tabel virtual.</p>

        <h3>1. Mengambil Semua Kolom</h3>
        <p>Gunakan simbol asterisk (<code>*</code>) untuk menampilkan seluruh kolom yang ada pada suatu tabel.</p>
        <pre><code>SELECT * FROM users;</code></pre>

        <h3>2. Mengambil Kolom Spesifik</h3>
        <p>Untuk efisiensi performa, disarankan hanya mengambil kolom-kolom tertentu yang memang dibutuhkan.</p>
        <pre><code>SELECT username, email FROM users;</code></pre>
      `,
    },
    {
      id: 59,
      levelId: level.id,
      title: "Memfilter Data dengan WHERE",
      order: 5,
      content: `
        <h2>Menggunakan Clause WHERE</h2>
        <p>Clause <code>WHERE</code> digunakan untuk memfilter catatan yang dikembalikan oleh <code>SELECT</code>. Hanya data yang memenuhi kriteria tertentu yang akan ditampilkan.</p>

        <h3>Contoh Penulisan WHERE</h3>
        <pre><code>SELECT * FROM users
WHERE role = 'DOSEN';</code></pre>

        <h3>Operator Filter SQL Penting</h3>
        <ul>
          <li><code>=</code> : Sama dengan</li>
          <li><code>&lt;&gt;</code> atau <code>!=</code> : Tidak sama dengan</li>
          <li><code>&gt;</code> / <code>&lt;</code> : Lebih besar / Lebih kecil</li>
          <li><code>LIKE</code> : Mencari pola teks tertentu menggunakan wildcard % (e.g. <code>WHERE name LIKE 'A%'</code> untuk nama yang diawali huruf A)</li>
          <li><code>AND</code>, <code>OR</code>, <code>NOT</code> : Operator logika untuk menggabungkan kondisi</li>
        </ul>
      `,
    },
    {
      id: 60,
      levelId: level.id,
      title: "Menambahkan Data dengan INSERT",
      order: 6,
      content: `
        <h2>Menyisipkan Baris Baru dengan INSERT INTO</h2>
        <p>Perintah <code>INSERT INTO</code> digunakan untuk memasukkan atau menyimpan baris data baru ke dalam suatu tabel database.</p>

        <h3>Syntax Dasar INSERT INTO</h3>
        <pre><code>INSERT INTO nama_tabel (kolom1, kolom2, kolom3)
VALUES (nilai1, nilai2, nilai3);</code></pre>

        <h3>Contoh Penerapan</h3>
        <pre><code>INSERT INTO users (username, email, role)
VALUES ('wildan', 'wildan@gmail.com', 'MAHASISWA');</code></pre>
        <p><em>Catatan: Urutan nilai di dalam bagian <code>VALUES</code> harus sama persis dengan urutan nama kolom yang didefinisikan sebelumnya. Nilai bertipe string wajib dibungkus dengan tanda kutip tunggal (<code>'</code>).</em></p>
      `,
    },
    {
      id: 61,
      levelId: level.id,
      title: "Mengubah Data dengan UPDATE",
      order: 7,
      content: `
        <h3>Pengertian UPDATE</h3>

<p>
UPDATE digunakan untuk mengubah data pada tabel.
</p>

<h3>Contoh UPDATE</h3>

<pre><code>UPDATE mahasiswa
SET nama = 'Andi'
WHERE id = 1;
</code></pre>
      `,
    },
    {
      id: 62,
      levelId: level.id,
      title: "Menghapus Data dengan DELETE",
      order: 8,
      content: `
        <h2>Menghapus Data dengan DELETE</h2>
        <p>Perintah <code>DELETE</code> digunakan untuk menghapus baris data dari suatu tabel database.</p>

        <h3>Syntax Dasar DELETE</h3>
        <pre><code>DELETE FROM nama_tabel
WHERE kondisi;</code></pre>

        <h3>Contoh Penerapan</h3>
        <pre><code>DELETE FROM mahasiswa
WHERE id = 1;</code></pre>
      `,
    },
    {
      id: 63,
      levelId: level.id,
      title: "ORDER BY",
      order: 9,
      content: `
        <h3>Pengertian ORDER BY</h3>

<p>
ORDER BY digunakan untuk mengurutkan data.
</p>

<h3>Urut Ascending</h3>

<pre><code>SELECT *
FROM mahasiswa
ORDER BY nama ASC;
</code></pre>

<h3>Urut Descending</h3>

<pre><code>SELECT *
FROM mahasiswa
ORDER BY nama DESC;
</code></pre>
      `,
    },
    {
      id: 64,
      levelId: level.id,
      title: "GROUP BY",
      order: 10,
      content: `
        <h3>Pengertian GROUP BY</h3>

<p>
GROUP BY digunakan untuk mengelompokkan data.
</p>

<h3>Contoh GROUP BY</h3>

<pre><code>SELECT jurusan, COUNT(*) as jumlah
FROM mahasiswa
GROUP BY jurusan;
</code></pre>
      `,
    },
    {
      id: 65,
      levelId: level.id,
      title: "JOIN",
      order: 11,
      content: `
        <h3>Pengertian JOIN</h3>

<p>
JOIN digunakan untuk menggabungkan data dari beberapa tabel.
</p>

<h3>Jenis JOIN</h3>

<ul>
    <li>INNER JOIN (Hanya mengambil data yang beririsan/cocok)</li>
    <li>LEFT JOIN (Mengambil semua data kiri, dan data kanan yang cocok)</li>
</ul>

<h3>Contoh INNER JOIN (2 Tabel)</h3>

<pre><code>SELECT 
    mahasiswa.nama,
    kelas.nama_kelas

FROM mahasiswa

INNER JOIN kelas
ON mahasiswa.kelas_id = kelas.id;
</code></pre>

<h3>Menggabungkan 3 Tabel (Multi-Table JOIN)</h3>
<p>
Anda juga bisa menggabungkan 3 tabel atau lebih secara berurutan. Kuncinya adalah cukup menambahkan perintah <code>JOIN ... ON ...</code> baru di bawahnya yang merelasikan tabel sebelumnya dengan tabel yang baru.
</p>

<pre><code>SELECT 
    mahasiswa.nama,
    kelas.nama_kelas,
    dosen.nama_dosen

FROM mahasiswa

INNER JOIN kelas
ON mahasiswa.kelas_id = kelas.id

INNER JOIN dosen
ON kelas.dosen_id = dosen.id;
</code></pre>
<p>
Pada contoh di atas, kita merelasikan tabel <strong>mahasiswa</strong> dengan <strong>kelas</strong>, lalu kita relasikan lagi tabel <strong>kelas</strong> dengan <strong>dosen</strong>.
</p>
      `,
    },
    {
      id: 66,
      levelId: level.id,
      title: "Aggregate Function",
      order: 12,
      content: `
        <h3>Pengertian Aggregate Function</h3>

<p>
Aggregate function digunakan untuk melakukan perhitungan data.
</p>

<h3>Jenis Aggregate Function</h3>

<table>
    <thead>
        <tr>
            <th>Function</th>
            <th>Fungsi</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>COUNT()</td>
            <td>Menghitung jumlah data</td>
        </tr>
        <tr>
            <td>SUM()</td>
            <td>Menjumlahkan data</td>
        </tr>
        <tr>
            <td>AVG()</td>
            <td>Menghitung rata-rata</td>
        </tr>
        <tr>
            <td>MAX()</td>
            <td>Mencari nilai terbesar</td>
        </tr>
        <tr>
            <td>MIN()</td>
            <td>Mencari nilai terkecil</td>
        </tr>
    </tbody>
</table>

<h3>Contoh COUNT()</h3>

<pre><code>SELECT COUNT(*) AS total
FROM mahasiswa;
</code></pre>

<h3>Contoh AVG()</h3>

<pre><code>SELECT AVG(nilai) AS rata_rata
FROM mahasiswa;
</code></pre>
      `,
    },
    {
      id: 67,
      levelId: level.id,
      title: "Constraint",
      order: 13,
      content: `
        <h3>Pengertian Constraint</h3>
<p>
Constraint digunakan untuk membatasi dan menjaga validitas data pada database.
</p>

<h3>Jenis Constraint</h3>

<table>
    <thead>
        <tr>
            <th>Constraint</th>
            <th>Fungsi</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>PRIMARY KEY</td>
            <td>Identitas unik data</td>
        </tr>
        <tr>
            <td>FOREIGN KEY</td>
            <td>Menghubungkan tabel</td>
        </tr>
        <tr>
            <td>NOT NULL</td>
            <td>Data tidak boleh kosong</td>
        </tr>
        <tr>
            <td>UNIQUE</td>
            <td>Data harus unik</td>
        </tr>
    </tbody>
</table>

<h3>Contoh Constraint</h3>

<pre><code>CREATE TABLE users (
    id INT PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    username VARCHAR(100) NOT NULL
);
</code></pre>
      `,
    },
  ];

  for (const m of materials) {
    await prisma.material.upsert({
      where: { id: m.id },
      update: {
        title: m.title,
        content: m.content,
        order: m.order,
      },
      create: m,
    });
  }

  console.log("✅ Material Level 5 Database SQL seeding completed!");
}

const p = new PrismaClient();
seedLevel5Material(p)
  .catch(console.error)
  .finally(() => p.$disconnect());
