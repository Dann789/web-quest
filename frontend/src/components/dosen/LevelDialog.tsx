import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';
import { type Level } from '@/types';
import { toast } from 'sonner';

// List of available FontAwesome icons
const AVAILABLE_ICONS = [
  { id: 'fa-code', type: 'fa-solid' },
  { id: 'fa-html5', type: 'fa-brands' },
  { id: 'fa-css3', type: 'fa-brands' },
  { id: 'fa-js', type: 'fa-brands' },
  { id: 'fa-php', type: 'fa-brands' },
  { id: 'fa-react', type: 'fa-brands' },
  { id: 'fa-vuejs', type: 'fa-brands' },
  { id: 'fa-database', type: 'fa-solid' },
  { id: 'fa-bug', type: 'fa-solid' },
  { id: 'fa-terminal', type: 'fa-solid' },
  { id: 'fa-layer-group', type: 'fa-solid' },
  { id: 'fa-gears', type: 'fa-solid' },
  { id: 'fa-lightbulb', type: 'fa-solid' },
  { id: 'fa-shield-halved', type: 'fa-solid' }
];

interface LevelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  level?: Level | null;
  onSubmit: (data: any) => void;
}

export function LevelDialog({ open, onOpenChange, level, onSubmit }: LevelDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    xpRequired: 0,
    iconName: 'fa-code',
    easyNodes: 0,
    mediumNodes: 0,
    hardNodes: 0,
  });

  const isEditMode = !!level;

  useEffect(() => {
    if (level) {
      setFormData({
        name: level.name,
        description: level.description || '',
        xpRequired: level.xpRequired,
        iconName: level.iconName || 'fa-code',
        easyNodes: level.easyNodes,
        mediumNodes: level.mediumNodes,
        hardNodes: level.hardNodes,
      });
    } else {
      setFormData({
        name: '',
        description: '',
        xpRequired: 0,
        iconName: 'fa-code',
        easyNodes: 0,
        mediumNodes: 0,
        hardNodes: 0,
      });
    }
  }, [level, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    isEditMode ? toast.success('Level berhasil diperbarui!') : toast.success('Level berhasil ditambahkan!');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Edit Level' : 'Tambah Level Baru'}</DialogTitle>
            <DialogDescription>
              {isEditMode 
                ? 'Ubah informasi level di sini. Klik simpan setelah selesai.' 
                : 'Isi detail untuk level pembelajaran baru.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {/* Level Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nama Level
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="col-span-3"
                placeholder="Ex: HTML Basics"
                required
              />
            </div>

            {/* Description */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Deskripsi
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="col-span-3"
                placeholder="Singkat penjelasan tentang level ini..."
              />
            </div>

            {/* XP Required */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="xp" className="text-right">
                XP Required
              </Label>
              <div className="col-span-3 space-y-2">
                <div className="flex items-center gap-2">
                   <Input 
                      type="number" 
                      id="xp"
                      min={0}
                      value={formData.xpRequired}
                      onChange={(e) => setFormData({ ...formData, xpRequired: parseInt(e.target.value) || 0 })}
                      className="w-24"
                   />
                   <span className="text-sm text-muted-foreground">XP untuk membuka level ini</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="xp" className="text-right">
                Jumlah Soal (E/M/H)
              </Label>
              <div className="col-span-3 space-y-2">
                <div className="flex items-center gap-2">
                   <Input 
                      type="number" 
                      id="easyNodes"
                      min={0}
                      value={formData.easyNodes}
                      onChange={(e) => setFormData({ ...formData, easyNodes: parseInt(e.target.value) || 0 })}
                      className="w-24"
                   />
                   <Input 
                      type="number" 
                      id="mediumNodes"
                      min={0}
                      value={formData.mediumNodes}
                      onChange={(e) => setFormData({ ...formData, mediumNodes: parseInt(e.target.value) || 0 })}
                      className="w-24"
                   />
                   <Input 
                      type="number" 
                      id="hardNodes"
                      min={0}
                      value={formData.hardNodes}
                      onChange={(e) => setFormData({ ...formData, hardNodes: parseInt(e.target.value) || 0 })}
                      className="w-24"
                   />
                </div>
              </div>
            </div>

            {/* Icon Picker */}
            <div className="grid grid-cols-4 gap-4 mt-2">
              <Label className="text-right pt-2">Icon Level</Label>
              <div className="col-span-3">
                <div className="grid grid-cols-5 gap-2 max-h-[170px] overflow-y-auto p-1 pr-2">
                  {AVAILABLE_ICONS.map((icon) => (
                    <button
                      key={icon.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, iconName: icon.id })}
                      className={`flex items-center justify-center p-3 rounded-lg border-2 transition-all duration-200 ${
                        formData.iconName === icon.id
                          ? 'border-primary bg-primary/10 text-primary scale-105 shadow-sm'
                          : 'border-border/50 bg-background hover:bg-muted hover:border-primary/50 text-muted-foreground hover:text-foreground'
                      }`}
                      title={icon.id}
                    >
                      <i className={`${icon.type} ${icon.id} text-xl`} />
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-2">
                  <span className="font-semibold text-foreground">Icon Terpilih:</span> 
                  <code className="bg-muted px-1.5 py-0.5 rounded text-primary">{formData.iconName}</code>
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button type="submit">
              {isEditMode ? 'Simpan Perubahan' : 'Buat Level'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
