import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { 
  ChevronLeft, 
  ChevronRight,
  CheckCircle2, 
  AlertCircle, 
  Lightbulb,
  Clock,
  Eye,
  Terminal,
  Play,
  Send,
  RotateCcw,
  PartyPopper,
  XCircle,
  MapPin
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getLevelData } from '@/mocks/levelMockData';

// Import Challenge Editor Components
import MonacoCodeEditor from '@/components/user/MonacoCodeEditor';
import DragDropEditor from '@/components/user/DragDropEditor';
import ScenarioViewer from '@/components/user/ScenarioViewer';

// Timer Hook
function useTimer() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return formatTime(seconds);
}

// Preview Panel Component
function PreviewPanel({ code, isActive }: { code: string; isActive: boolean }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const updatePreview = useCallback(() => {
    if (iframeRef.current && code) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(`
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { box-sizing: border-box; }
    body { 
      background: #1e293b; 
      color: white; 
      font-family: system-ui, -apple-system, sans-serif;
      padding: 24px;
      margin: 0;
      min-height: 100%;
      line-height: 1.5;
    }
    h1 { font-size: 2em; color: #f1f5f9; margin: 0 0 0.5em; }
    h2 { font-size: 1.5em; color: #f1f5f9; margin: 0 0 0.5em; }
    h3 { font-size: 1.25em; color: #f1f5f9; margin: 0 0 0.5em; }
    p { color: #cbd5e1; margin: 0 0 1em; }
    a { color: #38bdf8; text-decoration: underline; }
    a:hover { color: #7dd3fc; }
    img { max-width: 100%; height: auto; border-radius: 8px; }
    code { background: #334155; padding: 2px 8px; border-radius: 4px; font-family: monospace; }
    pre { background: #0f172a; padding: 16px; border-radius: 8px; overflow-x: auto; }
    ul, ol { color: #cbd5e1; padding-left: 1.5em; }
    li { margin-bottom: 0.5em; }
    button { 
      background: #3b82f6; 
      color: white; 
      border: none; 
      padding: 10px 20px; 
      border-radius: 6px; 
      cursor: pointer; 
      font-weight: 500;
    }
    button:hover { background: #2563eb; }
    input, textarea { 
      background: #334155; 
      border: 1px solid #475569; 
      color: white; 
      padding: 8px 12px; 
      border-radius: 6px; 
      width: 100%;
    }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #475569; padding: 12px; text-align: left; }
    th { background: #334155; }
  </style>
</head>
<body>
${code}
</body>
</html>
        `);
        doc.close();
      }
    }
  }, [code]);

  useEffect(() => {
    updatePreview();
  }, [code, updatePreview]);

  if (!isActive) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500 text-sm bg-slate-900">
        <div className="text-center">
          <Play className="h-10 w-10 mx-auto mb-3 opacity-30 text-indigo-400" />
          <p className="text-slate-400">Klik <span className="text-indigo-400 font-semibold">"Run Code"</span></p>
          <p className="text-slate-500 text-xs mt-1">untuk melihat preview</p>
        </div>
      </div>
    );
  }

  return (
    <iframe
      ref={iframeRef}
      title="Live Preview"
      className="w-full h-full bg-slate-800 border-0"
      sandbox="allow-scripts allow-same-origin"
    />
  );
}

export default function ChallengePage() {
  const { challengeId } = useParams();
  const navigate = useNavigate();
  const timer = useTimer();
  
  // Get level data
  const levelData = getLevelData('1');
  
  // Flatten all challenges
  const allChallenges = [
    ...levelData.challenges.easy,
    ...levelData.challenges.medium,
    ...levelData.challenges.hard
  ];
  
  const activeChallenge = allChallenges.find(c => c.id === challengeId) || allChallenges[0];

  // State
  const [userCode, setUserCode] = useState(activeChallenge.initialCode || '');
  const [previewCode, setPreviewCode] = useState('');
  const [hasRunPreview, setHasRunPreview] = useState(false);
  const [dragItems, setDragItems] = useState(activeChallenge.dragItems || []);
  const [scenarioSelection, setScenarioSelection] = useState<string | undefined>();
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showHint, setShowHint] = useState(false);
  const [activeTab, setActiveTab] = useState('html');
  const [isRunning, setIsRunning] = useState(false);
  const [showResultDialog, setShowResultDialog] = useState(false);

  // Reset state when challenge changes
  useEffect(() => {
    setUserCode(activeChallenge.initialCode || '');
    setPreviewCode('');
    setHasRunPreview(false);
    setDragItems(activeChallenge.dragItems || []);
    setScenarioSelection(undefined);
    setSubmitStatus('idle');
    setShowHint(false);
    setIsRunning(false);
  }, [challengeId, activeChallenge.initialCode, activeChallenge.dragItems]);

  // Handle Run - Update preview
  const handleRun = () => {
    setIsRunning(true);
    // Small delay for visual feedback
    setTimeout(() => {
      setPreviewCode(userCode);
      setHasRunPreview(true);
      setIsRunning(false);
    }, 200);
  };

  // Handle Reset
  const handleReset = () => {
    setUserCode(activeChallenge.initialCode || '');
    setPreviewCode('');
    setHasRunPreview(false);
    setSubmitStatus('idle');
  };

  // Handle Submit - Check answer
  const handleSubmit = () => {
    // First run the code to show preview
    if (!hasRunPreview) {
      handleRun();
    }
    
    setSubmitStatus('idle');
    setTimeout(() => {
      let isCorrect = false;
      
      if (activeChallenge.type === 'coding' || activeChallenge.type === 'fix-bug') {
        const normalizedUser = userCode.trim().replace(/\s+/g, '').toLowerCase();
        const normalizedCorrect = activeChallenge.correctCode?.trim().replace(/\s+/g, '').toLowerCase();
        isCorrect = normalizedUser === normalizedCorrect;
        
        // Looser check - contains key elements
        if (!isCorrect && activeChallenge.correctCode) {
          const keyElements = activeChallenge.correctCode.match(/<[^>]+>/g) || [];
          isCorrect = keyElements.every(el => userCode.toLowerCase().includes(el.toLowerCase()));
        }
      } 
      else if (activeChallenge.type === 'drag-drop') {
        const currentOrder = dragItems.map(i => i.id);
        isCorrect = JSON.stringify(currentOrder) === JSON.stringify(activeChallenge.dragSolution);
      }
      else if (activeChallenge.type === 'scenario') {
        if (activeChallenge.scenarioOptions) {
          const correctOption = activeChallenge.scenarioOptions.find(o => o.isCorrect);
          isCorrect = scenarioSelection === correctOption?.id;
        } else {
          isCorrect = userCode.trim().length > 20;
        }
      }

      setSubmitStatus(isCorrect ? 'success' : 'error');
      setShowResultDialog(true);
    }, 500);
  };

  // Handle back to map
  const handleBackToMap = () => {
    navigate(-1);
  };

  // Handle try again
  const handleTryAgain = () => {
    setShowResultDialog(false);
    setSubmitStatus('idle');
  };

  // Get badge color based on type
  const getBadgeColor = () => {
    switch (activeChallenge.type) {
      case 'coding': return 'bg-blue-600 hover:bg-blue-700';
      case 'fix-bug': return 'bg-red-600 hover:bg-red-700';
      case 'drag-drop': return 'bg-amber-600 hover:bg-amber-700';
      case 'scenario': return 'bg-purple-600 hover:bg-purple-700';
      default: return 'bg-indigo-600';
    }
  };

  const isCodeChallenge = activeChallenge.type === 'coding' || activeChallenge.type === 'fix-bug';

  return (
    <div className="h-screen w-full bg-slate-950 flex flex-col text-slate-200 overflow-hidden">
      
      {/* NAVBAR */}
      <header className="h-12 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="hover:bg-slate-800 h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          {/* Challenge Type Badge + XP */}
          <div className="flex items-center gap-2">
            <Badge className={cn("text-[10px] uppercase font-bold px-2 py-0.5", getBadgeColor())}>
              {activeChallenge.type.replace('-', ' ')}
            </Badge>
            <Badge variant="outline" className="text-[10px] border-yellow-500/50 text-yellow-400 px-2 py-0.5">
              ⚡ {activeChallenge.xp} XP
            </Badge>
          </div>
        </div>

        {/* Center: Timer */}
        <div className="flex items-center gap-2 bg-slate-800 px-4 py-1.5 rounded-full border border-slate-700">
          <Clock className="h-4 w-4 text-indigo-400" />
          <span className="font-mono text-sm font-bold text-indigo-400">{timer}</span>
          <span className="text-[10px] text-slate-500 uppercase">elapsed</span>
        </div>

        {/* Right: Level Info */}
        <div className="text-xs text-slate-400">
          {levelData.title}
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT PANEL: INSTRUCTIONS */}
        <div className="w-[320px] border-r border-slate-800 flex flex-col bg-slate-900/50">
          <div className="p-5 flex-1 overflow-y-auto">
            
            {/* Title */}
            <h1 className="text-xl font-bold text-white mb-3">{activeChallenge.title}</h1>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">{activeChallenge.description}</p>
            
            {/* Task Section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-4 bg-indigo-500 rounded-full"></div>
                <span className="text-xs font-bold uppercase text-slate-300">Task</span>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 text-sm text-slate-300 border border-slate-700/50">
                {activeChallenge.description}
              </div>
            </div>
            
            {/* Expected Result (for coding challenges) */}
            {isCodeChallenge && activeChallenge.correctCode && (
              <div className="mb-6">
                <div className="text-xs font-semibold text-slate-400 mb-2">Expected Result:</div>
                <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 min-h-[60px]">
                  <div 
                    className="text-white [&>h1]:text-2xl [&>h1]:font-bold [&>p]:text-slate-300"
                    dangerouslySetInnerHTML={{ __html: activeChallenge.correctCode }}
                  />
                </div>
              </div>
            )}
            
            {/* Hint Accordion */}
            {activeChallenge.hint && (
              <div className="mb-4">
                <button 
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <ChevronRight className={cn("h-4 w-4 transition-transform", showHint && "rotate-90")} />
                  <span>Show Hint</span>
                </button>
                {showHint && (
                  <div className="mt-2 ml-6 p-3 bg-indigo-950/30 border border-indigo-900/50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-indigo-400 mt-0.5 shrink-0" />
                      <p className="text-xs text-indigo-300">{activeChallenge.hint}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="p-4 border-t border-slate-800 space-y-2">
            {/* Run & Reset Buttons for coding challenges */}
            {isCodeChallenge && (
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  className="flex-1 h-10 border-slate-700 hover:bg-slate-800 hover:border-indigo-500/50"
                  onClick={handleRun}
                  disabled={isRunning}
                >
                  <Play className={cn("mr-2 h-4 w-4", isRunning && "animate-pulse")} />
                  {isRunning ? 'Running...' : 'Run Code'}
                </Button>
                <Button 
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 hover:bg-slate-800"
                  onClick={handleReset}
                  title="Reset Code"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            {/* Submit Button */}
            <Button 
              className={cn(
                  "w-full h-11 font-semibold transition-all duration-300",
                  submitStatus === 'success' ? "bg-emerald-600 hover:bg-emerald-700" : 
                  submitStatus === 'error' ? "bg-red-600 hover:bg-red-700" :
                  "bg-indigo-600 hover:bg-indigo-700"
              )}
              onClick={handleSubmit}
              disabled={submitStatus === 'success'}
            >
              {submitStatus === 'idle' && <><Send className="mr-2 h-4 w-4" /> Submit Answer</>}
              {submitStatus === 'success' && <><CheckCircle2 className="mr-2 h-4 w-4" /> Correct! Next</>}
              {submitStatus === 'error' && <><AlertCircle className="mr-2 h-4 w-4" /> Try Again</>}
            </Button>
          </div>
        </div>

        {/* RIGHT PANEL: EDITOR + PREVIEW */}
        <div className="flex-1 flex flex-col bg-slate-950">
          
          {/* CODE EDITOR SECTION */}
          <div className={cn("flex flex-col border-b border-slate-800", isCodeChallenge ? "flex-1" : "flex-1")}>
            
            {/* Editor Tabs */}
            {isCodeChallenge && (
              <div className="h-10 bg-slate-900 border-b border-slate-800 flex items-center px-2 shrink-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
                  <TabsList className="h-full bg-transparent p-0 gap-0">
                    <TabsTrigger 
                      value="html" 
                      className="h-full px-4 rounded-none border-b-2 border-transparent data-[state=active]:bg-slate-950 data-[state=active]:border-indigo-500 text-xs font-medium"
                    >
                      <span className="text-orange-400 mr-1.5">⧩</span> index.html
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            )}
            
            {/* Editor Content - Using Monaco Editor */}
            <div className="flex-1 min-h-0">
              {activeChallenge.type === 'coding' && (
                <MonacoCodeEditor 
                  code={userCode} 
                  onChange={setUserCode} 
                  language="html"
                />
              )}

              {activeChallenge.type === 'fix-bug' && (
                <MonacoCodeEditor 
                  code={userCode} 
                  onChange={setUserCode} 
                  language="html"
                />
              )}

              {activeChallenge.type === 'drag-drop' && (
                <DragDropEditor items={dragItems} onReorder={setDragItems} />
              )}

              {activeChallenge.type === 'scenario' && (
                activeChallenge.scenarioOptions ? (
                  <ScenarioViewer 
                    challenge={activeChallenge} 
                    selectedOption={scenarioSelection} 
                    onSelect={setScenarioSelection} 
                  />
                ) : (
                  <MonacoCodeEditor code={userCode} onChange={setUserCode} language="html" />
                )
              )}
            </div>
          </div>

          {/* LIVE PREVIEW SECTION */}
          {isCodeChallenge && (
            <div className="h-[260px] flex flex-col bg-slate-900/50 shrink-0">
              
              {/* Preview Header */}
              <div className="h-9 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 shrink-0">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-2 h-2 rounded-full transition-colors",
                      hasRunPreview ? "bg-emerald-500 animate-pulse" : "bg-slate-600"
                    )}></div>
                    <span className="text-xs font-bold uppercase text-slate-300">Live Preview</span>
                  </div>
                  <button className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1">
                    <Terminal className="h-3 w-3" /> Console
                  </button>
                </div>
                <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  1920 × 1080
                </div>
              </div>
              
              {/* Preview Content */}
              <div className="flex-1 min-h-0">
                <PreviewPanel code={previewCode} isActive={hasRunPreview} />
              </div>
            </div>
          )}
        </div>

      </div>

      {/* RESULT DIALOG */}
      <AlertDialog open={showResultDialog} onOpenChange={setShowResultDialog}>
        <AlertDialogContent className={cn(
          "border-2",
          submitStatus === 'success' 
            ? "border-emerald-500/50 bg-slate-900" 
            : "border-red-500/50 bg-slate-900"
        )}>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-3 text-xl">
              {submitStatus === 'success' ? (
                <>
                  <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <PartyPopper className="h-6 w-6 text-emerald-400" />
                  </div>
                  <span className="text-emerald-400">Jawaban Benar! 🎉</span>
                </>
              ) : (
                <>
                  <div className="h-12 w-12 rounded-full bg-red-500/20 flex items-center justify-center">
                    <XCircle className="h-6 w-6 text-red-400" />
                  </div>
                  <span className="text-red-400">Jawaban Salah</span>
                </>
              )}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400 mt-4 text-base">
              {submitStatus === 'success' ? (
                <div className="space-y-3">
                  <p>Selamat! Kamu berhasil menyelesaikan challenge ini.</p>
                  <div className="flex items-center gap-2 text-emerald-400 font-medium">
                    <span>+{activeChallenge.xp} XP</span>
                    <span className="text-yellow-400">⚡</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p>Periksa kembali codingan/jawaban kamu.</p>
                  <p className="text-sm text-slate-500">
                    Pastikan syntax dan struktur kode sudah sesuai dengan yang diminta.
                  </p>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6">
            {submitStatus === 'success' ? (
              <AlertDialogAction 
                onClick={handleBackToMap}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <MapPin className="mr-2 h-4 w-4" />
                Kembali ke Map
              </AlertDialogAction>
            ) : (
              <>
                <AlertDialogCancel 
                  onClick={handleTryAgain}
                  className="border-slate-700 hover:bg-slate-800"
                >
                  Coba Lagi
                </AlertDialogCancel>
                {activeChallenge.hint && !showHint && (
                  <AlertDialogAction 
                    onClick={() => {
                      setShowResultDialog(false);
                      setShowHint(true);
                      setSubmitStatus('idle');
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Lightbulb className="mr-2 h-4 w-4" />
                    Lihat Hint
                  </AlertDialogAction>
                )}
              </>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}
