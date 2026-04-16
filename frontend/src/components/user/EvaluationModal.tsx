import { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { AlertCircle, ClipboardCheck, Loader2, Send } from 'lucide-react';
import type { mrcWords } from '@/types';
import { getMrcWords, submitEvaluation } from '@/services/user/MrcService';
import { useAuth } from '@/contexts/AuthContext';

interface EvaluationModalPropos {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

export default function EvaluationModal({ isOpen, onClose, onComplete }: EvaluationModalPropos){
  const { user } = useAuth();
  const [words, setWords] = useState<mrcWords[]>([]);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [selectedWords, setSelectedWords] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWords = useCallback (async () => {
    setLoading(true);
    setError("");
    try {
        const responseWords = await getMrcWords();
        if (responseWords.success && responseWords.data) {
            setWords(responseWords.data);
        } else {
            setError(responseWords.message || "Gagal memuat kata-kata");
        }
    } catch (error) {
        console.error("Error fetching MRC words:", error);
        setError("Terjadi kesalahan saat memuat data");
    } finally {
        setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchWords();
    }
  }, [isOpen, fetchWords]);

  const handleSelectWord = (wordId: number) => {
    setSelectedWords((prev) =>
      prev.includes(wordId)
        ? prev.filter((id) => id !== wordId)
        : [...prev, wordId]
    );
  };

  const handleClose = () => {
    setSelectedWords([]);
    setError("");
    onClose();
  };

  const handleConfirmSubmit = async () => {
    if (!user?.id) {
      setError("User tidak terautentikasi");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await submitEvaluation(user.id, {
        mrcWordId: selectedWords,
        reason: reason
      });

      if (response.success) {
        handleClose();
        setIsSuccessOpen(true);
        onComplete?.();
      } else {
        setError(response.message || "Gagal mengirim penilaian");
      }
    } catch (err) {
      console.error("Submit evaluation error:", err);
      setError("Terjadi kesalahan saat mengirim penilaian");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Evaluasi Sistem
          </DialogTitle>
          <DialogDescription>
            Pilih <strong>tepat 5 kata</strong> yang paling menggambarkan pengalaman Anda menggunakan sistem ini ({selectedWords.length}/5)
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Memuat data...</span>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-8 text-destructive">
            <AlertCircle className="w-6 h-6 mr-2" />
            <span>{error}</span>
          </div>
        ) : (
          <div className="py-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
                  {words.map((item) => {
                    const isSelected = selectedWords.includes(item.id);
                    const isDisabled = !isSelected && selectedWords.length >= 5;
                    return (
                      <div
                        key={item.id}
                        onClick={() => !isDisabled && handleSelectWord(item.id)}
                        className={`p-3 rounded-xl border text-sm transition-all duration-200 flex flex-col justify-center gap-1 min-h-[80px] select-none shadow-sm ${
                          isSelected 
                            ? "bg-primary text-primary-foreground border-primary shadow-md scale-[1.02] cursor-pointer ring-2 ring-primary ring-offset-1" 
                            : isDisabled
                              ? "bg-secondary/30 text-muted-foreground/60 border-border/50 cursor-not-allowed opacity-60"
                              : "bg-card text-card-foreground border-border hover:border-primary/50 hover:bg-secondary/50 cursor-pointer"
                        }`}
                        title={item.description}
                      >
                        <span className="font-bold text-center leading-tight">{item.word}</span>
                        <span className="text-[12px] text-center opacity-80 leading-tight">{item.translate}</span>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-6 flex flex-col space-y-2">
                  <label htmlFor="reason" className="text-sm font-semibold">
                    Alasan Pemilihan Kata
                  </label>
                  <textarea
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Ceritakan mengapa Anda memilih kata-kata tersebut. Apa hal yang menurut Anda menarik atau perlu diperbaiki dari aplikasi ini?"
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                  />
                </div>
              </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Batal
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                disabled={loading || selectedWords.length !== 5}
                className="flex items-center gap-2"
              >
                Kirim Penilaian <Send className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Kirim Penilaian?</AlertDialogTitle>
                <AlertDialogDescription>
                  Anda telah memilih 5 kata. Setelah dikirim, Anda tidak dapat mengubah penilaian ini lagi. Apakah Anda yakin ingin mengirimkannya sekarang?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="mt-3">
                <AlertDialogCancel>Periksa Kembali</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirmSubmit}>
                  Ya, Kirim Sekarang
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DialogFooter>
      </DialogContent>
      {/* SUCCESS ALERT - di luar Dialog utama agar tidak ikut unmount */}
    <AlertDialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
      <AlertDialogContent className="border-emerald-500/50 bg-emerald-950">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex flex-col items-center gap-2 text-emerald-500">
            <ClipboardCheck className="w-10 h-10" />
            Penilaian Berhasil Dikirim
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Terima kasih atas penilaian Anda! Masukan yang Anda berikan sangat berarti untuk pengembangan sistem ini kedepannya.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={() => setIsSuccessOpen(false)}
          >
            Tutup
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </Dialog>
  );
}