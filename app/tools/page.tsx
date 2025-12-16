import Link from "next/link";
import { getCurrentUser, isUnlocked } from "@/lib/currentUser";

type ToolCardProps = {
  title: string;
  description: string;
  href: string;
  unlocked: boolean;
  type: "calculator" | "template";
};

function ToolCard({ title, description, href, unlocked, type }: ToolCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-xl border bg-white p-5 transition hover:border-gray-300 hover:shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-gray-900 group-hover:text-black">
              {title}
            </h3>
            {!unlocked && (
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                Preview
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        </div>
        <div className="shrink-0">
          {type === "calculator" ? (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z"
                />
              </svg>
            </div>
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default async function ToolsPage() {
  const user = await getCurrentUser();
  const unlocked = isUnlocked(user);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Tools</h1>
        <p className="mt-2 text-sm text-gray-700">
          Calculators and templates to help you understand your business
          numbers. Educational tools only — not tax or financial advice.
        </p>
        {!unlocked && (
          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
            <p className="text-sm text-amber-800">
              <span className="font-medium">Preview mode.</span>{" "}
              <Link href="/unlock" className="underline hover:no-underline">
                Unlock
              </Link>{" "}
              to use all tools and download templates.
            </p>
          </div>
        )}
      </div>

      <div className="space-y-8">
        {/* Calculators */}
        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Calculators
          </h2>
          <div className="grid gap-3">
            <ToolCard
              title="Net Income Calculator"
              description="Estimate your net business income after expenses. See what remains before taxes."
              href="/tools/net-income"
              unlocked={unlocked}
              type="calculator"
            />
            <ToolCard
              title="Quarterly Estimate Calculator"
              description="Get a rough idea of quarterly tax payments based on your expected income."
              href="/tools/quarterly-estimate"
              unlocked={unlocked}
              type="calculator"
            />
          </div>
        </section>

        {/* Templates */}
        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Templates
          </h2>
          <div className="grid gap-3">
            <ToolCard
              title="Expense Tracker"
              description="Simple CSV template to track business expenses throughout the year."
              href="/tools/templates"
              unlocked={unlocked}
              type="template"
            />
            <ToolCard
              title="Income Log"
              description="Track client payments and income sources in one organized spreadsheet."
              href="/tools/templates"
              unlocked={unlocked}
              type="template"
            />
          </div>
        </section>

        {/* Quick links */}
        <section className="rounded-xl border bg-gray-50 p-5">
          <h2 className="text-sm font-semibold text-gray-900">
            Related resources
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href="/tools/income-pipeline"
              className="rounded-lg border bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:border-gray-300"
            >
              Income Pipeline
            </Link>
            <Link
              href="/dashboard"
              className="rounded-lg border bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:border-gray-300"
            >
              Dashboard
            </Link>
            <Link
              href="/onboarding/summary"
              className="rounded-lg border bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:border-gray-300"
            >
              Edit profile
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
