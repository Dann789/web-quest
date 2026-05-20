import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Lock, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import type { Level } from '@/types/index';
import { useEffect, useState } from 'react';
import { getLevels } from '@/services/dosen/LevelService';
import { getProgressLevel } from '@/services/user/ProgressService';

export default function LevelPage() {
  const { user } = useAuth();

  const [level, setLevels] = useState<Level[]>([]);
  const [levelProgress, setLevelProgress] = useState<Record<number, number>>({});
  const [animatedProgress, setAnimatedProgress] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  let currentXP = user?.totalXp ?? 0;

  const theme = [
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
    'bg-orange-500/10 text-orange-600',
    'bg-blue-500/10 text-blue-600',
    'bg-green-500/10 text-green-600',
    'bg-purple-500/10 text-purple-600',
    'bg-pink-500/10 text-pink-600',
    'bg-yellow-500/10 text-yellow-600',
    'bg-red-500/10 text-red-600',
    'bg-indigo-500/10 text-indigo-600',
    'bg-teal-500/10 text-teal-600',
    'bg-cyan-500/10 text-cyan-600',
    'bg-fuchsia-500/10 text-fuchsia-600',
    'bg-lime-500/10 text-lime-600',
  ]

  useEffect(() => {
    if (!user?.id) return;

    const fetchLevelsAndProgress = async () => {
      try {
        setLoading(true);
        const result = await getLevels();
        if (result.success && result.data) {
          setLevels(result.data);

          // Get progress untuk semua level sekaligus
          const progressPromises = result.data.map(async (l: Level) => {
            const prog = await getProgressLevel(user.id, l.id);
            return {
              id: l.id,
              percentage: prog.success ? (prog.data?.progressPercentage || 0) : 0
            };
          });

          const progressArray = await Promise.all(progressPromises);
          const newProgressMap: Record<number, number> = {};
          progressArray.forEach(item => {
            newProgressMap[item.id] = item.percentage;
          });
          
          setLevelProgress(newProgressMap);
        } else {
          setError(result.message || 'Failed to fetch levels');
        }
      } catch (error) {
        console.error('Error fetching levels:', error);
        setError('Failed to fetch levels');
      } finally {
        setLoading(false);
      }
    };
    
    fetchLevelsAndProgress();
  }, [user?.id]);

  useEffect(() => {
    // Delay sedikit sebelum mengisi bar supaya transisi animasinya terlihat mulus bergerak dari kiri
    const timer = setTimeout(() => {
      setAnimatedProgress(levelProgress);
    }, 300);
    return () => clearTimeout(timer);
  }, [levelProgress]);
  
  return loading ? (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  ) : error ? (
    <div className="flex items-center justify-center h-64">
      <p className="text-red-500">{error}</p>
    </div>
  ) : (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pilih Level Belajar</h1>
        <p className="text-muted-foreground mt-2">
          Total XP Anda saat ini: <span className="font-bold text-primary">{currentXP} XP</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {level.map((lvl) => {
          const hasUnfinishedPreviousLevel = level.some(prevLvl => 
            prevLvl.order < lvl.order && (levelProgress[prevLvl.id] || 0) < 100
          );
          const isLocked = currentXP < lvl.xpRequired || hasUnfinishedPreviousLevel;
          const actualProgress = isLocked ? 0 : (levelProgress[lvl.id] || 0); 
          const displayedProgress = isLocked ? 0 : (animatedProgress[lvl.id] || 0); 

          return (
            <Card key={lvl.id} className={`flex flex-col h-full transition-all duration-300 ${isLocked ? 'opacity-75 bg-muted/30' : 'hover:border-primary/50 hover:shadow-lg'}`}>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${theme[(lvl.id - 1) % theme.length]}`}>
                    <i className={`text-2xl ${lvl.iconName} ${lvl.iconName === 'fa-database' ? 'fa-solid' : 'fa-brands'}`}></i>
                  </div>
                  {isLocked ? (
                     <Badge variant="outline" className="gap-1 bg-background text-muted-foreground border-dashed">
                       <Lock className="h-3 w-3" />
                       {hasUnfinishedPreviousLevel ? "Selesaikan Level Sebelumnya" : `Butuh ${lvl.xpRequired} XP`}
                     </Badge>
                  ) : (
                     <Badge className="bg-emerald-500 hover:bg-emerald-600">Terbuka</Badge>
                  )}
                </div>
                <CardTitle className="mt-4 text-xl">{lvl.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {lvl.description}
                </p>
              </CardHeader>
              <CardContent className="pb-4 flex-1">
                 {!isLocked ? (
                   <div className="space-y-2 mt-2">
                     <div className="flex justify-between text-xs font-medium">
                       <span>Progress</span>
                       <span>{actualProgress}%</span>
                     </div>
                     <Progress value={displayedProgress} className="h-2" />
                   </div>
                 ) : (
                   <div className="h-full flex items-center justify-center text-sm text-muted-foreground bg-muted/20 rounded-lg p-4 border border-dashed text-center">
                     {hasUnfinishedPreviousLevel 
                       ? "Selesaikan semua tantangan pada level sebelumnya terlebih dahulu untuk membuka level ini."
                       : `Kumpulkan ${lvl.xpRequired - currentXP} XP lagi untuk membuka`}
                   </div>
                 )}
              </CardContent>
              <CardFooter className="pt-0">
                {isLocked ? (
                  <Button variant="ghost" className="w-full gap-2 cursor-not-allowed" disabled>
                    <Lock className="h-4 w-4" /> Terkunci
                  </Button>
                ) : (
                  <Button className="w-full gap-2 group" asChild>
                    <Link to={`/level/${lvl.id}`}>
                      {actualProgress === 100 ? 'Review Level' : 'Mulai Belajar'} 
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
