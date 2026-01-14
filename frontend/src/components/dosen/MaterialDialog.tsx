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
  material?: any; // Replace with proper type later
  onSubmit: (data: any) => void;
  levels: { id: number; name: string }[];
}

export function MaterialDialog({ open, onOpenChange, material, onSubmit, levels }: MaterialDialogProps) {
  const [formData, setFormData] = useState({
    title: '',
    levelId: '',
    content: '',
    xpReward: 50,
    order: 1
  });

  const isEditMode = !!material;

  useEffect(() => {
    if (material) {
      setFormData({
        title: material.title,
        levelId: material.levelId || '1', // Default or find ID
        content: material.content || '# Judul Materi\n\nTulis konten materi di sini...',
        xpReward: material.xpReward,
        order: material.order
      });
    } else {
      setFormData({
        title: '',
        levelId: '',

        content: '# Judul Materi\n\nTulis konten materi di sini...',
        xpReward: 50,
        order: 1
      });
    }
  }, [material, open]);

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
                  onValueChange={(val) => setFormData({ ...formData, levelId: val })}
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



              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="xp">XP Reward</Label>
                    <Input 
                      type="number" 
                      id="xp"
                      value={formData.xpReward}
                      onChange={(e) => setFormData({ ...formData, xpReward: parseInt(e.target.value) || 0 })}
                    />
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="order">Urutan</Label>
                    <Input 
                      type="number" 
                      id="order"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                    />
                 </div>
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
