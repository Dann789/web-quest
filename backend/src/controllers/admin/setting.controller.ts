import prisma from "../../config/database";

export class SettingController {
  static async getFormSetting() {
    try {
      const setting = await prisma.formSetting.findFirst({
        orderBy: { id: 'desc' }
      });

      return {
        success: true,
        message: "Pengaturan form berhasil diambil",
        data: {
          isActive: setting?.isActive ?? false,
        },
      };
    } catch (error) {
      console.error("Error fetching form setting:", error);
      return {
        success: false,
        message: "Gagal mengambil pengaturan form",
      };
    }
  }

  static async toggleFormSetting(isActive: boolean) {
    try {
      // Find existing setting to update, or create one if it doesn't exist
      const existing = await prisma.formSetting.findFirst({
        orderBy: { id: 'desc' }
      });

      if (existing) {
        const updated = await prisma.formSetting.update({
          where: { id: existing.id },
          data: { isActive },
        });

        return {
          success: true,
          message: "Pengaturan form berhasil diperbarui",
          data: {
            isActive: updated.isActive,
          },
        };
      } else {
        const created = await prisma.formSetting.create({
          data: { isActive },
        });

        return {
          success: true,
          message: "Pengaturan form berhasil dibuat",
          data: {
            isActive: created.isActive,
          },
        };
      }
    } catch (error) {
      console.error("Error toggling form setting:", error);
      return {
        success: false,
        message: "Gagal memperbarui pengaturan form",
      };
    }
  }
}
