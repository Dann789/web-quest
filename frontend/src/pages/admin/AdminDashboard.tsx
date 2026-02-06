import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Users,
  Layers,
  Puzzle,
  Activity,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { getUsers } from "@/services/UserService";
import type { User } from "@/types";
import { useCallback, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";

/**
 * Admin Dashboard - Halaman utama untuk Admin
 */
export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError("");

    const result = await getUsers();

    if (result.success && result.data) {
      setUsers(result.data);
    } else {
      setError(result.message || "Failed to fetch users");
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Stats data - menggunakan isLoading untuk menampilkan placeholder
  const stats = [
    {
      label: "Total User",
      value: isLoading ? "-" : users.length,
      icon: Users,
      color: "text-blue-400 bg-blue-500/20",
    },
    {
      label: "Total Level",
      value: 5,
      icon: Layers,
      color: "text-purple-400 bg-purple-500/20",
    },
    {
      label: "Total Challenge",
      value: 90,
      icon: Puzzle,
      color: "text-amber-400 bg-amber-500/20",
    },
    {
      label: "Aktif Hari Ini",
      value: 12,
      icon: Activity,
      color: "text-emerald-400 bg-emerald-500/20",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview sistem Web Quest</p>
      </div>

      {/* Error State - Ditampilkan jika ada error */}
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/20 border border-destructive/30 text-destructive">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <div>
            <p className="font-medium">Failed to load data</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div
                  className={`h-12 w-12 rounded-xl flex items-center justify-center ${stat.color}`}
                >
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">
                    {isLoading && stat.label === "Total Users" ? (
                      <Loader2 className="h-7 w-8 animate-spin" />
                    ) : (
                      stat.value
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activities & Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Recent Activities List */}
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Aktivitas Login (Mingguan)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { day: "Mon", users: 12 },
                      { day: "Tue", users: 18 },
                      { day: "Wed", users: 24 },
                      { day: "Thu", users: 15 },
                      { day: "Fri", users: 28 },
                      { day: "Sat", users: 32 },
                      { day: "Sun", users: 20 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="day"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 12, fill: "#888" }}
                      dy={10}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 12, fill: "#888" }}
                    />
                    <RechartsTooltip
                      cursor={{ fill: "transparent" }}
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Line
                      dataKey="users"
                      fill="currentColor"
                      className="fill-primary"
                      type="monotone"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats / Info */}
        <Card>
          <CardHeader>
            <CardTitle>Ringkasan Platform</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Stat 1 */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Pengguna Baru
                </p>
                <h4 className="text-2xl font-bold mt-1">+12</h4>
              </div>
              <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <Activity className="h-5 w-5" />
              </div>
            </div>

            <div className="pt-4 border-t border-border flex flex-col items-center text-center space-y-3">
              <span className="text-sm font-medium self-start w-full text-left">
                Level Terpopuler
              </span>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="bg-orange-500/10 text-orange-600 rounded-xl flex items-center justify-center p-2">
                      <i className="fab fa-html5 text-orange-600 text-5xl drop-shadow-md"></i>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>HTML Basics</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <p className="text-xs text-muted-foreground w-full text-left">
                <span className="font-bold text-foreground">85 user</span>{" "}
                sedang mempelajari topik ini minggu ini.
              </p>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-3">
                Navigasi Cepat
              </p>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="/admin/users"
                  className="text-xs bg-secondary hover:bg-secondary/80 p-2 rounded text-center transition-colors"
                >
                  Kelola User
                </a>
                <a
                  href="/admin/logs"
                  className="text-xs bg-secondary hover:bg-secondary/80 p-2 rounded text-center transition-colors"
                >
                  Log Aktivitas
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
