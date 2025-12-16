"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
    <div>
      <ProgressHeader step={3} total={5} />
      <h1 className="text-xl font-semibold tracking-tight">Which income structure fits best?</h1>
      <p className="mt-2 text-sm text-gray-700">
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
    </div>
  );
}
