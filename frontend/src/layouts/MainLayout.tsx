import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Menu,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

/**
 * MainLayout - Layout utama untuk halaman semua role
 * Menggunakan Sidebar navigation (Vertical) alih-alih Navbar atas.
 */
export default function MainLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      
      {/* 1. DESKTOP SIDEBAR (Visible on md+) */}
      <aside className="hidden md:block w-64 h-screen sticky top-0 shrink-0 z-40">
        <Sidebar className="h-full w-full" />
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        
        {/* MOBILE HEADER (Visible on < md) */}
        <header className="md:hidden sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md px-4 h-16 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">Web Quest</span>
          </Link>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
              <Sidebar onClose={() => setMobileMenuOpen(false)} />
            </SheetContent>
          </Sheet>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:px-4 py-8">
          <div className="container mx-auto max-w-6xl animate-in fade-in duration-500">
             <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
