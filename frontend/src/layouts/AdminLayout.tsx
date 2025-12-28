import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  Layers, 
  FileText, 
  Puzzle, 
  Activity, 
  Trophy,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * AdminLayout - Layout untuk halaman Admin
 * 
 * Struktur:
 * ┌──────────┬───────────────────────────┐
 * │          │         HEADER            │
 * │ SIDEBAR  ├───────────────────────────┤
 * │          │                           │
 * │          │         CONTENT           │
 * │          │        (Outlet)           │
 * │          │                           │
 * └──────────┴───────────────────────────┘
 */

// Sidebar navigation items
const sidebarItems = [
  { 
    path: '/admin', 
    label: 'Dashboard', 
    icon: LayoutDashboard,
    exact: true 
  },
  { 
    path: '/admin/users', 
    label: 'Users', 
    icon: Users 
  },
  { 
    path: '/admin/levels', 
    label: 'Levels', 
    icon: Layers 
  },
  { 
    path: '/admin/materials', 
    label: 'Materials', 
    icon: FileText 
  },
  { 
    path: '/admin/challenges', 
    label: 'Challenges', 
    icon: Puzzle 
  },
  { 
    path: '/admin/logs', 
    label: 'Activity Logs', 
    icon: Activity 
  },
  { 
    path: '/admin/leaderboard', 
    label: 'Leaderboard', 
    icon: Trophy 
  },
];

export default function AdminLayout() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect non-admin users to user dashboard
  if (user?.role !== 'ADMIN') {
    return <Navigate to="/dashboard" replace />;
  }

  const isActive = (path: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* ===== SIDEBAR ===== */}
      <aside 
        className={cn(
          "fixed left-0 top-0 z-40 h-screen border-r border-border bg-card transition-all duration-300",
          sidebarCollapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          {!sidebarCollapsed && (
            <Link to="/admin" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">Admin Panel</span>
            </Link>
          )}
          {sidebarCollapsed && (
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center mx-auto">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {sidebarItems.map(({ path, label, icon: Icon, exact }) => (
            <Link key={path} to={path}>
              <Button
                variant={isActive(path, exact) ? 'secondary' : 'ghost'}
                className={cn(
                  "w-full justify-start gap-3 my-1",
                  sidebarCollapsed && "justify-center px-2"
                )}
                title={sidebarCollapsed ? label : undefined}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!sidebarCollapsed && <span>{label}</span>}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-border">
          {/* Collapse Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-center mb-2"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4 mr-2" />
                <span>Collapse</span>
              </>
            )}
          </Button>

          {/* Logout Button */}
          <Button
            variant="ghost"
            className={cn(
              "w-full text-destructive hover:text-destructive hover:bg-destructive/10",
              sidebarCollapsed ? "justify-center px-2" : "justify-start gap-3"
            )}
            onClick={logout}
            title={sidebarCollapsed ? "Logout" : undefined}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!sidebarCollapsed && <span>Logout</span>}
          </Button>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <div 
        className={cn(
          "flex-1 transition-all duration-300",
          sidebarCollapsed ? "ml-16" : "ml-64"
        )}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-full items-center justify-between px-6">
            {/* Page Title - akan diisi dari setiap page */}
            <div></div>

            {/* User Info */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Welcome, <span className="font-medium text-foreground">{user?.username}</span>
              </span>
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {user?.username.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
