import { Elysia, t } from "elysia";
import { LevelController } from "../../controllers/admin/level.controller";
import { type UpdateLevelRequest } from "../../types";

export const levelRoutes = new Elysia({ prefix: "/api/levels" })
    // GET all levels
    .get("/", () => LevelController.getAllLevels())

    // GET level by ID
    .get("/:id", ({ params: { id } }) => LevelController.getLevelById(id), {
        params: t.Object({
            id: t.Numeric()
        })
    })

    // GET level by order (1-5)
    .get("/order/:order", ({ params: { order } }) => LevelController.getLevelByOrder(order), {
        params: t.Object({
            order: t.Numeric({
                minimum: 1,
                maximum: 5
            })
        })
    })

    // PATCH update level
    .patch("/:id", ({ params: { id }, body }) => LevelController.updateLevel(id, body as UpdateLevelRequest), {
        params: t.Object({
            id: t.Numeric()
        }),
        body: t.Object({
            name: t.Optional(t.String({
                minLength: 1,
                maxLength: 50
            })),
            xpRequired: t.Optional(t.Numeric({
                minimum: 0
            })),
            description: t.Optional(t.String()),
            iconUrl: t.Optional(t.String({
                maxLength: 255
            }))
        })
    });
