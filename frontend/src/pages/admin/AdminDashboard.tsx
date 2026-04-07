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
import { getUsers, getActiveStudentsToday, getNewStudentThisWeek } from "@/services/admin/UserService";
import { getLevels, getPopularLevel } from "@/services/dosen/LevelService";
import { getChallenges } from "@/services/dosen/ChallengeService";
import type { User, Level, Challenge } from "@/types";
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
  const [levels, setLevels] = useState<Level[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [activeUsersCount, setActiveUsersCount] = useState(0);
  const [weeklyData, setWeeklyData] = useState<{day: string, users: number}[]>([]);
  const [newStudentCount, setNewStudentCount] = useState(0);
  const [popularLevel, setPopularLevel] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      const [usersRes, levelsRes, challengesRes, activeRes, newStudentRes, popularLevelRes] = await Promise.all([
        getUsers(),
        getLevels(),
        getChallenges(),
        getActiveStudentsToday(),
        getNewStudentThisWeek(),
        getPopularLevel(),
      ]);

      if (usersRes.success && usersRes.data) {
        setUsers(usersRes.data);
      }
      
      if (levelsRes.success && levelsRes.data) {
        setLevels(levelsRes.data);
      }
      if (challengesRes.success && challengesRes.data) {
        setChallenges(challengesRes.data);
      }
      
      if (activeRes.success && activeRes.data !== undefined) {
        setActiveUsersCount(activeRes.data.todayCount);
        setWeeklyData(activeRes.data.weeklyChart);
      }
      if (newStudentRes.success && newStudentRes.data !== undefined) {
        setNewStudentCount(newStudentRes.data);
      }
      if (popularLevelRes.success && popularLevelRes.data) {
        setPopularLevel(popularLevelRes.data);
      }
      
    } catch (error) {
      console.error("Error loading data:", error);
      setError("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

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
      value: isLoading ? "-" : levels.length,
      icon: Layers,
      color: "text-purple-400 bg-purple-500/20",
    },
    {
      label: "Total Challenge",
      value: isLoading ? "-" : challenges.length,
      icon: Puzzle,
      color: "text-amber-400 bg-amber-500/20",
    },
    {
      label: "Aktif Hari Ini",
      value: isLoading ? "-" : activeUsersCount,
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
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>
                Aktivitas Mahasiswa (Mingguan)
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center pb-8 pt-2">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={weeklyData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
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
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-[#09090b] border border-[#27272a] rounded-lg shadow-xl px-3 py-2 flex items-center gap-3">
                              <div className="h-2 w-2 rounded-[3px] bg-[#93c5fd]"></div>
                              <span className="text-xs text-[#a1a1aa] font-medium mr-2">Jumlah Mahasiswa</span>
                              <span className="text-xs font-bold text-white text-shadow-sm">{payload[0].value}</span>
                            </div>
                          );
                        }
                        return null;
                      }}
                      cursor={{ stroke: '#52525b', strokeWidth: 1, strokeDasharray: '3 3' }}
                    />
                    <Line
                      dataKey="users"
                      fill="currentColor"
                      className="fill-primary"
                      type="monotone"
                      strokeWidth={2}
                      dot={{ r: 4, strokeWidth: 2 }}
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
                <h4 className="text-2xl font-bold mt-1">+{isLoading ? 0 : newStudentCount}</h4>
              </div>
              <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <Activity className="h-5 w-5" />
              </div>
            </div>

            <div className="pt-4 border-t border-border flex flex-col items-center text-center space-y-3">
              <span className="text-sm font-medium self-start w-full text-left">
                Level Terpopuler
              </span>

              {popularLevel ? (
                (() => {
                  const levelThemes = [
                    'bg-orange-500/10 text-orange-600',
                    'bg-blue-500/10 text-blue-600',
                    'bg-yellow-500/10 text-yellow-600',
                    'bg-indigo-500/10 text-indigo-600',
                    'bg-slate-500/10 text-slate-600',
                    'bg-green-500/10 text-green-600',
                    'bg-purple-500/10 text-purple-600',
                    'bg-pink-500/10 text-pink-600',
                    'bg-red-500/10 text-red-600',
                    'bg-teal-500/10 text-teal-600',
                    'bg-cyan-500/10 text-cyan-600',
                    'bg-fuchsia-500/10 text-fuchsia-600',
                    'bg-lime-500/10 text-lime-600',
                  ];
                  const themeStr = levelThemes[(popularLevel.id - 1) % levelThemes.length];
                  const textColor = themeStr.split(' ')[1]; // Extract text color class
                  
                  return (
                    <>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <div className={`${themeStr} rounded-xl flex items-center justify-center p-2`}>
                              <i className={`fab ${popularLevel.iconName} ${textColor} text-5xl drop-shadow-md`}></i>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            <p>{popularLevel.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <p className="text-xs text-muted-foreground w-full text-center mt-2">
                        <span className="font-bold text-foreground">{popularLevel.userCount || 0} user</span>{" "}
                        sedang mempelajari topik ini minggu ini.
                      </p>
                    </>
                  );
                })()
              ) : isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground mt-4" />
              ) : (
                <p className="text-xs text-muted-foreground text-center w-full mt-4">Belum ada aktivitas minggu ini.</p>
              )}
            </div>
            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-3">
                Akses Menu Lain
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
