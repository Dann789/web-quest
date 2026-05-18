import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash, Layers } from 'lucide-react';
import { LevelDialog } from '@/components/dosen/LevelDialog';
import { DeleteLevelDialog } from '@/components/dosen/DeleteLevelDialog';
import { getLevels, createLevel, updateLevel, deleteLevel } from '@/services/dosen/LevelService';
import type { Level } from '@/types';
import { toast } from 'sonner';

/**
 * Levels Management Page for Dosen
 */
export default function LevelsManagement() {

  // Helper to determine icon type (brands vs solid)
  const getIconType = (iconName: string) => {
    const brands = ['fa-html5', 'fa-css3', 'fa-js', 'fa-php', 'fa-react', 'fa-vuejs'];
    return brands.includes(iconName) ? 'fa-brands' : 'fa-solid';
  };

  // Dialog States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<any>(null);
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load levels on mount
  useEffect(() => {
    loadLevels();
  }, []);

  const loadLevels = async () => {
    setLoading(true);
    const response = await getLevels();
    if (response.success) {
      setLevels(response.data || []);
    } else {
      setError(response.message);
    }
    setLoading(false);
  };

  // Handlers
  const handleCreate = async (data: any) => {
    setLoading(true);
    const response = await createLevel(data);
    if (response.success) {
      await loadLevels();
    } else {
      setError(response.message);
    }
    setLoading(false);
  };

  const handleEdit = async (data: any) => {
    if (!selectedLevel) return;
    setLoading(true);
    const response = await updateLevel(selectedLevel.id, data);
    if (response.success) {
      await loadLevels();
    } else {
      setError(response.message);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!selectedLevel) return;
    setLoading(true);
    const response = await deleteLevel(selectedLevel.id);
    if (response.success) {
      toast.success('Level berhasil dihapus!');
      await loadLevels();
      setIsDeleteOpen(false);
    } else {
      toast.error('Level gagal dihapus!');
      setError(response.message);
    }
    setLoading(false);
  };

  const openEdit = (level: any) => {
    setSelectedLevel(level);
    setIsEditOpen(true);
  };

  const openDelete = (level: any) => {
    setSelectedLevel(level);
    setIsDeleteOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Layers className="h-8 w-8" />
            Manajemen Level
          </h1>
          <p className="text-muted-foreground mt-2">Kelola urutan dan konten level pembelajaran</p>
        </div>
        <Button className="gap-2" onClick={() => setIsCreateOpen(true)} disabled={loading}>
          <Plus className="h-4 w-4" /> Tambah Level
        </Button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="flex items-center justify-between p-4 rounded-lg bg-destructive/20 border border-destructive/30 text-destructive text-sm">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="ml-4 font-bold text-lg leading-none">×</button>
        </div>
      )}

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center w-[80px]">No</TableHead>
                <TableHead>Nama Level</TableHead>
                <TableHead className="text-center">XP Requirement</TableHead>
                <TableHead className="text-center">Jumlah Soal (E/M/H)</TableHead>
                <TableHead className="text-center">Deskripsi</TableHead>
                <TableHead className="text-center w-[120px]">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      Memuat data...
                    </div>
                  </TableCell>
                </TableRow>
              ) : levels.length > 0 ? (
                levels.map((level, index) => (
                  <TableRow key={level.id}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center h-10 w-10 shrink-0 rounded-md bg-primary/10 text-primary">
                          <i className={`${getIconType(level.iconName || 'fa-code')} ${level.iconName || 'fa-code'} text-lg`} />
                        </div>
                        <span className="font-medium whitespace-nowrap">{level.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{level.xpRequired} XP</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-emerald-500 font-bold">{level.easyNodes}</span>
                        <span className="text-muted-foreground">/</span>
                        <span className="text-amber-500 font-bold">{level.mediumNodes}</span>
                        <span className="text-muted-foreground">/</span>
                        <span className="text-rose-500 font-bold">{level.hardNodes}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-center truncate max-w-[300px]">{level.description}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => openEdit(level)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => openDelete(level)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    Belum ada level yang dibuat.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* CREATE DIALOG */}
      <LevelDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSubmit={handleCreate}
      />

      {/* EDIT DIALOG */}
      <LevelDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        level={selectedLevel}
        onSubmit={handleEdit}
      />

      {/* DELETE DIALOG */}
      <DeleteLevelDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDelete}
        levelName={selectedLevel?.name}
      />
    </div>
  );
}
