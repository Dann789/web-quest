import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  ChevronRight,
  Flame,
  BookOpen,
  Code,
  CodeXml,
  TrendingUp,
  Medal,
  BookOpenText,
  ClipboardCheck,
  Send,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import { useState } from 'react';

const evaluationWords = [
  { id: 1, word: "Clear", indo: "(Jelas)", desc: "Materi atau instruksi mudah dipahami." },
  { id: 2, word: "Clean", indo: "(Bersih/Rapi)", desc: "Tampilan antarmuka tidak semrawut." },
  { id: 3, word: "Easy to use", indo: "(Mudah digunakan)", desc: "Navigasi sistem lancar." },
  { id: 4, word: "Helpful", indo: "(Membantu)", desc: "Sistem efektif membantu user belajar." },
  { id: 5, word: "Organized", indo: "(Terorganisir)", desc: "Struktur materi atau level tertata rapi." },
  { id: 6, word: "Responsive", indo: "(Responsif)", desc: "Sistem cepat merespons input (tidak lag)." },
  { id: 7, word: "Simple", indo: "(Sederhana)", desc: "Tidak berbelit-belit." },
  { id: 8, word: "Usable", indo: "(Dapat digunakan)", desc: "Fungsionalitas berjalan normal." },
  { id: 9, word: "Confusing", indo: "(Membingungkan)", desc: "User tersesat atau tidak paham instruksi." },
  { id: 10, word: "Complex", indo: "(Rumit)", desc: "Alur belajar terlalu sulit dipahami." },
  { id: 11, word: "Distracting", indo: "(Mengganggu)", desc: "Elemen visual mengganggu fokus belajar." },
  { id: 12, word: "Hard to use", indo: "(Sulit digunakan)", desc: "Kontrol game atau navigasi susah." },
  { id: 13, word: "Overwhelming", indo: "(Berlebihan)", desc: "Terlalu banyak informasi sekaligus." },
  { id: 14, word: "Slow", indo: "(Lambat)", desc: "Masalah performa/loading." },
  { id: 15, word: "Frustrating", indo: "(Membuat frustrasi)", desc: "Sistem error atau terlalu susah dikendalikan." },
  { id: 16, word: "Attractive", indo: "(Menarik)", desc: "Visual game memanjakan mata." },
  { id: 17, word: "Creative", indo: "(Kreatif)", desc: "Konsep Space Shooter terasa unik untuk materi ini." },
  { id: 18, word: "Engaging", indo: "(Melibatkan)", desc: "User merasa \"tenggelam\" dalam permainan." },
  { id: 19, word: "Fresh", indo: "(Segar)", desc: "Tampilan baru, tidak seperti e-learning kaku." },
  { id: 20, word: "Friendly", indo: "(Ramah)", desc: "Suasana/tone aplikasi menyenangkan." },
  { id: 21, word: "Fun", indo: "(Menyenangkan)", desc: "Unsur hiburan berhasil." },
  { id: 22, word: "Innovative", indo: "(Inovatif)", desc: "Terasa ada kebaruan teknologi." },
  { id: 23, word: "Motivating", indo: "(Memotivasi)", desc: "Mendorong user untuk lanjut ke level berikutnya." },
  { id: 24, word: "Satisfying", indo: "(Memuaskan)", desc: "Perasaan puas saat menyelesaikan tantangan." },
  { id: 25, word: "Stimulating", indo: "(Menstimulasi)", desc: "Memicu rasa ingin tahu dan semangat." },
  { id: 26, word: "Annoying", indo: "(Menyebalkan)", desc: "Musik atau notifikasi mengganggu emosi." },
  { id: 27, word: "Boring", indo: "(Membosankan)", desc: "Gamifikasi gagal membuat seru." },
  { id: 28, word: "Dull", indo: "(Tumpul/Hambar)", desc: "Kurang variasi, terasa datar." },
  { id: 29, word: "Old", indo: "(Kuno)", desc: "Desain terasa ketinggalan zaman." },
  { id: 30, word: "Unattractive", indo: "(Tidak menarik)", desc: "Visual tidak menggugah selera." }
];

export default function DashboardPage() {
  const { user } = useAuth();
  const hasCompletedEvaluation = false;
  const [selectedWords, setSelectedWords] = useState<number[]>([]);
  const [evaluationReason, setEvaluationReason] = useState("");
  const [isEvaluationOpen, setIsEvaluationOpen] = useState(false);
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);

  const handleDialogOpenChange = (open: boolean) => {
    setIsEvaluationOpen(open);
    if (!open) {
      // Reset state ketika dialog tertutup
      setSelectedWords([]);
      setEvaluationReason("");
    }
  };

  const toggleWord = (id: number) => {
    if (selectedWords.includes(id)) {
      setSelectedWords(selectedWords.filter(w => w !== id));
    } else {
      if (selectedWords.length < 5) {
        setSelectedWords([...selectedWords, id]);
      }
    }
  };

  // Mock Data
  const currentLevel = {
    id: 2,
    name: 'CSS Styling',
    totalXp: 500,
    currentXp: 350,
    lastLesson: 'CSS Styling'
  };

  const studyData = [
    { day: 'Sen', minutes: 45 },
    { day: 'Sel', minutes: 30 },
    { day: 'Rab', minutes: 60 },
    { day: 'Kam', minutes: 15 },
    { day: 'Jum', minutes: 90 },
    { day: 'Sab', minutes: 120 },
    { day: 'Min', minutes: 45 },
  ];

  const stats = [
    { 
      label: 'Challenge Selesai', 
      value: 24, 
      icon: <Code className="w-5 h-5 text-blue-500" />,
      bg: 'bg-blue-500/10',
      border: 'hover:border-blue-500/50'
    },
    { 
      label: 'Level Selesai', 
      value: '1 / 5', 
      icon: <BookOpen className="w-5 h-5 text-purple-500" />,
      bg: 'bg-purple-500/10',
      border: 'hover:border-purple-500/50'
    },
    { 
      label: 'Badge Didapat', 
      value: 3, 
      icon: <Medal className="w-5 h-5 text-amber-500" />,
      bg: 'bg-amber-500/10',
      border: 'hover:border-amber-500/50'
    },
  ];

  return (
    <div className=" space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. TOP SECTION: Hero & Level Status */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* HERO CARD (66%) */}
        <div className="lg:col-span-2">
          <Card className="relative h-full overflow-hidden border-none shadow-2xl bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 px-10 pt-16  opacity-10">
              <CodeXml className="w-64 h-64 text-white" />
            </div>
            <div className="absolute rounded-full -bottom-20 -left-20 w-60 h-60 bg-blue-500/20 blur-3xl"></div>

            <CardContent className="relative z-10 p-8 flex flex-col justify-between h-full">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-white">
                      Hi,{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                        {user?.username}
                      </span>
                      ! 👋
                    </h1>
                    <p className="mt-2 text-indigo-200 text-xl font-semibold">
                      Siap melanjutkan belajar pemrograman web dasar hari ini?
                    </p>
                    <p className="mt-2 text-indigo-200 text-md font-medium">
                      Klik tombol di bawah atau pergi ke menu Level!
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-4 mt-6 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                    <BookOpenText className="w-5 h-5 text-blue-300" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-indigo-300 uppercase tracking-wider">
                      Lanjutkan Belajar
                    </p>
                    <p className="font-bold text-white group-hover:text-blue-200 transition-colors">
                      {currentLevel.lastLesson}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/50 group-hover:translate-x-1 transition-transform" />
                </div>
                {/* Daily Streak Badge */}
                <div className="flex items-center w-fit gap-2 px-3 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30 backdrop-blur-md">
                  <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
                  <span className="text-xs font-bold text-orange-200">
                    3 Days Streak
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* LEVEL & XP CARD (33%) - Moved Here */}
        <div className="lg:col-span-1">
          <Card className="h-full flex flex-col justify-center relative overflow-hidden group hover:border-primary/50 transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center text-lg">
                <span>Level Saat ini</span>
                <TrendingUp className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-primary/10 ring-4 ring-primary/20 group-hover:scale-110 group-hover:ring-primary/40 transition-all duration-500 mb-3">
                  <span className="text-3xl font-black text-primary">
                    {currentLevel.id}
                  </span>
                </div>
                <h3 className="font-bold text-xl">{currentLevel.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Level Selanjutnya: Javascript Logic
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-muted-foreground">XP Progress</span>
                  <span className="text-primary">
                    {currentLevel.currentXp} / {currentLevel.totalXp}
                  </span>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                    style={{
                      width: `${(currentLevel.currentXp / currentLevel.totalXp) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-[10px] text-right text-muted-foreground">
                  +150 XP to level up
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 2. THREE CORE STATS (Challenges, Levels, Badges) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <Card
            key={i}
            className={`group transition-all duration-300 hover:shadow-lg ${stat.border}`}
          >
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <div className="flex items-end gap-2 mt-1">
                  <h3 className="text-3xl font-bold">{stat.value}</h3>
                </div>
              </div>
              <div
                className={`p-4 rounded-2xl ${stat.bg} group-hover:scale-110 transition-transform`}
              >
                {stat.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 3. BOTTOM SECTION: Study Chart & Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* STUDY TIME CHART (66%) */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Waktu Belajar
              </CardTitle>
              <CardDescription>
                Aktivitas belajar kamu dalam 7 hari terakhir
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={studyData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorMinutes"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "hsl(var(--muted-foreground))",
                      fontSize: 12,
                    }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "hsl(var(--muted-foreground))",
                      fontSize: 12,
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                    cursor={{
                      stroke: "hsl(var(--primary))",
                      strokeWidth: 1,
                      strokeDasharray: "4 4",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="minutes"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorMinutes)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* LEADERBOARD COMPACT (33%) */}
        <div className="lg:col-span-1">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  Peringkat 5 Besar
                </CardTitle>
                <Link
                  to="/leaderboard"
                  className="text-xs text-primary hover:underline"
                >
                  Lihat Semua
                </Link>
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              {[
                { name: "AlexCode", xp: 2500, avatar: "AC" },
                { name: "SarahDev", xp: 2350, avatar: "SD" },
                { name: "JohnDoe", xp: 1800, avatar: "JD" },
                {
                  name: "You",
                  xp: user?.totalXp || 0,
                  active: true,
                  avatar: "ME",
                },
                { name: "ReactFan", xp: 1200, avatar: "RF" },
              ].map((p, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 p-2 rounded-xl transition-colors ${p.active ? "bg-primary/10 border border-primary/20" : "hover:bg-secondary/50 border border-transparent"}`}
                >
                  <div
                    className={`font-bold w-6 text-center text-sm ${i < 3 ? "text-amber-500" : "text-muted-foreground"}`}
                  >
                    {i < 3 ? ["🥇", "🥈", "🥉"][i] : `#${i + 1}`}
                  </div>
                  <Avatar className="w-8 h-8 border border-border">
                    <AvatarFallback className="text-xs font-bold">
                      {p.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-bold truncate ${p.active ? "text-primary" : ""}`}
                    >
                      {p.name}
                    </p>
                  </div>
                  <span className="font-mono text-xs font-bold">{p.xp} XP</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
      {!hasCompletedEvaluation && currentLevel.id >= 1 && (
        <div className="w-full p-4 rounded-xl border border-primary/50 bg-primary/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-full">
              <ClipboardCheck className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Evaluasi Sistem</h4>
              <p className="text-xs text-muted-foreground">
                Berikan feedback anda untuk membantu pengembangan sistem ini
                menjadi lebih baik
              </p>
            </div>
          </div>
          <Dialog open={isEvaluationOpen} onOpenChange={handleDialogOpenChange}>
            <DialogTrigger asChild>
              <Button>Mulai Penilaian</Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto w-[95vw]">
              <DialogHeader>
                <DialogTitle>Evaluasi Sistem</DialogTitle>
                <DialogDescription>
                  Pilih <strong>tepat 5 kata</strong> yang paling menggambarkan pengalaman Anda menggunakan sistem ini ({selectedWords.length}/5)
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
                  {evaluationWords.map((item) => {
                    const isSelected = selectedWords.includes(item.id);
                    const isDisabled = !isSelected && selectedWords.length >= 5;
                    return (
                      <div
                        key={item.id}
                        onClick={() => !isDisabled && toggleWord(item.id)}
                        className={`p-3 rounded-xl border text-sm transition-all duration-200 flex flex-col justify-center gap-1 min-h-[80px] select-none shadow-sm ${
                          isSelected 
                            ? "bg-primary text-primary-foreground border-primary shadow-md scale-[1.02] cursor-pointer ring-2 ring-primary ring-offset-1" 
                            : isDisabled
                              ? "bg-secondary/30 text-muted-foreground/60 border-border/50 cursor-not-allowed opacity-60"
                              : "bg-card text-card-foreground border-border hover:border-primary/50 hover:bg-secondary/50 cursor-pointer"
                        }`}
                        title={item.desc}
                      >
                        <span className="font-bold text-center leading-tight">{item.word}</span>
                        <span className="text-[12px] text-center opacity-80 leading-tight">{item.indo}</span>
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
                    value={evaluationReason}
                    onChange={(e) => setEvaluationReason(e.target.value)}
                    placeholder="Ceritakan mengapa Anda memilih kata-kata tersebut. Apa hal yang menurut Anda menarik atau perlu diperbaiki dari aplikasi ini?"
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      disabled={selectedWords.length !== 5}
                      className="w-full sm:w-auto flex items-center gap-2"
                    >
                      Kirim Penilaian <Send className='w-4 h-4'/>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Kirim Penilaian?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Anda telah memilih 5 kata. Setelah dikirim, Anda tidak dapat mengubah penilaian ini lagi. Apakah Anda yakin ingin mengirimkannya sekarang?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className='mt-3'>
                      <AlertDialogCancel>Periksa Kembali</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => {
                          console.log({ words: selectedWords, reason: evaluationReason });
                          // Add your API call to save the evaluation here
                          setIsEvaluationOpen(false);
                          handleDialogOpenChange(false);
                          setIsSuccessAlertOpen(true);
                          // Buka alert sukses (tidak langsung menutup dialog utama supaya bertumpuk rapi atau menutup bersamaan)
                        }}
                      >
                        Ya, Kirim Sekarang
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

              </div>
            </DialogContent>
          </Dialog>

          {/* SUCCESS ALERT - Di luar Dialog utama agar tidak ikut unmount */}
          <AlertDialog open={isSuccessAlertOpen} onOpenChange={setIsSuccessAlertOpen}>
            <AlertDialogContent className="border-emerald-500/50 bg-emerald-950">
              <AlertDialogHeader>
                <AlertDialogTitle className="flex flex-col items-center gap-2 text-emerald-500">
                  <ClipboardCheck className="w-10 h-10" />
                  Penilaian Berhasil Dikirim
                </AlertDialogTitle>
                <AlertDialogDescription className='text-center'>
                  Terima kasih atas penilaian Anda! Masukan yang Anda berikan sangat berarti untuk pengembangan sistem ini kedepannya
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={() => {
                    setIsSuccessAlertOpen(false);
                  }}
                >
                  Tutup
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  );
}
