import prisma from "../../config/database";
import { type CreateMaterialRequest, type UpdateMaterialRequest } from "../../types";

export class MaterialController {
  /**
   * Get all materials with optional level filter
   */
  static async getAllMaterials(levelId?: number) {
    try {
      const whereClause = levelId ? { levelId } : {};

      const materials = await prisma.material.findMany({
        where: whereClause,
        select: {
          id: true,
          levelId: true,
          title: true,
          content: true,
          xpReward: true,
          order: true,
          createdAt: true,
          updatedAt: true,
          level: {
            select: {
              id: true,
              name: true,
              order: true,
            },
          },
        },
        orderBy: [
          { levelId: 'asc' },
          { order: 'asc' },
        ],
      });

      return {
        success: true,
        message: "List Data Material",
        data: materials,
      };
    } catch (e: unknown) {
      console.error(`Error getting materials: ${e}`);
      return {
        success: false,
        message: "Failed to get materials",
      };
    }
  }

  /**
   * Create new material
   */
  static async createMaterial(options: CreateMaterialRequest) {
    try {
      const { levelId, title, content, xpReward, order } = options;

      // Validation
      if (!levelId || !title || !content || xpReward === undefined || order === undefined) {
        return {
          success: false,
          message: "All fields are required: levelId, title, content, xpReward, order",
        };
      }

      // Check if level exists
      const levelExists = await prisma.level.findUnique({
        where: { id: levelId },
      });

      if (!levelExists) {
        return {
          success: false,
          message: "Level not found",
        };
      }

      // Check if order already exists for this level
      const orderExists = await prisma.material.findFirst({
        where: {
          levelId,
          order,
        },
      });

      if (orderExists) {
        return {
          success: false,
          message: `Material with order ${order} already exists in this level`,
        };
      }

      // Create material
      const material = await prisma.material.create({
        data: {
          levelId,
          title,
          content,
          xpReward,
          order,
        },
        select: {
          id: true,
          levelId: true,
          title: true,
          content: true,
          xpReward: true,
          order: true,
          createdAt: true,
          level: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return {
        success: true,
        message: "Material Created Successfully!",
        data: material,
      };
    } catch (e: unknown) {
      console.error(`Error creating material:`, e);
      return {
        success: false,
        message: `Failed to create material: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  /**
   * Get material by ID
   */
  static async getMaterialById(id: number) {
    try {
      const material = await prisma.material.findUnique({
        where: { id },
        select: {
          id: true,
          levelId: true,
          title: true,
          content: true,
          xpReward: true,
          order: true,
          createdAt: true,
          updatedAt: true,
          level: {
            select: {
              id: true,
              name: true,
              order: true,
            },
          },
        },
      });

      if (!material) {
        return {
          success: false,
          message: "Material not found",
        };
      }

      return {
        success: true,
        message: "Material Found!",
        data: material,
      };
    } catch (e: unknown) {
      console.error(`Error getting material by id: ${e}`);
      return {
        success: false,
        message: "Failed to get material by id",
      };
    }
  }

  /**
   * Update material
   */
  static async updateMaterial(id: number, options: UpdateMaterialRequest) {
    try {
      const { levelId, title, content, xpReward, order } = options;

      // Check if material exists
      const existingMaterial = await prisma.material.findUnique({
        where: { id },
      });

      if (!existingMaterial) {
        return {
          success: false,
          message: "Material not found",
        };
      }

      // If levelId is being updated, check if new level exists
      if (levelId && levelId !== existingMaterial.levelId) {
        const levelExists = await prisma.level.findUnique({
          where: { id: levelId },
        });

        if (!levelExists) {
          return {
            success: false,
            message: "Level not found",
          };
        }
      }

      // If order is being updated, check if new order is unique within level
      const targetLevelId = levelId || existingMaterial.levelId;
      if (order && order !== existingMaterial.order) {
        const orderExists = await prisma.material.findFirst({
          where: {
            levelId: targetLevelId,
            order,
            NOT: { id },
          },
        });

        if (orderExists) {
          return {
            success: false,
            message: `Material with order ${order} already exists in this level`,
          };
        }
      }

      // Prepare update data
      const updateData: any = {};
      if (levelId !== undefined) updateData.levelId = levelId;
      if (title !== undefined) updateData.title = title;
      if (content !== undefined) updateData.content = content;
      if (xpReward !== undefined) updateData.xpReward = xpReward;
      if (order !== undefined) updateData.order = order;

      // Update material
      const material = await prisma.material.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          levelId: true,
          title: true,
          content: true,
          xpReward: true,
          order: true,
          createdAt: true,
          updatedAt: true,
          level: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return {
        success: true,
        message: "Material Updated Successfully!",
        data: material,
      };
    } catch (e: unknown) {
      console.error(`Error updating material: ${e}`);
      return {
        success: false,
        message: "Failed to update material",
      };
    }
  }

  /**
   * Delete material
   */
  static async deleteMaterial(id: number) {
    try {
      // Check if material exists
      const existingMaterial = await prisma.material.findUnique({
        where: { id },
      });

      if (!existingMaterial) {
        return {
          success: false,
          message: "Material not found",
        };
      }

      // Delete material
      await prisma.material.delete({
        where: { id },
      });

      return {
        success: true,
        message: "Material Deleted Successfully!",
      };
    } catch (e: unknown) {
      console.error(`Error deleting material: ${e}`);
      return {
        success: false,
        message: "Failed to delete material",
      };
    }
  }

  /**
   * Get materials by level ID
   */
  static async getMaterialsByLevel(levelId: number) {
    try {
      // Check if level exists
      const levelExists = await prisma.level.findUnique({
        where: { id: levelId },
      });

      if (!levelExists) {
        return {
          success: false,
          message: "Level not found",
        };
      }

      const materials = await prisma.material.findMany({
        where: { levelId },
        select: {
          id: true,
          levelId: true,
          title: true,
          content: true,
          xpReward: true,
          order: true,
          createdAt: true,
        },
        orderBy: { order: 'asc' },
      });

      return {
        success: true,
        message: `Materials for Level: ${levelExists.name}`,
        data: {
          level: levelExists,
          materials,
          totalMaterials: materials.length,
        },
      };
    } catch (e: unknown) {
      console.error(`Error getting materials by level: ${e}`);
      return {
        success: false,
        message: "Failed to get materials by level",
      };
    }
  }
}
