"use client";

import { useTransition } from "react";
import { getPreviewProfile, clearPreviewProfile } from "@/lib/previewProfile";
import { saveProfile } from "@/app/actions/saveProfile";

export default function SaveProfileButton() {
  const [pending, start] = useTransition();

  function onSave() {
    const preview = getPreviewProfile();
    if (!preview || Object.keys(preview).length === 0) {
      alert("No onboarding data found. Complete /onboarding first.");
      return;
    }

    start(async () => {
      await saveProfile(preview);
      clearPreviewProfile();
      window.location.reload();
    });
  }

  return (
    <button
      onClick={onSave}
      disabled={pending}
      className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
    >
      {pending ? "Saving…" : "Save my setup"}
    </button>
  );
}
