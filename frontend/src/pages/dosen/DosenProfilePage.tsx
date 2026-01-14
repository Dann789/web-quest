import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, Shield, Save } from 'lucide-react';

export default function DosenProfilePage() {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '', // Only for changing password
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        username: user.username,
        email: user.email,
      }));
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Profile updated:', formData);
      setIsLoading(false);
      setIsSaved(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => setIsSaved(false), 3000);
    }, 1000);
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
            
            {/* Avatar Section (Static for now) */}
            <div className="flex bg-muted/20 p-4 rounded-lg items-center gap-4">
               <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                 <User className="h-8 w-8 text-primary" />
               </div>
               <div>
                  <h3 className="font-bold text-lg">{user?.username}</h3>
                  {/* <div className="flex items-center gap-2 text-sm text-muted-foreground bg-primary/10 px-2 py-0.5 rounded-md w-fit">
                    <Shield className="h-3 w-3" />
                    <span className="font-medium uppercase">{user?.role}</span>
                  </div> */}
               </div>
            </div>

            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">Nama</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="username"
                    className="pl-9"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
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
                    className="pl-9"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password Baru (Opsional)</Label>
                <Input 
                  id="password"
                  type="password"
                  placeholder="Kosongkan jika tidak ingin mengubah"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4">
               {isSaved && (
                  <span className="text-green-600 text-sm font-medium animate-in fade-in">
                    Perubahan berhasil disimpan!
                  </span>
               )}
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
