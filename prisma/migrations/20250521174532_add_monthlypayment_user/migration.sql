-- DropForeignKey
ALTER TABLE "PlayerStatistics" DROP CONSTRAINT "PlayerStatistics_gameId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "monthlypayment" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "PlayerStatistics" ADD CONSTRAINT "PlayerStatistics_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
