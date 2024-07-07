/*
  Warnings:

  - You are about to drop the column `userId` on the `ResetPassCode` table. All the data in the column will be lost.
  - You are about to drop the column `movieId` on the `UserMovieRating` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `UserMovieRating` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `VerifyEmailCode` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `ResetPassCode` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,movie_id]` on the table `UserMovieRating` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `VerifyEmailCode` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `ResetPassCode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movie_id` to the `UserMovieRating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `UserMovieRating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `VerifyEmailCode` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ResetPassCode" DROP CONSTRAINT "ResetPassCode_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserMovieRating" DROP CONSTRAINT "UserMovieRating_movieId_fkey";

-- DropForeignKey
ALTER TABLE "UserMovieRating" DROP CONSTRAINT "UserMovieRating_userId_fkey";

-- DropForeignKey
ALTER TABLE "VerifyEmailCode" DROP CONSTRAINT "VerifyEmailCode_userId_fkey";

-- DropIndex
DROP INDEX "ResetPassCode_userId_key";

-- DropIndex
DROP INDEX "UserMovieRating_userId_movieId_key";

-- DropIndex
DROP INDEX "VerifyEmailCode_userId_key";

-- AlterTable
ALTER TABLE "ResetPassCode" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserMovieRating" DROP COLUMN "movieId",
DROP COLUMN "userId",
ADD COLUMN     "movie_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "VerifyEmailCode" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ResetPassCode_user_id_key" ON "ResetPassCode"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserMovieRating_user_id_movie_id_key" ON "UserMovieRating"("user_id", "movie_id");

-- CreateIndex
CREATE UNIQUE INDEX "VerifyEmailCode_user_id_key" ON "VerifyEmailCode"("user_id");

-- AddForeignKey
ALTER TABLE "ResetPassCode" ADD CONSTRAINT "ResetPassCode_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerifyEmailCode" ADD CONSTRAINT "VerifyEmailCode_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMovieRating" ADD CONSTRAINT "UserMovieRating_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMovieRating" ADD CONSTRAINT "UserMovieRating_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
