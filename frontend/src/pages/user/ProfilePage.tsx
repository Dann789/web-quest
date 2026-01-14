import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { User, Zap, Trophy, Award, Calendar, Edit } from 'lucide-react';
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

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'COMMON':
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      case 'RARE':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'EPIC':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'LEGENDARY':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Profile</h1>

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
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Bergabung sejak {new Date(user?.createdAt || '').toLocaleDateString('id-ID', { 
                    year: 'numeric', 
                    month: 'long' 
                  })}</span>
                </div>
                <Button variant="outline" size="sm" className="gap-2" onClick={() => setIsEditOpen(true)}>
                   <Edit className="h-3 w-3" /> Edit Profil
                </Button>
              </div>
            </div>

            {/* XP Badge */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30">
              <Zap className="h-5 w-5 text-emerald-400" />
              <span className="text-lg font-bold text-emerald-400">
                {user?.totalXp.toLocaleString()} XP
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <EditProfileDialog 
        open={isEditOpen} 
        onOpenChange={setIsEditOpen} 
        user={user} 
        onSave={handleEditProfile} 
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <Trophy className="h-8 w-8 text-amber-400 mx-auto mb-2" />
            <p className="text-2xl font-bold">2/5</p>
            <p className="text-sm text-muted-foreground">Levels Unlocked</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Zap className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
            <p className="text-2xl font-bold">24</p>
            <p className="text-sm text-muted-foreground">Challenges Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Award className="h-8 w-8 text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-bold">#5</p>
            <p className="text-sm text-muted-foreground">Global Rank</p>
          </CardContent>
        </Card>
      </div>

      {/* Badges Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Badges Collection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`p-4 rounded-lg border ${
                  badge.earned
                    ? 'bg-card border-border'
                    : 'bg-muted/30 border-muted opacity-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                      badge.earned ? 'bg-primary/20' : 'bg-muted'
                    }`}>
                      <Award className={`h-5 w-5 ${badge.earned ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <div>
                      <p className="font-medium">{badge.name}</p>
                      <p className="text-xs text-muted-foreground">{badge.description}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={getRarityColor(badge.rarity)}>
                    {badge.rarity}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
