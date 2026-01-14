import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash, Layers } from 'lucide-react';
import { LevelDialog } from '@/components/dosen/LevelDialog';
import { DeleteLevelDialog } from '@/components/dosen/DeleteLevelDialog';

/**
 * Levels Management Page for Dosen
 */
export default function LevelsManagement() {
  // Mock Data
  const [levels, setLevels] = useState([
    { id: 1, name: 'HTML Basics', order: 1, xpRequired: 0, description: 'Pengenalan dasar HTML' },
    { id: 2, name: 'CSS Styling', order: 2, xpRequired: 500, description: 'Dasar styling dengan CSS' },
    { id: 3, name: 'JavaScript Novice', order: 3, xpRequired: 1200, description: 'Logika pemrograman dasar JS' },
  ]);

  // Dialog States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<any>(null);

  // Handlers
  const handleCreate = (data: any) => {
    // Di sini nanti panggil API create
    const newId = Math.max(...levels.map(l => l.id)) + 1;
    setLevels([...levels, { ...data, id: newId }]);
    console.log('Created:', data);
  };

  const handleEdit = (data: any) => {
    // Di sini nanti panggil API update
    setLevels(levels.map(l => l.id === selectedLevel.id ? { ...l, ...data } : l));
    console.log('Edited:', data, 'for ID:', selectedLevel.id);
  };

  const handleDelete = () => {
    // Di sini nanti panggil API delete
    setLevels(levels.filter(l => l.id !== selectedLevel.id));
    setIsDeleteOpen(false);
    console.log('Deleted ID:', selectedLevel.id);
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
        <Button className="gap-2" onClick={() => setIsCreateOpen(true)}>
          <Plus className="h-4 w-4" /> Tambah Level
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center w-[80px]">No</TableHead>
                <TableHead>Nama Level</TableHead>
                <TableHead>XP Requirement</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead className="text-center w-[120px]">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {levels.length > 0 ? (
                levels.map((level) => (
                  <TableRow key={level.id}>
                    <TableCell className="font-bold text-center bg-muted/30">{level.order}</TableCell>
                    <TableCell className="font-medium">{level.name}</TableCell>
                    <TableCell>{level.xpRequired} XP</TableCell>
                    <TableCell className="text-muted-foreground truncate max-w-[300px]">{level.description}</TableCell>
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
