import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Zap, Trophy, Award, BookOpen } from 'lucide-react';

/**
 * User Dashboard - Halaman utama untuk User
 * Menampilkan Level Map, XP Progress, dan Quick Stats
 */
export default function DashboardPage() {
  const { user } = useAuth();

  // Placeholder data - akan diganti dengan API call
  const stats = {
    totalXp: user?.totalXp || 0,
    levelsUnlocked: 2,
    totalLevels: 5,
    challengesCompleted: 24,
    badgesEarned: 3,
  };

  const levels = [
    { id: 1, name: 'HTML', order: 1, xpRequired: 0, isUnlocked: true, progress: 100 },
    { id: 2, name: 'CSS', order: 2, xpRequired: 250, isUnlocked: true, progress: 45 },
    { id: 3, name: 'JavaScript', order: 3, xpRequired: 500, isUnlocked: false, progress: 0 },
    { id: 4, name: 'PHP', order: 4, xpRequired: 1000, isUnlocked: false, progress: 0 },
    { id: 5, name: 'Database', order: 5, xpRequired: 2000, isUnlocked: false, progress: 0 },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold">
          Selamat datang, {user?.username}! 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Lanjutkan perjalanan belajarmu hari ini
        </p>
      </div>

      {/* XP Progress Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <Zap className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total XP</p>
                <p className="text-2xl font-bold">{stats.totalXp.toLocaleString()} XP</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Next Level: JavaScript</p>
              <p className="text-sm font-medium">500 XP required</p>
            </div>
          </div>
          <Progress value={(stats.totalXp / 500) * 100} className="h-3" />
          <p className="text-xs text-muted-foreground mt-2 text-center">
            {500 - stats.totalXp} XP lagi untuk membuka JavaScript
          </p>
        </CardContent>
      </Card>

      {/* Level Map */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Level Map</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {levels.map((level) => (
            <Card 
              key={level.id}
              className={`min-w-[200px] cursor-pointer transition-all hover:scale-105 ${
                level.isUnlocked 
                  ? 'border-primary/50' 
                  : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant={level.isUnlocked ? 'default' : 'secondary'}>
                    Level {level.order}
                  </Badge>
                  {level.progress === 100 && (
                    <span className="text-emerald-400">✓</span>
                  )}
                </div>
                <CardTitle className="text-lg">{level.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {level.isUnlocked ? (
                  <>
                    <Progress value={level.progress} className="h-2 mb-2" />
                    <p className="text-xs text-muted-foreground">
                      {level.progress}% completed
                    </p>
                  </>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    🔒 Requires {level.xpRequired} XP
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Levels Unlocked</p>
                <p className="text-2xl font-bold">{stats.levelsUnlocked}/{stats.totalLevels}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Challenges Done</p>
                <p className="text-2xl font-bold">{stats.challengesCompleted}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Award className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Badges Earned</p>
                <p className="text-2xl font-bold">{stats.badgesEarned}/7</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
