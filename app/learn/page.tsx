import Link from "next/link";
import { getCurrentUser, isUnlocked } from "@/lib/currentUser";
import { ChecklistCard } from "@/components/ChecklistCard";

type TopicCardProps = {
  title: string;
  description: string;
  href: string;
  unlocked: boolean;
  hasGatedContent: boolean;
  badge?: string;
};

function TopicCard({
  title,
  description,
  href,
  unlocked,
  hasGatedContent,
  badge,
}: TopicCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-xl border bg-white p-5 transition hover:border-gray-300 hover:shadow-sm active:bg-gray-50"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900 group-hover:text-black">
              {title}
            </h3>
            {badge && (
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                {badge}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        </div>
        <div className="flex-shrink-0">
          {hasGatedContent && !unlocked ? (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
              <svg
                className="h-4 w-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50">
              <svg
                className="h-4 w-4 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Content availability indicator */}
      <div className="mt-3 flex items-center gap-2 text-xs">
        {!hasGatedContent ? (
          <span className="rounded-full bg-green-50 px-2 py-0.5 text-green-700">
            Free
          </span>
        ) : (
          <>
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-600">
              Free preview
            </span>
            <span
              className={`rounded-full px-2 py-0.5 ${
                unlocked
                  ? "bg-green-50 text-green-700"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {unlocked ? "Full access" : "Full guide locked"}
            </span>
          </>
        )}
      </div>
    </Link>
  );
}

export default async function LearnPage() {
  const user = await getCurrentUser();
  const unlocked = isUnlocked(user);

  return (
    <div className="mx-auto max-w-3xl px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Learn</h1>
        <p className="mt-2 text-sm text-gray-700">
          Educational guides to help you understand your business. Not legal or
          tax advice — just clear explanations of how things work.
        </p>
        {!unlocked && (
          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
            <p className="text-sm text-amber-800">
              <span className="font-medium">Preview mode.</span> Free sections
              are available to everyone.{" "}
              <Link href="/unlock" className="underline hover:no-underline">
                Unlock
              </Link>{" "}
              for complete guides and interactive checklists.
            </p>
          </div>
        )}
      </div>

      {/* Interactive checklists section */}
      <section className="mb-10">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
          Interactive Checklists
        </h2>
        <div className="grid gap-4">
          <ChecklistCard
            title="California LLC Setup Checklist"
            description="Step-by-step guide with links to official filing portals. Track your progress as you go."
            href="/learn/ca-llc-setup"
            unlocked={unlocked}
            checklistSlug="ca-llc-setup"
            totalSteps={10}
          />
        </div>
      </section>

      {/* Guides section */}
      <section className="mb-10">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
          Guides
        </h2>
        <div className="grid gap-4">
          <TopicCard
            title="What is an LLC?"
            description="What it actually is, why professionals consider one, and what it doesn't do. California formation basics included."
            href="/learn/llc-basics"
            unlocked={unlocked}
            hasGatedContent={true}
          />

          <TopicCard
            title="Understanding Your Income Structure"
            description="Commission splits, booth rent, and hybrid arrangements. How money flows and what it means for your business."
            href="/learn/income-structures"
            unlocked={unlocked}
            hasGatedContent={true}
          />

          <TopicCard
            title="Expense Tracking Basics"
            description="What counts as a business expense, what doesn't, and how to keep records that actually help."
            href="/learn/expense-tracking"
            unlocked={unlocked}
            hasGatedContent={true}
          />

          <TopicCard
            title="Tax Readiness"
            description="Quarterly payments, recordkeeping, and what to have ready when tax time comes. Concepts, not advice."
            href="/learn/tax-readiness"
            unlocked={unlocked}
            hasGatedContent={true}
          />
        </div>
      </section>

      {/* Related links */}
      <section className="rounded-xl border bg-gray-50 p-5">
        <h2 className="text-sm font-semibold text-gray-900">Related tools</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            href="/tools/income-pipeline"
            className="rounded-lg border bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:border-gray-300"
          >
            Income Pipeline
          </Link>
          <Link
            href="/tools/net-income"
            className="rounded-lg border bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:border-gray-300"
          >
            Net Income Calculator
          </Link>
          <Link
            href="/tools/templates"
            className="rounded-lg border bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:border-gray-300"
          >
            Templates
          </Link>
        </div>
      </section>
    </div>
  );
}
