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
import { TablePagination } from "@/components/common/TablePagination";
import { getQuestionnaireStatus } from "@/services/user/ProgressService";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [filterTime, setFilterTime] = useState("all_time");
  const [topThree, setTopThree] = useState<any[]>([]);
  const [otherRanks, setOtherRanks] = useState<any[]>([]);
  const [questionnaireCompleted, setQuestionnaireCompleted] = useState(true);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
    totalItems: 0
  });

  useEffect(() => {
    const fetchLeaderboardAndStatus = async () => {
      const promises: [Promise<any>, Promise<any> | null] = [
        getLeaderboardData(filterTime, currentPage, 7),
        user && user.role === "MAHASISWA" ? getQuestionnaireStatus(user.id) : null
      ];
      
      const [result, qRes] = await Promise.all(promises);

      if (qRes && qRes.success && qRes.data) {
        setQuestionnaireCompleted(qRes.data.ueqCompleted && qRes.data.mrcCompleted);
      }

      if (result.success && result.data) {
        const mapItem = (item: any) => ({
          ...item,
          name: item.name,
          avatar: item.name?.substring(0, 2).toUpperCase() || "??",
          xp: item.totalXp ?? 0,
          time: item.totalTimeSpent ?? 0,
          isMe: Boolean(user && item.id === user.id),
        });

        setTopThree(result.data.topThree.map(mapItem));
        setOtherRanks(result.data.paginatedOthers.map(mapItem));

        if (result.pagination) {
          setPaginationInfo({
            totalPages: result.pagination.totalPages,
            hasNext: result.pagination.hasNext,
            hasPrev: result.pagination.hasPrev,
            totalItems: result.pagination.totalItems
          });
        }
      }
    };
    
    // Panggil saat pertama kali mount / ganti filter
    fetchLeaderboardAndStatus();

    // Setup Auto-Refresh (Short Polling) tiap 15 detik
    const intervalId = setInterval(() => {
      fetchLeaderboardAndStatus();
    }, 15000);

    // Bersihkan interval saat komponen unmount atau dependencies berubah
    return () => clearInterval(intervalId);
  }, [user, filterTime, currentPage]);

  // Reset to page 1 when timeframe changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filterTime]);

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

  const top1 = topThree[0] || null;
  const top2 = topThree[1] || null;
  const top3 = topThree[2] || null;

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

      {/* BANNER KUESIONER BELUM SELESAI */}
      {!questionnaireCompleted && user?.role === "MAHASISWA" && (
        <div className="w-full p-5 rounded-2xl border border-amber-500/30 bg-amber-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/20 rounded-xl text-amber-600">
              <i className="fa-solid fa-lock text-xl"></i>
            </div>
            <div className="text-left">
              <h4 className="font-bold text-base text-amber-900 dark:text-amber-200 leading-tight">
                Papan Peringkat Terkunci
              </h4>
              <p className="text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">
                Nama dan peringkat Anda belum terdaftar di leaderboard. 
                Selesaikan semua level belajar lalu lengkapi kuesioner evaluasi untuk mempublikasikan performa belajar Anda!
              </p>
            </div>
          </div>
          <Button className="rounded-full px-6 bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-md shrink-0 transition-transform active:scale-95" asChild>
            <Link to="/level">Pergi ke Kuesioner</Link>
          </Button>
        </div>
      )}

      {/* TOP 3 PODIUM */}
      <div className="grid items-end max-w-4xl grid-cols-1 gap-6 py-8 mx-auto md:grid-cols-3">
        {/* RANK 2 */}
        <div className="flex flex-col items-center order-2 md:order-1">
          <div className="relative mb-4">
            <Avatar className={`w-20 h-20 border-4 shadow-xl ${top2 ? 'border-slate-300' : 'border-slate-200/50 opacity-60'}`}>
              <AvatarFallback className={`font-bold ${top2 ? 'bg-slate-100 text-slate-700' : 'bg-slate-50 text-slate-400'}`}>
                {top2 ? top2.avatar : "?"}
              </AvatarFallback>
            </Avatar>
            <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-bold shadow-sm ${top2 ? 'bg-slate-300 text-slate-800' : 'bg-slate-200 text-slate-400'}`}>
              #2
            </div>
          </div>
          <Card
            className={`relative w-full mt-2 border-t-4 shadow-lg ${top2 ? 'bg-linear-to-t from-slate-500/10 to-transparent border-t-slate-300' : 'bg-slate-50/50 dark:bg-slate-900/50 border-t-slate-200/50 opacity-60'}
            ${top2?.isMe ? "shadow-[0_-20px_50px_rgba(203,213,225,0.4)] before:absolute before:-top-20 before:left-1/2 before:-translate-x-1/2 before:w-3/4 before:h-32 before:bg-amber-400/20 before:blur-2xl before:-z-10" : ""}`}
          >
            <CardContent className="p-4 text-center">
              <h3 className={`text-lg font-bold truncate ${!top2 && 'text-slate-400'}`}>
                {top2 ? top2.name : "Belum Ada"}
              </h3>
              <p className={`font-bold ${top2 ? 'text-slate-400 dark:text-slate-300' : 'text-slate-300'}`}>
                {top2 ? top2.totalXp : 0} XP
              </p>
              <div className="flex items-center justify-center mt-1">
                <Clock className={`inline-flex h-4 w-4 mr-2 ${!top2 && 'text-slate-300'}`} />
                <p
                  className={`text-sm max-w-[100px] truncate ${top2 ? 'text-muted-foreground' : 'text-slate-300'}`}
                  title="Total Waktu"
                >
                  {top2 ? formatTime(top2.totalTimeSpent) : "0m 0s"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RANK 1 */}
        <div className="z-10 flex flex-col items-center order-1 scale-110 md:order-2 md:mb-8">
          <div className="relative mb-6">
            <Crown className={`absolute w-10 h-10 -translate-x-1/2 -top-10 left-1/2 ${top1 ? 'text-amber-500 animate-bounce' : 'text-slate-300 opacity-60'}`} />
            <Avatar className={`h-24 w-24 border-4 ${top1 ? 'border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.4)]' : 'border-slate-200/50 opacity-60 shadow-none'}`}>
              <AvatarFallback className={`text-xl font-bold ${top1 ? 'bg-amber-100 text-amber-700' : 'bg-slate-50 text-slate-400'}`}>
                {top1 ? top1.avatar : "?"}
              </AvatarFallback>
            </Avatar>
            <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full text-sm font-bold shadow-md ${top1 ? 'bg-amber-400 text-amber-950' : 'bg-slate-200 text-slate-400'}`}>
              #1
            </div>
          </div>
          <Card
            className={`relative w-full mt-2 border-t-4 shadow-lg ${top1 ? 'bg-linear-to-t from-amber-500/10 to-transparent border-t-amber-400' : 'bg-slate-50/50 dark:bg-slate-900/50 border-t-slate-200/50 opacity-60'}
            ${top1?.isMe ? "shadow-[0_-20px_50px_rgba(251,191,36,0.4)] before:absolute before:-top-20 before:left-1/2 before:-translate-x-1/2 before:w-3/4 before:h-32 before:bg-amber-400/20 before:blur-2xl before:-z-10" : ""}`}
          >
            <CardContent className="p-6 text-center">
              <h3 className={`mb-2 text-xl font-bold truncate ${!top1 && 'text-slate-400'}`}>
                {top1 ? top1.name : "Belum Ada"}
              </h3>
              {top1 ? (
                <Badge
                  variant="secondary"
                  className="bg-amber-500/20 text-amber-600 hover:bg-amber-500/30 text-center"
                >
                  Top Earner
                </Badge>
              ) : (
                <Badge variant="secondary" className="opacity-0">Placeholder</Badge>
              )}
              <p className={`mt-2 text-2xl font-black ${top1 ? 'text-amber-500' : 'text-slate-300'}`}>
                {top1 ? top1.totalXp : 0} XP
              </p>
              <div className="flex items-center justify-center mt-1">
                <Clock className={`inline-flex h-4 w-4 mr-2 ${!top1 && 'text-slate-300'}`} />
                <p
                  className={`text-sm max-w-[100px] truncate ${top1 ? 'text-muted-foreground' : 'text-slate-300'}`}
                  title="Total Waktu"
                >
                  {top1 ? formatTime(top1.totalTimeSpent) : "0m 0s"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RANK 3 */}
        <div className="flex flex-col items-center justify-center order-3 md:order-3">
          <div className="relative mb-4">
            <Avatar className={`w-20 h-20 border-4 shadow-xl ${top3 ? 'border-amber-700' : 'border-slate-200/50 opacity-60 shadow-none'}`}>
              <AvatarFallback className={`font-bold ${top3 ? 'bg-amber-50 text-amber-800' : 'bg-slate-50 text-slate-400'}`}>
                {top3 ? top3.avatar : "?"}
              </AvatarFallback>
            </Avatar>
            <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-bold shadow-sm ${top3 ? 'bg-amber-700 text-amber-100' : 'bg-slate-200 text-slate-400'}`}>
              #3
            </div>
          </div>
          <Card
            className={`relative w-full mt-2 border-t-4 shadow-lg ${top3 ? 'bg-linear-to-t from-orange-900/10 to-transparent border-t-amber-700' : 'bg-slate-50/50 dark:bg-slate-900/50 border-t-slate-200/50 opacity-60'}
            ${top3?.isMe ? "shadow-[0_-20px_50px_rgba(235,111,16,0.4)] before:absolute before:-top-20 before:left-1/2 before:-translate-x-1/2 before:w-3/4 before:h-32 before:bg-amber-400/20 before:blur-2xl before:-z-10" : ""}`}
          >
            <CardContent className="p-4 text-center">
              <h3 className={`text-lg font-bold truncate ${!top3 && 'text-slate-400'}`}>
                {top3 ? top3.name : "Belum Ada"}
              </h3>
              <p className={`font-bold ${top3 ? 'text-amber-600' : 'text-slate-300'}`}>
                {top3 ? top3.totalXp : 0} XP
              </p>
              <div className="flex items-center justify-center mt-1">
                <Clock className={`inline-flex h-4 w-4 mr-2 ${!top3 && 'text-slate-300'}`} />
                <p
                  className={`text-sm max-w-[100px] truncate ${top3 ? 'text-muted-foreground' : 'text-slate-300'}`}
                  title="Total Waktu"
                >
                  {top3 ? formatTime(top3.totalTimeSpent) : "0m 0s"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

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
              <p className="text-sm font-medium">
                {formatTime(player.totalTimeSpent)}
              </p>
            </div>
            <div className="w-20 font-mono text-lg font-bold text-right">
              {player.totalXp} XP
            </div>
          </div>
        ))}

        <TablePagination 
          currentPage={currentPage}
          totalPages={paginationInfo.totalPages}
          hasNext={paginationInfo.hasNext}
          hasPrev={paginationInfo.hasPrev}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
