"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChoiceCard } from "@/components/ui/ChoiceCard";
import { ProgressHeader } from "@/components/ui/ProgressHeader";
import { getPreviewProfile, setPreviewProfile } from "@/lib/previewProfile";
import type { IncomeStructure } from "@/types/profile";
import { resolveIncomeStructure } from "@/lib/pipeline";

export default function IncomeStructurePage() {
  const router = useRouter();
  const [structure, setStructure] = useState<IncomeStructure | undefined>(undefined);

  useEffect(() => {
    const p = getPreviewProfile();
    setStructure(p.incomeStructure ?? resolveIncomeStructure(p));
  }, []);

  function choose(next: IncomeStructure) {
    setStructure(next);
    setPreviewProfile({ incomeStructure: next });
    router.push("/onboarding/entity-status");
  }

  return (
    <div className="px-4">
      <ProgressHeader step={3} total={5} />
      
      {/* Header with cancel - stacks on mobile */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <h1 className="text-xl font-semibold tracking-tight">
          Which income structure fits best?
        </h1>
        <Link
          href="/dashboard"
          className="self-start rounded-lg border px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 active:bg-gray-100 sm:self-auto"
        >
          Cancel
        </Link>
      </div>
      
      <p className="text-sm text-gray-700">
        Both are valid for independent professionals. Choose what matches your reality.
      </p>

      <div className="mt-6 grid gap-3">
        <ChoiceCard
          title="Structure A — Shop collects → splits → pays me"
          description="Shop collects client payment, keeps an agreed portion, remits your share."
          selected={structure === "A"}
          onClick={() => choose("A")}
        />
        <ChoiceCard
          title="Structure B — I collect → I pay the shop"
          description="Clients pay you, and you pay booth rent or shop fees."
          selected={structure === "B"}
          onClick={() => choose("B")}
        />
        <ChoiceCard
          title="Hybrid — I experience both"
          description="Different shops or different time periods."
          selected={structure === "HYBRID"}
          onClick={() => choose("HYBRID")}
        />
      </div>

      <div className="mt-8">
        <button
          onClick={() => router.push("/onboarding/payment-method")}
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
