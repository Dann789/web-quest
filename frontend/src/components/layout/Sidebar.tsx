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
  PieChart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import logoSidebar from "@/assets/logo/logo-sidebar.webp";

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
          { path: "/admin/evaluasi", label: "Evaluasi UX", icon: PieChart },
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
          { path: "/dosen/monitoring", label: "Monitoring Progress", icon: Activity },
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

  const isActive = (path: string) => {
    if (path === "/level" && location.pathname.startsWith("/kuesioner")) {
      return true;
    }
    return location.pathname === path;
  };

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-sidebar border-r border-border",
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
            src={logoSidebar}
            alt="Web Quest Logo"
            className="object-cover"
            width={80}
            height={80}
          />
          <div className="flex flex-col gap-1">
            <span className="font-bold text-xl tracking-tight leading-none group-hover:text-foreground/80 transition-colors">
              Web Quest
            </span>
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
              Belajar Web Dasar
            </span>
          </div>
        </Link>
      </div>

      {/* 2. Navigation Items */}
      <div className="flex-1 overflow-y-auto py-5 px-3 space-y-1">
        <p className="px-4 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
          Menu Utama
        </p>

        {getUserNavItems().map(({ path, label, icon: Icon }) => (
          <Link key={path} to={path} onClick={onClose}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 h-12 rounded-xl transition-all duration-200 mb-2 cursor-pointer",
                isActive(path)
                  ? "bg-blue-500/15 text-blue-600 dark:text-blue-400 hover:bg-blue-500/25 hover:text-blue-400 font-bold shadow-sm border border-blue-500/20"
                  : "text-muted-foreground hover:bg-blue-500/10 hover:text-foreground",
              )}
            >
              <Icon
                className={cn("h-5 w-5", isActive(path) && "fill-current")}
              />
              {label}
            </Button>
          </Link>
        ))}
            {user?.role === "MAHASISWA" && (
              <Link to="/profile" onClick={onClose}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 h-12 rounded-xl transition-all duration-200 cursor-pointer",
                    isActive("/profile")
                      ? "bg-blue-500/15 text-blue-600 dark:text-blue-400 hover:bg-blue-500/25 hover:text-blue-400 font-bold shadow-sm border border-blue-500/20"
                      : "text-muted-foreground hover:bg-blue-500/10 hover:text-foreground",
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
            )}
            {user?.role === "DOSEN" && (
              <Link to="/dosen/profile" onClick={onClose}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 h-12 rounded-xl transition-all duration-200 cursor-pointer",
                    isActive("/dosen/profile")
                      ? "bg-blue-500/15 text-blue-600 dark:text-blue-400 hover:bg-blue-500/25 hover:text-blue-400 font-bold shadow-sm border border-blue-500/20"
                      : "text-muted-foreground hover:bg-blue-500/10 hover:text-foreground",
                  )}
                >
                  <User
                    className={cn(
                      "h-5 w-5",
                      isActive("/dosen/profile") && "fill-current",
                    )}
                  />
                  Profile
                </Button>
              </Link>
            )}
      </div>

      {/* 3. Footer: User Profile & Logout */}
      <div className="p-2.5 border-t border-border/50 bg-secondary/20">
        <div className="flex items-center gap-3 p-2">
          <Avatar className="h-10 w-10 border border-border">
            <AvatarFallback className="bg-secondary text-secondary-foreground text-xs font-bold">
              {user?.name?.substring(0, 2).toUpperCase() || "US"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-md font-bold truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.role === "ADMIN"
                ? "Admin"
                : user?.role === "DOSEN"
                  ? "Dosen"
                  : "Mahasiswa"}
            </p>
          </div>
          <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="ghost"
                className=" justify-start gap-3 h-10 rounded-xl transition-all duration-200 hover:bg-red-500/10 hover:text-white"
                onClick={logout}
              >
                <LogOut className="h-4 w-4 text-red-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Logout</p>
            </TooltipContent>
          </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
