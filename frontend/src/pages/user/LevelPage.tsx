import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import type { Level } from '@/types/index';
import { useEffect, useState } from 'react';
import { getLevels } from '@/services/dosen/LevelService';
import { getProgressLevel, getQuestionnaireStatus } from '@/services/user/ProgressService';

export default function LevelPage() {
  const { user } = useAuth();

  const [level, setLevels] = useState<Level[]>([]);
  const [levelProgress, setLevelProgress] = useState<Record<number, number>>({});
  const [animatedProgress, setAnimatedProgress] = useState<Record<number, number>>({});
  const [questionnaireProgress, setQuestionnaireProgress] = useState(0);
  const [animatedQProgress, setAnimatedQProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  let currentXP = user?.totalXp ?? 0;

  const theme = [
    'bg-orange-500/10 text-orange-600 hover:ring-orange-600',
    'bg-blue-500/10 text-blue-600 hover:ring-blue-600',
    'bg-yellow-500/10 text-yellow-600 hover:ring-yellow-600',
    'bg-purple-500/10 text-purple-600 hover:ring-purple-600',
    'bg-pink-500/10 text-pink-600 hover:ring-pink-600',
    'bg-green-500/10 text-green-600 hover:ring-green-600',
    'bg-indigo-500/10 text-indigo-600 hover:ring-indigo-600',
    'bg-slate-500/10 text-slate-600 hover:ring-slate-600',
    'bg-red-500/10 text-red-600 hover:ring-red-600',
    'bg-teal-500/10 text-teal-600 hover:ring-teal-600',
    'bg-cyan-500/10 text-cyan-600 hover:ring-cyan-600',
    'bg-fuchsia-500/10 text-fuchsia-600 hover:ring-fuchsia-600',
    'bg-lime-500/10 text-lime-600 hover:ring-lime-600',
    'bg-orange-500/10 text-orange-600 hover:ring-orange-600',
    'bg-blue-500/10 text-blue-600 hover:ring-blue-600',
    'bg-green-500/10 text-green-600 hover:ring-green-600',
    'bg-purple-500/10 text-purple-600 hover:ring-purple-600',
    'bg-pink-500/10 text-pink-600 hover:ring-pink-600',
    'bg-yellow-500/10 text-yellow-600 hover:ring-yellow-600',
    'bg-red-500/10 text-red-600 hover:ring-red-600',
    'bg-indigo-500/10 text-indigo-600 hover:ring-indigo-600',
    'bg-teal-500/10 text-teal-600 hover:ring-teal-600',
    'bg-cyan-500/10 text-cyan-600 hover:ring-cyan-600',
    'bg-fuchsia-500/10 text-fuchsia-600 hover:ring-fuchsia-600',
    'bg-lime-500/10 text-lime-600 hover:ring-lime-600',
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

          // Get questionnaire progress
          const qRes = await getQuestionnaireStatus(user.id);
          if (qRes.success && qRes.data) {
            const completedCount = (qRes.data.ueqCompleted ? 1 : 0) + (qRes.data.mrcCompleted ? 1 : 0);
            setQuestionnaireProgress(Math.round((completedCount / 2) * 100));
          }
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
      setAnimatedQProgress(questionnaireProgress);
    }, 300);
    return () => clearTimeout(timer);
  }, [levelProgress, questionnaireProgress]);


  return loading ? (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  ) : error ? (
    <div className="flex items-center justify-center h-64">
      <p className="text-red-500">{error}</p>
    </div>
  ) : (
    <div className="space-y-10 pb-8 relative">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none opacity-50" />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 relative z-10">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-linear-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            Pilih Level Belajar
          </h1>
          <p className="text-muted-foreground mt-3 text-lg">
            Petualangan belajar Anda dimulai di sini.
          </p>
        </div>
        <div className="bg-card border shadow-sm rounded-2xl p-4 flex items-center gap-4">
          <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
            <i className="fa-solid fa-star text-2xl text-yellow-500 drop-shadow-sm"></i>
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">Total XP Anda</p>
            <p className="text-2xl font-bold text-primary">{currentXP} XP</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {level.map((lvl) => {
          const hasUnfinishedPreviousLevel = level.some(prevLvl =>
            prevLvl.order < lvl.order && (levelProgress[prevLvl.id] || 0) < 100
          );
          const isLocked = currentXP < lvl.xpRequired || hasUnfinishedPreviousLevel;
          const actualProgress = isLocked ? 0 : (levelProgress[lvl.id] || 0);
          const displayedProgress = isLocked ? 0 : (animatedProgress[lvl.id] || 0);

          const currentTheme = theme[(lvl.id - 1) % theme.length].split(' ');
          const themeBg = currentTheme[0];
          const themeText = currentTheme[1];
          const themeRing = currentTheme[2];

          return (
            <Card key={lvl.id} className={`group overflow-hidden rounded-4xl border-0 shadow-sm ring-1 ring-border/50 transition-all duration-300 hover:shadow-xl hover:ring-2 ${themeRing} hover:-translate-y-1 hover:scale-[1.02] flex flex-col h-full ${isLocked ? 'grayscale opacity-80' : ''}`}>

              {/* Upper Section */}
              <div className={`relative p-6 md:p-8 flex-1 flex flex-col ${isLocked ? 'bg-muted/50' : themeBg}`}>

                {/* Large Logo */}
                <div className={`absolute -right-4 top-0 w-40 h-40 flex items-center justify-center opacity-90 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 ${isLocked ? 'text-muted-foreground' : themeText}`}>
                  <i className={`text-[90px] drop-shadow-md ${lvl.iconName} ${lvl.iconName === 'fa-database' ? 'fa-solid' : 'fa-brands'}`}></i>
                </div>

                {/* Title & Desc */}
                <h3 className="z-10 text-2xl font-bold tracking-tight text-foreground mb-3 pr-20">{lvl.name}</h3>
                <p className="z-10 text-sm text-muted-foreground line-clamp-2 leading-relaxed pr-8 w-2/3">
                  {lvl.description}
                </p>

                {/* Stats */}
                <div className="z-10 flex items-center gap-2.5 text-sm font-semibold text-foreground mt-4 ">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-layer-group text-lg opacity-70"></i>
                    Level {lvl.id}
                  </div>
                  <div className="text-muted-foreground opacity-50">•</div>
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-star text-lg opacity-70"></i>
                    {lvl.xpRequired} XP
                  </div>
                  
                </div>

                {/* Progress Bar Area */}
                <div className="z-10 mt-auto pt-5 space-y-3">
                  <div className="flex justify-between items-center text-sm font-semibold text-muted-foreground">
                    <span>Progress</span>
                    <span className="text-foreground">{actualProgress}%</span>
                  </div>
                  <Progress value={displayedProgress} className="h-2 bg-black/10 dark:bg-white/10 [&>div]:bg-emerald-500" />
                </div>
              </div>

              {/* Footer Section */}
              <div className="px-6 py-5 md:px-8 bg-white dark:bg-slate-900/60 flex items-center justify-between">
                <div className="text-sm font-medium text-muted-foreground">
                  {isLocked ? (
                    hasUnfinishedPreviousLevel ? "Selesaikan level sebelumnya" : `Butuh ${lvl.xpRequired - currentXP} XP lagi`
                  ) : (
                    "Siap dipelajari"
                  )}
                </div>
                {isLocked ? (
                  <Button variant="secondary" className="rounded-full px-8 h-12 text-sm font-semibold opacity-50 cursor-not-allowed" disabled>
                    Terkunci
                  </Button>
                ) : (
                  <Button className="rounded-full px-8 h-12 text-sm font-semibold bg-foreground text-background hover:bg-foreground/90 transition-transform active:scale-95" asChild>
                    <Link to={`/level/${lvl.id}`}>
                      {actualProgress === 100 ? 'Review' : 'Mulai'}
                    </Link>
                  </Button>
                )}
              </div>
            </Card>
          );
        })}

        {/* Kuesioner Sistem Card */}
        {(() => {
          const allLevelsCompleted = level.length > 0 && level.every(l => levelProgress[l.id] === 100);
          // const allLevelsCompleted = true;

          return (
            <Card className={`group overflow-hidden rounded-4xl border-0 shadow-sm ring-1 ring-border/50 transition-all duration-300 hover:shadow-xl hover:ring-2 hover:ring-emerald-500 hover:-translate-y-1 hover:scale-[1.02] flex flex-col h-full ${!allLevelsCompleted ? 'grayscale opacity-80' : ''}`}>
              {/* Upper Section */}
              <div className={`relative p-6 md:p-8 flex-1 flex flex-col ${!allLevelsCompleted ? 'bg-muted/50' : 'bg-emerald-500/10'}`}>

                {/* Large Logo */}
                <div className={`absolute -right-4 top-0 w-40 h-40 flex items-center justify-center opacity-90 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 ${!allLevelsCompleted ? 'text-muted-foreground' : 'text-emerald-600'}`}>
                  <i className="text-[90px] drop-shadow-md fa-solid fa-clipboard-list"></i>
                </div>

                {/* Title & Desc */}
                <h3 className="z-10 text-2xl font-bold tracking-tight text-foreground mb-3 pr-20">Kuesioner</h3>
                <p className="z-10 text-sm text-muted-foreground line-clamp-2 leading-relaxed pr-8 w-2/3">
                  Berikan masukan anda untuk sistem ini
                </p>

                {/* Stats */}
                <div className="z-10 flex items-center gap-2.5 text-sm font-semibold text-foreground mt-4">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-clipboard-check text-lg opacity-70"></i>
                    Evaluasi
                  </div>
                  <div className="text-muted-foreground opacity-50">•</div>
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-star text-lg opacity-70"></i>
                    Akhir
                  </div>
                </div>

                {/* Progress Bar Area */}
                <div className="z-10 mt-auto pt-5 space-y-3">
                  <div className="flex justify-between items-center text-sm font-semibold text-muted-foreground">
                    <span>Progress</span>
                    <span className="text-foreground">{questionnaireProgress}%</span>
                  </div>
                  <Progress value={animatedQProgress} className="h-2 bg-black/10 dark:bg-white/10 [&>div]:bg-emerald-500" />
                </div>
              </div>

              {/* Footer Section */}
              <div className="px-6 py-5 md:px-8 bg-white dark:bg-slate-900/60 flex items-center justify-between border-t border-border/10">
                <div className="text-sm font-medium text-muted-foreground">
                  {!allLevelsCompleted ? "Selesaikan semua level" : "Siap diisi"}
                </div>
                {!allLevelsCompleted ? (
                  <Button variant="secondary" className="rounded-full px-8 h-12 text-sm font-semibold opacity-50 cursor-not-allowed" disabled>
                    Terkunci
                  </Button>
                ) : (
                  <Button className="rounded-full px-8 h-12 text-sm font-semibold bg-foreground text-background hover:bg-foreground/90 transition-transform active:scale-95" asChild>
                    <Link to="/kuesioner">
                      {questionnaireProgress === 100 ? 'Review' : 'Mulai'}
                    </Link>
                  </Button>
                )}
              </div>
            </Card>
          );
        })()}
      </div>
    </div>
  );
}
