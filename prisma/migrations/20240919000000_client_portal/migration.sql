-- Migration for client portal features
-- This migration adds profile fields, reschedule counters and simplifies subscription status.

CREATE TABLE "_Customer_new" (
    "id" TEXT PRIMARY KEY NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "userId" TEXT,
    "defaultAddress" TEXT,
    "stripeCustomerId" TEXT,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT "Customer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "_Customer_new" ("id","name","email","phone","userId","createdAt","updatedAt")
  SELECT "id","name","email","phone","userId","createdAt","updatedAt" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "_Customer_new" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");
CREATE UNIQUE INDEX "Customer_stripeCustomerId_key" ON "Customer"("stripeCustomerId");

ALTER TABLE "Booking" ADD COLUMN "rescheduleCount" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "Booking" ADD COLUMN "rescheduleLimit" INTEGER NOT NULL DEFAULT 1;

-- Subscription status enum updated to ACTIVE/PAUSED/CANCELED.
-- currentPeriodStart column removed.
CREATE TABLE "_Subscription_new" (
    "id" TEXT PRIMARY KEY NOT NULL,
    "customerId" TEXT NOT NULL,
    "stripeSubId" TEXT NOT NULL,
    "plan" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "currentPeriodEnd" DATETIME NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT "Subscription_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "_Subscription_new" ("id","customerId","stripeSubId","plan","status","currentPeriodEnd","createdAt","updatedAt")
  SELECT "id","customerId","stripeSubId","plan","status","currentPeriodEnd","createdAt","updatedAt" FROM "Subscription";
DROP TABLE "Subscription";
ALTER TABLE "_Subscription_new" RENAME TO "Subscription";
CREATE UNIQUE INDEX "Subscription_stripeSubId_key" ON "Subscription"("stripeSubId");
