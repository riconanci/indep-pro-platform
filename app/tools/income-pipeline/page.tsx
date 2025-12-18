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

// ============================================================================
// Visual Components
// ============================================================================

function FlowNode({
  children,
  variant = "default",
  size = "normal",
}: {
  children: React.ReactNode;
  variant?: "default" | "income" | "expense" | "result" | "muted";
  size?: "normal" | "small";
}) {
  const baseClasses = "rounded-xl border-2 transition-all";
  const sizeClasses = size === "small" ? "px-3 py-2" : "px-4 py-3";
  
  const variantClasses = {
    default: "border-gray-200 bg-white",
    income: "border-emerald-300 bg-emerald-50",
    expense: "border-gray-200 bg-gray-50",
    result: "border-emerald-400 bg-emerald-100",
    muted: "border-gray-100 bg-gray-50/50",
  };

  return (
    <div className={`${baseClasses} ${sizeClasses} ${variantClasses[variant]}`}>
      {children}
    </div>
  );
}

function FlowArrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center py-1">
      <div className="h-6 w-0.5 bg-gradient-to-b from-gray-300 to-emerald-400" />
      {label && (
        <span className="my-1 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">
          {label}
        </span>
      )}
      <svg
        className="h-3 w-3 text-emerald-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

function SplitArrows() {
  return (
    <div className="flex items-end justify-center gap-8 py-1">
      {/* Left branch */}
      <div className="flex flex-col items-center">
        <div className="h-4 w-0.5 bg-gray-300" />
        <div className="h-0.5 w-8 bg-gray-300" />
        <div className="h-4 w-0.5 bg-gray-300" />
        <svg className="h-3 w-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
      
      {/* Right branch */}
      <div className="flex flex-col items-center">
        <div className="h-4 w-0.5 bg-emerald-400" />
        <div className="h-0.5 w-8 bg-emerald-400" />
        <div className="h-4 w-0.5 bg-emerald-400" />
        <svg className="h-3 w-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
}

function NodeTitle({ children }: { children: React.ReactNode }) {
  return <div className="text-sm font-semibold text-gray-900">{children}</div>;
}

function NodeBody({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "muted" | "highlight";
}) {
  const classes = {
    default: "text-gray-600",
    muted: "text-gray-500",
    highlight: "text-emerald-700",
  };
  return <div className={`mt-1 text-xs leading-relaxed ${classes[variant]}`}>{children}</div>;
}

function KeyInsight({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100">
        <svg className="h-3.5 w-3.5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div className="text-sm text-amber-800">{children}</div>
    </div>
  );
}

// ============================================================================
// Pipeline Visualizations
// ============================================================================

function PipelineA() {
  return (
    <div className="space-y-1">
      {/* Client */}
      <FlowNode>
        <NodeTitle>👤 Client</NodeTitle>
        <NodeBody>Receives your service and pays for it</NodeBody>
      </FlowNode>

      <FlowArrow label="payment" />

      {/* Shop collects */}
      <FlowNode>
        <NodeTitle>🏪 Shop collects payment</NodeTitle>
        <NodeBody>
          The shop may collect payment for convenience. This is a collection arrangement—
          it does not change who earned the income.
        </NodeBody>
      </FlowNode>

      <FlowArrow label="split applied" />

      {/* Split */}
      <FlowNode variant="default">
        <NodeTitle>📊 Agreed split applied</NodeTitle>
        <NodeBody>Shop keeps its agreed portion and remits the remainder to you</NodeBody>
      </FlowNode>

      <SplitArrows />

      {/* Two columns */}
      <div className="grid grid-cols-2 gap-3">
        <FlowNode variant="muted" size="small">
          <NodeTitle>Shop&apos;s portion</NodeTitle>
          <NodeBody variant="muted">
            Not your income. You don&apos;t report or deduct this—it was never yours.
          </NodeBody>
        </FlowNode>

        <FlowNode variant="income" size="small">
          <NodeTitle>💰 Your share</NodeTitle>
          <NodeBody variant="highlight">
            Business income earned from your services. This is what you report.
          </NodeBody>
        </FlowNode>
      </div>

      <div className="flex justify-end pr-[25%]">
        <FlowArrow />
      </div>

      {/* Your business */}
      <FlowNode variant="income">
        <NodeTitle>🏢 Your business (Individual or LLC)</NodeTitle>
        <NodeBody variant="highlight">
          Income flows to you personally or your LLC. The container changes—
          the income flow stays the same.
        </NodeBody>
      </FlowNode>

      <FlowArrow label="minus expenses" />

      {/* Expenses */}
      <FlowNode variant="expense">
        <NodeTitle>📋 Your business expenses</NodeTitle>
        <NodeBody>
          Tools, supplies, education, software, professional fees, and any other
          costs you pay directly for your business.
        </NodeBody>
      </FlowNode>

      <FlowArrow />

      {/* Net income */}
      <FlowNode variant="result">
        <NodeTitle>✨ Net business income (pre-tax)</NodeTitle>
        <NodeBody variant="highlight">
          What remains after expenses. This is your taxable self-employment income (conceptual).
        </NodeBody>
      </FlowNode>

      <KeyInsight>
        <strong>Key insight:</strong> In Structure A, the shop collects and splits—but you 
        earned the income the moment you provided the service. Collection is logistics, 
        not ownership.
      </KeyInsight>
    </div>
  );
}

function PipelineB() {
  return (
    <div className="space-y-1">
      {/* Client */}
      <FlowNode>
        <NodeTitle>👤 Client</NodeTitle>
        <NodeBody>Receives your service and pays for it</NodeBody>
      </FlowNode>

      <FlowArrow label="payment" />

      {/* You collect */}
      <FlowNode variant="income">
        <NodeTitle>💵 You collect payment</NodeTitle>
        <NodeBody variant="highlight">
          Clients pay you directly—cash, card, app, however you accept payment.
          This is your gross income.
        </NodeBody>
      </FlowNode>

      <FlowArrow />

      {/* Your business */}
      <FlowNode variant="income">
        <NodeTitle>🏢 Your business (Individual or LLC)</NodeTitle>
        <NodeBody variant="highlight">
          All client payments flow into your personal or business bank account.
          You control the full amount.
        </NodeBody>
      </FlowNode>

      <FlowArrow label="minus expenses" />

      {/* Expenses - two columns */}
      <div className="grid grid-cols-2 gap-3">
        <FlowNode variant="expense" size="small">
          <NodeTitle>🏪 Shop fee / booth rent</NodeTitle>
          <NodeBody>
            The fee you pay for your chair, booth, or space. This is a business expense.
          </NodeBody>
        </FlowNode>

        <FlowNode variant="expense" size="small">
          <NodeTitle>📋 Other expenses</NodeTitle>
          <NodeBody>
            Tools, supplies, education, software, marketing, professional fees, etc.
          </NodeBody>
        </FlowNode>
      </div>

      <FlowArrow />

      {/* Net income */}
      <FlowNode variant="result">
        <NodeTitle>✨ Net business income (pre-tax)</NodeTitle>
        <NodeBody variant="highlight">
          What remains after all expenses including booth rent. This is your taxable 
          self-employment income (conceptual).
        </NodeBody>
      </FlowNode>

      <KeyInsight>
        <strong>Key insight:</strong> In Structure B, your gross income is higher 
        (full service price), but so are your explicit expenses (booth rent). 
        The net result can be similar to Structure A depending on the numbers.
      </KeyInsight>
    </div>
  );
}

function PipelineHybrid() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm text-blue-800">
          <strong>Hybrid arrangement:</strong> You experience both structures—maybe 
          the shop collects for walk-ins while you collect directly from regulars, 
          or you work at multiple locations with different arrangements.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Structure A */}
        <div className="rounded-2xl border bg-white p-5">
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white">
              A
            </span>
            <span className="text-sm font-semibold">Shop collects → splits → pays you</span>
          </div>
          <div className="space-y-2 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
              Client pays shop
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
              Shop applies split
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-emerald-700">Your share = business income</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
              Minus your expenses
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="font-medium text-emerald-700">= Net income</span>
            </div>
          </div>
        </div>

        {/* Structure B */}
        <div className="rounded-2xl border bg-white p-5">
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white">
              B
            </span>
            <span className="text-sm font-semibold">You collect → you pay shop</span>
          </div>
          <div className="space-y-2 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-emerald-700">Client pays you directly</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-emerald-700">Full amount = gross income</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
              Minus booth rent / shop fee
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
              Minus other expenses
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="font-medium text-emerald-700">= Net income</span>
            </div>
          </div>
        </div>
      </div>

      <KeyInsight>
        <strong>Key insight:</strong> Both flows end at the same place—your net business 
        income. The paths differ, but the destination is the same: what you keep after 
        all business costs. Track each flow separately for clearer records.
      </KeyInsight>
    </div>
  );
}

// ============================================================================
// Helper Functions
// ============================================================================

function mapDbProfileToPreview(dbProfile: {
  role: string | null;
  collectionMethod: string | null;
  incomeStructure: string | null;
  entityStatus: string | null;
} | null): PreviewProfile {
  if (!dbProfile) return {};
  return {
    role: (dbProfile.role as PreviewProfile["role"]) ?? undefined,
    collectionMethod: (dbProfile.collectionMethod as PreviewProfile["collectionMethod"]) ?? undefined,
    incomeStructure: (dbProfile.incomeStructure as PreviewProfile["incomeStructure"]) ?? undefined,
    entityStatus: (dbProfile.entityStatus as PreviewProfile["entityStatus"]) ?? undefined,
  };
}

function structureLabel(s: IncomeStructure): string {
  switch (s) {
    case "A":
      return "Structure A — Shop collects → splits → pays you";
    case "B":
      return "Structure B — You collect → you pay shop";
    case "HYBRID":
      return "Hybrid — Both structures";
  }
}

// ============================================================================
// Main Page Component
// ============================================================================

export default function IncomePipelinePage() {
  const [profile, setProfile] = useState<PreviewProfile>({});
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Default to preview immediately
    setProfile(getPreviewProfile());

    // If logged in + saved profile exists, prefer DB
    (async () => {
      try {
        const res = await fetch("/api/me", { cache: "no-store" });
        if (!res.ok) {
          setLoading(false);
          return;
        }
        const data = (await res.json()) as MeResponse;

        if (data.user?.unlocked) {
          setUnlocked(true);
        }

        const dbp = data.user?.profile;
        if (dbp) setProfile(mapDbProfileToPreview(dbp));
      } catch {
        // Ignore; preview still works
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const structure: IncomeStructure = useMemo(
    () => resolveIncomeStructure(profile),
    [profile]
  );

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4">
        <div className="animate-pulse">
          <div className="h-8 w-48 rounded bg-gray-200" />
          <div className="mt-2 h-4 w-64 rounded bg-gray-100" />
          <div className="mt-8 h-96 rounded-2xl bg-gray-100" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4">
      {/* Back link */}
      <div className="mb-6">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-black active:bg-gray-200"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Tools
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Income Pipeline</h1>
        <p className="mt-2 text-gray-600">
          See how money flows from your clients to your business. This is education, not accounting.
        </p>

        {/* Profile badge */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
            {roleLabel(profile.role)}
          </span>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            {structureLabel(structure)}
          </span>
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/onboarding/role"
            className="rounded-lg border px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100"
          >
            Change setup
          </Link>
          {!unlocked && (
            <Link
              href="/unlock"
              className="rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800 active:bg-gray-950"
            >
              Unlock • $59.99
            </Link>
          )}
        </div>
      </div>

      {/* Pipeline visualization */}
      <div className="rounded-2xl border bg-gradient-to-br from-gray-50 to-white p-5 sm:p-8">
        {structure === "A" && <PipelineA />}
        {structure === "B" && <PipelineB />}
        {structure === "HYBRID" && <PipelineHybrid />}
      </div>

      {/* Core principle callout */}
      <div className="mt-8 rounded-xl border-2 border-gray-200 bg-white p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <div className="font-semibold text-gray-900">
              Collection method ≠ income ownership
            </div>
            <p className="mt-1 text-sm text-gray-600">
              How money is collected can change your recordkeeping, but it does not change 
              who earned the income. You earned it when you provided the service—regardless 
              of whether the shop collected it or you did.
            </p>
          </div>
        </div>
      </div>

      {/* Related links */}
      <div className="mt-8 rounded-xl border bg-gray-50 p-5">
        <h2 className="text-sm font-semibold text-gray-900">Related resources</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            href="/learn/income-structures"
            className="rounded-lg border bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:border-gray-300"
          >
            Income Structures Guide
          </Link>
          <Link
            href="/tools/net-income"
            className="rounded-lg border bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:border-gray-300"
          >
            Net Income Calculator
          </Link>
          <Link
            href="/learn/expense-tracking"
            className="rounded-lg border bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:border-gray-300"
          >
            Expense Tracking
          </Link>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="mt-8 text-center text-xs text-gray-500">
        This diagram is for educational purposes only. It is not tax, legal, or financial advice.
        Consult a qualified professional for guidance specific to your situation.
      </p>
    </div>
  );
}
