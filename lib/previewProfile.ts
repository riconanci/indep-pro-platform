"use client";

import type { PreviewProfile } from "@/types/profile";

const KEY = "indep_pro_preview_profile_v1";

function safeParse(raw: string | null): PreviewProfile {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as PreviewProfile;
    if (!parsed || typeof parsed !== "object") return {};
    return parsed;
  } catch {
    return {};
  }
}

export function getPreviewProfile(): PreviewProfile {
  if (typeof window === "undefined") return {};
  return safeParse(window.localStorage.getItem(KEY));
}

export function setPreviewProfile(partial: Partial<PreviewProfile>): PreviewProfile {
  if (typeof window === "undefined") return partial as PreviewProfile;
  const current = getPreviewProfile();
  const next: PreviewProfile = {
    ...current,
    ...partial,
    updatedAt: Date.now(),
  };
  window.localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function clearPreviewProfile() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}
