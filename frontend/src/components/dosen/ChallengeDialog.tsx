import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useEffect, useState } from 'react';
import { Puzzle } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { cn } from '@/lib/utils';

interface ChallengeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  challenge?: any;
  onSubmit: (data: any) => void;
  levels: { id: number; name: string }[];
}

// ─── Tipe bahasa yang didukung ────────────────────────────────────────────────
type EditorLanguage = 'html' | 'css' | 'javascript' | 'php' | 'sql';

// ─── Mapping levelId → bahasa (harus sama dengan ChallengePage) ──────────────
const LANGUAGE_MAP: Record<number, EditorLanguage> = {
  1: 'html',
  2: 'css',
  3: 'javascript',
  4: 'php',
  5: 'sql',
};

// ─── Konfigurasi tab berdasarkan bahasa ──────────────────────────────────────
type TabConfig = { id: string; label: string; monacoLang: string; color: string };

function getTabsForLanguage(lang: EditorLanguage): TabConfig[] {
  switch (lang) {
    case 'css':
      return [
        { id: 'html', label: 'index.html', monacoLang: 'html', color: 'text-orange-400' },
        { id: 'css', label: 'styles.css', monacoLang: 'css', color: 'text-blue-400' },
      ];
    case 'javascript':
      return [
        { id: 'html', label: 'index.html', monacoLang: 'html', color: 'text-orange-400' },
        { id: 'css', label: 'styles.css', monacoLang: 'css', color: 'text-blue-400' },
        { id: 'javascript', label: 'script.js', monacoLang: 'javascript', color: 'text-yellow-400' },
      ];
    case 'php':
      return [
        { id: 'php', label: 'index.php', monacoLang: 'php', color: 'text-purple-400' },
        { id: 'php_process', label: 'process.php', monacoLang: 'php', color: 'text-purple-400' },
        { id: 'php_connection', label: 'connection.php', monacoLang: 'php', color: 'text-purple-400' },
      ];
    case 'sql':
      return [{ id: 'sql', label: 'query.sql', monacoLang: 'sql', color: 'text-cyan-400' }];
    default: // html
      return [{ id: 'html', label: 'index.html', monacoLang: 'html', color: 'text-orange-400' }];
  }
}

// ─── Ambil semua key yang dibutuhkan untuk satu bahasa ───────────────────────
function getInitialMultiCode(lang: EditorLanguage): Record<string, string> {
  const keys = getTabsForLanguage(lang).map(t => t.id);
  return Object.fromEntries(keys.map(k => [k, '']));
}

// ─── Parse nilai starterCode / correctAnswer dari DB ke bentuk Record ─────────
function parseCodeValue(raw: string, lang: EditorLanguage): Record<string, string> {
  const defaultVal = getInitialMultiCode(lang);
  if (!raw) return defaultVal;
  try {
    if (raw.trim().startsWith('{')) {
      const parsed = JSON.parse(raw);
      return { ...defaultVal, ...parsed };
    }
  } catch {}
  // String biasa: masukkan ke primary key
  const primaryKey = getTabsForLanguage(lang)[0].id;
  return { ...defaultVal, [primaryKey]: raw };
}

// ─── Serialize nilai Record ke string untuk disimpan ke form/payload ──────────
function serializeCodeValue(codes: Record<string, string>, lang: EditorLanguage): string {
  const tabs = getTabsForLanguage(lang);
  if (tabs.length === 1) {
    // Single tab: simpan sebagai string biasa
    return codes[tabs[0].id] || '';
  }
  // Multi tab: simpan sebagai JSON
  return JSON.stringify(codes);
}

// ─── Komponen Editor Multi-Tab ────────────────────────────────────────────────
function MultiTabEditor({
  label,
  required,
  note,
  language,
  codes,
  onChange,
}: {
  label: string;
  required?: boolean;
  note?: string;
  language: EditorLanguage;
  codes: Record<string, string>;
  onChange: (codes: Record<string, string>) => void;
}) {
  const tabs = getTabsForLanguage(language);
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  // Reset tab aktif jika language berubah
  useEffect(() => {
    setActiveTab(tabs[0].id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const activeTabConfig = tabs.find(t => t.id === activeTab) ?? tabs[0];

  return (
    <div className="space-y-2">
      <Label>
        {label}{' '}
        {required && <span className="text-red-500">*</span>}
        {note && <span className="text-muted-foreground text-xs ml-1">{note}</span>}
      </Label>

      <div className="border rounded-md overflow-hidden">
        {/* Tab header */}
        {tabs.length > 1 && (
          <div className="flex bg-[#1e1e1e] border-b border-[#3c3c3c]">
            {tabs.map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'px-4 py-1.5 text-xs font-medium border-b-2 transition-all',
                  activeTab === tab.id
                    ? 'border-indigo-500 bg-[#252526] text-white'
                    : 'border-transparent text-[#858585] hover:text-[#cccccc]'
                )}
              >
                <span className={cn('mr-1', tab.color)}>⧩</span>
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Monaco editor */}
        <div className="h-[180px]">
          <Editor
            height="100%"
            language={activeTabConfig.monacoLang}
            theme="vs-dark"
            value={codes[activeTab] ?? ''}
            onChange={(val) => onChange({ ...codes, [activeTab]: val ?? '' })}
            options={{ minimap: { enabled: false }, fontSize: 13 }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Default Form ─────────────────────────────────────────────────────────────
const DEFAULT_FORM = {
  title: '',
  levelId: '',
  description: '',
  difficulty: 'EASY',
  method: 'CODING_MANUAL',
  idealTime: 60,
  xpBase: 10,
  hint: '',
  isActive: true,
  // CODING_MANUAL fields (disimpan sebagai Record)
  starterCodes: {} as Record<string, string>,
  correctAnswerCodes: {} as Record<string, string>,
  // FIX_THE_BUG
  buggyCode: '',
  // DRAG_AND_DROP
  orderedLines: '',
};

export function ChallengeDialog({ open, onOpenChange, challenge, onSubmit, levels }: ChallengeDialogProps) {
  const [formData, setFormData] = useState({ ...DEFAULT_FORM });

  const isEditMode = !!challenge;

  // ─── Deteksi bahasa dari levelId ─────────────────────────────────────────
  const detectedLang: EditorLanguage = LANGUAGE_MAP[Number(formData.levelId)] ?? 'html';

  // ─── Isi form saat edit / reset saat create ───────────────────────────────
  useEffect(() => {
    if (challenge) {
      const content = challenge.content as any ?? {};
      const lang: EditorLanguage = LANGUAGE_MAP[Number(challenge.levelId)] ?? 'html';

      const rawStarter = content.starterCode ?? challenge.starterCode ?? '';
      const rawAnswer = content.correctAnswer ?? '';
      const rawBuggy = content.buggyCode ?? challenge.starterCode ?? '';

      setFormData({
        title: challenge.title ?? '',
        levelId: String(challenge.levelId ?? ''),
        description: challenge.description ?? '',
        difficulty: challenge.difficulty ?? 'EASY',
        method: challenge.method ?? 'CODING_MANUAL',
        idealTime: challenge.idealTime ?? 60,
        xpBase: challenge.xpBase ?? 10,
        hint: challenge.hint ?? '',
        isActive: challenge.isActive ?? true,
        starterCodes: parseCodeValue(rawStarter, lang),
        correctAnswerCodes: parseCodeValue(rawAnswer, lang),
        buggyCode: rawBuggy,
        orderedLines: (content.expectedOrder ?? []).join('\n'),
      });
    } else {
      setFormData({ ...DEFAULT_FORM, starterCodes: {}, correctAnswerCodes: {} });
    }
  }, [challenge, open]);

  // ─── Reset multi-code state saat level berubah ───────────────────────────
  useEffect(() => {
    const lang: EditorLanguage = LANGUAGE_MAP[Number(formData.levelId)] ?? 'html';
    setFormData(prev => ({
      ...prev,
      starterCodes: getInitialMultiCode(lang),
      correctAnswerCodes: getInitialMultiCode(lang),
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.levelId]);

  const set = (field: string, val: any) => setFormData(prev => ({ ...prev, [field]: val }));

  // ─── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: any = {
      levelId: formData.levelId,
      title: formData.title,
      description: formData.description,
      difficulty: formData.difficulty,
      method: formData.method,
      idealTime: Number(formData.idealTime),
      xpBase: Number(formData.xpBase),
      hint: formData.hint || null,
      isActive: formData.isActive,
    };

    if (formData.method === 'CODING_MANUAL') {
      payload.starterCode = serializeCodeValue(formData.starterCodes, detectedLang) || null;
      payload.correctAnswer = serializeCodeValue(formData.correctAnswerCodes, detectedLang);
    } else if (formData.method === 'FIX_THE_BUG') {
      payload.buggyCode = formData.buggyCode;
      payload.correctAnswer = serializeCodeValue(formData.correctAnswerCodes, detectedLang);
    } else if (formData.method === 'DRAG_AND_DROP') {
      const lines = formData.orderedLines.split('\n').map(l => l.trim()).filter(Boolean);
      payload.expectedOrder = lines;
      payload.blocks = [...lines].sort(() => Math.random() - 0.5);
    }

    onSubmit(payload);
  };

  // ─── Render field per method ──────────────────────────────────────────────
  const renderMethodFields = () => {
    switch (formData.method) {
      case 'CODING_MANUAL':
        return (
          <>
            <MultiTabEditor
              label="Starter Code"
              note="(kode awal yang dilihat mahasiswa)"
              language={detectedLang}
              codes={formData.starterCodes}
              onChange={(codes) => set('starterCodes', codes)}
            />
            <MultiTabEditor
              label="Kunci Jawaban"
              required
              language={detectedLang}
              codes={formData.correctAnswerCodes}
              onChange={(codes) => set('correctAnswerCodes', codes)}
            />
          </>
        );

      case 'FIX_THE_BUG':
        return (
          <>
            <div className="space-y-2">
              <Label>Kode yang Mengandung Bug <span className="text-red-500">*</span></Label>
              <div className="border rounded-md overflow-hidden h-[180px]">
                <Editor
                  height="100%"
                  language={detectedLang}
                  theme="vs-dark"
                  value={formData.buggyCode}
                  onChange={(val) => set('buggyCode', val ?? '')}
                  options={{ minimap: { enabled: false }, fontSize: 13 }}
                />
              </div>
            </div>
            <MultiTabEditor
              label="Kode Solusi yang Benar"
              required
              language={detectedLang}
              codes={formData.correctAnswerCodes}
              onChange={(codes) => set('correctAnswerCodes', codes)}
            />
          </>
        );

      case 'DRAG_AND_DROP':
        return (
          <div className="space-y-2">
            <Label>
              Urutan Baris yang Benar <span className="text-red-500">*</span>
              <span className="text-muted-foreground text-xs ml-1">(ketik satu baris per potongan kode)</span>
            </Label>
            <Textarea
              className="font-mono text-sm"
              placeholder={"<div>\n  <p>Hello World</p>\n</div>"}
              value={formData.orderedLines}
              onChange={(e) => set('orderedLines', e.target.value)}
              rows={7}
            />
            <p className="text-xs text-muted-foreground">
              Setiap baris akan menjadi satu blok drag-and-drop. Blok akan diacak otomatis saat ditampilkan ke mahasiswa.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[820px] max-h-[92vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Edit Soal' : 'Buat Soal Baru'}</DialogTitle>
            <DialogDescription className='pt-1'>
              Pilih metode challenge, isi detail soal, lalu tambahkan kode program yang diperlukan.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-5 py-4">

            {/* === Basic Info === */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Judul Soal <span className="text-red-500">*</span></Label>
                <Input
                  value={formData.title}
                  onChange={(e) => set('title', e.target.value)}
                  placeholder="Judul tantangan..."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Level <span className="text-red-500">*</span></Label>
                <Select value={formData.levelId.toString()} onValueChange={(val) => set('levelId', val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map(l => (
                      <SelectItem key={l.id} value={l.id.toString()}>{l.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Metode <span className="text-red-500">*</span></Label>
                <Select value={formData.method} onValueChange={(val) => set('method', val)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CODING_MANUAL">Coding Manual</SelectItem>
                    <SelectItem value="DRAG_AND_DROP">Drag &amp; Drop</SelectItem>
                    <SelectItem value="FIX_THE_BUG">Fix The Bug</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Difficulty &amp; XP <span className="text-red-500">*</span></Label>
                <div className="flex gap-2">
                  <Select value={formData.difficulty} onValueChange={(val) => set('difficulty', val)}>
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EASY">Easy</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HARD">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    placeholder="XP"
                    className="w-24"
                    min={5}
                    max={500}
                    value={formData.xpBase}
                    onChange={(e) => set('xpBase', parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
            </div>

            {/* Ideal Time + Status */}
            <div className={`grid gap-4 ${isEditMode ? 'grid-cols-2' : 'grid-cols-1'}`}>
              <div className="space-y-2">
                <Label>Waktu Ideal (detik) <span className="text-red-500">*</span></Label>
                <Input
                  type="number"
                  min={30}
                  max={600}
                  value={formData.idealTime}
                  onChange={(e) => set('idealTime', parseInt(e.target.value) || 60)}
                />
              </div>
              {isEditMode && (
                <div className="flex flex-row items-center gap-3 pt-8">
                  <Label>Status Soal</Label>
                  <Switch
                    checked={formData.isActive}
                    onCheckedChange={(val) => set('isActive', val)}
                  />
                  <span className={`text-sm font-medium ${formData.isActive ? 'text-green-600' : 'text-muted-foreground'}`}>
                    {formData.isActive ? 'Aktif' : 'Nonaktif'}
                  </span>
                </div>
              )}
            </div>

            {/* Deskripsi */}
            <div className="space-y-2">
              <Label>Deskripsi / Instruksi Soal <span className="text-red-500">*</span></Label>
              <Textarea
                placeholder="Jelaskan apa yang harus dilakukan mahasiswa..."
                value={formData.description}
                onChange={(e) => set('description', e.target.value)}
                rows={3}
                required
              />
            </div>

            {/* === Dynamic Fields per Method === */}
            <div className="p-4 border rounded-lg bg-muted/20 space-y-4">
              <div className="flex items-center gap-2">
                <Puzzle className="h-4 w-4 text-primary" />
                <span className="font-semibold text-sm">
                  Konfigurasi: {formData.method.replace(/_/g, ' ')}
                </span>
                {formData.levelId && (
                  <span className="ml-auto text-xs text-muted-foreground px-2 py-0.5 rounded border border-dashed">
                    Bahasa: <span className="font-mono font-semibold text-primary">{detectedLang.toUpperCase()}</span>
                  </span>
                )}
              </div>
              {!formData.levelId ? (
                <p className="text-xs text-muted-foreground italic">
                  Pilih level terlebih dahulu untuk menentukan bahasa pemrograman pada editor.
                </p>
              ) : (
                renderMethodFields()
              )}
            </div>

            {/* Hint */}
            <div className="space-y-2">
              <Label>Hint (Opsional)</Label>
              <Textarea
                placeholder="Petunjuk jika mahasiswa mengalami kesulitan..."
                value={formData.hint}
                onChange={(e) => set('hint', e.target.value)}
                rows={2}
              />
            </div>

          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button type="submit">
              {isEditMode ? 'Simpan Perubahan' : 'Buat Soal'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
