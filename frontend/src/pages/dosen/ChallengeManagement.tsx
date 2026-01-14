import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash, Puzzle } from 'lucide-react';
import { ChallengeDialog } from '@/components/dosen/ChallengeDialog';
import { DeleteChallengeDialog } from '@/components/dosen/DeleteChallengeDialog';

/**
 * Challenge Management Page for Dosen
 */
export default function ChallengeManagement() {
  const [filterLevel, setFilterLevel] = useState('all');

  // Dialog States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null);

  // Mock available levels
  const availableLevels = [
    { id: 1, name: 'HTML Basics' },
    { id: 2, name: 'CSS Styling' },
    { id: 3, name: 'JavaScript Novice' },
  ];

  // Mock Data
  const [challenges, setChallenges] = useState([
    { id: 1, level: 'HTML Basics', levelId: 1, title: 'Buat Paragraf', difficulty: 'EASY', type: 'Coding', method: 'CODING_MANUAL', xp: 10, questionContent: 'Buat elemen p' },
    { id: 2, level: 'HTML Basics', levelId: 1, title: 'Struktur List', difficulty: 'MEDIUM', type: 'Drag & Drop', method: 'DRAG_AND_DROP', xp: 20, questionContent: 'Urutkan list' },
    { id: 3, level: 'CSS Styling', levelId: 2, title: 'Flexbox Froggy', difficulty: 'HARD', type: 'Coding', method: 'CODING_MANUAL', xp: 30, questionContent: 'Pindahkan katak' },
  ]);

  // Handlers
  const handleCreate = (data: any) => {
    const newId = Math.max(...challenges.map(c => c.id)) + 1;
    const levelName = availableLevels.find(l => l.id.toString() === data.levelId)?.name || 'Unknown';
    // Map method enum to Display type for simple table view if needed
    const typeDisplay = data.method === 'CODING_MANUAL' || data.method === 'FIX_THE_BUG' ? 'Coding' : data.method === 'DRAG_AND_DROP' ? 'Drag & Drop' : 'Scenario';
    
    setChallenges([...challenges, { ...data, id: newId, level: levelName, type: typeDisplay, xp: data.xpBase }]);
    console.log('Created Challenge:', data);
  };

  const handleEdit = (data: any) => {
    const levelName = availableLevels.find(l => l.id.toString() === data.levelId)?.name || 'Unknown';
    const typeDisplay = data.method === 'CODING_MANUAL' || data.method === 'FIX_THE_BUG' ? 'Coding' : data.method === 'DRAG_AND_DROP' ? 'Drag & Drop' : 'Scenario';

    setChallenges(challenges.map(c => c.id === selectedChallenge.id ? { ...c, ...data, level: levelName, type: typeDisplay, xp: data.xpBase } : c));
    console.log('Edited Challenge:', data);
  };

  const handleDelete = () => {
    setChallenges(challenges.filter(c => c.id !== selectedChallenge.id));
    setIsDeleteOpen(false);
    console.log('Deleted Challenge ID:', selectedChallenge.id);
  };

  const openEdit = (challenge: any) => {
    setSelectedChallenge(challenge);
    setIsEditOpen(true);
  };

  const openDelete = (challenge: any) => {
    setSelectedChallenge(challenge);
    setIsDeleteOpen(true);
  };

  const filteredChallenges = filterLevel === 'all' ? challenges : challenges.filter(c => c.level === filterLevel);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Puzzle className="h-8 w-8" /> 
            Manajemen Soal
          </h1>
          <p className="text-muted-foreground mt-2">Buat dan kelola soal tantangan untuk mahasiswa</p>
        </div>
        <Button className="gap-2" onClick={() => setIsCreateOpen(true)}>
          <Plus className="h-4 w-4" /> Tambah Soal
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Bank Soal</CardTitle>
            <Select value={filterLevel} onValueChange={setFilterLevel}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Level</SelectItem>
                {availableLevels.map(lvl => (
                   <SelectItem key={lvl.id} value={lvl.name}>{lvl.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Level</TableHead>
                <TableHead>Judul Soal</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Kesulitan</TableHead>
                <TableHead>XP Base</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredChallenges.length > 0 ? (
                filteredChallenges.map((challenge) => (
                  <TableRow key={challenge.id}>
                    <TableCell className="font-medium text-primary">{challenge.level}</TableCell>
                    <TableCell className="font-bold">{challenge.title}</TableCell>
                    <TableCell>{challenge.type}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`
                        ${challenge.difficulty === 'EASY' ? 'border-green-500 text-green-600 bg-green-50' : 
                          challenge.difficulty === 'MEDIUM' ? 'border-amber-500 text-amber-600 bg-amber-50' : 
                          'border-red-500 text-red-600 bg-red-50'}
                      `}>
                        {challenge.difficulty}
                      </Badge>
                    </TableCell>
                    <TableCell>{challenge.xp} XP</TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => openEdit(challenge)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => openDelete(challenge)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    Tidak ada soal ditemukan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* CREATE DIALOG */}
      <ChallengeDialog 
        open={isCreateOpen} 
        onOpenChange={setIsCreateOpen} 
        onSubmit={handleCreate}
        levels={availableLevels}
      />

      {/* EDIT DIALOG */}
      <ChallengeDialog 
        open={isEditOpen} 
        onOpenChange={setIsEditOpen} 
        challenge={selectedChallenge}
        onSubmit={handleEdit}
        levels={availableLevels}
      />

      {/* DELETE DIALOG */}
      <DeleteChallengeDialog 
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDelete}
        challengeTitle={selectedChallenge?.title}
      />
    </div>
  );
}
