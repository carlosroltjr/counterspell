/*
  Warnings:

  - Added the required column `matchesDay` to the `Matches` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Matches" ADD COLUMN     "matchesDay" TIMESTAMP(3) NOT NULL;
