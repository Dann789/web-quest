import { Elysia, t } from "elysia";
import { LevelController } from "../../controllers/dosen/level.controller";
import { type CreateLevelRequest, type UpdateLevelRequest } from "../../types";

export const levelRoutes = new Elysia({ prefix: "/api/levels" })
    // GET all levels
    .get("/", () => LevelController.getAllLevels())

    // GET level by ID
    .get("/:id", ({ params: { id } }) => LevelController.getLevelById(id), {
        params: t.Object({
            id: t.Numeric()
        })
    })

    // Create Level
    .post("/", ({ body }) => LevelController.createLevel(body as CreateLevelRequest), {
        body: t.Object({
            name: t.String({
                minLength: 1,
                maxLength: 50
            }),
            xpRequired: t.Numeric({
                minimum: 0
            }),
            description: t.String(),
            iconName: t.String({
                maxLength: 255
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
            iconName: t.Optional(t.String({
                maxLength: 255
            }))
        })
    })

    .delete("/:id", ({ params: { id } }) => LevelController.DeleteLevel(id), {
        params: t.Object({
            id: t.Numeric()
        })
    })
    
    .get("/popular", () => LevelController.getPopularLevel());
