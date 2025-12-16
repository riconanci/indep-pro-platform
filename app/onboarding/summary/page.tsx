"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ProgressHeader } from "@/components/ui/ProgressHeader";
import { Pill } from "@/components/ui/Pill";
import { getPreviewProfile } from "@/lib/previewProfile";
import { resolveIncomeStructure, roleLabel } from "@/lib/pipeline";
import type { PreviewProfile } from "@/types/profile";

function labelStructure(s: "A" | "B" | "HYBRID") {
  if (s === "A") return "Structure A (Shop collects → splits → pays you)";
  if (s === "B") return "Structure B (You collect → you pay shop)";
  return "Hybrid (Both)";
}

export default function SummaryPage() {
  const [profile, setProfile] = useState<PreviewProfile>({});

  useEffect(() => {
    setProfile(getPreviewProfile());
  }, []);

  const structure = useMemo(() => resolveIncomeStructure(profile), [profile]);

  return (
    <div>
      <ProgressHeader step={5} total={5} />
      <h1 className="text-xl font-semibold tracking-tight">Summary</h1>
      <p className="mt-2 text-sm text-gray-700">
        This is your current operating setup. You can change it anytime.
      </p>

      <div className="mt-6 rounded-2xl border bg-white p-5">
        <div className="flex flex-wrap gap-2">
          <Pill>{roleLabel(profile.role)}</Pill>
          <Pill>{labelStructure(structure)}</Pill>
          <Pill>
            Entity:{" "}
            {profile.entityStatus === "LLC"
              ? "LLC"
              : profile.entityStatus === "INDIVIDUAL"
              ? "Individual"
              : "Not sure"}
          </Pill>
        </div>

        <div className="mt-4 text-sm text-gray-700">
          Key idea: <span className="font-medium">collection method ≠ income ownership</span>. You
          earn income from your services regardless of how payment is collected.
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/tools/income-pipeline"
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white"
          >
            View my income pipeline
          </Link>
          <Link
            href="/onboarding/role"
            className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-900"
          >
            Edit answers
          </Link>
        </div>
      </div>
    </div>
  );
}
