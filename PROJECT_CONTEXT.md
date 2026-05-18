# Web Quest - Gamification Learning Platform

## Project Overview
Platform pembelajaran pemrograman web berbasis gamifikasi untuk mahasiswa IT Politeknik Negeri Malang. Sistem ini adalah bagian dari skripsi dengan evaluasi UX menggunakan metode UEQ.

## Tech Stack
- **Backend**: Bun + Elysia+ TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Frontend**: React + TypeScript + Vite
- **Authentication**: @elysiajs/jwt plugin
- **Code Editor**: Monaco Editor
- **Scheduling**: Bun's native cron (untuk leaderboard weekly lock)
- **Validation**: Elysia's built-in type validation

## Database Schema
Lihat file: `prisma/schema.prisma`
- 13 tabel utama dengan relasi One-to-Many dan Many-to-Many
- Seed data sudah tersedia di `prisma/seed.ts`

## User Roles
1. **ADMIN**: Dapat CRUD users, monitoring aktivitas, dan melihat leaderboard
2. **USER**: Mahasiswa yang belajar, mengerjakan challenge, dan berkompetisi di leaderboard
3. **DOSEN**: Dosen yang dapat mengelola level, materi, challenge, dan melihat leaderboard

## Core Features

### Admin Features
1. User Management (CRUD users, no self-registration)
2. Material Management (CRUD per level)
3. Challenge Management (CRUD dengan 5 metode: Drag & Drop, Coding Manual, Fix The Bug, Scenario-Based)
4. Activity Monitoring (log user activities)
5. Leaderboard Monitoring

### User Features
1. Level Progression System (5 levels: HTML, CSS, JS, PHP, Database)
2. Material Learning (baca materi → dapat XP)
3. Challenge System (18 challenges per level: 5 easy, 10 medium, 3 hard)
4. XP & Progress Tracking
5. Leaderboard (per level + global, weekly cycle dengan auto-lock)
6. Badge Collection (7 badges dengan kondisi berbeda)

## XP & Level System
- Level 1 (HTML): 0 XP required (auto-unlocked)
- Level 2 (CSS): 250 XP required
- Level 3 (JavaScript): 500 XP required
- Level 4 (PHP): 1000 XP required
- Level 5 (Database): 2000 XP required

## Challenge XP Calculation
- Easy: 10 XP base
- Medium: 20 XP base
- Hard: 30 XP base
- Penalty: -5 XP jika melebihi waktu ideal
- XP hanya diberikan pada first attempt yang berhasil

## Leaderboard Mechanism
- Ranking berdasarkan: Total XP (primary), Total Time (secondary)
- Weekly cycle: 7 hari aktif → 1-2 hari locked
- Top 3 mendapat reward XP otomatis setelah lock period
- Auto-managed dengan Bun's native cron

## Badge Conditions
1. **Web Beginner**: Selesaikan Level 1
2. **Web Explorer**: Buka 3 level
3. **Web Adventurer**: Buka semua level
4. **Brave Coder**: Selesaikan 1 hard challenge
5. **Hard Challenger**: Selesaikan 3 hard challenges
6. **Dedicated Learner**: Selesaikan semua materi di semua level
7. **Top Performer**: Masuk Top 3 leaderboard

## Development Timeline (13 minggu)
- Week 1-2: Authentication + Admin User Management
- Week 3-4: Admin Content Management (Materials + Challenges)
- Week 5-7: User Learning Features (Materials + Challenges)
- Week 8-9: Gamification (Leaderboard + Badges)
- Week 10-11: Testing + UI/UX Polish
- Week 12-13: Deployment + UAT dengan 28-30 mahasiswa

## Current State
✅ Database schema designed
✅ Prisma migrations done
✅ Seed data created (1 admin, 5 sample users, 5 levels, 7 badges, sample content)
🔄 Next: Implement authentication system

## Testing Credentials
Admin:
- Username: `admin`
- Password: `Admin123!`

Sample Users:
- Username: `user1`, `user2`, `user3`, `user4`, `user5`
- Password: `User1123!`, `User2123!`, dst

## Project Structure (Backend) - Perlu Diperbaiki !!!!
backend/
├── src/
│ ├── config/
│ │ └── database.ts # Prisma client
│ ├── plugins/
│ │ ├── jwt.plugin.ts # JWT authentication plugin
│ │ └── cors.plugin.ts # CORS configuration
│ ├── routes/
│ │ ├── auth.route.ts # Auth routes
│ │ |── admin/
│ │ │ ├── user.route.ts
│ │ │ ├── material.route.ts
│ │ │ ├── challenge.route.ts
│ │ │ └── log.route.ts
│ │ └── user/
│ │ ├── level.route.ts
│ │ ├── material.route.ts
│ │ ├── challenge.route.ts
│ │ ├── leaderboard.route.ts
│ │ └── badge.route.ts
│ ├── controllers/
│ │ ├── auth.controller.ts
│ │ ├── admin/
│ │ │ ├── user.controller.ts
│ │ │ ├── material.controller.ts
│ │ │ ├── challenge.controller.ts
│ │ │ └── log.controller.ts
│ │ └── user/
│ │ ├── level.controller.ts
│ │ ├── material.controller.ts
│ │ ├── challenge.controller.ts
│ │ ├── leaderboard.controller.ts
│ │ └── badge.controller.ts
│ ├── services/
│ │ ├── user.service.ts
│ │ ├── level.service.ts
│ │ ├── material.service.ts
│ │ ├── challenge.service.ts
│ │ ├── leaderboard.service.ts
│ │ ├── badge.service.ts
│ │ └── log.service.ts
│ ├── types/
│ │ └── index.ts
│ ├── utils/
│ │ └── helpers.ts
│ ├── jobs/
│ │ └── leaderboard.cron.ts
│ └── index.ts # Main entry point
├── prisma/
│ ├── schema.prisma
│ └── seed.ts
├── .env
├── package.json
└── tsconfig.json


## API Naming Convention
- Auth: `/api/auth/*`
- Admin: `/api/admin/*`
- Dosen: `/api/dosen/*`
- User: `/api/user/*`

## Important Notes
- No email validation required
- No self-registration (admin creates all users)
- Challenge soal di-random dari variants setiap kali dibuka
- Activity logs untuk semua user actions (monitoring admin)
- Validation rules disimpan dalam JSONB (flexible per challenge method)

## Project Structure (Frontend) - Sesuaikan dengan Shadcn/UI
frontend/src/
├── layouts/
│   ├── MainLayout.tsx        (User - existing, update)
│   ├── DosenLayout.tsx       [NEW]
│   ├── AdminLayout.tsx       (existing, update)
│   └── AuthLayout.tsx        (existing)
├── pages/
│   ├── public/               (existing)
│   ├── user/
│   │   ├── DashboardPage.tsx (update)
│   │   ├── LevelPage.tsx     (update)
│   │   ├── LevelDetailPage.tsx (major update - node map)
│   │   ├── MaterialPage.tsx  [NEW]
│   │   ├── ChallengePage.tsx [NEW]
│   │   ├── LeaderboardPage.tsx (existing)
│   │   └── ProfilePage.tsx   (update)
│   ├── dosen/                [NEW]
│   │   ├── DosenDashboard.tsx
│   │   ├── LevelManagement.tsx
│   │   ├── MaterialManagement.tsx
│   │   ├── ChallengeManagement.tsx
│   │   ├── UserMonitoring.tsx
│   │   └── LeaderboardMonitor.tsx
│   └── admin/
│       ├── AdminDashboard.tsx (update)
│       ├── AdminUsersPage.tsx (existing)
│       ├── AdminLogsPage.tsx  (update)
│       └── AdminLeaderboardPage.tsx (existing)
├── components/
│   ├── common/
│   │   ├── XPProgressBar.tsx [NEW]
│   │   ├── Timer.tsx         [NEW]
│   │   └── FormModal.tsx     [NEW]
│   ├── user/
│   │   ├── LevelCard.tsx     [NEW]
│   │   ├── NodeMap.tsx       [NEW]
│   │   ├── BadgeCard.tsx     [NEW]
│   │   ├── MaterialReader.tsx [NEW]
│   │   └── ChallengeWorkspace/
│   │       ├── index.tsx     [NEW]
│   │       ├── DragDropEditor.tsx [NEW]
│   │       ├── MonacoEditor.tsx [NEW]
│   │       ├── FixBugEditor.tsx [NEW]
│   │       ├── ScenarioViewer.tsx [NEW]
│   │       └── PreviewPane.tsx [NEW]
│   └── dosen/                [NEW]
│       ├── LevelForm.tsx
│       ├── MaterialEditor.tsx
│       ├── ChallengeForm.tsx
│       └── UserProgressView.tsx
└── routes/
    └── index.tsx             (major update)