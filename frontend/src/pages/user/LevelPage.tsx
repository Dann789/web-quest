import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Lock, 
  CheckCircle2, 
  ChevronRight,
  Target
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LevelPage() {
  // Mock Data (Nantinya dari API)
  const levels = [
    { id: 1, name: 'HTML Foundation', description: 'Struktur dasar web', totalXp: 500, isUnlocked: true, isCompleted: true, progress: 100 },
    { id: 2, name: 'CSS Styling', description: 'Mempercantik tampilan', totalXp: 750, isUnlocked: true, isCompleted: false, progress: 45 },
    { id: 3, name: 'JavaScript Logic', description: 'Membuat web interaktif', totalXp: 1000, isUnlocked: false, isCompleted: false, progress: 0 },
    { id: 4, name: 'PHP Backend', description: 'Server-side programming', totalXp: 1200, isUnlocked: false, isCompleted: false, progress: 0 },
    { id: 5, name: 'Database MySQL', description: 'Manajemen data', totalXp: 1500, isUnlocked: false, isCompleted: false, progress: 0 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Target className="h-8 w-8 text-primary" />
            Peta Perjalanan
          </h1>
          <p className="text-muted-foreground mt-1">
            Selesaikan setiap level untuk membuka tantangan berikutnya
          </p>
        </div>
        <span className="text-sm font-medium bg-secondary px-4 py-2 rounded-full">
          Total Progress: 25%
        </span>
      </div>

      <div className="space-y-4">
        {levels.map((level) => (
          <div 
            key={level.id} 
            className={`relative group transition-all duration-300 ${
              level.isUnlocked ? 'opacity-100' : 'opacity-60 grayscale'
            }`}
          >
            {/* Connector Line (Decorative) */}
            {level.id !== levels.length && (
              <div className="absolute left-8 top-16 bottom-[-24px] w-0.5 bg-border -z-10 group-last:hidden" />
            )}

            <Card className={`border-2 transition-all hover:shadow-lg ${
              level.isUnlocked 
                ? 'border-primary/20 hover:border-primary/50 cursor-pointer' 
                : 'border-dashed bg-muted/50'
            }`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  {/* Icon Status */}
                  <div className={`
                    shrink-0 h-16 w-16 rounded-2xl flex items-center justify-center shadow-sm
                    ${level.isCompleted 
                      ? 'bg-emerald-500/20 text-emerald-500' 
                      : level.isUnlocked 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'}
                  `}>
                    {level.isCompleted ? (
                      <CheckCircle2 className="h-8 w-8" />
                    ) : level.isUnlocked ? (
                      <span className="text-2xl font-bold">{level.id}</span>
                    ) : (
                      <Lock className="h-8 w-8" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">{level.name}</h3>
                      {level.isUnlocked && (
                        <Badge variant={level.isCompleted ? "secondary" : "default"}>
                          {level.isCompleted ? "Selesai" : "Sedang Berjalan"}
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground">{level.description}</p>
                    
                    {/* Progress Bar inside card */}
                    {level.isUnlocked && (
                      <div className="space-y-1 mt-2">
                        <div className="flex justify-between text-xs font-medium">
                          <span>Progress</span>
                          <span>{level.progress}%</span>
                        </div>
                        <Progress value={level.progress} className="h-2" />
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="self-center">
                    {level.isUnlocked ? (
                      <Link to={`/levels/${level.id}`}>
                        <Button variant={level.isCompleted ? "outline" : "default"} className="h-10 w-10 p-0 rounded-full">
                          <ChevronRight className="h-5 w-5" />
                        </Button>
                      </Link>
                    ) : (
                      <Button variant="ghost" disabled size="icon">
                        <Lock className="h-5 w-5" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
