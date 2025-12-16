"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
    <div>
      <ProgressHeader step={2} total={5} />
      <h1 className="text-xl font-semibold tracking-tight">How do clients usually pay?</h1>
      <p className="mt-2 text-sm text-gray-700">
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
    </div>
  );
}
