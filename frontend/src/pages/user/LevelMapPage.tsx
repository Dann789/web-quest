import { useState, useMemo, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Lock, CheckCircle, BookOpen, ChevronLeft, Code2, Bug, GripVertical, LayoutTemplate, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import MaterialModal from './MaterialPage';
import { getLevelData } from '@/mocks/levelMockData';

export default function LevelMapPage() {
  const { levelId } = useParams();
  const [isMaterialOpen, setIsMaterialOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Drag to scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Get level data
  const levelData = getLevelData(levelId || '1');

  // Flatten all nodes into a single sequence with difficulty markers
  const mapNodes = useMemo(() => {
    const nodes = [];
    
    // 1. Materi Node (Start)
    nodes.push({
      id: 'materi',
      type: 'materi',
      title: 'Materi Utama',
      status: 'unlocked', 
      xp: 0,
      difficulty: 'intro'
    });

    // 2. Easy Challenges
    levelData.challenges.easy.forEach(c => nodes.push({ ...c, difficulty: 'easy' }));
    
    // 3. Medium Challenges
    levelData.challenges.medium.forEach(c => nodes.push({ ...c, difficulty: 'medium' }));
    
    // 4. Hard Challenges
    levelData.challenges.hard.forEach(c => nodes.push({ ...c, difficulty: 'hard' }));

    return nodes;
  }, [levelData]);

  // Calculate Positions (Grouped Horizontal with Gaps)
  const { points, pathD, width, height, zones } = useMemo(() => {
    const startPadding = 100;
    const nodeSpacing = 160;
    const groupGap = 400; // Large gap between difficulty groups
    const amplitude = 80;   
    const frequency = 0.8; 
    const containerHeight = 600;
    
    let currentX = startPadding;
    const resultPoints: any[] = [];
    const resultZones: any[] = [];

    // Track when groups start to calculate label position
    let currentGroupStart = currentX;
    let lastDifficulty = 'intro';

    mapNodes.forEach((node, i) => {
        // Detect Change in Group (ignore first node)
        if (i > 0 && node.difficulty !== lastDifficulty) {
            // Add Gap
            currentX += groupGap;
            currentGroupStart = currentX;
        }

        // Calculate Y Position (Sine Wave)
        // usage of 'i' keeps the wave phase continuous even across gaps
        const y = (containerHeight / 2) + Math.sin(i * frequency) * amplitude;
        resultPoints.push({ x: currentX, y });

        // Check if this is the last node of the group
        const nextNode = mapNodes[i+1];
        if (!nextNode || nextNode.difficulty !== node.difficulty) {
            // End of current group, define the zone
            let label = '';
            let color = '';
            
            if (node.difficulty === 'easy') { label = 'EASY LEVEL'; color = 'text-emerald-500'; }
            else if (node.difficulty === 'medium') { label = 'MEDIUM LEVEL'; color = 'text-amber-500'; }
            else if (node.difficulty === 'hard') { label = 'HARD LEVEL'; color = 'text-red-500'; }

            if (label) {
                resultZones.push({
                    label,
                    color,
                    x: currentGroupStart,
                    width: currentX - currentGroupStart, // Width covered by nodes
                    centerX: currentGroupStart + (currentX - currentGroupStart) / 2
                });
            }
        }

        lastDifficulty = node.difficulty || 'intro';
        currentX += nodeSpacing;
    });

    // Generate SVG Path
    let d = `M ${resultPoints[0].x} ${resultPoints[0].y}`;
    
    for (let i = 0; i < resultPoints.length - 1; i++) {
        const current = resultPoints[i];
        const next = resultPoints[i + 1];
        const distX = next.x - current.x;
        
        // If distance is large (group gap), adjust control points for a smooth long curve
        const cpOffset = distX * 0.4; // 40% of distance

        const cp1x = current.x + cpOffset;
        const cp1y = current.y;
        const cp2x = next.x - cpOffset;
        const cp2y = next.y;
        
        d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
    }

    return {
      points: resultPoints,
      pathD: d,
      width: currentX + 200, // Final width with padding
      height: containerHeight,
      zones: resultZones
    };
  }, [mapNodes]);

  return (
    <div className="h-screen w-full bg-slate-950 flex flex-col relative overflow-hidden select-none">
      
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6 z-50 flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto">
             <Button variant="secondary" size="sm" className="gap-2 shadow-lg bg-slate-900/80 backdrop-blur border border-slate-700 hover:bg-slate-800" asChild>
                <Link to="/level">
                    <ChevronLeft className="h-4 w-4" /> Kembali ke Level
                </Link>
            </Button>
        </div>
      </div>

      {/* Scrollable Map Container */}
      <div 
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={cn(
          "flex-1 overflow-x-auto overflow-y-hidden relative flex items-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']",
          isDragging ? "cursor-grabbing" : "cursor-grab"
        )}
      >
        <div className="relative" style={{ width: width, height: '100%' }}>
            
            {/* Zone Background Labels */}
            {zones.map((zone, idx) => (
                <div 
                    key={idx}
                    className="absolute top-1/2 left-0 pointer-events-none select-none flex flex-col items-center justify-center"
                    style={{ left: zone.centerX, transform: 'translate(-50%, -150px)' }}
                >
                    <h2 className={`text-6xl md:text-8xl font-black opacity-[0.07] whitespace-nowrap tracking-tighter ${zone.color}`}>
                        {zone.label}
                    </h2>
                    <div className={`h-1 w-20 mt-4 rounded-full opacity-20 bg-current ${zone.color}`} />
                </div>
            ))}

            {/* Connection Line */}
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible">
            <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="30%" stopColor="#10b981" />
                <stop offset="60%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            
            {/* Main Path */}
            <path 
                d={pathD} 
                fill="none" 
                stroke="url(#pathGradient)" 
                strokeWidth="4" 
                strokeLinecap="round"
                className="drop-shadow-[0_0_10px_rgba(139,92,246,0.3)] transition-all duration-500"
            />
            
            {/* Animated Dash Overlay */}
            <path 
                d={pathD} 
                fill="none" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round"
                strokeDasharray="10 20"
                strokeOpacity="0.2"
                className="animate-pulse"
            />
            </svg>

            {/* Nodes */}
            {mapNodes.map((node, index) => {
            const pos = points[index];
            
            if (node.type === 'materi') {
                return (
                <div 
                    key="materi"
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                    style={{ left: pos.x, top: pos.y }}
                >
                    <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-30 animate-pulse rounded-full" />
                    <div 
                        onClick={() => setIsMaterialOpen(true)}
                        className="relative group cursor-pointer transition-all hover:scale-110"
                    >
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg border-4 border-slate-900 ring-2 ring-indigo-500/50">
                            <BookOpen className="h-8 w-8 text-white" />
                        </div>
                        <Badge className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-indigo-500 border-indigo-400 whitespace-nowrap z-30 pointer-events-none">
                            Mulai Belajar
                        </Badge>
                    </div>
                </div>
                );
            }

            return (
                <MapNode 
                    key={node.id} 
                    node={node} 
                    index={index} 
                    position={pos}
                />
            );
            })}
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

function MapNode({ node, index, position }: { node: any, index: number, position: { x: number, y: number } }) {
    
    // Determine Style based on Difficulty & Status
    const styles = useMemo(() => {
        const isLocked = node.status === 'locked';
        const isCompleted = node.status === 'completed';
        const isCurrent = node.status === 'unlocked';

        let theme = {
            base: 'bg-slate-800 border-slate-700',
            active: 'bg-slate-700 border-slate-600',
            glow: 'shadow-none',
            icon: 'text-slate-500'
        };

        if (node.difficulty === 'easy') {
            theme = {
                base: 'bg-emerald-950 border-emerald-900',
                active: 'bg-emerald-600 border-emerald-400',
                glow: 'shadow-[0_0_20px_rgba(16,185,129,0.4)]',
                icon: 'text-emerald-400'
            };
        } else if (node.difficulty === 'medium') {
            theme = {
                base: 'bg-amber-950 border-amber-900',
                active: 'bg-amber-600 border-amber-400',
                glow: 'shadow-[0_0_20px_rgba(245,158,11,0.4)]',
                icon: 'text-amber-400'
            };
        } else if (node.difficulty === 'hard') {
            theme = {
                base: 'bg-red-950 border-red-900',
                active: 'bg-red-600 border-red-400',
                glow: 'shadow-[0_0_20px_rgba(239,68,68,0.4)]',
                icon: 'text-red-400'
            };
        }

        if (isCompleted) {
            return {
                bg: theme.active,
                border: 'border-2',
                iconColor: 'text-white',
                shadow: theme.glow,
                scale: 'scale-100'
            };
        } else if (isCurrent) {
            return {
                bg: 'bg-slate-900',
                border: `border-4 ${theme.active.split(' ')[1]}`, // Take border color
                iconColor: theme.icon,
                shadow: `${theme.glow} scale-110`,
                scale: 'scale-110'
            };
        } else {
            return {
                bg: 'bg-slate-900',
                border: 'border-slate-800',
                iconColor: 'text-slate-700',
                shadow: '',
                scale: 'scale-90 opacity-80'
            };
        }
    }, [node]);

    // Icon logic
    const Icon = useMemo(() => {
        if (node.status === 'locked') return Lock;
        if (node.status === 'completed') return CheckCircle;
        
        switch (node.type) {
            case 'coding': return Code2;
            case 'fix-bug': return Bug;
            case 'drag-drop': return GripVertical;
            case 'scenario': return LayoutTemplate;
            default: return Star;
        }
    }, [node]);

    const content = (
        <div 
            className={cn(
                "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 relative z-20 group-hover:scale-110",
                styles.bg,
                styles.border,
                styles.shadow,
            )}
        >
            <Icon className={cn("h-6 w-6", styles.iconColor)} strokeWidth={2.5} />
            
            {/* Status Indicator Pulse */}
            {node.status === 'unlocked' && (
                <div className="absolute -inset-1 rounded-full animate-ping opacity-75 bg-current text-white/20" />
            )}
        </div>
    );

    return (
        <div 
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ left: position.x, top: position.y }}
        >
             <TooltipProvider delayDuration={0}>
                <Tooltip>
                    <TooltipTrigger asChild>
                         {node.status !== 'locked' ? (
                            <Link to={`/challenge/${node.id}`} className="group outline-none">
                                {content}
                            </Link>
                        ) : (
                            <div className="group cursor-not-allowed">
                                {content}
                            </div>
                        )}
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="bg-slate-900/95 backdrop-blur border-slate-700 max-w-[200px]">
                        <div className="text-center space-y-1">
                            <p className="font-bold text-sm text-slate-200">{node.title}</p>
                            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                                <Badge variant="outline" className="text-[10px] px-1 h-5 capitalize border-slate-600 text-slate-400">
                                    {node.difficulty}
                                </Badge>
                                {node.xp > 0 && <span className="text-amber-400 font-bold">+{node.xp} XP</span>}
                            </div>
                        </div>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

             {/* Level Number floating below */}
             <div className={cn(
                "absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold transition-opacity whitespace-nowrap",
                node.status === 'locked' ? 'text-slate-800' : 'text-slate-500'
            )}>
                 {node.title.length > 15 ? node.title.substring(0, 12) + '...' : node.title}
            </div>
        </div>
    );
}