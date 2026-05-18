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
  XCircle,
  MapPin,
  Zap,
  AlertTriangle,
  Loader2,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import MonacoCodeEditor from "@/components/user/MonacoCodeEditor";
import DragDropEditor from "@/components/user/DragDropEditor";
import ChallengeTutorial, {
  type TutorialStep,
} from "@/components/user/ChallengeTutorial";
import type { Challenge, DragItem } from "@/types";
import { submitAnswer, runPhpCode, getChallengeSchema, runSqlCode } from "@/services/user/ChallengeService";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface ChallengePageState {
  assignmentId: number;
  isCompleted: boolean;
  challenge: Challenge;
  levelId: number;
  nodeSlot: number;
}

interface DragDropContent {
  blocks: string[];
  expectedOrder: string[];
}

type Language = "html" | "css" | "javascript" | "php" | "sql" | "php_process" | "php_connection";

function detectLanguage(levelId: number): Language {
  const languageMap: Record<number, Language> = {
    1: "html",
    2: "css",
    3: "javascript",
    4: "php",
    5: "sql",
  };
  return languageMap[levelId] ?? "html";
}

function useTimer(isActive: boolean) {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<number | any>(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [isActive]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return { formatted: formatTime(seconds), raw: seconds };
}

// ─── Preview Panel ────────────────────────────────────────────────────────────
interface ConsoleEntry {
  type: 'log' | 'error' | 'warn';
  message: string;
}

function PreviewPanel({
  codes,
  isActive,
  primaryLanguage,
  userId,
  templateName,
  sandboxEnabled,
  levelId,
  onConsoleLog,
  runTrigger,
}: {
  codes: Record<string, string>;
  isActive: boolean;
  primaryLanguage: Language;
  userId?: number;
  templateName?: string;
  sandboxEnabled?: boolean;
  levelId?: number;
  onConsoleLog?: (entries: ConsoleEntry[]) => void;
  runTrigger?: number;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isRunning, setIsRunning] = useState(false);
  const onConsoleLogRef = useRef(onConsoleLog);
  useEffect(() => { onConsoleLogRef.current = onConsoleLog; }, [onConsoleLog]);

  // Ref untuk melacak ID eksekusi terbaru (mencegah log dari run sebelumnya masuk)
  const currentRunIdRef = useRef<string>("");

  // Dengarkan pesan postMessage dari iframe (untuk console.log JS)
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (
        event.data?.__webquestConsole &&
        event.data.runId === currentRunIdRef.current  // Hanya proses pesan dari run terbaru
      ) {
        const entry: ConsoleEntry = {
          type: event.data.type,
          message: event.data.message,
        };
        onConsoleLogRef.current?.([entry]);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  // Map levelId ke folder sandbox
  const levelFolder = levelId === 4 ? "php_level" : levelId === 5 ? "db_level" : undefined;

  // Ref untuk selalu memegang nilai codes terbaru tanpa menjadikannya dependensi useCallback
  // Ini mencegah updatePreview mendapat referensi baru saat codes berubah,
  // sehingga useEffect eksekusi hanya terpicu SEKALI dari runTrigger, bukan dua kali.
  const codesRef = useRef(codes);
  useEffect(() => { codesRef.current = codes; }, [codes]);

  const updatePreview = useCallback(async () => {
    if (!iframeRef.current) return;
    const doc = iframeRef.current.contentDocument;
    if (!doc) return;

    // Generate ID unik untuk sesi eksekusi ini. Hanya pesan postMessage dengan ID yang
    // sama yang akan diproses, sehingga log dari run sebelumnya otomatis terblokir.
    const runId = `run_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    currentRunIdRef.current = runId;

    let previewHtml = "";
    // Baca kode terbaru dari ref (bukan dari closure) agar updatePreview tetap stabil
    const codes = codesRef.current;
    
    if (primaryLanguage === "css" || primaryLanguage === "javascript") {
      const { html, css, javascript } = codes;
      // Tentukan apakah hanya JS murni (tanpa HTML boilerplate) untuk console-only mode
      const isJsOnly = primaryLanguage === "javascript";
      previewHtml = `
        <!DOCTYPE html>
        <html lang="id">
        <head>
          <meta charset="UTF-8">
          <style>
            ${css || ""}
            ${!css ? `body{background:#ffffff;color:black;font-family:system-ui}` : ""}
          </style>
        </head>
        <body>
          ${html || (!css && !javascript ? "<h1>Preview Boilerplate</h1><p>Edit index.html atau style.css untuk melihat perubahan.</p>" : "")}
          <script>
            (function() {
              const __runId = '${runId}';
              // Kirim log ke parent React via postMessage (untuk Console View tab)
              const sendConsole = (type, ...args) => {
                const message = args.map(a => {
                  try { return typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a); }
                  catch { return String(a); }
                }).join(' ');
                try { parent.postMessage({ __webquestConsole: true, runId: __runId, type, message }, '*'); } catch(e) {}
              };

              // Override semua console methods
              const _origLog = console.log;
              const _origWarn = console.warn;
              const _origError = console.error;

              console.log = (...args) => { sendConsole('log', ...args); _origLog(...args); };
              console.warn = (...args) => { sendConsole('warn', ...args); _origWarn(...args); };
              console.error = (...args) => { sendConsole('error', ...args); _origError(...args); };

              try {
                ${javascript || ""}
              } catch(e) {
                // Runtime error dikirim ke Console View (tampil merah)
                sendConsole('error', 'Uncaught Error: ' + e.message);
              }
            })();
          <\/script>
        </body>
        </html>
      `;
    } else if (primaryLanguage === "php") {
      if (!isActive) return;

      setIsRunning(true);
      try {
        const response = await runPhpCode(codes, userId, templateName, levelFolder, sandboxEnabled);
        
        if (response.success && response.data) {
          const { stdout, stderr } = response.data;
          previewHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body{background:#ffffff;color:black;padding:20px;font-family:system-ui}</style></head><body>
            ${stdout || "<!-- No Output -->"}
            ${stderr ? `<pre style="background:#fef2f2;color:#b91c1c;padding:12px;border:1px solid #fecaca;border-radius:6px;margin-top:20px;font-size:12px">${stderr}</pre>` : ""}
          </body></html>`;
        } else {
          previewHtml = `<!DOCTYPE html><html><body style="background:#fef2f2;color:#b91c1c;padding:20px;font-family:monospace">
            <h3>Server Error</h3>
            <p>${response.message || "Gagal mendapatkan respon dari server."}</p>
          </body></html>`;
        }
      } catch (err: any) {
        previewHtml = `<!DOCTYPE html><html><body style="background:#fef2f2;color:#b91c1c;padding:20px;font-family:monospace">
          <h3>Execution Error</h3>
          <pre>${err.message}</pre>
        </body></html>`;
      } finally {
        setIsRunning(false);
      }
    } else if (primaryLanguage === "sql") {
      if (!isActive) {
        const code = codes.sql || "";
        previewHtml = `<!DOCTYPE html><html><body style="background:#ffffff;color:black;padding:24px;font-family:monospace">
          <p style="color:#64748b;margin:0 0 12px 0">SQL Query (Belum Dijalankan):</p>
          <pre style="background:#0f172a;padding:16px;border-radius:8px;color:#38bdf8;margin:0">${code || "-- Ketik query SQL Anda..."}</pre>
          </body></html>`;
      } else {
        setIsRunning(true);
        try {
          const response = await runSqlCode(codes.sql || "", userId || 0, templateName || "", levelFolder || "db_level");
          
          if (response.success && response.data) {
            const { type, columns, rows, message } = response.data;
            
            if (type === "select") {
              if (rows.length === 0) {
                previewHtml = `<!DOCTYPE html><html><body style="background:#ffffff;color:#64748b;padding:24px;font-family:system-ui">
                  <div style="border:1px dashed #cbd5e1;padding:24px;text-align:center;border-radius:8px">
                    <p style="font-weight:bold;margin:0;color:#334155;font-size:14px">Query berhasil dijalankan.</p>
                    <p style="font-size:12px;margin:6px 0 0 0;color:#64748b">Hasil kosong (0 baris dikembalikan).</p>
                  </div>
                </body></html>`;
              } else {
                const headersHtml = columns.map((col: string) => `<th style="background:#f8fafc;color:#475569;font-weight:700;border:1px solid #e2e8f0;padding:10px;text-align:left;font-size:12px;text-transform:uppercase">${col}</th>`).join("");
                const rowsHtml = rows.map((row: any) => {
                  const cells = columns.map((col: string) => `<td style="border:1px solid #e2e8f0;padding:10px;font-size:12px;color:#334155">${row[col] !== null ? row[col] : "<span style='color:#94a3b8;font-style:italic'>NULL</span>"}</td>`).join("");
                  return `<tr style="border-bottom:1px solid #e2e8f0;background:#ffffff">${cells}</tr>`;
                }).join("");
                
                previewHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
                  body{background:#ffffff;color:#0f172a;padding:16px;font-family:system-ui;margin:0}
                  table{border-collapse:collapse;width:100%;border-radius:8px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 1px 3px rgba(0,0,0,0.05)}
                  th,td{border:1px solid #e2e8f0;padding:10px;text-align:left}
                  tr:nth-child(even){background-color:#f8fafc}
                </style></head><body>
                  <h4 style="margin:0 0 12px 0;color:#0f172a;font-size:13px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase">Hasil SELECT (${rows.length} Baris):</h4>
                  <table>
                    <thead><tr>${headersHtml}</tr></thead>
                    <tbody>${rowsHtml}</tbody>
                  </table>
                </body></html>`;
              }
            } else {
              previewHtml = `<!DOCTYPE html><html><body style="background:#ffffff;color:#0f172a;padding:24px;font-family:system-ui">
                <div style="border:1px solid #bbf7d0;background:#f0fdf4;padding:16px;border-radius:8px;color:#166534">
                  <h4 style="margin:0 0 4px 0;font-size:14px;font-weight:bold">Query Berhasil Dijalankan</h4>
                  <p style="margin:0;font-size:13px">${message}</p>
                </div>
              </body></html>`;
            }
          } else {
            previewHtml = `<!DOCTYPE html><html><body style="background:#ffffff;color:#b91c1c;padding:20px;font-family:monospace">
              <div style="border:1px solid #fecaca;background:#fef2f2;padding:16px;border-radius:8px">
                <h4 style="margin:0 0 8px 0;color:#991b1b;font-weight:bold">SQLite Error</h4>
                <pre style="margin:0;white-space:pre-wrap;font-size:12px;color:#b91c1c">${response.message || "Gagal mengeksekusi query SQL."}</pre>
              </div>
            </body></html>`;
          }
        } catch (err: any) {
          previewHtml = `<!DOCTYPE html><html><body style="background:#ffffff;color:#b91c1c;padding:20px;font-family:monospace">
            <div style="border:1px solid #fecaca;background:#fef2f2;padding:16px;border-radius:8px">
              <h4 style="margin:0 0 8px 0;color:#991b1b;font-weight:bold">Execution Error</h4>
              <pre style="margin:0;white-space:pre-wrap;font-size:12px;color:#b91c1c">${err.message}</pre>
            </div>
          </body></html>`;
        } finally {
          setIsRunning(false);
        }
      }
    } else {
      const code = codes.html || "";
      previewHtml = `<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8">
        <style>*{box-sizing:border-box}body{background:#ffffff;color:black;font-family:system-ui;padding:24px;margin:0}
        h1{font-size:2em;color:black}h2{font-size:1.5em;color:black}p{color:black}
        a{color:}button{background:#3b82f6;color:white;border:none;padding:10px 20px;border-radius:6px;cursor:pointer}
        input,textarea{background:#334155;border:1px solid #475569;color:white;padding:8px 12px;border-radius:6px;width:100%}
        table{border-collapse:collapse;width:100%}th,td{border:1px solid #475569;padding:12px;text-align:left}th{background:#334155}
        </style></head><body>${code}</body></html>`;
    }

    doc.open();
    doc.write(previewHtml);
    doc.close();
  // `codes` DIHAPUS dari deps karena dibaca melalui codesRef.current di dalam fungsi.
  // Ini memastikan referensi updatePreview TIDAK berubah saat codes berubah.
  }, [primaryLanguage, isActive, userId, templateName, sandboxEnabled, levelFolder]);

  useEffect(() => {
    // Hanya bergantung pada runTrigger: terpicu tepat SEKALI per klik 'Jalankan Kode'.
    updatePreview();
  }, [runTrigger, updatePreview]);

  if (!isActive) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500 text-sm bg-slate-900">
        <div className="text-center">
          <Play className="h-10 w-10 mx-auto mb-3 opacity-30 text-indigo-400" />
          <p className="text-slate-400">
            Klik <span className="text-indigo-400 font-semibold">"Jalankan Kode"</span>
          </p>
          <p className="text-slate-500 text-xs mt-1">untuk melihat hasil query</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {isRunning && (
        <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-[2px] flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-7 w-7 text-indigo-500 animate-spin" />
            <p className="text-[11px] text-indigo-300 font-bold uppercase tracking-wider">Mengeksekusi Query...</p>
          </div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        title="Live Preview"
        className="w-full h-full bg-white border-0"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
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
      levelId={levelId}
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
  levelId,
}: {
  challenge: Challenge;
  assignmentId: number;
  alreadyCompleted: boolean;
  language: Language;
  navigate: ReturnType<typeof useNavigate>;
  levelId: number;
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
  const [userCode, setUserCode] = useState<Record<string, string>>(() => {
    const initial = { 
      html: "", 
      css: "", 
      javascript: "", 
      php: "", 
      php_process: "", 
      php_connection: "", 
      sql: "" 
    };
    try {
      if (challenge.starterCode?.trim().startsWith("{")) {
        return { ...initial, ...JSON.parse(challenge.starterCode) };
      }
    } catch {}
    return { ...initial, [language]: challenge.starterCode ?? "" };
  });

  const [previewCodes, setPreviewCodes] = useState<Record<string, string>>(userCode);
  const [hasRunPreview, setHasRunPreview] = useState(false);
  const [dragItems, setDragItems] = useState<DragItem[]>([]);
  const [sourceDragItems, setSourceDragItems] = useState<DragItem[]>(initialSourceItems);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [showHint, setShowHint] = useState(false);
  const [activeTab, setActiveTab] = useState(language);
  const [activePreviewTab, setActivePreviewTab] = useState(language === "javascript" ? "console" : "preview");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [consoleEntries, setConsoleEntries] = useState<ConsoleEntry[]>([]);
  const [runTrigger, setRunTrigger] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showResultDialog, setShowResultDialog] = useState(false);

  // XP tidak akan bertambah lagi (backend handle via isCompleted check).
  
  // ─── Inisialisasi Sandbox ──────────────────────────────────────────────────
  useEffect(() => {
    const initSandbox = async () => {
      const content = challenge.content as any || {};
      const sandboxTemplate = content.sandboxTemplate as string | undefined;
      const sandboxEnabled = content.sandboxEnabled as boolean | undefined;
      const levelFolder = levelId === 4 ? "php_level" : levelId === 5 ? "db_level" : null;

      if (levelFolder && sandboxTemplate && sandboxEnabled) {
        console.log(`[Sandbox] Inisialisasi template "${sandboxTemplate}" untuk soal ${challenge.id}...`);
        await getChallengeSchema(challenge.id, levelFolder);
      }
    };
    initSandbox();
  }, [challenge.id, challenge.content, levelId]);

  // ─── Validasi Kode (Client-side) ──────────────────────────────────────────
  const runValidation = useCallback((code: string) => {
    const errors: string[] = [];
    
    // Pastikan testCases ada dan berupa array
    if (!challenge.testCases) return [];
    
    let tests: any[] = [];
    try {
      tests = typeof challenge.testCases === 'string' 
        ? JSON.parse(challenge.testCases) 
        : challenge.testCases;
    } catch {
      return [];
    }

    if (!Array.isArray(tests)) return [];

    tests.forEach((test: any) => {
      // Struktur testCase: { description: string, requirement: string, regex?: string }
      const { description, requirement, regex } = test;
      
      let isPassing = false;
      if (regex) {
        try {
          const re = new RegExp(regex, 'i');
          isPassing = re.test(code);
        } catch {
          isPassing = code.toLowerCase().includes(requirement.toLowerCase());
        }
      } else if (requirement) {
        isPassing = code.toLowerCase().includes(requirement.toLowerCase());
      }

      if (!isPassing) {
        errors.push(description || 'Periksa tag dan isian yang digunakan!');
      }
    });

    return errors;
  }, [challenge.testCases]);

  // Auto-preview Drag & Drop
  useEffect(() => {
    if (challenge.method === "DRAG_AND_DROP") {
      if (sourceDragItems.length === 0 && dragItems.length > 0) {
        const generatedCode = dragItems.map((i) => i.content).join("\n");
        setPreviewCodes((prev) => ({ ...prev, [language]: generatedCode }));
        setHasRunPreview(true);
      } else {
        setPreviewCodes((prev) => ({ ...prev, [language]: "" }));
        setHasRunPreview(false);
        setValidationErrors([]);
      }
    }
  }, [dragItems, sourceDragItems, challenge.method, language]);

  // ─── Handlers ──────────────────────────────────────────────────────────────
  const handleRun = () => {
    setIsRunning(true);
    setSubmitStatus("idle");
    
    setTimeout(() => {
      // Bersihkan console entries dan naikkan trigger eksekusi bersamaan di dalam timeout
      // agar semua state di-batch oleh React dalam satu re-render tunggal (mencegah iframe reload berulang kali).
      setConsoleEntries([]);
      setRunTrigger(prev => prev + 1);
      
      let codesToPreview = { ...userCode };
      if (challenge.method === "DRAG_AND_DROP") {
        const generated = dragItems.map((i) => i.content).join("\n");
        codesToPreview = { ...userCode, [language]: generated };
      }
      
      setPreviewCodes(codesToPreview);
      setHasRunPreview(true);
      
      // Setelah run: arahkan ke Console View jika JavaScript, Live Preview untuk lainnya
      setValidationErrors([]);
      setActivePreviewTab(language === "javascript" ? "console" : "preview");
      
      if (challenge.method === "DRAG_AND_DROP") {
        const isCorrect = checkDragDropAnswer();
        if (isCorrect) {
          setSubmitStatus("success");
        } else {
          setSubmitStatus("error");
          setTimeout(() => setSubmitStatus("idle"), 3000);
        }
      }
      
      setIsRunning(false);
    }, 400);
  };

  const handleReset = () => {
    const initial = { 
      html: "", 
      css: "", 
      javascript: "", 
      php: "", 
      php_process: "", 
      php_connection: "", 
      sql: "" 
    };
    let resetVal = initial;
    try {
      if (challenge.starterCode?.trim().startsWith("{")) {
        resetVal = { ...initial, ...JSON.parse(challenge.starterCode) };
      } else {
        resetVal = { ...initial, [language]: challenge.starterCode ?? "" };
      }
    } catch {
      resetVal = { ...initial, [language]: challenge.starterCode ?? "" };
    }

    setUserCode(resetVal);
    setPreviewCodes(resetVal);
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
    // Untuk multi-tab: hanya sertakan key yang relevan dengan bahasa level
    // supaya format JSON cocok dengan kunci jawaban di database.
    const getRelevantKeys = (): string[] => {
      if (language === "css") return ["html", "css"];
      if (language === "javascript") return ["html", "css", "javascript"];
      if (language === "php") return ["php", "php_process", "php_connection"];
      return [language]; // html, sql → single file
    };

    const buildAnswerCode = (): string => {
      if (challenge.method === "DRAG_AND_DROP") {
        return JSON.stringify(dragItems.map((i) => i.content));
      }
      const keys = getRelevantKeys();
      if (keys.length === 1) {
        // Single file: kirim sebagai string biasa (bukan JSON)
        return userCode[keys[0]] ?? "";
      }
      // Multi file: kirim sebagai JSON object hanya dengan key yang relevan
      const filtered: Record<string, string> = {};
      keys.forEach((k) => { filtered[k] = userCode[k] ?? ""; });
      return JSON.stringify(filtered);
    };

    const answerCode = buildAnswerCode();

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

      if (!isCorrect) {
        const errors = runValidation(challenge.method === "DRAG_AND_DROP" ? 
          JSON.parse(answerCode).join("\n") : answerCode
        );
        setValidationErrors(errors);
        if (errors.length > 0) {
          setActivePreviewTab("errors");
        }
      } else {
        setValidationErrors([]);
        setActivePreviewTab("preview");

        // Tampilkan toast untuk setiap badge baru yang didapat
        const newBadges = result.data?.newBadges ?? [];
        if (newBadges.length > 0) {
          // Delay sedikit agar tidak tabrakan dengan dialog hasil
          setTimeout(() => {
            newBadges.forEach((badge, index) => {
              setTimeout(() => {
                toast.success(`🏆 Badge Baru: ${badge.name}`, {
                  description: badge.description || "Pencapaian baru berhasil diraih!",
                  duration: 6000,
                });
              }, index * 800);
            });
          }, 500);
        }

        // Tampilkan toast jika level baru berhasil dibuka
        // Muncul setelah semua toast badge selesai (delay dihitung dari jumlah badge)
        const unlockedLevelName = result.data?.unlockedLevelName;
        if (unlockedLevelName) {
          const badgeDelay = 500 + newBadges.length * 800 + 600;
          setTimeout(() => {
            toast.success(`🎉 Level Baru Terbuka!`, {
              description: `Level "${unlockedLevelName}" sekarang dapat diakses di peta.`,
              duration: 7000,
            });
          }, badgeDelay);
        }
      }

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
            title: "Live Preview & Errors",
            description: "Lihat hasil kodinganmu atau cek 'Error Log' jika ada yang kurang.",
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
      <header className="h-auto md:h-12 py-2 md:py-0 border-b border-slate-800 bg-slate-900 flex flex-wrap items-center justify-between px-3 md:px-4 shrink-0 gap-2">
        <div className="flex items-center gap-2 md:gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="hover:bg-slate-800 h-7 w-7 md:h-8 md:w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
            <Badge variant="default" className={cn("text-[9px] md:text-[11px] uppercase font-bold px-1.5 py-0.5 md:px-2 md:py-1", methodInfo.color)}>
              {methodInfo.label}
            </Badge>
            <Badge
              variant="outline"
              className="hidden sm:inline-flex text-[10px] md:text-[11px] border-yellow-500/50 text-yellow-400 px-2 py-0.5 md:px-3 md:py-1"
            >
              <Zap className="h-3 w-3 mr-1" />
              {challenge.xpBase} XP
            </Badge>
            <Badge
              variant="outline"
              className="hidden sm:inline-flex text-[10px] md:text-[11px] border-slate-600 text-slate-400 px-2 py-0.5 md:px-3 md:py-1 capitalize"
            >
              {challenge.difficulty.toLowerCase()}
            </Badge>
            <Badge
              variant="outline"
              className="text-[9px] md:text-[11px] border-indigo-600/50 text-indigo-400 px-1.5 py-0.5 md:px-3 md:py-1 uppercase"
            >
              {language}
            </Badge>
          </div>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-1.5 md:gap-2 bg-slate-800 px-3 md:px-4 py-1.5 rounded-full border border-slate-700 ml-auto md:ml-0">
          <Clock className="h-3.5 w-3.5 md:h-4 md:w-4 text-indigo-400" />
          <span className="font-mono text-xs md:text-sm font-bold text-indigo-400">{timer}</span>
        </div>

        {/* Level info */}
        <div className="text-xs text-slate-400 hidden lg:block">
          {alreadyCompleted && (
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" /> Sudah Diselesaikan
            </span>
          )}
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* LEFT PANEL: INSTRUCTIONS */}
        <div
          id="tutorial-info"
          className="w-full md:w-[350px] lg:w-[400px] h-[35vh] min-h-[250px] md:h-full md:min-h-0 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col bg-slate-900/50 shrink-0"
        >
          <div className="p-4 lg:p-5 flex-1 overflow-y-auto">
            <h1 className="text-lg lg:text-xl font-bold text-white mb-2">{challenge.title}</h1>
            <p className="text-slate-400 text-xs lg:text-sm mb-4 leading-relaxed">
              Perhatikan instruksi di bawah untuk mengerjakan challenge ini!
            </p>

            {/* Tugas */}
            <div className="mb-4 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
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
              <div className="h-9 lg:h-10 bg-slate-900 border-b border-slate-800 flex items-center shrink-0">
                <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as Language)} className="h-full">
                  <TabsList className="h-full bg-transparent p-0 gap-0">
                    {/* Primary Tab */}
                    {[
                      { id: "html", label: "index.html", color: "text-orange-400" },
                      { id: "css", label: "styles.css", color: "text-blue-400" },
                      { id: "javascript", label: "script.js", color: "text-yellow-400" },
                      { id: "php", label: "index.php", color: "text-purple-400" },
                      { id: "php_process", label: "process.php", color: "text-purple-400" },
                      { id: "php_connection", label: "connection.php", color: "text-purple-400" },
                      { id: "sql", label: "query.sql", color: "text-cyan-400" },
                    ].filter(t => {
                      if (language === "css") return t.id === "html" || t.id === "css";
                      if (language === "javascript") return t.id === "html" || t.id === "css" || t.id === "javascript";
                      if (language === "php") return t.id === "php" || t.id === "php_process" || t.id === "php_connection";
                      return t.id === language;
                    }).map((t) => (
                      <TabsTrigger
                        key={t.id}
                        value={t.id}
                        className="h-full px-3 lg:px-4 rounded-none border-b-2 border-transparent data-[state=active]:bg-slate-950 data-[state=active]:border-indigo-500 text-xs font-medium"
                      >
                        <span className={cn("mr-1.5", t.color)}>⧩</span>
                        {t.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            )}

            {/* Editor Content */}
            <div className="flex-1 min-h-0 relative">
              {isCodeBased && (
                <MonacoCodeEditor
                  code={userCode[activeTab] || ""}
                  onChange={(val) => setUserCode(prev => ({ ...prev, [activeTab]: val }))}
                  language={activeTab.startsWith("php") ? "php" : activeTab as any}
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

          {/* LIVE PREVIEW & CONSOLE VIEW (hanya untuk code-based) */}
          {isCodeBased && (
            <div
              id="tutorial-preview"
              className="h-[220px] lg:h-[280px] flex flex-col bg-slate-900 shrink-0 border-t border-slate-800"
            >
              <div className="h-9 lg:h-10 bg-slate-900 border-b border-slate-800 flex items-center justify-between pr-4 shrink-0">
                <Tabs value={activePreviewTab} onValueChange={setActivePreviewTab} className="h-full">
                  <TabsList className="h-full bg-transparent p-0 gap-0">
                    {/* Live Preview — sembunyikan untuk JS-only (tidak relevan jika tidak ada HTML) */}
                      <TabsTrigger
                        value="preview"
                        className="h-full px-3 lg:px-4 rounded-none border-b-2 border-transparent data-[state=active]:bg-slate-950 data-[state=active]:border-indigo-500 text-[10px] lg:text-xs font-bold transition-all"
                      >
                        Live Preview
                      </TabsTrigger>
                    {/* Console View — hanya tampil untuk level JavaScript */}
                      <TabsTrigger
                        value="console"
                        className="h-full px-3 lg:px-4 rounded-none border-b-2 border-transparent data-[state=active]:bg-slate-950 data-[state=active]:border-cyan-500 text-[10px] lg:text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <span className="text-cyan-500">›_</span> Console View
                        {consoleEntries.some(e => e.type === 'error') && (
                          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[9px] text-white">
                            !
                          </span>
                        )}
                      </TabsTrigger>
                    <TabsTrigger
                      value="errors"
                      className="h-full px-3 lg:px-4 rounded-none border-b-2 border-transparent data-[state=active]:bg-slate-950 data-[state=active]:border-red-500 text-[10px] lg:text-xs font-bold transition-all flex items-center gap-2"
                    >
                      Error Log
                      {validationErrors.length > 0 && (
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] text-white animate-pulse">
                          {validationErrors.length}
                        </span>
                      )}
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full transition-colors",
                      hasRunPreview ? "bg-emerald-500 animate-pulse" : "bg-slate-600"
                    )}
                  />
                  <span className="text-[10px] lg:text-xs font-bold uppercase text-slate-500 hidden sm:inline">
                    {hasRunPreview ? "Active" : "Idle"}
                  </span>
                </div>
              </div>
              
              <div className="flex-1 min-h-0 bg-slate-950/50 overflow-auto relative">
                {/* Live Preview Tab (Tetap di-mount secara permanen agar javascript iframe berjalan di background & postMessage terkirim secara real-time) */}
                <div className={cn("w-full h-full", activePreviewTab !== "preview" && "hidden")}>
                  <PreviewPanel
                    codes={previewCodes}
                    isActive={hasRunPreview}
                    primaryLanguage={language}
                    userId={user?.id}
                    templateName={(challenge.content as any)?.sandboxTemplate}
                    sandboxEnabled={(challenge.content as any)?.sandboxEnabled}
                    levelId={levelId}
                    onConsoleLog={(entries) => setConsoleEntries(prev => [...prev, ...entries])}
                    runTrigger={runTrigger}
                  />
                </div>

                {/* Console View Tab — khusus JavaScript */}
                {activePreviewTab === "console" && (
                  <div className="h-full bg-slate-950 font-mono text-xs overflow-auto">
                    {/* Header konsol */}
                    <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 sticky top-0">
                      <span className="text-cyan-500 font-bold text-[10px] uppercase tracking-widest">JavaScript Console</span>
                      {consoleEntries.length > 0 && (
                        <button
                          onClick={() => setConsoleEntries([])}
                          className="text-[10px] text-slate-500 hover:text-slate-300 transition-colors"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    {/* Isi konsol */}
                    {consoleEntries.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-[calc(100%-32px)] text-slate-600">
                        <span className="text-2xl mb-2">›_</span>
                        <p className="text-[11px]">Jalankan kode untuk melihat output console.log</p>
                      </div>
                    ) : (
                      <div className="p-3 space-y-0.5">
                        {consoleEntries.map((entry, i) => (
                          <div
                            key={i}
                            className={cn(
                              "flex items-start gap-2 px-3 py-1.5 rounded border-l-2 text-[11px] leading-relaxed",
                              entry.type === 'error'
                                ? "border-red-500 bg-red-950/30 text-red-300"
                                : entry.type === 'warn'
                                  ? "border-yellow-500 bg-yellow-950/20 text-yellow-300"
                                  : "border-cyan-800 bg-transparent text-cyan-100"
                            )}
                          >
                            <span className={cn(
                              "shrink-0 font-bold text-[9px] mt-0.5 uppercase",
                              entry.type === 'error' ? "text-red-500" : entry.type === 'warn' ? "text-yellow-500" : "text-cyan-600"
                            )}>
                              {entry.type === 'error' ? '✖' : entry.type === 'warn' ? '⚠' : '›'}
                            </span>
                            <pre className="whitespace-pre-wrap break-words flex-1">{entry.message}</pre>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Error Log Tab */}
                {activePreviewTab === "errors" && (
                  <div className="p-4 lg:p-6 space-y-4">
                    {validationErrors.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-8 text-slate-500">
                        <CheckCircle2 className="h-10 w-10 mb-2 text-emerald-500/20" />
                        <p className="text-sm">Tidak ada kesalahan yang terdeteksi.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-red-500/80 mb-1">
                          <AlertTriangle className="h-3.5 w-3.5" />
                          <span className="text-[10px] font-bold uppercase tracking-wider">Kesalahan Terdeteksi:</span>
                        </div>
                        {validationErrors.map((err, i) => (
                          <div 
                            key={i} 
                            className="flex items-start gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/10 text-red-200/90 animate-in fade-in slide-in-from-left-2 duration-300" 
                            style={{ animationDelay: `${i * 100}ms` }}
                          >
                            <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                            <p className="text-xs lg:text-sm leading-relaxed">{err}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RESULT DIALOG */}
      <AlertDialog open={showResultDialog} onOpenChange={setShowResultDialog} >
        <AlertDialogContent
          className={cn(
            "border-2 overflow-hidden",
            submitStatus === "success"
              ? "border-emerald-500/50 bg-slate-900 shadow-[0_0_40px_rgba(16,185,129,0.2)]"
              : "border-rose-500/50 bg-slate-900 shadow-[0_0_40px_rgba(244,63,94,0.2)]"
          )}
        >
          {/* Background decoration */}
          <div className={cn(
            "absolute -top-24 -left-24 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none",
            submitStatus === "success" ? "bg-emerald-500" : "bg-rose-500"
          )} />
          <div className={cn(
            "absolute -bottom-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none",
            submitStatus === "success" ? "bg-emerald-500" : "bg-rose-500"
          )} />

          <AlertDialogHeader className="text-center relative z-10">
            <AlertDialogTitle className="flex flex-col items-center gap-4 text-2xl">
              {submitStatus === "success" ? (
                <>
                  <div className="relative">
                    <div className="absolute inset-0 bg-emerald-500 blur-xl opacity-30 animate-pulse rounded-full" />
                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center border-4 border-emerald-950  shadow-xl relative z-10 ">
                      <Check className="h-16 w-16 text-white" />
                    </div>
                  </div>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 font-black text-3xl tracking-tight">
                    Luar Biasa!
                  </span>
                </>
              ) : (
                <>
                  <div className="relative">
                    <div className="absolute inset-0 bg-rose-500 blur-xl opacity-30 animate-pulse rounded-full" />
                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center border-4 border-rose-950 shadow-xl relative z-10">
                      <XCircle className="h-12 w-12 text-white animate-pulse" />
                    </div>
                  </div>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-400 font-black text-3xl tracking-tight">
                    Hampir Saja!
                  </span>
                </>
              )}
            </AlertDialogTitle>
            <AlertDialogDescription className="flex flex-col justify-center items-center text-slate-300 mt-4 text-base text-center">
              {submitStatus === "success" ? (
                <div className="space-y-4">
                  <p className="text-lg">Kamu berhasil menyelesaikan tantangan ini dengan sempurna.</p>
                  <div className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 border border-emerald-500/30 overflow-hidden cursor-default transition-all hover:border-emerald-500/60">
                    <div className="absolute inset-0 bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors" />
                    <span className="relative z-10 font-bold text-emerald-400 text-lg">+{xpEarned} XP</span>
                    <Zap className="h-6 w-6 text-yellow-400 relative z-10" fill="currentColor" />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-lg">Masih ada beberapa kesalahan pada kode kamu.</p>
                  <div className="bg-rose-950/40 border border-rose-900/50 rounded-xl p-3 text-sm text-rose-200/80">
                    Periksa kembali syntax, penulisan tag, atau struktur kode agar sesuai dengan instruksi yang diminta!
                  </div>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6 flex justify-center sm:justify-center w-full relative z-10">
            {submitStatus === "success" ? (
              <AlertDialogAction
                onClick={handleBackToMap}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white w-full sm:w-auto px-10 py-6 text-lg rounded-xl"
              >
                <MapPin className="h-6 w-6" /> Kembali ke Map
              </AlertDialogAction>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 justify-center w-full">
                <AlertDialogCancel
                  onClick={handleTryAgain}
                  className="bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200 w-full sm:w-auto px-8 py-6 rounded-xl transition-all"
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
                    className="bg-indigo-600 hover:bg-indigo-700 text-white w-full sm:w-auto px-8 py-6 rounded-xl shadow-[0_0_15px_rgba(79,70,229,0.3)] transition-all"
                  >
                    <Lightbulb className="h-5 w-5" /> Lihat Hint
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
