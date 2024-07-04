-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" TEXT,
ALTER COLUMN "password_hash" DROP NOT NULL;
