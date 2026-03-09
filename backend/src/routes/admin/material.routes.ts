import { Elysia, t } from "elysia";
import { MaterialController } from "../../controllers/dosen/material.controller";
import { type CreateMaterialRequest, type UpdateMaterialRequest } from "../../types";

export const materialRoutes = new Elysia({ prefix: "/api/materials" })
    // GET all materials
    .get("/", () => {
        return MaterialController.getAllMaterials();
    })

    // POST create new material
    .post("/", ({ body }) => MaterialController.createMaterial(body as CreateMaterialRequest), {
        body: t.Object({
            levelId: t.Numeric(),
            title: t.String({
                minLength: 3,
                maxLength: 200
            }),
            content: t.String({
                minLength: 10
            }),
            order: t.Numeric({
                minimum: 1
            })
        })
    })

    // GET material by ID
    .get("/:id", ({ params: { id } }) => MaterialController.getMaterialById(id), {
        params: t.Object({
            id: t.Numeric()
        })
    })

    // GET materials by level ID
    .get("/level/:levelId", ({ params: { levelId } }) => MaterialController.getMaterialsByLevel(levelId), {
        params: t.Object({
            levelId: t.Numeric()
        })
    })

    // PATCH update material
    .patch("/:id", ({ params: { id }, body }) => MaterialController.updateMaterial(id, body as UpdateMaterialRequest), {
        params: t.Object({
            id: t.Numeric()
        }),
        body: t.Object({
            levelId: t.Optional(t.Numeric()),
            title: t.Optional(t.String({
                minLength: 3,
                maxLength: 200
            })),
            content: t.Optional(t.String({
                minLength: 10
            })),
            order: t.Optional(t.Numeric({
                minimum: 1
            }))
        })
    })

    // DELETE material
    .delete("/:id", ({ params: { id } }) => MaterialController.deleteMaterial(id), {
        params: t.Object({
            id: t.Numeric()
        })
    });
