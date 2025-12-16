"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
    <div>
      <ProgressHeader step={4} total={5} />
      <h1 className="text-xl font-semibold tracking-tight">How are you currently operating?</h1>
      <p className="mt-2 text-sm text-gray-700">
        This helps us use the right language. It doesn’t change your income flow.
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
          description="No problem—we’ll keep it simple."
          selected={entity === "UNSURE"}
          onClick={() => choose("UNSURE")}
        />
      </div>
    </div>
  );
}
