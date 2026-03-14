import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Edit, Trash, Puzzle, Loader2 } from 'lucide-react';
import { ChallengeDialog } from '@/components/dosen/ChallengeDialog';
import { DeleteChallengeDialog } from '@/components/dosen/DeleteChallengeDialog';
import { getLevels } from '@/services/LevelService';
import {
  getChallenges,
  createChallenge,
  updateChallenge,
  deleteChallenge,
} from '@/services/ChallengeService';
import type { Challenge, Level } from '@/types';

// Label map untuk method
const METHOD_LABELS: Record<string, string> = {
  CODING_MANUAL: 'Coding Manual',
  DRAG_AND_DROP: 'Drag & Drop',
  FIX_THE_BUG: 'Fix The Bug',
};

// Difficulty badge style
const DIFFICULTY_STYLE: Record<string, string> = {
  EASY: 'border-green-500 text-green-600 bg-green-50',
  MEDIUM: 'border-amber-500 text-amber-600 bg-amber-50',
  HARD: 'border-red-500 text-red-600 bg-red-50',
};

export default function ChallengeManagement() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterMethod, setFilterMethod] = useState('all');

  // Dialog states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    const [challengesRes, levelsRes] = await Promise.all([
      getChallenges(),
      getLevels(),
    ]);

    if (challengesRes.success) {
      setChallenges(challengesRes.data || []);
    } else {
      setError(challengesRes.message);
    }

    if (levelsRes.success) {
      setLevels(levelsRes.data || []);
    }

    setLoading(false);
  };

  // Forward form data ke backend — backend yg build JSON content & testCases
  const buildPayload = (data: any) => ({
    levelId: Number(data.levelId),
    title: data.title,
    description: data.description || '',
    difficulty: data.difficulty,
    method: data.method,
    idealTime: Number(data.idealTime) || 60,
    xpBase: Number(data.xpBase),
    hint: data.hint || null,
    isActive: data.isActive ?? true,
    // Field spesifik per metode
    starterCode: data.starterCode ?? null,
    correctAnswer: data.correctAnswer ?? null,
    buggyCode: data.buggyCode ?? null,
    blocks: data.blocks ?? null,
    expectedOrder: data.expectedOrder ?? null,
  });

  // CRUD Handlers
  const handleCreate = async (data: any) => {
    setLoading(true);
    const payload = buildPayload(data);
    const res = await createChallenge(payload as any);
    if (res.success) {
      await loadData();
      setIsCreateOpen(false);
    } else {
      setError(res.message);
      setLoading(false);
    }
  };

  const handleEdit = async (data: any) => {
    if (!selectedChallenge) return;
    setLoading(true);
    const payload = buildPayload(data);
    const res = await updateChallenge(selectedChallenge.id, payload);
    if (res.success) {
      await loadData();
      setIsEditOpen(false);
    } else {
      setError(res.message);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedChallenge) return;
    setLoading(true);
    const res = await deleteChallenge(selectedChallenge.id);
    if (res.success) {
      await loadData();
      setIsDeleteOpen(false);
      setSelectedChallenge(null);
    } else {
      setError(res.message);
      setLoading(false);
    }
  };

  const openEdit = (challenge: any) => {
    setSelectedChallenge(challenge);
    setIsEditOpen(true);
  };

  const openDelete = (challenge: any) => {
    setSelectedChallenge(challenge);
    setIsDeleteOpen(true);
  };

  // Filter logic — by levelId (number) and method (string)
  const filteredChallenges = challenges.filter(c => {
    const passLevel = filterLevel === 'all' || c.levelId === Number(filterLevel);
    const passMethod = filterMethod === 'all' || c.method === filterMethod;
    return passLevel && passMethod;
  });

  // Helper: get level name from nested level object or levels list
  const getLevelName = (c: any) =>
    c.level?.name ?? levels.find(l => l.id === c.levelId)?.name ?? `Level ${c.levelId}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Puzzle className="h-8 w-8" />
            Manajemen Soal
          </h1>
          <p className="text-muted-foreground mt-2">Buat dan kelola soal tantangan untuk mahasiswa</p>
        </div>
        <Button className="gap-2" onClick={() => setIsCreateOpen(true)} disabled={loading}>
          <Plus className="h-4 w-4" /> Tambah Soal
        </Button>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription className="flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="ml-4 font-bold text-lg leading-none">×</button>
          </AlertDescription>
        </Alert>
      )}

      {/* Table Card */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <CardTitle className="text-lg">
              Bank Soal
              {!loading && (
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({filteredChallenges.length} soal)
                </span>
              )}
            </CardTitle>
            <div className="flex gap-2">
              {/* Filter Level */}
              <Select value={filterLevel} onValueChange={setFilterLevel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Level</SelectItem>
                  {levels.map(lvl => (
                    <SelectItem key={lvl.id} value={String(lvl.id)}>{lvl.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Filter Method */}
              <Select value={filterMethod} onValueChange={setFilterMethod}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter Metode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Metode</SelectItem>
                  <SelectItem value="CODING_MANUAL">Coding Manual</SelectItem>
                  <SelectItem value="DRAG_AND_DROP">Drag & Drop</SelectItem>
                  <SelectItem value="FIX_THE_BUG">Fix The Bug</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader className="border-t">
              <TableRow>
                <TableHead className="w-[50px] text-center">No</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Judul Soal</TableHead>
                <TableHead>Metode</TableHead>
                <TableHead className="text-center">Kesulitan</TableHead>
                <TableHead className="text-center">XP</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center w-[100px]">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Memuat data...
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredChallenges.length > 0 ? (
                filteredChallenges.map((challenge, index) => (
                  <TableRow key={challenge.id}>
                    <TableCell className="text-center text-muted-foreground">{index + 1}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {getLevelName(challenge)}
                      </span>
                    </TableCell>
                    <TableCell className="font-medium">{challenge.title}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {METHOD_LABELS[challenge.method] ?? challenge.method}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className={DIFFICULTY_STYLE[challenge.difficulty] ?? ''}
                      >
                        {challenge.difficulty}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center font-mono">{challenge.xpBase} XP</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={challenge.isActive ? 'default' : 'secondary'}>
                        {challenge.isActive ? 'Aktif' : 'Nonaktif'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-1">
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
                  <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                    {filterLevel !== 'all' || filterMethod !== 'all'
                      ? 'Tidak ada soal yang cocok dengan filter.'
                      : 'Belum ada soal yang dibuat.'}
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
        levels={levels}
      />

      {/* EDIT DIALOG */}
      <ChallengeDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        challenge={selectedChallenge}
        onSubmit={handleEdit}
        levels={levels}
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
