import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Activity, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getCurrentProgress } from "@/services/public/MonitoringService";
import { getLevels } from "@/services/dosen/LevelService";
import type { Level } from "@/types";
import { TablePagination } from "@/components/common/TablePagination";
import { toast } from 'sonner';

export default function DosenMonitoringPage() {
  const [levels, setLevels] = useState<Level[]>([]);
  const [levelFilter, setLevelFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [userProgressData, setUserProgressData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
    totalItems: 0
  });

  const fetchData = async (page: number = 1) => {
    try {
      setIsLoading(true);
      const [progressRes, levelsRes] = await Promise.all([
        getCurrentProgress(page, 10),
        levels.length === 0 ? getLevels() : Promise.resolve({ success: true, data: levels }),
      ]);

      if (progressRes.success && progressRes.data) {
        setUserProgressData(progressRes.data);
        if (progressRes.pagination) {
          setPaginationInfo({
            totalPages: progressRes.pagination.totalPages,
            hasNext: progressRes.pagination.hasNext,
            hasPrev: progressRes.pagination.hasPrev,
            totalItems: progressRes.pagination.totalItems
          });
        }
      } else {
        toast.error(progressRes.message || "Terjadi kesalahan saat memuat data progress");
        console.error("Gagal mengambil data progress:", progressRes.message);
      }

      if (levelsRes.success && levelsRes.data && levels.length === 0) {
        setLevels(levelsRes.data);
      }
    } catch (error) {
      console.error("Error fetching logs data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  // Filter Logic
  const filteredData = userProgressData.filter((user) => {
    const nameToSearch = user.name || user.username || "";
    const matchesSearch = nameToSearch
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesLevel =
      levelFilter === "all" || user.currentLevel === levelFilter;

    return matchesSearch && matchesLevel;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Activity className="h-8 w-8 text-primary" />
            Monitoring Progress Mahasiswa
          </h1>
          <p className="text-muted-foreground mt-2">
            Monitoring progress belajar dan pencapaian mahasiswa secara
            real-time
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">
              Progress Mahasiswa Saat Ini
            </CardTitle>
            <div className="flex items-center gap-3">
              <div className="relative flex-1 w-fit">
                <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari nama mahasiswa..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Select value={levelFilter} onValueChange={setLevelFilter}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Semua Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Level</SelectItem>
                    {levels.map((lvl) => (
                      <SelectItem key={lvl.id} value={lvl.name}>
                        {lvl.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* <Button className="gap-2 px-4" size="sm">
                <Download className="h-4 w-4" />
                Export
              </Button> */}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="border-t">
              <TableRow>
                <TableHead className="w-12 text-center">No</TableHead>
                <TableHead className="text-center">Nama Mahasiswa</TableHead>
                <TableHead className="text-center">Level Aktif</TableHead>
                <TableHead className="text-center">Materi</TableHead>
                <TableHead className="text-center">Challenge</TableHead>
                <TableHead className="text-center">Progress</TableHead>
                {/* <TableHead className="text-center">Aksi</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                      <p className="text-muted-foreground text-sm font-medium">
                        Memuat data...
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredData.length > 0 ? (
                filteredData.map((data, index) => (
                  <TableRow key={data.id}>
                    <TableCell className="text-center">{(currentPage - 1) * 10 + index + 1}</TableCell>

                    <TableCell>
                      <div className="font-medium text-center">{data.name}</div>
                    </TableCell>

                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className="bg-blue-500/10 text-blue-600 border-blue-500/20"
                      >
                        {data.currentLevel}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-center">
                        {data.materialStatus === "completed" ? (
                          <Badge
                            variant="default"
                            className="bg-emerald-500 hover:bg-emerald-600"
                          >
                            Selesai
                          </Badge>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="bg-slate-200 text-slate-600 hover:bg-slate-300"
                          >
                            Belum
                          </Badge>
                        )}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <div
                          className="flex flex-col items-center px-2 py-1 bg-green-500/10 rounded border border-green-500/20 w-[60px]"
                          title={`Easy (Max ${data.nodeMax?.easy ?? 0})`}
                        >
                          <span className="text-[10px] text-muted-foreground font-bold">
                            Easy
                          </span>
                          <span className="text-sm font-bold text-green-600">
                            {data.challenges.easy}/{data.nodeMax?.easy ?? 0}
                          </span>
                        </div>
                        <div
                          className="flex flex-col items-center px-2 py-1 bg-amber-500/10 rounded border border-amber-500/20 w-[60px]"
                          title={`Medium (Max ${data.nodeMax?.medium ?? 0})`}
                        >
                          <span className="text-[10px] text-muted-foreground font-bold">
                            Medium
                          </span>
                          <span className="text-sm font-bold text-amber-600">
                            {data.challenges.medium}/{data.nodeMax?.medium ?? 0}
                          </span>
                        </div>
                        <div
                          className="flex flex-col items-center px-2 py-1 bg-red-500/10 rounded border border-red-500/20 w-[60px]"
                          title={`Hard (Max ${data.nodeMax?.hard ?? 0})`}
                        >
                          <span className="text-[10px] text-muted-foreground font-bold">
                            Hard
                          </span>
                          <span className="text-sm font-bold text-red-600">
                            {data.challenges.hard}/{data.nodeMax?.hard ?? 0}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="w-[200px]">
                      <div className="flex items-center gap-2">
                        <Progress
                          value={data.progress}
                          className="h-2 flex-1"
                        />
                        <span className="text-sm font-bold w-9 text-right">
                          {data.progress}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <p>Tidak ada data ditemukan</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination 
            currentPage={currentPage}
            totalPages={paginationInfo.totalPages}
            hasNext={paginationInfo.hasNext}
            hasPrev={paginationInfo.hasPrev}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>
    </div>
  );
}
