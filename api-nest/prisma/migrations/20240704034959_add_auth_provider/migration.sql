/*
  Warnings:

  - You are about to drop the column `google_id` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('LOCAL', 'GOOGLE', 'GITHUB');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "google_id",
ADD COLUMN     "auth_provider" "AuthProvider" NOT NULL DEFAULT 'LOCAL';
