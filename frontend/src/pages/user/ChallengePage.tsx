import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  ChevronLeft, 
  Play,  
  CheckCircle2, 
  AlertCircle, 
  Lightbulb
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getLevelData } from '@/mocks/levelMockData';

// Import Challenge Editor Components
import CodingEditor from '@/components/user/CodingEditor';
import FixBugEditor from '@/components/user/FixBugEditor';
import DragDropEditor from '@/components/user/DragDropEditor';
import ScenarioViewer from '@/components/user/ScenarioViewer';

export default function ChallengePage() {
  const { challengeId } = useParams();
  const navigate = useNavigate();
  
  // Get level data (mengambil data dari levelMockData.ts)
  const levelData = getLevelData('1');
  
  // Flatten all challenges to find the challenge by ID
  const allChallenges = [
    ...levelData.challenges.easy,
    ...levelData.challenges.medium,
    ...levelData.challenges.hard
  ];
  
  // Find active challenge based on challengeId from URL params
  const activeChallenge = allChallenges.find(c => c.id === challengeId) || allChallenges[0];

  // Challenge State
  const [userCode, setUserCode] = useState(activeChallenge.initialCode || '');
  const [dragItems, setDragItems] = useState(activeChallenge.dragItems || []);
  const [scenarioSelection, setScenarioSelection] = useState<string | undefined>();
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Reset state when challenge changes
  useEffect(() => {
    setUserCode(activeChallenge.initialCode || '');
    setDragItems(activeChallenge.dragItems || []);
    setScenarioSelection(undefined);
    setSubmitStatus('idle');
  }, [challengeId]);

  const handleSubmit = () => {
    setSubmitStatus('idle');
    setTimeout(() => {
        let isCorrect = false;
        
        if (activeChallenge.type === 'coding' || activeChallenge.type === 'fix-bug') {
            // Simple validation - normalize whitespace
            isCorrect = userCode.trim().replace(/\s+/g, '') === activeChallenge.correctCode?.trim().replace(/\s+/g, '');
            
            // Exact match fallback
            if (activeChallenge.correctCode && userCode.trim() === activeChallenge.correctCode.trim()) {
                isCorrect = true;
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
                // For code-based scenarios
                isCorrect = userCode.trim().length > 20;
            }
        }

        setSubmitStatus(isCorrect ? 'success' : 'error');
    }, 800);
  };

  return (
    <div className="h-screen w-full bg-slate-950 flex flex-col text-slate-200 overflow-hidden">
      
      {/* HEADER */}
      <header className="h-14 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="hover:bg-slate-800">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex flex-col">
            <h1 className="font-bold text-sm text-white flex items-center gap-2">
              {activeChallenge.title}
              <Badge variant="outline" className={cn(
                  "text-[10px] h-5 px-1.5", 
                  activeChallenge.type === 'coding' ? 'border-blue-500 text-blue-400' :
                  activeChallenge.type === 'drag-drop' ? 'border-amber-500 text-amber-400' :
                  activeChallenge.type === 'fix-bug' ? 'border-red-500 text-red-400' :
                  'border-purple-500 text-purple-400'
              )}>
                {activeChallenge.type.toUpperCase().replace('-', ' ')}
              </Badge>
            </h1>
            <span className="text-xs text-slate-400">{levelData.title}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
            <span className="text-yellow-400 text-xs font-bold">★</span>
            <span className="text-xs font-medium text-slate-300">{activeChallenge.xp} XP</span>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT - SPLIT VIEW */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT PANEL: INSTRUCTIONS */}
        <div className="w-1/3 min-w-[350px] border-r border-slate-800 flex flex-col bg-slate-900/30">
          <div className="p-6 flex-1 overflow-y-auto">
             <div className="mb-6">
                <h2 className="text-lg font-bold text-white mb-4">Instruksi</h2>
                <div className="prose prose-sm prose-invert text-slate-300">
                    <p>{activeChallenge.description}</p>
                    
                    {activeChallenge.hint && (
                        <Alert className="mt-6 bg-blue-950/30 border-blue-900/50">
                            <Lightbulb className="h-4 w-4 text-blue-400" />
                            <AlertTitle className="text-blue-400">Petunjuk</AlertTitle>
                            <AlertDescription className="text-blue-300/80 text-xs">
                                {activeChallenge.hint}
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
             </div>
          </div>
          
          <div className="p-4 border-t border-slate-800 bg-slate-900/50">
             <Button 
                className={cn(
                    "w-full transition-all duration-300",
                    submitStatus === 'success' ? "bg-emerald-600 hover:bg-emerald-700" : 
                    submitStatus === 'error' ? "bg-red-600 hover:bg-red-700" :
                    "bg-indigo-600 hover:bg-indigo-700"
                )}
                onClick={handleSubmit}
                disabled={submitStatus === 'success'}
             >
                {submitStatus === 'idle' && <><Play className="mr-2 h-4 w-4" /> Jalankan & Periksa</>}
                {submitStatus === 'success' && <><CheckCircle2 className="mr-2 h-4 w-4" /> Berhasil! Lanjut</>}
                {submitStatus === 'error' && <><AlertCircle className="mr-2 h-4 w-4" /> Salah, Coba Lagi</>}
             </Button>
          </div>
        </div>

        {/* RIGHT PANEL: WORKSPACE - Data dari levelMockData.ts ditampilkan di sini */}
        <div className="flex-1 bg-slate-950 relative flex flex-col">
            
            {/* Render komponen sesuai tipe challenge */}
            {activeChallenge.type === 'coding' && (
                <CodingEditor code={userCode} onChange={setUserCode} />
            )}

            {activeChallenge.type === 'fix-bug' && (
                 <FixBugEditor code={userCode} onChange={setUserCode} />
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
                    // Fallback for code-based scenarios
                     <CodingEditor code={userCode} onChange={setUserCode} />
                )
            )}

        </div>

      </div>
    
    </div>
  );
}
