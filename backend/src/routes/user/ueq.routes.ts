import { Elysia, t } from "elysia";
import { UeqController } from "../../controllers/user/ueq.controller";

export const ueqRoutes = new Elysia({
    prefix: '/api/ueq',
})
    .get("/", () => UeqController.getUeqQuestions())
    .post('/:userId', ({ params: { userId }, body }) => UeqController.submitUeq(Number(userId), body as any), {
        params: t.Object({
            userId: t.Numeric()
        }),
        body: t.Object({
            answer: t.Array(
                t.Object({
                    questionId: t.Number(),
                    value: t.Number()
                })
            )
        })
    });