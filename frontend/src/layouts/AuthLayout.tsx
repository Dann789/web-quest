import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

/**
 * AuthLayout - Layout untuk halaman autentikasi (Login)
 * 
 * Layout ini minimal karena LoginPage sudah memiliki layout sendiri (split view)
 * Hanya berfungsi untuk:
 * - Redirect user yang sudah login
 * - Menampilkan loading state
 */
export default function AuthLayout() {
  const { isAuthenticated, isLoading, user } = useAuth();

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
          <p className="text-slate-400 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect authenticated users to appropriate dashboard
  if (isAuthenticated) {
    if (user?.role === 'ADMIN') {
      return <Navigate to="/admin" replace />;
    } else if (user?.role === 'DOSEN') {
      return <Navigate to="/dosen" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  // Render the login page directly without additional wrappers
  return <Outlet />;
}
