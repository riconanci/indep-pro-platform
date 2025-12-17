"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ProgressHeader } from "@/components/ui/ProgressHeader";
import { Pill } from "@/components/ui/Pill";
import { getPreviewProfile, clearPreviewProfile } from "@/lib/previewProfile";
import { resolveIncomeStructure, roleLabel } from "@/lib/pipeline";
import { saveProfile } from "@/app/actions/saveProfile";
import type { PreviewProfile } from "@/types/profile";

function labelStructure(s: "A" | "B" | "HYBRID") {
  if (s === "A") return "Structure A (Shop collects → splits → pays you)";
  if (s === "B") return "Structure B (You collect → you pay shop)";
  return "Hybrid (Both)";
}

export default function SummaryPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<PreviewProfile>({});
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    setProfile(getPreviewProfile());
  }, []);

  const structure = useMemo(() => resolveIncomeStructure(profile), [profile]);

  function handleSaveAndContinue() {
    if (!profile.role || !profile.collectionMethod || !profile.entityStatus) {
      setError("Please complete all onboarding steps first.");
      return;
    }

    startTransition(async () => {
      try {
        await saveProfile(profile);
        clearPreviewProfile();
        setSaved(true);
      } catch (err) {
        console.error("Save failed:", err);
        setError("Could not save profile. You may need to log in first.");
      }
    });
  }

  if (saved) {
    return (
      <div className="px-4">
        <ProgressHeader step={5} total={5} />
        <div className="rounded-2xl border bg-white p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="mt-4 text-xl font-semibold tracking-tight">Profile saved!</h1>
          <p className="mt-2 text-sm text-gray-700">
            Your business snapshot has been updated.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/dashboard"
              className="rounded-lg bg-black px-4 py-2.5 text-center text-sm font-medium text-white active:bg-gray-900"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/tools/income-pipeline"
              className="rounded-lg border px-4 py-2.5 text-center text-sm font-medium text-gray-900 active:bg-gray-100"
            >
              View Income Pipeline
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4">
      <ProgressHeader step={5} total={5} />
      
      {/* Header with cancel - stacks on mobile */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <h1 className="text-xl font-semibold tracking-tight">Summary</h1>
        <Link
          href="/dashboard"
          className="self-start rounded-lg border px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 active:bg-gray-100 sm:self-auto"
        >
          Cancel
        </Link>
      </div>
      
      <p className="text-sm text-gray-700">
        Review your setup. Click Save to update your business snapshot.
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

        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            onClick={handleSaveAndContinue}
            disabled={pending}
            className="rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50 active:bg-gray-900"
          >
            {pending ? "Saving..." : "Save and Continue"}
          </button>
          <Link
            href="/tools/income-pipeline"
            className="rounded-lg border px-4 py-2.5 text-center text-sm font-medium text-gray-900 active:bg-gray-100"
          >
            Preview Pipeline
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={() => router.push("/onboarding/entity-status")}
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
