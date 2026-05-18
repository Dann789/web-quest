-- ============================================================
-- php_level / soal_18_schema.sql
-- Challenge: "Tampilkan Daftar Produk"
-- Level: PHP Basic (Level ID 4) | Difficulty: EASY
-- ============================================================
-- Tabel ini akan digunakan mahasiswa via koneksi PDO SQLite
-- di file connection.php mereka.
-- ============================================================

CREATE TABLE IF NOT EXISTS products (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  name     TEXT    NOT NULL,
  price    REAL    NOT NULL,
  stock    INTEGER NOT NULL DEFAULT 0,
  category TEXT    NOT NULL
);

-- Seed: 5 produk awal sebagai data latihan
INSERT INTO products (name, price, stock, category) VALUES
  ('Laptop Asus VivoBook',    8500000,  10, 'Elektronik'),
  ('Mouse Wireless Logitech',  250000,  50, 'Aksesoris'),
  ('Keyboard Mechanical',      450000,  30, 'Aksesoris'),
  ('Monitor 24 inch FHD',    2100000,  15, 'Elektronik'),
  ('Headset Gaming',           350000,  20, 'Aksesoris');
