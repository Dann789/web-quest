import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { User, Mail, AlertCircle } from 'lucide-react';
import { updateUser } from '@/services/admin/UserService';

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: any;
  onSave: (updatedUser: any) => void;
}

export function EditProfileDialog({ open, onOpenChange, user, onSave }: EditProfileDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: '',
      });
      setError('');
    }
  }, [user, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const payload: any = {
        name: formData.name.trim(),
        email: formData.email.trim(),
      };

      // Only include password if provided
      if (formData.password) {
        payload.password = formData.password;
      }

      const result = await updateUser(user.id, payload);

      if (result.success) {
        // Merge updated fields into current user object and pass to parent
        const updatedUser = { ...user, ...payload };
        onSave(updatedUser);
        onOpenChange(false);
      } else {
        setError(result.message || 'Gagal menyimpan perubahan');
      }
    } catch {
      setError('Terjadi kesalahan. Coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Profil</DialogTitle>
            <DialogDescription>
              Ubah informasi profil Anda di sini. Klik simpan setelah selesai.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/20 border border-destructive/30 text-destructive text-sm">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Nama</Label>
              <div className="relative">
                 <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                 <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-9"
                    required
                 />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
               <div className="relative">
                 <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                 <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-9"
                    required
                 />
               </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password Baru <span className="text-muted-foreground font-normal">(Opsional)</span></Label>
              <Input
                id="password"
                type="password"
                placeholder="Kosongkan jika tidak ingin mengubah"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                minLength={6}
                maxLength={10}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Batal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
