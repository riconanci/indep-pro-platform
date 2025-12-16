"use server";

import { db } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";

export type UsageEventType = "calculator_used" | "template_downloaded" | "pipeline_viewed";

export async function trackUsage(
  event: UsageEventType,
  slug: string,
  metadata?: Record<string, unknown>
): Promise<{ ok: boolean }> {
  const userId = getSessionUserId();

  // Silent fail for logged-out users (shouldn't happen for gated tools)
  if (!userId) {
    return { ok: false };
  }

  try {
    await db.usageEvent.create({
      data: {
        userId,
        event,
        slug,
        metadata: metadata ? JSON.stringify(metadata) : null,
      },
    });

    return { ok: true };
  } catch (error) {
    console.error("Failed to track usage event:", error);
    return { ok: false };
  }
}

/**
 * Get usage count for a user (for refund policy enforcement).
 * Returns total count of "consumed" events.
 */
export async function getUserUsageCount(userId: string): Promise<number> {
  const count = await db.usageEvent.count({
    where: { userId },
  });

  return count;
}

/**
 * Check if user has consumed content (for refund eligibility).
 * Threshold can be adjusted based on policy.
 */
export async function hasConsumedContent(
  userId: string,
  threshold = 3
): Promise<boolean> {
  const count = await getUserUsageCount(userId);
  return count >= threshold;
}
