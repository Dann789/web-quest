-- ============================================================
-- db_level / soal_3_schema.sql
-- Studi Kasus: Sistem Nilai Mahasiswa
-- ============================================================

CREATE TABLE IF NOT EXISTS students (
  id    INTEGER PRIMARY KEY AUTOINCREMENT,
  nim   TEXT    NOT NULL UNIQUE,
  name  TEXT    NOT NULL,
  prodi TEXT    NOT NULL
);

CREATE TABLE IF NOT EXISTS courses (
  id   INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT    NOT NULL UNIQUE,
  name TEXT    NOT NULL,
  sks  INTEGER NOT NULL DEFAULT 3
);

CREATE TABLE IF NOT EXISTS grades (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL REFERENCES students(id),
  course_id  INTEGER NOT NULL REFERENCES courses(id),
  semester   TEXT    NOT NULL,
  score      REAL    NOT NULL,
  grade      TEXT    NOT NULL,
  UNIQUE (student_id, course_id, semester)
);

-- Seed: Students
INSERT INTO students (nim, name, prodi) VALUES
  ('2021001', 'Ahmad Fauzan',   'Teknik Informatika'),
  ('2021002', 'Bella Safitri',  'Sistem Informasi'),
  ('2021003', 'Candra Putra',   'Teknik Informatika');

-- Seed: Courses
INSERT INTO courses (code, name, sks) VALUES
  ('IF101', 'Algoritma dan Pemrograman', 3),
  ('IF201', 'Basis Data',               3),
  ('IF301', 'Pemrograman Web',          3),
  ('SI201', 'Sistem Informasi Manajemen', 3);

-- Seed: Grades
INSERT INTO grades (student_id, course_id, semester, score, grade) VALUES
  (1, 1, '2022/2023-1', 88.0, 'A'),
  (1, 2, '2022/2023-1', 75.5, 'B'),
  (2, 1, '2022/2023-1', 92.0, 'A'),
  (2, 3, '2022/2023-2', 68.0, 'C'),
  (3, 2, '2022/2023-1', 80.0, 'B+'),
  (3, 4, '2022/2023-2', 55.0, 'D');
