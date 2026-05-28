import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { User, Zap, Award, Calendar, Edit, Loader2 } from 'lucide-react';
import { EditProfileDialog } from '@/components/user/EditProfileDialog';
import { getUserBadges } from '@/services/user/BadgeService';
import { BadgeCard } from '@/components/user/BadgeCard';
import type { BadgeItem } from '@/types';
import { getQuestionnaireStatus } from '@/services/user/ProgressService';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [badges, setBadges] = useState<(BadgeItem & { isEarned: boolean, earnedAt: string | null })[]>([]);
  const [questionnaireCompleted, setQuestionnaireCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user?.id) return;

    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const [badgesRes, qRes] = await Promise.all([
          getUserBadges(user.id),
          getQuestionnaireStatus(user.id)
        ]);

        if (badgesRes.success && badgesRes.data) {
          setBadges(badgesRes.data.all);
        } else {
          setError(badgesRes.message || 'Failed to fetch badges');
        }

        if (qRes.success && qRes.data) {
          setQuestionnaireCompleted(qRes.data.ueqCompleted && qRes.data.mrcCompleted);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError('Failed to fetch profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user?.id]);

  const handleEditProfile = (updatedUser: any) => {
    updateUser(updatedUser);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Profile</h1>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30">
          <Zap className="h-5 w-5 text-emerald-400" />
          <span className="text-lg font-bold text-emerald-400">
            {questionnaireCompleted ? `${user?.totalXp.toLocaleString()} XP` : "🔒 Terkunci"}
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
                return (
                  <BadgeCard
                    key={badge.id}
                    badge={badge}
                  />
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
