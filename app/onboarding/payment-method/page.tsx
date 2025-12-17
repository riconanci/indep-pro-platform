"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChoiceCard } from "@/components/ui/ChoiceCard";
import { ProgressHeader } from "@/components/ui/ProgressHeader";
import { getPreviewProfile, setPreviewProfile } from "@/lib/previewProfile";
import type { CollectionMethod } from "@/types/profile";

export default function PaymentMethodPage() {
  const router = useRouter();
  const [method, setMethod] = useState<CollectionMethod | undefined>(undefined);

  useEffect(() => {
    const p = getPreviewProfile();
    setMethod(p.collectionMethod);
  }, []);

  function choose(next: CollectionMethod) {
    setMethod(next);
    setPreviewProfile({ collectionMethod: next });
    router.push("/onboarding/income-structure");
  }

  return (
    <div className="px-4">
      <ProgressHeader step={2} total={5} />
      
      {/* Header with cancel - stacks on mobile */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <h1 className="text-xl font-semibold tracking-tight">
          How do clients usually pay?
        </h1>
        <Link
          href="/dashboard"
          className="self-start rounded-lg border px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 active:bg-gray-100 sm:self-auto"
        >
          Cancel
        </Link>
      </div>
      
      <p className="text-sm text-gray-700">
        Payment collection affects how money moves, not who earns it.
      </p>

      <div className="mt-6 grid gap-3">
        <ChoiceCard
          title="They pay the shop"
          description="The shop collects payment from clients."
          selected={method === "SHOP"}
          onClick={() => choose("SHOP")}
        />
        <ChoiceCard
          title="They pay me directly"
          description="Clients pay you (cash/card/POS)."
          selected={method === "DIRECT"}
          onClick={() => choose("DIRECT")}
        />
        <ChoiceCard
          title="Both (depends)"
          description="Different shops or situations."
          selected={method === "BOTH"}
          onClick={() => choose("BOTH")}
        />
      </div>

      <div className="mt-8">
        <button
          onClick={() => router.push("/onboarding/role")}
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
