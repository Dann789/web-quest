-- ============================================================
-- php_level / soal_2_schema.sql
-- Studi Kasus: Sistem Login & Register
-- ============================================================

CREATE TABLE IF NOT EXISTS users (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  username   TEXT NOT NULL UNIQUE,
  email      TEXT NOT NULL UNIQUE,
  password   TEXT NOT NULL,
  role       TEXT NOT NULL DEFAULT 'user',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  is_active  INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS sessions (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id    INTEGER NOT NULL REFERENCES users(id),
  token      TEXT    NOT NULL UNIQUE,
  created_at TEXT    NOT NULL DEFAULT (datetime('now')),
  expires_at TEXT    NOT NULL
);

-- Seed: Users (1 admin + 2 user biasa)
INSERT INTO users (username, email, password, role, created_at, is_active) VALUES
  ('admin',     'admin@platform.com',  'hashed_admin_pass',  'admin', '2024-01-01 08:00:00', 1),
  ('mahasiswa1','mhs1@student.ac.id',  'hashed_pass_mhs1',   'user',  '2024-01-05 09:00:00', 1),
  ('mahasiswa2','mhs2@student.ac.id',  'hashed_pass_mhs2',   'user',  '2024-01-07 10:30:00', 0);

-- Seed: Sessions
INSERT INTO sessions (user_id, token, created_at, expires_at) VALUES
  (2, 'tok_abc123xyz', '2024-01-10 08:00:00', '2024-01-10 20:00:00'),
  (3, 'tok_def456uvw', '2024-01-11 09:00:00', '2024-01-11 21:00:00');
