import { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowLeft, CheckCircle2, Check, AlertCircle, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import type { mrcWords } from '@/types';
import { getMrcWords, submitEvaluation } from '@/services/user/MrcService';
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner';

export default function MrcFormPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [words, setWords] = useState<mrcWords[]>([]);
  const [reason, setReason] = useState("");
  const [selectedWords, setSelectedWords] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWords = useCallback(async () => {
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
    fetchWords();
  }, [fetchWords]);


  const handleSelectWord = (wordId: number) => {
    setSelectedWords((prev) =>
      prev.includes(wordId)
        ? prev.filter((id) => id !== wordId)
        : [...prev, wordId]
    );
  };

  const handleSubmit = async () => {
    if (!user?.id) {
      setError("User tidak terautentikasi");
      return;
    }

    setLoading(true);
    setIsSubmitting(true);
    setError("");
    try {
      const response = await submitEvaluation(user.id, {
        mrcWordId: selectedWords,
        reason: reason
      });

      if (response.success) {
        toast.success('Penilaian berhasil terkirim!');
        navigate('/kuesioner');
      } else {
        setError(response.message || "Gagal mengirim penilaian");
      }
    } catch (err) {
      console.error("Submit evaluation error:", err);
      setError("Terjadi kesalahan saat mengirim penilaian");
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  }

  const isComplete = selectedWords.length === 5 && reason.trim() !== "";

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10 pointer-events-none opacity-50" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10 pointer-events-none opacity-50" />

      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 px-6 py-4 flex items-center justify-between">
        <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground" asChild>
          <Link to="/kuesioner">
            <ArrowLeft className="w-4 h-4" /> Kembali
          </Link>
        </Button>
        <div className="text-sm font-medium">
          <span className={selectedWords.length !== 5 ? 'text-amber-500' : 'text-emerald-500'}>
            {selectedWords.length}
          </span> / 5 Kata Terpilih
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        <div className="max-w-5xl mx-auto px-6 pt-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight mb-4">Microsoft Reaction Card</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Pilih <strong className="text-foreground">5 kata</strong> di bawah ini yang paling menggambarkan pengalaman dan perasaan Anda setelah menggunakan sistem.
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 md:gap-3">
            {loading ? (
              <div className="col-span-full flex items-center justify-center py-24">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
              </div>
            ) : words.map((item) => {
              const isSelected = selectedWords.includes(item.id);
              const isDisabled = !isSelected && selectedWords.length >= 5;

              return (
                <TooltipProvider key={item.id}>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => !isDisabled && handleSelectWord(item.id)}
                        disabled={isDisabled}
                        className={`relative p-2 md:p-3 rounded-xl border text-center transition-all duration-200 focus:outline-none flex flex-col items-center justify-center gap-0.5 min-h-[70px] md:min-h-[80px] select-none ${isSelected
                            ? 'bg-emerald-50 border-emerald-500 dark:bg-emerald-500/20 shadow-sm shadow-emerald-500/10 scale-[1.02] ring-1 ring-emerald-500/50 z-10'
                            : isDisabled
                              ? 'bg-secondary/20 border-border/40 cursor-not-allowed opacity-50 grayscale'
                              : 'bg-card border-border/70 hover:border-emerald-300 hover:bg-muted/50 hover:shadow-sm cursor-pointer'
                          }`}
                      >
                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center shadow-sm">
                            <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                          </div>
                        )}

                        <span className={`font-bold text-[13px] md:text-sm leading-tight block ${isSelected ? 'text-emerald-700 dark:text-emerald-300' : isDisabled ? 'text-muted-foreground/70' : 'text-foreground'}`}>
                          {item.word}
                        </span>
                        <span className={`text-[10px] md:text-[11px] leading-tight ${isSelected ? 'text-emerald-600/80 dark:text-emerald-300/80' : isDisabled ? 'text-muted-foreground/50' : 'text-muted-foreground'}`}>
                          {item.translate}
                        </span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className='dark:bg-zinc-900 dark:border-zinc-700'>
                      <p className="max-w-xs text-center">{item.description || "Tidak ada deskripsi"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}

          </div>

          <div className="mt-8 flex flex-col space-y-3">
            <label htmlFor="reason" className="text-lg font-semibold text-foreground">
              Alasan Pemilihan Kata
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Ceritakan mengapa Anda memilih kata-kata tersebut. Apa hal yang menurut Anda menarik atau perlu diperbaiki dari aplikasi ini?"
              className="flex min-h-[120px] w-full rounded-xl border-2 border-border bg-card px-4 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-50 resize-y transition-colors"
            />
          </div>
          {error && (
            <div className="mt-8 p-4 bg-destructive/10 text-destructive rounded-xl flex items-center justify-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}
          <div className="mt-12 flex justify-end">
            <Button
              size="lg"
              onClick={handleSubmit}
              className={`rounded-full px-10 h-14 text-lg font-semibold transition-all ${isComplete
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/25 hover:-translate-y-1'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              disabled={!isComplete}
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
              ) : isComplete && (
                <CheckCircle2 className="w-5 h-5 mr-2" />
              )}
              {isSubmitting ? 'Mengirim...' : 'Kirim Jawaban'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}