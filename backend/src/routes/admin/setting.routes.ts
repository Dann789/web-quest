import { Elysia, t } from "elysia";
import { SettingController } from "../../controllers/admin/setting.controller";

export const settingRoutes = new Elysia({ prefix: "/api/admin/settings" })
  .get("/form-setting", () => SettingController.getFormSetting())
  .put(
    "/toggle",
    ({ body }) => SettingController.toggleFormSetting(body.isActive),
    {
      body: t.Object({
        isActive: t.Boolean(),
      }),
    }
  );
