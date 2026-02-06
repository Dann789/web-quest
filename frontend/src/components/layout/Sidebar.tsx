import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Home,
  Gamepad2,
  Trophy,
  LogOut,
  User,
  Users,
  Activity,
  Layers,
  FileText,
  Puzzle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface SidebarProps {
  className?: string;
  onClose?: () => void;
}

export default function Sidebar({ className, onClose }: SidebarProps) {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getUserNavItems = () => {
    switch (user?.role) {
      case "ADMIN":
        return [
          { path: "/admin", label: "Dashboard", icon: Home },
          { path: "/admin/users", label: "Manajemen User", icon: Users },
          { path: "/admin/logs", label: "Log Aktivitas", icon: Activity },
          { path: "/admin/leaderboard", label: "Leaderboard", icon: Trophy },
        ];
      case "DOSEN":
        return [
          { path: "/dosen", label: "Dashboard", icon: Home },
          { path: "/dosen/levels", label: "Manajemen Level", icon: Layers },
          {
            path: "/dosen/materials",
            label: "Manajemen Materi",
            icon: FileText,
          },
          { path: "/dosen/challenges", label: "Manajemen Soal", icon: Puzzle },
          { path: "/dosen/logs", label: "Log Aktivitas", icon: Activity },
          { path: "/dosen/leaderboard", label: "Leaderboard", icon: Trophy },
        ];
      default: // mahasiswa
        return [
          { path: "/dashboard", label: "Dashboard", icon: Home },
          { path: "/level", label: "Level", icon: Gamepad2 },
          { path: "/leaderboard", label: "Leaderboard", icon: Trophy },
        ];
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-card border-r border-border",
        className,
      )}
    >
      {/* 1. Header: Logo */}
      <div className="border-b border-border/50 p-0.5">
        <Link
          to={
            user?.role === "ADMIN"
              ? "/admin"
              : user?.role === "DOSEN"
                ? "/dosen"
                : "/dashboard"
          }
          className="flex items-center group"
          onClick={onClose}
        >
          <img
            src="/src/assets/logo/logo-sidebar.png"
            alt="Web Quest Logo"
            className="object-cover"
            width={80}
            height={80}
          />
          <div className="flex flex-col gap-1">
            <span className="font-bold text-xl tracking-tight leading-none group-hover:text-primary transition-colors">
              Web Quest
            </span>
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
              Belajar Web Dasar
            </span>
          </div>
        </Link>
      </div>

      {/* 2. Navigation Items */}
      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        <p className="px-4 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
          Menu Utama
        </p>

        {getUserNavItems().map(({ path, label, icon: Icon }) => (
          <Link key={path} to={path} onClick={onClose}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 h-12 rounded-xl transition-all duration-200 mb-2",
                isActive(path)
                  ? "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary font-bold shadow-sm border border-primary/20"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
              )}
            >
              <Icon
                className={cn("h-5 w-5", isActive(path) && "fill-current")}
              />
              {label}
            </Button>
          </Link>
        ))}

        {(user?.role === "USER" || user?.role === "DOSEN") && (
        <div className="pt-6">
          <p className="px-4 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
            Akun
          </p>
          <Link to="/profile" onClick={onClose}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 h-10 rounded-xl transition-all duration-200",
                isActive("/profile")
                  ? "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary font-bold shadow-sm border border-primary/20"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
              )}
            >
              <User
                className={cn(
                  "h-5 w-5",
                  isActive("/profile") && "fill-current",
                )}
              />
              Profile
            </Button>
          </Link>
        </div>
        )}
      </div>

      {/* 3. Footer: User Profile & Logout */}
      <div className="p-4 border-t border-border/50 bg-secondary/20">
        <div className="flex items-center gap-3 mb-4 p-2">
          <Avatar className="h-10 w-10 border border-primary/20">
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
              {user?.username?.substring(0, 2).toUpperCase() || "US"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-md font-bold truncate">{user?.username}</p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.role === "ADMIN"
                ? "Administrator"
                : user?.role === "DOSEN"
                  ? "Dosen"
                  : "Mahasiswa"}
            </p>
          </div>
        </div>

        <Button
          variant="destructive"
          className="w-full gap-2 shadow-lg shadow-red-500/10 hover:shadow-red-500/20"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
