import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Layouts
import MainLayout from '@/layouts/MainLayout';
import AdminLayout from '@/layouts/AdminLayout';
import AuthLayout from '@/layouts/AuthLayout';

// Public Pages
import LandingPage from '@/pages/public/LandingPage';
import LoginPage from '@/pages/public/LoginPage';

// User Pages
import DashboardPage from '@/pages/user/DashboardPage';
import LeaderboardPage from '@/pages/user/LeaderboardPage';
import ProfilePage from '@/pages/user/ProfilePage';

// Admin Pages
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminUsersPage from '@/pages/admin/AdminUsersPage';
import AdminLevelsPage from '@/pages/admin/AdminLevelsPage';
import AdminMaterialsPage from '@/pages/admin/AdminMaterialsPage';
import AdminChallengesPage from '@/pages/admin/AdminChallengesPage';
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
