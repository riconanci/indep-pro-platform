"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { CalculatorCard } from "@/components/CalculatorCard";
import { LockedOverlay } from "@/components/LockedOverlay";
import { trackUsage } from "@/app/actions/trackUsage";
import {
  calculateQuarterlyEstimate,
  formatCurrency,
  type QuarterlyEstimateResult,
} from "@/lib/calculators";

type UserState = {
  unlocked: boolean;
};

function QuarterlyForm({
  onCalculate,
}: {
  onCalculate: (result: QuarterlyEstimateResult) => void;
}) {
  const [annualNetIncome, setAnnualNetIncome] = useState<number>(0);

  function handleCalculate() {
    const result = calculateQuarterlyEstimate({ annualNetIncome });
    onCalculate(result);
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Expected annual net income
        </label>
        <p className="mt-1 text-xs text-gray-500">
          Your business income after expenses (use the Net Income Calculator if
          unsure)
        </p>
        <div className="relative mt-2">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            $
          </span>
          <input
            type="number"
            min={0}
            value={annualNetIncome || ""}
            onChange={(e) => setAnnualNetIncome(Number(e.target.value))}
            placeholder="0"
            className="w-full rounded-lg border py-3 pl-7 pr-3 text-base focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="w-full rounded-lg bg-black py-3.5 text-sm font-medium text-white transition hover:bg-gray-800 active:bg-gray-900"
      >
        Calculate quarterly estimate
      </button>

      <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
        <p className="text-xs text-blue-800">
          <span className="font-medium">How this works:</span> As an independent
          contractor, you typically pay estimated taxes quarterly instead of
          having them withheld from a paycheck. This calculator gives you a
          rough idea of those payments.
        </p>
      </div>
    </div>
  );
}

function QuarterlyPreview() {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Expected annual net income
        </label>
        <p className="mt-1 text-xs text-gray-500">
          Your business income after expenses
        </p>
        <div className="relative mt-2">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            $
          </span>
          <input
            type="text"
            value="45,000"
            disabled
            className="w-full rounded-lg border bg-gray-50 py-3 pl-7 pr-3 text-base text-gray-400"
          />
        </div>
      </div>

      <button
        disabled
        className="w-full rounded-lg bg-gray-200 py-3.5 text-sm font-medium text-gray-500"
      >
        Calculate quarterly estimate
      </button>

      <div className="rounded-lg border bg-gray-50 p-3">
        <p className="text-xs text-gray-500">
          Sample result preview: ~$2,800/quarter
        </p>
      </div>
    </div>
  );
}

function ResultDisplay({ result }: { result: QuarterlyEstimateResult }) {
  const quarterDates = [
    { q: "Q1", due: "April 15" },
    { q: "Q2", due: "June 15" },
    { q: "Q3", due: "September 15" },
    { q: "Q4", due: "January 15 (next year)" },
  ];

  return (
    <div className="space-y-4">
      {/* Main result */}
      <div className="rounded-xl border bg-gray-50 p-5">
        <div className="text-center">
          <div className="text-sm text-gray-600">
            Estimated quarterly payment
          </div>
          <div className="mt-1 text-3xl font-semibold text-green-600">
            {formatCurrency(result.quarterlyPayment)}
          </div>
          <div className="mt-1 text-xs text-gray-500">
            per quarter • {result.effectiveRate}% effective rate
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="rounded-xl border bg-white p-5">
        <h4 className="text-sm font-semibold text-gray-900">Annual breakdown</h4>
        <div className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Net income</span>
            <span>{formatCurrency(result.annualNetIncome)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Self-employment tax (15.3%)</span>
            <span>{formatCurrency(result.selfEmploymentTax)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Federal income tax (est.)</span>
            <span>{formatCurrency(result.estimatedIncomeTax)}</span>
          </div>
          <div className="flex justify-between border-t pt-2 font-medium">
            <span className="text-gray-900">Total annual tax</span>
            <span>{formatCurrency(result.totalAnnualTax)}</span>
          </div>
        </div>
      </div>

      {/* Payment schedule */}
      <div className="rounded-xl border bg-white p-5">
        <h4 className="text-sm font-semibold text-gray-900">Payment schedule</h4>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {quarterDates.map((qd) => (
            <div
              key={qd.q}
              className="rounded-lg bg-gray-50 p-3 text-center"
            >
              <div className="text-xs font-medium text-gray-500">{qd.q}</div>
              <div className="mt-1 text-sm font-semibold">
                {formatCurrency(result.quarterlyPayment)}
              </div>
              <div className="mt-0.5 text-xs text-gray-500">{qd.due}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
        <p className="text-xs text-amber-800">
          <span className="font-medium">Note:</span> This estimate does not
          include state taxes, which vary by location. California residents may
          owe additional state income tax. Consult a tax professional for
          accurate planning.
        </p>
      </div>
    </div>
  );
}

export default function QuarterlyEstimatePage() {
  const [userState, setUserState] = useState<UserState>({ unlocked: false });
  const [result, setResult] = useState<QuarterlyEstimateResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [, startTransition] = useTransition();

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/me", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setUserState({
            unlocked: data.user?.unlocked ?? false,
          });
        }
      } catch {
        // Remain locked
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  function handleCalculate(calcResult: QuarterlyEstimateResult) {
    setResult(calcResult);

    startTransition(() => {
      trackUsage("calculator_used", "quarterly-estimate", {
        annualNetIncome: calcResult.annualNetIncome,
        quarterlyPayment: calcResult.quarterlyPayment,
      });
    });
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl px-4">
        <div className="animate-pulse">
          <div className="h-8 w-48 rounded bg-gray-200" />
          <div className="mt-4 h-96 rounded-2xl bg-gray-100" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-black active:bg-gray-200"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Dashboard
        </Link>
      </div>

      <CalculatorCard
        title="Quarterly Estimate Calculator"
        description="Estimate your quarterly tax payments based on expected income"
        disclaimer="Educational illustration only. This calculator uses simplified assumptions and does not account for state taxes, deductions, credits, or your specific filing situation. Consult a qualified tax professional for accurate tax planning."
      >
        {userState.unlocked ? (
          <div className="space-y-6">
            <QuarterlyForm onCalculate={handleCalculate} />
            {result && <ResultDisplay result={result} />}
          </div>
        ) : (
          <LockedOverlay message="Unlock to use this calculator">
            <QuarterlyPreview />
          </LockedOverlay>
        )}
      </CalculatorCard>
    </div>
  );
}
