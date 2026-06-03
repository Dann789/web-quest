import { PrismaClient, Difficulty, ChallengeMethod } from "@prisma/client";

export async function seedLevel5Challenge(prisma: PrismaClient) {
  console.log("🌱 Seeding Challenge Level 5: Database SQL...");

  const challenges = [

  {
    "levelId": 5,
    "levelName": "Database",
    "title": "Tampilkan Semua Buku",
    "description": "Tampilkan seluruh data buku yang tersedia pada tabel books.",
    "difficulty": Difficulty.EASY,
    "method": ChallengeMethod.CODING_MANUAL,
    "idealTime": 300,
    "xpBase": 10,
    "hint": "Gunakan SELECT * FROM books",
    "isActive": true,
    "starterCode": null,
    "correctAnswer": null,
    "buggyCode": null,
    "blocks": null,
    "expectedOrder": null,
    "sandboxEnabled": true,
    "sandboxTemplate": "soal_1",
    "sandboxLevel": "db_level",
    "content": {
      "language": "sql",
      "starterCode": "",
      "sandboxLevel": "db_level",
      "correctAnswer": "SELECT * FROM books;",
      "sandboxEnabled": true,
      "sandboxTemplate": "soal_1"
    },
    "testCases": [
      {
        "input": null,
        "weight": 100,
        "isHidden": false,
        "expectedOutput": "SELECT * FROM books;"
      }
    ]
  },
  {
    "levelId": 5,
    "levelName": "Database",
    "title": "Susun Query Data Dokter",
    "description": "Susun potongan query untuk menampilkan seluruh data dokter.",
    "difficulty": Difficulty.EASY,
    "method": ChallengeMethod.DRAG_AND_DROP,
    "idealTime": 240,
    "xpBase": 10,
    "hint": "Gunakan SELECT dan FROM",
    "isActive": true,
    "starterCode": null,
    "correctAnswer": "SELECT * FROM doctors;",
    "buggyCode": null,
    "blocks": [
      "FROM doctors",
      "SELECT *",
      ";"
    ],
    "expectedOrder": [
      "SELECT *",
      "FROM doctors",
      ";"
    ],
    "sandboxEnabled": true,
    "sandboxTemplate": "soal_2",
    "sandboxLevel": "db_level",
    "content": {
      "language": "sql",
      "starterCode": "",
      "sandboxLevel": "db_level",
      "correctAnswer": "SELECT * FROM doctors;",
      "sandboxEnabled": true,
      "sandboxTemplate": "soal_2"
    },
    "testCases": [
      {
        "input": null,
        "weight": 100,
        "isHidden": false,
        "expectedOutput": "SELECT * FROM doctors;"
      }
    ]
  },
  {
    "levelId": 5,
    "levelName": "Database",
    "title": "Perbaiki Query Mahasiswa",
    "description": "Perbaiki query agar dapat menampilkan seluruh data mahasiswa.",
    "difficulty": Difficulty.EASY,
    "method": ChallengeMethod.FIX_THE_BUG,
    "idealTime": 300,
    "xpBase": 10,
    "hint": "Nama tabel yang benar adalah students",
    "isActive": true,
    "starterCode": null,
    "correctAnswer": "SELECT * FROM students;",
    "buggyCode": "SELECT * FORM student;",
    "blocks": null,
    "expectedOrder": null,
    "sandboxEnabled": true,
    "sandboxTemplate": "soal_3",
    "sandboxLevel": "db_level",
    "content": {
      "language": "sql",
      "starterCode": "SELECT * FORM student;",
      "sandboxLevel": "db_level",
      "correctAnswer": "SELECT * FROM students;",
      "sandboxEnabled": true,
      "sandboxTemplate": "soal_3"
    },
    "testCases": [
      {
        "input": null,
        "weight": 100,
        "isHidden": false,
        "expectedOutput": "SELECT * FROM students;"
      }
    ]
  },
  {
    "levelId": 5,
    "levelName": "Database",
    "title": "Cari Buku Tahun 2022",
    "description": "Tampilkan data buku yang diterbitkan pada tahun 2022.",
    "difficulty": Difficulty.EASY,
    "method": ChallengeMethod.CODING_MANUAL,
    "idealTime": 360,
    "xpBase": 15,
    "hint": "Gunakan WHERE year = 2022",
    "isActive": true,
    "starterCode": null,
    "correctAnswer": null,
    "buggyCode": null,
    "blocks": null,
    "expectedOrder": null,
    "sandboxEnabled": true,
    "sandboxTemplate": "soal_1",
    "sandboxLevel": "db_level",
    "content": {
      "language": "sql",
      "starterCode": "",
      "sandboxLevel": "db_level",
      "correctAnswer": "SELECT * FROM books WHERE year = 2022;",
      "sandboxEnabled": true,
      "sandboxTemplate": "soal_1"
    },
    "testCases": [
      {
        "input": null,
        "weight": 100,
        "isHidden": false,
        "expectedOutput": "SELECT * FROM books WHERE year = 2022;"
      }
    ]
  },
  {
    "levelId": 5,
    "levelName": "Database",
    "title": "Susun Query Jadwal Appointment",
    "description": "Susun query untuk menampilkan appointment dengan status scheduled.",
    "difficulty": Difficulty.MEDIUM,
    "method": ChallengeMethod.DRAG_AND_DROP,
    "idealTime": 420,
    "xpBase": 20,
    "hint": "Gunakan WHERE status = 'scheduled'",
    "isActive": true,
    "starterCode": null,
    "correctAnswer": "SELECT * FROM appointments WHERE status = 'scheduled';",
    "buggyCode": null,
    "blocks": [
      "WHERE status = 'scheduled'",
      "SELECT *",
      "FROM appointments",
      ";"
    ],
    "expectedOrder": [
      "SELECT *",
      "FROM appointments",
      "WHERE status = 'scheduled'",
      ";"
    ],
    "sandboxEnabled": true,
    "sandboxTemplate": "soal_2",
    "sandboxLevel": "db_level",
    "content": {
      "language": "sql",
      "starterCode": "",
      "sandboxLevel": "db_level",
      "correctAnswer": "SELECT * FROM appointments WHERE status = 'scheduled';",
      "sandboxEnabled": true,
      "sandboxTemplate": "soal_2"
    },
    "testCases": [
      {
        "input": null,
        "weight": 100,
        "isHidden": false,
        "expectedOutput": "SELECT * FROM appointments WHERE status = 'scheduled';"
      }
    ]
  },
  {
    "levelId": 5,
    "levelName": "Database",
    "title": "Perbaiki Query Nilai",
    "description": "Perbaiki query untuk menampilkan nilai mahasiswa dengan grade A.",
    "difficulty": Difficulty.MEDIUM,
    "method": ChallengeMethod.FIX_THE_BUG,
    "idealTime": 420,
    "xpBase": 20,
    "hint": "Gunakan tanda petik satu untuk grade",
    "isActive": true,
    "starterCode": null,
    "correctAnswer": "SELECT * FROM grades WHERE grade = 'A';",
    "buggyCode": "SELECT * FROM grades WHERE grade = A;",
    "blocks": null,
    "expectedOrder": null,
    "sandboxEnabled": true,
    "sandboxTemplate": "soal_3",
    "sandboxLevel": "db_level",
    "content": {
      "language": "sql",
      "starterCode": "SELECT * FROM grades WHERE grade = A;",
      "sandboxLevel": "db_level",
      "correctAnswer": "SELECT * FROM grades WHERE grade = 'A';",
      "sandboxEnabled": true,
      "sandboxTemplate": "soal_3"
    },
    "testCases": [
      {
        "input": null,
        "weight": 100,
        "isHidden": false,
        "expectedOutput": "SELECT * FROM grades WHERE grade = 'A';"
      }
    ]
  },
  {
    "levelId": 5,
    "levelName": "Database",
    "title": "Tampilkan Buku Stok Lebih Dari 2",
    "description": "Tampilkan judul dan stok buku yang memiliki stok lebih dari 2.",
    "difficulty": Difficulty.MEDIUM,
    "method": ChallengeMethod.CODING_MANUAL,
    "idealTime": 480,
    "xpBase": 20,
    "hint": "Gunakan SELECT title, stock",
    "isActive": true,
    "starterCode": null,
    "correctAnswer": null,
    "buggyCode": null,
    "blocks": null,
    "expectedOrder": null,
    "sandboxEnabled": true,
    "sandboxTemplate": "soal_1",
    "sandboxLevel": "db_level",
    "content": {
      "language": "sql",
      "starterCode": "",
      "sandboxLevel": "db_level",
      "correctAnswer": "SELECT title, stock FROM books WHERE stock > 2;",
      "sandboxEnabled": true,
      "sandboxTemplate": "soal_1"
    },
    "testCases": [
      {
        "input": null,
        "weight": 100,
        "isHidden": false,
        "expectedOutput": "SELECT title, stock FROM books WHERE stock > 2;"
      }
    ]
  },
  {
    "levelId": 5,
    "levelName": "Database",
    "title": "Join Data Peminjaman Buku",
    "description": "Gabungkan 3 tabel (loans, members, books). Jangan lupa tambahkan klausa kondisional WHERE loans.returned = 0 agar hanya menampilkan buku yang statusnya belum dikembalikan. Tampilkan members.name dan books.title.",
    "difficulty": Difficulty.HARD,
    "method": ChallengeMethod.CODING_MANUAL,
    "idealTime": 720,
    "xpBase": 30,
    "hint": "Gunakan JOIN antara loans, members, dan books",
    "isActive": true,
    "starterCode": null,
    "correctAnswer": null,
    "buggyCode": null,
    "blocks": null,
    "expectedOrder": null,
    "sandboxEnabled": true,
    "sandboxTemplate": "soal_1",
    "sandboxLevel": "db_level",
    "content": {
      "language": "sql",
      "starterCode": "",
      "sandboxLevel": "db_level",
      "correctAnswer": "SELECT members.name, books.title FROM loans JOIN members ON loans.member_id = members.id JOIN books ON loans.book_id = books.id WHERE loans.returned = 0;",
      "sandboxEnabled": true,
      "sandboxTemplate": "soal_1"
    },
    "testCases": [
      {
        "input": null,
        "weight": 100,
        "isHidden": false,
        "expectedOutput": "SELECT members.name, books.title FROM loans JOIN members ON loans.member_id = members.id JOIN books ON loans.book_id = books.id WHERE loans.returned = 0;"
      }
    ]
  },
  {
    "levelId": 5,
    "levelName": "Database",
    "title": "Perbaiki Query Join Dokter dan Pasien",
    "description": "Perbaiki query agar dapat menampilkan nama dokter dan pasien.",
    "difficulty": Difficulty.HARD,
    "method": ChallengeMethod.FIX_THE_BUG,
    "idealTime": 720,
    "xpBase": 30,
    "hint": "Gunakan ON appointments.patient_id = patients.id",
    "isActive": true,
    "starterCode": null,
    "correctAnswer": "SELECT doctors.name, patients.name FROM appointments JOIN doctors ON appointments.doctor_id = doctors.id JOIN patients ON appointments.patient_id = patients.id;",
    "buggyCode": "SELECT doctors.name, patients.name FROM appointments JOIN doctors ON appointments.doctor_id = doctors.id JOIN patients appointments.patient_id = patients.id;",
    "blocks": null,
    "expectedOrder": null,
    "sandboxEnabled": true,
    "sandboxTemplate": "soal_2",
    "sandboxLevel": "db_level",
    "content": {
      "language": "sql",
      "starterCode": "SELECT doctors.name, patients.name FROM appointments JOIN doctors ON appointments.doctor_id = doctors.id JOIN patients appointments.patient_id = patients.id;",
      "sandboxLevel": "db_level",
      "correctAnswer": "SELECT doctors.name, patients.name FROM appointments JOIN doctors ON appointments.doctor_id = doctors.id JOIN patients ON appointments.patient_id = patients.id;",
      "sandboxEnabled": true,
      "sandboxTemplate": "soal_2"
    },
    "testCases": [
      {
        "input": null,
        "weight": 100,
        "isHidden": false,
        "expectedOutput": "SELECT doctors.name, patients.name FROM appointments JOIN doctors ON appointments.doctor_id = doctors.id JOIN patients ON appointments.patient_id = patients.id;"
      }
    ]
  },

  {
  "levelId": 5,
  "levelName": "Database",
  "title": "Susun Query Nilai Tertinggi",
  "description": "Susun query untuk menampilkan nama mahasiswa dan nilai di atas 80.",
  "difficulty": Difficulty.HARD,
  "method": ChallengeMethod.DRAG_AND_DROP,
  "idealTime": 840,
  "xpBase": 35,
  "hint": "Gunakan JOIN students dan grades",
  "isActive": true,
  "starterCode": null,
  "correctAnswer": "SELECT students.name, grades.score FROM grades JOIN students ON grades.student_id = students.id WHERE grades.score > 80;",
  "buggyCode": null,
  "blocks": [
    "WHERE grades.score > 80",
    "JOIN students ON grades.student_id = students.id",
    "SELECT students.name, grades.score",
    "FROM grades",
    ";"
  ],
  "expectedOrder": [
    "SELECT students.name, grades.score",
    "FROM grades",
    "JOIN students ON grades.student_id = students.id",
    "WHERE grades.score > 80",
    ";"
  ],
  "sandboxEnabled": true,
  "sandboxTemplate": "soal_3",
  "sandboxLevel": "db_level",
  "content": {
    "language": "sql",
    "starterCode": "",
    "sandboxLevel": "db_level",
    "correctAnswer": "SELECT students.name, grades.score FROM grades JOIN students ON grades.student_id = students.id WHERE grades.score > 80;",
    "sandboxEnabled": true,
    "sandboxTemplate": "soal_3"
  },
  "testCases": [
    {
      "input": null,
      "weight": 100,
      "isHidden": false,
      "expectedOutput": "SELECT students.name, grades.score FROM grades JOIN students ON grades.student_id = students.id WHERE grades.score > 80;"
    }
  ]
},
{
  "levelId": 5,
  "levelName": "Database",
  "title": "Tampilkan Nama Member",
  "description": "Tampilkan hanya kolom nama dari tabel members.",
  "difficulty": Difficulty.EASY,
  "method": ChallengeMethod.CODING_MANUAL,
  "idealTime": 300,
  "xpBase": 10,
  "hint": "Gunakan SELECT name",
  "isActive": true,
  "starterCode": null,
  "correctAnswer": null,
  "buggyCode": null,
  "blocks": null,
  "expectedOrder": null,
  "sandboxEnabled": true,
  "sandboxTemplate": "soal_1",
  "sandboxLevel": "db_level",
  "content": {
    "language": "sql",
    "starterCode": "",
    "sandboxLevel": "db_level",
    "correctAnswer": "SELECT name FROM members;",
    "sandboxEnabled": true,
    "sandboxTemplate": "soal_1"
  },
  "testCases": [
    {
      "input": null,
      "weight": 100,
      "isHidden": false,
      "expectedOutput": "SELECT name FROM members;"
    }
  ]
},
{
  "levelId": 5,
  "levelName": "Database",
  "title": "Perbaiki Query Doctors",
  "description": "Perbaiki query agar dapat menampilkan semua data doctors.",
  "difficulty": Difficulty.EASY,
  "method": ChallengeMethod.FIX_THE_BUG,
  "idealTime": 320,
  "xpBase": 10,
  "hint": "Gunakan FROM doctors",
  "isActive": true,
  "starterCode": null,
  "correctAnswer": "SELECT * FROM doctors;",
  "buggyCode": "SELECT FROM doctors;",
  "blocks": null,
  "expectedOrder": null,
  "sandboxEnabled": true,
  "sandboxTemplate": "soal_2",
  "sandboxLevel": "db_level",
  "content": {
    "language": "sql",
    "starterCode": "SELECT FROM doctors;",
    "sandboxLevel": "db_level",
    "correctAnswer": "SELECT * FROM doctors;",
    "sandboxEnabled": true,
    "sandboxTemplate": "soal_2"
  },
  "testCases": [
    {
      "input": null,
      "weight": 100,
      "isHidden": false,
      "expectedOutput": "SELECT * FROM doctors;"
    }
  ]
},
{
  "levelId": 5,
  "levelName": "Database",
  "title": "Susun Query Patients",
  "description": "Susun query untuk menampilkan semua data patients.",
  "difficulty": Difficulty.EASY,
  "method": ChallengeMethod.DRAG_AND_DROP,
  "idealTime": 300,
  "xpBase": 10,
  "hint": "Gunakan SELECT dan FROM",
  "isActive": true,
  "starterCode": null,
  "correctAnswer": "SELECT * FROM patients;",
  "buggyCode": null,
  "blocks": [
    ";",
    "FROM patients",
    "SELECT *"
  ],
  "expectedOrder": [
    "SELECT *",
    "FROM patients",
    ";"
  ],
  "sandboxEnabled": true,
  "sandboxTemplate": "soal_2",
  "sandboxLevel": "db_level",
  "content": {
    "language": "sql",
    "starterCode": "",
    "sandboxLevel": "db_level",
    "correctAnswer": "SELECT * FROM patients;",
    "sandboxEnabled": true,
    "sandboxTemplate": "soal_2"
  },
  "testCases": [
    {
      "input": null,
      "weight": 100,
      "isHidden": false,
      "expectedOutput": "SELECT * FROM patients;"
    }
  ]
},
{
  "levelId": 5,
  "levelName": "Database",
  "title": "Cari Mahasiswa Teknik Informatika",
  "description": "Tampilkan data mahasiswa yang berada di prodi 'Teknik Informatika'.",
  "difficulty": Difficulty.EASY,
  "method": ChallengeMethod.CODING_MANUAL,
  "idealTime": 360,
  "xpBase": 15,
  "hint": "Gunakan WHERE prodi = 'Teknik Informatika'",
  "isActive": true,
  "starterCode": null,
  "correctAnswer": null,
  "buggyCode": null,
  "blocks": null,
  "expectedOrder": null,
  "sandboxEnabled": true,
  "sandboxTemplate": "soal_3",
  "sandboxLevel": "db_level",
  "content": {
    "language": "sql",
    "starterCode": "",
    "sandboxLevel": "db_level",
    "correctAnswer": "SELECT * FROM students WHERE prodi = 'Teknik Informatika';",
    "sandboxEnabled": true,
    "sandboxTemplate": "soal_3"
  },
  "testCases": [
    {
      "input": null,
      "weight": 100,
      "isHidden": false,
      "expectedOutput": "SELECT * FROM students WHERE prodi = 'Teknik Informatika';"
    }
  ]
},
{
  "levelId": 5,
  "levelName": "Database",
  "title": "Tampilkan Buku Berdasarkan Penulis",
  "description": "Tampilkan buku yang ditulis oleh 'Andrea Hirata'.",
  "difficulty": Difficulty.MEDIUM,
  "method": ChallengeMethod.CODING_MANUAL,
  "idealTime": 420,
  "xpBase": 20,
  "hint": "Gunakan WHERE author = 'Andrea Hirata'",
  "isActive": true,
  "starterCode": null,
  "correctAnswer": null,
  "buggyCode": null,
  "blocks": null,
  "expectedOrder": null,
  "sandboxEnabled": true,
  "sandboxTemplate": "soal_1",
  "sandboxLevel": "db_level",
  "content": {
    "language": "sql",
    "starterCode": "",
    "sandboxLevel": "db_level",
    "correctAnswer": "SELECT * FROM books WHERE author = 'Andrea Hirata';",
    "sandboxEnabled": true,
    "sandboxTemplate": "soal_1"
  },
  "testCases": [
    {
      "input": null,
      "weight": 100,
      "isHidden": false,
      "expectedOutput": "SELECT * FROM books WHERE author = 'Andrea Hirata';"
    }
  ]
},
{
  "levelId": 5,
  "levelName": "Database",
  "title": "Perbaiki Query Appointment",
  "description": "Perbaiki query untuk mencari appointment dengan status completed.",
  "difficulty": Difficulty.MEDIUM,
  "method": ChallengeMethod.FIX_THE_BUG,
  "idealTime": 450,
  "xpBase": 20,
  "hint": "Gunakan tanda petik satu",
  "isActive": true,
  "starterCode": null,
  "correctAnswer": "SELECT * FROM appointments WHERE status = 'completed';",
  "buggyCode": "SELECT * FROM appointments WHERE status = completed;",
  "blocks": null,
  "expectedOrder": null,
  "sandboxEnabled": true,
  "sandboxTemplate": "soal_2",
  "sandboxLevel": "db_level",
  "content": {
    "language": "sql",
    "starterCode": "SELECT * FROM appointments WHERE status = completed;",
    "sandboxLevel": "db_level",
    "correctAnswer": "SELECT * FROM appointments WHERE status = 'completed';",
    "sandboxEnabled": true,
    "sandboxTemplate": "soal_2"
  },
  "testCases": [
    {
      "input": null,
      "weight": 100,
      "isHidden": false,
      "expectedOutput": "SELECT * FROM appointments WHERE status = 'completed';"
    }
  ]
},
{
  "levelId": 5,
  "levelName": "Database",
  "title": "Susun Query Nilai B",
  "description": "Susun query untuk menampilkan nilai dengan grade B.",
  "difficulty": Difficulty.MEDIUM,
  "method": ChallengeMethod.DRAG_AND_DROP,
  "idealTime": 480,
  "xpBase": 20,
  "hint": "Gunakan WHERE grade = 'B'",
  "isActive": true,
  "starterCode": null,
  "correctAnswer": "SELECT * FROM grades WHERE grade = 'B';",
  "buggyCode": null,
  "blocks": [
    "FROM grades",
    "SELECT *",
    "WHERE grade = 'B'",
    ";"
  ],
  "expectedOrder": [
    "SELECT *",
    "FROM grades",
    "WHERE grade = 'B'",
    ";"
  ],
  "sandboxEnabled": true,
  "sandboxTemplate": "soal_3",
  "sandboxLevel": "db_level",
  "content": {
    "language": "sql",
    "starterCode": "",
    "sandboxLevel": "db_level",
    "correctAnswer": "SELECT * FROM grades WHERE grade = 'B';",
    "sandboxEnabled": true,
    "sandboxTemplate": "soal_3"
  },
  "testCases": [
    {
      "input": null,
      "weight": 100,
      "isHidden": false,
      "expectedOutput": "SELECT * FROM grades WHERE grade = 'B';"
    }
  ]
},
{
  "levelId": 5,
  "levelName": "Database",
  "title": "Urutkan Buku Berdasarkan Tahun",
  "description": "Tampilkan semua buku dan urutkan berdasarkan tahun terbaru.",
  "difficulty": Difficulty.MEDIUM,
  "method": ChallengeMethod.CODING_MANUAL,
  "idealTime": 520,
  "xpBase": 20,
  "hint": "Gunakan ORDER BY year DESC",
  "isActive": true,
  "starterCode": null,
  "correctAnswer": null,
  "buggyCode": null,
  "blocks": null,
  "expectedOrder": null,
  "sandboxEnabled": true,
  "sandboxTemplate": "soal_1",
  "sandboxLevel": "db_level",
  "content": {
    "language": "sql",
    "starterCode": "",
    "sandboxLevel": "db_level",
    "correctAnswer": "SELECT * FROM books ORDER BY year DESC;",
    "sandboxEnabled": true,
    "sandboxTemplate": "soal_1"
  },
  "testCases": [
    {
      "input": null,
      "weight": 100,
      "isHidden": false,
      "expectedOutput": "SELECT * FROM books ORDER BY year DESC;"
    }
  ]
},
{
  "levelId": 5,
  "levelName": "Database",
  "title": "Hitung Jumlah Patients",
  "description": "Hitung jumlah seluruh data patients.",
  "difficulty": Difficulty.MEDIUM,
  "method": ChallengeMethod.CODING_MANUAL,
  "idealTime": 540,
  "xpBase": 20,
  "hint": "Gunakan COUNT(*)",
  "isActive": true,
  "starterCode": null,
  "correctAnswer": null,
  "buggyCode": null,
  "blocks": null,
  "expectedOrder": null,
  "sandboxEnabled": true,
  "sandboxTemplate": "soal_2",
  "sandboxLevel": "db_level",
  "content": {
    "language": "sql",
    "starterCode": "",
    "sandboxLevel": "db_level",
    "correctAnswer": "SELECT COUNT(*) FROM patients;",
    "sandboxEnabled": true,
    "sandboxTemplate": "soal_2"
  },
  "testCases": [
    {
      "input": null,
      "weight": 100,
      "isHidden": false,
      "expectedOutput": "SELECT COUNT(*) FROM patients;"
    }
  ]
},
{
  "levelId": 5,
  "levelName": "Database",
  "title": "Perbaiki Query Order By",
  "description": "Perbaiki query untuk mengurutkan students berdasarkan nama.",
  "difficulty": Difficulty.MEDIUM,
  "method": ChallengeMethod.FIX_THE_BUG,
  "idealTime": 540,
  "xpBase": 20,
  "hint": "Gunakan ORDER BY name ASC",
  "isActive": true,
  "starterCode": null,
  "correctAnswer": "SELECT * FROM students ORDER BY name ASC;",
  "buggyCode": "SELECT * FROM students ORDER name ASC;",
  "blocks": null,
  "expectedOrder": null,
  "sandboxEnabled": true,
  "sandboxTemplate": "soal_3",
  "sandboxLevel": "db_level",
  "content": {
    "language": "sql",
    "starterCode": "SELECT * FROM students ORDER name ASC;",
    "sandboxLevel": "db_level",
    "correctAnswer": "SELECT * FROM students ORDER BY name ASC;",
    "sandboxEnabled": true,
    "sandboxTemplate": "soal_3"
  },
  "testCases": [
    {
      "input": null,
      "weight": 100,
      "isHidden": false,
      "expectedOutput": "SELECT * FROM students ORDER BY name ASC;"
    }
  ]
},
{
  "levelId": 5,
  "levelName": "Database",
  "title": "Join Buku dan Member",
  "description": "Asumsikan tabel 'members' punya kolom (id, name) dan tabel 'loans' punya kolom (member_id, loan_date). Lakukan operasi JOIN di antara keduanya untuk menampilkan nama member dan tanggal peminjaman buku.",
  "difficulty": Difficulty.HARD,
  "method": ChallengeMethod.CODING_MANUAL,
  "idealTime": 720,
  "xpBase": 30,
  "hint": "Gunakan JOIN loans dan members",
  "isActive": true,
  "starterCode": null,
  "correctAnswer": null,
  "buggyCode": null,
  "blocks": null,
  "expectedOrder": null,
  "sandboxEnabled": true,
  "sandboxTemplate": "soal_1",
  "sandboxLevel": "db_level",
  "content": {
    "language": "sql",
    "starterCode": "",
    "sandboxLevel": "db_level",
    "correctAnswer": "SELECT members.name, loans.loan_date FROM loans JOIN members ON loans.member_id = members.id;",
    "sandboxEnabled": true,
    "sandboxTemplate": "soal_1"
  },
  "testCases": [
    {
      "input": null,
      "weight": 100,
      "isHidden": false,
      "expectedOutput": "SELECT members.name, loans.loan_date FROM loans JOIN members ON loans.member_id = members.id;"
    }
  ]
},
{
  "levelId": 5,
  "levelName": "Database",
  "title": "Susun Query Join Doctors",
  "description": "Susun query untuk menampilkan nama dokter dan jadwal appointment.",
  "difficulty": Difficulty.HARD,
  "method": ChallengeMethod.DRAG_AND_DROP,
  "idealTime": 760,
  "xpBase": 30,
  "hint": "Gunakan JOIN doctors",
  "isActive": true,
  "starterCode": null,
  "correctAnswer": "SELECT doctors.name, appointments.schedule FROM appointments JOIN doctors ON appointments.doctor_id = doctors.id;",
  "buggyCode": null,
  "blocks": [
    "JOIN doctors ON appointments.doctor_id = doctors.id",
    "SELECT doctors.name, appointments.schedule",
    "FROM appointments",
    ";"
  ],
  "expectedOrder": [
    "SELECT doctors.name, appointments.schedule",
    "FROM appointments",
    "JOIN doctors ON appointments.doctor_id = doctors.id",
    ";"
  ],
  "sandboxEnabled": true,
  "sandboxTemplate": "soal_2",
  "sandboxLevel": "db_level",
  "content": {
    "language": "sql",
    "starterCode": "",
    "sandboxLevel": "db_level",
    "correctAnswer": "SELECT doctors.name, appointments.schedule FROM appointments JOIN doctors ON appointments.doctor_id = doctors.id;",
    "sandboxEnabled": true,
    "sandboxTemplate": "soal_2"
  },
  "testCases": [
    {
      "input": null,
      "weight": 100,
      "isHidden": false,
      "expectedOutput": "SELECT doctors.name, appointments.schedule FROM appointments JOIN doctors ON appointments.doctor_id = doctors.id;"
    }
  ]
},
{
  "levelId": 5,
  "levelName": "Database",
  "title": "Perbaiki Query Join Grades",
  "description": "Perbaiki query agar dapat menampilkan nama mahasiswa dan grade.",
  "difficulty": Difficulty.HARD,
  "method": ChallengeMethod.FIX_THE_BUG,
  "idealTime": 780,
  "xpBase": 35,
  "hint": "Gunakan JOIN students ON grades.student_id = students.id",
  "isActive": true,
  "starterCode": null,
  "correctAnswer": "SELECT students.name, grades.grade FROM grades JOIN students ON grades.student_id = students.id;",
  "buggyCode": "SELECT students.name, grades.grade FROM grades JOIN students grades.student_id = students.id;",
  "blocks": null,
  "expectedOrder": null,
  "sandboxEnabled": true,
  "sandboxTemplate": "soal_3",
  "sandboxLevel": "db_level",
  "content": {
    "language": "sql",
    "starterCode": "SELECT students.name, grades.grade FROM grades JOIN students grades.student_id = students.id;",
    "sandboxLevel": "db_level",
    "correctAnswer": "SELECT students.name, grades.grade FROM grades JOIN students ON grades.student_id = students.id;",
    "sandboxEnabled": true,
    "sandboxTemplate": "soal_3"
  },
  "testCases": [
    {
      "input": null,
      "weight": 100,
      "isHidden": false,
      "expectedOutput": "SELECT students.name, grades.grade FROM grades JOIN students ON grades.student_id = students.id;"
    }
  ]
},
{
  "levelId": 5,
  "levelName": "Database",
  "title": "Tambah Mahasiswa Baru",
  "description": "Tambahkan data mahasiswa baru dengan nim '2021004', nama 'Budi', dan prodi 'Sistem Informasi' ke tabel students.",
  "difficulty": Difficulty.MEDIUM,
  "method": ChallengeMethod.CODING_MANUAL,
  "idealTime": 400,
  "xpBase": 20,
  "hint": "Gunakan INSERT INTO students (nim, name, prodi) VALUES ('2021004', 'Budi', 'Sistem Informasi')",
  "isActive": true,
  "starterCode": null,
  "correctAnswer": null,
  "buggyCode": null,
  "blocks": null,
  "expectedOrder": null,
  "sandboxEnabled": true,
  "sandboxTemplate": "soal_3",
  "sandboxLevel": "db_level",
  "content": {
    "language": "sql",
    "starterCode": "",
    "sandboxLevel": "db_level",
    "correctAnswer": "INSERT INTO students (nim, name, prodi) VALUES ('2021004', 'Budi', 'Sistem Informasi');",
    "sandboxEnabled": true,
    "sandboxTemplate": "soal_3"
  },
  "testCases": [
    {
      "input": null,
      "weight": 100,
      "isHidden": false,
      "expectedOutput": "INSERT INTO students (nim, name, prodi) VALUES ('2021004', 'Budi', 'Sistem Informasi');"
    }
  ]
},
{
  "levelId": 5,
  "levelName": "Database",
  "title": "Update Stok Buku",
  "description": "Ubah stok buku menjadi 10 untuk buku dengan id = 1.",
  "difficulty": Difficulty.MEDIUM,
  "method": ChallengeMethod.DRAG_AND_DROP,
  "idealTime": 420,
  "xpBase": 20,
  "hint": "Gunakan UPDATE books SET stock = 10",
  "isActive": true,
  "starterCode": null,
  "correctAnswer": "UPDATE books SET stock = 10 WHERE id = 1;",
  "buggyCode": null,
  "blocks": [
    "UPDATE books",
    "WHERE id = 1",
    "SET stock = 10",
    ";"
  ],
  "expectedOrder": [
    "UPDATE books",
    "SET stock = 10",
    "WHERE id = 1",
    ";"
  ],
  "sandboxEnabled": true,
  "sandboxTemplate": "soal_1",
  "sandboxLevel": "db_level",
  "content": {
    "language": "sql",
    "starterCode": "",
    "sandboxLevel": "db_level",
    "correctAnswer": "UPDATE books SET stock = 10 WHERE id = 1;",
    "sandboxEnabled": true,
    "sandboxTemplate": "soal_1"
  },
  "testCases": [
    {
      "input": null,
      "weight": 100,
      "isHidden": false,
      "expectedOutput": "UPDATE books SET stock = 10 WHERE id = 1;"
    }
  ]
},
{
  "levelId": 5,
  "levelName": "Database",
  "title": "Hapus Data Pasien",
  "description": "Perbaiki query untuk menghapus data pasien yang memiliki id = 5.",
  "difficulty": Difficulty.MEDIUM,
  "method": ChallengeMethod.FIX_THE_BUG,
  "idealTime": 420,
  "xpBase": 20,
  "hint": "Gunakan DELETE FROM patients",
  "isActive": true,
  "starterCode": null,
  "correctAnswer": "DELETE FROM patients WHERE id = 5;",
  "buggyCode": "DELETE * FROM patients WHERE id = 5;",
  "blocks": null,
  "expectedOrder": null,
  "sandboxEnabled": true,
  "sandboxTemplate": "soal_2",
  "sandboxLevel": "db_level",
  "content": {
    "language": "sql",
    "starterCode": "DELETE * FROM patients WHERE id = 5;",
    "sandboxLevel": "db_level",
    "correctAnswer": "DELETE FROM patients WHERE id = 5;",
    "sandboxEnabled": true,
    "sandboxTemplate": "soal_2"
  },
  "testCases": [
    {
      "input": null,
      "weight": 100,
      "isHidden": false,
      "expectedOutput": "DELETE FROM patients WHERE id = 5;"
    }
  ]
},
{
  "levelId": 5,
  "levelName": "Database",
  "title": "Kelompokkan Buku per Penulis",
  "description": "Tampilkan nama penulis (author) dan hitung jumlah buku yang ditulis oleh masing-masing penulis menggunakan GROUP BY.",
  "difficulty": Difficulty.HARD,
  "method": ChallengeMethod.CODING_MANUAL,
  "idealTime": 600,
  "xpBase": 30,
  "hint": "Gunakan SELECT author, COUNT(*) dan GROUP BY author",
  "isActive": true,
  "starterCode": null,
  "correctAnswer": null,
  "buggyCode": null,
  "blocks": null,
  "expectedOrder": null,
  "sandboxEnabled": true,
  "sandboxTemplate": "soal_1",
  "sandboxLevel": "db_level",
  "content": {
    "language": "sql",
    "starterCode": "",
    "sandboxLevel": "db_level",
    "correctAnswer": "SELECT author, COUNT(*) FROM books GROUP BY author;",
    "sandboxEnabled": true,
    "sandboxTemplate": "soal_1"
  },
  "testCases": [
    {
      "input": null,
      "weight": 100,
      "isHidden": false,
      "expectedOutput": "SELECT author, COUNT(*) FROM books GROUP BY author;"
    }
  ]
},
{
  "levelId": 5,
  "levelName": "Database",
  "title": "Hitung Rata-Rata Nilai",
  "description": "Susun query untuk menghitung rata-rata skor (score) dari tabel grades.",
  "difficulty": Difficulty.MEDIUM,
  "method": ChallengeMethod.DRAG_AND_DROP,
  "idealTime": 420,
  "xpBase": 20,
  "hint": "Gunakan fungsi AVG(score)",
  "isActive": true,
  "starterCode": null,
  "correctAnswer": "SELECT AVG(score) FROM grades;",
  "buggyCode": null,
  "blocks": [
    "FROM grades",
    ";",
    "SELECT AVG(score)"
  ],
  "expectedOrder": [
    "SELECT AVG(score)",
    "FROM grades",
    ";"
  ],
  "sandboxEnabled": true,
  "sandboxTemplate": "soal_3",
  "sandboxLevel": "db_level",
  "content": {
    "language": "sql",
    "starterCode": "",
    "sandboxLevel": "db_level",
    "correctAnswer": "SELECT AVG(score) FROM grades;",
    "sandboxEnabled": true,
    "sandboxTemplate": "soal_3"
  },
  "testCases": [
    {
      "input": null,
      "weight": 100,
      "isHidden": false,
      "expectedOutput": "SELECT AVG(score) FROM grades;"
    }
  ]
}
];

  for (const c of challenges) {
    // 1. Cari apakah tantangan dengan judul dan level yang sama sudah ada di DB
    const existing = await prisma.challenge.findFirst({
      where: {
        levelId: c.levelId,
        title: c.title,
      },
    });

    // 2. Saring data agar hanya kolom yang valid di schema Prisma yang dikirim
    const challengeData = {
      levelId: c.levelId,
      title: c.title,
      description: c.description,
      difficulty: c.difficulty,
      method: c.method,
      idealTime: c.idealTime,
      xpBase: c.xpBase,
      isActive: c.isActive !== undefined ? c.isActive : true,
      hint: c.hint || null,
      starterCode: c.starterCode || null,
      content: c.content ? {
        ...(c.content as any),
        ...(c.blocks ? { blocks: c.blocks } : {}),
        ...(c.expectedOrder ? { expectedOrder: c.expectedOrder } : {}),
        ...(c.buggyCode ? { buggyCode: c.buggyCode } : {})
      } : null,
      testCases: c.testCases ? (c.testCases as any) : null,
    };

    if (existing) {
      // Jika data sudah ada, lakukan update
      await prisma.challenge.update({
        where: { id: existing.id },
        data: challengeData,
      });
    } else {
      // Jika data belum ada, buat baru (ID akan diisi oleh auto-increment database)
      await prisma.challenge.create({
        data: challengeData,
      });
    }
  }

  console.log("✅ Challenge Level 5 Database SQL seeding completed!");
}

const p = new PrismaClient();
seedLevel5Challenge(p)
  .catch(console.error)
  .finally(() => p.$disconnect());