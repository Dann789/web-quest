/*
  Warnings:

  - Added the required column `translate` to the `mrc_words` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "mrc_words" ADD COLUMN     "translate" VARCHAR(30) NOT NULL;
