import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from "sonner"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import type { User, UserRole } from '@/types';

interface UserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User | null; // null = create mode, User = edit mode
  onSubmit: (data: UserFormData) => Promise<{ success: boolean; message: string }>;
}

export interface UserFormData {
  name: string;
  username: string;
  email: string;
  password?: string;
  role: UserRole;
}

/**
 * UserDialog - Modal for creating/editing users
 * 
 * Usage:
 * - Create mode: user prop is null/undefined
 * - Edit mode: user prop contains existing user data
 */
export default function UserDialog({ open, onOpenChange, user, onSubmit }: UserDialogProps) {
  const isEditMode = !!user;
  
  const [formData, setFormData] = useState<UserFormData>({
    username: '',
    name: '',
    email: '',
    password: '',
    role: 'MAHASISWA',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Reset form when dialog opens/closes or user changes
  useEffect(() => {
    if (open) {
      if (user) {
        // Edit mode - populate form with user data
        setFormData({
          username: user.username,
          name: user.name,
          email: user.email,
          password: '', // Don't show existing password
          role: user.role,
        });
      } else {
        // Create mode - reset form
        setFormData({
          username: '',
          name: '',
          email: '',
          password: '',
          role: 'MAHASISWA'
        });
      }
      setError('');
      setShowPassword(false);
    }
  }, [open, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validation
      if (!formData.name.trim()) {
        setError('Nama lengkap wajib diisi');
        setIsLoading(false);
        return;
      }
      if (!formData.username.trim()) {
        setError('NIM/NIP wajib diisi');
        setIsLoading(false);
        return;
      }
      if (!formData.email.trim()) {
        setError('Email wajib diisi');
        setIsLoading(false);
        return;
      }
      if (!isEditMode && !formData.password) {
        setError('Password wajib diisi');
        setIsLoading(false);
        return;
      }

      // Build data to submit
      const dataToSubmit: UserFormData = {
        username: formData.username.trim(),
        name: formData.name.trim(),
        email: formData.email.trim(),
        role: formData.role,
      };

      // Only include password if it's provided
      if (formData.password) {
        dataToSubmit.password = formData.password;
      }

      const result = await onSubmit(dataToSubmit);

      if (result.success) {
        isEditMode ? toast.success('User berhasil diupdate') : toast.success('User berhasil ditambahkan');
        onOpenChange(false);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An unexpected error occurred');
      toast.error('Terjadi kesalahan');
      console.error('Form submission error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Edit User' : 'Buat User Baru'}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Update informasi user. Kosongkan password jika tidak ingin diubah.'
              : 'Tambah user baru ke dalam sistem'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg bg-destructive/20 border border-destructive/30 text-destructive text-sm">
                {error}
              </div>
            )}

            {/* Name */}
            <div className="grid gap-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                type="text"
                placeholder="Masukkan nama lengkap"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={isLoading}
                required
              />
            </div>

            {/*Username*/}
            <div className="grid gap-2">
              <Label htmlFor="username">NIM/NIP</Label>
              <Input
                id="username"
                type="text"
                placeholder="Masukkan NIM/NIP"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                disabled={isLoading}
                required
              />
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Masukkan email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <Label htmlFor="password">
                Password {isEditMode && <span className="text-muted-foreground font-normal">(optional)</span>}
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={isEditMode ? 'Kosongi jika tidak diubah' : 'Masukkan password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  disabled={isLoading}
                  minLength={6}
                  maxLength={10}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">6-10 characters</p>
            </div>

            {/* Role */}
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select
                key={formData.role}
                value={formData.role}
                onValueChange={(value: UserRole) => setFormData({ ...formData, role: value })}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MAHASISWA">Mahasiswa</SelectItem>
                  <SelectItem value="DOSEN">Dosen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditMode ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>{isEditMode ? 'Perbarui User' : 'Buat User'}</>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
