import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle2, Clock, HelpCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getQuestionnaireStatus } from '@/services/user/ProgressService';

export default function ListKuesioner() {
  const { user } = useAuth();
  const [completedStatus, setCompletedStatus] = useState({ ueqCompleted: false, mrcCompleted: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    const fetchStatus = async () => {
      try {
        const res = await getQuestionnaireStatus(user.id);
        if (res.success && res.data) {
          setCompletedStatus(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, [user?.id]);

  const questionnaires = [
    {
      id: 'ueq',
      title: 'User Experience Questionnaire (UEQ)',
      description: 'Bantu kami meningkatkan kualitas platform ini dengan memberikan penilaian Anda terhadap pengalaman penggunaan sistem. Jawaban Anda sangat berarti bagi pengembangan lebih lanjut.',
      estimatedTime: '5 Menit',
      questionCount: 26,
      isCompleted: completedStatus.ueqCompleted,
      iconName: 'fa-clipboard-list',
      colorTheme: 'emerald'
    },
    {
      id: 'mrc',
      title: 'Microsoft Reaction Card (MRC)',
      description: 'Bantu kami meningkatkan kualitas platform ini dengan memberikan penilaian Anda terhadap pengalaman penggunaan sistem. Jawab dengan memilih kata yang paling menggambarkan perasaan anda setelah menggunakan platform ini.',
      estimatedTime: '3 Menit',
      questionCount: 2,
      isCompleted: completedStatus.mrcCompleted,
      iconName: 'fa-microsoft',
      colorTheme: 'emerald'
    }
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
        <p className="text-muted-foreground animate-pulse font-medium">Memuat status kuesioner...</p>
      </div>
    );
  }


  return (
    <div className="space-y-10 pb-8 relative w-full">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10 pointer-events-none opacity-50" />
      
      {/* Header Section */}
      <div className="relative z-10">
        <h1 className="text-4xl font-extrabold tracking-tight bg-linear-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
          Daftar Kuesioner
        </h1>
        <p className="text-muted-foreground mt-3 text-lg max-w-2xl">
          Selesaikan kuesioner di bawah ini untuk membantu kami mengevaluasi dan memberikan pengalaman belajar yang lebih baik.
        </p>
      </div>

      {/* List Section */}
      <div className="space-y-6 relative z-10">
        {questionnaires.map((q) => (
          <Card 
            key={q.id} 
            className={`group overflow-hidden rounded-4xl border-0 shadow-sm ring-1 ring-border/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.01] ${q.isCompleted ? 'bg-muted/30' : 'bg-card'}`}
          >
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                
                {/* Left Side: Icon Area */}
                <div className={`p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-border/10 transition-colors duration-300 ${q.isCompleted ? 'bg-muted/50 text-muted-foreground' : `bg-${q.colorTheme}-500/10 text-${q.colorTheme}-600 group-hover:bg-${q.colorTheme}-500/15`}`}>
                  <div className="relative">
                    <div className={`absolute inset-0 bg-${q.colorTheme}-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <i className={`${q.iconName === 'fa-microsoft' ? 'fa-brands' : 'fa-solid'} ${q.iconName} text-5xl relative z-10 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}></i>
                  </div>
                </div>

                {/* Middle Side: Info Area */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className={`text-2xl font-bold tracking-tight ${q.isCompleted ? 'text-muted-foreground' : 'text-foreground'}`}>
                      {q.title}
                    </h3>
                    {q.isCompleted && (
                      <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-0">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Selesai
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {q.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-6 mt-auto">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Clock className="w-4 h-4 opacity-70" />
                      <span>Estimasi {q.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <HelpCircle className="w-4 h-4 opacity-70" />
                      <span>{q.questionCount} Pertanyaan</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Action Area */}
                <div className="p-6 md:p-8 flex items-center justify-center md:justify-end bg-black/5 dark:bg-white/5 md:bg-transparent md:border-l border-border/10">
                  {q.isCompleted ? (
                    <Button variant="outline" className="w-full md:w-auto rounded-full px-8 h-12 font-semibold bg-transparent border-dashed text-muted-foreground">
                      Sudah Dikerjakan
                    </Button>
                  ) : (
                    <Button className={`w-full md:w-auto rounded-full px-8 h-12 font-semibold text-white shadow-md transition-all active:scale-95 bg-${q.colorTheme}-600 hover:bg-${q.colorTheme}-700 hover:shadow-${q.colorTheme}-500/25`} asChild>
                      {/* Pastikan '/kuesioner/ueq' ini nantinya disesuaikan dengan route form kuesioner Anda */}
                      <Link to={`/kuesioner/${q.id}`}>
                        <span className="flex items-center gap-2">
                          Mulai Kerjakan
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </Link>
                    </Button>
                  )}
                </div>

              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}