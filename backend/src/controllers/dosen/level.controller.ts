import prisma from "../../config/database";
import { type CreateLevelRequest, type UpdateLevelRequest } from "../../types";

export class LevelController {
  /**
   * Get all levels with statistics
   */
  static async getAllLevels() {
    try {
      const levels = await prisma.level.findMany({
        select: {
          id: true,
          name: true,
          xpRequired: true,
          description: true,
          iconName: true,
          createdAt: true,
          _count: {
            select: {
              materials: true,
              challenges: true,
            },
          },
        },
        orderBy: {
          xpRequired: 'asc',
        },
      });

      // Transform _count to more readable format
      const formattedLevels = levels.map(level => ({
        ...level,
        totalMaterials: level._count.materials,
        totalChallenges: level._count.challenges,
        _count: undefined,
      }));

      return {
        success: true,
        message: "List Data Level",
        data: formattedLevels,
      };
    } catch (e: unknown) {
      console.error(`Error getting levels:`, e);
      return {
        success: false,
        message: `Failed to get levels: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  
 static async createLevel(options: CreateLevelRequest) {
  try {
    const { name, xpRequired, description, iconName } = options;

    // Check if level already exists
    const existingLevel = await prisma.level.findFirst({
      where: { name },
    });

    if (existingLevel) {
      return {
        success: false,
        message: "Level already exists",
      };
    }

    // Create level
    const level = await prisma.level.create({
      data: {
        name,
        xpRequired,
        description,
        iconName,
      },
      select: {
        id: true,
        name: true,
        xpRequired: true,
        description: true,
        iconName: true,
        createdAt: true,
      },
    });

    return {
      success: true,
      message: "Level created successfully!",
      data: level,
    };
  } catch (e: unknown) {
    console.error(`Error creating level:`, e);
    return {
      success: false,
      message: `Failed to create level: ${e instanceof Error ? e.message : String(e)}`,
    };
  }
 }

  /**
   * Update level
   */
  static async updateLevel(id: number, options: UpdateLevelRequest) {
    try {
      const { name, xpRequired, description, iconName } = options;

      // Check if level exists
      const existingLevel = await prisma.level.findUnique({
        where: { id },
      });

      if (!existingLevel) {
        return {
          success: false,
          message: "Level not found",
        };
      }

      // Prepare update data
      const updateData: any = {};
      if (name !== undefined) updateData.name = name;
      if (xpRequired !== undefined) updateData.xpRequired = xpRequired;
      if (description !== undefined) updateData.description = description;
      if (iconName !== undefined) updateData.iconName = iconName;

      // Check if there's anything to update
      if (Object.keys(updateData).length === 0) {
        return {
          success: false,
          message: "No fields to update",
        };
      }

      // Update level
      const level = await prisma.level.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          name: true,
          xpRequired: true,
          description: true,
          iconName: true,
          createdAt: true,
        },
      });

      return {
        success: true,
        message: "Level Updated Successfully!",
        data: level,
      };
    } catch (e: unknown) {
      console.error(`Error updating level:`, e);
      return {
        success: false,
        message: `Failed to update level: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  static async DeleteLevel(id: number) {
    try {
      const level = await prisma.level.delete({
        where: { id },
      });

      return {
        success: true,
        message: "Level deleted successfully!",
        data: level,
      };
    } catch (e: unknown) {
      console.error(`Error deleting level:`, e);
      return {
        success: false,
        message: `Failed to delete level: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  /**
   * Get level by order number (1-5)
   */
  static async getLevelById(id: number) {
    try {
      const level = await prisma.level.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          xpRequired: true,
          description: true,
          iconName: true,
          createdAt: true,
          materials: {
            select: {
              id: true,
              title: true,
              order: true,
            },
            orderBy: { order: 'asc' },
          },
          _count: {
            select: {
              challenges: true,
            },
          },
        },
      });

      if (!level) {
        return {
          success: false,
          message: `Level with id ${id} not found`,
        };
      }

      // Format response
      const formattedLevel = {
        ...level,
        totalMaterials: level.materials.length,
        totalChallenges: level._count.challenges,
        _count: undefined,
      };

      return {
        success: true,
        message: "Level Found!",
        data: formattedLevel,
      };
    } catch (e: unknown) {
      console.error(`Error getting level by id:`, e);
      return {
        success: false,
        message: `Failed to get level: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }
}
