import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';

interface ChallengeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  challenge?: any; // Replace with proper type
  onSubmit: (data: any) => void;
  levels: { id: number; name: string }[];
}

export function ChallengeDialog({ open, onOpenChange, challenge, onSubmit, levels }: ChallengeDialogProps) {
  const [formData, setFormData] = useState({
    title: '',
    levelId: '',
    difficulty: 'EASY',
    method: 'CODING_MANUAL',
    xpBase: 10,
    questionContent: '',
    starterCode: '',
    correctAnswer: '',
    hint: '',
    testCases: '[]' // JSON string for transparency
  });

  const isEditMode = !!challenge;

  useEffect(() => {
    if (challenge) {
      setFormData({
        title: challenge.title,
        levelId: challenge.levelId || '1',
        difficulty: challenge.difficulty || 'EASY',
        method: challenge.method || 'CODING_MANUAL',
        xpBase: challenge.xpBase,
        questionContent: challenge.questionContent || '',
        starterCode: challenge.starterCode || '',
        correctAnswer: challenge.correctAnswer || '',
        hint: challenge.hint || '',
        testCases: JSON.stringify(challenge.testCases || [], null, 2)
      });
    } else {
      setFormData({
        title: '',
        levelId: '',
        difficulty: 'EASY',
        method: 'CODING_MANUAL',
        xpBase: 10,
        questionContent: '',
        starterCode: '',
        correctAnswer: '',
        hint: '',
        testCases: '[]'
      });
    }
  }, [challenge, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Parse testCases before submit if needed, or keep string
    onSubmit(formData);
    onOpenChange(false);
  };

  const renderMethodSpecificFields = () => {
    switch (formData.method) {
      case 'CODING_MANUAL':
        return (
          <>
             <div className="space-y-2">
               <Label>Starter Code (Kode Awal untuk Mahasiswa)</Label>
               <div className="border rounded-md overflow-hidden h-[200px]">
                  <Editor
                    height="100%"
                    defaultLanguage="html"
                    theme="vs-dark"
                    value={formData.starterCode}
                    onChange={(val) => setFormData({ ...formData, starterCode: val || '' })}
                    options={{ minimap: { enabled: false }, fontSize: 13 }}
                  />
               </div>
             </div>
             <div className="space-y-2">
               <Label>Kunci Jawaban (Full Solution Code)</Label>
               <div className="border rounded-md overflow-hidden h-[200px]">
                  <Editor
                    height="100%"
                    defaultLanguage="html"
                    theme="vs-dark"
                    value={formData.correctAnswer}
                    onChange={(val) => setFormData({ ...formData, correctAnswer: val || '' })}
                    options={{ minimap: { enabled: false }, fontSize: 13 }}
                  />
               </div>
             </div>
          </>
        );
      case 'DRAG_AND_DROP':
        return (
          <>
             <div className="space-y-2">
               <Label>Urutan Kode Benar (Pisahkan dengan baris baru)</Label>
               <Textarea
                  className="font-mono"
                  placeholder="<div>&#10;  <p>Hello World</p>&#10;</div>"
                  value={formData.correctAnswer}
                  onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
                  rows={6}
               />
               <p className="text-xs text-muted-foreground">Setiap baris akan menjadi satu blok yang bisa di-drag.</p>
             </div>
          </>
        );
      case 'FIX_THE_BUG':
        return (
          <>
             <div className="space-y-2">
               <Label>Kode Bug (Input Soal Salah)</Label>
               <div className="border rounded-md overflow-hidden h-[150px]">
                  <Editor
                    height="100%"
                    defaultLanguage="javascript"
                    theme="vs-dark"
                    value={formData.starterCode}
                    onChange={(val) => setFormData({ ...formData, starterCode: val || '' })}
                    options={{ minimap: { enabled: false }, fontSize: 13 }}
                  />
               </div>
             </div>
             <div className="space-y-2">
               <Label>Solusi Benar</Label>
               <div className="border rounded-md overflow-hidden h-[150px]">
                  <Editor
                    height="100%"
                    defaultLanguage="javascript"
                    theme="vs-dark"
                    value={formData.correctAnswer}
                    onChange={(val) => setFormData({ ...formData, correctAnswer: val || '' })}
                    options={{ minimap: { enabled: false }, fontSize: 13 }}
                  />
               </div>
             </div>
          </>
        );
      case 'SCENARIO_BASED':
        return (
          <>
             <div className="space-y-2">
               <Label>Skenario Masalah</Label>
               <Textarea 
                 placeholder="Jelaskan situasi masalah nyata..." 
                 value={formData.questionContent}
                 onChange={(e) => setFormData({ ...formData, questionContent: e.target.value })}
                 rows={4}
               />
             </div>
             <div className="space-y-2">
               <Label>Jawaban Tersimpan (Expected Output / Concept)</Label>
               <Textarea 
                 placeholder="Jawaban atau kata kunci yang diharapkan..." 
                 value={formData.correctAnswer}
                 onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
                 rows={3}
               />
             </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Edit Soal' : 'Buat Soal Baru'}</DialogTitle>
            <DialogDescription>
              Sesuaikan tipe soal (Coding, Drag & Drop, Bug Fix, Scenario) dengan kebutuhan materi.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <Label>Judul Soal</Label>
                  <Input 
                    value={formData.title} 
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Judul tantangan..."
                    required
                  />
               </div>
               <div className="space-y-2">
                  <Label>Level</Label>
                  <Select value={formData.levelId.toString()} onValueChange={(val) => setFormData({ ...formData, levelId: val })}>
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
                  <Label>Metode Challenge</Label>
                  <Select value={formData.method} onValueChange={(val) => setFormData({ ...formData, method: val })}>
                    <SelectTrigger>
                       <SelectValue placeholder="Pilih Metode" />
                    </SelectTrigger>
                    <SelectContent>
                       <SelectItem value="CODING_MANUAL">Coding Manual</SelectItem>
                       <SelectItem value="DRAG_AND_DROP">Drag & Drop Code</SelectItem>
                       <SelectItem value="FIX_THE_BUG">Fix The Bug</SelectItem>
                       <SelectItem value="SCENARIO_BASED">Scenario Based</SelectItem>
                    </SelectContent>
                  </Select>
               </div>

               <div className="space-y-2">
                  <Label>Difficulty & XP</Label>
                  <div className="flex gap-2">
                     <Select value={formData.difficulty} onValueChange={(val) => setFormData({ ...formData, difficulty: val })}>
                        <SelectTrigger className="w-[140px]">
                           <SelectValue placeholder="Difficulty" />
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
                        value={formData.xpBase}
                        onChange={(e) => setFormData({ ...formData, xpBase: parseInt(e.target.value) || 0 })}
                     />
                  </div>
               </div>
            </div>

            {/* Question Content (Markdown) */}
            <div className="space-y-2">
               <Label>Deskripsi Soal / Pertanyaan (Markdown)</Label>
               <Textarea 
                 placeholder="Jelaskan apa yang harus dilakukan siswa..." 
                 value={formData.questionContent}
                 onChange={(e) => setFormData({ ...formData, questionContent: e.target.value })}
                 rows={3}
               />
            </div>

            {/* Dynamic Fields Based on Method */}
            <div className="p-4 border rounded-lg bg-muted/20 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                 <Puzzle className="h-4 w-4 text-primary" />
                 <span className="font-bold text-sm">Konfigurasi: {formData.method.replace('_', ' ')}</span>
              </div>
              
              {renderMethodSpecificFields()}
            </div>

            {/* Common Extras */}
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <Label>Hint (Bantuan)</Label>
                  <Textarea 
                     placeholder="Bantuan jika siswa stuck..."
                     value={formData.hint}
                     onChange={(e) => setFormData({ ...formData, hint: e.target.value })} 
                  />
               </div>
               <div className="space-y-2">
                  <Label>Test Cases (JSON)</Label>
                  <div className="border rounded-md overflow-hidden h-[80px]">
                     <Editor
                        height="100%"
                        defaultLanguage="json"
                        theme="vs-dark"
                        value={formData.testCases}
                        onChange={(val) => setFormData({ ...formData, testCases: val || '[]' })}
                        options={{ minimap: { enabled: false }, fontSize: 12, lineNumbers: 'off' }}
                     />
                  </div>
                  <p className="text-[10px] text-muted-foreground">Format JSON array untuk auto-grading.</p>
               </div>
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

// Icon helper
import { Puzzle } from 'lucide-react';
