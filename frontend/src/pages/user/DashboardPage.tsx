import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Zap, 
  PlayCircle, 
  ChevronRight,
  Flame,
  CheckCircle,
  BookOpen
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function DashboardPage() {
  const { user } = useAuth();

  // Mock Data (Nantinya dari API)
  const currentLevel = {
    id: 2,
    name: 'CSS Styling',
    progress: 45,
    lastLesson: 'Flexbox Basics'
  };

  return (
    <div className="space-y-8 pb-10">
      
      {/* 1. HERO SECTION: Welcome & Resume */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-primary/20 h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Zap className="w-64 h-64 text-primary rotate-12" />
            </div>
            <CardContent className="p-8 relative z-10">
              <div className="space-y-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                    Selamat datang kembali, <span className="text-primary">{user?.username}</span>! 👋
                  </h1>
                  <p className="text-muted-foreground text-lg mt-2">
                    Siap melanjutkan perjalanan menjadi Web Developer?
                  </p>
                </div>
                
                <div className="bg-background/50 backdrop-blur-sm border p-4 rounded-xl inline-flex items-center gap-4 mt-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <PlayCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Lanjutkan Terakhir:</p>
                    <p className="font-bold">{currentLevel.lastLesson} <span className="text-muted-foreground font-normal">({currentLevel.name})</span></p>
                  </div>
                  <Button className="ml-4 gap-2">
                    Lanjut Belajar <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 2. STATS WIDGET: Login Streak */}
        <div className="lg:col-span-1">
          <Card className="h-full flex flex-col justify-center relative overflow-hidden">
             <CardHeader className="pb-2">
               <CardTitle className="flex items-center gap-2">
                 <Flame className="h-5 w-5 text-orange-500" />
                 Daily Streak
               </CardTitle>
               <CardDescription>Konsistensi adalah kunci!</CardDescription>
             </CardHeader>
             <CardContent>
               <div className="text-4xl font-bold mb-2">3 <span className="text-lg font-normal text-muted-foreground">Hari</span></div>
               <Progress value={60} className="h-2 mb-2" />
               <p className="text-xs text-muted-foreground">Login besok untuk mencapai streak 4 hari!</p>
             </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* 3. MAIN CONTENT (Stats & Details) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Row 1: Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-2xl bg-amber-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle className="h-8 w-8 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Challenges Done</p>
                    <h3 className="text-3xl font-bold mt-1">24</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      +3 dari minggu lalu
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-2xl bg-blue-500/20 flex items-center justify-center shrink-0">
                    <BookOpen className="h-8 w-8 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Levels Completed</p>
                    <h3 className="text-3xl font-bold mt-1">1 <span className="text-lg text-muted-foreground font-normal">/ 5</span></h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      HTML Foundation selesai
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Row 2: Badges & TotalXP (Moved from Sidebar) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Badges Widget */}
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  Badges Owned
                </CardTitle>
                <Link to="/profile" className="text-xs text-primary hover:underline">View All</Link>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { icon: '🌟', name: 'First Step', color: 'bg-yellow-500/20' },
                    { icon: '🚀', name: 'Fast Learner', color: 'bg-blue-500/20' },
                    { icon: '🔥', name: 'On Fire', color: 'bg-red-500/20' },
                  ].map((badge, i) => (
                    <div key={i} className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-1 p-2 ${badge.color} border border-white/5`} title={badge.name}>
                      <div className="text-2xl">{badge.icon}</div>
                    </div>
                  ))}
                  {/* Empty slots */}
                  <div className="aspect-square rounded-xl border border-dashed border-muted-foreground/30 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                  </div>
                  <div className="aspect-square rounded-xl border border-dashed border-muted-foreground/30 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                  </div>
                  <div className="aspect-square rounded-xl border border-dashed border-muted-foreground/30 flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">+3</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* TotalXP Widget */}
            <Card className="top-6">
            <CardHeader>
              <CardTitle className="text-lg">Level & XP</CardTitle>
            </CardHeader>
            <CardContent className="">
              <div className="text-center mb-6">
                <div className="inline-block p-4 rounded-full bg-primary/10 mb-2">
                   <Zap className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold">{user?.totalXp.toLocaleString()} XP</div>
                <p className="text-sm text-muted-foreground">Level 3: JavaScript Novice</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Current Level</span>
                  <span>Next Level</span>
                </div>
                <Progress value={75} className="h-3" />
                <p className="text-xs text-center text-muted-foreground mt-1">
                  250 XP lagi untuk naik level
                </p>
              </div>
            </CardContent>
          </Card>
          </div>
        </div>

        {/* 4. SIDEBAR WIDGETS */}
        <div className="grid grid-cols-1 lg:col-span-4 space-y-6">
          
          <Card className="h-full flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
                <CardTitle className="text-lg">Top Learners</CardTitle>
                <div className="flex gap-2">
                   <Select defaultValue="weekly">
                    <SelectTrigger className="w-[100px] h-8 text-xs">
                      <SelectValue placeholder="Time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="all_time">All Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 flex-1">
                  {[
                    { name: 'AlexCode', xp: 2500, rank: 1, avatar: 'AC' },
                    { name: 'SarahDev', xp: 2350, rank: 2, avatar: 'SD' },
                    { name: 'JohnDoe', xp: 1800, rank: 3, avatar: 'JD' },
                    { name: 'You', xp: user?.totalXp || 0, rank: 5, active: true, avatar: 'ME' },
                    { name: 'ReactFan', xp: 1200, rank: 6, avatar: 'RF' },
                  ].map((p, i) => (
                    <div key={i} className={`flex items-center gap-3 p-2 rounded-xl transition-colors ${p.active ? 'bg-primary/10 border border-primary/20' : 'hover:bg-secondary/50 border border-transparent'}`}>
                      <div className={`font-bold w-6 text-center text-sm ${p.rank <= 3 ? 'text-amber-500' : 'text-muted-foreground'}`}>
                        {p.rank <= 3 ? ['🥇', '🥈', '🥉'][p.rank-1] : `#${p.rank}`}
                      </div>
                      <Avatar className="h-8 w-8 border border-border">
                        <AvatarFallback className="text-xs bg-muted">{p.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-bold truncate ${p.active ? 'text-primary' : ''}`}>
                          {p.name}
                        </p>
                        <div className="h-1.5 w-full bg-secondary rounded-full mt-1 overflow-hidden">
                           <div className="h-full bg-primary/60 rounded-full" style={{ width: `${(p.xp / 3000) * 100}%` }} />
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold">{p.xp}</span>
                    </div>
                  ))}
                  <Link to="/leaderboard" className="block text-center text-xs text-muted-foreground hover:text-primary mt-4 transition-colors">
                    Lihat Leaderboard Lengkap &rarr;
                  </Link>
              </CardContent>
            </Card>

        </div>
      </div>
    </div>
  );
}

