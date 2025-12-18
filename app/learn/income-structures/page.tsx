"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GatedSection } from "@/components/GatedSection";

type UserState = {
  unlocked: boolean;
  loading: boolean;
};

export default function IncomeStructuresPage() {
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
          Understanding Your Income Structure
        </h1>
        <p className="mt-2 text-gray-600">
          Commission, booth rent, and how money actually flows
        </p>
      </header>

      {/* Main content */}
      <article className="prose-custom">
        {/* Section 1: The core concept — FREE */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900">
            The key insight: collection ≠ ownership
          </h2>
          <div className="mt-4 space-y-4 text-gray-700">
            <p>
              Here's the most important idea to understand about income as an
              independent professional: <strong>who collects the payment is not
              the same as who earns the income</strong>.
            </p>
            <p>
              When you provide a service to a client, you earn that income. It
              doesn't matter whether the client pays you directly, pays through
              the shop's system, or uses a third-party app. The income belongs
              to you because you did the work.
            </p>
            <p>
              This distinction matters for understanding your true business
              picture — and it's often where confusion starts.
            </p>
          </div>
        </section>

        {/* Section 2: Structure A — FREE */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900">
            Structure A: Shop collects, then splits
          </h2>
          <div className="mt-4 space-y-4 text-gray-700">
            <p>
              In this arrangement, the shop handles payment collection. When
              your client pays, the money goes through the shop's register or
              payment system. The shop keeps an agreed-upon portion (their
              "cut"), and the rest is paid to you.
            </p>
            <p>
              Common examples: 60/40 split, 70/30 split, sliding scale based on
              tenure or production.
            </p>
            <div className="rounded-xl border bg-gray-50 p-5">
              <h3 className="font-medium text-gray-900">How the money flows</h3>
              <ol className="mt-3 space-y-2 text-sm">
                <li>1. Client pays $50 for service → shop collects it</li>
                <li>2. Your agreed split is 60% → shop calculates $30 is yours</li>
                <li>3. Shop keeps $20, pays you $30</li>
                <li>4. At year end, shop may issue you a 1099 for total paid</li>
              </ol>
            </div>
            <p>
              Important: The $30 you receive is your <em>gross business income</em>.
              You still have your own expenses (supplies, tools, education,
              possibly booth-related costs you pay directly). Your net income is
              what remains after those expenses.
            </p>
          </div>
        </section>

        {/* Section 3: Structure B — FREE */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900">
            Structure B: You collect, then pay booth rent
          </h2>
          <div className="mt-4 space-y-4 text-gray-700">
            <p>
              In this arrangement, clients pay you directly. You collect the
              full amount for each service. Then you pay the shop a fixed fee
              (booth rent) or sometimes a percentage for the right to operate
              there.
            </p>
            <p>
              Common examples: $400/month booth rent, $100/week chair rental,
              percentage of gross to shop.
            </p>
            <div className="rounded-xl border bg-gray-50 p-5">
              <h3 className="font-medium text-gray-900">How the money flows</h3>
              <ol className="mt-3 space-y-2 text-sm">
                <li>1. Client pays you $50 for service → you collect it</li>
                <li>2. You keep the full $50 (this is your gross income)</li>
                <li>3. You pay shop $400/month booth rent (this is a business expense)</li>
                <li>4. Shop typically does NOT issue you a 1099 (you paid them)</li>
              </ol>
            </div>
            <p>
              In this structure, your gross income is higher (you keep the full
              service price), but so are your explicit expenses (booth rent).
              The net result can be similar to Structure A, depending on the
              numbers.
            </p>
          </div>
        </section>

        {/* Section 4: Hybrid and choosing — FREE */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900">
            Hybrid structures and which is "better"
          </h2>
          <div className="mt-4 space-y-4 text-gray-700">
            <p>
              Many arrangements are hybrids. Maybe the shop collects for
              walk-ins (Structure A) but you collect directly from your regulars
              (Structure B). Maybe you pay booth rent but also split product
              sales with the shop.
            </p>
            <p>
              Neither structure is inherently better. They're just different
              ways to organize the same underlying economics. What matters is
              understanding your actual numbers: What do you bring in? What goes
              out? What remains?
            </p>
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
              <p className="text-sm text-blue-800">
                <strong>Tip:</strong> Use the{" "}
                <Link
                  href="/tools/income-pipeline"
                  className="underline hover:no-underline"
                >
                  Income Pipeline
                </Link>{" "}
                tool to see a visual diagram of how money flows in your specific
                structure.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Deep dive — GATED */}
        <GatedSection
          unlocked={userState.unlocked}
          title="Structure Comparison & Optimization (Full Guide)"
        >
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-gray-900">
              Comparing structures: what to consider
            </h2>
            <div className="mt-4 space-y-4 text-gray-700">
              <p>
                When evaluating or negotiating your arrangement, here are the
                factors that actually matter:
              </p>

              <h3 className="mt-6 font-medium text-gray-900">
                Cash flow predictability
              </h3>
              <p>
                Booth rent (Structure B) gives you predictable expenses — you
                know exactly what you owe each month regardless of how busy you
                are. Commission splits (Structure A) mean your costs scale with
                your income — slow months hurt less, but you give up more when
                busy.
              </p>

              <h3 className="mt-6 font-medium text-gray-900">
                Upside potential
              </h3>
              <p>
                In a booth rent arrangement, every dollar over your fixed costs
                is yours. If you're consistently busy, this can be
                advantageous. In a commission split, the shop always takes
                their cut regardless of your volume.
              </p>

              <h3 className="mt-6 font-medium text-gray-900">
                Risk tolerance
              </h3>
              <p>
                Starting out or building a client base? A commission structure
                might feel safer — if business is slow, your costs are low.
                Established with a full book? Booth rent might make more
                financial sense.
              </p>

              <h3 className="mt-6 font-medium text-gray-900">
                What's included
              </h3>
              <p>
                The headline split or rent number doesn't tell the whole story.
                Does the shop provide supplies? Towels? Marketing? Credit card
                processing? Scheduling software? These "hidden" costs or
                benefits can significantly change the real economics of your
                arrangement.
              </p>

              <div className="mt-6 rounded-xl border bg-gray-50 p-5">
                <h3 className="font-medium text-gray-900">
                  Worksheet: Comparing two structures
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  To fairly compare offers, calculate your expected monthly net
                  under each:
                </p>
                <div className="mt-4 space-y-3 text-sm">
                  <div className="rounded-lg border bg-white p-3">
                    <div className="font-medium">Structure A (Commission)</div>
                    <div className="mt-2 text-gray-600">
                      Expected gross services × Your split % – Your direct
                      expenses = Net
                    </div>
                  </div>
                  <div className="rounded-lg border bg-white p-3">
                    <div className="font-medium">Structure B (Booth rent)</div>
                    <div className="mt-2 text-gray-600">
                      Expected gross services – Booth rent – Your direct
                      expenses = Net
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-xs text-gray-500">
                  Use the{" "}
                  <Link
                    href="/tools/net-income"
                    className="underline hover:no-underline"
                  >
                    Net Income Calculator
                  </Link>{" "}
                  to run these numbers.
                </p>
              </div>

              <h3 className="mt-6 font-medium text-gray-900">
                Negotiation considerations
              </h3>
              <p>
                Your arrangement isn't necessarily fixed. As you build your
                client base and demonstrate your value, you may be able to
                negotiate better terms. Consider: What leverage do you have?
                What does the shop value? Is there a path to better terms over
                time?
              </p>
              <p>
                Some professionals negotiate hybrid arrangements that give them
                the best of both worlds — a lower booth rent plus a smaller
                commission on shop-referred clients, for example.
              </p>
            </div>
          </section>
        </GatedSection>

        {/* Section 6: Independent contractor status — FREE */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900">
            A note on independent contractor status
          </h2>
          <div className="mt-4 space-y-4 text-gray-700">
            <p>
              Both Structure A and Structure B can support independent
              contractor status. The payment arrangement alone doesn't determine
              whether you're an employee or independent contractor — that
              depends on the overall nature of your relationship with the shop
              (control, independence, how you present yourself to clients,
              etc.).
            </p>
            <p>
              If you're unsure about your classification, or if a shop is
              treating you in ways that seem inconsistent with independent
              contractor status, consider consulting with an employment attorney
              or reviewing California's guidelines on worker classification.
            </p>
          </div>
        </section>

        {/* Disclaimer */}
        <footer className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <p className="text-sm text-amber-800">
            <strong>Disclaimer:</strong> This content is for educational
            purposes only and does not constitute legal, tax, or financial
            advice. Individual circumstances vary. Consult qualified
            professionals for advice specific to your situation.
          </p>
        </footer>

        {/* Navigation */}
        <div className="mt-10 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/learn/llc-basics"
            className="rounded-lg border px-4 py-2.5 text-center text-sm font-medium text-gray-700 hover:border-gray-300 active:bg-gray-50"
          >
            ← LLC Basics
          </Link>
          <Link
            href="/learn/expense-tracking"
            className="rounded-lg bg-black px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-800 active:bg-gray-900"
          >
            Next: Expense Tracking →
          </Link>
        </div>
      </article>
    </div>
  );
}
