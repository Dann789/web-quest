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
  const [filterLevel, setFilterLevel] = useState('global');
  const [filterTime, setFilterTime] = useState('all_time');

  // Mock Data
  const leaderboardData = [
    { rank: 1, username: 'AlexCode', xp: 3200, avatar: 'AC' },
    { rank: 2, username: 'SarahDev', xp: 2950, avatar: 'SD' },
    { rank: 3, username: 'JohnDoe', xp: 2700, avatar: 'JD' },
    { rank: 4, username: 'CSS_Wizard', xp: 2500, avatar: 'CW' },
    { rank: 5, username: user?.username || 'You', xp: user?.totalXp || 2400, avatar: user?.username?.substring(0,2).toUpperCase() || 'ME', isMe: true },
    { rank: 6, username: 'ReactFan', xp: 2100, avatar: 'RF' },
    { rank: 7, username: 'BugHunter', xp: 1950, avatar: 'BH' },
  ];

  const topThree = leaderboardData.slice(0, 3);
  const otherRanks = leaderboardData.slice(3);

  return (
    <div className="space-y-8 pb-10">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Trophy className="h-8 w-8 text-amber-500" />
            Leaderboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Top performers hall of fame
          </p>
        </div>

        {/* FILTERS */}
        <div className="flex gap-2">
          <Select value={filterLevel} onValueChange={setFilterLevel}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="global">Global</SelectItem>
              <SelectItem value="html">HTML</SelectItem>
              <SelectItem value="css">CSS</SelectItem>
              <SelectItem value="js">JavaScript</SelectItem>
            </SelectContent>
          </Select>

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end max-w-4xl mx-auto py-8">
        
        {/* RANK 2 */}
        <div className="order-2 md:order-1 flex flex-col items-center">
          <div className="relative mb-4">
             <Avatar className="h-20 w-20 border-4 border-slate-300 shadow-xl">
               <AvatarFallback className="bg-slate-100 text-slate-700 font-bold">{topThree[1].avatar}</AvatarFallback>
             </Avatar>
             <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-300 text-slate-800 px-3 py-0.5 rounded-full text-xs font-bold shadow-sm">
               #2
             </div>
          </div>
          <Card className="w-full bg-gradient-to-t from-slate-500/10 to-transparent border-t-4 border-t-slate-300 mt-2">
            <CardContent className="p-4 text-center">
              <h3 className="font-bold text-lg truncate">{topThree[1].username}</h3>
              <p className="text-primary font-bold">{topThree[1].xp} XP</p>
            </CardContent>
          </Card>
        </div>

        {/* RANK 1 */}
        <div className="order-1 md:order-2 flex flex-col items-center z-10 scale-110 md:mb-8">
          <div className="relative mb-6">
             <Crown className="absolute -top-10 left-1/2 -translate-x-1/2 h-10 w-10 text-amber-500 animate-bounce" />
             <Avatar className="h-24 w-24 border-4 border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.4)]">
               <AvatarFallback className="bg-amber-100 text-amber-700 font-bold text-xl">{topThree[0].avatar}</AvatarFallback>
             </Avatar>
             <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-950 px-4 py-0.5 rounded-full text-sm font-bold shadow-md">
               #1
             </div>
          </div>
          <Card className="w-full bg-gradient-to-t from-amber-500/10 to-transparent border-t-4 border-t-amber-400 mt-2 shadow-lg">
            <CardContent className="p-6 text-center">
              <h3 className="font-bold text-xl mb-1 truncate">{topThree[0].username}</h3>
              <Badge variant="secondary" className="bg-amber-500/20 text-amber-600 hover:bg-amber-500/30">Top Earner</Badge>
              <p className="text-2xl font-black text-amber-500 mt-2">{topThree[0].xp} XP</p>
            </CardContent>
          </Card>
        </div>

        {/* RANK 3 */}
        <div className="order-3 md:order-3 flex flex-col items-center">
          <div className="relative mb-4">
             <Avatar className="h-20 w-20 border-4 border-amber-700 shadow-xl">
               <AvatarFallback className="bg-amber-50 text-amber-800 font-bold">{topThree[2].avatar}</AvatarFallback>
             </Avatar>
             <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-700 text-amber-100 px-3 py-0.5 rounded-full text-xs font-bold shadow-sm">
               #3
             </div>
          </div>
          <Card className="w-full bg-gradient-to-t from-orange-900/10 to-transparent border-t-4 border-t-amber-700 mt-2">
            <CardContent className="p-4 text-center">
              <h3 className="font-bold text-lg truncate">{topThree[2].username}</h3>
              <p className="text-primary font-bold">{topThree[2].xp} XP</p>
            </CardContent>
          </Card>
        </div>

      </div>

      {/* LIST SECTION */}
      <div className="grid gap-3 max-w-3xl mx-auto">
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
            <div className="w-12 font-bold text-lg text-muted-foreground text-center">#{player.rank}</div>
            <Avatar className="h-10 w-10 border border-border">
               <AvatarFallback>{player.avatar}</AvatarFallback>
            </Avatar>
            <div className="ml-4 flex-1">
              <p className={`font-bold ${player.isMe ? 'text-primary' : ''}`}>
                {player.username} {player.isMe && '(You)'}
              </p>
            </div>
            <div className="font-mono font-bold text-lg">{player.xp} XP</div>
          </div>
        ))}
      </div>

    </div>
  );
}
