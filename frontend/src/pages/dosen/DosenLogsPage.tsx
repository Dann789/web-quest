import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Activity, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

/**
 * Admin Activity Logs Page (Monitoring Progress)
 * Menampilkan status materi, challenge, progress, dan XP user
 */
export default function DosenLogsPage() {
  const [levelFilter, setLevelFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock Data User Progress
  // Rule: Easy Max 5, Medium Max 10, Hard Max 3
  const userProgressData = [
    { 
      id: 1, 
      username: 'AlexCode', 
      avatar: 'AC',
      materialStatus: 'completed', 
      challenges: { easy: 5, medium: 3, hard: 1 },
      progress: 100,
      totalXp: 3200,
      currentLevel: 'HTML Basics'
    },
    { 
      id: 2, 
      username: 'SarahDev', 
      avatar: 'SD',
      materialStatus: 'in-progress',
      challenges: { easy: 4, medium: 2, hard: 0 },
      progress: 75,
      totalXp: 2950,
      currentLevel: 'CSS Styling'
    },
    { 
      id: 3, 
      username: 'JohnDoe', 
      avatar: 'JD',
      materialStatus: 'in-progress',
      challenges: { easy: 2, medium: 0, hard: 0 },
      progress: 30,
      totalXp: 1800,
      currentLevel: 'HTML Basics'
    },
    { 
      id: 4, 
      username: 'NewbieUser', 
      avatar: 'NU',
      materialStatus: 'not-started',
      challenges: { easy: 0, medium: 0, hard: 0 },
      progress: 0,
      totalXp: 0,
      currentLevel: 'HTML Basics'
    },
    { 
      id: 5, 
      username: 'ProCoder', 
      avatar: 'PC',
      materialStatus: 'completed',
      challenges: { easy: 5, medium: 10, hard: 3 }, // Maxed out
      progress: 100,
      totalXp: 5400,
      currentLevel: 'JavaScript Advanced'
    },
  ];

  // Filter Logic
  const filteredData = userProgressData.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = levelFilter === 'all' || 
      (levelFilter === 'html' && user.currentLevel.includes('HTML')) ||
      (levelFilter === 'css' && user.currentLevel.includes('CSS')) ||
      (levelFilter === 'js' && user.currentLevel.includes('JavaScript'));
    
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Activity className="h-8 w-8 text-primary" />
            Log Aktivitas Mahasiswa
          </h1>
          <p className="text-muted-foreground mt-2">
            Monitoring progress belajar dan pencapaian mahasiswa
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4 flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari user..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Level</SelectItem>
                <SelectItem value="html">HTML</SelectItem>
                <SelectItem value="css">CSS</SelectItem>
                <SelectItem value="js">JavaScript</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Main Data Table */}
      <Card>
        <CardHeader>
           <CardTitle>Progress Monitoring</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Level Saat Ini</TableHead>
                <TableHead>Status Materi</TableHead>
                <TableHead className="text-center">Challenges (E / M / H)</TableHead>
                <TableHead>Progress Level</TableHead>
                <TableHead className="text-right">Total XP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((data) => (
                  <TableRow key={data.id}>
                    {/* User Info */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{data.avatar}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{data.username}</span>
                      </div>
                    </TableCell>

                    {/* Current Level */}
                    <TableCell>
                      <Badge variant="outline">{data.currentLevel}</Badge>
                    </TableCell>

                    {/* Material Status */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {data.materialStatus === 'completed' ? (
                          <Badge variant="default" className="bg-emerald-500 hover:bg-emerald-600">Selesai</Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-slate-200 text-slate-600 hover:bg-slate-300">Belum</Badge>
                        )}
                      </div>
                    </TableCell>

                    {/* Challenges Breakdown */}
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <div className="flex flex-col items-center px-2 py-1 bg-green-500/10 rounded border border-green-500/20 w-[60px]" title="Easy (Max 5)">
                          <span className="text-[10px] text-muted-foreground font-bold">EZY</span>
                          <span className="text-sm font-bold text-green-600">{data.challenges.easy}/5</span>
                        </div>
                        <div className="flex flex-col items-center px-2 py-1 bg-amber-500/10 rounded border border-amber-500/20 w-[60px]" title="Medium (Max 10)">
                          <span className="text-[10px] text-muted-foreground font-bold">MED</span>
                          <span className="text-sm font-bold text-amber-600">{data.challenges.medium}/10</span>
                        </div>
                        <div className="flex flex-col items-center px-2 py-1 bg-red-500/10 rounded border border-red-500/20 w-[60px]" title="Hard (Max 3)">
                          <span className="text-[10px] text-muted-foreground font-bold">HRD</span>
                          <span className="text-sm font-bold text-red-600">{data.challenges.hard}/3</span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Progress Bar */}
                    <TableCell className="w-[200px]">
                      <div className="flex items-center gap-2">
                        <Progress value={data.progress} className="h-2 flex-1" />
                        <span className="text-xs font-bold w-9 text-right">{data.progress}%</span>
                      </div>
                    </TableCell>

                    {/* Total XP */}
                    <TableCell className="text-right">
                      <span className="font-mono font-bold text-primary">{data.totalXp.toLocaleString()} XP</span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                 <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <p>Tidak ada data ditemukan</p>
                        </div>
                    </TableCell>
                 </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
