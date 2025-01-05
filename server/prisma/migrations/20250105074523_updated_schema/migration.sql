/*
  Warnings:

  - You are about to drop the column `createdAt` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `leadId` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `interactions` table. All the data in the column will be lost.
  - You are about to drop the column `followUpRequired` on the `interactions` table. All the data in the column will be lost.
  - You are about to drop the column `interactionDate` on the `interactions` table. All the data in the column will be lost.
  - You are about to drop the column `interactionType` on the `interactions` table. All the data in the column will be lost.
  - You are about to drop the column `leadId` on the `interactions` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `interactions` table. All the data in the column will be lost.
  - You are about to drop the column `assignedKam` on the `leads` table. All the data in the column will be lost.
  - You are about to drop the column `contactNumber` on the `leads` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `leads` table. All the data in the column will be lost.
  - You are about to drop the column `restaurantName` on the `leads` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `leads` table. All the data in the column will be lost.
  - Added the required column `lead_id` to the `contacts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `contacts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interaction_date` to the `interactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interaction_type` to the `interactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lead_id` to the `interactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `interactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurant_name` to the `leads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `leads` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_leadId_fkey";

-- DropForeignKey
ALTER TABLE "interactions" DROP CONSTRAINT "interactions_leadId_fkey";

-- DropIndex
DROP INDEX "contacts_email_idx";

-- DropIndex
DROP INDEX "contacts_leadId_idx";

-- DropIndex
DROP INDEX "contacts_phoneNumber_idx";

-- DropIndex
DROP INDEX "interactions_createdAt_idx";

-- DropIndex
DROP INDEX "interactions_interactionDate_idx";

-- DropIndex
DROP INDEX "interactions_interactionType_idx";

-- DropIndex
DROP INDEX "interactions_leadId_idx";

-- DropIndex
DROP INDEX "leads_assignedKam_idx";

-- DropIndex
DROP INDEX "leads_restaurantName_idx";

-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "createdAt",
DROP COLUMN "leadId",
DROP COLUMN "phoneNumber",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lead_id" INTEGER NOT NULL,
ADD COLUMN     "phone_number" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "interactions" DROP COLUMN "createdAt",
DROP COLUMN "followUpRequired",
DROP COLUMN "interactionDate",
DROP COLUMN "interactionType",
DROP COLUMN "leadId",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "follow_up_required" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "interaction_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "interaction_type" "InteractionType" NOT NULL,
ADD COLUMN     "lead_id" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "leads" DROP COLUMN "assignedKam",
DROP COLUMN "contactNumber",
DROP COLUMN "createdAt",
DROP COLUMN "restaurantName",
DROP COLUMN "updatedAt",
ADD COLUMN     "assigned_kam" TEXT,
ADD COLUMN     "contact_number" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "restaurant_name" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "contacts_lead_id_idx" ON "contacts"("lead_id");

-- CreateIndex
CREATE INDEX "interactions_lead_id_idx" ON "interactions"("lead_id");

-- CreateIndex
CREATE INDEX "interactions_interaction_date_idx" ON "interactions"("interaction_date");

-- CreateIndex
CREATE INDEX "leads_restaurant_name_idx" ON "leads"("restaurant_name");

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interactions" ADD CONSTRAINT "interactions_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;
