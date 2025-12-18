"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GatedSection } from "@/components/GatedSection";

type UserState = {
  unlocked: boolean;
  loading: boolean;
};

export default function TaxReadinessPage() {
  const [userState, setUserState] = useState<UserState>({
    unlocked: false,
    loading: true,
  });

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/me", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setUserState({
            unlocked: data.user?.unlocked ?? false,
            loading: false,
          });
        } else {
          setUserState({ unlocked: false, loading: false });
        }
      } catch {
        setUserState({ unlocked: false, loading: false });
      }
    }
    loadUser();
  }, []);

  if (userState.loading) {
    return (
      <div className="mx-auto max-w-2xl px-4">
        <div className="animate-pulse">
          <div className="h-6 w-32 rounded bg-gray-200" />
          <div className="mt-4 h-8 w-64 rounded bg-gray-200" />
          <div className="mt-6 space-y-3">
            <div className="h-4 w-full rounded bg-gray-100" />
            <div className="h-4 w-full rounded bg-gray-100" />
            <div className="h-4 w-3/4 rounded bg-gray-100" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4">
      {/* Back link */}
      <div className="mb-6">
        <Link
          href="/learn"
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
          Learn
        </Link>
      </div>

      {/* Article header */}
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Tax Readiness</h1>
        <p className="mt-2 text-gray-600">
          Quarterly payments, recordkeeping, and what to prepare
        </p>
      </header>

      {/* Main content */}
      <article className="prose-custom">
        {/* Section 1: Overview — FREE */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900">
            How self-employment taxes work
          </h2>
          <div className="mt-4 space-y-4 text-gray-700">
            <p>
              As an independent professional, you're responsible for your own
              taxes. Unlike W-2 employees who have taxes withheld from each
              paycheck, you receive your full earnings and must set aside money
              for taxes yourself.
            </p>
            <p>You generally owe two types of tax on your business income:</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border bg-gray-50 p-4">
                <h3 className="text-sm font-medium text-gray-900">
                  Self-employment tax
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  ~15.3% of net earnings — this covers Social Security and
                  Medicare that would normally be split with an employer
                </p>
              </div>
              <div className="rounded-xl border bg-gray-50 p-4">
                <h3 className="text-sm font-medium text-gray-900">Income tax</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Federal and state income tax on your net business income,
                  based on your total income and tax bracket
                </p>
              </div>
            </div>
            <p>
              The exact amount depends on your total income, filing status,
              deductions, and other factors. But a rough rule of thumb: many
              self-employed people set aside 25-30% of their net income for
              federal taxes, plus state taxes if applicable.
            </p>
          </div>
        </section>

        {/* Section 2: Quarterly payments — FREE */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900">
            Quarterly estimated payments
          </h2>
          <div className="mt-4 space-y-4 text-gray-700">
            <p>
              The IRS expects you to pay taxes throughout the year, not just at
              tax time. If you'll owe more than $1,000 in taxes for the year,
              you're generally required to make quarterly estimated tax
              payments.
            </p>
            <div className="rounded-xl border bg-gray-50 p-5">
              <h3 className="text-sm font-medium text-gray-900">
                Quarterly due dates (federal)
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-lg bg-white p-2 text-center">
                  <div className="font-medium">Q1</div>
                  <div className="text-gray-600">April 15</div>
                </div>
                <div className="rounded-lg bg-white p-2 text-center">
                  <div className="font-medium">Q2</div>
                  <div className="text-gray-600">June 15</div>
                </div>
                <div className="rounded-lg bg-white p-2 text-center">
                  <div className="font-medium">Q3</div>
                  <div className="text-gray-600">September 15</div>
                </div>
                <div className="rounded-lg bg-white p-2 text-center">
                  <div className="font-medium">Q4</div>
                  <div className="text-gray-600">January 15</div>
                </div>
              </div>
              <p className="mt-3 text-xs text-gray-500">
                California has its own estimated tax schedule. Dates may shift if
                they fall on weekends or holidays.
              </p>
            </div>
            <p>
              Missing quarterly payments can result in underpayment penalties —
              not huge, but avoidable. The goal is to pay roughly what you'll
              owe throughout the year.
            </p>
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
              <p className="text-sm text-blue-800">
                <strong>Tip:</strong> Use the{" "}
                <Link
                  href="/tools/quarterly-estimate"
                  className="underline hover:no-underline"
                >
                  Quarterly Estimate Calculator
                </Link>{" "}
                to get a rough idea of what you might owe each quarter.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: What to track — FREE */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900">
            What records to keep
          </h2>
          <div className="mt-4 space-y-4 text-gray-700">
            <p>
              Come tax time, you (or your tax preparer) will need to report your
              total business income and your total business expenses. Having
              organized records makes this straightforward.
            </p>
            <p>Keep track of:</p>
            <ul className="ml-4 list-disc space-y-2">
              <li>
                <strong>All income received</strong> — from clients, shops,
                product sales, tips if applicable
              </li>
              <li>
                <strong>All business expenses</strong> — with receipts or
                documentation
              </li>
              <li>
                <strong>1099 forms</strong> — any shop or client that pays you
                $600+ in a year should send you a 1099-NEC
              </li>
              <li>
                <strong>Quarterly payment records</strong> — confirmation of any
                estimated tax payments you make
              </li>
            </ul>
            <p>
              If you're tracking income and expenses throughout the year (as
              covered in the{" "}
              <Link
                href="/learn/expense-tracking"
                className="underline hover:no-underline"
              >
                Expense Tracking
              </Link>{" "}
              guide), tax time becomes a matter of summarizing what you've
              already documented.
            </p>
          </div>
        </section>

        {/* Section 4: Deep dive — GATED */}
        <GatedSection
          unlocked={userState.unlocked}
          title="Tax Planning Strategies & Year-End Checklist (Full Guide)"
        >
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-gray-900">
              Practical tax planning
            </h2>
            <div className="mt-4 space-y-4 text-gray-700">
              <h3 className="mt-6 font-medium text-gray-900">
                Setting aside money for taxes
              </h3>
              <p>
                The simplest approach: every time you receive business income,
                immediately transfer a percentage to a separate savings account.
                Don't touch this money until it's time to pay taxes.
              </p>
              <p>
                How much? A common starting point is 25-30% of your net income
                (after business expenses). If you're in a higher tax bracket or
                live in a high-tax state like California, you might need more.
                If you have significant deductions, you might need less.
              </p>
              <div className="rounded-xl border bg-gray-50 p-5">
                <h4 className="text-sm font-medium text-gray-900">
                  Example weekly routine
                </h4>
                <ol className="mt-2 space-y-1 text-sm text-gray-600">
                  <li>1. Calculate your net income for the week (income - expenses)</li>
                  <li>2. Transfer 25-30% to your tax savings account</li>
                  <li>3. The remainder is what you have to spend or save</li>
                </ol>
              </div>

              <h3 className="mt-6 font-medium text-gray-900">
                Timing income and expenses
              </h3>
              <p>
                As a cash-basis taxpayer (which most sole proprietors are), you
                report income when you receive it and expenses when you pay
                them. This creates some flexibility around year-end:
              </p>
              <ul className="ml-4 list-disc space-y-1 text-sm">
                <li>
                  If you're having a high-income year, you might stock up on
                  supplies in December to increase this year's deductions
                </li>
                <li>
                  If income is lower, you might delay purchases to next year
                </li>
              </ul>
              <p>
                Don't buy things you don't need just for the tax benefit — but if
                you were planning to purchase something anyway, timing can
                matter.
              </p>

              <h3 className="mt-6 font-medium text-gray-900">
                Common deductions people miss
              </h3>
              <ul className="ml-4 list-disc space-y-1 text-sm">
                <li>
                  Business portion of phone and internet (if you use them for
                  scheduling, client communication, etc.)
                </li>
                <li>Professional development and education</li>
                <li>Industry publications and memberships</li>
                <li>
                  Mileage for business travel (not commuting to your regular
                  work location)
                </li>
                <li>
                  Self-employed health insurance deduction (if you pay for your
                  own health insurance)
                </li>
                <li>
                  Retirement contributions (SEP-IRA, Solo 401k can reduce
                  taxable income significantly)
                </li>
              </ul>

              <h3 className="mt-6 font-medium text-gray-900">
                Year-end checklist
              </h3>
              <div className="mt-3 rounded-xl border bg-white p-5">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 h-4 w-4 rounded border"></span>
                    <span>
                      Reconcile your income records with bank deposits
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 h-4 w-4 rounded border"></span>
                    <span>
                      Categorize all expenses and ensure you have documentation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 h-4 w-4 rounded border"></span>
                    <span>
                      Review any 1099s you expect to receive — follow up if
                      missing
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 h-4 w-4 rounded border"></span>
                    <span>
                      Confirm your quarterly estimated payments were made
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 h-4 w-4 rounded border"></span>
                    <span>
                      Consider any year-end purchases that make sense
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 h-4 w-4 rounded border"></span>
                    <span>
                      If you haven't already, consider consulting a tax
                      professional
                    </span>
                  </li>
                </ul>
              </div>

              <h3 className="mt-6 font-medium text-gray-900">
                When to get professional help
              </h3>
              <p>
                You can do your own taxes as a self-employed person — the forms
                (Schedule C, Schedule SE) aren't impossibly complex. But a tax
                professional can often find deductions you'd miss and help you
                avoid mistakes. The cost is itself deductible.
              </p>
              <p>Consider professional help if:</p>
              <ul className="ml-4 list-disc space-y-1 text-sm">
                <li>This is your first year self-employed</li>
                <li>Your situation is more complex (LLC, multiple income sources, employees)</li>
                <li>You're not confident in your recordkeeping</li>
                <li>You're considering entity elections (S-corp, etc.)</li>
                <li>You just want to make sure it's done right</li>
              </ul>
            </div>
          </section>
        </GatedSection>

        {/* Section 5: Key forms — FREE */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900">
            Tax forms you'll encounter
          </h2>
          <div className="mt-4 space-y-4 text-gray-700">
            <p>A quick reference to the main forms involved:</p>
            <div className="space-y-3">
              <div className="rounded-xl border bg-gray-50 p-4">
                <h3 className="text-sm font-medium text-gray-900">
                  1099-NEC (you receive)
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Reports payments of $600+ made to you. Shops or clients who pay
                  you should send this by January 31.
                </p>
              </div>
              <div className="rounded-xl border bg-gray-50 p-4">
                <h3 className="text-sm font-medium text-gray-900">
                  Schedule C (you file)
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Reports your business income and expenses. Attached to your
                  Form 1040.
                </p>
              </div>
              <div className="rounded-xl border bg-gray-50 p-4">
                <h3 className="text-sm font-medium text-gray-900">
                  Schedule SE (you file)
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Calculates your self-employment tax (Social Security and
                  Medicare). Also attached to Form 1040.
                </p>
              </div>
              <div className="rounded-xl border bg-gray-50 p-4">
                <h3 className="text-sm font-medium text-gray-900">
                  Form 1040-ES (you file quarterly)
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Used to make quarterly estimated tax payments to the IRS.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <footer className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <p className="text-sm text-amber-800">
            <strong>Disclaimer:</strong> This content is for educational
            purposes only and does not constitute tax advice. Tax laws are
            complex, change frequently, and vary by jurisdiction. Consult a
            qualified tax professional for advice specific to your situation.
          </p>
        </footer>

        {/* Navigation */}
        <div className="mt-10 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/learn/expense-tracking"
            className="rounded-lg border px-4 py-2.5 text-center text-sm font-medium text-gray-700 hover:border-gray-300 active:bg-gray-50"
          >
            ← Expense Tracking
          </Link>
          <Link
            href="/learn"
            className="rounded-lg bg-black px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-800 active:bg-gray-900"
          >
            Back to Learn Index
          </Link>
        </div>
      </article>
    </div>
  );
}
