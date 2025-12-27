import { Elysia, t } from "elysia";
import { Difficulty, ChallengeMethod } from "@prisma/client";
import { ChallengeController } from "../../controllers/admin/challenge.controller";
import {
  type CreateChallengeRequest,
  type UpdateChallengeRequest,
  type CreateVariantRequest,
  type UpdateVariantRequest,
} from "../../types";

// Enum values for validation
const difficultyValues = Object.values(Difficulty);
const methodValues = Object.values(ChallengeMethod);

export const challengeRoutes = new Elysia({ prefix: "/api/challenges" })
  // ============================================
  // CHALLENGE ROUTES
  // ============================================

  // GET all challenges with optional filters
  .get("/", ({ query }) => {
    const filters: any = {};
    if (query.levelId) filters.levelId = Number(query.levelId);
    if (query.difficulty) filters.difficulty = query.difficulty as Difficulty;
    if (query.method) filters.method = query.method as ChallengeMethod;
    if (query.isActive !== undefined) filters.isActive = query.isActive === 'true';
    
    return ChallengeController.getAllChallenges(filters);
  }, {
    query: t.Object({
      levelId: t.Optional(t.String()),
      difficulty: t.Optional(t.String()),
      method: t.Optional(t.String()),
      isActive: t.Optional(t.String()),
    })
  })

  // GET challenges by level (MUST be before /:id)
  .get("/level/:levelId", ({ params: { levelId } }) => ChallengeController.getChallengesByLevel(levelId), {
    params: t.Object({
      levelId: t.Numeric()
    })
  })

  // GET challenge by ID
  .get("/:id", ({ params: { id } }) => ChallengeController.getChallengeById(id), {
    params: t.Object({
      id: t.Numeric()
    })
  })

  // POST create challenge
  .post("/", ({ body }) => ChallengeController.createChallenge(body as CreateChallengeRequest), {
    body: t.Object({
      levelId: t.Numeric(),
      title: t.String({
        minLength: 3,
        maxLength: 200
      }),
      description: t.String({
        minLength: 10
      }),
      difficulty: t.String({
        enum: difficultyValues
      }),
      method: t.String({
        enum: methodValues
      }),
      idealTime: t.Numeric({
        minimum: 30,
        maximum: 600
      }),
      xpBase: t.Numeric({
        minimum: 5,
        maximum: 50
      }),
      validationRules: t.Object({}, { additionalProperties: true }),
      isActive: t.Optional(t.Boolean())
    })
  })

  // PATCH update challenge
  .patch("/:id", ({ params: { id }, body }) => ChallengeController.updateChallenge(id, body as UpdateChallengeRequest), {
    params: t.Object({
      id: t.Numeric()
    }),
    body: t.Object({
      levelId: t.Optional(t.Numeric()),
      title: t.Optional(t.String({
        minLength: 3,
        maxLength: 200
      })),
      description: t.Optional(t.String({
        minLength: 10
      })),
      difficulty: t.Optional(t.String({
        enum: difficultyValues
      })),
      method: t.Optional(t.String({
        enum: methodValues
      })),
      idealTime: t.Optional(t.Numeric({
        minimum: 30,
        maximum: 600
      })),
      xpBase: t.Optional(t.Numeric({
        minimum: 5,
        maximum: 50
      })),
      validationRules: t.Optional(t.Object({}, { additionalProperties: true })),
      isActive: t.Optional(t.Boolean())
    })
  })

  // DELETE challenge
  .delete("/:id", ({ params: { id } }) => ChallengeController.deleteChallenge(id), {
    params: t.Object({
      id: t.Numeric()
    })
  })

  // ============================================
  // VARIANT ROUTES
  // ============================================

  // GET variants by challenge
  .get("/:id/variants", ({ params: { id } }) => ChallengeController.getVariantsByChallenge(id), {
    params: t.Object({
      id: t.Numeric()
    })
  })

  // POST add variant to challenge
  .post("/:id/variants", ({ params: { id }, body }) => {
    return ChallengeController.addVariant({
      ...body,
      challengeId: id,
    } as CreateVariantRequest);
  }, {
    params: t.Object({
      id: t.Numeric()
    }),
    body: t.Object({
      questionContent: t.String({
        minLength: 10
      }),
      starterCode: t.Optional(t.String()),
      correctAnswer: t.Optional(t.String()),
      testCases: t.Optional(t.Object({}, { additionalProperties: true })),
      difficultyWeight: t.Optional(t.Numeric({
        minimum: 0.5,
        maximum: 2.0
      }))
    })
  })

  // PATCH update variant
  .patch("/variants/:variantId", ({ params: { variantId }, body }) => ChallengeController.updateVariant(variantId, body as UpdateVariantRequest), {
    params: t.Object({
      variantId: t.Numeric()
    }),
    body: t.Object({
      questionContent: t.Optional(t.String({
        minLength: 10
      })),
      starterCode: t.Optional(t.String()),
      correctAnswer: t.Optional(t.String()),
      testCases: t.Optional(t.Object({}, { additionalProperties: true })),
      difficultyWeight: t.Optional(t.Numeric({
        minimum: 0.5,
        maximum: 2.0
      }))
    })
  })

  // DELETE variant
  .delete("/variants/:variantId", ({ params: { variantId } }) => ChallengeController.deleteVariant(variantId), {
    params: t.Object({
      variantId: t.Numeric()
    })
  });
