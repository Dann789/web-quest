import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UeqQuestionnairePage() {
  // Mockup data for UEQ items
  const ueqItems = [
    { id: 1, left: 'Menyebalkan', right: 'Menyenangkan' },
    { id: 2, left: 'Sulit dipahami', right: 'Mudah dipahami' },
    { id: 3, left: 'Kreatif', right: 'Membosankan' },
    { id: 4, left: 'Mudah dipelajari', right: 'Sulit dipelajari' },
    { id: 5, left: 'Berharga', right: 'Kurang berharga' },
    { id: 6, left: 'Membingungkan', right: 'Jelas' },
  ];

  const [answers, setAnswers] = useState<Record<number, number>>({});

  const handleSelect = (itemId: number, value: number) => {
    setAnswers(prev => ({ ...prev, [itemId]: value }));
  };

  const isComplete = Object.keys(answers).length === ueqItems.length;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10 pointer-events-none opacity-50" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10 pointer-events-none opacity-50" />

      {/* Navigation Bar */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 px-6 py-4 flex items-center justify-between">
        <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground" asChild>
          <Link to="/kuesioner">
            <ArrowLeft className="w-4 h-4" /> Kembali
          </Link>
        </Button>
        <div className="text-sm font-medium">
          <span className="text-emerald-500">{Object.keys(answers).length}</span> / {ueqItems.length} Terjawab
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        <div className="max-w-4xl mx-auto px-6 pt-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight mb-4">User Experience Questionnaire</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Silakan nilai pengalaman Anda dalam menggunakan platform ini. Pilih salah satu lingkaran di antara dua kata sifat yang paling menggambarkan perasaan Anda.
            </p>
          </div>

          {/* Questionnaire Items */}
          <div className="space-y-6">
            {ueqItems.map((item) => (
              <Card key={item.id} className="p-6 md:p-8 rounded-3xl border-0 shadow-sm ring-1 ring-border/50 bg-card hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  
                  {/* Left Adjective */}
                  <div className="w-full md:w-1/4 text-center md:text-right font-semibold text-lg text-foreground/80">
                    {item.left}
                  </div>

                  {/* 7-Point Scale */}
                  <div className="flex items-center justify-center gap-2 md:gap-4 w-full md:w-2/4">
                    {[1, 2, 3, 4, 5, 6, 7].map((val) => {
                      const isSelected = answers[item.id] === val;
                      return (
                        <button
                          key={val}
                          onClick={() => handleSelect(item.id, val)}
                          className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 ${
                            isSelected 
                              ? 'bg-emerald-500 border-emerald-500 text-white scale-110 shadow-lg shadow-emerald-500/30' 
                              : 'bg-transparent border-border hover:border-emerald-400 hover:bg-emerald-50'
                          }`}
                        >
                          {/* Inner dot for unselected state (optional styling) */}
                          {!isSelected && <div className="w-2 h-2 rounded-full bg-border/50 group-hover:bg-emerald-400" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Right Adjective */}
                  <div className="w-full md:w-1/4 text-center md:text-left font-semibold text-lg text-foreground/80">
                    {item.right}
                  </div>

                </div>
              </Card>
            ))}
          </div>

          {/* Submit Action */}
          <div className="mt-12 flex justify-end">
            <Button 
              size="lg" 
              className={`rounded-full px-10 h-14 text-lg font-semibold transition-all ${
                isComplete 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/25 hover:-translate-y-1' 
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
              disabled={!isComplete}
            >
              {isComplete && <CheckCircle2 className="w-5 h-5 mr-2" />}
              Kirim Jawaban
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}