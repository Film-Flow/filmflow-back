/*
  Warnings:

  - You are about to drop the column `release_date` on the `Movie` table. All the data in the column will be lost.
  - Added the required column `popularity` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `release_year` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `runtime` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "release_date",
ADD COLUMN     "popularity" INTEGER NOT NULL,
ADD COLUMN     "release_year" INTEGER NOT NULL,
ADD COLUMN     "runtime" INTEGER NOT NULL;
