-- CreateEnum
CREATE TYPE "Position" AS ENUM ('GOLEIRO', 'FIXO', 'ALA', 'PIVO', 'CORINGA');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "position" "Position" NOT NULL DEFAULT 'CORINGA';
