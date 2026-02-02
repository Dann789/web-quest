import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { User, Zap, Award, Calendar, Edit, Lock } from 'lucide-react';
import { EditProfileDialog } from '@/components/user/EditProfileDialog';

/**
 * Profile Page - Menampilkan profil dan badges user
 */
export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditProfile = (data: any) => {
    console.log('Profile updated:', data);
    // Here you would call the update profile API
  };

  // Placeholder badges data
  const badges = [
    { id: 1, name: 'Web Beginner', description: 'Menyelesaikan Level 1', earned: true, rarity: 'COMMON' },
    { id: 2, name: 'Web Explorer', description: 'Membuka 3 level', earned: false, rarity: 'COMMON' },
    { id: 3, name: 'Web Adventurer', description: 'Membuka seluruh level', earned: false, rarity: 'RARE' },
    { id: 4, name: 'Brave Coder', description: 'Menyelesaikan 1 challenge hard', earned: true, rarity: 'COMMON' },
    { id: 5, name: 'Hard Challenger', description: 'Menyelesaikan 3 challenge hard', earned: false, rarity: 'RARE' },
    { id: 6, name: 'Dedicated Learner', description: 'Menyelesaikan seluruh materi pada 1 level', earned: true, rarity: 'COMMON' },
    { id: 7, name: 'Top Performer', description: 'Masuk Top 3 leaderboard', earned: false, rarity: 'EPIC' },
  ];

  const getRarityStyles = (rarity: string) => {
    switch (rarity) {
      case 'COMMON':
        return {
          iconBg: 'bg-slate-100 dark:bg-slate-800',
          iconColor: 'text-slate-600 dark:text-slate-400',
          border: 'border-slate-200 dark:border-slate-700',
          badge: 'bg-slate-100 text-slate-600 border-slate-200'
        };
      case 'RARE':
        return {
          iconBg: 'bg-blue-100 dark:bg-blue-900/30',
          iconColor: 'text-blue-600 dark:text-blue-400',
          border: 'border-blue-200 dark:border-blue-800',
          badge: 'bg-blue-100 text-blue-600 border-blue-200'
        };
      case 'EPIC':
        return {
          iconBg: 'bg-purple-100 dark:bg-purple-900/30',
          iconColor: 'text-purple-600 dark:text-purple-400',
          border: 'border-purple-200 dark:border-purple-800',
          badge: 'bg-purple-100 text-purple-600 border-purple-200'
        };
      case 'LEGENDARY':
        return {
          iconBg: 'bg-amber-100 dark:bg-amber-900/30',
          iconColor: 'text-amber-600 dark:text-amber-400',
          border: 'border-amber-200 dark:border-amber-800',
          badge: 'bg-amber-100 text-amber-600 border-amber-200'
        };
      default:
        return { 
          iconBg: 'bg-slate-100', 
          iconColor: 'text-slate-600', 
          border: 'border-slate-200', 
          badge: 'bg-slate-100' 
        };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Profile</h1>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30">
          <Zap className="h-5 w-5 text-emerald-400" />
          <span className="text-lg font-bold text-emerald-400">
            {user?.totalXp.toLocaleString()} XP
          </span>
        </div>
      </div>

      {/* Profile Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="h-12 w-12 text-primary" />
            </div>

            {/* User Info */}
            <div className="flex-1 space-y-2">
              <div>
                <h2 className="text-2xl font-bold">{user?.username}</h2>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Bergabung sejak {new Date(user?.createdAt || '').toLocaleDateString('id-ID', { 
                    year: 'numeric', 
                    month: 'long' 
                  })}</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => setIsEditOpen(true)}>
              <Edit className="h-3 w-3" /> Edit Profil
            </Button>
          </div>
        </CardContent>
      </Card>

      <EditProfileDialog 
        open={isEditOpen} 
        onOpenChange={setIsEditOpen} 
        user={user} 
        onSave={handleEditProfile} 
      />

      {/* Badges Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Koleksi Badge
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {badges.map((badge) => {
              const styles = getRarityStyles(badge.rarity);
              return (
                <div
                  key={badge.id}
                  className={`group relative flex flex-col items-center p-5 rounded-xl border transition-all duration-300 ${
                    badge.earned
                      ? `bg-card ${styles.border}`
                      : 'bg-muted/40 border-dashed border-muted opacity-70'
                  }`}
                >
                  {/* Rarity Badge */}
                  <div className="absolute top-3 right-3">
                     <Badge variant="outline" className={`text-[10px] px-2 py-0 border-0 ${styles.badge}`}>
                      {badge.rarity}
                    </Badge>
                  </div>

                  {/* Icon */}
                  <div className={`h-14 w-14 rounded-full flex items-center justify-center mb-4 transition-transform ${
                    badge.earned ? styles.iconBg : 'bg-muted'
                  }`}>
                    {badge.earned ? (
                      <Award className={`h-7 w-7 ${styles.iconColor}`} />
                    ) : (
                      <Lock className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>

                  {/* Text Content */}
                  <div className="text-center space-y-1 w-full">
                    <p className={`font-semibold truncate ${!badge.earned && 'text-muted-foreground'}`}>
                      {badge.name}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2 min-h-[2.5em]">
                      {badge.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
