"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GatedSection } from "@/components/GatedSection";

type UserState = {
  unlocked: boolean;
  loading: boolean;
};

export default function LLCBasicsPage() {
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
          What is an LLC?
        </h1>
        <p className="mt-2 text-gray-600">
          A clear explanation for independent service professionals
        </p>
      </header>

      {/* Main content */}
      <article className="prose-custom">
        {/* Section 1: What it is — FREE */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900">
            What an LLC actually is
          </h2>
          <div className="mt-4 space-y-4 text-gray-700">
            <p>
              LLC stands for Limited Liability Company. It's a legal structure
              you can use to organize your business. Think of it as a container
              — a way to separate your business activities from your personal
              life, at least on paper.
            </p>
            <p>
              When you operate as a sole proprietor (which is what you are by
              default if you're self-employed and haven't formed any entity),
              there's no legal distinction between you and your business. Your
              business income is your personal income. Your business debts are
              your personal debts.
            </p>
            <p>
              An LLC creates that distinction. Your LLC is a separate legal
              entity. It can have its own bank account, its own contracts, and
              its own obligations. This separation is the core idea.
            </p>
          </div>
        </section>

        {/* Section 2: Why professionals consider one — FREE */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900">
            Why independent professionals consider one
          </h2>
          <div className="mt-4 space-y-4 text-gray-700">
            <p>
              The most common reason people form LLCs is liability protection.
              The idea is that if something goes wrong in your business — a
              lawsuit, an unpaid debt, a contract dispute — your personal assets
              (your car, your savings, your home) are protected because they
              belong to you personally, not to the LLC.
            </p>
            <p>
              For service professionals, there's another practical benefit:
              professionalism and clarity. When you have an LLC, you can open a
              business bank account, accept payments in your business name, and
              keep your finances organized. Some professionals find that clients
              and shops take them more seriously when they operate as a formal
              business entity.
            </p>
            <p>
              There can also be flexibility in how you're taxed, though this is
              more nuanced than many people realize (more on that below).
            </p>
          </div>
        </section>

        {/* Section 3: What it doesn't do — FREE */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900">
            What an LLC does <em>not</em> do
          </h2>
          <div className="mt-4 space-y-4 text-gray-700">
            <p>
              This is where misconceptions pile up. Let's clear them out.
            </p>

            <div className="rounded-xl border bg-gray-50 p-5">
              <h3 className="font-medium text-gray-900">
                Myth: "An LLC automatically saves you money on taxes"
              </h3>
              <p className="mt-2 text-sm">
                By default, a single-member LLC is taxed exactly the same as a
                sole proprietorship. The IRS considers it a "disregarded entity"
                — meaning they ignore the LLC structure and tax you as if you
                were still operating personally. You still pay self-employment
                tax on your business income. You still report everything on
                Schedule C.
              </p>
              <p className="mt-2 text-sm">
                There are ways to elect different tax treatment (like S-corp
                election), but these come with additional requirements,
                complexity, and costs. They're not automatic, and they're not
                right for everyone. A tax professional can help you evaluate
                whether any of these elections make sense for your situation.
              </p>
            </div>

            <div className="rounded-xl border bg-gray-50 p-5">
              <h3 className="font-medium text-gray-900">
                Myth: "An LLC makes you bulletproof from lawsuits"
              </h3>
              <p className="mt-2 text-sm">
                Liability protection has limits. If you personally do something
                negligent — say, injure a client — you can still be personally
                liable. The LLC protects against certain business debts and
                obligations, but it doesn't give you a free pass on your own
                actions. Courts can also "pierce the corporate veil" if you
                don't maintain proper separation between your business and
                personal finances.
              </p>
            </div>

            <div className="rounded-xl border bg-gray-50 p-5">
              <h3 className="font-medium text-gray-900">
                Myth: "Forming an LLC is complicated and expensive"
              </h3>
              <p className="mt-2 text-sm">
                In California, forming an LLC is a straightforward process with
                a filing fee. The ongoing cost is the annual franchise tax
                minimum ($800/year as of this writing). It's not free, but it's
                not prohibitively expensive either. Whether it's worth it
                depends on your situation.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: CA Formation Basics — GATED */}
        <GatedSection
          unlocked={userState.unlocked}
          title="California LLC Formation (Full Guide)"
        >
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-gray-900">
              California LLC formation basics
            </h2>
            <div className="mt-4 space-y-4 text-gray-700">
              <p>
                If you've decided an LLC makes sense for your situation, here's
                what the process looks like in California. This is an overview,
                not step-by-step legal instructions — you may want to consult a
                business attorney or use a reputable formation service.
              </p>

              <h3 className="mt-6 font-medium text-gray-900">
                1. Choose your LLC name
              </h3>
              <p>
                Your name must include "LLC" or "Limited Liability Company" and
                can't be too similar to existing California LLCs. You can search
                the California Secretary of State's business database to check
                availability.
              </p>

              <h3 className="mt-6 font-medium text-gray-900">
                2. File Articles of Organization
              </h3>
              <p>
                This is the official document that creates your LLC. You file it
                with the California Secretary of State. As of this writing, the
                filing fee is $70. You can file online, by mail, or in person.
              </p>

              <h3 className="mt-6 font-medium text-gray-900">
                3. Designate a registered agent
              </h3>
              <p>
                Your LLC needs a registered agent — a person or service that can
                receive legal documents on behalf of your business. This can be
                you (at a California address) or a registered agent service.
              </p>

              <h3 className="mt-6 font-medium text-gray-900">
                4. File Statement of Information
              </h3>
              <p>
                Within 90 days of forming your LLC, you must file a Statement of
                Information with the Secretary of State. This is due every two
                years after that. The fee is currently $20.
              </p>

              <h3 className="mt-6 font-medium text-gray-900">
                5. Pay the franchise tax
              </h3>
              <p>
                California LLCs owe an annual minimum franchise tax of $800,
                payable to the Franchise Tax Board. This is due by the 15th day
                of the 4th month after your LLC is formed, and annually after
                that. Note: first-year LLCs may be exempt under certain
                conditions — check the FTB website for current rules.
              </p>

              <h3 className="mt-6 font-medium text-gray-900">
                6. Get an EIN (optional but recommended)
              </h3>
              <p>
                An Employer Identification Number (EIN) is like a Social
                Security number for your business. You don't strictly need one
                for a single-member LLC with no employees, but it's free to get
                from the IRS and helps keep your personal SSN private. Most
                banks require one to open a business account.
              </p>

              <h3 className="mt-6 font-medium text-gray-900">
                7. Open a business bank account
              </h3>
              <p>
                Keeping your business and personal finances separate is
                important for maintaining your LLC's liability protection. A
                dedicated business bank account makes this easy and keeps your
                records clean.
              </p>

              <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-5">
                <h3 className="font-medium text-blue-900">
                  Quick reference: California LLC costs
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-blue-800">
                  <li>Articles of Organization filing: ~$70</li>
                  <li>Statement of Information (every 2 years): ~$20</li>
                  <li>Annual franchise tax minimum: $800/year</li>
                  <li>EIN: Free (from IRS)</li>
                  <li>
                    Optional: Registered agent service: ~$100-300/year if not
                    using yourself
                  </li>
                </ul>
                <p className="mt-3 text-xs text-blue-700">
                  Fees subject to change. Verify current amounts with the
                  California Secretary of State and Franchise Tax Board.
                </p>
              </div>

              {/* Checklist callout */}
              <div className="mt-6 rounded-xl border-2 border-green-200 bg-green-50 p-5">
                <h3 className="font-medium text-green-900">
                  Ready to get started?
                </h3>
                <p className="mt-2 text-sm text-green-800">
                  Use our interactive checklist with direct links to all the
                  official filing portals. Track your progress as you complete
                  each step.
                </p>
                <Link
                  href="/learn/ca-llc-setup"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-green-700 hover:text-green-900 hover:underline"
                >
                  Open CA LLC Setup Checklist
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        </GatedSection>

        {/* Section 5: When to talk to a professional — FREE */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900">
            When to talk to a professional
          </h2>
          <div className="mt-4 space-y-4 text-gray-700">
            <p>
              This guide gives you a conceptual foundation, but it's not a
              substitute for professional advice. Consider consulting with:
            </p>
            <ul className="ml-4 list-disc space-y-2">
              <li>
                <strong>A CPA or tax professional</strong> — to understand how
                an LLC (and any tax elections) would affect your specific
                situation
              </li>
              <li>
                <strong>A business attorney</strong> — if you have questions
                about liability protection, contracts, or compliance
              </li>
              <li>
                <strong>A bookkeeper</strong> — to help set up proper
                recordkeeping from the start
              </li>
            </ul>
            <p>
              The cost of a consultation is usually modest compared to the cost
              of making uninformed decisions about your business structure.
            </p>
          </div>
        </section>

        {/* Disclaimer */}
        <footer className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <p className="text-sm text-amber-800">
            <strong>Disclaimer:</strong> This content is for educational
            purposes only and does not constitute legal, tax, or financial
            advice. Laws and regulations change, and individual circumstances
            vary. Consult qualified professionals for advice specific to your
            situation.
          </p>
        </footer>

        {/* Navigation */}
        <div className="mt-10 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/learn"
            className="rounded-lg border px-4 py-2.5 text-center text-sm font-medium text-gray-700 hover:border-gray-300 active:bg-gray-50"
          >
            ← Back to Learn
          </Link>
          <Link
            href="/learn/income-structures"
            className="rounded-lg bg-black px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-800 active:bg-gray-900"
          >
            Next: Income Structures →
          </Link>
        </div>
      </article>
    </div>
  );
}
