import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, Layers, Puzzle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, Cell, ResponsiveContainer, Legend, Tooltip, CartesianGrid, XAxis, YAxis } from 'recharts';

/**
 * Dosen Dashboard
 * Menampilkan statistik utama dan mini leaderboard
 */
export default function DosenDashboard() {
  // Mock Data Stats
  const stats = [
    {
      label: 'Total Mahasiswa',
      value: 120,
      icon: Users,
      color: 'text-blue-400 bg-blue-500/20',
    },
    {
      label: 'Jumlah Level',
      value: 5,
      icon: Layers,
      color: 'text-purple-400 bg-purple-500/20',
    },
    {
      label: 'Jumlah Challenge',
      value: 45,
      icon: Puzzle,
      color: 'text-amber-400 bg-amber-500/20',
    },
  ];

  // Mock Data Leaderboard (Top 5)
  const topStudents = [
    { rank: 1, name: 'Alex Code', xp: 3200, avatar: 'AC' },
    { rank: 2, name: 'Sarah Dev', xp: 2950, avatar: 'SD' },
    { rank: 3, name: 'John Doe', xp: 2800, avatar: 'JD' },
    { rank: 4, name: 'Jane Smith', xp: 2650, avatar: 'JS' },
    { rank: 5, name: 'Mike Ross', xp: 2500, avatar: 'MR' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Dosen</h1>
        <p className="text-muted-foreground mt-1">
          Selamat datang kembali, silahkan kelola materi dan pantau perkembangan mahasiswa.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`p-4 rounded-xl ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dashboard Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions / Info Placeholder (Optional for layout balance) */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Overview Progress Level</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'Level 1', value: 30 },
                      { name: 'Level 2', value: 25 },
                      { name: 'Level 3', value: 20 },
                      { name: 'Level 4', value: 15 },
                      { name: 'Level 5', value: 10 },
                    ]}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                       formatter={(value: number | undefined) => [`${value}% Mahasiswa`, 'Completion']}
                       contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                       itemStyle={{ color: '#333' }}
                       cursor={{ fill: 'transparent' }}
                    />
                    <Legend />
                    <Bar dataKey="value" name="Mahasiswa">
                      {[
                        '#10b981', // Emerald (L1)
                        '#3b82f6', // Blue (L2) 
                        '#8b5cf6', // Violet (L3)
                        '#f59e0b', // Amber (L4)
                        '#ef4444'  // Red (L5)
                      ].map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
             </div>
          </CardContent>
        </Card>
        {/* Mini Leaderboard Widget */}
        <Card className="lg:col-span-1 border-primary/20 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              Top Mahasiswa
            </CardTitle>
            <Link to="/dosen/leaderboard">
              <Button variant="ghost" size="sm" className="text-xs h-8 gap-1">
                Lihat Semua <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-3">
              {topStudents.map((student) => (
                <div key={student.rank} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`
                    w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                    ${student.rank === 1 ? 'bg-amber-100 text-amber-600' : 
                      student.rank === 2 ? 'bg-slate-100 text-slate-600' : 
                      student.rank === 3 ? 'bg-orange-100 text-orange-600' : 'text-muted-foreground'}
                  `}>
                    {student.rank}
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">{student.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{student.name}</p>
                  </div>
                  <Badge variant="secondary" className="font-mono text-xs">
                    {student.xp} XP
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
