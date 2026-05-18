-- ============================================================
-- db_level / soal_1_schema.sql
-- Studi Kasus: Perpustakaan Digital
-- ============================================================

CREATE TABLE IF NOT EXISTS books (
  id     INTEGER PRIMARY KEY AUTOINCREMENT,
  title  TEXT    NOT NULL,
  author TEXT    NOT NULL,
  year   INTEGER NOT NULL,
  stock  INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS members (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  name      TEXT NOT NULL,
  email     TEXT NOT NULL UNIQUE,
  joined_at TEXT NOT NULL DEFAULT (date('now'))
);

CREATE TABLE IF NOT EXISTS loans (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  book_id     INTEGER NOT NULL REFERENCES books(id),
  member_id   INTEGER NOT NULL REFERENCES members(id),
  loan_date   TEXT    NOT NULL DEFAULT (date('now')),
  return_date TEXT,
  returned    INTEGER NOT NULL DEFAULT 0
);

-- Seed: Books
INSERT INTO books (title, author, year, stock) VALUES
  ('Pemrograman Web Dasar',      'Ahmad Fauzi',     2020, 3),
  ('Database Design Principles', 'Jane Smith',      2019, 2),
  ('PHP & MySQL for Beginners',  'Budi Raharjo',    2021, 4),
  ('SQL Masterclass',            'Chris Anderson',  2022, 2),
  ('JavaScript Modern',          'Eko Kurniawan',   2023, 5);

-- Seed: Members
INSERT INTO members (name, email, joined_at) VALUES
  ('Rina Wulandari', 'rina@student.ac.id',  '2024-01-15'),
  ('Deni Saputra',   'deni@student.ac.id',  '2024-02-01'),
  ('Lila Permata',   'lila@student.ac.id',  '2024-02-10');

-- Seed: Loans
INSERT INTO loans (book_id, member_id, loan_date, return_date, returned) VALUES
  (1, 1, '2024-03-01', '2024-03-15', 1),
  (3, 2, '2024-03-05', NULL,         0),
  (2, 1, '2024-03-10', NULL,         0),
  (4, 3, '2024-03-12', '2024-03-26', 1);
