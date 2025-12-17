import { redirect } from "next/navigation";
import { getCurrentUser, isUnlocked } from "@/lib/currentUser";
import { db } from "@/lib/db";
import Link from "next/link";

async function getUsageStats(userId: string) {
  const [calculatorCount, templateCount] = await Promise.all([
    db.usageEvent.count({
      where: { userId, event: "calculator_used" },
    }),
    db.usageEvent.count({
      where: { userId, event: "template_downloaded" },
    }),
  ]);

  return { calculatorCount, templateCount };
}

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) redirect("/account/login");
  if (!isUnlocked(user)) redirect("/unlock");

  const p = user.profile;
  const stats = await getUsageStats(user.id);

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <p className="mt-2 text-sm text-gray-700">Your unlocked home base.</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {/* Business snapshot */}
        <div className="rounded-2xl border bg-white p-5">
          <div className="text-sm font-semibold">Business snapshot</div>
          <div className="mt-3 grid gap-2 text-sm text-gray-700">
            <div>Role: {p?.role ?? "Not set"}</div>
            <div>Collection: {p?.collectionMethod ?? "Not set"}</div>
            <div>Structure: {p?.incomeStructure ?? "Not set"}</div>
            <div>Entity: {p?.entityStatus ?? "Not set"}</div>
          </div>

          <div className="mt-5">
            <Link
              className="rounded-lg border px-3 py-2 text-sm font-medium hover:border-gray-300"
              href="/onboarding/role"
            >
              {p ? "Edit profile" : "Complete setup"}
            </Link>
          </div>
        </div>

        {/* Usage stats */}
        <div className="rounded-2xl border bg-white p-5">
          <div className="text-sm font-semibold">Your activity</div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-gray-50 p-3 text-center">
              <div className="text-2xl font-semibold text-gray-900">
                {stats.calculatorCount}
              </div>
              <div className="text-xs text-gray-600">Calculations</div>
            </div>
            <div className="rounded-lg bg-gray-50 p-3 text-center">
              <div className="text-2xl font-semibold text-gray-900">
                {stats.templateCount}
              </div>
              <div className="text-xs text-gray-600">Downloads</div>
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-500">
            Activity tracked for your records
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-6 rounded-2xl border bg-white p-5">
        <div className="text-sm font-semibold">Tools & resources</div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/tools/income-pipeline"
            className="rounded-xl border p-4 text-center transition hover:border-gray-300 hover:bg-gray-50"
          >
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
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
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                />
              </svg>
            </div>
            <div className="mt-2 text-sm font-medium">Income Pipeline</div>
          </Link>

          <Link
            href="/tools/net-income"
            className="rounded-xl border p-4 text-center transition hover:border-gray-300 hover:bg-gray-50"
          >
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
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
                  d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z"
                />
              </svg>
            </div>
            <div className="mt-2 text-sm font-medium">Net Income</div>
          </Link>

          <Link
            href="/tools/quarterly-estimate"
            className="rounded-xl border p-4 text-center transition hover:border-gray-300 hover:bg-gray-50"
          >
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
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
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>
            </div>
            <div className="mt-2 text-sm font-medium">Quarterly Est.</div>
          </Link>

          <Link
            href="/tools/templates"
            className="rounded-xl border p-4 text-center transition hover:border-gray-300 hover:bg-gray-50"
          >
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
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
            <div className="mt-2 text-sm font-medium">Templates</div>
          </Link>
        </div>

        <div className="mt-4 border-t pt-4">
          <Link
            href="/tools"
            className="text-sm font-medium text-gray-700 hover:text-black"
          >
            View all tools →
          </Link>
        </div>
      </div>

      {/* Educational reminder */}
      <div className="mt-6 rounded-xl border bg-gray-50 p-4">
        <p className="text-xs text-gray-600">
          All tools and calculators are for educational purposes only. They
          provide conceptual illustrations to help you understand your business
          finances. This is not tax, legal, or financial advice. Consult
          qualified professionals for your specific situation.
        </p>
      </div>
    </div>
  );
}
