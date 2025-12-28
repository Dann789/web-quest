import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Zap } from 'lucide-react';

/**
 * AuthLayout - Layout untuk halaman autentikasi (Login)
 * 
 * Struktur:
 * ┌──────────────────────────────────────┐
 * │                                      │
 * │     ┌────────────────────────┐       │
 * │     │                        │       │
 * │     │     LOGIN FORM         │       │
 * │     │     (Outlet)           │       │
 * │     │                        │       │
 * │     └────────────────────────┘       │
 * │                                      │
 * └──────────────────────────────────────┘
 * 
 * - Centered layout with glassmorphism card
 * - Background gradient animation
 */
export default function AuthLayout() {
  const { isAuthenticated, isLoading, user } = useAuth();

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect authenticated users to appropriate dashboard
  if (isAuthenticated) {
    if (user?.role === 'ADMIN') {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center mb-4 animate-float">
            <Zap className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            Web Quest
          </h1>
          <p className="text-muted-foreground mt-2">
            Gamifikasi Pembelajaran Web
          </p>
        </div>

        {/* Auth Form Card */}
        <div className="w-full max-w-md">
          <div className="glass rounded-2xl p-8 shadow-2xl">
            <Outlet />
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-sm text-muted-foreground">
          © 2025 Web Quest - Skripsi Project
        </p>
      </div>
    </div>
  );
}
