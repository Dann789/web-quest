import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, ChevronLeft, ChevronRight, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { Material } from '@/types';
import { useAuth } from "@/contexts/AuthContext";
import { getMaterialsByLevelId } from '@/services/dosen/MaterialService';
import { addProgressMaterial, updateStatusMaterial } from '@/services/user/ProgressService';

interface MaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  levelId: number;
  onMaterialComplete?: () => void;
}

export default function MaterialModal({ isOpen, onClose, levelId, onMaterialComplete }: MaterialModalProps) {
  const { user, updateUser } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewedMaterial, setViewedMaterial] = useState<number[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setCurrentIndex(0);
      try {
        const response = await getMaterialsByLevelId(levelId);
        if (response.success && response.data) {
          // Backend sudah mengurutkan berdasarkan kolom `order` (asc)
          setMaterials(response.data.materials);
        } else {
          setError(response.message || 'Gagal memuat materi.');
        }
      } catch (err) {
        setError('Terjadi kesalahan saat memuat materi.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isOpen, levelId]);

  const handleClose = () => {
    setCurrentIndex(0);
    setViewedMaterial([]);
    onClose();
  };

  const currentMaterial = materials[currentIndex];
  const totalMaterials = materials.length;

  useEffect(() => {
    const recordProgress = async () => {
      if (isOpen && currentMaterial && user?.id) {
        try {
          addProgressMaterial(user.id, currentMaterial.id);
          setViewedMaterial((prev) => Array.from(new Set([...prev, currentMaterial.id])));
        } catch (err) {
          console.error("Gagal menyimpan progres materi", err);
        }
      }
    };
    recordProgress();
  }, [isOpen, currentMaterial, user?.id]);

  const handleFinishLearning = async () => {
    if (!user?.id || viewedMaterial.length === 0) {
      handleClose();
      return;
    }

    try {
      let earnedXp = 0;
      for (const materialId of viewedMaterial) {
        const res = await updateStatusMaterial(user.id, materialId);
        if (res.data?.xpAwarded) {
          earnedXp += res.data.xpAwarded;
        }
      }
      
      if (earnedXp > 0) {
         updateUser({ ...user, totalXp: user.totalXp + earnedXp });
      }

      if (onMaterialComplete) {
         onMaterialComplete();
      }

      handleClose();
    } catch (err) {
      console.error("Gagal mengupdate progres materi", err);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
      <Card className="w-full max-w-4xl h-[85vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 border-slate-800 bg-slate-900 text-slate-100">
        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-800 bg-slate-900 pb-4 shrink-0">
          <div>
            {!loading && !error && totalMaterials > 0 && (
              <Badge variant="outline" className="mb-2 bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
                Materi Pembelajaran {currentIndex + 1} / {totalMaterials}
              </Badge>
            )}
            <CardTitle className="text-xl text-white">
              {loading
                ? 'Memuat Materi...'
                : error
                ? 'Terjadi Kesalahan'
                : currentMaterial?.title ?? 'Materi Tidak Tersedia'}
            </CardTitle>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800">

          {/* Loading State */}
          {loading && (
            <div className="h-full flex flex-col items-center justify-center gap-3 text-slate-400">
              <Loader2 className="h-10 w-10 animate-spin text-indigo-400" />
              <p>Memuat materi pembelajaran...</p>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="h-full flex flex-col items-center justify-center gap-3 text-red-400">
              <AlertCircle className="h-10 w-10" />
              <p className="font-semibold">Gagal memuat materi</p>
              <p className="text-sm text-slate-500">{error}</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && totalMaterials === 0 && (
            <div className="h-full flex flex-col items-center justify-center gap-3 text-slate-500">
              <p className="font-semibold">Belum ada materi untuk level ini.</p>
            </div>
          )}

          {/* Materi Content */}
          {!loading && !error && currentMaterial && (
            <div className="prose prose-invert max-w-none prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-800">
              <ReactMarkdown
                components={{
                  code(props) {
                    const { children, className, node, ref, ...rest } = props;
                    const match = /language-(\w+)/.exec(className || '');
                    return match ? (
                      <SyntaxHighlighter
                        {...rest}
                        PreTag="div"
                        children={String(children).replace(/\n$/, '')}
                        language={match[1]}
                        style={atomDark}
                        className="rounded-md !bg-slate-950 !p-4 !m-0"
                      />
                    ) : (
                      <code
                        {...rest}
                        className={cn(
                          'bg-slate-800 px-1.5 py-0.5 rounded text-sm text-indigo-300 font-mono',
                          className
                        )}
                      >
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {currentMaterial.content}
              </ReactMarkdown>
            </div>
          )}
        </CardContent>

        {/* Footer Navigasi */}
        {!loading && !error && totalMaterials > 0 && (
          <div className="p-4 border-t border-slate-800 bg-slate-900 shrink-0 flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="border-slate-700 hover:bg-slate-800 text-slate-300"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Sebelumnya
            </Button>

            {/* Dot Indicators */}
            <div className="flex gap-1">
              {materials.map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    idx === currentIndex ? 'w-8 bg-indigo-500' : 'w-1.5 bg-slate-700'
                  )}
                />
              ))}
            </div>

            {currentIndex < totalMaterials - 1 ? (
              <Button
                onClick={() => setCurrentIndex((prev) => Math.min(totalMaterials - 1, prev + 1))}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Selanjutnya <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={handleFinishLearning}
              >
                Selesai Belajar <CheckCircle className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        )}

        {/* Footer jika error / empty - tetap tampilkan tombol tutup */}
        {!loading && (error || totalMaterials === 0) && (
          <div className="p-4 border-t border-slate-800 bg-slate-900 shrink-0 flex justify-end">
            <Button
              variant="outline"
              onClick={handleClose}
              className="border-slate-700 hover:bg-slate-800 text-slate-300"
            >
              Tutup
            </Button>
          </div>
        )}

      </Card>
    </div>
  );
}
