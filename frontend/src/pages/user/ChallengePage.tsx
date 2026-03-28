import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Clock,
  Play,
  Send,
  RotateCcw,
  PartyPopper,
  XCircle,
  MapPin,
  Zap,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import MonacoCodeEditor from "@/components/user/MonacoCodeEditor";
import DragDropEditor from "@/components/user/DragDropEditor";
import ChallengeTutorial, {
  type TutorialStep,
} from "@/components/user/ChallengeTutorial";
import type { Challenge, DragItem } from "@/types";
import { submitAnswer } from "@/services/user/ChallengeService";
import { useAuth } from "@/contexts/AuthContext";

// ─── Tipe state yang dikirim dari LevelMapPage ────────────────────────────────
interface ChallengePageState {
  assignmentId: number;
  isCompleted: boolean;
  challenge: Challenge;
  levelId: number;
  nodeSlot: number;
}

// ─── Tipe parsed content untuk drag & drop ───────────────────────────────────
interface DragDropContent {
  blocks: string[];
  expectedOrder: string[];
}

// ─── Tipe bahasa yang didukung editor ────────────────────────────────────────
type Language = "html" | "css" | "javascript" | "php" | "sql";

// ─── Deteksi bahasa editor berdasarkan levelId ───────────────────────────────
function detectLanguage(levelId: number): Language {
  // Sesuaikan mapping ini dengan level di database Anda
  const languageMap: Record<number, Language> = {
    1: "html",
    2: "css",
    3: "javascript",
    4: "php",
    5: "sql",
  };
  return languageMap[levelId] ?? "html";
}

// ─── Timer Hook ───────────────────────────────────────────────────────────────
function useTimer(isActive: boolean) {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Kembalikan formatted string DAN raw seconds untuk dikirim ke API
  return { formatted: formatTime(seconds), raw: seconds };
}

// ─── Preview Panel ────────────────────────────────────────────────────────────
function PreviewPanel({
  code,
  isActive,
  language,
}: {
  code: string;
  isActive: boolean;
  language: string;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const updatePreview = useCallback(() => {
    if (!iframeRef.current || !code) return;
    const doc = iframeRef.current.contentDocument;
    if (!doc) return;

    let previewHtml = "";
    if (language === "css") {
      previewHtml = `<!DOCTYPE html><html><head><style>${code}</style></head><body style="background:#1e293b;color:white;padding:24px;font-family:system-ui">
        <h1>Heading 1</h1><h2>Heading 2</h2><p>Ini adalah paragraf contoh untuk CSS preview.</p>
        <a href="#">Link Contoh</a><button>Tombol</button></body></html>`;
    } else if (language === "javascript") {
      previewHtml = `<!DOCTYPE html><html><head></head><body style="background:#1e293b;color:white;padding:24px;font-family:monospace">
        <div id="output" style="white-space:pre-wrap"></div>
        <script>
          const origLog = console.log;
          const output = document.getElementById('output');
          console.log = (...args) => { output.textContent += args.join(' ') + '\\n'; origLog(...args); };
          try { ${code} } catch(e) { output.textContent += 'Error: ' + e.message; }
        <\/script></body></html>`;
    } else if (language === "sql") {
      previewHtml = `<!DOCTYPE html><html><body style="background:#1e293b;color:#94a3b8;padding:24px;font-family:monospace">
        <p style="color:#64748b">SQL Preview tidak dapat dieksekusi langsung di browser.</p>
        <pre style="background:#0f172a;padding:16px;border-radius:8px;color:#38bdf8">${code}</pre>
        </body></html>`;
    } else if (language === "php") {
      previewHtml = `<!DOCTYPE html><html><body style="background:#1e293b;color:#94a3b8;padding:24px;font-family:monospace">
        <p style="color:#64748b">PHP Preview tidak dapat dieksekusi langsung di browser.</p>
        <pre style="background:#0f172a;padding:16px;border-radius:8px;color:#a78bfa">${code}</pre>
        </body></html>`;
    } else {
      // html (default)
      previewHtml = `<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8">
        <style>*{box-sizing:border-box}body{background:#1e293b;color:white;font-family:system-ui;padding:24px;margin:0}
        h1{font-size:2em;color:#f1f5f9}h2{font-size:1.5em;color:#f1f5f9}p{color:#cbd5e1}
        a{color:#38bdf8}button{background:#3b82f6;color:white;border:none;padding:10px 20px;border-radius:6px;cursor:pointer}
        input,textarea{background:#334155;border:1px solid #475569;color:white;padding:8px 12px;border-radius:6px;width:100%}
        table{border-collapse:collapse;width:100%}th,td{border:1px solid #475569;padding:12px;text-align:left}th{background:#334155}
        </style></head><body>${code}</body></html>`;
    }

    doc.open();
    doc.write(previewHtml);
    doc.close();
  }, [code, language]);

  useEffect(() => {
    updatePreview();
  }, [code, updatePreview]);

  if (!isActive) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500 text-sm bg-slate-900">
        <div className="text-center">
          <Play className="h-10 w-10 mx-auto mb-3 opacity-30 text-indigo-400" />
          <p className="text-slate-400">
            Klik <span className="text-indigo-400 font-semibold">"Jalankan Kode"</span>
          </p>
          <p className="text-slate-500 text-xs mt-1">untuk melihat hasil</p>
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

// ─── Halaman Utama ────────────────────────────────────────────────────────────
export default function ChallengePage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Ambil data dari router state (dikirim oleh LevelMapPage)
  const state = location.state as ChallengePageState | null;

  // ─── Fallback jika state kosong (akses URL langsung) ───────────────────────
  if (!state?.challenge) {
    return (
      <div className="h-screen w-full bg-slate-950 flex items-center justify-center text-white">
        <div className="text-center space-y-4">
          <AlertTriangle className="h-16 w-16 text-amber-400 mx-auto" />
          <h1 className="text-2xl font-bold">Soal Tidak Ditemukan</h1>
          <p className="text-slate-400">
            Silakan kembali ke peta level dan pilih node untuk mulai mengerjakan soal.
          </p>
          <Button onClick={() => navigate(-1)} className="bg-indigo-600 hover:bg-indigo-700">
            <ChevronLeft className="mr-2 h-4 w-4" /> Kembali ke Peta
          </Button>
        </div>
      </div>
    );
  }

  const { assignmentId, isCompleted: alreadyCompleted, challenge, levelId } = state;
  const language = detectLanguage(levelId);

  return (
    <ChallengeView
      challenge={challenge}
      assignmentId={assignmentId}
      alreadyCompleted={alreadyCompleted}
      language={language}
      navigate={navigate}
    />
  );
}

// ─── ChallengeView (dipisah agar hooks tidak dipanggil secara kondisional) ───
function ChallengeView({
  challenge,
  assignmentId,
  alreadyCompleted,
  language,
  navigate,
}: {
  challenge: Challenge;
  assignmentId: number;
  alreadyCompleted: boolean;
  language: Language;
  navigate: ReturnType<typeof useNavigate>;
}) {
  const { user, updateUser } = useAuth();
  const [isTutorialActive, setIsTutorialActive] = useState(true);
  const { formatted: timer, raw: timerSeconds } = useTimer(!isTutorialActive);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  // Info: node sudah pernah diselesaikan (hanya untuk tampilan banner, bukan kunci pengerjaan)
  const wasAlreadyCompleted = alreadyCompleted;

  // ─── Parse drag & drop content dari kolom `content` ──────────────────────
  // Prisma mengembalikan kolom Json sebagai JavaScript object langsung,
  // tapi ada safeguard jika datanya masih berupa string JSON.
  const dragDropData = useMemo<DragDropContent | null>(() => {
    if (challenge.method !== "DRAG_AND_DROP") return null;
    try {
      let parsed = challenge.content;

      // Jika masih berupa string, coba parse dulu
      if (typeof parsed === "string") {
        parsed = JSON.parse(parsed);
      }

      if (
        parsed &&
        Array.isArray(parsed.blocks) &&
        Array.isArray(parsed.expectedOrder)
      ) {
        return parsed as DragDropContent;
      }
      return null;
    } catch {
      console.error("Gagal mem-parse content drag & drop:", challenge.content);
      return null;
    }
  }, [challenge]);

  // Konversi blocks dari JSON ke format DragItem[]
  const initialSourceItems = useMemo<DragItem[]>(() => {
    if (!dragDropData) return [];
    // Acak urutan blocks agar tidak tampil berurutan
    const shuffled = [...dragDropData.blocks].sort(() => Math.random() - 0.5);
    return shuffled.map((content, i) => ({ id: String(i), content }));
  }, [dragDropData]);

  // ─── State ─────────────────────────────────────────────────────────────────
  const [userCode, setUserCode] = useState(challenge.starterCode ?? "");
  const [previewCode, setPreviewCode] = useState("");
  const [hasRunPreview, setHasRunPreview] = useState(false);
  const [dragItems, setDragItems] = useState<DragItem[]>([]);
  const [sourceDragItems, setSourceDragItems] = useState<DragItem[]>(initialSourceItems);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [showHint, setShowHint] = useState(false);
  const [activeTab, setActiveTab] = useState(language);
  const [isRunning, setIsRunning] = useState(false);
  const [showResultDialog, setShowResultDialog] = useState(false);

  // Challenge yang sudah diselesaikan tetap bisa dikerjakan kembali.
  // XP tidak akan bertambah lagi (backend handle via isCompleted check).

  // Auto-preview Drag & Drop
  useEffect(() => {
    if (challenge.method === "DRAG_AND_DROP") {
      if (sourceDragItems.length === 0 && dragItems.length > 0) {
        const generatedCode = dragItems.map((i) => i.content).join("\n");
        setPreviewCode(generatedCode);
        setHasRunPreview(true);
      } else {
        setPreviewCode("");
        setHasRunPreview(false);
      }
    }
  }, [dragItems, sourceDragItems, challenge.method]);

  // ─── Handlers ──────────────────────────────────────────────────────────────
  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      if (challenge.method === "DRAG_AND_DROP") {
        const isCorrect = checkDragDropAnswer();
        if (isCorrect) {
          const code = dragItems.map((i) => i.content).join("\n");
          setPreviewCode(code);
          setSubmitStatus("success");
        } else {
          setSubmitStatus("error");
          setTimeout(() => setSubmitStatus("idle"), 3000);
        }
      } else {
        setPreviewCode(userCode);
      }
      setHasRunPreview(true);
      setIsRunning(false);
    }, 200);
  };

  const handleReset = () => {
    setUserCode(challenge.starterCode ?? "");
    setPreviewCode("");
    setHasRunPreview(false);
    setSourceDragItems(initialSourceItems);
    setDragItems([]);
    setSubmitStatus("idle");
    setShowHint(false);
    setIsRunning(false);
  };

  const checkDragDropAnswer = (): boolean => {
    if (!dragDropData) return false;
    const currentOrder = dragItems.map((i) => i.content);
    return JSON.stringify(currentOrder) === JSON.stringify(dragDropData.expectedOrder);
  };

  // ─── Submit (panggil API backend) ────────────────────────────────────────
  const handleSubmit = async () => {
    if (!user?.id) {
      alert("User tidak ditemukan. Silakan login ulang.");
      return;
    }
    if (!hasRunPreview && challenge.method !== "DRAG_AND_DROP") {
      handleRun();
    }

    // Siapkan answerCode berdasarkan metode
    const answerCode =
      challenge.method === "DRAG_AND_DROP"
        ? JSON.stringify(dragItems.map((i) => i.content))
        : userCode;

    setIsSubmitting(true);
    try {
      const result = await submitAnswer(user.id, {
        assignmentId,
        challengeId: challenge.id,
        method: challenge.method,
        answerCode,
        timeSpent: timerSeconds,
      });

      if (!result.success) {
        alert(result.message || "Terjadi kesalahan. Coba lagi.");
        return;
      }

      const isCorrect = result.data?.isCorrect ?? false;
      const earnedXp = result.data?.xpEarned ?? 0;
      setXpEarned(earnedXp);
      setSubmitStatus(isCorrect ? "success" : "error");
      setShowResultDialog(true);

      // Update XP di context & localStorage agar langsung terlihat tanpa re-login
      if (isCorrect && earnedXp > 0 && user) {
        updateUser({ ...user, totalXp: user.totalXp + earnedXp });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToMap = () => navigate(-1);
  const handleTryAgain = () => {
    setShowResultDialog(false);
    setSubmitStatus("idle");
  };

  // ─── Badge method ──────────────────────────────────────────────────────────
  const methodLabel: Record<string, { label: string; color: string }> = {
    CODING_MANUAL: { label: "Coding", color: "bg-blue-600" },
    FIX_THE_BUG: { label: "Fix the Bug", color: "bg-red-600" },
    DRAG_AND_DROP: { label: "Drag & Drop", color: "bg-amber-600" },
  };
  const methodInfo = methodLabel[challenge.method] ?? { label: challenge.method, color: "bg-indigo-600" };

  const isCodeBased = challenge.method === "CODING_MANUAL" || challenge.method === "FIX_THE_BUG";
  const isDragDrop = challenge.method === "DRAG_AND_DROP";

  // ─── Tutorial Steps ────────────────────────────────────────────────────────
  const tutorialSteps: TutorialStep[] = [
    {
      title: "Selamat Datang Challenger! 👋",
      description: "Sebelum mulai, yuk kenalan dulu sama antarmuka challenge ini.",
      position: "center",
    },
    {
      targetId: "tutorial-info",
      title: "Informasi Challenge",
      description: "Di sini kamu bisa melihat Judul, Deskripsi, dan Instruksi detail.",
      position: "right",
    },
    ...(challenge.hint
      ? [
          {
            targetId: "tutorial-hint",
            title: "Butuh Bantuan?",
            description: "Kalau mentok, cek Hint di sini.",
            position: "right",
          } as TutorialStep,
        ]
      : []),
    {
      targetId: "tutorial-editor",
      title: isDragDrop ? "Workspace Susun Blok" : "Code Editor",
      description: isDragDrop
        ? "Susun blok-blok kode di sini sesuai urutan yang benar."
        : "Tuliskan solusi kodinganmu di area ini.",
      position: "left",
    },
    ...(isCodeBased
      ? [
          {
            targetId: "tutorial-run",
            title: "Test Kodemu",
            description: "Klik tombol Run untuk menjalankan kode dan melihat hasilnya.",
            position: "top",
          } as TutorialStep,
          {
            targetId: "tutorial-preview",
            title: "Live Preview",
            description: "Hasil output dari kodemu akan muncul di sini.",
            position: "left",
          } as TutorialStep,
        ]
      : []),
    {
      targetId: "tutorial-submit",
      title: "Kumpulkan Jawaban",
      description: "Sudah yakin benar? Klik Submit untuk memeriksa jawabanmu!",
      position: "top",
    },
  ];

  return (
    <div className="h-screen w-full bg-slate-950 flex flex-col text-slate-200 overflow-hidden">
      {/* NAVBAR */}
      <header className="h-12 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="hover:bg-slate-800 h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Badge variant="default" className={cn("text-[10px] uppercase font-bold px-2 py-0.5", methodInfo.color)}>
              {methodInfo.label}
            </Badge>
            <Badge
              variant="outline"
              className="text-[10px] border-yellow-500/50 text-yellow-400 px-2 py-0.5"
            >
              ⚡ {challenge.xpBase} XP
            </Badge>
            <Badge
              variant="outline"
              className="text-[10px] border-slate-600 text-slate-400 px-2 py-0.5 capitalize"
            >
              {challenge.difficulty.toLowerCase()}
            </Badge>
            <Badge
              variant="outline"
              className="text-[10px] border-indigo-600/50 text-indigo-400 px-2 py-0.5 uppercase"
            >
              {language}
            </Badge>
          </div>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-2 bg-slate-800 px-4 py-1.5 rounded-full border border-slate-700">
          <Clock className="h-4 w-4 text-indigo-400" />
          <span className="font-mono text-sm font-bold text-indigo-400">{timer}</span>
          <span className="text-[10px] text-slate-500 uppercase">elapsed</span>
        </div>

        {/* Level info */}
        <div className="text-xs text-slate-400 hidden md:block">
          {alreadyCompleted && (
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" /> Sudah Diselesaikan
            </span>
          )}
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* LEFT PANEL: INSTRUCTIONS */}
        <div
          id="tutorial-info"
          className="w-full lg:w-[350px] h-[40vh] lg:h-full border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col bg-slate-900/50 shrink-0"
        >
          <div className="p-4 lg:p-5 flex-1 overflow-y-auto">
            <h1 className="text-lg lg:text-xl font-bold text-white mb-2">{challenge.title}</h1>
            <p className="text-slate-400 text-xs lg:text-sm mb-4 leading-relaxed">
              {challenge.description}
            </p>

            {/* Tugas */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-4 bg-indigo-500 rounded-full" />
                <span className="text-xs font-bold uppercase text-slate-300">Tugas</span>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3 text-xs lg:text-sm text-slate-300 border border-slate-700/50">
                {challenge.description}
              </div>
            </div>

            {/* Banner: sudah pernah diselesaikan */}
            {wasAlreadyCompleted && (
              <div className="mb-4 p-3 bg-emerald-950/40 border border-emerald-800/50 rounded-lg flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-emerald-300 font-semibold">Challenge Sudah Diselesaikan</p>
                  <p className="text-xs text-emerald-500 mt-0.5">
                    Kamu bisa mengerjakan kembali, namun XP tidak akan bertambah.
                  </p>
                </div>
              </div>
            )}

            {/* Hint */}
            {challenge.hint && (
              <div className="mb-4">
                <button
                  id="tutorial-hint"
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center gap-2 text-xs lg:text-sm text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <ChevronRight
                    className={cn("h-4 w-4 transition-transform", showHint && "rotate-90")}
                  />
                  <span>Tampilkan Petunjuk</span>
                </button>
                {showHint && (
                  <div className="mt-2 ml-6 p-3 bg-indigo-950/30 border border-indigo-900/50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-indigo-400 mt-0.5 shrink-0" />
                      <p className="text-xs text-indigo-300">{challenge.hint}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Informasi tambahan drag & drop */}
            {isDragDrop && (
              <div className="p-3 bg-amber-950/30 border border-amber-900/50 rounded-lg text-xs text-amber-300">
                💡 Seret blok-blok kode dari panel kiri ke panel kanan dengan urutan yang benar.
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="p-3 lg:p-4 border-t border-slate-800 space-y-2 bg-slate-900 lg:bg-transparent z-10">
            {(isCodeBased || isDragDrop) && (
              <div className="flex gap-2">
                <Button
                  id="tutorial-run"
                  variant="outline"
                  className="flex-1 h-9 lg:h-10 text-xs lg:text-sm border-slate-700 hover:bg-slate-800 hover:border-indigo-500/50"
                  onClick={isDragDrop ? handleReset : handleRun}
                  disabled={isRunning || submitStatus === "success"}
                >
                  {isDragDrop ? (
                    <RotateCcw className="mr-2 h-3 w-3" />
                  ) : (
                    <Play className={cn("mr-2 h-3 w-3", isRunning && "animate-pulse")} />
                  )}
                  {isDragDrop ? "Reset" : isRunning ? "Running..." : "Jalankan Kode"}
                </Button>
                {isCodeBased && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 hover:bg-slate-800"
                    onClick={handleReset}
                    title="Reset Kode"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}
            <Button
              id="tutorial-submit"
              className={cn(
                "w-full h-10 lg:h-11 font-semibold transition-all duration-300 text-xs lg:text-sm",
                submitStatus === "success"
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : submitStatus === "error"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-indigo-600 hover:bg-indigo-700"
              )}
              onClick={handleSubmit}
              disabled={submitStatus === "success" || isSubmitting}
            >
              {isSubmitting && <><Loader2 className="mr-2 h-3 w-3 animate-spin" /> Memeriksa...</>}
              {!isSubmitting && submitStatus === "idle" && <><Send className="mr-2 h-3 w-3" /> Kirim Jawaban</>}
              {!isSubmitting && submitStatus === "success" && <><CheckCircle2 className="mr-2 h-3 w-3" /> Benar! Selesai</>}
              {!isSubmitting && submitStatus === "error" && <><AlertCircle className="mr-2 h-3 w-3" /> Coba Lagi</>}
            </Button>
          </div>
        </div>

        {/* RIGHT PANEL: EDITOR + PREVIEW */}
        <div className="flex-1 flex flex-col bg-slate-950 min-h-0 overflow-hidden">
          {/* EDITOR SECTION */}
          <div
            id="tutorial-editor"
            className="flex flex-col border-b border-slate-800 min-h-0 flex-1"
          >
            {/* Editor Tabs (hanya untuk CODING_MANUAL / FIX_THE_BUG) */}
            {isCodeBased && (
              <div className="h-9 lg:h-10 bg-slate-900 border-b border-slate-800 flex items-center px-2 shrink-0">
                <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as Language)} className="h-full">
                  <TabsList className="h-full bg-transparent p-0 gap-0">
                    <TabsTrigger
                      value={language}
                      className="h-full px-3 lg:px-4 rounded-none border-b-2 border-transparent data-[state=active]:bg-slate-950 data-[state=active]:border-indigo-500 text-xs font-medium"
                    >
                      <span className="text-orange-400 mr-1.5">⧩</span>
                      {language === "html" && "index.html"}
                      {language === "css" && "style.css"}
                      {language === "javascript" && "script.js"}
                      {language === "php" && "index.php"}
                      {language === "sql" && "query.sql"}
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            )}

            {/* Editor Content */}
            <div className="flex-1 min-h-0 relative">
              {isCodeBased && (
                <MonacoCodeEditor
                  code={userCode}
                  onChange={setUserCode}
                  language={language}
                />
              )}

              {isDragDrop && (
                <DragDropEditor
                  sourceItems={sourceDragItems}
                  targetItems={dragItems}
                  onItemsChange={(source, target) => {
                    setSourceDragItems(source);
                    setDragItems(target);
                    setSubmitStatus("idle");
                  }}
                  isCorrect={submitStatus === "success"}
                />
              )}
            </div>
          </div>

          {/* LIVE PREVIEW (hanya untuk code-based) */}
          {isCodeBased && (
            <div
              id="tutorial-preview"
              className="h-[200px] lg:h-[260px] flex flex-col bg-slate-900/50 shrink-0 border-t border-slate-800"
            >
              <div className="h-8 lg:h-9 bg-slate-900 border-b border-slate-800 flex items-center px-3 lg:px-4 shrink-0">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full transition-colors",
                      hasRunPreview ? "bg-emerald-500 animate-pulse" : "bg-slate-600"
                    )}
                  />
                  <span className="text-[10px] lg:text-xs font-bold uppercase text-slate-300">
                    Live Preview
                  </span>
                </div>
              </div>
              <div className="flex-1 min-h-0">
                <PreviewPanel
                  code={previewCode}
                  isActive={hasRunPreview}
                  language={language}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RESULT DIALOG */}
      <AlertDialog open={showResultDialog} onOpenChange={setShowResultDialog}>
        <AlertDialogContent
          className={cn(
            "border-2",
            submitStatus === "success"
              ? "border-emerald-500/50 bg-slate-900"
              : "border-red-500/50 bg-slate-900"
          )}
        >
          <AlertDialogHeader className="text-center">
            <AlertDialogTitle className="flex flex-col items-center gap-4 text-2xl">
              {submitStatus === "success" ? (
                <>
                  <div className="h-20 w-20 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <PartyPopper className="h-10 w-10 text-emerald-400" />
                  </div>
                  <span className="text-emerald-400">Jawaban Anda Benar!</span>
                </>
              ) : (
                <>
                  <div className="h-20 w-20 rounded-full bg-red-500/20 flex items-center justify-center">
                    <XCircle className="h-10 w-10 text-red-400" />
                  </div>
                  <span className="text-red-400">Jawaban Salah</span>
                </>
              )}
            </AlertDialogTitle>
            <AlertDialogDescription className="flex flex-col justify-center items-center text-slate-400 mt-4 text-base text-center">
              {submitStatus === "success" ? (
                <div>
                  <p>Selamat! Kamu berhasil menyelesaikan challenge ini.</p>
                  <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 font-medium mt-6 w-fit mx-auto">
                    <span>+{xpEarned} XP</span>
                    <Zap className="h-5 w-5 text-yellow-400" />
                  </div>
                </div>
              ) : (
                <div>
                  <p>Periksa kembali jawaban kamu.</p>
                  <p className="text-sm text-slate-500 mt-2">
                    Pastikan syntax dan struktur sudah sesuai dengan yang diminta.
                  </p>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-3 flex justify-center sm:justify-center">
            {submitStatus === "success" ? (
              <AlertDialogAction
                onClick={handleBackToMap}
                className="bg-emerald-600 hover:bg-emerald-700 text-white w-auto px-8"
              >
                <MapPin className="mr-2 h-4 w-4" /> Kembali ke Map
              </AlertDialogAction>
            ) : (
              <div className="flex gap-3 justify-center">
                <AlertDialogCancel
                  onClick={handleTryAgain}
                  className="border-slate-700 hover:bg-slate-800 w-auto px-6"
                >
                  Coba Lagi
                </AlertDialogCancel>
                {challenge.hint && !showHint && (
                  <AlertDialogAction
                    onClick={() => {
                      setShowResultDialog(false);
                      setShowHint(true);
                      setSubmitStatus("idle");
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700 w-auto px-6"
                  >
                    <Lightbulb className="mr-2 h-4 w-4" /> Lihat Hint
                  </AlertDialogAction>
                )}
              </div>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* TUTORIAL OVERLAY */}
      {isTutorialActive && (
        <ChallengeTutorial
          steps={tutorialSteps}
          onComplete={() => setIsTutorialActive(false)}
          onSkip={() => setIsTutorialActive(false)}
        />
      )}
    </div>
  );
}
