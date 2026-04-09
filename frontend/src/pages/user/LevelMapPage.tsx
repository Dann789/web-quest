import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { BookOpen, ChevronLeft, X, CircleHelp, Loader2, CheckCheck, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import MaterialModal from './MaterialModal';
import { useAuth } from "@/contexts/AuthContext";
import { getNodeChallenge } from '@/services/user/ChallengeService';
import { getCompleteNodes, getMaterialProgress } from '@/services/user/ProgressService';

export default function LevelMapPage() {
  const { user } = useAuth();
  const { levelId } = useParams();
  const navigate = useNavigate();
  const [isMaterialOpen, setIsMaterialOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [loadingNodeSlot, setLoadingNodeSlot] = useState<number | null>(null);
  
  // State untuk menyimpan data progress
  const [completedChallengeNodes, setCompletedChallengeNodes] = useState<number[]>([]);
  const [isMaterialCompleted, setIsMaterialCompleted] = useState<boolean>(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Ambil data progres (materi & tantangan) saat komponen dimuat
  useEffect(() => {
    async function loadProgress() {
      if (!user?.id || !levelId) return;
      const parsedLevelId = parseInt(levelId, 10);
      
      try {
        const [nodeRes, materialRes] = await Promise.all([
          getCompleteNodes(user.id, parsedLevelId),
          getMaterialProgress(user.id, parsedLevelId)
        ]);

        if (nodeRes.success && nodeRes.data) {
          setCompletedChallengeNodes(nodeRes.data.completedNodes || []);
        }
        if (materialRes.success && materialRes.data) {
          setIsMaterialCompleted(materialRes.data.isAllCompleted);
        }
      } catch (error) {
        console.error("Gagal memuat progres:", error);
      }
    }
    loadProgress();
  }, [user?.id, levelId]);

  // Handler saat node diklik — ambil soal dari backend, lalu navigasi ke ChallengePage
  const handleNodeClick = useCallback(async (nodeSlot: number) => {
    if (!user?.id || loadingNodeSlot !== null) return;

    setLoadingNodeSlot(nodeSlot);
    try {
      const parsedLevelId = parseInt(levelId || '1', 10);
      const result = await getNodeChallenge(user.id, parsedLevelId, nodeSlot);

      if (!result.success || !result.data) {
        alert(result.message || 'Gagal memuat soal. Coba lagi.');
        return;
      }

      // Navigasi ke ChallengePage dan kirim data soal via router state
      navigate('/challenge', {
        state: {
          assignmentId: result.data.assignmentId,
          isCompleted: result.data.isCompleted,
          challenge: result.data.challenge,
          levelId: parsedLevelId,
          nodeSlot,
        },
      });
    } finally {
      setLoadingNodeSlot(null);
    }
  }, [user, levelId, loadingNodeSlot, navigate]);
  
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
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const NODE_CONFIG = useMemo(() => ({
    easy:   5,
    medium: 8,
    hard:   4,
  }), []);

  const unlockState = useMemo(() => {
    const easyStart  = 1;
    const easyEnd    = NODE_CONFIG.easy;
    const mediumEnd  = NODE_CONFIG.easy + NODE_CONFIG.medium;

    const completedEasy = completedChallengeNodes.filter(
      (slot) => slot >= easyStart && slot <= easyEnd
    ).length;

    const completedMedium = completedChallengeNodes.filter(
      (slot) => slot > easyEnd && slot <= mediumEnd
    ).length;

    return {
      isEasyUnlocked:   isMaterialCompleted,
      isMediumUnlocked: completedEasy   >= 3,
      isHardUnlocked:   completedMedium >= 4,
    };
  }, [isMaterialCompleted, completedChallengeNodes, NODE_CONFIG]);

  const mapNodes = useMemo(() => {
    const nodes: Array<{
      id: string;
      type: string;
      title: string;
      status: 'unlocked' | 'locked' | 'completed';
      difficulty: string;
      displayNumber?: number;
    }> = [];

    // Node Materi (selalu di awal, selalu terbuka)
    nodes.push({
      id: 'materi',
      type: 'materi',
      title: 'Materi Utama',
      status: isMaterialCompleted ? 'completed' : 'unlocked',
      difficulty: 'intro',
    });

    let currentSlot = 1;

    // ── Node Easy ──
    Array.from({ length: NODE_CONFIG.easy }).forEach((_, idx) => {
      const isDone = completedChallengeNodes.includes(currentSlot);
      nodes.push({
        id: `easy-${idx}`,
        type: 'challenge',
        title: `Challenge Easy ${idx + 1}`,
        status: isDone
          ? 'completed'
          : unlockState.isEasyUnlocked
          ? 'unlocked'
          : 'locked',
        difficulty: 'easy',
        displayNumber: idx + 1,
      });
      currentSlot++;
    });

    // ── Node Medium ──
    Array.from({ length: NODE_CONFIG.medium }).forEach((_, idx) => {
      const isDone = completedChallengeNodes.includes(currentSlot);
      nodes.push({
        id: `medium-${idx}`,
        type: 'challenge',
        title: `Challenge Medium ${idx + 1}`,
        status: isDone
          ? 'completed'
          : unlockState.isMediumUnlocked
          ? 'unlocked'
          : 'locked',
        difficulty: 'medium',
        displayNumber: idx + 1,
      });
      currentSlot++;
    });

    // ── Node Hard ──
    Array.from({ length: NODE_CONFIG.hard }).forEach((_, idx) => {
      const isDone = completedChallengeNodes.includes(currentSlot);
      nodes.push({
        id: `hard-${idx}`,
        type: 'challenge',
        title: `Challenge Hard ${idx + 1}`,
        status: isDone
          ? 'completed'
          : unlockState.isHardUnlocked
          ? 'unlocked'
          : 'locked',
        difficulty: 'hard',
        displayNumber: idx + 1,
      });
      currentSlot++;
    });

    return nodes;
  }, [isMaterialCompleted, completedChallengeNodes, NODE_CONFIG, unlockState]);

  // Calculate Positions (Grouped Horizontal with Gaps)
  const { points, pathD, width, height, zones } = useMemo(() => {
    const startPadding = 100;
    const nodeSpacing = 160;
    const groupGap = 300;
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
      width: currentX + 500, // Final width with extra padding for hard level
      height: containerHeight,
      zones: resultZones
    };
  }, [mapNodes]);

  // Generate random stars
  const stars = useMemo(() => {
    return Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.1,
      delay: `${Math.random() * 4}s`
    }));
  }, []);

  // Generate background planets
  const planets = useMemo(() => {
     return [
        { id: 1, top: '15%', left: '10%', size: 120, gradient: 'from-purple-600/20 to-indigo-600/20', blur: 'blur-3xl' },
        { id: 2, top: '75%', left: '85%', size: 200, gradient: 'from-emerald-600/10 to-teal-600/10', blur: 'blur-3xl' },
        { id: 3, top: '25%', left: '90%', size: 80, gradient: 'from-orange-500/10 to-red-500/10', blur: 'blur-2xl' },
        { id: 4, top: '80%', left: '5%', size: 100, gradient: 'from-blue-500/10 to-cyan-500/10', blur: 'blur-3xl' },
        { id: 5, top: '40%', left: '50%', size: 300, gradient: 'from-indigo-500/5 to-purple-500/5', blur: 'blur-[100px]' }, // Nebula effect
     ];
  }, []);

  return (
    <div className="h-screen w-full bg-slate-950 flex flex-col relative overflow-hidden select-none">
      
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 bg-slate-950 pointer-events-none overflow-hidden">
          {/* Base Gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/40 via-slate-950 to-slate-950" />
          
          {/* Grid Overlay */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '50px 50px' }} />

          {/* Stars */}
          {stars.map((star) => (
              <div 
                  key={star.id}
                  className="absolute rounded-full bg-white animate-pulse"
                  style={{
                      top: star.top,
                      left: star.left,
                      width: star.size,
                      height: star.size,
                      opacity: star.opacity,
                      animationDuration: '3s',
                      animationDelay: star.delay
                  }}
              />
          ))}

          {/* Planets/Nebulas */}
          {planets.map((planet) => (
              <div 
                  key={planet.id}
                  className={cn(
                      "absolute rounded-full bg-gradient-to-br",
                      planet.gradient,
                      planet.blur
                  )}
                  style={{
                      top: planet.top,
                      left: planet.left,
                      width: planet.size,
                      height: planet.size,
                  }}
              />
          ))}
      </div>

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
                    style={{ left: zone.centerX, transform: 'translate(-65%, -200px)' }}
                >
                    <h2 className={`text-6xl md:text-8xl font-black opacity-[0.7] whitespace-nowrap tracking-tighter ${zone.color}`}>
                        {zone.label}
                    </h2>
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
                const isCompleted = node.status === 'completed';

                return (
                <div 
                    key="materi"
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                    style={{ left: pos.x, top: pos.y }}
                >
                    <div className={cn(
                        "absolute inset-0 blur-xl opacity-30 animate-pulse rounded-full",
                        isCompleted ? "bg-emerald-500" : "bg-indigo-500"
                    )} />
                    <div 
                        onClick={() => setIsMaterialOpen(true)}
                        className="relative group cursor-pointer transition-all hover:scale-110"
                    >
                        <div className={cn(
                            "w-20 h-20 rounded-full flex items-center justify-center shadow-lg border-4 border-slate-900 ring-2 bg-gradient-to-br",
                            isCompleted 
                                ? "from-emerald-400 to-emerald-600 ring-emerald-500/50 shadow-emerald-500/30"
                                : "from-indigo-500 to-purple-600 ring-indigo-500/50"
                        )}>
                            <BookOpen className="h-8 w-8 text-white drop-shadow-md" />
                        </div>
                        <Badge className={cn(
                            "absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap z-30 pointer-events-none border text-white",
                             isCompleted
                                ? "bg-emerald-600/90 border-emerald-400"
                                : "bg-indigo-500 border-indigo-400"
                        )}>
                            {isCompleted ? "Materi Selesai" : "Mulai Belajar"}
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
                    isLoading={loadingNodeSlot === index}
                    onNodeClick={() => handleNodeClick(index)}
                />
            );
            })}
        </div>
      </div>

      {/* MODAL MATERI POPUP */}
      <MaterialModal 
        isOpen={isMaterialOpen}
        onClose={() => setIsMaterialOpen(false)}
        levelId={parseInt(levelId || '1', 10)}
        onMaterialComplete={() => setIsMaterialCompleted(true)}
      />

      {/* Guide Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 pointer-events-auto">
        {/* Popup/Modal Content */}
        {isGuideOpen && (
            <div className="bg-slate-900/95 backdrop-blur border border-slate-700 p-4 rounded-xl shadow-2xl w-80 mb-2 animate-in slide-in-from-bottom-2 fade-in duration-300">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-slate-100 flex items-center gap-2">
                        Petunjuk Pengerjaan
                    </h3>
                    <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2 -mt-1 hover:bg-slate-800 text-slate-400" onClick={() => setIsGuideOpen(false)}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
                <ol className="text-sm text-slate-300 space-y-2 list-decimal list-outside pl-4 marker:text-indigo-500">
                    <li>Baca dan pelajari <strong className="text-indigo-400">Materi Utama</strong> terlebih dahulu untuk membuka soal Easy</li>
                    <li>Selesaikan minimal <strong className="text-emerald-400">3 soal Easy</strong> untuk membuka soal Medium</li>
                    <li>Selesaikan minimal <strong className="text-amber-400">4 soal Medium</strong> untuk membuka soal Hard</li>
                    <li>Node yang terkunci (🔒) belum dapat dikerjakan sampai syarat terpenuhi</li>
                    <li>Anda akan mendapatkan XP setelah menyelesaikan setiap tantangan</li>
                </ol>
            </div>
        )}

        {/* Toggle Button */}
        <Button 
            onClick={() => setIsGuideOpen(!isGuideOpen)}
            className={cn(
                "rounded-full w-12 h-12 shadow-lg transition-all duration-300",
                isGuideOpen 
                    ? "bg-slate-800 hover:bg-slate-700 text-slate-200 rotate-90" 
                    : "bg-indigo-600 hover:bg-indigo-700 hover:scale-110 shadow-indigo-500/30"
            )}
        >
            {isGuideOpen ? <X className="h-6 w-6" /> : <CircleHelp className="h-6 w-6" />}
        </Button>
      </div>

    </div>
  );
}

function MapNode({
    node,
    index,
    position,
    isLoading,
    onNodeClick,
}: {
    node: any;
    index: number;
    position: { x: number; y: number };
    isLoading: boolean;
    onNodeClick: () => void;
}) {
    
    // Determine Style based on Difficulty & Status
    const styles = useMemo(() => {
        const isLocked = node.status === 'locked';
        const isCompleted = node.status === 'completed';
        const isCurrent = node.status === 'unlocked';

        let theme = {
            base: 'bg-slate-800 border-slate-700',
            active: 'bg-slate-700 border-slate-600',
            glow: 'shadow-none',
            text: 'text-slate-500'
        };

        if (node.difficulty === 'easy') {
            theme = {
                base: 'bg-emerald-950 border-emerald-900',
                active: 'bg-emerald-600 border-emerald-400',
                glow: 'shadow-[0_0_20px_rgba(16,185,129,0.4)]',
                text: 'text-emerald-400'
            };
        } else if (node.difficulty === 'medium') {
            theme = {
                base: 'bg-amber-950 border-amber-900',
                active: 'bg-amber-600 border-amber-400',
                glow: 'shadow-[0_0_20px_rgba(245,158,11,0.4)]',
                text: 'text-amber-400'
            };
        } else if (node.difficulty === 'hard') {
            theme = {
                base: 'bg-red-950 border-red-900',
                active: 'bg-red-600 border-red-400',
                glow: 'shadow-[0_0_20px_rgba(239,68,68,0.4)]',
                text: 'text-red-400'
            };
        }

        if (isCompleted) {
            return {
                bg: theme.active,
                border: 'border-2',
                textColor: 'text-white',
                shadow: theme.glow,
                scale: 'scale-100'
            };
        } else if (isCurrent) {
            return {
                bg: 'bg-slate-900',
                border: `border-4 ${theme.active.split(' ')[1]}`, // Take border color
                textColor: theme.text,
                shadow: `${theme.glow} scale-110`,
                scale: 'scale-110'
            };
        } else {
            return {
                bg: 'bg-slate-900',
                border: 'border-slate-800',
                textColor: 'text-slate-700',
                shadow: '',
                scale: 'scale-90 opacity-80'
            };
        }
    }, [node]);



    // Content Display
    const content = (
        <div 
            className={cn(
                "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 relative z-20 group-hover:scale-110",
                styles.bg,
                styles.border,
                styles.shadow,
            )}
        >
             {/* Show Number / Loading / Lock / Check Icon */}
             {isLoading ? (
                <Loader2 className={cn("h-6 w-6 animate-spin", styles.textColor)} />
             ) : node.status === 'completed' ? (
                <CheckCheck className={cn("h-6 w-6", styles.textColor)} />
             ) : node.status === 'locked' ? (
                <Lock className="h-5 w-5 text-slate-600" />
             ) : (
                <span className={cn("text-xl font-bold font-mono", styles.textColor)}>
                    {node.displayNumber}
                </span>
             )}
            
            {/* Status Indicator Pulse */}
            {node.status === 'unlocked' && !isLoading && (
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
                            <button
                                onClick={onNodeClick}
                                disabled={isLoading}
                                className="group outline-none disabled:cursor-wait"
                            >
                                {content}
                            </button>
                        ) : (
                            <div className="group cursor-not-allowed">
                                {content}
                            </div>
                        )}
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="bg-slate-900/95 backdrop-blur border-slate-700 max-w-[200px]">
                        <div className="text-center space-y-1">
                            {/* Updated Tooltip Title */}
                            <p className="font-bold text-sm text-slate-200">Challenge {node.displayNumber}</p>
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

             {/* Updated Level Label floating below */}
             <div className={cn(
                "absolute -bottom-8 left-1/2 -translate-x-1/2 text-[13px] font-mono font-bold transition-opacity whitespace-nowrap",
                node.status === 'locked' ? 'text-slate-800' : 'text-slate-500'
            )}>
                 Challenge {node.displayNumber}
            </div>
        </div>
    );
}