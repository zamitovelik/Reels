-- AlterTable
ALTER TABLE "Lead" DROP COLUMN "handled",
ADD COLUMN     "feedback" TEXT,
ADD COLUMN     "platform" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'new',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "videoUrl" TEXT;

