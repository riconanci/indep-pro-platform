"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getPreviewProfile } from "@/lib/previewProfile";
import { resolveIncomeStructure, roleLabel } from "@/lib/pipeline";
import type { PreviewProfile, IncomeStructure } from "@/types/profile";

type MeResponse = {
  user: null | {
    unlocked: boolean;
    profile: {
      role: string | null;
      collectionMethod: string | null;
      incomeStructure: string | null;
      entityStatus: string | null;
    } | null;
  };
};

function Node({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-1 text-sm text-gray-700">{body}</div>
    </div>
  );
}

function Arrow() {
  return <div className="mx-auto h-10 w-px bg-gray-300" />;
}

function PipelineA() {
  return (
    <div className="grid gap-3">
      <Node title="Client" body="Receives your service and pays for it." />
      <Arrow />
      <Node
        title="Payment collected by shop"
        body="Shop may collect payment for convenience. This does not change who earns the income."
      />
      <Arrow />
      <Node title="Agreed split applied" body="Shop keeps its portion. Your share is remitted to you." />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Node title="Shop share" body="Not your income. Not deducted by you." />
        <Node title="Your share" body="Business income earned from your services." />
      </div>
      <Arrow />
      <Node
        title="Professional business (Individual or LLC)"
        body="Income is received by you personally or your LLC. The container changes—income flow stays the same."
      />
      <Arrow />
      <Node title="Expenses" body="Tools, supplies, education, software, shop-related costs you pay directly, etc." />
      <Arrow />
      <Node
        title="Net business income (pre-tax)"
        body="What remains after business expenses (conceptual). This is not a tax calculation."
      />
    </div>
  );
}

function PipelineB() {
  return (
    <div className="grid gap-3">
      <Node title="Client" body="Receives your service and pays for it." />
      <Arrow />
      <Node title="Payment collected by you" body="Clients pay you directly. You collect gross income." />
      <Arrow />
      <Node title="Professional business (Individual or LLC)" body="Income lands in your personal or business container." />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Node title="Shop fee / booth rent" body="Business expense (fee/rent/agreed cost)." />
        <Node title="Other expenses" body="Tools, supplies, education, software, marketing, etc." />
      </div>
      <Arrow />
      <Node
        title="Net business income (pre-tax)"
        body="What remains after business expenses (conceptual). This is not a tax calculation."
      />
    </div>
  );
}

function PipelineHybrid() {
  return (
    <div className="grid gap-8">
      <div className="rounded-2xl border bg-white p-5">
        <div className="text-sm font-semibold">Flow 1 — Structure A</div>
        <div className="mt-4">
          <PipelineA />
        </div>
      </div>
      <div className="rounded-2xl border bg-white p-5">
        <div className="text-sm font-semibold">Flow 2 — Structure B</div>
        <div className="mt-4">
          <PipelineB />
        </div>
      </div>
    </div>
  );
}

function mapDbProfileToPreview(dbProfile: MeResponse["user"] extends null ? never : any): PreviewProfile {
  if (!dbProfile) return {};
  return {
    role: dbProfile.role ?? undefined,
    collectionMethod: dbProfile.collectionMethod ?? undefined,
    incomeStructure: dbProfile.incomeStructure ?? undefined,
    entityStatus: dbProfile.entityStatus ?? undefined,
  } as PreviewProfile;
}

export default function IncomePipelinePage() {
  const [profile, setProfile] = useState<PreviewProfile>({});

  useEffect(() => {
    // default to preview immediately
    setProfile(getPreviewProfile());

    // if logged in + saved profile exists, prefer DB
    (async () => {
      try {
        const res = await fetch("/api/me", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as MeResponse;
        const dbp = data.user?.profile;
        if (dbp) setProfile(mapDbProfileToPreview(dbp));
      } catch {
        // ignore; preview still works
      }
    })();
  }, []);

  const structure: IncomeStructure = useMemo(
    () => resolveIncomeStructure(profile),
    [profile]
  );

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Income Pipeline</h1>
          <p className="mt-1 text-sm text-gray-700">
            This diagram explains money flow—education only.
          </p>
          <p className="mt-2 text-xs text-gray-600">
            Profile: {roleLabel(profile.role)} • {structure}
          </p>
        </div>

        <div className="flex gap-2">
          <Link href="/onboarding/summary" className="rounded-lg border px-3 py-2 text-sm font-medium">
            Edit answers
          </Link>
          <Link href="/dashboard" className="rounded-lg border px-3 py-2 text-sm font-medium">
            Dashboard
          </Link>
          <Link href="/unlock" className="rounded-lg bg-black px-3 py-2 text-sm font-medium text-white">
            Unlock ($59.99)
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border bg-gray-50 p-5">
        {structure === "A" ? <PipelineA /> : structure === "B" ? <PipelineB /> : <PipelineHybrid />}
      </div>

      <div className="mt-6 rounded-xl border bg-white p-4 text-sm text-gray-700">
        Key idea: <span className="font-medium">collection method ≠ ownership</span>. How money is
        collected can change your recordkeeping, but it doesn’t automatically change your classification.
      </div>
    </div>
  );
}
