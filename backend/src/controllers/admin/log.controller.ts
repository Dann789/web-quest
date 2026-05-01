import prisma from "../../config/database";
import { UserRole } from "@prisma/client";

interface PaginationParams {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
}

function buildDateRange(startDate?: string, endDate?: string) {
  const gte = startDate ? new Date(startDate) : undefined;
  let lte: Date | undefined;
  if (endDate) {
    lte = new Date(endDate);
    lte.setHours(23, 59, 59, 999);
  }
  return { gte, lte };
}

function buildPagination(page = 1, limit = 20) {
  const safePage = Math.max(1, page);
  const safeLimit = Math.min(Math.max(1, limit), 100);
  return {
    skip: (safePage - 1) * safeLimit,
    take: safeLimit,
    page: safePage,
    limit: safeLimit,
  };
}

export class LogController {
  static async getDosenLevelLogs(params: PaginationParams) {
    try {
      const { page, limit, startDate, endDate } = params;
      const { skip, take, page: currentPage, limit: currentLimit } = buildPagination(page, limit);
      const { gte, lte } = buildDateRange(startDate, endDate);

      const dateFilter = (gte || lte)
        ? { OR: [{ createdAt: { gte, lte } }, { updatedAt: { gte, lte } }] }
        : {};

      const [data, total] = await Promise.all([
        prisma.level.findMany({
          where: dateFilter,
          select: {
            id: true,
            name: true,
            xpRequired: true,
            description: true,
            iconName: true,
            easyNodes: true,
            mediumNodes: true,
            hardNodes: true,
            createdAt: true,
            updatedAt: true,
            _count: {
              select: {
                materials: true,
                challenges: true,
              },
            },
          },
          orderBy: { updatedAt: "desc" },
          skip,
          take,
        }),
        prisma.level.count({ where: dateFilter }),
      ]);

      const formatted = data.map((l) => ({
        id: l.id,
        name: l.name,
        xpRequired: l.xpRequired,
        description: l.description,
        iconName: l.iconName,
        easyNodes: l.easyNodes,
        mediumNodes: l.mediumNodes,
        hardNodes: l.hardNodes,
        totalMaterials: l._count.materials,
        totalChallenges: l._count.challenges,
        createdAt: l.createdAt,
        updatedAt: l.updatedAt,
        wasUpdated: l.updatedAt.getTime() !== l.createdAt.getTime(),
      }));

      return {
        success: true,
        message: "Log aktivitas CRUD Level berhasil diambil",
        data: formatted,
        pagination: {
          page: currentPage,
          limit: currentLimit,
          total,
          totalPages: Math.ceil(total / currentLimit),
        },
      };
    } catch (e: unknown) {
      console.error("Error getDosenLevelLogs:", e);
      return {
        success: false,
        message: `Gagal mengambil log level: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  static async getDosenMaterialLogs(params: PaginationParams) {
    try {
      const { page, limit, startDate, endDate } = params;
      const { skip, take, page: currentPage, limit: currentLimit } = buildPagination(page, limit);
      const { gte, lte } = buildDateRange(startDate, endDate);

      const dateFilter = (gte || lte)
        ? { OR: [{ createdAt: { gte, lte } }, { updatedAt: { gte, lte } }] }
        : {};

      const [data, total] = await Promise.all([
        prisma.material.findMany({
          where: dateFilter,
          select: {
            id: true,
            title: true,
            order: true,
            createdAt: true,
            updatedAt: true,
            level: {
              select: { id: true, name: true },
            },
          },
          orderBy: { updatedAt: "desc" },
          skip,
          take,
        }),
        prisma.material.count({ where: dateFilter }),
      ]);

      const formatted = data.map((m) => ({
        id: m.id,
        title: m.title,
        order: m.order,
        levelId: m.level.id,
        levelName: m.level.name,
        createdAt: m.createdAt,
        updatedAt: m.updatedAt,
        wasUpdated: m.updatedAt.getTime() !== m.createdAt.getTime(),
      }));

      return {
        success: true,
        message: "Log aktivitas CRUD Materi berhasil diambil",
        data: formatted,
        pagination: {
          page: currentPage,
          limit: currentLimit,
          total,
          totalPages: Math.ceil(total / currentLimit),
        },
      };
    } catch (e: unknown) {
      console.error("Error getDosenMaterialLogs:", e);
      return {
        success: false,
        message: `Gagal mengambil log materi: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  static async getDosenChallengeLogs(params: PaginationParams) {
    try {
      const { page, limit, startDate, endDate } = params;
      const { skip, take, page: currentPage, limit: currentLimit } = buildPagination(page, limit);
      const { gte, lte } = buildDateRange(startDate, endDate);

      const dateFilter = (gte || lte)
        ? { OR: [{ createdAt: { gte, lte } }, { updatedAt: { gte, lte } }] }
        : {};

      const [data, total] = await Promise.all([
        prisma.challenge.findMany({
          where: dateFilter,
          select: {
            id: true,
            title: true,
            difficulty: true,
            method: true,
            idealTime: true,
            xpBase: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
            level: {
              select: { id: true, name: true },
            },
          },
          orderBy: { updatedAt: "desc" },
          skip,
          take,
        }),
        prisma.challenge.count({ where: dateFilter }),
      ]);

      const formatted = data.map((c) => ({
        id: c.id,
        title: c.title,
        difficulty: c.difficulty,
        method: c.method,
        idealTime: c.idealTime,
        xpBase: c.xpBase,
        isActive: c.isActive,
        levelId: c.level.id,
        levelName: c.level.name,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
        wasUpdated: c.updatedAt.getTime() !== c.createdAt.getTime(),
      }));

      return {
        success: true,
        message: "Log aktivitas CRUD Soal berhasil diambil",
        data: formatted,
        pagination: {
          page: currentPage,
          limit: currentLimit,
          total,
          totalPages: Math.ceil(total / currentLimit),
        },
      };
    } catch (e: unknown) {
      console.error("Error getDosenChallengeLogs:", e);
      return {
        success: false,
        message: `Gagal mengambil log soal: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  static async getMahasiswaMaterialLogs(params: PaginationParams) {
    try {
      const { page, limit, startDate, endDate } = params;
      const { skip, take, page: currentPage, limit: currentLimit } = buildPagination(page, limit);
      const { gte, lte } = buildDateRange(startDate, endDate);

      // Filter berdasarkan startedAt atau completedAt
      const dateFilter = (gte || lte)
        ? {
            OR: [
              { startedAt: { gte, lte } },
              { completedAt: { gte, lte } },
            ],
          }
        : {};

      const [data, total] = await Promise.all([
        prisma.materialProgress.findMany({
          where: {
            ...dateFilter,
            user: { role: UserRole.MAHASISWA },
          },
          select: {
            id: true,
            isCompleted: true,
            startedAt: true,
            completedAt: true,
            user: {
              select: { id: true, name: true, username: true },
            },
            material: {
              select: {
                id: true,
                title: true,
                order: true,
                level: { select: { id: true, name: true } },
              },
            },
          },
          orderBy: { startedAt: "desc" },
          skip,
          take,
        }),
        prisma.materialProgress.count({
          where: {
            ...dateFilter,
            user: { role: UserRole.MAHASISWA },
          },
        }),
      ]);

      const formatted = data.map((mp) => ({
        id: mp.id,
        userId: mp.user.id,
        userName: mp.user.name,
        userUsername: mp.user.username,
        materialId: mp.material.id,
        materialTitle: mp.material.title,
        materialOrder: mp.material.order,
        levelId: mp.material.level.id,
        levelName: mp.material.level.name,
        isCompleted: mp.isCompleted,
        startedAt: mp.startedAt,
        completedAt: mp.completedAt,
      }));

      return {
        success: true,
        message: "Log aktivitas membaca materi mahasiswa berhasil diambil",
        data: formatted,
        pagination: {
          page: currentPage,
          limit: currentLimit,
          total,
          totalPages: Math.ceil(total / currentLimit),
        },
      };
    } catch (e: unknown) {
      console.error("Error getMahasiswaMaterialLogs:", e);
      return {
        success: false,
        message: `Gagal mengambil log materi mahasiswa: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  static async getMahasiswaChallengeLogs(params: PaginationParams) {
    try {
      const { page, limit, startDate, endDate } = params;
      const { skip, take, page: currentPage, limit: currentLimit } = buildPagination(page, limit);
      const { gte, lte } = buildDateRange(startDate, endDate);

      const dateFilter = (gte || lte) ? { submittedAt: { gte, lte } } : {};

      const [data, total] = await Promise.all([
        prisma.attempt.findMany({
          where: {
            ...dateFilter,
            user: { role: UserRole.MAHASISWA },
          },
          select: {
            id: true,
            isFirstAttempt: true,
            timeSpent: true,
            xpEarned: true,
            submittedAt: true,
            user: {
              select: { id: true, name: true, username: true },
            },
            challenge: {
              select: {
                id: true,
                title: true,
                difficulty: true,
                method: true,
                xpBase: true,
                level: { select: { id: true, name: true } },
              },
            },
            assignment: {
              select: {
                id: true,
                nodeSlot: true,
                isCompleted: true,
                completedAt: true,
              },
            },
          },
          orderBy: { submittedAt: "desc" },
          skip,
          take,
        }),
        prisma.attempt.count({
          where: {
            ...dateFilter,
            user: { role: UserRole.MAHASISWA },
          },
        }),
      ]);

      const formatted = data.map((a) => ({
        id: a.id,
        userId: a.user.id,
        userName: a.user.name,
        userUsername: a.user.username,
        challengeId: a.challenge.id,
        challengeTitle: a.challenge.title,
        difficulty: a.challenge.difficulty,
        method: a.challenge.method,
        xpBase: a.challenge.xpBase,
        levelId: a.challenge.level.id,
        levelName: a.challenge.level.name,
        nodeSlot: a.assignment.nodeSlot,
        isCompleted: a.assignment.isCompleted,
        isFirstAttempt: a.isFirstAttempt,
        timeSpent: a.timeSpent,
        xpEarned: a.xpEarned,
        submittedAt: a.submittedAt,
        completedAt: a.assignment.completedAt,
      }));

      return {
        success: true,
        message: "Log aktivitas pengerjaan challenge mahasiswa berhasil diambil",
        data: formatted,
        pagination: {
          page: currentPage,
          limit: currentLimit,
          total,
          totalPages: Math.ceil(total / currentLimit),
        },
      };
    } catch (e: unknown) {
      console.error("Error getMahasiswaChallengeLogs:", e);
      return {
        success: false,
        message: `Gagal mengambil log challenge mahasiswa: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  static async getMahasiswaLevelLogs(params: PaginationParams) {
    try {
      const { page, limit, startDate, endDate } = params;
      const { skip, take, page: currentPage, limit: currentLimit } = buildPagination(page, limit);
      const { gte, lte } = buildDateRange(startDate, endDate);

      const dateFilter = (gte || lte) ? { unlockedAt: { gte, lte } } : {};

      const [data, total] = await Promise.all([
        prisma.progress.findMany({
          where: {
            ...dateFilter,
            isUnlocked: true,
            user: { role: UserRole.MAHASISWA },
          },
          select: {
            id: true,
            isUnlocked: true,
            unlockedAt: true,
            completedAt: true,
            user: {
              select: { id: true, name: true, username: true },
            },
            level: {
              select: { id: true, name: true, xpRequired: true },
            },
          },
          orderBy: { unlockedAt: "desc" },
          skip,
          take,
        }),
        prisma.progress.count({
          where: {
            ...dateFilter,
            isUnlocked: true,
            user: { role: UserRole.MAHASISWA },
          },
        }),
      ]);

      const formatted = data.map((p) => ({
        id: p.id,
        userId: p.user.id,
        userName: p.user.name,
        userUsername: p.user.username,
        levelId: p.level.id,
        levelName: p.level.name,
        xpRequired: p.level.xpRequired,
        isUnlocked: p.isUnlocked,
        unlockedAt: p.unlockedAt,
        completedAt: p.completedAt,
        isLevelCompleted: p.completedAt !== null,
      }));

      return {
        success: true,
        message: "Log aktivitas membuka level mahasiswa berhasil diambil",
        data: formatted,
        pagination: {
          page: currentPage,
          limit: currentLimit,
          total,
          totalPages: Math.ceil(total / currentLimit),
        },
      };
    } catch (e: unknown) {
      console.error("Error getMahasiswaLevelLogs:", e);
      return {
        success: false,
        message: `Gagal mengambil log level mahasiswa: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  static async getMahasiswaBadgeLogs(params: PaginationParams) {
    try {
      const { page, limit, startDate, endDate } = params;
      const { skip, take, page: currentPage, limit: currentLimit } = buildPagination(page, limit);
      const { gte, lte } = buildDateRange(startDate, endDate);

      const dateFilter = (gte || lte) ? { earnedAt: { gte, lte } } : {};

      const [data, total] = await Promise.all([
        prisma.userBadge.findMany({
          where: {
            ...dateFilter,
            user: { role: UserRole.MAHASISWA },
          },
          select: {
            id: true,
            earnedAt: true,
            user: {
              select: { id: true, name: true, username: true },
            },
            badge: {
              select: {
                id: true,
                name: true,
                description: true,
                iconPath: true,
                rarity: true,
              },
            },
          },
          orderBy: { earnedAt: "desc" },
          skip,
          take,
        }),
        prisma.userBadge.count({
          where: {
            ...dateFilter,
            user: { role: UserRole.MAHASISWA },
          },
        }),
      ]);

      const formatted = data.map((ub) => ({
        id: ub.id,
        userId: ub.user.id,
        userName: ub.user.name,
        userUsername: ub.user.username,
        badgeId: ub.badge.id,
        badgeName: ub.badge.name,
        badgeDescription: ub.badge.description,
        badgeIconPath: ub.badge.iconPath,
        rarity: ub.badge.rarity,
        earnedAt: ub.earnedAt,
      }));

      return {
        success: true,
        message: "Log perolehan badge mahasiswa berhasil diambil",
        data: formatted,
        pagination: {
          page: currentPage,
          limit: currentLimit,
          total,
          totalPages: Math.ceil(total / currentLimit),
        },
      };
    } catch (e: unknown) {
      console.error("Error getMahasiswaBadgeLogs:", e);
      return {
        success: false,
        message: `Gagal mengambil log badge mahasiswa: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }
}