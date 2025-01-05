-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "InteractionType" AS ENUM ('CALL', 'VISIT', 'ORDER');

-- CreateTable
CREATE TABLE "leads" (
    "id" SERIAL NOT NULL,
    "restaurantName" TEXT NOT NULL,
    "address" TEXT,
    "contactNumber" TEXT,
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "assignedKam" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" SERIAL NOT NULL,
    "leadId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT,
    "phoneNumber" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interactions" (
    "id" SERIAL NOT NULL,
    "leadId" INTEGER NOT NULL,
    "interactionDate" TIMESTAMP(3) NOT NULL,
    "interactionType" "InteractionType" NOT NULL,
    "notes" TEXT,
    "followUpRequired" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "interactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "leads_restaurantName_idx" ON "leads"("restaurantName");

-- CreateIndex
CREATE INDEX "leads_status_idx" ON "leads"("status");

-- CreateIndex
CREATE INDEX "leads_assignedKam_idx" ON "leads"("assignedKam");

-- CreateIndex
CREATE INDEX "contacts_leadId_idx" ON "contacts"("leadId");

-- CreateIndex
CREATE INDEX "contacts_email_idx" ON "contacts"("email");

-- CreateIndex
CREATE INDEX "contacts_phoneNumber_idx" ON "contacts"("phoneNumber");

-- CreateIndex
CREATE INDEX "interactions_leadId_idx" ON "interactions"("leadId");

-- CreateIndex
CREATE INDEX "interactions_interactionDate_idx" ON "interactions"("interactionDate");

-- CreateIndex
CREATE INDEX "interactions_interactionType_idx" ON "interactions"("interactionType");

-- CreateIndex
CREATE INDEX "interactions_createdAt_idx" ON "interactions"("createdAt");

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interactions" ADD CONSTRAINT "interactions_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;
