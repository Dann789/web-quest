import { PrismaClient, Difficulty, ChallengeMethod } from "@prisma/client";

const prisma = new PrismaClient();

// =====================================================================
// KONTEN SOAL
// =====================================================================
// Soal: "Tampilkan Daftar Produk"
// Mahasiswa diminta membuat halaman PHP yang menampilkan data dari tabel
// `products` menggunakan koneksi SQLite sandbox.
// =====================================================================

const starterCodeJson = JSON.stringify({
  "index.php": `<?php
// Hubungkan ke database
require_once 'connection.php';

// TODO: Ambil semua data produk dari tabel 'products'
$products = [];

?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Daftar Produk</title>
</head>
<body>
  <h1>Daftar Produk</h1>
  <table border="1">
    <tr>
      <th>ID</th><th>Nama</th><th>Harga</th><th>Stok</th><th>Kategori</th>
    </tr>
    <?php foreach ($products as $row): ?>
    <tr>
      <td><?= $row['id'] ?></td>
      <td><?= $row['name'] ?></td>
      <td>Rp <?= number_format($row['price'], 0, ',', '.') ?></td>
      <td><?= $row['stock'] ?></td>
      <td><?= $row['category'] ?></td>
    </tr>
    <?php endforeach; ?>
  </table>
</body>
</html>`,

  "process.php": `<?php
// File ini menangani proses query ke database
// Dipanggil oleh index.php

require_once 'connection.php';

/**
 * Fungsi untuk mengambil semua produk
 * TODO: Lengkapi fungsi ini agar mengembalikan semua baris dari tabel products
 */
function getAllProducts($db) {
  // Tulis query SELECT di sini
  $stmt = $db->query("/* TODO: tulis query SELECT * FROM products */");
  return $stmt->fetchAll(PDO::FETCH_ASSOC);
}`,

  "connection.php": `<?php
// TODO: Buat koneksi PDO ke SQLite
// File database: sandbox.db (sudah disiapkan oleh sistem)
$db = null;

// Petunjuk:
// $db = new PDO('sqlite:' . __DIR__ . '/sandbox.db');
// $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);`,
});

const correctAnswerJson = JSON.stringify({
  "index.php": `<?php
require_once 'connection.php';
require_once 'process.php';

$products = getAllProducts($db);
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Daftar Produk</title>
</head>
<body>
  <h1>Daftar Produk</h1>
  <table border="1">
    <tr>
      <th>ID</th><th>Nama</th><th>Harga</th><th>Stok</th><th>Kategori</th>
    </tr>
    <?php foreach ($products as $row): ?>
    <tr>
      <td><?= $row['id'] ?></td>
      <td><?= $row['name'] ?></td>
      <td>Rp <?= number_format($row['price'], 0, ',', '.') ?></td>
      <td><?= $row['stock'] ?></td>
      <td><?= $row['category'] ?></td>
    </tr>
    <?php endforeach; ?>
  </table>
</body>
</html>`,

  "process.php": `<?php
require_once 'connection.php';

function getAllProducts($db) {
  $stmt = $db->query("SELECT * FROM products ORDER BY id ASC");
  return $stmt->fetchAll(PDO::FETCH_ASSOC);
}`,

  "connection.php": `<?php
$db = new PDO('sqlite:' . __DIR__ . '/sandbox.db');
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);`,
});

async function main() {
  const challenge = await prisma.challenge.create({
    data: {
      levelId: 4, // PHP Basic
      title: "Tampilkan Daftar Produk",
      description:
        "Buatlah halaman PHP yang menampilkan semua data produk dari database dalam bentuk tabel HTML. " +
        "Kamu perlu membuat koneksi database di `connection.php`, " +
        "fungsi query di `process.php`, " +
        "dan tampilan HTML di `index.php`.",
      difficulty: Difficulty.EASY,
      method: ChallengeMethod.CODING_MANUAL,
      idealTime: 600, // 10 menit (dalam detik)
      xpBase: 50,
      hint:
        "Gunakan PDO dengan driver SQLite untuk koneksi. " +
        "Di connection.php, buat objek $db = new PDO('sqlite:...'). " +
        "Di process.php, gunakan $db->query('SELECT * FROM products'). " +
        "Di index.php, panggil getAllProducts($db) dan tampilkan hasilnya dengan foreach.",
      isActive: true,
      content: {
        starterCode: starterCodeJson,
        correctAnswer: correctAnswerJson,
        language: "php",
        sandboxEnabled: true, // ← tanda bahwa soal ini pakai sandbox
        sandboxLevel: "php_level", // ← folder template yang dipakai
      },
      starterCode: starterCodeJson,
      testCases: [
        {
          input: null,
          expectedOutput: correctAnswerJson,
          isHidden: false,
          weight: 100,
        },
      ],
    },
    select: { id: true, title: true, levelId: true },
  });

  console.log("✅ Challenge berhasil dibuat:");
  console.log(`   ID      : ${challenge.id}`);
  console.log(`   Judul   : ${challenge.title}`);
  console.log(`   Level ID: ${challenge.levelId}`);
  console.log(``);
  console.log(`📂 Sekarang buat file template SQL:`);
  console.log(`   templates/php_level/soal_${challenge.id}_schema.sql`);

  process.exit(0);
}

main().catch((e) => {
  console.error("❌ Gagal:", e.message);
  process.exit(1);
});
