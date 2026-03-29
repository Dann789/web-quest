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

      return {
        success: true,
        message: "Progres Materi yang sudah selesai berhasil diambil",
        data: {
          completedMaterials: completedMaterials.map((material) => material.materialId),
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
}
