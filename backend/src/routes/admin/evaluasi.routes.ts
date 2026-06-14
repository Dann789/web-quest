import { Elysia } from "elysia";
import { EvaluasiController } from "../../controllers/admin/evaluasi.controller";

export const evaluasiRoutes = new Elysia({ prefix: '/api/admin/evaluasi' })
    .get('/ueq/stats', ({ query }) => EvaluasiController.getUeqStats(query))
    .get('/ueq/export', ({ query }) => EvaluasiController.getUeqExport(query))
    .get('/mrc/stats', ({ query }) => EvaluasiController.getMrcStats(query))
    .get('/mrc/export', ({ query }) => EvaluasiController.getMrcExport(query))
    .get('/mrc/reasons', ({ query }) => EvaluasiController.getMrcReasons(query));
