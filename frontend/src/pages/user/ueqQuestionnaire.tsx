import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getUeqQuestions, submitUeq } from '@/services/user/UeqService';
import type { ueqItem } from '@/types';
import { toast } from 'sonner';

export default function UeqQuestionnairePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState<ueqItem[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = useCallback (async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getUeqQuestions();
      if (response && response.success && Array.isArray(response.data)) {
        setItems(response.data);
      } else {
        setItems([]);
      }
    } catch (error) {
      setError("Terjadi kesalahan saat memuat data kuesioner");
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSelect = (itemId: number, value: number) => {
    setAnswers(prev => ({ ...prev, [itemId]: value }));
  };

  const isComplete = Object.keys(answers).length === items.length;

  const handleSubmit = async () => {
    if (!user?.id) return;
    setIsSubmitting(true);
    setError("");
    try {
      const submitData = {
        answer: Object.entries(answers).map(([questionId, value]) => ({
          questionId: Number(questionId),
          value: value
        }))
      };
      const response = await submitUeq(user.id, submitData);
      if (response.success) {
        toast.success('Penilaian berhasil terkirim');
        navigate('/kuesioner');
      } else {
        setError(response.message || "Gagal mengirim kuesioner");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setError("Terjadi kesalahan saat mengirim jawaban");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <span className="text-emerald-500">{Object.keys(answers).length}</span> / {items.length} Terjawab
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        <div className="max-w-4xl mx-auto px-6 pt-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight mb-4">User Experience Questionnaire</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Silakan nilai pengalaman Anda dalam menggunakan platform ini. Pilih salah satu lingkaran di antara dua kata sifat yang paling menggambarkan perasaan Anda.
            </p>
          </div>

          <div className="space-y-6">
            {loading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
              </div>
            ) : items.map((item) => (
              <Card key={item.id} className="p-6 md:p-8 rounded-3xl border-0 shadow-sm ring-1 ring-border/50 bg-card hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  
                  <div className="w-full md:w-1/4 text-center md:text-right font-semibold text-lg text-foreground/80">
                    {item.leftWord}
                  </div>

                  <RadioGroup 
                    className="flex flex-row items-center justify-center gap-2 md:gap-4 w-full md:w-2/4"
                    value={answers[item.id]?.toString() || ""}
                    onValueChange={(value) => handleSelect(item.id, parseInt(value))}
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map((val) => {
                      const isSelected = answers[item.id] === val;
                      return (
                        <div key={val} className="flex flex-col items-center justify-center gap-2 group">
                          <span className={`text-xs md:text-sm font-medium transition-colors ${isSelected ? 'text-emerald-600' : 'text-muted-foreground group-hover:text-emerald-500'}`}>
                            {val}
                          </span>
                          <div className="relative flex items-center justify-center">
                            <RadioGroupItem
                              value={val.toString()}
                              id={`item-${item.id}-${val}`}
                              className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 [&_svg]:hidden ${
                                isSelected 
                                  ? 'bg-emerald-500 border-emerald-500 text-white scale-110 shadow-lg shadow-emerald-500/30' 
                                  : 'bg-transparent border-border hover:border-emerald-400 hover:bg-emerald-50'
                              }`}
                            />
                            {isSelected && <div className="absolute pointer-events-none w-2 h-2 rounded-full bg-white" />}
                          </div>
                        </div>
                      );
                    })}
                  </RadioGroup>

                  <div className="w-full md:w-1/4 text-center md:text-left font-semibold text-lg text-foreground/80">
                    {item.rightWord}
                  </div>

                </div>
              </Card>
            ))}
          </div>

          {error && (
            <div className="mt-8 p-4 bg-destructive/10 text-destructive rounded-xl flex items-center justify-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}
          <div className="mt-8 flex justify-end">
            <Button 
              size="lg" 
              onClick={handleSubmit}
              className={`rounded-full px-10 h-14 text-lg font-semibold transition-all ${
                isComplete && !isSubmitting
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/25 hover:-translate-y-1' 
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
              disabled={!isComplete || isSubmitting}
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