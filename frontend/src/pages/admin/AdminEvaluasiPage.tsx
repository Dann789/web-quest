import React, { useState, useEffect, useCallback } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell
} from 'recharts';
import { Download, Search, Users, FileText, Calendar, AlignLeft, Target, Filter, ChevronLeft, ChevronRight, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { getFormSetting, toggleFormSetting } from '@/services/admin/SettingService';

import { EvaluasiService } from '@/services/admin/EvaluasiService';
import type { 
  UeqStatsResponse, 
  MrcStatsResponse, 
  MrcReason, 
  MrcReasonsMeta 
} from '@/services/admin/EvaluasiService';

export default function AdminEvaluasiPage() {
  const { token } = useAuth();
  
  // Default to current month
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(firstDay);
  const [endDate, setEndDate] = useState(lastDay);
  
  // UEQ State
  const [ueqStats, setUeqStats] = useState<UeqStatsResponse | null>(null);
  const [ueqLoading, setUeqLoading] = useState(false);
  
  // MRC State
  const [mrcStats, setMrcStats] = useState<MrcStatsResponse | null>(null);
  const [mrcReasons, setMrcReasons] = useState<MrcReason[]>([]);
  const [mrcMeta, setMrcMeta] = useState<MrcReasonsMeta | null>(null);
  const [mrcLoading, setMrcLoading] = useState(false);
  const [mrcPage, setMrcPage] = useState(1);
  const [mrcSearch, setMrcSearch] = useState('');
  
  const [isQuestionnaireActive, setIsQuestionnaireActive] = useState(false);

  const loadUeqData = useCallback(async () => {
    if (!token) return;
    setUeqLoading(true);
    try {
      const res = await EvaluasiService.getUeqStats(token, startDate, endDate);
      if (res.success) {
        setUeqStats(res.data);
      }
    } catch (error) {
      console.error("Failed to load UEQ stats", error);
    } finally {
      setUeqLoading(false);
    }
  }, [token, startDate, endDate]);

  const loadMrcStats = useCallback(async () => {
    if (!token) return;
    try {
      const res = await EvaluasiService.getMrcStats(token, startDate, endDate);
      if (res.success) {
        setMrcStats(res.data);
      }
    } catch (error) {
      console.error("Failed to load MRC stats", error);
    }
  }, [token, startDate, endDate]);

  const loadMrcReasons = useCallback(async (page = 1) => {
    if (!token) return;
    setMrcLoading(true);
    try {
      const res = await EvaluasiService.getMrcReasons(token, page, 10, mrcSearch, startDate, endDate);
      if (res.success) {
        setMrcReasons(res.data);
        setMrcMeta(res.meta || null);
        setMrcPage(page);
      }
    } catch (error) {
      console.error("Failed to load MRC reasons", error);
    } finally {
      setMrcLoading(false);
    }
  }, [token, mrcSearch, startDate, endDate]);

  const handleExportCsv = async () => {
    if (!token) return;
    try {
      const success = await EvaluasiService.exportUeqCsv(token, startDate, endDate);
      if (!success) {
        toast.error('Tidak ada data untuk diexport pada rentang tanggal ini.');
      }
    } catch (error) {
      console.error("Failed to export CSV", error);
      toast.error('Gagal mengexport CSV');
    }
  };

  const handleExportMrcCsv = async () => {
    if (!token) return;
    try {
      const success = await EvaluasiService.exportMrcCsv(token, startDate, endDate);
      if (!success) {
        toast.error('Tidak ada data MRC untuk diexport pada rentang tanggal ini.');
      }
    } catch (error) {
      console.error("Failed to export MRC CSV", error);
      toast.error('Gagal mengexport CSV MRC');
    }
  };

  const handleApplyFilter = () => {
    if (startDate > endDate) {
      toast.error("Tanggal akhir tidak boleh lebih awal dari tanggal mulai.");
      return;
    }
    loadUeqData();
    loadMrcStats();
    loadMrcReasons(1);
  };

  const loadFormSetting = async () => {
    try {
      const response = await getFormSetting();
      if (response.success) {
        setIsQuestionnaireActive(response.data?.isActive ?? false);
      }
    } catch (error) {
      console.error("Failed to load form setting", error);
    }
  };

  const handleToggleQuestionnaire = async (checked: boolean) => {
    setIsQuestionnaireActive(checked);
    try {
      const response = await toggleFormSetting(checked);
      if (response.success) {
        toast.success(`Kuesioner berhasil di${checked ? 'aktifkan' : 'nonaktifkan'}`);
      } else {
        setIsQuestionnaireActive(!checked);
        toast.error('Gagal memperbarui status kuesioner');
      }
    } catch (error) {
      setIsQuestionnaireActive(!checked);
      toast.error('Gagal memperbarui status kuesioner');
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) {
      handleApplyFilter();
      loadFormSetting();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const onSearchMrc = (e: React.FormEvent) => {
    e.preventDefault();
    loadMrcReasons(1);
  };

  const interpretationColor = (interpretation: string) => {
    switch(interpretation) {
      case 'Excellent': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'Good': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Above Average': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'Below Average': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      case 'Bad': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-50 overflow-y-auto">
      {/* Header & Global Filter */}
      <div className=" p-6 md:p-8 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 sticky top-0 z-20 rounded-2xl">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Target className="h-7 w-7 text-blue-400" />
            </div>
            Evaluasi UX
          </h1>
          <p className="text-slate-400 text-sm">
            Pantau dan analisis hasil kuesioner UEQ serta respons MRC dari pengguna.
          </p>
        </div>
        
        {/* Modern Date Filter Card */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-slate-900 border border-slate-800 p-2.5 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 px-3">
            <Filter className="h-4 w-4 text-slate-400" />
            <span className="text-sm text-slate-300 font-medium whitespace-nowrap">Filter Tanggal:</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Input 
              type="date" 
              className="w-full sm:w-[150px] h-10 bg-slate-950 border-slate-800 rounded-xl focus-visible:ring-blue-500/50" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <span className="text-slate-500 font-medium">-</span>
            <Input 
              type="date" 
              className="w-full sm:w-[150px] h-10 bg-slate-950 border-slate-800 rounded-xl focus-visible:ring-blue-500/50" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          
          <Button 
            className="h-10 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors w-full sm:w-auto" 
            onClick={handleApplyFilter}
          >
            Terapkan
          </Button>
        </div>
      </div>

      <div className="p-1 md:p-1 mt-4 flex-1">
        <Tabs defaultValue="ueq" className="w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 px-2">
            <TabsList className="grid w-full sm:max-w-[500px] grid-cols-2 p-1 bg-slate-900 border border-slate-800 rounded-xl h-auto">
              <TabsTrigger 
                value="ueq" 
                className="py-2.5 font-medium rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-400 transition-all"
              >
                UEQ Analysis
              </TabsTrigger>
              <TabsTrigger 
                value="mrc" 
                className="py-2.5 font-medium rounded-lg data-[state=active]:bg-pink-600 data-[state=active]:text-white text-slate-400 transition-all"
              >
                MRC Feedback
              </TabsTrigger>
            </TabsList>
            
            <div className="flex items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-2.5 rounded-xl px-4 w-full sm:w-auto shrink-0 shadow-sm">
              <span className={`text-sm font-medium whitespace-nowrap transition-colors ${isQuestionnaireActive ? 'text-emerald-400' : 'text-slate-400'}`}>
                Kuesioner {isQuestionnaireActive ? 'Aktif' : 'Nonaktif'}
              </span>
              <Switch
                checked={isQuestionnaireActive}
                onCheckedChange={handleToggleQuestionnaire}
                className="data-[state=checked]:bg-emerald-500"
              />
            </div>
          </div>

          {/* TAB UEQ */}
          <TabsContent value="ueq" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <Card className="bg-linear-to-br from-slate-900 to-slate-900/50 border-slate-800/60 shadow-md">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-slate-400">Total Responden</CardTitle>
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Users className="h-4 w-4 text-blue-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white tracking-tight">{ueqStats?.totalRespondents || 0}</div>
                </CardContent>
              </Card>
              <Card className="bg-linear-to-br from-slate-900 to-slate-900/50 border-slate-800/60 shadow-md">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-slate-400">Total Pengisian</CardTitle>
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <FileText className="h-4 w-4 text-purple-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white tracking-tight">{ueqStats?.totalSessions || 0}</div>
                </CardContent>
              </Card>
              <Card className="bg-linear-to-br from-slate-900 to-slate-900/50 border-slate-800/60 shadow-md">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-slate-400">Terakhir Pengisian</CardTitle>
                  <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <Calendar className="h-4 w-4 text-emerald-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold text-white mt-1">
                    {ueqStats?.lastSubmission 
                      ? new Date(ueqStats.lastSubmission).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) 
                      : '-'}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Chart UEQ */}
              <Card className="xl:col-span-2 bg-slate-900 border-slate-800 shadow-md">
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800/60 pb-5 gap-4">
                  <div>
                    <CardTitle className="text-lg font-bold text-white">Rata-rata Skor Skala UEQ</CardTitle>
                    <CardDescription className="text-slate-400 mt-1">Distribusi skor berdasarkan parameter kuesioner</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleExportCsv} className="gap-2 bg-slate-800 hover:bg-slate-700 hover:text-white border-slate-700 rounded-lg">
                    <Download className="h-4 w-4 text-slate-300" />
                    Export CSV
                  </Button>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="h-[380px] w-full">
                    {ueqLoading ? (
                      <div className="h-full flex items-center justify-center text-slate-500">
                        <div className="animate-pulse flex items-center gap-2">
                          <RefreshCcw className="h-4 w-4 animate-spin" /> Memuat data grafik...
                        </div>
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={ueqStats?.scales || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                          <XAxis dataKey="scale" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickMargin={10} />
                          <YAxis domain={[-3, 3]} stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickMargin={10} />
                          <RechartsTooltip 
                            cursor={{fill: 'rgba(255,255,255,0.03)'}}
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            itemStyle={{ color: '#f8fafc', fontWeight: 500 }}
                            labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                          />
                          <Bar dataKey="average" radius={[6, 6, 0, 0]} maxBarSize={60}>
                            {
                              ueqStats?.scales?.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.average >= 0 ? '#3b82f6' : '#ef4444'} />
                              ))
                            }
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Table Detail UEQ */}
              <Card className="bg-slate-900 border-slate-800 shadow-md flex flex-col">
                <CardHeader className="border-b border-slate-800/60 pb-5">
                  <CardTitle className="text-lg font-bold text-white">Tabel Interpretasi</CardTitle>
                  <CardDescription className="text-slate-400 mt-1">Kesimpulan hasil masing-masing skala</CardDescription>
                </CardHeader>
                <CardContent className="p-0 flex-1 overflow-auto">
                  <Table>
                    <TableHeader className="bg-slate-950/50 sticky top-0">
                      <TableRow className="border-slate-800 hover:bg-transparent">
                        <TableHead className="text-slate-400 font-medium">Skala</TableHead>
                        <TableHead className="text-slate-400 font-medium text-right">Skor</TableHead>
                        <TableHead className="text-slate-400 font-medium w-[120px]">Hasil</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ueqStats?.scales?.map((scale) => (
                        <TableRow key={scale.scale} className="border-slate-800/50 hover:bg-slate-800/50 transition-colors">
                          <TableCell className="font-medium text-slate-200 capitalize py-4">{scale.scale.toLowerCase()}</TableCell>
                          <TableCell className="text-right font-mono text-slate-300 py-4">
                            {scale.average > 0 ? `+${scale.average.toFixed(2)}` : scale.average.toFixed(2)}
                          </TableCell>
                          <TableCell className="py-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border ${interpretationColor(scale.interpretation)}`}>
                              {scale.interpretation}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                      {(!ueqStats?.scales || ueqStats.scales.length === 0) && (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center text-slate-500 py-12">
                            Belum ada data evaluasi UEQ
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* TAB MRC */}
          <TabsContent value="mrc" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Stat Cards MRC */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <Card className="bg-linear-to-br from-slate-900 to-slate-900/50 border-slate-800/60 shadow-md">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-slate-400">Total Responden</CardTitle>
                  <div className="p-2 bg-pink-500/10 rounded-lg">
                    <Users className="h-4 w-4 text-pink-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white tracking-tight">{mrcStats?.totalRespondents || 0}</div>
                </CardContent>
              </Card>
              <Card className="bg-linear-to-br from-slate-900 to-slate-900/50 border-slate-800/60 shadow-md">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-slate-400">Kata Terpilih</CardTitle>
                  <div className="p-2 bg-orange-500/10 rounded-lg">
                    <AlignLeft className="h-4 w-4 text-orange-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white tracking-tight">{mrcStats?.totalWordsSelected || 0}</div>
                </CardContent>
              </Card>
              <Card className="bg-linear-to-br from-slate-900 to-slate-900/50 border-slate-800/60 shadow-md">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-slate-400">Terpopuler</CardTitle>
                  <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <Target className="h-4 w-4 text-yellow-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white mt-1 truncate">
                    {mrcStats?.mostSelectedWord || '-'}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Chart MRC */}
              <Card className="bg-slate-900 border-slate-800 shadow-md">
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800/60 pb-5 gap-4">
                  <div>
                    <CardTitle className="text-lg font-bold text-white">Frekuensi Kata MRC</CardTitle>
                    <CardDescription className="text-slate-400 mt-1">Top 10 kata-kata yang paling sering dipilih oleh responden</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" type="button" onClick={handleExportMrcCsv} className="gap-2 h-10 bg-slate-800 hover:bg-slate-700 hover:text-white border-slate-700 rounded-xl">
                    <Download className="h-4 w-4 text-slate-300" />
                    Export CSV
                  </Button>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="h-[420px] w-full">
                    {!mrcStats || mrcStats.chartData?.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-slate-500">Belum ada data</div>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={mrcStats.chartData.slice(0, 10)} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={true} vertical={false} />
                          <XAxis type="number" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis dataKey="word" type="category" stroke="#cbd5e1" fontSize={12} tickLine={false} axisLine={false} width={80} />
                          <RechartsTooltip 
                            cursor={{fill: 'rgba(255,255,255,0.03)'}}
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                          />
                          <Bar dataKey="count" fill="#ec4899" radius={[0, 4, 4, 0]} maxBarSize={30} />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Table Reasons MRC */}
              <Card className="bg-slate-900 border-slate-800 shadow-md flex flex-col h-[525px]">
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800/60 pb-5 gap-4 shrink-0">
                  <div>
                    <CardTitle className="text-lg font-bold text-white">Ulasan Pengguna</CardTitle>
                    <CardDescription className="text-slate-400 mt-1">Alasan dibalik pemilihan kata</CardDescription>
                  </div>
                  <form onSubmit={onSearchMrc} className="flex gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-[220px]">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                      <Input 
                        placeholder="Cari ulasan..." 
                        className="pl-9 bg-slate-950 border-slate-800 h-10 rounded-xl focus-visible:ring-pink-500/50 w-full"
                        value={mrcSearch}
                        onChange={(e) => setMrcSearch(e.target.value)}
                      />
                    </div>
                  </form>
                </CardHeader>
                <CardContent className="p-0 flex-1 flex flex-col min-h-0">
                  <div className="overflow-auto flex-1">
                    <Table>
                      <TableHeader className="bg-slate-950/80 sticky top-0 z-10 backdrop-blur-sm">
                        <TableRow className="border-slate-800 hover:bg-transparent">
                          <TableHead className="text-slate-400 font-medium w-[160px] pl-6">Responden</TableHead>
                          <TableHead className="text-slate-400 font-medium">Ulasan</TableHead>
                          <TableHead className="text-slate-400 font-medium text-right w-[120px] pr-6">Waktu</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mrcLoading ? (
                          <TableRow>
                            <TableCell colSpan={3} className="text-center py-16 text-slate-500">
                              <div className="animate-pulse flex items-center justify-center gap-2">
                                <RefreshCcw className="h-4 w-4 animate-spin" /> Memuat data...
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : mrcReasons.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={3} className="text-center text-slate-500 py-16">
                              Tidak ada ulasan yang cocok dengan filter
                            </TableCell>
                          </TableRow>
                        ) : (
                          mrcReasons.map((reason) => (
                            <TableRow key={reason.id} className="border-slate-800/50 hover:bg-slate-800/30 transition-colors group">
                              <TableCell className="font-medium text-slate-300 pl-6 align-top pt-4">
                                <div className="font-semibold text-slate-200">{reason.user?.name || reason.user?.username || 'Anonim'}</div>
                                <div className="inline-flex items-center px-2 py-0.5 mt-1.5 rounded-full text-[10px] font-medium bg-slate-800 text-slate-400 border border-slate-700">
                                  {reason.user?.role || 'User'}
                                </div>
                              </TableCell>
                              <TableCell className="text-slate-300 align-top pt-4">
                                <div className="text-sm leading-relaxed text-slate-300 wrap-break-word line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
                                  {reason.reason_text}
                                </div>
                              </TableCell>
                              <TableCell className="text-right text-slate-500 text-xs whitespace-nowrap pr-6 align-top pt-4 font-medium">
                                {new Date(reason.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  {/* Pagination */}
                  {mrcMeta && mrcMeta.totalPages > 1 && (
                    <div className="border-t border-slate-800 p-4 flex items-center justify-between bg-slate-950/50 shrink-0">
                      <div className="text-sm text-slate-500 font-medium">
                        Halaman <span className="text-slate-300">{mrcMeta.page}</span> dari <span className="text-slate-300">{mrcMeta.totalPages}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 px-3 rounded-lg border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white"
                          disabled={mrcPage <= 1}
                          onClick={() => loadMrcReasons(mrcPage - 1)}
                        >
                          <ChevronLeft className="h-4 w-4 mr-1" /> Prev
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 px-3 rounded-lg border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white"
                          disabled={mrcPage >= mrcMeta.totalPages}
                          onClick={() => loadMrcReasons(mrcPage + 1)}
                        >
                          Next <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
