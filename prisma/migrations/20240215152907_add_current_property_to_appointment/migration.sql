/*
  Warnings:

  - Added the required column `current` to the `appointments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "appointments" ADD COLUMN     "current" BOOLEAN NOT NULL;
