import { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { PlayCircle, Lock, CheckCircle, BookOpen, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import MaterialModal from './MaterialPage';
import { getLevelData } from '@/mocks/levelMockData';

export default function LevelMapPage() {
  const { levelId } = useParams();
  const [isMaterialOpen, setIsMaterialOpen] = useState(false);
  
  // Refs for dynamic lines
  const containerRef = useRef<HTMLDivElement>(null);
  const materiRef = useRef<HTMLDivElement>(null);
  const easyRef = useRef<HTMLDivElement>(null);
  const mediumRef = useRef<HTMLDivElement>(null);
  const hardRef = useRef<HTMLDivElement>(null);

  const [svgPaths, setSvgPaths] = useState({ easy: '', medium: '', hard: '' });

  // Update paths on resize
  useEffect(() => {
    const updatePaths = () => {
      if (!containerRef.current || !materiRef.current || !easyRef.current || !mediumRef.current || !hardRef.current) return;

      const container = containerRef.current.getBoundingClientRect();
      const startNode = materiRef.current.getBoundingClientRect();
      
      const getPath = (targetRef: React.RefObject<HTMLDivElement | null>): string => {
        if (!targetRef.current) return '';
        const target = targetRef.current.getBoundingClientRect();

        const startX = startNode.right - container.left; // Start from right side of materi circle
        const startY = startNode.top - container.top + (startNode.height / 2);
        
        const endX = target.left - container.left;
        const endY = target.top - container.top + (target.height / 2);

        const controlPoint1X = startX + (endX - startX) * 0.5;
        const controlPoint1Y = startY;
        const controlPoint2X = endX - (endX - startX) * 0.5;
        const controlPoint2Y = endY;

        return `M ${startX} ${startY} C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${endX} ${endY}`;
      };

      setSvgPaths({
        easy: getPath(easyRef),
        medium: getPath(mediumRef),
        hard: getPath(hardRef)
      });
    };

    updatePaths();
    window.addEventListener('resize', updatePaths);
    return () => window.removeEventListener('resize', updatePaths);
  }, []);

  // Get level data (for now using mock data, will be replaced with API call)
  const levelData = getLevelData(levelId || '1');

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-slate-950 flex flex-col">
      
      {/* Header (Floating) */}
      <div className="absolute top-0 left-0 right-0 p-6 z-20 flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto">
             <Button variant="secondary" size="sm" className="gap-2 shadow-sm" asChild>
                <Link to="/level">
                    <ChevronLeft className="h-4 w-4" /> Kembali ke Level
                </Link>
            </Button>
        </div>
      </div>

      {/* SVG CONNECTOR LINES BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg className="w-full h-full">
           <defs>
             <linearGradient id="gradientLine" x1="0%" y1="0%" x2="100%" y2="0%">
               <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
               <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
             </linearGradient>
           </defs>

           {/* Dynamic Paths */}
           <path d={svgPaths.easy} fill="none" stroke="url(#gradientLine)" strokeWidth="3" strokeDasharray="10, 5" className="opacity-50 transition-all duration-300" />
           <path d={svgPaths.medium} fill="none" stroke="url(#gradientLine)" strokeWidth="3" strokeDasharray="10, 5" className="opacity-80 transition-all duration-300" />
           <path d={svgPaths.hard} fill="none" stroke="url(#gradientLine)" strokeWidth="3" strokeDasharray="10, 5" className="opacity-50 transition-all duration-300" />
        </svg>
      </div>

      {/* MAIN CONTENT LAYER */}
      <div className="relative z-10 flex-1 flex">
         
         {/* LEFT SIDE: MATERI NODE */}
         <div className="w-[300px] flex items-center justify-center relative">
            
            {/* Pulsing Effect Background */}
            <div className="absolute w-40 h-40 bg-indigo-500/20 rounded-full animate-pulse blur-xl" />
            
            <div 
                ref={materiRef}
                onClick={() => setIsMaterialOpen(true)}
                className="relative group cursor-pointer transform transition-all hover:scale-110"
            >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.5)] border-4 border-white dark:border-slate-800 z-20 relative">
                    <BookOpen className="h-10 w-10 text-white" />
                </div>
                
                {/* Text Label */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center w-40">
                    <span className="bg-slate-800 px-3 py-1 rounded-full text-xs font-bold shadow-md border border-slate-700 text-indigo-400 whitespace-nowrap">
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
                <div ref={easyRef} className="flex-1 flex items-center gap-8 p-4 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-dashed border-emerald-900">
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
                <div ref={mediumRef} className="flex-1 flex flex-wrap items-center gap-6 p-4 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-dashed border-amber-900">
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
                <div ref={hardRef} className="flex-1 flex items-center gap-8 p-4 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-dashed border-red-900">
                     {levelData.challenges.hard.map((c, i) => (
                        <ChallengeNode key={c.id} node={c} index={i} colorClass="red" />
                    ))}
                </div>
            </div>

         </div>
      </div>

      {/* MODAL MATERI POPUP */}
      <MaterialModal 
        isOpen={isMaterialOpen}
        onClose={() => setIsMaterialOpen(false)}
        materialContent={levelData.materialContent}
      />

    </div>
  );
}

function ChallengeNode({ node, index, colorClass }: { node: any, index: number, colorClass: string }) {
    let bg = 'bg-slate-800 border-slate-700 text-slate-400';
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
         bg = 'bg-slate-900 border-4 animate-bounce-slow';
         if (colorClass === 'emerald') bg += ' border-emerald-500 text-emerald-600';
         if (colorClass === 'amber') bg += ' border-amber-500 text-amber-600';
         if (colorClass === 'red') bg += ' border-red-500 text-red-600';
         content = <PlayCircle size={20} fill="currentColor" className="text-inherit" />;
         shadow = 'shadow-[0_0_20px_rgba(0,0,0,0.15)] scale-110 z-10';
    }

    const nodeElement = (
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
    );

    return (
        <TooltipProvider>
            <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                    {node.status !== 'locked' ? (
                        <Link to={`/challenge/${node.id}`}>
                            {nodeElement}
                        </Link>
                    ) : (
                        nodeElement
                    )}
                </TooltipTrigger>
                <TooltipContent>
                    <div className="text-center">
                        <p className="font-bold">{node.title || `Challenge ${index + 1}`}</p>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground">{node.xp} XP</p>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}