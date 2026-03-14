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

interface ChallengeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  challenge?: any;
  onSubmit: (data: any) => void;
  levels: { id: number; name: string }[];
}

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
  // CODING_MANUAL fields
  starterCode: '',
  correctAnswer: '',
  // FIX_THE_BUG fields
  buggyCode: '',
  // DRAG_AND_DROP fields
  orderedLines: '',   // textarea: dosen ketik baris urutan benar, pisah baris baru
};

export function ChallengeDialog({ open, onOpenChange, challenge, onSubmit, levels }: ChallengeDialogProps) {
  const [formData, setFormData] = useState({ ...DEFAULT_FORM });

  const isEditMode = !!challenge;

  // Parse content JSON dari API ke field form saat edit
  useEffect(() => {
    if (challenge) {
      const content = challenge.content as any ?? {};

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
        starterCode: content.starterCode ?? challenge.starterCode ?? '',
        correctAnswer: content.correctAnswer ?? '',
        buggyCode: content.buggyCode ?? challenge.starterCode ?? '',
        orderedLines: (content.expectedOrder ?? []).join('\n'),
      });
    } else {
      setFormData({ ...DEFAULT_FORM });
    }
  }, [challenge, open]);

  const set = (field: string, val: any) => setFormData(prev => ({ ...prev, [field]: val }));

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
      // testCaseInputs tidak dikirim — backend auto-generate dari kunci jawaban
    };

    // Sertakan field spesifik berdasarkan method
    if (formData.method === 'CODING_MANUAL') {
      payload.starterCode = formData.starterCode || null;
      payload.correctAnswer = formData.correctAnswer;
    } else if (formData.method === 'FIX_THE_BUG') {
      payload.buggyCode = formData.buggyCode;
      payload.correctAnswer = formData.correctAnswer;
    } else if (formData.method === 'DRAG_AND_DROP') {
      const lines = formData.orderedLines.split('\n').map(l => l.trim()).filter(Boolean);
      payload.expectedOrder = lines;
      // blocks: acak dari expectedOrder (backend/frontend bisa shuffle)
      payload.blocks = [...lines].sort(() => Math.random() - 0.5);
    }

    onSubmit(payload);
  };

  const renderMethodFields = () => {
    switch (formData.method) {
      case 'CODING_MANUAL':
        return (
          <>
            <div className="space-y-2">
              <Label>Starter Code <span className="text-muted-foreground text-xs">(kode awal yang dilihat mahasiswa)</span></Label>
              <div className="border rounded-md overflow-hidden h-[180px]">
                <Editor
                  height="100%"
                  defaultLanguage="html"
                  theme="vs-dark"
                  value={formData.starterCode}
                  onChange={(val) => set('starterCode', val ?? '')}
                  options={{ minimap: { enabled: false }, fontSize: 13 }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Kunci Jawaban <span className="text-red-500">*</span></Label>
              <div className="border rounded-md overflow-hidden h-[180px]">
                <Editor
                  height="100%"
                  defaultLanguage="html"
                  theme="vs-dark"
                  value={formData.correctAnswer}
                  onChange={(val) => set('correctAnswer', val ?? '')}
                  options={{ minimap: { enabled: false }, fontSize: 13 }}
                />
              </div>
            </div>
          </>
        );

      case 'FIX_THE_BUG':
        return (
          <>
            <div className="space-y-2">
              <Label>Kode yang Mengandung Bug <span className="text-red-500">*</span></Label>
              <div className="border rounded-md overflow-hidden h-[160px]">
                <Editor
                  height="100%"
                  defaultLanguage="javascript"
                  theme="vs-dark"
                  value={formData.buggyCode}
                  onChange={(val) => set('buggyCode', val ?? '')}
                  options={{ minimap: { enabled: false }, fontSize: 13 }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Kode Solusi yang Benar <span className="text-red-500">*</span></Label>
              <div className="border rounded-md overflow-hidden h-[160px]">
                <Editor
                  height="100%"
                  defaultLanguage="javascript"
                  theme="vs-dark"
                  value={formData.correctAnswer}
                  onChange={(val) => set('correctAnswer', val ?? '')}
                  options={{ minimap: { enabled: false }, fontSize: 13 }}
                />
              </div>
            </div>
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
            <DialogDescription>
              Pilih metode challenge, isi detail soal, lalu tambahkan test case untuk validasi otomatis.
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
                    <SelectItem value="DRAG_AND_DROP">Drag & Drop</SelectItem>
                    <SelectItem value="FIX_THE_BUG">Fix The Bug</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Difficulty & XP <span className="text-red-500">*</span></Label>
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

            {/* Ideal Time + Status (Status hanya tampil di edit mode) */}
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
                <div className="space-y-2 flex items-end gap-3 pb-1">
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
              </div>
              {renderMethodFields()}
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
