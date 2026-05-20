import { Elysia, t } from "elysia";
import { LogController } from "../../controllers/admin/log.controller";
import { adminOnly } from "../../middleware/auth.middleware";

const logQuerySchema = {
  query: t.Object({
    page: t.Optional(t.Numeric({ minimum: 1, default: 1 })),
    limit: t.Optional(t.Numeric({ minimum: 1, maximum: 100, default: 20 })),
    startDate: t.Optional(t.String()),
    endDate: t.Optional(t.String()),
  }),
};

export const logRoutes = new Elysia({ prefix: "/api/logs" })
  .use(adminOnly)
  .get(
    "/dosen/levels",
    ({ query }) =>
      LogController.getDosenLevelLogs({
        page: query.page,
        limit: query.limit,
        startDate: query.startDate,
        endDate: query.endDate,
      }),
    logQuerySchema,
  )

  .get(
    "/dosen/materials",
    ({ query }) =>
      LogController.getDosenMaterialLogs({
        page: query.page,
        limit: query.limit,
        startDate: query.startDate,
        endDate: query.endDate,
      }),
    logQuerySchema,
  )

  .get(
    "/dosen/challenges",
    ({ query }) =>
      LogController.getDosenChallengeLogs({
        page: query.page,
        limit: query.limit,
        startDate: query.startDate,
        endDate: query.endDate,
      }),
    logQuerySchema,
  )

  .get(
    "/mahasiswa/materials",
    ({ query }) =>
      LogController.getMahasiswaMaterialLogs({
        page: query.page,
        limit: query.limit,
        startDate: query.startDate,
        endDate: query.endDate,
      }),
    logQuerySchema,
  )

  .get(
    "/mahasiswa/challenges",
    ({ query }) =>
      LogController.getMahasiswaChallengeLogs({
        page: query.page,
        limit: query.limit,
        startDate: query.startDate,
        endDate: query.endDate,
      }),
    logQuerySchema,
  )

  .get(
    "/mahasiswa/levels",
    ({ query }) =>
      LogController.getMahasiswaLevelLogs({
        page: query.page,
        limit: query.limit,
        startDate: query.startDate,
        endDate: query.endDate,
      }),
    logQuerySchema,
  )

  .get(
    "/mahasiswa/badges",
    ({ query }) =>
      LogController.getMahasiswaBadgeLogs({
        page: query.page,
        limit: query.limit,
        startDate: query.startDate,
        endDate: query.endDate,
      }),
    logQuerySchema,
  );
