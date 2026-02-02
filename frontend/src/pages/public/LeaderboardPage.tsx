import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { Trophy, Crown } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

/**
 * Leaderboard Page - Menampilkan ranking user dengan desain Podium
 */
export default function LeaderboardPage() {
  const { user } = useAuth();
  const [filterTime, setFilterTime] = useState('all_time');

  // Role-based title
  const getPageTitle = () => {
    switch (user?.role) {
      case 'ADMIN':
        return 'Leaderboard - Admin View';
      case 'DOSEN':
        return 'Student Rankings';
      case 'USER':
        return 'Leaderboard';
      default:
        return 'Leaderboard';
    }
  };

  const getPageDescription = () => {
    switch (user?.role) {
      case 'ADMIN':
        return 'Monitor student progress and achievements';
      case 'DOSEN':
        return 'Monitor student progress dan achievements';
      case 'USER':
        return 'Top performers hall of fame';
      default:
        return 'Top performers hall of fame';
    }
  };

  // Mock Data
  const leaderboardData = [
    { rank: 1, username: 'AlexCode', xp: 3200, time: '12h 30m', avatar: 'AC' },
    { rank: 2, username: 'SarahDev', xp: 2950, time: '14h 15m', avatar: 'SD' },
    { rank: 3, username: 'JohnDoe', xp: 2700, time: '15h 00m', avatar: 'JD' },
    { rank: 4, username: 'CSS_Wizard', xp: 2500, time: '16h 45m', avatar: 'CW' },
...(user?.role === 'USER' ? [
    { 
      rank: 5, 
      username: user.username, 
      xp: user.totalXp || 2400, 
      time: '18h 20m', 
      avatar: user.username?.substring(0,2).toUpperCase() || 'ME', 
      isMe: true,
      userRole: 'USER'
    }
  ] : []),
    { rank: 6, username: 'ReactFan', xp: 2100, time: '20h 10m', avatar: 'RF' },
    { rank: 7, username: 'BugHunter', xp: 1950, time: '22h 05m', avatar: 'BH' },
    { rank: 8, username: 'Faker', xp: 1900, time: '23h 05m', avatar: 'BH' },
    { rank: 9, username: 'Ronaldo', xp: 1850, time: '23h 15m', avatar: 'BH' },
    { rank: 10, username: 'Neymar Jr.', xp: 1750, time: '23h 35m', avatar: 'BH' },
  ].sort((a, b) => b.xp - a.xp);

  const rankedData = leaderboardData.map((item, index) => ({
  ...item,
  rank: index + 1
}));

  const topThree = rankedData.slice(0, 3);
  const otherRanks = rankedData.slice(3);

  return (
    <div className="pb-10 space-y-8">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-bold">
            <Trophy className="w-8 h-8 text-amber-500" />
            {getPageTitle()}
          </h1>
          <p className="mt-1 text-muted-foreground">
            {getPageDescription()}
          </p>
        </div>

        {/* FILTERS */}
        <div className="mr-4">
          <Select value={filterTime} onValueChange={setFilterTime}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Timeframe" />
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
      <div className="grid items-end max-w-4xl grid-cols-1 gap-4 py-8 mx-auto md:grid-cols-3">
        
        {/* RANK 2 */}
        <div className="flex flex-col items-center order-2 md:order-1">
          <div className="relative mb-4">
             <Avatar className="w-20 h-20 border-4 shadow-xl border-slate-300">
               <AvatarFallback className="font-bold bg-slate-100 text-slate-700">{topThree[1].avatar}</AvatarFallback>
             </Avatar>
             <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-300 text-slate-800 px-3 py-0.5 rounded-full text-xs font-bold shadow-sm">
               #2
             </div>
          </div>
          <Card className="w-full mt-2 border-t-4 bg-gradient-to-t from-slate-500/10 to-transparent border-t-slate-300">
            <CardContent className="p-4 text-center">
              <h3 className="text-lg font-bold truncate">{topThree[1].username}</h3>
              <p className="font-bold text-primary">{topThree[1].xp} XP</p>
              <p className="text-xs text-muted-foreground mt-1 max-w-[100px] mx-auto truncate" title="Total Waktu">⏱ {topThree[1].time}</p>
            </CardContent>
          </Card>
        </div>

        {/* RANK 1 */}
        <div className="z-10 flex flex-col items-center order-1 scale-110 md:order-2 md:mb-8">
          <div className="relative mb-6">
             <Crown className="absolute w-10 h-10 -translate-x-1/2 -top-10 left-1/2 text-amber-500 animate-bounce" />
             <Avatar className="h-24 w-24 border-4 border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.4)]">
               <AvatarFallback className="text-xl font-bold bg-amber-100 text-amber-700">{topThree[0].avatar}</AvatarFallback>
             </Avatar>
             <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-950 px-4 py-0.5 rounded-full text-sm font-bold shadow-md">
               #1
             </div>
          </div>
          <Card className="w-full mt-2 border-t-4 shadow-lg bg-gradient-to-t from-amber-500/10 to-transparent border-t-amber-400">
            <CardContent className="p-6 text-center">
              <h3 className="mb-1 text-xl font-bold truncate">{topThree[0].username}</h3>
              <Badge variant="secondary" className="bg-amber-500/20 text-amber-600 hover:bg-amber-500/30">Top Earner</Badge>
              <p className="mt-2 text-2xl font-black text-amber-500">{topThree[0].xp} XP</p>
              <p className="mt-1 text-sm text-muted-foreground" title="Total Waktu">⏱ {topThree[0].time}</p>
            </CardContent>
          </Card>
        </div>

        {/* RANK 3 */}
        <div className="flex flex-col items-center order-3 md:order-3">
          <div className="relative mb-4">
             <Avatar className="w-20 h-20 border-4 shadow-xl border-amber-700">
               <AvatarFallback className="font-bold bg-amber-50 text-amber-800">{topThree[2].avatar}</AvatarFallback>
             </Avatar>
             <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-700 text-amber-100 px-3 py-0.5 rounded-full text-xs font-bold shadow-sm">
               #3
             </div>
          </div>
          <Card className="w-full mt-2 border-t-4 bg-gradient-to-t from-orange-900/10 to-transparent border-t-amber-700">
            <CardContent className="p-4 text-center">
              <h3 className="text-lg font-bold truncate">{topThree[2].username}</h3>
              <p className="font-bold text-primary">{topThree[2].xp} XP</p>
              <p className="text-xs text-muted-foreground mt-1 max-w-[100px] mx-auto truncate" title="Total Waktu">⏱ {topThree[2].time}</p>
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
              ${player.isMe 
                ? 'bg-primary/10 border-primary shadow-[0_0_15px_rgba(var(--primary),0.2)] sticky bottom-4 z-20 backdrop-blur-md' 
                : 'bg-card border-border hover:border-primary/50'
              }
            `}
          >
            <div className="w-12 text-lg font-bold text-center text-muted-foreground">#{player.rank}</div>
            <Avatar className="w-10 h-10 border border-border">
               <AvatarFallback>{player.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1 ml-4">
              <p className={`font-bold ${player.isMe ? 'text-primary' : ''}`}>
                {player.username} {player.isMe && '(You)'}
              </p>
            </div>
            <div className="mr-6 text-right">
                <p className="text-xs font-medium text-muted-foreground">Waktu</p>
                <p className="text-sm font-medium">{player.time}</p>
            </div>
            <div className="w-20 font-mono text-lg font-bold text-right">{player.xp} XP</div>
          </div>
        ))}
      </div>

    </div>
  );
}