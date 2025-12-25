-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "challenge_method" AS ENUM ('drag_and_drop', 'coding_manual', 'fix_the_bug', 'scenario_based', 'micro_challenge_chain');

-- CreateEnum
CREATE TYPE "rarity" AS ENUM ('COMMON', 'RARE', 'EPIC', 'LEGENDARY');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "user_role" NOT NULL DEFAULT 'USER',
    "total_xp" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "levels" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "order" SMALLINT NOT NULL,
    "xp_required" INTEGER NOT NULL,
    "description" TEXT,
    "icon_url" VARCHAR(255),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "levels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "materials" (
    "id" SERIAL NOT NULL,
    "level_id" INTEGER NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "content" TEXT NOT NULL,
    "xp_reward" SMALLINT NOT NULL,
    "order" SMALLINT NOT NULL,
    "estimated_time" SMALLINT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "materials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challenges" (
    "id" SERIAL NOT NULL,
    "level_id" INTEGER NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "description" TEXT NOT NULL,
    "difficulty" "difficulty" NOT NULL,
    "method" "challenge_method" NOT NULL,
    "ideal_time" INTEGER NOT NULL,
    "xp_base" SMALLINT NOT NULL,
    "validation_rules" JSONB NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "challenges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challenge_variants" (
    "id" SERIAL NOT NULL,
    "challenge_id" INTEGER NOT NULL,
    "question_content" TEXT NOT NULL,
    "starter_code" TEXT,
    "correct_answer" TEXT,
    "test_cases" JSONB,
    "difficulty_weight" DECIMAL(3,2) NOT NULL DEFAULT 1.0,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "challenge_variants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_progress" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "level_id" INTEGER NOT NULL,
    "is_unlocked" BOOLEAN NOT NULL DEFAULT false,
    "materials_completed" SMALLINT NOT NULL DEFAULT 0,
    "challenges_completed" SMALLINT NOT NULL DEFAULT 0,
    "total_xp_earned" INTEGER NOT NULL DEFAULT 0,
    "progress_percentage" DECIMAL(5,2) NOT NULL DEFAULT 0.0,
    "unlocked_at" TIMESTAMPTZ(3),
    "completed_at" TIMESTAMPTZ(3),
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "user_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_material_progress" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "material_id" INTEGER NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "xp_earned" SMALLINT NOT NULL DEFAULT 0,
    "started_at" TIMESTAMPTZ(3),
    "completed_at" TIMESTAMPTZ(3),

    CONSTRAINT "user_material_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_challenge_attempts" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "challenge_id" INTEGER NOT NULL,
    "variant_id" INTEGER NOT NULL,
    "answer_code" TEXT NOT NULL,
    "is_correct" BOOLEAN NOT NULL,
    "is_first_attempt" BOOLEAN NOT NULL,
    "time_spent" INTEGER NOT NULL,
    "xp_earned" SMALLINT NOT NULL,
    "submitted_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_challenge_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "badges" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "condition_type" VARCHAR(50) NOT NULL,
    "condition_value" JSONB NOT NULL,
    "icon_url" VARCHAR(255) NOT NULL,
    "rarity" "rarity" NOT NULL DEFAULT 'COMMON',
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "badges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_badges" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "badge_id" INTEGER NOT NULL,
    "earned_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_badges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leaderboards" (
    "id" SERIAL NOT NULL,
    "level_id" INTEGER,
    "period_start" TIMESTAMPTZ(3) NOT NULL,
    "period_end" TIMESTAMPTZ(3) NOT NULL,
    "is_locked" BOOLEAN NOT NULL DEFAULT false,
    "lock_start" TIMESTAMPTZ(3),
    "lock_end" TIMESTAMPTZ(3),
    "rewards_distributed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "leaderboards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leaderboard_entries" (
    "id" SERIAL NOT NULL,
    "leaderboard_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "total_xp" INTEGER NOT NULL,
    "total_time" INTEGER NOT NULL,
    "rank" SMALLINT NOT NULL,
    "reward_xp" SMALLINT NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "leaderboard_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity_logs" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "challenge_id" INTEGER,
    "action_type" VARCHAR(50) NOT NULL,
    "level" VARCHAR(50),
    "difficulty" VARCHAR(20),
    "method" VARCHAR(50),
    "time_spent" INTEGER,
    "variant_question" TEXT,
    "user_answer" TEXT,
    "details" JSONB,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "levels_order_key" ON "levels"("order");

-- CreateIndex
CREATE INDEX "idx_materials_level_order" ON "materials"("level_id", "order");

-- CreateIndex
CREATE INDEX "idx_challenges_level_difficulty" ON "challenges"("level_id", "difficulty");

-- CreateIndex
CREATE INDEX "idx_challenges_active" ON "challenges"("is_active");

-- CreateIndex
CREATE INDEX "idx_variants_challenge" ON "challenge_variants"("challenge_id");

-- CreateIndex
CREATE INDEX "idx_user_progress_user" ON "user_progress"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_progress_user_id_level_id_key" ON "user_progress"("user_id", "level_id");

-- CreateIndex
CREATE INDEX "idx_user_material_user" ON "user_material_progress"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_material_progress_user_id_material_id_key" ON "user_material_progress"("user_id", "material_id");

-- CreateIndex
CREATE INDEX "idx_attempts_first" ON "user_challenge_attempts"("user_id", "challenge_id", "is_first_attempt");

-- CreateIndex
CREATE INDEX "idx_attempts_history" ON "user_challenge_attempts"("user_id", "submitted_at");

-- CreateIndex
CREATE INDEX "idx_attempts_challenge" ON "user_challenge_attempts"("challenge_id");

-- CreateIndex
CREATE UNIQUE INDEX "badges_name_key" ON "badges"("name");

-- CreateIndex
CREATE INDEX "idx_user_badges_user" ON "user_badges"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_badges_user_id_badge_id_key" ON "user_badges"("user_id", "badge_id");

-- CreateIndex
CREATE INDEX "idx_leaderboards_active" ON "leaderboards"("level_id", "period_end", "is_locked");

-- CreateIndex
CREATE INDEX "idx_leaderboard_rank" ON "leaderboard_entries"("leaderboard_id", "rank");

-- CreateIndex
CREATE INDEX "idx_leaderboard_sorting" ON "leaderboard_entries"("leaderboard_id", "total_xp", "total_time");

-- CreateIndex
CREATE UNIQUE INDEX "leaderboard_entries_leaderboard_id_user_id_key" ON "leaderboard_entries"("leaderboard_id", "user_id");

-- CreateIndex
CREATE INDEX "idx_logs_user_time" ON "activity_logs"("user_id", "created_at");

-- CreateIndex
CREATE INDEX "idx_logs_challenge_time" ON "activity_logs"("challenge_id", "created_at");

-- CreateIndex
CREATE INDEX "idx_logs_time" ON "activity_logs"("created_at");

-- AddForeignKey
ALTER TABLE "materials" ADD CONSTRAINT "materials_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "levels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenges" ADD CONSTRAINT "challenges_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "levels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge_variants" ADD CONSTRAINT "challenge_variants_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "challenges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_progress" ADD CONSTRAINT "user_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_progress" ADD CONSTRAINT "user_progress_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "levels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_material_progress" ADD CONSTRAINT "user_material_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_material_progress" ADD CONSTRAINT "user_material_progress_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_challenge_attempts" ADD CONSTRAINT "user_challenge_attempts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_challenge_attempts" ADD CONSTRAINT "user_challenge_attempts_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "challenges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_challenge_attempts" ADD CONSTRAINT "user_challenge_attempts_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "challenge_variants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_badges" ADD CONSTRAINT "user_badges_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_badges" ADD CONSTRAINT "user_badges_badge_id_fkey" FOREIGN KEY ("badge_id") REFERENCES "badges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leaderboards" ADD CONSTRAINT "leaderboards_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "levels"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leaderboard_entries" ADD CONSTRAINT "leaderboard_entries_leaderboard_id_fkey" FOREIGN KEY ("leaderboard_id") REFERENCES "leaderboards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leaderboard_entries" ADD CONSTRAINT "leaderboard_entries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "challenges"("id") ON DELETE SET NULL ON UPDATE CASCADE;
