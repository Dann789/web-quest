import { useState } from 'react';
import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
import { ArrowLeft, CheckCircle2, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MrcFormPage() {
  // Mockup data for MRC words
  const mrcWords = [
    { id: '1', word: 'Clear', indo: 'Jelas' },
    { id: '2', word: 'Clean', indo: 'Bersih/Rapi' },
    { id: '3', word: 'Easy to use', indo: 'Mudah digunakan' },
    { id: '4', word: 'Helpful', indo: 'Membantu' },
    { id: '5', word: 'Organized', indo: 'Terorganisir' },
    { id: '6', word: 'Responsive', indo: 'Responsif' },
    { id: '7', word: 'Confusing', indo: 'Membingungkan' },
    { id: '8', word: 'Complex', indo: 'Rumit' },
    { id: '9', word: 'Distracting', indo: 'Mengganggu' },
    { id: '10', word: 'Hard to use', indo: 'Sulit digunakan' },
    { id: '11', word: 'Fun', indo: 'Menyenangkan' },
    { id: '12', word: 'Boring', indo: 'Membosankan' },
  ];

  const [selectedWords, setSelectedWords] = useState<Set<string>>(new Set());

  const toggleWord = (id: string) => {
    setSelectedWords(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        // Optional: limit to max 5 words. Uncomment if needed.
        // if (newSet.size >= 5) return prev; 
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Validasi: minimal 3 kata, maksimal 5 kata terpilih
  const isComplete = selectedWords.size >= 3 && selectedWords.size <= 5;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10 pointer-events-none opacity-50" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10 pointer-events-none opacity-50" />

      {/* Navigation Bar */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 px-6 py-4 flex items-center justify-between">
        <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground" asChild>
          <Link to="/kuesioner">
            <ArrowLeft className="w-4 h-4" /> Kembali
          </Link>
        </Button>
        <div className="text-sm font-medium">
          <span className={selectedWords.size > 5 || selectedWords.size < 3 ? 'text-amber-500' : 'text-blue-500'}>
            {selectedWords.size}
          </span> / 5 Kata Terpilih
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        <div className="max-w-5xl mx-auto px-6 pt-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight mb-4">Microsoft Reaction Card</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Pilih <strong className="text-foreground">3 hingga 5 kata</strong> di bawah ini yang paling menggambarkan pengalaman dan perasaan Anda setelah menggunakan sistem.
            </p>
          </div>

          {/* Word Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mrcWords.map((item) => {
              const isSelected = selectedWords.has(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => toggleWord(item.id)}
                  className={`relative p-4 rounded-2xl border-2 text-left transition-all duration-300 focus:outline-none flex flex-col justify-center min-h-[100px] ${
                    isSelected 
                      ? 'bg-blue-50 border-blue-500 dark:bg-blue-500/20 shadow-md shadow-blue-500/10 scale-[1.02] -translate-y-1' 
                      : 'bg-card border-border/50 hover:border-blue-300 hover:bg-muted/50 hover:shadow-sm'
                  }`}
                >
                  {/* Checkmark icon for selected state */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-sm">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}

                  <span className={`font-bold text-lg block mb-1 ${isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-foreground'}`}>
                    {item.word}
                  </span>
                  <span className={`text-sm ${isSelected ? 'text-blue-600/80 dark:text-blue-300/80' : 'text-muted-foreground'}`}>
                    {item.indo}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Warning text if selection is invalid */}
          {!isComplete && selectedWords.size > 0 && (
             <div className="mt-8 text-center text-sm font-medium text-amber-500">
               {selectedWords.size < 3 
                 ? `Pilih ${3 - selectedWords.size} kata lagi.` 
                 : 'Anda hanya boleh memilih maksimal 5 kata.'}
             </div>
          )}

          {/* Submit Action */}
          <div className="mt-12 flex justify-end">
            <Button 
              size="lg" 
              className={`rounded-full px-10 h-14 text-lg font-semibold transition-all ${
                isComplete 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 hover:-translate-y-1' 
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