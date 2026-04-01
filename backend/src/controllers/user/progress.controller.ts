import prisma from "../../config/database";

export class UserProgressController {
  static async getCompleteNodes(userId: number, levelId: number) {
    try {
      const completedNodes = await prisma.assignment.findMany({
        where: {
          userId: userId,
          levelId: levelId,
          isCompleted: true,
        },
        select: {
          nodeSlot: true,
        },
        orderBy: {
          nodeSlot: "asc",
        },
      });

      return {
        success: true,
        message: "Progres Node Challenge yang sudah selesai berhasil diambil",
        data: {
          completedNodes: completedNodes.map((node) => node.nodeSlot),
        },
      };
    } catch (error) {
      console.error("Error fetching completed nodes:", error);
      return {
        success: false,
        message: "Failed to fetch completed nodes",
      };
    }
  }

  static async addProgressMaterial(userId: number, materialId: number) {
    try {
      const materialProgressExists = await prisma.materialProgress.findUnique({
        where: {
          idx_material_progress_unique: {
            userId: userId,
            materialId: materialId,
          },
        },
      });

      if (materialProgressExists) {
        return {
          success: false,
          message: "Material progress sudah ada",
        };
      }

      const materialProgress = await prisma.materialProgress.create({
        data: {
          userId: userId,
          materialId: materialId,
          isCompleted: false,
          startedAt: new Date(),
        },
      });

      return {
        success: true,
        message: "Progres materi berhasil ditambahkan",
        data: {
          materialProgress: materialProgress,
        },
      };
    } catch (error) {
      console.error("Error adding material progress:", error);
      return {
        success: false,
        message: "Failed to add material progress",
      };
    }
  }

  static async updateStatusMaterial(userId: number, materialId: number) {
    try {
      const materialProgress = await prisma.materialProgress.findUnique({
        where: {
          idx_material_progress_unique: {
            userId: userId,
            materialId: materialId,
          },
        },
      });

      if (!materialProgress) {
        return {
          success: false,
          message: "Material progress tidak ditemukan",
        };
      }

      await prisma.materialProgress.update({
        where: {
          idx_material_progress_unique: {
            userId: userId,
            materialId: materialId,
          },
        },
        data: {
          isCompleted: true,
          completedAt: new Date(),
        },
      });

      return {
        success: true,
        message: "Status materi berhasil diupdate",
      };
    } catch (error) {
      console.error("Error updating material status:", error);
      return {
        success: false,
        message: "Failed to update material status",
      };
    }
  }

  static async getMaterialProgress(userId: number, levelId: number) {
    try {
      const completedMaterials = await prisma.materialProgress.findMany({
        where: {
          userId: userId,
          isCompleted: true,
          material: {
            levelId: levelId,
          },
        },
        select: {
          materialId: true,
        },
      });

      const totalMaterials = await prisma.material.count({
        where: {
          levelId: levelId,
        },
      });

      const countCompleted = completedMaterials.length;
      const isAllCompleted = totalMaterials > 0 && countCompleted === totalMaterials;

      return {
        success: true,
        message: "Progres Materi yang sudah selesai berhasil diambil",
        data: {
          completedMaterials: completedMaterials.map((material) => material.materialId),
          totalMaterials: totalMaterials,
          isAllCompleted: isAllCompleted,
        },
      };
    } catch (error) {
      console.error("Error fetching completed materials:", error);
      return {
        success: false,
        message: "Failed to fetch completed materials",
      };
    }
  }

  static async getProgressLevel(userId: number, levelId: number) {
    try {
      const completedNodes = await this.getCompleteNodes(userId, levelId);
      const completedMaterials = await this.getMaterialProgress(userId, levelId);

      const totalChallenges = await prisma.challenge.count({
        where: {
          levelId: levelId
        }
      });
      const totalNodes = totalChallenges + (completedMaterials.data?.totalMaterials ? 1 : 0);
      const totalCompleted = (completedNodes.data?.completedNodes?.length || 0) + (completedMaterials.data?.isAllCompleted ? 1 : 0);
      const progressPercentage = totalNodes ? Math.round((totalCompleted / totalNodes) * 100) : 0;

      return {
        success: true,
        message: "Progres Level yang sudah selesai berhasil diambil",
        data: {
          completedNodes: completedNodes.data?.completedNodes,
          completedMaterials: completedMaterials.data?.completedMaterials,
          totalMaterials: completedMaterials.data?.totalMaterials,
          isAllCompleted: completedMaterials.data?.isAllCompleted,
          totalNodes: totalNodes,
          totalCompleted: totalCompleted,
          progressPercentage: progressPercentage,
        },
      };
    } catch (error) {
      console.error("Error fetching level progress:", error);
      return {
        success: false,
        message: "Failed to fetch level progress",
      };
    }
  }
}
