import { Elysia, t } from "elysia";
import { createUser, getUser, getUserById, updateUser, deleteUser } from "../controller/UserController";

const userRoutes = new Elysia({ prefix: "/users" })
    .get('/', () => getUser())
    .post('/', ({ body }) => createUser(body as { name: string, email: string, password: string }), {
        body: t.Object({
            name: t.String({
                minLength: 3,
                maxLength: 100,
            }),
            email: t.String({
                minLength: 3,
                maxLength: 100,
            }),
            password: t.String({
                maxLength: 10,
            }),
        })
    })
    .get('/:id', ({ params: { id } }) => getUserById(id))
    .patch('/:id', ({ params: { id }, body }) => updateUser(id, body as { name?: string, email?: string, password?: string }), {
        body: t.Object({
            name: t.Optional(t.String({
                minLength: 3,
                maxLength: 100,
            })),
            email: t.Optional(t.String({
                minLength: 3,
                maxLength: 100,
            })),
            password: t.Optional(t.String({
                minLength: 3,
                maxLength: 100,
            })),
        })
    })
    .delete('/:id', ({ params: { id } }) => deleteUser(id));

export default userRoutes;