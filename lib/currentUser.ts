import { db } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";

export async function getCurrentUser() {
  const userId = await getSessionUserId();
  if (!userId) return null;

  return db.user.findUnique({
    where: { id: userId },
    include: {
      entitlement: true,
      profile: true,
    },
  });
}

export function isUnlocked(user: Awaited<ReturnType<typeof getCurrentUser>>) {
  return user?.entitlement?.status === "active";
}