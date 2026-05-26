import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, ChevronLeft, ChevronRight, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Image from '@tiptap/extension-image'
import Highlight from '@tiptap/extension-highlight'
import { TableKit } from '@tiptap/extension-table';
import { InteractiveCodeBlock } from '../extensions/InteractiveCodeBlock/InteractiveCodeBlockExtension';
import { createLowlight, common } from 'lowlight'
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { Material } from '@/types';
import { toast } from 'sonner';
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isUnderstood, setIsUnderstood] = useState(false);

  // Animation states
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
    } else if (shouldRender) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, 300); // durasi animasi 300ms
      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldRender]);

  useEffect(() => {
    if (!isOpen) return;
    
    // Reset state saat modal baru dibuka
    setCurrentIndex(0);
    setViewedMaterial([]);

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

  const lowlight = createLowlight(common);
  const currentMaterial = materials[currentIndex];
  const totalMaterials = materials.length;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-md max-w-full h-auto',
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'block rounded-md bg-slate-950 p-4 text-sm text-slate-50 font-mono',
        },
      }),
      Highlight,
      TableKit.configure({
        table: {
          resizable: true,
          HTMLAttributes: {
            class: 'border-collapse table-auto w-full border border-slate-300 dark:border-slate-700',
          },
        },
        tableHeader: {
          HTMLAttributes: {
            class: 'border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-2 font-bold text-left',
          },
        },
        tableCell: {
          HTMLAttributes: {
            class: 'border border-slate-300 dark:border-slate-700 p-2',
          },
        },
      }),
      InteractiveCodeBlock,
    ],
    content: '',
    editable: false,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base dark:prose-invert max-w-none focus:outline-none tiptap-modal-render',
      },
    },
  });

  useEffect(() => {
    if (currentMaterial && editor) {
      editor.commands.setContent(currentMaterial.content || '');
    }
  }, [currentMaterial, editor]);

  // Reset states and handle initial scroll calculation when material changes
  useEffect(() => {
    setScrollProgress(0);
    setIsUnderstood(false);
    
    const container = document.getElementById('scrollable-material-container');
    if (container) {
      container.scrollTop = 0;
      // Beri sedikit jeda agar konten Tiptap selesai dirender sebelum mengecek scrollHeight
      setTimeout(() => {
        if (container.scrollHeight <= container.clientHeight) {
          setScrollProgress(100);
        }
      }, 150);
    }
  }, [currentIndex, currentMaterial]);

  const handleClose = () => {
    onClose();
  };

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
      let allNewBadges: any[] = [];
      
      for (const materialId of viewedMaterial) {
        const res = await updateStatusMaterial(user.id, materialId);
        if (res.data?.xpAwarded) {
          earnedXp += res.data.xpAwarded;
        }
        if (res.data?.newBadges?.length) {
          allNewBadges = [...allNewBadges, ...res.data.newBadges];
        }
      }
      
      if (allNewBadges.length > 0) {
        setTimeout(() => {
          allNewBadges.forEach((badge: any, index: number) => {
            setTimeout(() => {
              toast.success(`🏆 Badge Baru: ${badge.name}`, {
                description: badge.description || "Pencapaian baru berhasil diraih!",
                duration: 6000,
              });
            }, index * 800);
          });
        }, 500);
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

  if (!shouldRender) return null;

  return (
    <div className={cn(
      "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 duration-300",
      isClosing ? "animate-out fade-out" : "animate-in fade-in"
    )}>
      <Card className={cn(
        "w-full max-w-4xl h-[90vh] rounded-3xl flex flex-col shadow-2xl duration-300 border-slate-800 bg-slate-900 text-slate-100",
        isClosing ? "animate-out zoom-out-95" : "animate-in zoom-in-95"
      )}>
        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-800 bg-slate-900 pb-4 shrink-0 rounded-t-3xl">
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

        {/* Indikator Progres Membaca */}
        {!loading && !error && totalMaterials > 0 && (
          <div className="w-full h-1 bg-slate-800 shrink-0">
            <div 
              className="h-full bg-indigo-500 transition-all duration-150 ease-out"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        )}

        <CardContent 
          id="scrollable-material-container"
          onScroll={(e) => {
            const target = e.target as HTMLDivElement;
            const scrollTop = target.scrollTop;
            const scrollHeight = target.scrollHeight;
            const clientHeight = target.clientHeight;

            if (scrollHeight > clientHeight) {
              const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
              setScrollProgress(progress);
            } else {
              setScrollProgress(100);
            }
          }}
          className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800"
        >

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
            <div key={currentIndex} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="tiptap-render-container">
                 <EditorContent editor={editor} />
               </div>

               {/* Syarat Memahami Materi */}
               <div className="mb-4 p-4 border border-indigo-500/20 bg-indigo-500/5 rounded-lg flex items-center gap-3 transition-colors hover:bg-indigo-500/10">
                 <input 
                   type="checkbox" 
                   id={`understood-${currentIndex}`}
                   checked={isUnderstood}
                   onChange={(e) => setIsUnderstood(e.target.checked)}
                   className="w-5 h-5 rounded accent-indigo-500 cursor-pointer shrink-0"
                 />
                 <label htmlFor={`understood-${currentIndex}`} className="text-sm sm:text-base font-medium text-slate-200 cursor-pointer select-none flex-1">
                   Saya telah membaca dan memahami materi ini
                 </label>
               </div>
            </div>
          )}
        </CardContent>

        {/* Footer Navigasi */}
        {!loading && !error && totalMaterials > 0 && (
          <div className="p-4 border-t rounded-b-3xl border-slate-800 bg-slate-900 shrink-0 flex justify-between items-center">
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
                className="bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-slate-700 disabled:text-slate-400"
                disabled={!isUnderstood}
              >
                Selanjutnya <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                className="bg-emerald-600 hover:bg-emerald-700 text-white disabled:bg-slate-700 disabled:text-slate-400"
                onClick={handleFinishLearning}
                disabled={!isUnderstood}
              >
                Selesai Belajar <CheckCircle className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        )}

        {/* Footer jika error / empty - tetap tampilkan tombol tutup */}
        {!loading && (error || totalMaterials === 0) && (
          <div className="p-4 border-t rounded-b-3xl border-slate-800 bg-slate-900 shrink-0 flex justify-end">
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
