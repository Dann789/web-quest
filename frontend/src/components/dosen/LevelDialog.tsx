import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';
import { type Level } from '@/types';

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
    order: 1
  });

  const isEditMode = !!level;

  useEffect(() => {
    if (level) {
      setFormData({
        name: level.name,
        description: level.description || '',
        xpRequired: level.xpRequired,
        order: level.order
      });
    } else {
      setFormData({
        name: '',
        description: '',
        xpRequired: 0,
        order: 1
      });
    }
  }, [level, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
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

            {/* Order */}
            <div className="grid grid-cols-4 items-center gap-4">
               <Label htmlFor="order" className="text-right">
                 Urutan
               </Label>
               <Input 
                  type="number"
                  id="order"
                  min={1}
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                  className="w-24 col-span-3"
               />
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
