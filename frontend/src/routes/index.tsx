import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Layouts
import MainLayout from '@/layouts/MainLayout';
import AdminLayout from '@/layouts/AdminLayout';
import AuthLayout from '@/layouts/AuthLayout';
import FullscreenLayout from '@/layouts/FullscreenLayout';

// Public Pages
import LandingPage from '@/pages/public/LandingPage';
import LoginPage from '@/pages/public/LoginPage';

// User Pages
import DashboardPage from '@/pages/user/DashboardPage';
import LevelPage from '@/pages/user/LevelPage';
import LevelDetailPage from '@/pages/user/LevelMapPage';
import ChallengePage from '@/pages/user/ChallengePage';
import LeaderboardPage from '@/pages/user/LeaderboardPage';
import ProfilePage from '@/pages/user/ProfilePage';

// Dosen Pages
import DosenLayout from '@/layouts/DosenLayout';
import DosenDashboard from '@/pages/dosen/DosenDashboard';
import LevelsManagement from '@/pages/dosen/LevelsManagement';
import MaterialsManagement from '@/pages/dosen/MaterialsManagement';
import ChallengeManagement from '@/pages/dosen/ChallengeManagement';
import DosenLogsPage from '@/pages/dosen/DosenLogsPage';
import DosenLeaderboardPage from '@/pages/dosen/DosenLeaderboardPage';
import DosenProfilePage from '@/pages/dosen/DosenProfilePage';

// Admin Pages
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminUsersPage from '@/pages/admin/AdminUsersPage';
import AdminLevelsPage from '@/pages/dosen/LevelsManagement'; // Reusing/Aliasing for legacy if needed
import AdminMaterialsPage from '@/pages/dosen/MaterialsManagement';
import AdminChallengesPage from '@/pages/dosen/ChallengeManagement';
import AdminLogsPage from '@/pages/admin/AdminLogsPage';
import AdminLeaderboardPage from '@/pages/admin/AdminLeaderboardPage';

/**
 * Route Configuration
 * 
 * Struktur:
 * /                    → Landing Page (Public)
 * /login               → Login Page (Auth Layout)
 * 
 * /dashboard           → User Dashboard (Main Layout)
 * /leaderboard         → Leaderboard (Main Layout)
 * /profile             → Profile (Main Layout)
 * 
 * /admin               → Admin Dashboard (Admin Layout)
 * /admin/users         → User Management (Admin Layout)
 * /admin/levels        → Level Management (Admin Layout)
 * /admin/materials     → Material Management (Admin Layout)
 * /admin/challenges    → Challenge Management (Admin Layout)
 * /admin/logs          → Activity Logs (Admin Layout)
 * /admin/leaderboard   → Leaderboard Monitoring (Admin Layout)
 */

const router = createBrowserRouter([
  // ===== PUBLIC ROUTES =====
  {
    path: '/',
    element: <LandingPage />,
  },

  // ===== AUTH ROUTES =====
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },

  // ===== USER ROUTES (Protected) =====
  {
    element: <MainLayout />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/level',
        element: <LevelPage />,
      },
      {
        path: '/leaderboard',
        element: <LeaderboardPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      // TODO: Add more user routes
      // /levels/:levelId         → Level Detail
      // /levels/:levelId/material → Material Page
      // /levels/:levelId/challenges/:id → Challenge Workspace
    ],
  },
  
  // ===== FULLSCREEN ROUTES (Protected) =====
  {
    element: <FullscreenLayout />,
    children: [
      {
        path: '/level/:levelId',
        element: <LevelDetailPage />,
      },
      {
        path: '/challenge/:challengeId',
        element: <ChallengePage />,
      },
    ],
  },

  // ===== DOSEN ROUTES (Protected) =====
  {
    element: <DosenLayout />,
    children: [
      {
        path: '/dosen',
        element: <DosenDashboard />,
      },
      {
        path: '/dosen/levels',
        element: <LevelsManagement />,
      },
      {
        path: '/dosen/materials',
        element: <MaterialsManagement />,
      },
      {
        path: '/dosen/challenges',
        element: <ChallengeManagement />,
      },
      {
        path: '/dosen/logs',
        element: <DosenLogsPage />,
      },
      {
        path: '/dosen/leaderboard',
        element: <DosenLeaderboardPage />,
      },
      {
        path: '/dosen/profile',
        element: <DosenProfilePage />,
      },
    ],
  },

  // ===== ADMIN ROUTES (Protected) =====
  {
    element: <AdminLayout />,
    children: [
      {
        path: '/admin',
        element: <AdminDashboard />,
      },
      {
        path: '/admin/users',
        element: <AdminUsersPage />,
      },
      // Admin Content Routes (Optional/Legacy)
      {
        path: '/admin/levels',
        element: <AdminLevelsPage />,
      },
      {
        path: '/admin/materials',
        element: <AdminMaterialsPage />,
      },
      {
        path: '/admin/challenges',
        element: <AdminChallengesPage />,
      },
      {
        path: '/admin/logs',
        element: <AdminLogsPage />,
      },
      {
        path: '/admin/leaderboard',
        element: <AdminLeaderboardPage />,
      },
    ],
  },
]);

/**
 * AppRouter Component
 * Wrap this with AuthProvider in main.tsx
 */
export default function AppRouter() {
  return <RouterProvider router={router} />;
}
