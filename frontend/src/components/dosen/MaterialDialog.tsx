import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight, common } from 'lowlight';
import Highlight from '@tiptap/extension-highlight';
import { Bold, Italic, Strikethrough, Code, ImageIcon, List, ListOrdered, Heading1, Heading2, Quote, Undo, Redo } from 'lucide-react';

const lowlight = createLowlight(common);

interface MaterialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  material?: any;
  onSubmit: (data: any) => void;
  levels: { id: number; name: string }[];
  materials?: any[];
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt('Masukkan URL Gambar:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 dark:border-slate-800 p-2 bg-slate-50 dark:bg-slate-900 rounded-t-md">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'bg-slate-200 dark:bg-slate-800' : ''}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'bg-slate-200 dark:bg-slate-800' : ''}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'bg-slate-200 dark:bg-slate-800' : ''}
      >
        <Strikethrough className="h-4 w-4" />
      </Button>
      <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-1"></div>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'bg-slate-200 dark:bg-slate-800' : ''}
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'bg-slate-200 dark:bg-slate-800' : ''}
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'bg-slate-200 dark:bg-slate-800' : ''}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'bg-slate-200 dark:bg-slate-800' : ''}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'bg-slate-200 dark:bg-slate-800' : ''}
      >
        <Quote className="h-4 w-4" />
      </Button>
      <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-1"></div>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'bg-slate-200 dark:bg-slate-800' : ''}
      >
        <Code className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={addImage}
      >
        <ImageIcon className="h-4 w-4" />
      </Button>
      <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-1"></div>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <Redo className="h-4 w-4" />
      </Button>
    </div>
  );
};

export function MaterialDialog({ open, onOpenChange, material, onSubmit, levels, materials = [] }: MaterialDialogProps) {
  const [formData, setFormData] = useState({
    title: '',
    levelId: '',
    content: '',
    order: 1
  });

  const isEditMode = !!material;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: 'rounded-md max-w-full h-auto my-4 block mx-auto shadow-lg',
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'block rounded-md bg-slate-950 p-4 text-sm text-slate-50 font-mono my-4',
        },
      }),
      Highlight,
    ],
    content: '',
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, content: editor.getHTML() }));
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base dark:prose-invert max-w-none focus:outline-none p-4 min-h-[400px] cursor-text',
      },
    },
  });

  const getNextOrder = (levelId: string | number) => {
    if (!levelId) return 1;
    const count = materials.filter(
      m => m.levelId === Number(levelId) && m.id !== material?.id
    ).length;
    return count + 1;
  };

  useEffect(() => {
    if (open) {
      if (material) {
        setFormData({
          title: material.title,
          levelId: String(material.levelId || ''),
          content: material.content || '',
          order: material.order
        });
        editor?.commands.setContent(material.content || '');
      } else {
        setFormData({
          title: '',
          levelId: '',
          content: '',
          order: 1
        });
        editor?.commands.setContent('');
      }
    }
  }, [material, open, editor]);

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
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Edit Materi' : 'Tambah Materi Baru'}</DialogTitle>
            <DialogDescription>
              Buat atau ubah materi pembelajaran. Gunakan editor di bawah ini untuk teks, gambar, dan kode.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
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

              <div className="space-y-2 col-span-2">
                <Label htmlFor="order">Urutan Materi</Label>
                {isEditMode ? (
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

            <div className="space-y-2">
               <Label>Konten Materi</Label>
               <div className="border border-slate-200 dark:border-slate-800 rounded-md overflow-hidden bg-white dark:bg-slate-950">
                 <MenuBar editor={editor} />
                 <div className="max-h-[400px] overflow-y-auto">
                   <EditorContent editor={editor} />
                 </div>
               </div>
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
