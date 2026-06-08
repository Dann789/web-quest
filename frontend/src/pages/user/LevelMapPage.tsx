import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { BookOpen, ChevronLeft, X, CircleHelp, Loader2, CheckCheck, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import MaterialModal from '../../components/user/MaterialModal';
import { useAuth } from "@/contexts/AuthContext";
import { getNodeChallenge } from '@/services/user/ChallengeService';
import { getCompleteNodes, getMaterialProgress } from '@/services/user/ProgressService';
import { getLevels } from '@/services/dosen/LevelService';
import type { Level } from '@/types';

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
  const [level, setLevel] = useState<Level | null>(null);
  const [nextLevel, setNextLevel] = useState<Level | null>(null);
  const [isLastLevel, setIsLastLevel] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Deteksi layar HP
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  // Ambil data progres & info level
  useEffect(() => {
    async function loadData() {
      if (!user?.id || !levelId) return;
      const parsedLevelId = parseInt(levelId, 10);
      
      try {
        const [nodeRes, materialRes, levelsRes] = await Promise.all([
          getCompleteNodes(user.id, parsedLevelId),
          getMaterialProgress(user.id, parsedLevelId),
          getLevels()
        ]);

        if (nodeRes.success && nodeRes.data) {
          setCompletedChallengeNodes(nodeRes.data.completedNodes || []);
        }
        if (materialRes.success && materialRes.data) {
          setIsMaterialCompleted(materialRes.data.isAllCompleted);
        }
        if (levelsRes.success && levelsRes.data) {
          const level = levelsRes.data.find(l => l.id === parsedLevelId);
          setLevel(level || null);
          const sorted = [...levelsRes.data].sort((a, b) => a.order - b.order);
          const currentIndex = sorted.findIndex(l => l.id === parsedLevelId);
          if (currentIndex !== -1) {
            if (currentIndex === sorted.length - 1) {
              setIsLastLevel(true);
            } else if (currentIndex < sorted.length - 1) {
              setNextLevel(sorted[currentIndex + 1]);
              setIsLastLevel(false);
            }
          }
        }
      } catch (error) {
        console.error("Gagal memuat data:", error);
      }
    }
    loadData();
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

      const totalNodes = (level?.easyNodes || 5) + (level?.mediumNodes || 8) + (level?.hardNodes || 4);

      // Navigasi ke ChallengePage dan kirim data soal via router state
      navigate('/challenge', {
        state: {
          assignmentId: result.data.assignmentId,
          isCompleted: result.data.isCompleted,
          challenge: result.data.challenge,
          levelId: parsedLevelId,
          nodeSlot,
          totalNodes,
        },
      });
    } finally {
      setLoadingNodeSlot(null);
    }
  }, [user, levelId, loadingNodeSlot, navigate, level]);
  
  // Drag to scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  // Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setStartY(e.pageY - scrollContainerRef.current.offsetTop);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    setScrollTop(scrollContainerRef.current.scrollTop);
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
    if (isMobile) {
      const y = e.pageY - scrollContainerRef.current.offsetTop;
      const walk = (y - startY) * 1.5;
      scrollContainerRef.current.scrollTop = scrollTop - walk;
    } else {
      const x = e.pageX - scrollContainerRef.current.offsetLeft;
      const walk = (x - startX) * 1.5;
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (scrollContainerRef.current) {
      if (isMobile) {
        scrollContainerRef.current.scrollTop += e.deltaY;
      } else {
        scrollContainerRef.current.scrollLeft += e.deltaY;
      }
    }
  }

  const NODE_CONFIG = useMemo(() => ({
    easy:   level?.easyNodes || 5,
    medium: level?.mediumNodes || 8,
    hard:   level?.hardNodes || 4,
  }), [level]);

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

    // ── Node Next Level Gateway ──
    const isHardCompleted = completedChallengeNodes.filter(
      (slot) => slot > (NODE_CONFIG.easy + NODE_CONFIG.medium)
    ).length >= NODE_CONFIG.hard;

    nodes.push({
      id: 'next-level',
      type: 'next_level',
      title: 'Next Level Portal',
      status: isHardCompleted ? 'unlocked' : 'locked',
      difficulty: 'final',
    });

    return nodes;
  }, [completedChallengeNodes, NODE_CONFIG, unlockState]);

  // Calculate Positions (Grouped Horizontal with Gaps / Vertical for Mobile)
  const { points, pathD, width, height, zones } = useMemo(() => {
    const startPadding = isMobile ? 120 : 100;
    const endPadding = isMobile ? 180 : 150;
    const nodeSpacing = isMobile ? 140 : 160;
    const groupGap = isMobile ? 240 : 300;
    const amplitude = isMobile ? 50 : 70;   
    const frequency = 0.8; 
    
    const secondaryAxisCenter = isMobile ? (window.innerWidth / 2) : (600 / 2);
    
    let currentPos = startPadding;
    const resultPoints: any[] = [];
    const resultZones: any[] = [];

    let currentGroupStart = currentPos;
    let lastDifficulty = 'intro';

    mapNodes.forEach((node, i) => {
        if (i > 0 && node.difficulty !== lastDifficulty) {
            currentPos += (node.type === 'next_level' ? (isMobile ? 120 : 350) : groupGap);
            currentGroupStart = currentPos;
        }

        const waveOffset = (node.type === 'next_level' || node.type === 'materi') ? 0 : Math.sin(i * frequency) * amplitude;
        
        let x = isMobile ? secondaryAxisCenter + waveOffset : currentPos;
        let y = isMobile ? currentPos : secondaryAxisCenter + waveOffset;
        
        resultPoints.push({ x, y, primaryPos: currentPos });

        const nextNode = mapNodes[i+1];
        if (!nextNode || nextNode.difficulty !== node.difficulty) {
            let label = '';
            let color = '';
            
            if (node.difficulty === 'easy') { label = 'EASY NODE'; color = 'text-emerald-500'; }
            else if (node.difficulty === 'medium') { label = 'MEDIUM NODE'; color = 'text-amber-500'; }
            else if (node.difficulty === 'hard') { label = 'HARD NODE'; color = 'text-red-500'; }

            if (label) {
                let offsetX = '-40%'; 
                if (label === 'EASY NODE') offsetX = '-65%';
                if (label === 'HARD NODE') offsetX = '-15%';

                resultZones.push({
                    label,
                    color,
                    startPos: currentGroupStart,
                    length: currentPos - currentGroupStart,
                    centerPos: currentGroupStart + (currentPos - currentGroupStart) / 2,
                    offsetX
                });
            }
        }

        lastDifficulty = node.difficulty || 'intro';
        currentPos += nodeSpacing;
    });

    let d = '';
    if (resultPoints.length > 0) {
      d = `M ${resultPoints[0].x} ${resultPoints[0].y}`;
      
      for (let i = 0; i < resultPoints.length - 1; i++) {
          const current = resultPoints[i];
          const next = resultPoints[i + 1];
          const isNextLevelNode = mapNodes[i + 1].type === 'next_level';

          let targetX = next.x;
          let targetY = next.y;

          if (isNextLevelNode) {
              if (isMobile) {
                  targetY -= 40; 
              } else {
                  targetX -= 40; 
              }
          }

          const distPrimary = isMobile ? (targetY - current.y) : (targetX - current.x);
          const cpOffset = distPrimary * 0.6;

          let cp1x, cp1y, cp2x, cp2y;
          
          if (isMobile) {
              cp1x = current.x;
              cp1y = current.y + cpOffset;
              cp2x = targetX;
              cp2y = targetY - cpOffset;
          } else {
              cp1x = current.x + cpOffset;
              cp1y = current.y;
              cp2x = targetX - cpOffset;
              cp2y = targetY;
          }
          
          d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${targetX} ${targetY}`;
      }
    }

    const totalLength = resultPoints.length > 0 ? (resultPoints[resultPoints.length - 1].primaryPos + endPadding) : 1000;

    return {
      points: resultPoints,
      pathD: d,
      width: isMobile ? '100%' : totalLength,
      height: isMobile ? totalLength : 600,
      zones: resultZones
    };
  }, [mapNodes, isMobile]);


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
      
      <div className="fixed inset-0 z-0 bg-slate-950 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-indigo-950/40 via-slate-950 to-slate-950" />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '50px 50px' }} />

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

          {planets.map((planet) => (
              <div 
                  key={planet.id}
                  className={cn(
                      "absolute rounded-full bg-linear-to-br",
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

      <div className="absolute top-0 left-0 right-0 p-6 z-50 flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto">
             <Button variant="secondary" size="sm" className="gap-2 shadow-lg bg-slate-900/80 backdrop-blur border border-slate-700 hover:bg-slate-800" asChild>
                <Link to="/level">
                {isMobile ? (
                    <ChevronLeft className="h-4 w-4" />
                ) : (
                    <>
                        <ChevronLeft className="h-4 w-4" /> Kembali ke Level
                    </>
                )}
                </Link>
            </Button>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onWheel={handleWheel}
        className={cn(
          "flex-1 relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] flex",
          isMobile ? "overflow-y-auto overflow-x-hidden items-start justify-center" : "overflow-x-auto overflow-y-hidden items-center justify-start",
          isDragging ? "cursor-grabbing" : "cursor-grab"
        )}
      >
        <div className="relative" style={{ width: width, height: height }}>
            
            {/* Zone Background Labels */}
            {zones.map((zone, idx) => (
                <div 
                    key={idx}
                    className="absolute pointer-events-none select-none flex flex-col items-center justify-center"
                    style={{ 
                      ...(isMobile ? {
                        top: zone.centerPos, 
                        left: '50%',
                        transform: 'translate(-50%, -50%) rotate(90deg)',
                        opacity: 0.3
                      } : {
                        top: '50%',
                        left: zone.centerPos, 
                        transform: `translate(${zone.offsetX}, -220px)`
                      })
                    }}
                >
                    <h2 className={`text-6xl md:text-8xl font-black whitespace-nowrap tracking-tighter ${zone.color}`}>
                        {zone.label}
                    </h2>
                </div>
            ))}

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
            
            <path 
                d={pathD} 
                fill="none" 
                stroke="url(#pathGradient)" 
                strokeWidth="4" 
                strokeLinecap="round"
                className="drop-shadow-[0_0_10px_rgba(139,92,246,0.3)] transition-all duration-500"
            />
            
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
                            "w-20 h-20 rounded-full flex items-center justify-center shadow-lg border-4 border-slate-900 ring-2 bg-linear-to-br",
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

            if (node.type === 'next_level') {
                const isUnlocked = node.status === 'unlocked';

                return (
                    <div 
                        key="next-level"
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                        style={{ left: pos.x, top: pos.y }}
                    >
                        {!isMobile && isUnlocked && (nextLevel || isLastLevel) && (
                             <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 w-48 h-[175px] pointer-events-none flex flex-col items-center">
                                <div className="absolute -top-12 animate-float">
                                     <div className="relative">
                                         <div className="absolute inset-0 blur-xl bg-indigo-400/40 rounded-full animate-pulse"></div>
                                         <div className="w-20 h-20 rounded-2xl bg-indigo-600/20 backdrop-blur-md border-2 border-indigo-400 flex items-center justify-center rotate-45 shadow-[0_0_30px_rgba(129,140,248,0.5)]">
                                             <div className="-rotate-45 text-4xl text-indigo-400 drop-shadow-[0_0_10px_rgba(129,140,248,0.8)]">
                                                 {isLastLevel ? (
                                                     <CircleHelp className="h-10 w-10 text-indigo-400" />
                                                 ) : (
                                                     <i className={`fa-brands ${nextLevel?.iconName}`}></i>
                                                 )}
                                             </div>
                                         </div>
                                     </div>
                                </div>
                                
                                <div className="absolute inset-0 bg-linear-to-t from-indigo-500/60 via-indigo-500/20 to-transparent clip-path-beam opacity-80" />
                                <div className="absolute inset-0 bg-linear-to-t from-white/20 via-transparent to-transparent blur-2xl" />
                            </div>
                        )}

                        {/* Portal / Circular Container */}
                        <div 
                            onClick={() => isUnlocked && navigate(`/level/${nextLevel?.id}`)}
                            className={cn(
                                "relative group transition-all duration-500 flex flex-col items-center",
                                isUnlocked ? "cursor-pointer hover:scale-110" : " cursor-not-allowed"
                            )}
                        >
                            {/* Base Glow */}
                            <div className={cn(
                                "absolute inset-0 blur-3xl rounded-full transition-all duration-500",
                                isUnlocked ? "bg-indigo-500/40 group-hover:bg-indigo-500/60" : "bg-slate-800"
                            )} />

                            {/* Circular Border & Name Content (Inside) */}
                            <div className={cn(
                                "w-25 h-25 rounded-full flex items-center justify-center border-4 shadow-2xl transition-all duration-500 bg-slate-900 backdrop-blur-sm z-10 p-4 text-center hover:scale-110",
                                isUnlocked 
                                    ? "border-indigo-400 shadow-indigo-500/50 ring-8 ring-indigo-500/10" 
                                    : "border-slate-800 shadow-none ring-0"
                            )}>
                                {isUnlocked ? (
                                    isLastLevel ? (
                                        <div className="flex flex-col items-center leading-tight">
                                            {isMobile ? (
                                                <CircleHelp className="h-10 w-10 text-indigo-400 mb-1" />
                                            ) : null}
                                            <span className="text-xs font-black text-white px-1">
                                                COMING SOON
                                            </span>
                                        </div>
                                    ) : nextLevel ? (
                                        <div className="flex flex-col items-center leading-tight">
                                            {isMobile ? (
                                                <i className={`fa-brands ${nextLevel.iconName} text-3xl text-indigo-400 mb-1`}></i>
                                            ) : (
                                                <span className="text-[10px] font-black text-indigo-400 tracking-widest uppercase mb-1">NEXT</span>
                                            )}
                                            {!isMobile && (
                                                <span className="text-xs font-black text-white px-1">
                                                    {nextLevel.name}
                                                </span>
                                            )}
                                        </div>
                                    ) : (
                                        <Lock className="h-10 w-10 text-slate-700" />
                                    )
                                ) : (
                                    <Lock className="h-10 w-10 text-slate-700" />
                                )}
                            </div>

                            {/* Unlock Prompt or Mobile Next Badge */}
                            {isUnlocked && isMobile && nextLevel && !isLastLevel && (
                                <div className="absolute -bottom-10 whitespace-nowrap z-30 pointer-events-none">
                                    <Badge className="bg-indigo-500/90 border border-indigo-400 text-white px-3 py-1 text-xs">
                                        Next: {nextLevel.name}
                                    </Badge>
                                </div>
                            )}
                            {isUnlocked && isMobile && isLastLevel && (
                                <div className="absolute -bottom-10 whitespace-nowrap z-30 pointer-events-none">
                                    <Badge className="bg-indigo-500/90 border border-indigo-400 text-white px-3 py-1 text-xs">
                                        Stay Tuned!
                                    </Badge>
                                </div>
                            )}
                            {!isUnlocked && (
                                <div className="absolute -bottom-10 whitespace-nowrap opacity-60">
                                     <Badge variant="outline" className="text-[12px] border-slate-700 text-slate-500">
                                        Selesaikan semua challenge!
                                     </Badge>
                                </div>
                            )}
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

            {/* Spacer untuk memastikan padding kanan/bawah muncul saat di-scroll */}
            <div style={{ 
                position: 'absolute', 
                left: isMobile ? '0' : width - 1, 
                top: isMobile ? height - 1 : '0',
                width: isMobile ? '100%' : '1px', 
                height: isMobile ? '1px' : '100%', 
                pointerEvents: 'none' 
            }} />
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
      <div className="fixed bottom-6 right-6 z-10 flex flex-col items-end gap-2 pointer-events-auto">
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
    // index,
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
        // const isLocked = node.status === 'locked';
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
                shadow: theme.glow,
                scale: 'scale-100'
            };
        } else {
            return {
                bg: 'bg-slate-900',
                border: 'border-slate-800',
                textColor: 'text-slate-700',
                shadow: '',
                scale: 'scale-100'
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
                styles.scale
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
                    <TooltipContent side="bottom" className="bg-slate-900/95 backdrop-blur border-slate-700 max-w-[200px] mt-3">
                        <div className="text-center space-y-1">
                            {/* Updated Tooltip Title */}
                            <p className="font-bold text-sm text-slate-200">Challenge {node.displayNumber}</p>
                            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                                <Badge variant="outline" className="text-[10px] px-1 h-5 capitalize border-slate-600 text-slate-400">
                                    {node.difficulty}
                                </Badge>
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