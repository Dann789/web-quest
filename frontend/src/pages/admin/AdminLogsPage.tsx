import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Activity, Layers, Book, CodeXml, Award } from 'lucide-react';
import { 
  getDosenLevelLogs, 
  getDosenMaterialLogs, 
  getDosenChallengeLogs, 
  getMahasiswaLevelLogs, 
  getMahasiswaMaterialLogs, 
  getMahasiswaChallengeLogs, 
  getMahasiswaBadgeLogs 
} from '@/services/admin/LogService';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const RenderPagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: { 
  currentPage: number, 
  totalPages: number, 
  onPageChange: (p: number) => void 
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="py-4 border-t">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>
          
          <PaginationItem>
             <span className="text-sm text-muted-foreground mx-4">Halaman {currentPage} dari {totalPages}</span>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext 
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default function AdminLogsPage() {
  const limit = 10;

  // Dosen Level
  const [dosenLevel, setDosenLevel] = useState<any[]>([]);
  const [dlPage, setDlPage] = useState(1);
  const [dlTotal, setDlTotal] = useState(1);
  useEffect(() => {
    getDosenLevelLogs({ limit, page: dlPage }).then(res => {
      if (res.success) { setDosenLevel(res.data); setDlTotal(res.pagination?.totalPages || 1); }
    });
  }, [dlPage]);

  // Dosen Material
  const [dosenMaterial, setDosenMaterial] = useState<any[]>([]);
  const [dmPage, setDmPage] = useState(1);
  const [dmTotal, setDmTotal] = useState(1);
  useEffect(() => {
    getDosenMaterialLogs({ limit, page: dmPage }).then(res => {
      if (res.success) { setDosenMaterial(res.data); setDmTotal(res.pagination?.totalPages || 1); }
    });
  }, [dmPage]);

  // Dosen Challenge
  const [dosenChallenge, setDosenChallenge] = useState<any[]>([]);
  const [dcPage, setDcPage] = useState(1);
  const [dcTotal, setDcTotal] = useState(1);
  useEffect(() => {
    getDosenChallengeLogs({ limit, page: dcPage }).then(res => {
      if (res.success) { setDosenChallenge(res.data); setDcTotal(res.pagination?.totalPages || 1); }
    });
  }, [dcPage]);

  // Mahasiswa Level
  const [mhsLevel, setMhsLevel] = useState<any[]>([]);
  const [mlPage, setMlPage] = useState(1);
  const [mlTotal, setMlTotal] = useState(1);
  useEffect(() => {
    getMahasiswaLevelLogs({ limit, page: mlPage }).then(res => {
      if (res.success) { setMhsLevel(res.data); setMlTotal(res.pagination?.totalPages || 1); }
    });
  }, [mlPage]);

  // Mahasiswa Material
  const [mhsMaterial, setMhsMaterial] = useState<any[]>([]);
  const [mmPage, setMmPage] = useState(1);
  const [mmTotal, setMmTotal] = useState(1);
  useEffect(() => {
    getMahasiswaMaterialLogs({ limit, page: mmPage }).then(res => {
      if (res.success) { setMhsMaterial(res.data); setMmTotal(res.pagination?.totalPages || 1); }
    });
  }, [mmPage]);

  // Mahasiswa Challenge
  const [mhsChallenge, setMhsChallenge] = useState<any[]>([]);
  const [mcPage, setMcPage] = useState(1);
  const [mcTotal, setMcTotal] = useState(1);
  useEffect(() => {
    getMahasiswaChallengeLogs({ limit, page: mcPage }).then(res => {
      if (res.success) { setMhsChallenge(res.data); setMcTotal(res.pagination?.totalPages || 1); }
    });
  }, [mcPage]);

  // Mahasiswa Badge
  const [mhsBadge, setMhsBadge] = useState<any[]>([]);
  const [mbPage, setMbPage] = useState(1);
  const [mbTotal, setMbTotal] = useState(1);
  useEffect(() => {
    getMahasiswaBadgeLogs({ limit, page: mbPage }).then(res => {
      if (res.success) { setMhsBadge(res.data); setMbTotal(res.pagination?.totalPages || 1); }
    });
  }, [mbPage]);

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('id-ID', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Activity className="h-8 w-8 text-primary" />
            Log Aktivitas
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitoring histori aktivitas Dosen dan Mahasiswa
          </p>
        </div>
      </div>

      <Tabs defaultValue="level" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px] rounded-full">
          <TabsTrigger value="level" className="rounded-full">
            <Layers className="h-4 w-4 mr-2" />
            Log Level
          </TabsTrigger>
          <TabsTrigger value="materi" className="rounded-full">
            <Book className="h-4 w-4 mr-2" />
            Log Materi
          </TabsTrigger>
          <TabsTrigger value="challenge" className="rounded-full">
            <CodeXml className="h-4 w-4 mr-2" />
            Log Challenge
          </TabsTrigger>
          <TabsTrigger value="badge" className="rounded-full">
            <Award className="h-4 w-4 mr-2" />
            Log Badge
          </TabsTrigger>
        </TabsList>

        {/* TAB LEVEL */}
        <TabsContent value="level" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Aktivitas Mahasiswa (Level)</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Mahasiswa</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Terbuka Pada</TableHead>
                    <TableHead>Selesai Pada</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mhsLevel.length > 0 ? mhsLevel.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="pl-6">
                        <div className="font-medium">{log.userName}</div>
                        <div className="text-xs text-muted-foreground">{log.userUsername}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{log.levelName}</Badge>
                      </TableCell>
                      <TableCell>
                        {log.isLevelCompleted ? (
                          <Badge className="bg-emerald-500 hover:bg-emerald-600">Selesai</Badge>
                        ) : (
                          <Badge variant="secondary">Terbuka</Badge>
                        )}
                      </TableCell>
                      <TableCell>{formatDate(log.unlockedAt)}</TableCell>
                      <TableCell>{formatDate(log.completedAt)}</TableCell>
                    </TableRow>
                  )) : (
                    <TableRow><TableCell colSpan={5} className="text-center h-24">Belum ada aktivitas</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
              <RenderPagination currentPage={mlPage} totalPages={mlTotal} onPageChange={setMlPage} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Aktivitas Dosen (CRUD Level)</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Nama Level</TableHead>
                    <TableHead>Nodes (E/M/H)</TableHead>
                    <TableHead>XP Required</TableHead>
                    <TableHead>Aksi</TableHead>
                    <TableHead>Waktu</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dosenLevel.length > 0 ? dosenLevel.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="pl-6 font-medium">{log.name}</TableCell>
                      <TableCell>{log.easyNodes} / {log.mediumNodes} / {log.hardNodes}</TableCell>
                      <TableCell>{log.xpRequired} XP</TableCell>
                      <TableCell>
                        {log.wasUpdated ? (
                          <Badge className="bg-blue-500 hover:bg-blue-600">Diperbarui</Badge>
                        ) : (
                          <Badge className="bg-emerald-500 hover:bg-emerald-600">Dibuat</Badge>
                        )}
                      </TableCell>
                      <TableCell>{formatDate(log.wasUpdated ? log.updatedAt : log.createdAt)}</TableCell>
                    </TableRow>
                  )) : (
                    <TableRow><TableCell colSpan={5} className="text-center h-24">Belum ada aktivitas</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
              <RenderPagination currentPage={dlPage} totalPages={dlTotal} onPageChange={setDlPage} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB MATERI */}
        <TabsContent value="materi" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Aktivitas Mahasiswa (Materi)</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Mahasiswa</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Materi</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Waktu</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mhsMaterial.length > 0 ? mhsMaterial.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="pl-6">
                        <div className="font-medium">{log.userName}</div>
                        <div className="text-xs text-muted-foreground">{log.userUsername}</div>
                      </TableCell>
                      <TableCell><Badge variant="outline">{log.levelName}</Badge></TableCell>
                      <TableCell className="font-medium">{log.materialTitle}</TableCell>
                      <TableCell>
                        {log.isCompleted ? (
                          <Badge className="bg-emerald-500 hover:bg-emerald-600">Selesai</Badge>
                        ) : (
                          <Badge variant="secondary">Mulai</Badge>
                        )}
                      </TableCell>
                      <TableCell>{formatDate(log.isCompleted ? log.completedAt : log.startedAt)}</TableCell>
                    </TableRow>
                  )) : (
                    <TableRow><TableCell colSpan={5} className="text-center h-24">Belum ada aktivitas</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
              <RenderPagination currentPage={mmPage} totalPages={mmTotal} onPageChange={setMmPage} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Aktivitas Dosen (CRUD Materi)</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Judul Materi</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Urutan</TableHead>
                    <TableHead>Aksi</TableHead>
                    <TableHead>Waktu</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dosenMaterial.length > 0 ? dosenMaterial.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="pl-6 font-medium">{log.title}</TableCell>
                      <TableCell><Badge variant="outline">{log.levelName}</Badge></TableCell>
                      <TableCell>{log.order}</TableCell>
                      <TableCell>
                        {log.wasUpdated ? (
                          <Badge className="bg-blue-500 hover:bg-blue-600">Diperbarui</Badge>
                        ) : (
                          <Badge className="bg-emerald-500 hover:bg-emerald-600">Dibuat</Badge>
                        )}
                      </TableCell>
                      <TableCell>{formatDate(log.wasUpdated ? log.updatedAt : log.createdAt)}</TableCell>
                    </TableRow>
                  )) : (
                    <TableRow><TableCell colSpan={5} className="text-center h-24">Belum ada aktivitas</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
              <RenderPagination currentPage={dmPage} totalPages={dmTotal} onPageChange={setDmPage} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB CHALLENGE */}
        <TabsContent value="challenge" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Aktivitas Mahasiswa (Challenge)</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Mahasiswa</TableHead>
                    <TableHead>Challenge</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>XP / Waktu</TableHead>
                    <TableHead>Dikumpulkan Pada</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mhsChallenge.length > 0 ? mhsChallenge.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="pl-6">
                        <div className="font-medium">{log.userName}</div>
                        <div className="text-xs text-muted-foreground">{log.userUsername}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{log.challengeTitle}</div>
                        <div className="text-xs text-muted-foreground">{log.levelName}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{log.difficulty}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-emerald-600 font-bold">+{log.xpEarned} XP</div>
                        <div className="text-xs text-muted-foreground">{log.timeSpent} dtk</div>
                      </TableCell>
                      <TableCell>{formatDate(log.submittedAt)}</TableCell>
                    </TableRow>
                  )) : (
                    <TableRow><TableCell colSpan={5} className="text-center h-24">Belum ada aktivitas</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
              <RenderPagination currentPage={mcPage} totalPages={mcTotal} onPageChange={setMcPage} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Aktivitas Dosen (CRUD Challenge)</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Judul Challenge</TableHead>
                    <TableHead>Level & Difficulty</TableHead>
                    <TableHead>Base XP</TableHead>
                    <TableHead>Aksi</TableHead>
                    <TableHead>Waktu</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dosenChallenge.length > 0 ? dosenChallenge.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="pl-6 font-medium">{log.title}</TableCell>
                      <TableCell>
                        <div><Badge variant="outline" className="mb-1">{log.levelName}</Badge></div>
                        <span className="text-xs">{log.difficulty}</span>
                      </TableCell>
                      <TableCell>{log.xpBase} XP</TableCell>
                      <TableCell>
                        {log.wasUpdated ? (
                          <Badge className="bg-blue-500 hover:bg-blue-600">Diperbarui</Badge>
                        ) : (
                          <Badge className="bg-emerald-500 hover:bg-emerald-600">Dibuat</Badge>
                        )}
                      </TableCell>
                      <TableCell>{formatDate(log.wasUpdated ? log.updatedAt : log.createdAt)}</TableCell>
                    </TableRow>
                  )) : (
                    <TableRow><TableCell colSpan={5} className="text-center h-24">Belum ada aktivitas</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
              <RenderPagination currentPage={dcPage} totalPages={dcTotal} onPageChange={setDcPage} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB BADGE */}
        <TabsContent value="badge" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Aktivitas Mahasiswa (Badge)</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Mahasiswa</TableHead>
                    <TableHead>Badge</TableHead>
                    <TableHead>Rarity</TableHead>
                    <TableHead>Didapatkan Pada</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mhsBadge.length > 0 ? mhsBadge.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="pl-6">
                        <div className="font-medium">{log.userName}</div>
                        <div className="text-xs text-muted-foreground">{log.userUsername}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium flex items-center gap-2">
                          {log.badgeIconPath && log.badgeIconPath !== '' ? (
                            <img src={log.badgeIconPath} alt={log.badgeName} className="w-6 h-6 object-contain" />
                          ) : (
                            <div className="w-6 h-6 bg-slate-200 rounded-full shrink-0" />
                          )}
                          {log.badgeName}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={log.rarity === 'LEGENDARY' ? 'default' : log.rarity === 'EPIC' ? 'secondary' : 'outline'}>
                          {log.rarity}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(log.earnedAt)}</TableCell>
                    </TableRow>
                  )) : (
                    <TableRow><TableCell colSpan={4} className="text-center h-24">Belum ada aktivitas</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
              <RenderPagination currentPage={mbPage} totalPages={mbTotal} onPageChange={setMbPage} />
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
