import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Editor from '@monaco-editor/react';

interface MaterialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  material?: any;
  onSubmit: (data: any) => void;
  levels: { id: number; name: string }[];
  materials?: any[]; // For auto-calculating next order number
}

export function MaterialDialog({ open, onOpenChange, material, onSubmit, levels, materials = [] }: MaterialDialogProps) {
  const [formData, setFormData] = useState({
    title: '',
    levelId: '',
    content: '',
    order: 1
  });

  const isEditMode = !!material;

  // Calculate next order number for a given levelId
  // Exclude the material being edited (it's still counted in old level)
  const getNextOrder = (levelId: string | number) => {
    if (!levelId) return 1;
    const count = materials.filter(
      m => m.levelId === Number(levelId) && m.id !== material?.id
    ).length;
    return count + 1;
  };

  useEffect(() => {
    if (material) {
      setFormData({
        title: material.title,
        levelId: String(material.levelId || ''),
        content: material.content || '# Judul Materi\n\nTulis konten materi di sini...',
        order: material.order
      });
    } else {
      setFormData({
        title: '',
        levelId: '',
        content: '# Judul Materi\n\nTulis konten materi di sini...',
        order: 1
      });
    }
  }, [material, open]);

  // When levelId changes, auto-update order (both create & edit mode when level changes)
  const handleLevelChange = (val: string) => {
    const nextOrder = getNextOrder(val);
    setFormData(prev => ({ ...prev, levelId: val, order: nextOrder }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Edit Materi' : 'Tambah Materi Baru'}</DialogTitle>
            <DialogDescription>
              Buat atau ubah materi pembelajaran. Gunakan Markdown untuk konten yang akan ditampilkan.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            
            {/* Metadata Section */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Judul Materi</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: Pengenalan HTML"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Select 
                  value={formData.levelId.toString()} 
                  onValueChange={handleLevelChange}
                >
                  <SelectTrigger>
                     <SelectValue placeholder="Pilih Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map(level => (
                      <SelectItem key={level.id} value={level.id.toString()}>{level.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Urutan Materi */}
              <div className="space-y-2 col-span-2">
                <Label htmlFor="order">Urutan Materi</Label>
                {isEditMode ? (
                  // Edit mode: bisa diubah, bounded 1..total materi di level tsb
                  <div className="flex items-center gap-3">
                    <Input
                      id="order"
                      type="number"
                      min={1}
                      max={materials.filter(m => m.levelId === Number(formData.levelId)).length || 1}
                      value={formData.order}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 1;
                        const max = materials.filter(m => m.levelId === Number(formData.levelId)).length || 1;
                        setFormData(prev => ({ ...prev, order: Math.min(Math.max(val, 1), max) }));
                      }}
                      className="w-20 font-mono text-center text-lg font-bold"
                    />
                    <p className="text-sm text-muted-foreground">
                      dari{' '}
                      <span className="font-semibold text-foreground">
                        {materials.filter(m => m.levelId === Number(formData.levelId)).length}
                      </span>{' '}
                      materi di level ini
                      {materials.filter(m => m.levelId === Number(formData.levelId)).length > 1 && (
                        <span className="ml-1 text-amber-500">— jika diubah, urutan materi lain akan ikut bertukar</span>
                      )}
                    </p>
                  </div>
                ) : (
                  // Create mode: read-only, auto-assigned
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-10 w-16 rounded-md border bg-muted font-mono text-lg font-bold text-primary select-none">
                      {formData.order}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formData.levelId
                        ? <>Akan menjadi materi ke-<span className="font-semibold text-foreground">{formData.order}</span> dari level yang dipilih</>
                        : 'Pilih level terlebih dahulu untuk menentukan urutan otomatis'
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Content Editor Section */}
            <div className="space-y-2">
               <Label>Konten Materi (Markdown)</Label>
               <Tabs defaultValue="editor" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="editor">Editor</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                  </TabsList>
                  <TabsContent value="editor" className="border rounded-md mt-2 overflow-hidden">
                    <Editor
                      height="400px"
                      defaultLanguage="markdown"
                      theme="vs-dark"
                      value={formData.content}
                      onChange={(value) => setFormData({ ...formData, content: value || '' })}
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        wordWrap: 'on'
                      }}
                    />
                  </TabsContent>
                  <TabsContent value="preview" className="border rounded-md mt-2 p-4 h-[400px] overflow-y-auto prose dark:prose-invert max-w-none">
                     <ReactMarkdown
                        components={{
                          code({ node, inline, className, children, ...props }: any) {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline && match ? (
                              <SyntaxHighlighter
                                style={vscDarkPlus}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                              >
                                {String(children).replace(/\n$/, '')}
                              </SyntaxHighlighter>
                            ) : (
                              <code className={className} {...props}>
                                {children}
                              </code>
                            );
                          },
                        }}
                      >
                        {formData.content}
                      </ReactMarkdown>
                  </TabsContent>
               </Tabs>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button type="submit">
              {isEditMode ? 'Simpan Perubahan' : 'Buat Materi'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
