import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { PlayCircle, Lock, CheckCircle, BookOpen, ChevronLeft, X} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function LevelDetailPage() {
  const { levelId } = useParams();
  const [isMaterialOpen, setIsMaterialOpen] = useState(false);

  // Mock Data
  const levelData = {
    title: 'HTML Foundation',
    description: 'Pelajari dasar-dasar struktur web dengan HTML5.',
    materialContent: {
      title: "Pengenalan HTML & Struktur Dasar",
      sections: [
        { 
          heading: "Apa itu HTML?", 
          content: "HTML (HyperText Markup Language) adalah bahasa markup standar untuk dokumen yang dirancang untuk ditampilkan di peramban internet. Ini dapat dibantu oleh teknologi seperti Cascading Style Sheets (CSS) dan bahasa scripting seperti JavaScript." 
        },
        {
          heading: "Struktur Dokumen HTML",
          content: "Setiap halaman HTML memiliki struktur dasar yang terdiri dari tag <html>, <head>, dan <body>. Tag <head> berisi metadata, sedangkan <body> berisi konten yang terlihat."
        },
        {
          heading: "Elemen & Tag",
          content: "HTML menggunakan 'tag' untuk membuat elemen. Contohnya <p> untuk paragraf, <h1> untuk judul utama, dan <div> untuk pembagian seksi."
        }
      ]
    },
    challenges: {
        easy: Array.from({ length: 5 }).map((_, i) => ({ 
            id: `e-${i}`, status: i < 3 ? 'completed' : i === 3 ? 'unlocked' : 'locked', xp: 50 
        })),
        medium: Array.from({ length: 10 }).map((_, i) => ({ 
            id: `m-${i}`, status: 'locked', xp: 100 
        })),
        hard: Array.from({ length: 3 }).map((_, i) => ({ 
            id: `h-${i}`, status: 'locked', xp: 250 
        }))
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] w-full overflow-hidden bg-slate-50 dark:bg-slate-950 flex flex-col">
      
      {/* Header (Floating) */}
      <div className="absolute top-0 left-0 right-0 p-6 z-20 flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto">
             <Button variant="secondary" size="sm" className="gap-2 shadow-sm" asChild>
                <Link to="/level">
                    <ChevronLeft className="h-4 w-4" /> Kembali ke Level
                </Link>
            </Button>
        </div>
        <div className="text-right pointer-events-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-3 rounded-lg border shadow-sm">
            <h1 className="text-xl font-bold flex items-center justify-end gap-2 text-primary">
                {levelData.title}
            </h1>
            <p className="text-xs text-muted-foreground">Selesaikan materi dan tantangan untuk lanjut.</p>
        </div>
      </div>

      {/* SVG CONNECTOR LINES BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg className="w-full h-full" preserveAspectRatio="none">
           {/* Definisikan Gradient Garis */}
           <defs>
             <linearGradient id="gradientLine" x1="0%" y1="0%" x2="100%" y2="0%">
               <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
               <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
             </linearGradient>
           </defs>

           {/* Path 1: Materi (Left Center) ke Easy (Available Row 1 - Top) */}
           <path 
             d="M 150 500 C 300 500, 300 150, 450 150 L 900 150" 
             fill="none" 
             stroke="url(#gradientLine)" 
             strokeWidth="3" 
             strokeDasharray="10, 5"
             className="opacity-50"
           />

           {/* Path 2: Materi ke Medium (Row 2 - Center) */}
           <path 
             d="M 150 500 L 450 500 L 900 500" 
             fill="none" 
             stroke="url(#gradientLine)" 
             strokeWidth="3" 
             className="opacity-80"
           />

           {/* Path 3: Materi ke Hard (Row 3 - Bottom) */}
           <path 
             d="M 150 500 C 300 500, 300 850, 450 850 L 900 850" 
             fill="none" 
             stroke="url(#gradientLine)" 
             strokeWidth="3" 
             strokeDasharray="10, 5"
             className="opacity-50"
           />
        </svg>
      </div>

      {/* MAIN CONTENT LAYER */}
      <div className="relative z-10 flex-1 flex">
         
         {/* LEFT SIDE: MATERI NODE */}
         <div className="w-[300px] flex items-center justify-center relative">
            
            {/* Pulsing Effect Background */}
            <div className="absolute w-40 h-40 bg-indigo-500/20 rounded-full animate-pulse blur-xl" />
            
            <div 
                onClick={() => setIsMaterialOpen(true)}
                className="relative group cursor-pointer transform transition-all hover:scale-110"
            >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.5)] border-4 border-white dark:border-slate-800 z-20 relative">
                    <BookOpen className="h-10 w-10 text-white" />
                </div>
                
                {/* Text Label */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center w-40">
                    <span className="bg-white dark:bg-slate-800 px-3 py-1 rounded-full text-xs font-bold shadow-md border text-indigo-600 whitespace-nowrap">
                        Materi Utama
                    </span>
                </div>
            </div>
         </div>

         {/* RIGHT SIDE: CHALLENGE ROWS */}
         <div className="flex-1 flex flex-col justify-between py-20 pr-10 pl-20 relative">
            
            {/* ROW 1: EASY */}
            <div className="flex items-center gap-6 group">
                <div className="w-32 flex flex-col items-end">
                    <Badge className="bg-emerald-500 hover:bg-emerald-600 mb-1">EASY</Badge>
                    <span className="text-xs text-muted-foreground font-medium">5 Challenges</span>
                </div>
                <div className="flex-1 flex items-center gap-8 p-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-dashed border-emerald-200">
                     {levelData.challenges.easy.map((c, i) => (
                        <ChallengeNode key={c.id} node={c} index={i} colorClass="emerald" />
                    ))}
                </div>
            </div>

            {/* ROW 2: MEDIUM */}
            <div className="flex items-center gap-6 group">
                <div className="w-32 flex flex-col items-end">
                    <Badge className="bg-amber-500 hover:bg-amber-600 mb-1">MEDIUM</Badge>
                    <span className="text-xs text-muted-foreground font-medium">10 Challenges</span>
                </div>
                <div className="flex-1 flex flex-wrap items-center gap-6 p-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-dashed border-amber-200">
                     {levelData.challenges.medium.map((c, i) => (
                        <ChallengeNode key={c.id} node={c} index={i} colorClass="amber" />
                    ))}
                </div>
            </div>

            {/* ROW 3: HARD */}
            <div className="flex items-center gap-6 group">
                <div className="w-32 flex flex-col items-end">
                    <Badge className="bg-red-500 hover:bg-red-600 mb-1">HARD</Badge>
                    <span className="text-xs text-muted-foreground font-medium">3 Challenges</span>
                </div>
                <div className="flex-1 flex items-center gap-8 p-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-dashed border-red-200">
                     {levelData.challenges.hard.map((c, i) => (
                        <ChallengeNode key={c.id} node={c} index={i} colorClass="red" />
                    ))}
                </div>
            </div>

         </div>
      </div>

      {/* MODAL MATERI POPUP */}
      {isMaterialOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
            <Card className="w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
                <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/30 pb-4">
                    <div>
                        <Badge variant="outline" className="mb-2 bg-indigo-50 text-indigo-600 border-indigo-200">Materi Pembelajaran</Badge>
                        <CardTitle className="text-xl">{levelData.materialContent.title}</CardTitle>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsMaterialOpen(false)}>
                        <X className="h-5 w-5" />
                    </Button>
                </CardHeader>
                <CardContent className="overflow-y-auto p-6 space-y-6">
                    {levelData.materialContent.sections.map((section, idx) => (
                        <div key={idx} className="space-y-2">
                            <h3 className="text-lg font-bold flex items-center gap-2 text-primary">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs">{idx + 1}</span>
                                {section.heading}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed pl-8 text-sm md:text-base">
                                {section.content}
                            </p>
                        </div>
                    ))}
                    
                    <div className="pt-6 border-t mt-4">
                        <Button className="w-full" onClick={() => setIsMaterialOpen(false)}>
                            Saya Mengerti, Lanjut ke Challenge <CheckCircle className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
      )}

    </div>
  );
}

function ChallengeNode({ node, index, colorClass }: { node: any, index: number, colorClass: string }) {
    let bg = 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400';
    let content = <Lock size={14} />;
    let shadow = '';
    
    // Styling states
    if (node.status === 'completed') {
        if (colorClass === 'emerald') bg = 'bg-emerald-500 border-emerald-600 text-white';
        if (colorClass === 'amber') bg = 'bg-amber-500 border-amber-600 text-white';
        if (colorClass === 'red') bg = 'bg-red-500 border-red-600 text-white';
        content = <CheckCircle size={16} strokeWidth={3} />;
        shadow = 'shadow-md scale-100';
    } else if (node.status === 'unlocked') {
         // Current Active Node Style
         bg = 'bg-white dark:bg-slate-900 border-4 animate-bounce-slow';
         if (colorClass === 'emerald') bg += ' border-emerald-500 text-emerald-600';
         if (colorClass === 'amber') bg += ' border-amber-500 text-amber-600';
         if (colorClass === 'red') bg += ' border-red-500 text-red-600';
         content = <PlayCircle size={20} fill="currentColor" className="text-inherit" />;
         shadow = 'shadow-[0_0_20px_rgba(0,0,0,0.15)] scale-110 z-10';
    }

    return (
        <TooltipProvider>
            <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                    <div className={cn(
                        "h-12 w-12 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer relative",
                        bg, 
                        shadow
                    )}>
                        {content}
                        
                        {/* Connection Line to next node (Visual only, simple CSS) */}
                        
                        {node.status !== 'locked' && node.status !== 'completed' && (
                            <div className="absolute -top-1 -right-1 flex h-3 w-3">
                              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${colorClass === 'emerald' ? 'bg-emerald-400' : colorClass === 'amber' ? 'bg-amber-400' : 'bg-red-400'}`}></span>
                              <span className={`relative inline-flex rounded-full h-3 w-3 ${colorClass === 'emerald' ? 'bg-emerald-500' : colorClass === 'amber' ? 'bg-amber-500' : 'bg-red-500'}`}></span>
                            </div>
                        )}
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <div className="text-center">
                        <p className="font-bold">Challenge {index + 1}</p>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground">{node.xp} XP</p>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
