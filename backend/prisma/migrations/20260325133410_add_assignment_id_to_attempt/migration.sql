/*
  Warnings:

  - Added the required column `assignment_id` to the `attempts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "attempts" ADD COLUMN     "assignment_id" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "idx_material_progress_material" ON "material_progress"("material_id");

-- AddForeignKey
ALTER TABLE "attempts" ADD CONSTRAINT "attempts_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
