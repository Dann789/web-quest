import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Layers, Puzzle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getDashboardStats,
  getLevelCompletions,
} from "@/services/dosen/LevelService";
import { getLeaderboardData } from "@/services/public/LeaderboardService";
import type {
  DashboardStats,
  LevelCompletionItem,
  LeaderboardItem,
  LevelChartItem,
} from "@/types";

export default function DosenDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalMahasiswa: 0,
    totalLevel: 0,
    totalChallenge: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);
  const [levelCompletions, setLevelCompletions] = useState<
    LevelCompletionItem[]
  >([]);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      const [statRes, leaderboardRes, levelRes] = await Promise.all([
        getDashboardStats(),
        getLeaderboardData("all_time"),
        getLevelCompletions(),
      ]);

      if (statRes.success && statRes.data) {
        setStats(statRes.data);
      }

      if (leaderboardRes.success && leaderboardRes.data) {
        setLeaderboard(leaderboardRes.data);
      }

      if (levelRes.success && levelRes.data) {
        setLevelCompletions(levelRes.data);
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

  const statCards = [
    {
      label: "Total Mahasiswa",
      value: isLoading ? "-" : stats.totalMahasiswa,
      icon: Users,
      color: "text-blue-400 bg-blue-500/20",
    },
    {
      label: "Jumlah Level",
      value: isLoading ? "-" : stats.totalLevel,
      icon: Layers,
      color: "text-purple-400 bg-purple-500/20",
    },
    {
      label: "Jumlah Challenge",
      value: isLoading ? "-" : stats.totalChallenge,
      icon: Puzzle,
      color: "text-amber-400 bg-amber-500/20",
    },
  ];

  const topStudents = useMemo<LeaderboardItem[]>(() => {
    return leaderboard.slice(0, 5).map((student, index) => {
      const candidateName =
        student.name ||
        "Unknown";
      const words = candidateName.trim().split(/\s+/).filter(Boolean);
      const avatar =
        words.length > 1
          ? `${words[0][0] ?? ""}${words[1][0] ?? ""}`.toUpperCase()
          : (candidateName.slice(0, 2) || "U").toUpperCase();

      return {
        ...student,
        rank: index + 1,
        name: candidateName,
        avatar,
      };
    });
  }, [leaderboard]);

  const levelColors = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444"];

  const levelChartData: LevelChartItem[] = levelCompletions.map(
    (level, index) => ({
      name: `Level ${index + 1}`,
      value: level.completedCount,
      originalLevelName: level.levelName,
      color: levelColors[index % levelColors.length],
    }),
  );

  const levelCount = levelChartData.length;

  const dynamicBarCategoryGap =
    levelCount <= 5 ? "28%" : levelCount <= 8 ? "18%" : "10%";

  const dynamicMaxBarSize = levelCount <= 5 ? 42 : levelCount <= 8 ? 32 : 24;

  const dynamicXAxisTick = levelCount > 8 ? { fontSize: 11 } : { fontSize: 12 };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Dosen</h1>
        <p className="text-muted-foreground mt-1">
          Selamat datang kembali, silahkan kelola materi dan pantau perkembangan
          mahasiswa.
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`p-4 rounded-xl ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <h3 className="text-2xl font-bold">
                  {isLoading ? (
                    <span className="inline-block h-8 w-12 rounded bg-muted animate-pulse" />
                  ) : (
                    stat.value
                  )}
                </h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dashboard Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Overview Progress Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={levelChartData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 5,
                  }}
                  barCategoryGap={dynamicBarCategoryGap}
                  barGap={4}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={dynamicXAxisTick} interval={0} />
                  <YAxis />
                  <Tooltip
                    shared={false}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const row = payload[0].payload as LevelChartItem;
                        return (
                          <div className="bg-[#09090b] border border-[#27272a] rounded-lg shadow-xl px-3 py-2 flex items-center gap-3">
                            <div
                              className="h-2 w-2 rounded-[3px]"
                              style={{ backgroundColor: row.color }}
                            />
                            <span className="text-xs text-[#a1a1aa] font-medium mr-2">
                              Jumlah Mahasiswa
                            </span>
                            <span className="text-xs font-bold text-white text-shadow-sm">
                              {payload[0].value}
                            </span>
                          </div>
                        );
                      }
                      return null;
                    }}
                    cursor={false}
                  />
                  <Legend />
                  <Bar
                    dataKey="value"
                    name="Mahasiswa"
                    maxBarSize={dynamicMaxBarSize}
                    radius={[6, 6, 0, 0]}
                  >
                    {levelChartData.map((item, index) => (
                      <Cell key={`cell-${index}`} fill={item.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Mini Leaderboard Widget */}
        <Card className="lg:col-span-1 border-primary/20 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              Top Mahasiswa
            </CardTitle>
            <Link to="/dosen/leaderboard">
              <Button variant="ghost" size="sm" className="text-xs h-8 gap-1">
                Lihat Semua <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-3">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={`leaderboard-skeleton-${index}`}
                    className="h-12 rounded-lg bg-muted animate-pulse"
                  />
                ))
              ) : topStudents.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Belum ada data leaderboard.
                </p>
              ) : (
                topStudents.map((student) => (
                  <div
                    key={`${student.rank}-${student.name}`}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div
                      className={`
                        w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                        ${
                          student.rank === 1
                            ? "bg-amber-100 text-amber-600"
                            : student.rank === 2
                              ? "bg-slate-100 text-slate-600"
                              : student.rank === 3
                                ? "bg-orange-100 text-orange-600"
                                : "text-muted-foreground"
                        }
                      `}
                    >
                      {student.rank}
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {student.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {student.name}
                      </p>
                    </div>
                    <Badge variant="secondary" className="font-mono text-xs">
                      {student.totalXp} XP
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
