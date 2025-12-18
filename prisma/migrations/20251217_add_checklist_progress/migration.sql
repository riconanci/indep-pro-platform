-- CreateTable
CREATE TABLE "ChecklistProgress" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "checklistSlug" TEXT NOT NULL,
    "completedSteps" TEXT NOT NULL DEFAULT '[]',
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ChecklistProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "ChecklistProgress_userId_idx" ON "ChecklistProgress"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ChecklistProgress_userId_checklistSlug_key" ON "ChecklistProgress"("userId", "checklistSlug");
