import { Elysia, t } from "elysia";
import { UserController } from "../../controllers/admin/user.controller";
import { type CreateUserRequest, type UpdateUserRequest } from "../../types";
import { UserRole } from "@prisma/client";

export const userRoutes = new Elysia({ prefix: "/api/users" })
    .get('/', () => UserController.getAllUsers())

    .post('/', ({ body }) => UserController.createUser(body as CreateUserRequest), {
        body: t.Object({
            username: t.String({
                minLength: 3,
                maxLength: 30
            }),
            name: t.String({
                minLength: 2,
                maxLength: 100
            }),
            email: t.String({
                format: 'email',
                minLength: 6,
                maxLength: 100,
            }),
            password: t.String({
                minLength: 6,
                maxLength: 10
            }),
            role: t.Optional(t.String({
                enum: Object.values(UserRole)
            }))
        })
    })

    .get('/:id', ({ params: { id } }) => UserController.getUserById(id), {
        params: t.Object({
            id: t.Numeric()
        })
    })

    .patch('/:id', ({ params: { id }, body }) => UserController.updateUser(id, body as UpdateUserRequest), {
        params: t.Object({
            id: t.Numeric()
        }),
        body: t.Object({
            username: t.Optional(t.String({
                minLength: 3,
                maxLength: 30
            })),
            name: t.Optional(t.String({
                minLength: 2,
                maxLength: 100
            })),
            email: t.Optional(t.String({
                format: 'email',
                minLength: 6,
                maxLength: 100,
            })),
            password: t.Optional(t.String({
                minLength: 6,
                maxLength: 10,
            })),
            role: t.Optional(t.String({
                enum: Object.values(UserRole)
            }))
        })
    })

    .delete('/:id', ({ params: { id } }) => UserController.deleteUser(id), {
        params: t.Object({
            id: t.Numeric()
        })
    })