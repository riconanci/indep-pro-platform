"use server";

import { db } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";

export type ChecklistSlug = "ca-llc-setup";

/**
 * Get checklist progress for the current user
 */
export async function getChecklistProgress(
  checklistSlug: ChecklistSlug
): Promise<string[]> {
  const userId = await getSessionUserId();
  if (!userId) return [];

  const progress = await db.checklistProgress.findUnique({
    where: {
      userId_checklistSlug: {
        userId,
        checklistSlug,
      },
    },
  });

  if (!progress) return [];

  try {
    return JSON.parse(progress.completedSteps) as string[];
  } catch {
    return [];
  }
}

/**
 * Toggle a step's completion status
 */
export async function toggleChecklistStep(
  checklistSlug: ChecklistSlug,
  stepId: string
): Promise<{ ok: boolean; completedSteps: string[] }> {
  const userId = await getSessionUserId();
  if (!userId) {
    return { ok: false, completedSteps: [] };
  }

  // Get current progress
  const existing = await db.checklistProgress.findUnique({
    where: {
      userId_checklistSlug: {
        userId,
        checklistSlug,
      },
    },
  });

  let completedSteps: string[] = [];
  if (existing) {
    try {
      completedSteps = JSON.parse(existing.completedSteps) as string[];
    } catch {
      completedSteps = [];
    }
  }

  // Toggle the step
  if (completedSteps.includes(stepId)) {
    completedSteps = completedSteps.filter((s) => s !== stepId);
  } else {
    completedSteps.push(stepId);
  }

  // Upsert the progress
  await db.checklistProgress.upsert({
    where: {
      userId_checklistSlug: {
        userId,
        checklistSlug,
      },
    },
    update: {
      completedSteps: JSON.stringify(completedSteps),
    },
    create: {
      userId,
      checklistSlug,
      completedSteps: JSON.stringify(completedSteps),
    },
  });

  return { ok: true, completedSteps };
}

/**
 * Reset all progress for a checklist
 */
export async function resetChecklistProgress(
  checklistSlug: ChecklistSlug
): Promise<{ ok: boolean }> {
  const userId = await getSessionUserId();
  if (!userId) {
    return { ok: false };
  }

  await db.checklistProgress.deleteMany({
    where: {
      userId,
      checklistSlug,
    },
  });

  return { ok: true };
}
