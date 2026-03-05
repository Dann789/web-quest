/*
  Warnings:

  - The values [scenario_based,micro_challenge_chain] on the enum `challenge_method` will be removed. If these variants are still used in the database, this will fail.
  - The values [ADMIN,USER] on the enum `user_role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `condition_type` on the `badges` table. All the data in the column will be lost.
  - You are about to drop the column `condition_value` on the `badges` table. All the data in the column will be lost.
  - You are about to drop the column `icon_url` on the `badges` table. All the data in the column will be lost.
  - You are about to drop the column `validation_rules` on the `challenges` table. All the data in the column will be lost.
  - You are about to drop the column `icon_url` on the `levels` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `levels` table. All the data in the column will be lost.
  - You are about to drop the column `estimated_time` on the `materials` table. All the data in the column will be lost.
  - You are about to drop the column `xp_reward` on the `materials` table. All the data in the column will be lost.
  - You are about to drop the column `challenges_completed` on the `user_progress` table. All the data in the column will be lost.
  - You are about to drop the column `materials_completed` on the `user_progress` table. All the data in the column will be lost.
  - You are about to drop the column `progress_percentage` on the `user_progress` table. All the data in the column will be lost.
  - You are about to drop the column `total_xp_earned` on the `user_progress` table. All the data in the column will be lost.
  - You are about to alter the column `email` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(50)`.
  - You are about to drop the `activity_logs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `challenge_variants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `leaderboard_entries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `leaderboards` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_challenge_attempts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_material_progress` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `iconPath` to the `badges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `levels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "challenge_method_new" AS ENUM ('drag_and_drop', 'coding_manual', 'fix_the_bug');
ALTER TABLE "challenges" ALTER COLUMN "method" TYPE "challenge_method_new" USING ("method"::text::"challenge_method_new");
ALTER TYPE "challenge_method" RENAME TO "challenge_method_old";
ALTER TYPE "challenge_method_new" RENAME TO "challenge_method";
DROP TYPE "challenge_method_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "user_role_new" AS ENUM ('admin', 'dosen', 'mahasiswa');
ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "user_role_new" USING ("role"::text::"user_role_new");
ALTER TYPE "user_role" RENAME TO "user_role_old";
ALTER TYPE "user_role_new" RENAME TO "user_role";
DROP TYPE "user_role_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "activity_logs" DROP CONSTRAINT "activity_logs_challenge_id_fkey";

-- DropForeignKey
ALTER TABLE "activity_logs" DROP CONSTRAINT "activity_logs_user_id_fkey";

-- DropForeignKey
ALTER TABLE "challenge_variants" DROP CONSTRAINT "challenge_variants_challenge_id_fkey";

-- DropForeignKey
ALTER TABLE "leaderboard_entries" DROP CONSTRAINT "leaderboard_entries_leaderboard_id_fkey";

-- DropForeignKey
ALTER TABLE "leaderboard_entries" DROP CONSTRAINT "leaderboard_entries_user_id_fkey";

-- DropForeignKey
ALTER TABLE "leaderboards" DROP CONSTRAINT "leaderboards_level_id_fkey";

-- DropForeignKey
ALTER TABLE "user_challenge_attempts" DROP CONSTRAINT "user_challenge_attempts_challenge_id_fkey";

-- DropForeignKey
ALTER TABLE "user_challenge_attempts" DROP CONSTRAINT "user_challenge_attempts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_challenge_attempts" DROP CONSTRAINT "user_challenge_attempts_variant_id_fkey";

-- DropForeignKey
ALTER TABLE "user_material_progress" DROP CONSTRAINT "user_material_progress_material_id_fkey";

-- DropForeignKey
ALTER TABLE "user_material_progress" DROP CONSTRAINT "user_material_progress_user_id_fkey";

-- DropIndex
DROP INDEX "idx_challenges_active";

-- DropIndex
DROP INDEX "levels_order_key";

-- AlterTable
ALTER TABLE "badges" DROP COLUMN "condition_type",
DROP COLUMN "condition_value",
DROP COLUMN "icon_url",
ADD COLUMN     "iconPath" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "challenges" DROP COLUMN "validation_rules",
ADD COLUMN     "content" JSONB,
ADD COLUMN     "hint" TEXT,
ADD COLUMN     "starter_code" TEXT,
ADD COLUMN     "test_cases" JSONB;

-- AlterTable
ALTER TABLE "levels" DROP COLUMN "icon_url",
DROP COLUMN "order",
ADD COLUMN     "iconName" VARCHAR(50),
ADD COLUMN     "updated_at" TIMESTAMPTZ(3) NOT NULL;

-- AlterTable
ALTER TABLE "materials" DROP COLUMN "estimated_time",
DROP COLUMN "xp_reward";

-- AlterTable
ALTER TABLE "user_progress" DROP COLUMN "challenges_completed",
DROP COLUMN "materials_completed",
DROP COLUMN "progress_percentage",
DROP COLUMN "total_xp_earned";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "name" VARCHAR(100) NOT NULL,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "role" DROP DEFAULT;

-- DropTable
DROP TABLE "activity_logs";

-- DropTable
DROP TABLE "challenge_variants";

-- DropTable
DROP TABLE "leaderboard_entries";

-- DropTable
DROP TABLE "leaderboards";

-- DropTable
DROP TABLE "user_challenge_attempts";

-- DropTable
DROP TABLE "user_material_progress";

-- CreateTable
CREATE TABLE "material_progress" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "material_id" INTEGER NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "started_at" TIMESTAMPTZ(3),
    "completed_at" TIMESTAMPTZ(3),

    CONSTRAINT "material_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assignments" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "level_id" INTEGER NOT NULL,
    "node_slot" SMALLINT NOT NULL,
    "challenge_id" INTEGER NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "assigned_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMPTZ(3),

    CONSTRAINT "assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attempts" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "challenge_id" INTEGER NOT NULL,
    "is_first_attempt" BOOLEAN NOT NULL,
    "time_spent" INTEGER NOT NULL,
    "xp_earned" SMALLINT NOT NULL,
    "submitted_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mrc_words" (
    "id" SERIAL NOT NULL,
    "word" VARCHAR(30) NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mrc_words_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reason" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "reason_text" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reason_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "response" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "mrc_word_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "response_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_material_progress_user" ON "material_progress"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "material_progress_user_id_material_id_key" ON "material_progress"("user_id", "material_id");

-- CreateIndex
CREATE INDEX "idx_assignment_user_level" ON "assignments"("user_id", "level_id");

-- CreateIndex
CREATE UNIQUE INDEX "assignments_user_id_level_id_node_slot_key" ON "assignments"("user_id", "level_id", "node_slot");

-- CreateIndex
CREATE UNIQUE INDEX "assignments_user_id_level_id_challenge_id_key" ON "assignments"("user_id", "level_id", "challenge_id");

-- CreateIndex
CREATE INDEX "idx_attempts_first" ON "attempts"("user_id", "challenge_id", "is_first_attempt");

-- CreateIndex
CREATE INDEX "idx_attempts_history" ON "attempts"("user_id", "submitted_at");

-- CreateIndex
CREATE INDEX "idx_attempts_challenge" ON "attempts"("challenge_id");

-- CreateIndex
CREATE INDEX "reason_user_id_idx" ON "reason"("user_id");

-- CreateIndex
CREATE INDEX "response_user_id_idx" ON "response"("user_id");

-- CreateIndex
CREATE INDEX "response_mrc_word_id_idx" ON "response"("mrc_word_id");

-- CreateIndex
CREATE INDEX "idx_challenges_active" ON "challenges"("level_id", "is_active");

-- AddForeignKey
ALTER TABLE "material_progress" ADD CONSTRAINT "material_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_progress" ADD CONSTRAINT "material_progress_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "levels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "challenges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attempts" ADD CONSTRAINT "attempts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attempts" ADD CONSTRAINT "attempts_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "challenges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reason" ADD CONSTRAINT "reason_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "response" ADD CONSTRAINT "response_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "response" ADD CONSTRAINT "response_mrc_word_id_fkey" FOREIGN KEY ("mrc_word_id") REFERENCES "mrc_words"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "idx_user_progress_user" RENAME TO "idx_progress_user";
