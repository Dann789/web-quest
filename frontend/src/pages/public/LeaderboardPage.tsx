import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { Trophy, Crown, Clock } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getLeaderboardData } from "@/services/public/LeaderboardService";
import type { User } from "@/types";

type LeaderboardItem = User & {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  time: number;
  isMe: boolean;
};

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [filterTime, setFilterTime] = useState("all_time");
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const result = await getLeaderboardData(filterTime);
      console.log(result);
      if (result.success && result.data) {
        const mapped = result.data.map((item, idx) => ({
          ...item,
          rank: idx + 1,
          name: item.name,
          avatar: item.name?.substring(0, 2).toUpperCase() || "??",
          xp: item.totalXp ?? 0,
          time: item.totalTimeSpent ?? 0,
          isMe: Boolean(user && item.id === user.id),
        }));
        console.log("Mapped: ", mapped);
        setLeaderboard(mapped);
      }
    };
    fetchLeaderboard();
  }, [user, filterTime]);

  function formatTime(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}m ${seconds}s`;
  }

  // Role-based title
  const getPageTitle = () => {
    switch (user?.role) {
      case "ADMIN":
        return "Leaderboard - Admin View";
      case "DOSEN":
        return "Student Rankings";
      case "MAHASISWA":
        return "Leaderboard";
      default:
        return "Leaderboard";
    }
  };

  const getPageDescription = () => {
    switch (user?.role) {
      case "ADMIN":
        return "Monitoring student progress and achievements";
      case "DOSEN":
        return "Monitor student progress dan achievements";
      case "MAHASISWA":
        return "Top performers hall of fame";
      default:
        return "Top performers hall of fame";
    }
  };

  console.log("Isi leaderboard state: ", leaderboard);
  const topThree = leaderboard.slice(0, 3);
  const otherRanks = leaderboard.slice(3);
  console.log(topThree);
  console.log(otherRanks);

  return (
    <div className="pb-10 space-y-8">
      {/* HEADER SECTION */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-bold">
            <Trophy className="w-8 h-8 text-amber-500" />
            {getPageTitle()}
          </h1>
          <p className="mt-1 text-muted-foreground">{getPageDescription()}</p>
        </div>

        {/* FILTERS */}
        <div className="mr-4">
          <Select value={filterTime} onValueChange={setFilterTime}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Pilih Waktu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Hari Ini</SelectItem>
              <SelectItem value="weekly">Minggu Ini</SelectItem>
              <SelectItem value="all_time">Semua Waktu</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* TOP 3 PODIUM */}
      {topThree.length >= 3 && (
        <div className="grid items-end max-w-4xl grid-cols-1 gap-6 py-8 mx-auto md:grid-cols-3">
          {/* RANK 2 */}
          <div className="flex flex-col items-center order-2 md:order-1">
            <div className="relative mb-4">
              <Avatar className="w-20 h-20 border-4 shadow-xl border-slate-300">
                <AvatarFallback className="font-bold bg-slate-100 text-slate-700">
                  {topThree[1].avatar}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-300 text-slate-800 px-3 py-0.5 rounded-full text-xs font-bold shadow-sm">
                #2
              </div>
            </div>
            <Card
              className={`relative w-full mt-2 border-t-4 shadow-lg bg-gradient-to-t from-slate-500/10 to-transparent border-t-slate-300
              ${topThree[1].isMe ? "shadow-[0_-20px_50px_rgba(203,213,225,0.4)] before:absolute before:-top-20 before:left-1/2 before:-translate-x-1/2 before:w-3/4 before:h-32 before:bg-amber-400/20 before:blur-2xl before:-z-10" : ""}`}
            >
              <CardContent className="p-4 text-center">
                <h3 className="text-lg font-bold truncate">
                  {topThree[1].name}
                </h3>
                <p className="font-bold text-slate-300">{topThree[1].xp} XP</p>
                <div className="flex items-center justify-center mt-1">
                  <Clock className="inline-flex h-4 w-4 mr-2" />
                  <p
                    className="text-sm text-muted-foreground max-w-[100px] truncate"
                    title="Total Waktu"
                  >
                    {formatTime(topThree[1].time)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RANK 1 */}
          <div className="z-10 flex flex-col items-center order-1 scale-110 md:order-2 md:mb-8">
            <div className="relative mb-6">
              <Crown className="absolute w-10 h-10 -translate-x-1/2 -top-10 left-1/2 text-amber-500 animate-bounce" />
              <Avatar className="h-24 w-24 border-4 border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.4)]">
                <AvatarFallback className="text-xl font-bold bg-amber-100 text-amber-700">
                  {topThree[0].avatar}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-950 px-4 py-0.5 rounded-full text-sm font-bold shadow-md">
                #1
              </div>
            </div>
            <Card
              className={`relative w-full mt-2 border-t-4 shadow-lg bg-gradient-to-t from-amber-500/10 to-transparent border-t-amber-400
              ${topThree[0].isMe ? "shadow-[0_-20px_50px_rgba(251,191,36,0.4)] before:absolute before:-top-20 before:left-1/2 before:-translate-x-1/2 before:w-3/4 before:h-32 before:bg-amber-400/20 before:blur-2xl before:-z-10" : ""}`}
            >
              <CardContent className="p-6 text-center">
                <h3 className="mb-2 text-xl font-bold truncate">
                  {topThree[0].name}
                </h3>
                <Badge
                  variant="secondary"
                  className="bg-amber-500/20 text-amber-600 hover:bg-amber-500/30 text-center"
                >
                  Top Earner
                </Badge>
                <p className="mt-2 text-2xl font-black text-amber-500">
                  {topThree[0].xp} XP
                </p>
                <div className="flex items-center justify-center mt-1">
                  <Clock className="inline-flex h-4 w-4 mr-2" />
                  <p
                    className="text-sm text-muted-foreground max-w-[100px] truncate"
                    title="Total Waktu"
                  >
                    {formatTime(topThree[0].time)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RANK 3 */}
          <div className="flex flex-col items-center justify-center order-3 md:order-3">
            <div className="relative mb-4">
              <Avatar className="w-20 h-20 border-4 shadow-xl border-amber-700">
                <AvatarFallback className="font-bold bg-amber-50 text-amber-800">
                  {topThree[2].avatar}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-700 text-amber-100 px-3 py-0.5 rounded-full text-xs font-bold shadow-sm">
                #3
              </div>
            </div>
            <Card
              className={`relative w-full mt-2 border-t-4 shadow-lg bg-gradient-to-t from-orange-900/10 to-transparent border-t-amber-700
              ${topThree[2].isMe ? "shadow-[0_-20px_50px_rgba(235,111,16,0.4)] before:absolute before:-top-20 before:left-1/2 before:-translate-x-1/2 before:w-3/4 before:h-32 before:bg-amber-400/20 before:blur-2xl before:-z-10" : ""}`}
            >
              <CardContent className="p-4 text-center">
                <h3 className="text-lg font-bold truncate">
                  {topThree[2].name}
                </h3>
                <p className="font-bold text-amber-600">{topThree[2].xp} XP</p>
                <div className="flex items-center justify-center mt-1">
                  <Clock className="inline-flex h-4 w-4 mr-2" />
                  <p
                    className="text-sm text-muted-foreground max-w-[100px] truncate"
                    title="Total Waktu"
                  >
                    {formatTime(topThree[2].time)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* LIST SECTION */}
      <div className="grid max-w-3xl gap-3 mx-auto">
        {otherRanks.map((player) => (
          <div
            key={player.rank}
            className={`
              flex items-center p-4 rounded-xl border transition-all hover:scale-[1.01]
              ${
                player.isMe
                  ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(var(--primary),0.2)] sticky bottom-4 z-20 backdrop-blur-md"
                  : "bg-card border-border hover:border-primary/50"
              }
            `}
          >
            <div className="w-12 text-lg font-bold text-center text-muted-foreground">
              #{player.rank}
            </div>
            <Avatar className="w-10 h-10 border border-border">
              <AvatarFallback>{player.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1 ml-4">
              <p className={`font-bold ${player.isMe ? "text-primary" : ""}`}>
                {player.name} {player.isMe && "(You)"}
              </p>
            </div>
            <div className="mr-6 text-right">
              <p className="text-xs font-medium text-muted-foreground">Waktu</p>
              <p className="text-sm font-medium">{formatTime(player.time)}</p>
            </div>
            <div className="w-20 font-mono text-lg font-bold text-right">
              {player.xp} XP
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
