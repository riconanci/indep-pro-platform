"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GatedSection } from "@/components/GatedSection";

type UserState = {
  unlocked: boolean;
  loading: boolean;
};

export default function ExpenseTrackingPage() {
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
        <h1 className="text-2xl font-semibold tracking-tight">
          Expense Tracking Basics
        </h1>
        <p className="mt-2 text-gray-600">
          What counts, what doesn't, and how to keep records that work
        </p>
      </header>

      {/* Main content */}
      <article className="prose-custom">
        {/* Section 1: Why it matters — FREE */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900">
            Why tracking expenses matters
          </h2>
          <div className="mt-4 space-y-4 text-gray-700">
            <p>
              Your business expenses reduce your taxable income. If you earn
              $50,000 and have $10,000 in legitimate business expenses, you're
              only taxed on $40,000. The math is straightforward — but only if
              you have records to back it up.
            </p>
            <p>
              Beyond taxes, tracking expenses helps you understand your real
              profitability. That client who pays $50 per cut looks different if
              you're spending $15 per visit on supplies versus $3.
            </p>
            <p>
              Good expense tracking isn't about obsessive documentation. It's
              about having a simple system you actually use, consistently.
            </p>
          </div>
        </section>

        {/* Section 2: What counts — FREE */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900">
            What counts as a business expense
          </h2>
          <div className="mt-4 space-y-4 text-gray-700">
            <p>
              The general rule: an expense is deductible if it's "ordinary and
              necessary" for your business. "Ordinary" means common in your
              profession. "Necessary" means helpful and appropriate (not that
              you literally can't work without it).
            </p>
            <p>For service professionals, common deductible expenses include:</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border bg-gray-50 p-4">
                <h3 className="text-sm font-medium text-gray-900">Supplies</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Products you use on clients, cleaning supplies, disposables
                </p>
              </div>
              <div className="rounded-xl border bg-gray-50 p-4">
                <h3 className="text-sm font-medium text-gray-900">Tools & Equipment</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Clippers, scissors, styling tools, chairs if you own them
                </p>
              </div>
              <div className="rounded-xl border bg-gray-50 p-4">
                <h3 className="text-sm font-medium text-gray-900">Booth Rent / Fees</h3>
                <p className="mt-1 text-sm text-gray-600">
                  What you pay the shop for your space (if applicable)
                </p>
              </div>
              <div className="rounded-xl border bg-gray-50 p-4">
                <h3 className="text-sm font-medium text-gray-900">Education</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Continuing education, workshops, industry certifications
                </p>
              </div>
              <div className="rounded-xl border bg-gray-50 p-4">
                <h3 className="text-sm font-medium text-gray-900">Licensing</h3>
                <p className="mt-1 text-sm text-gray-600">
                  State board license fees, business permits
                </p>
              </div>
              <div className="rounded-xl border bg-gray-50 p-4">
                <h3 className="text-sm font-medium text-gray-900">Insurance</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Professional liability, business insurance
                </p>
              </div>
              <div className="rounded-xl border bg-gray-50 p-4">
                <h3 className="text-sm font-medium text-gray-900">Marketing</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Business cards, social media promotion, website
                </p>
              </div>
              <div className="rounded-xl border bg-gray-50 p-4">
                <h3 className="text-sm font-medium text-gray-900">Software</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Scheduling apps, bookkeeping software, payment processing
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: What doesn't count — FREE */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900">
            What does <em>not</em> count
          </h2>
          <div className="mt-4 space-y-4 text-gray-700">
            <p>
              Some things feel like business expenses but aren't deductible, or
              require careful handling:
            </p>
            <div className="rounded-xl border bg-red-50 p-5">
              <ul className="space-y-3 text-sm text-red-800">
                <li>
                  <strong>Commute to your regular work location</strong> —
                  Getting to the shop where you work every day is personal, not
                  business
                </li>
                <li>
                  <strong>Personal grooming and clothing</strong> — Your own
                  haircuts, regular clothes (even if you only wear them to
                  work), unless it's a required uniform
                </li>
                <li>
                  <strong>Meals (usually)</strong> — Your lunch doesn't count.
                  Business meals with clients or for business purposes have
                  specific rules.
                </li>
                <li>
                  <strong>The shop's commission/cut</strong> — If the shop
                  collects payment and keeps their portion, that's not "your
                  expense" — you never received that money in the first place
                </li>
              </ul>
            </div>
            <p>
              When in doubt, the question to ask: "Is this expense primarily for
              my business, or would I have it anyway for personal reasons?"
            </p>
          </div>
        </section>

        {/* Section 4: Deep dive — GATED */}
        <GatedSection
          unlocked={userState.unlocked}
          title="Expense Categories & Recordkeeping System (Full Guide)"
        >
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-gray-900">
              Setting up a simple tracking system
            </h2>
            <div className="mt-4 space-y-4 text-gray-700">
              <p>
                You don't need expensive software. You need a system you'll
                actually use. Here's a minimal approach that works:
              </p>

              <h3 className="mt-6 font-medium text-gray-900">
                Step 1: Separate your money
              </h3>
              <p>
                Open a business bank account (or at minimum, a separate personal
                account you use only for business). Pay all business expenses
                from this account. Deposit all business income into this
                account. This single step eliminates 80% of tracking headaches.
              </p>

              <h3 className="mt-6 font-medium text-gray-900">
                Step 2: Capture receipts as they happen
              </h3>
              <p>
                Take a photo of every receipt the moment you get it. Use your
                phone's native camera, a dedicated app, or email them to
                yourself. The key is doing it immediately — receipts left in
                your pocket get lost, faded, or forgotten.
              </p>

              <h3 className="mt-6 font-medium text-gray-900">
                Step 3: Log expenses weekly (not monthly)
              </h3>
              <p>
                Pick one day a week (Sunday evening, Monday morning, whatever
                works). Spend 15 minutes logging that week's expenses into a
                spreadsheet or app. Waiting until month-end or tax time means
                you'll forget context and miss things.
              </p>

              <h3 className="mt-6 font-medium text-gray-900">
                Step 4: Use consistent categories
              </h3>
              <p>
                Don't overthink categories. For most service professionals, these
                cover everything:
              </p>
              <ul className="ml-4 mt-2 list-disc space-y-1 text-sm">
                <li>Supplies (products used on clients)</li>
                <li>Tools & Equipment</li>
                <li>Booth Rent / Shop Fees</li>
                <li>Education & Training</li>
                <li>Licensing & Permits</li>
                <li>Insurance</li>
                <li>Marketing & Advertising</li>
                <li>Software & Subscriptions</li>
                <li>Professional Services (accountant, lawyer)</li>
                <li>Other / Miscellaneous</li>
              </ul>

              <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-5">
                <p className="text-sm text-blue-800">
                  <strong>Template available:</strong> Download our{" "}
                  <Link
                    href="/tools/templates"
                    className="underline hover:no-underline"
                  >
                    Expense Tracker CSV
                  </Link>{" "}
                  template to get started with a pre-built spreadsheet.
                </p>
              </div>

              <h3 className="mt-6 font-medium text-gray-900">
                What records to keep
              </h3>
              <p>
                For each expense, you want to be able to answer: What was it?
                When did you buy it? How much? Why was it for business?
              </p>
              <p>
                Keep receipts (digital is fine) for at least 3 years — the IRS
                can generally audit up to 3 years back, longer in some cases.
                Bank and credit card statements help as backup, but receipts are
                the gold standard.
              </p>

              <h3 className="mt-6 font-medium text-gray-900">
                Mixed-use expenses
              </h3>
              <p>
                Some expenses are partly personal, partly business. Your phone,
                for example — you use it for scheduling clients and for personal
                calls. For mixed-use expenses, you can typically deduct the
                business portion. Be reasonable and consistent in how you
                calculate that portion (e.g., "I use my phone 60% for business
                based on usage patterns").
              </p>
              <p>
                Mileage for driving between client locations (not your regular
                commute) can be deducted using the standard mileage rate. Keep a
                simple log of business trips.
              </p>
            </div>
          </section>
        </GatedSection>

        {/* Section 5: Common mistakes — FREE */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900">
            Common mistakes to avoid
          </h2>
          <div className="mt-4 space-y-4 text-gray-700">
            <div className="rounded-xl border bg-gray-50 p-5">
              <h3 className="font-medium text-gray-900">
                Waiting until tax time
              </h3>
              <p className="mt-2 text-sm">
                Reconstructing a year of expenses from memory and bank
                statements is painful and inaccurate. Track as you go.
              </p>
            </div>
            <div className="rounded-xl border bg-gray-50 p-5">
              <h3 className="font-medium text-gray-900">
                Mixing personal and business
              </h3>
              <p className="mt-2 text-sm">
                Using one account for everything creates confusion and audit
                risk. Separation is your friend.
              </p>
            </div>
            <div className="rounded-xl border bg-gray-50 p-5">
              <h3 className="font-medium text-gray-900">
                Over-claiming or under-claiming
              </h3>
              <p className="mt-2 text-sm">
                Some people claim everything hoping it won't be questioned.
                Others leave money on the table by forgetting legitimate
                expenses. Aim for accurate — claim what's real, document it
                well.
              </p>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <footer className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <p className="text-sm text-amber-800">
            <strong>Disclaimer:</strong> This content is for educational
            purposes only and does not constitute tax advice. Tax rules are
            complex and change over time. Consult a qualified tax professional
            for advice specific to your situation.
          </p>
        </footer>

        {/* Navigation */}
        <div className="mt-10 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/learn/income-structures"
            className="rounded-lg border px-4 py-2.5 text-center text-sm font-medium text-gray-700 hover:border-gray-300 active:bg-gray-50"
          >
            ← Income Structures
          </Link>
          <Link
            href="/learn/tax-readiness"
            className="rounded-lg bg-black px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-800 active:bg-gray-900"
          >
            Next: Tax Readiness →
          </Link>
        </div>
      </article>
    </div>
  );
}
