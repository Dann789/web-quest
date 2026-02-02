import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function LevelPage() {
  const { user } = useAuth();
  
  // Mock User XP jika belum ada (fallback)
  const currentXP = user?.totalXp || 350; 

  const levels = [
    {
      id: 1,
      title: 'Level 1: HTML Foundation',
      description: 'Pelajari struktur dasar web dengan HTML5.',
      requiredXp: 0,
      image: 'bg-orange-500/10 text-orange-600',
      icon: <i className="fa-brands fa-html5 fa-xl"></i>
    },
    {
      id: 2,
      title: 'Level 2: CSS Styling',
      description: 'Percantik tampilan web menggunakan CSS3.',
      requiredXp: 250,
      image: 'bg-blue-500/10 text-blue-600',
      icon: <i className="fa-brands fa-css3-alt fa-xl"></i>
    },
    {
      id: 3,
      title: 'Level 3: JavaScript Logic',
      description: 'Buat web interaktif dengan logika pemrograman.',
      requiredXp: 500,
      image: 'bg-yellow-500/10 text-yellow-600',
      icon: <i className="fa-brands fa-js fa-xl"></i>
    },
    {
      id: 4,
      title: 'Level 4: PHP Backend',
      description: 'Pelajari server-side scripting dengan PHP.',
      requiredXp: 1000,
      image: 'bg-indigo-500/10 text-indigo-600',
      icon: <i className="fa-brands fa-php fa-xl"></i>
    },
    {
      id: 5,
      title: 'Level 5: Database',
      description: 'Kelola penyimpanan data dengan PostgreSQL & Database.',
      requiredXp: 2000,
      image: 'bg-slate-500/10 text-slate-600',
      icon: <i className="fa-solid fa-database fa-xl"></i>
    }
  ];

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pilih Level Belajar</h1>
        <p className="text-muted-foreground mt-2">
          Total XP Anda saat ini: <span className="font-bold text-primary">{currentXP} XP</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {levels.map((level) => {
          const isLocked = currentXP < level.requiredXp;
          // Kalkulasi progress sederhana (mock)
          const progress = isLocked ? 0 : currentXP > level.requiredXp + 250 ? 100 : 45; 

          return (
            <Card key={level.id} className={`flex flex-col h-full transition-all duration-300 ${isLocked ? 'opacity-75 bg-muted/30' : 'hover:border-primary/50 hover:shadow-lg'}`}>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${level.image}`}>
                    {level.icon}
                  </div>
                  {isLocked ? (
                     <Badge variant="outline" className="gap-1 bg-background text-muted-foreground border-dashed">
                       <Lock className="h-3 w-3" /> {level.requiredXp} XP Dibutuhkan
                     </Badge>
                  ) : (
                     <Badge className="bg-emerald-500 hover:bg-emerald-600">Terbuka</Badge>
                  )}
                </div>
                <CardTitle className="mt-4 text-xl">{level.title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {level.description}
                </p>
              </CardHeader>
              <CardContent className="pb-4 flex-1">
                 {!isLocked ? (
                   <div className="space-y-2 mt-2">
                     <div className="flex justify-between text-xs font-medium">
                       <span>Progress</span>
                       <span>{progress}%</span>
                     </div>
                     <Progress value={progress} className="h-2" />
                   </div>
                 ) : (
                   <div className="h-full flex items-center justify-center text-sm text-muted-foreground bg-muted/20 rounded-lg p-4 border border-dashed text-center">
                     Kumpulkan {level.requiredXp - currentXP} XP lagi untuk membuka
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
                    <Link to={`/level/${level.id}`}>
                      {progress === 100 ? 'Review Level' : 'Mulai Belajar'} 
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
