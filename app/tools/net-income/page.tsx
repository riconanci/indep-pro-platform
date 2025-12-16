"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { CalculatorCard } from "@/components/CalculatorCard";
import { LockedOverlay } from "@/components/LockedOverlay";
import { trackUsage } from "@/app/actions/trackUsage";
import {
  calculateNetIncome,
  getDefaultExpenses,
  formatCurrency,
  type ExpenseCategory,
  type NetIncomeResult,
} from "@/lib/calculators";

type UserState = {
  unlocked: boolean;
  role?: string;
};

function NetIncomeForm({
  role,
  onCalculate,
}: {
  role?: string;
  onCalculate: (result: NetIncomeResult) => void;
}) {
  const [grossIncome, setGrossIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<ExpenseCategory[]>(() =>
    getDefaultExpenses(role)
  );

  function updateExpense(index: number, amount: number) {
    setExpenses((prev) =>
      prev.map((e, i) => (i === index ? { ...e, amount } : e))
    );
  }

  function handleCalculate() {
    const result = calculateNetIncome({ grossIncome, expenses });
    onCalculate(result);
  }

  return (
    <div className="space-y-6">
      {/* Gross Income */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Gross income (annual)
        </label>
        <p className="mt-1 text-xs text-gray-500">
          Total revenue from services before any expenses
        </p>
        <div className="relative mt-2">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            $
          </span>
          <input
            type="number"
            min={0}
            value={grossIncome || ""}
            onChange={(e) => setGrossIncome(Number(e.target.value))}
            placeholder="0"
            className="w-full rounded-lg border py-2 pl-7 pr-3 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>
      </div>

      {/* Expenses */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Business expenses (annual)
        </label>
        <p className="mt-1 text-xs text-gray-500">
          Enter your estimated annual expenses for each category
        </p>
        <div className="mt-3 space-y-2">
          {expenses.map((expense, index) => (
            <div key={expense.label} className="flex items-center gap-3">
              <span className="w-48 shrink-0 text-sm text-gray-600">
                {expense.label}
              </span>
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  min={0}
                  value={expense.amount || ""}
                  onChange={(e) =>
                    updateExpense(index, Number(e.target.value))
                  }
                  placeholder="0"
                  className="w-full rounded-lg border py-2 pl-7 pr-3 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calculate button */}
      <button
        onClick={handleCalculate}
        className="w-full rounded-lg bg-black py-3 text-sm font-medium text-white transition hover:bg-gray-800"
      >
        Calculate net income
      </button>
    </div>
  );
}

function NetIncomePreview() {
  // Static preview with sample data
  const sampleExpenses = [
    { label: "Booth rent / chair rental", amount: 1200 },
    { label: "Supplies & products", amount: 300 },
    { label: "Tools & equipment", amount: 150 },
    { label: "Continuing education", amount: 100 },
    { label: "Software & apps", amount: 50 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Gross income (annual)
        </label>
        <div className="relative mt-2">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            $
          </span>
          <input
            type="text"
            value="60,000"
            disabled
            className="w-full rounded-lg border bg-gray-50 py-2 pl-7 pr-3 text-sm text-gray-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Business expenses (annual)
        </label>
        <div className="mt-3 space-y-2">
          {sampleExpenses.map((expense) => (
            <div key={expense.label} className="flex items-center gap-3">
              <span className="w-48 shrink-0 text-sm text-gray-400">
                {expense.label}
              </span>
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  $
                </span>
                <input
                  type="text"
                  value={expense.amount.toLocaleString()}
                  disabled
                  className="w-full rounded-lg border bg-gray-50 py-2 pl-7 pr-3 text-sm text-gray-400"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        disabled
        className="w-full rounded-lg bg-gray-200 py-3 text-sm font-medium text-gray-500"
      >
        Calculate net income
      </button>
    </div>
  );
}

function ResultDisplay({ result }: { result: NetIncomeResult }) {
  return (
    <div className="rounded-xl border bg-gray-50 p-5">
      <h3 className="text-sm font-semibold text-gray-900">Results</h3>

      <div className="mt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Gross income</span>
          <span className="font-medium">{formatCurrency(result.grossIncome)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Total expenses</span>
          <span className="font-medium text-red-600">
            −{formatCurrency(result.totalExpenses)}
          </span>
        </div>
        <div className="border-t pt-3">
          <div className="flex justify-between">
            <span className="font-medium text-gray-900">Net business income</span>
            <span className="text-lg font-semibold text-green-600">
              {formatCurrency(result.netIncome)}
            </span>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            This is your income before taxes. Self-employment and income taxes
            will be due on this amount.
          </p>
        </div>
      </div>

      {/* Expense breakdown */}
      {result.expenses.filter((e) => e.amount > 0).length > 0 && (
        <div className="mt-5 border-t pt-4">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Expense breakdown
          </h4>
          <div className="mt-2 space-y-1">
            {result.expenses
              .filter((e) => e.amount > 0)
              .map((expense) => (
                <div
                  key={expense.label}
                  className="flex justify-between text-sm"
                >
                  <span className="text-gray-600">{expense.label}</span>
                  <span>{formatCurrency(expense.amount)}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function NetIncomePage() {
  const [userState, setUserState] = useState<UserState>({ unlocked: false });
  const [result, setResult] = useState<NetIncomeResult | null>(null);
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
            role: data.user?.profile?.role ?? undefined,
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

  function handleCalculate(calcResult: NetIncomeResult) {
    setResult(calcResult);

    // Track usage
    startTransition(() => {
      trackUsage("calculator_used", "net-income", {
        grossIncome: calcResult.grossIncome,
        netIncome: calcResult.netIncome,
      });
    });
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="animate-pulse">
          <div className="h-8 w-48 rounded bg-gray-200" />
          <div className="mt-4 h-96 rounded-2xl bg-gray-100" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-black"
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
          Back to Tools
        </Link>
      </div>

      <CalculatorCard
        title="Net Income Calculator"
        description="Estimate your annual net business income after expenses"
        disclaimer="Educational illustration only. This is not tax advice. Your actual tax situation depends on many factors. Consult a qualified tax professional."
      >
        {userState.unlocked ? (
          <div className="space-y-6">
            <NetIncomeForm
              role={userState.role}
              onCalculate={handleCalculate}
            />
            {result && <ResultDisplay result={result} />}
          </div>
        ) : (
          <LockedOverlay message="Unlock to use this calculator">
            <NetIncomePreview />
          </LockedOverlay>
        )}
      </CalculatorCard>
    </div>
  );
}
