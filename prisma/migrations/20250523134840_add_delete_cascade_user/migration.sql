-- DropForeignKey
ALTER TABLE "PlayerStatistics" DROP CONSTRAINT "PlayerStatistics_userId_fkey";

-- AddForeignKey
ALTER TABLE "PlayerStatistics" ADD CONSTRAINT "PlayerStatistics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
