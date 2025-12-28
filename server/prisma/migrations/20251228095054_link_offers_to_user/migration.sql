/*
  Warnings:

  - Added the required column `recruiterId` to the `internship_offers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "internship_offers" ADD COLUMN     "recruiterId" TEXT NOT NULL,
ALTER COLUMN "eligible_for_credits" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "internship_offers" ADD CONSTRAINT "internship_offers_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
