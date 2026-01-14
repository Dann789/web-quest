import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash, FileText } from 'lucide-react';
import { MaterialDialog } from '@/components/dosen/MaterialDialog';
import { DeleteMaterialDialog } from '@/components/dosen/DeleteMaterialDialog';

/**
 * Materials Management Page for Dosen
 */
export default function MaterialsManagement() {
  const [filterLevel, setFilterLevel] = useState('all');
  
  // Dialog States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<any>(null);

  // Mock Available Levels (Should come from API)
  const availableLevels = [
    { id: 1, name: 'HTML Basics' },
    { id: 2, name: 'CSS Styling' },
    { id: 3, name: 'JavaScript Novice' },
  ];

  // Mock Data
  const [materials, setMaterials] = useState([
    { id: 1, level: 'HTML Basics', levelId: 1, title: 'Apa itu HTML?', xpReward: 50, order: 1, content: '# Apa itu HTML?\n\nHTML adalah...' },
    { id: 2, level: 'HTML Basics', levelId: 1, title: 'Struktur Dasar HTML', xpReward: 50, order: 2, content: '# Struktur Dasar\n\nBerikut adalah struktur...' },
    { id: 3, level: 'CSS Styling', levelId: 2, title: 'Introduction to CSS', xpReward: 50, order: 1, content: '# CSS\n\nCSS digunakan untuk...' },
  ]);

  // Handlers
  const handleCreate = (data: any) => {
    const newId = Math.max(...materials.map(m => m.id)) + 1;
    const levelName = availableLevels.find(l => l.id.toString() === data.levelId)?.name || 'Unknown';
    setMaterials([...materials, { ...data, id: newId, level: levelName }]);
    console.log('Created Material:', data);
  };

  const handleEdit = (data: any) => {
    const levelName = availableLevels.find(l => l.id.toString() === data.levelId)?.name || 'Unknown';
    setMaterials(materials.map(m => m.id === selectedMaterial.id ? { ...m, ...data, level: levelName } : m));
    console.log('Edited Material:', data);
  };

  const handleDelete = () => {
    setMaterials(materials.filter(m => m.id !== selectedMaterial.id));
    setIsDeleteOpen(false);
    console.log('Deleted Material ID:', selectedMaterial.id);
  };

  const openEdit = (material: any) => {
    setSelectedMaterial(material);
    setIsEditOpen(true);
  };

  const openDelete = (material: any) => {
    setSelectedMaterial(material);
    setIsDeleteOpen(true);
  };

  const filteredMaterials = filterLevel === 'all' 
    ? materials 
    : materials.filter(m => m.level === filterLevel); // Note: filterLevel logic might need adjustment based on value, here simplifying

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FileText className="h-8 w-8" /> 
            Manajemen Materi
          </h1>
          <p className="text-muted-foreground mt-2">Kelola materi pembelajaran untuk setiap level</p>
        </div>
        <Button className="gap-2" onClick={() => setIsCreateOpen(true)}>
          <Plus className="h-4 w-4" /> Tambah Materi
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Daftar Materi</CardTitle>
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
                <TableHead className="text-center w-[80px]">Urutan</TableHead>
                <TableHead>Judul Materi</TableHead>
                <TableHead>XP Reward</TableHead>
                <TableHead className="text-center w-[120px]">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMaterials.length > 0 ? (
                filteredMaterials.map((material) => (
                  <TableRow key={material.id}>
                    <TableCell className="font-medium text-primary">{material.level}</TableCell>
                    <TableCell className="text-center">{material.order}</TableCell>
                    <TableCell className="font-bold">{material.title}</TableCell>
                    <TableCell>{material.xpReward} XP</TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => openEdit(material)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => openDelete(material)}
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
                    Tidak ada materi ditemukan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* CREATE DIALOG */}
      <MaterialDialog 
        open={isCreateOpen} 
        onOpenChange={setIsCreateOpen} 
        onSubmit={handleCreate}
        levels={availableLevels}
      />

      {/* EDIT DIALOG */}
      <MaterialDialog 
        open={isEditOpen} 
        onOpenChange={setIsEditOpen} 
        material={selectedMaterial}
        onSubmit={handleEdit}
        levels={availableLevels}
      />

      {/* DELETE DIALOG */}
      <DeleteMaterialDialog 
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDelete}
        materialTitle={selectedMaterial?.title}
      />
    </div>
  );
}
