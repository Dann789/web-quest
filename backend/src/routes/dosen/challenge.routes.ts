import { Elysia, t } from "elysia";
import { Difficulty, ChallengeMethod } from "@prisma/client";
import { ChallengeController } from "../../controllers/dosen/challenge.controller";
import {
  type CreateChallengeRequest,
  type UpdateChallengeRequest,
} from "../../types";

// Enum values for validation
const difficultyValues = Object.values(Difficulty);
const methodValues = Object.values(ChallengeMethod);

export const challengeRoutes = new Elysia({ prefix: "/api/challenges" })

  // GET all challenges with pagination and filters
  .get("/", ({ query: { page, limit, levelId, method } }) => 
    ChallengeController.getAllChallenges(
        Number(page ?? 1), 
        Number(limit ?? 10),
        levelId ? Number(levelId) : undefined,
        method as ChallengeMethod
    ), {
      query: t.Object({
        page: t.Optional(t.Numeric()),
        limit: t.Optional(t.Numeric()),
        levelId: t.Optional(t.Numeric()),
        method: t.Optional(t.String({ enum: methodValues }))
      })
    }
  )

  // GET challenges by level  (MUST be before /:id to avoid route conflict)
  // Contoh: GET /api/challenges/level/1
  .get("/level/:levelId", ({ params: { levelId } }) =>
    ChallengeController.getChallengesByLevel(levelId), {
      params: t.Object({
        levelId: t.Numeric()
      })
    }
  )

  // GET challenges filtered by method 
  .get("/method/:method", ({ params: { method } }) => {
    const normalizedMethod = method.toUpperCase() as ChallengeMethod;
    if (!methodValues.includes(normalizedMethod)) {
      return {
        success: false,
        message: `Invalid method. Valid values: ${methodValues.join(', ')}`
      };
    }
    return ChallengeController.getChallengeByMethod(normalizedMethod);
  }, {
    params: t.Object({
      method: t.String() // Accepts any casing, validated manually above
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
      // Required fields
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
      // Optional fields (dipakai berdasarkan method)
      hint: t.Optional(t.Nullable(t.String())),
      isActive: t.Optional(t.Boolean()),

      // CODING_MANUAL
      starterCode: t.Optional(t.Nullable(t.String())),
      correctAnswer: t.Optional(t.Nullable(t.String())),

      // FIX_THE_BUG
      buggyCode: t.Optional(t.Nullable(t.String())),

      // DRAG_AND_DROP
      blocks: t.Optional(t.Nullable(t.Array(t.String()))),
      expectedOrder: t.Optional(t.Nullable(t.Array(t.String()))),

      // SANDBOX
      sandboxEnabled: t.Optional(t.Boolean()),
      sandboxTemplate: t.Optional(t.Nullable(t.String())),
      sandboxLevel: t.Optional(t.Nullable(t.String()))
    })
  })

  // PATCH update challenge (semua field opsional)
  .patch("/:id", ({ params: { id }, body }) =>
    ChallengeController.updateChallenge(id, body as UpdateChallengeRequest), {
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
        hint: t.Optional(t.Nullable(t.String())),
        isActive: t.Optional(t.Boolean()),

        // Field spesifik per metode
        starterCode: t.Optional(t.Nullable(t.String())),
        correctAnswer: t.Optional(t.Nullable(t.String())),
        buggyCode: t.Optional(t.Nullable(t.String())),
        blocks: t.Optional(t.Nullable(t.Array(t.String()))),
        expectedOrder: t.Optional(t.Nullable(t.Array(t.String()))),

        // SANDBOX
        sandboxEnabled: t.Optional(t.Boolean()),
        sandboxTemplate: t.Optional(t.Nullable(t.String())),
        sandboxLevel: t.Optional(t.Nullable(t.String()))
      })
    }
  )

  // DELETE challenge
  .delete("/:id", ({ params: { id } }) => ChallengeController.deleteChallenge(id), {
    params: t.Object({
      id: t.Numeric()
    })
  });
