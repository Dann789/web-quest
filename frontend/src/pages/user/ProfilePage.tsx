import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { User, Zap, Award, Calendar, Edit, Loader2 } from 'lucide-react';
import { EditProfileDialog } from '@/components/user/EditProfileDialog';
import { getUserBadges } from '@/services/user/BadgeService';
import type { BadgeItem } from '@/types';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [badges, setBadges] = useState<(BadgeItem & { isEarned: boolean, earnedAt: string | null })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user?.id) return;

    const fetchBadges = async () => {
      try {
        setLoading(true);
        const result = await getUserBadges(user.id);
        if (result.success && result.data) {
          setBadges(result.data.all);
        } else {
          setError(result.message || 'Failed to fetch badges');
        }
      } catch (error) {
        console.error('Error fetching badges:', error);
        setError('Failed to fetch badges');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBadges();
  }, [user?.id]);

  const handleEditProfile = (updatedUser: any) => {
    updateUser(updatedUser);
  };

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
            <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="h-12 w-12 text-primary" />
            </div>

            <div className="flex-1 space-y-2">
              <div>
                <h2 className="text-2xl font-bold mb-1">{user?.name}</h2>
                <p className="text-muted-foreground">{user?.username}</p>
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
      {loading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
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
                    badge.isEarned
                      ? `bg-card ${styles.border} scale-100 hover:scale-105`
                      : 'bg-muted/40 border-dashed border-muted opacity-70 grayscale scale-100 hover:grayscale-0 hover:scale-105 hover:opacity-100'
                  }`}
                >
                  <div className="absolute top-3 right-3">
                     <Badge variant="outline" className={`text-[10px] px-2 py-0 border-0 ${styles.badge}`}>
                      {badge.rarity}
                    </Badge>
                  </div>

                  <img src={badge.iconPath} alt={badge.name} className="h-max w-max" />

                  <div className="text-center space-y-1 w-full">
                    <p className={`font-semibold truncate ${!badge.isEarned && 'text-muted-foreground'}`}>
                      {badge.name}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2 min-h-[2.5em]">
                      {badge.description}
                    </p>
                    {badge.isEarned && badge.earnedAt && (
                      <div className="text-[10px] text-emerald-500 font-medium pt-1">
                        Didapat pada {new Date(badge.earnedAt).toLocaleDateString('id-ID')}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
          )}
    </div>
  );
}
