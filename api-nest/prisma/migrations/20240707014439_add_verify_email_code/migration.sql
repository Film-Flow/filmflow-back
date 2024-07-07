-- AlterTable
ALTER TABLE "User" ADD COLUMN     "is_verified" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "VerifyEmailCode" (
    "code" TEXT NOT NULL DEFAULT '',
    "expires_in" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "VerifyEmailCode_userId_key" ON "VerifyEmailCode"("userId");

-- AddForeignKey
ALTER TABLE "VerifyEmailCode" ADD CONSTRAINT "VerifyEmailCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
