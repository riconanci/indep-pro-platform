"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChoiceCard } from "@/components/ui/ChoiceCard";
import { ProgressHeader } from "@/components/ui/ProgressHeader";
import { getPreviewProfile, setPreviewProfile } from "@/lib/previewProfile";
import type { Role } from "@/types/profile";

export default function RolePage() {
  const router = useRouter();
  const [role, setRole] = useState<Role | undefined>(undefined);

  useEffect(() => {
    const p = getPreviewProfile();
    setRole(p.role);
  }, []);

  function choose(next: Role) {
    setRole(next);
    setPreviewProfile({ role: next });
    router.push("/onboarding/payment-method");
  }

  return (
    <div>
      <ProgressHeader step={1} total={5} />
      <h1 className="text-xl font-semibold tracking-tight">Which best describes your work?</h1>
      <p className="mt-2 text-sm text-gray-700">
        This only changes language and examples. Your business logic stays the same.
      </p>

      <div className="mt-6 grid gap-3">
        <ChoiceCard
          title="Barber"
          description="Cuts, fades, grooming services (examples adapt to you)."
          selected={role === "barber"}
          onClick={() => choose("barber")}
        />
        <ChoiceCard
          title="Cosmetologist"
          description="Hair, color, styling, skincare (examples adapt to you)."
          selected={role === "cosmetologist"}
          onClick={() => choose("cosmetologist")}
        />
      </div>
    </div>
  );
}
