-- ============================================================
-- db_level / soal_2_schema.sql
-- Studi Kasus: Klinik & Jadwal Dokter
-- ============================================================

CREATE TABLE IF NOT EXISTS doctors (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT NOT NULL,
  specialist TEXT NOT NULL,
  phone      TEXT
);

CREATE TABLE IF NOT EXISTS patients (
  id      INTEGER PRIMARY KEY AUTOINCREMENT,
  name    TEXT NOT NULL,
  dob     TEXT NOT NULL,
  address TEXT
);

CREATE TABLE IF NOT EXISTS appointments (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  doctor_id  INTEGER NOT NULL REFERENCES doctors(id),
  patient_id INTEGER NOT NULL REFERENCES patients(id),
  schedule   TEXT    NOT NULL,
  complaint  TEXT    NOT NULL,
  status     TEXT    NOT NULL DEFAULT 'scheduled'
);

-- Seed: Doctors
INSERT INTO doctors (name, specialist, phone) VALUES
  ('dr. Andi Wijaya',    'Umum',      '081111111111'),
  ('dr. Sari Dewi',      'Gigi',      '082222222222'),
  ('dr. Hendra Kusuma',  'Anak',      '083333333333');

-- Seed: Patients
INSERT INTO patients (name, dob, address) VALUES
  ('Bambang Susilo',  '1990-05-14', 'Jl. Merdeka No. 1, Jakarta'),
  ('Dewi Lestari',    '1995-08-22', 'Jl. Sudirman No. 10, Bandung'),
  ('Faisal Rahman',   '2000-01-30', 'Jl. Diponegoro No. 5, Surabaya');

-- Seed: Appointments
INSERT INTO appointments (doctor_id, patient_id, schedule, complaint, status) VALUES
  (1, 1, '2024-04-01 09:00:00', 'Demam dan batuk',        'completed'),
  (2, 2, '2024-04-02 10:30:00', 'Sakit gigi geraham',     'completed'),
  (3, 3, '2024-04-03 08:00:00', 'Konsultasi tumbuh kembang', 'scheduled'),
  (1, 2, '2024-04-04 13:00:00', 'Cek tekanan darah',      'cancelled');
