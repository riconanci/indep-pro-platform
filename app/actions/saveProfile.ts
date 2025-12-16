"use server";

import { db } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";
import type { PreviewProfile } from "@/types/profile";

export async function saveProfile(preview: PreviewProfile) {
  const userId = await getSessionUserId();
  if (!userId) throw new Error("Not authenticated");

  await db.userProfile.upsert({
    where: { userId },
    update: {
      role: preview.role,
      collectionMethod: preview.collectionMethod,
      incomeStructure: preview.incomeStructure,
      entityStatus: preview.entityStatus,
    },
    create: {
      userId,
      role: preview.role,
      collectionMethod: preview.collectionMethod,
      incomeStructure: preview.incomeStructure,
      entityStatus: preview.entityStatus,
    },
  });

  return { ok: true };
}
