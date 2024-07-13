/*
  Warnings:

  - A unique constraint covering the columns `[requester_id,addressee_id]` on the table `Friendship` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Friendship_requester_id_addressee_id_key" ON "Friendship"("requester_id", "addressee_id");
