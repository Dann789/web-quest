import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Trophy, Clock, Zap } from 'lucide-react';

/**
 * Leaderboard Page - Menampilkan ranking user
 */
export default function LeaderboardPage() {
  const { user } = useAuth();

  // Placeholder data
  const globalLeaderboard = [
    { rank: 1, username: 'pro_coder', totalXp: 2500, totalTime: 2732, isCurrentUser: false },
    { rank: 2, username: 'web_master', totalXp: 2350, totalTime: 2895, isCurrentUser: false },
    { rank: 3, username: 'html_ninja', totalXp: 2200, totalTime: 3121, isCurrentUser: false },
    { rank: 4, username: 'css_wizard', totalXp: 2100, totalTime: 3330, isCurrentUser: false },
    { rank: 5, username: user?.username || 'you', totalXp: user?.totalXp || 0, totalTime: 3745, isCurrentUser: true },
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return <span className="text-2xl">🥇</span>;
      case 2:
        return <span className="text-2xl">🥈</span>;
      case 3:
        return <span className="text-2xl">🥉</span>;
      default:
        return <span className="w-8 text-center font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Trophy className="h-8 w-8 text-amber-400" />
          Leaderboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Lihat peringkatmu dan berkompetisi dengan yang lain
        </p>
      </div>

      <Tabs defaultValue="global" className="w-full">
        <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:inline-flex">
          <TabsTrigger value="global">Global</TabsTrigger>
          <TabsTrigger value="html">HTML</TabsTrigger>
          <TabsTrigger value="css">CSS</TabsTrigger>
          <TabsTrigger value="js">JavaScript</TabsTrigger>
          <TabsTrigger value="php">PHP</TabsTrigger>
          <TabsTrigger value="db">Database</TabsTrigger>
        </TabsList>

        <TabsContent value="global" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Global Ranking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {globalLeaderboard.map((entry) => (
                  <div
                    key={entry.rank}
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                      entry.isCurrentUser
                        ? 'bg-primary/10 border-primary/50'
                        : 'bg-card border-border'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {getRankBadge(entry.rank)}
                      <div>
                        <p className="font-medium flex items-center gap-2">
                          {entry.username}
                          {entry.isCurrentUser && (
                            <Badge variant="outline" className="text-xs">You</Badge>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 text-emerald-400">
                        <Zap className="h-4 w-4" />
                        <span className="font-medium">{entry.totalXp.toLocaleString()} XP</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{formatTime(entry.totalTime)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {['html', 'css', 'js', 'php', 'db'].map((level) => (
          <TabsContent key={level} value={level} className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-center py-8">
                  Leaderboard untuk level {level.toUpperCase()} akan dimuat di sini
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
