import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import { updateUser } from '@/services/admin/UserService';
import { toast } from 'sonner';

export default function DosenProfilePage() {
  const { user, updateUser: updateAuthUser } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name,
        email: user.email,
        password: '',
      }));
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    setIsLoading(true);

    try {
      const payload: { name: string; email: string; password?: string } = {
        name: formData.name.trim(),
        email: formData.email.trim(),
      };

      // Hanya kirim password jika diisi
      if (formData.password) {
        payload.password = formData.password;
      }

      const result = await updateUser(user!.id, payload);

      if (result.success) {
        // Perbarui user di AuthContext + localStorage
        const updatedUser = { ...user!, ...payload };
        updateAuthUser(updatedUser);
        setFormData(prev => ({ ...prev, password: '' }));
        toast.success('Profil berhasil diperbarui!');
        setTimeout(() => setSuccessMsg(''), 4000);
      } else {
        toast.error('Profil gagal diperbarui!');
        setErrorMsg(result.message || 'Gagal menyimpan perubahan.');
      }
    } catch {
      toast.error('Terjadi kesalahan jaringan. Coba lagi.');
      setErrorMsg('Terjadi kesalahan jaringan. Coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Profil Dosen</h1>
        <p className="text-muted-foreground mt-1">Kelola informasi akun dan preferensi Anda.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informasi Akun</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Avatar Section */}
            <div className="flex bg-muted/20 p-4 rounded-lg items-center gap-4">
               <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                 <User className="h-8 w-8 text-primary" />
               </div>
               <div>
                  <h3 className="font-bold text-lg">{user?.name}</h3>
               </div>
            </div>

            {/* Feedback Messages */}
            {errorMsg && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-sm">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                {successMsg}
              </div>
            )}

            <div className="grid gap-4">
              {/* Nama */}
              <div className="space-y-2">
                <Label htmlFor="name">Nama</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="name"
                    className="pl-9"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="email"
                    type="email"
                    className="pl-9"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">
                  Password Baru{' '}
                  <span className="text-muted-foreground font-normal">(Opsional)</span>
                </Label>
                <Input 
                  id="password"
                  type="password"
                  placeholder="Kosongkan jika tidak ingin mengubah"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  minLength={6}
                />
              </div>
            </div>

            <div className="flex items-center justify-end pt-2">
              <Button type="submit" disabled={isLoading} className="gap-2">
                <Save className="h-4 w-4" />
                {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
