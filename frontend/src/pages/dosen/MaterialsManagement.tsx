import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash, FileText } from 'lucide-react';
import { MaterialDialog } from '@/components/dosen/MaterialDialog';
import { DeleteMaterialDialog } from '@/components/dosen/DeleteMaterialDialog';
import { getLevels } from '@/services/LevelService';
import type { Level, Material } from '@/types';
import { createMaterial, deleteMaterial, getMaterials, updateMaterial } from '@/services/MaterialService';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

/**
 * Materials Management Page for Dosen
 */
export default function MaterialsManagement() {
  const [filterLevel, setFilterLevel] = useState('all');
  const [materials, setMaterials] = useState<Material[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Load levels
        const levelsResponse = await getLevels();
        if (levelsResponse.success) {
          setLevels(levelsResponse.data || []);
        } else {
          setError(levelsResponse.message);
        }

        // Load materials
        const materialsResponse = await getMaterials();
        if (materialsResponse.success) {
          setMaterials(materialsResponse.data || []);
        } else {
          setError(materialsResponse.message);
        }
      } catch (err) {
        setError("Failed to fetch data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const loadMaterials = async () => {
    setLoading(true);
    setError(null);
    const response = await getMaterials();
    if (response.success) {
      setMaterials(response.data || []);
    } else {
      setError(response.message);
    }
    setLoading(false);
  };

  // Handlers
  const handleCreate = async (data: any) => {
    setLoading(true);
    setError(null);
    const response = await createMaterial(data);
    if (response.success) {
      await loadMaterials();
      setIsCreateOpen(false);
    } else {
      setError(response.message);
    }
    setLoading(false);
  };

  const handleEdit = async (data: any) => {
    if (!selectedMaterial) return;
    setLoading(true);
    setError(null);

    const newOrder  = Number(data.order);
    const oldOrder  = selectedMaterial.order;
    const newLevelId = Number(data.levelId || selectedMaterial.levelId);
    const oldLevelId = selectedMaterial.levelId;
    const levelChanged = newLevelId !== oldLevelId;

    try {
      // Swap hanya berlaku jika level sama tapi urutan berubah
      if (!levelChanged && newOrder !== oldOrder) {
        const conflicting = materials.find(
          m => m.levelId === newLevelId && m.order === newOrder && m.id !== selectedMaterial.id
        );
        if (conflicting) {
          // Pindahkan dulu materi konflik ke urutan lama
          const swapRes = await updateMaterial(conflicting.id, { order: oldOrder });
          if (!swapRes.success) {
            setError(`Gagal menukar urutan: ${swapRes.message}`);
            setLoading(false);
            return;
          }
        }
      }

      // Update materi yang diedit
      const payload = {
        levelId: newLevelId,
        title: data.title,
        content: data.content,
        order: newOrder,
      };
      const response = await updateMaterial(selectedMaterial.id, payload);
      if (response.success) {
        await loadMaterials();
        setIsEditOpen(false);
      } else {
        setError(response.message);
        setLoading(false);
      }
    } catch {
      setError('Terjadi kesalahan saat menyimpan perubahan.');
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedMaterial) return;
    setLoading(true);
    setError(null);
    const response = await deleteMaterial(selectedMaterial.id);
    if (response.success) {
      await loadMaterials();
      setIsDeleteOpen(false);
      setSelectedMaterial(null);
    } else {
      setError(response.message);
    }
    setLoading(false);
  };

  const openEdit = (material: Material) => {
    setSelectedMaterial(material);
    setIsEditOpen(true);
  };

  const openDelete = (material: Material) => {
    setSelectedMaterial(material);
    setIsDeleteOpen(true);
  };

  const filteredMaterials = filterLevel === 'all'
    ? materials
    : materials.filter(m => m.levelId === Number(filterLevel));

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

      {loading && (
        <div className="flex items-center justify-center p-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-lg">Memuat data...</span>
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!loading && !error && (
        <Card>
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Daftar Materi</CardTitle>
              <Select value={filterLevel} onValueChange={setFilterLevel}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Level</SelectItem>
                  {levels.map(lvl => (
                    <SelectItem key={lvl.id} value={String(lvl.id)}>{lvl.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className='border-t '>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead >Level</TableHead>
                  <TableHead className="text-center w-[80px]">Urutan</TableHead>
                  <TableHead className="text-center">Judul Materi</TableHead>
                  <TableHead className="text-center w-[120px]">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMaterials.length > 0 ? (
                  filteredMaterials.map((material, index) => (
                    <TableRow key={material.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {(material as any).level?.name ?? `Level ${material.levelId}`}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">{material.order}</TableCell>
                      <TableCell className="font-bold text-center">{material.title}</TableCell>
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
      )}

      {/* CREATE DIALOG */}
      <MaterialDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSubmit={handleCreate}
        levels={levels}
        materials={materials}
      />

      {/* EDIT DIALOG */}
      <MaterialDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        material={selectedMaterial || undefined}
        onSubmit={handleEdit}
        levels={levels}
        materials={materials}
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
