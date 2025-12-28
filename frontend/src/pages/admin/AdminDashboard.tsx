import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Layers, Puzzle, Activity, Loader2, AlertCircle } from 'lucide-react';
import { getUsers } from '@/services/UserService';
import type { User } from '@/types';
import { useCallback, useEffect, useState } from 'react';

/**
 * Admin Dashboard - Halaman utama untuk Admin
 */
export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError('');

    const result = await getUsers();

    if (result.success && result.data) {
      setUsers(result.data);
    } else {
      setError(result.message || 'Failed to fetch users');
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Stats data - menggunakan isLoading untuk menampilkan placeholder
  const stats = [
    { 
      label: 'Total Users', 
      value: isLoading ? '-' : users.length, 
      icon: Users, 
      color: 'text-blue-400 bg-blue-500/20' 
    },
    { 
      label: 'Total Levels', 
      value: 5, 
      icon: Layers, 
      color: 'text-purple-400 bg-purple-500/20' 
    },
    { 
      label: 'Total Challenges', 
      value: 90, 
      icon: Puzzle, 
      color: 'text-amber-400 bg-amber-500/20' 
    },
    { 
      label: 'Active Today', 
      value: 12, 
      icon: Activity, 
      color: 'text-emerald-400 bg-emerald-500/20' 
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview sistem Web Quest
        </p>
      </div>

      {/* Error State - Ditampilkan jika ada error */}
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/20 border border-destructive/30 text-destructive">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <div>
            <p className="font-medium">Failed to load data</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">
                    {isLoading && stat.label === 'Total Users' ? (
                      <Loader2 className="h-7 w-8 animate-spin" />
                    ) : (
                      stat.value
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-8">
              Activity log akan ditampilkan di sini
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-8">
              Top 5 leaderboard akan ditampilkan di sini
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
