"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChoiceCard } from "@/components/ui/ChoiceCard";
import { ProgressHeader } from "@/components/ui/ProgressHeader";
import { getPreviewProfile, setPreviewProfile } from "@/lib/previewProfile";
import type { EntityStatus } from "@/types/profile";

export default function EntityStatusPage() {
  const router = useRouter();
  const [entity, setEntity] = useState<EntityStatus | undefined>(undefined);

  useEffect(() => {
    const p = getPreviewProfile();
    setEntity(p.entityStatus);
  }, []);

  function choose(next: EntityStatus) {
    setEntity(next);
    setPreviewProfile({ entityStatus: next });
    router.push("/onboarding/summary");
  }

  return (
    <div className="px-4">
      <ProgressHeader step={4} total={5} />
      
      {/* Header with cancel - stacks on mobile */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <h1 className="text-xl font-semibold tracking-tight">
          How are you currently operating?
        </h1>
        <Link
          href="/dashboard"
          className="self-start rounded-lg border px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 active:bg-gray-100 sm:self-auto"
        >
          Cancel
        </Link>
      </div>
      
      <p className="text-sm text-gray-700">
        This helps us use the right language. It does not change your income flow.
      </p>

      <div className="mt-6 grid gap-3">
        <ChoiceCard
          title="Individual (no LLC)"
          description="Operating under your personal name."
          selected={entity === "INDIVIDUAL"}
          onClick={() => choose("INDIVIDUAL")}
        />
        <ChoiceCard
          title="LLC (single-member)"
          description="Operating through an LLC entity."
          selected={entity === "LLC"}
          onClick={() => choose("LLC")}
        />
        <ChoiceCard
          title="Not sure"
          description="No problem — we will keep it simple."
          selected={entity === "UNSURE"}
          onClick={() => choose("UNSURE")}
        />
      </div>

      <div className="mt-8">
        <button
          onClick={() => router.push("/onboarding/income-structure")}
          className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 active:bg-gray-200"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>
    </div>
  );
}
