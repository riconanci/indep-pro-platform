import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl">
      {/* Hero */}
      <div className="rounded-2xl border bg-white p-8">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Build clarity around your business
        </h1>
        <p className="mt-3 text-gray-700">
          A guided platform for independent barbers and cosmetologists in
          California. Understand how income flows, where an LLC fits, and how to
          organize your finances—without employer language or legal advice.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/onboarding/role"
            className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Start onboarding
          </Link>
          <Link
            href="/tools/income-pipeline"
            className="rounded-lg border px-5 py-3 text-sm font-medium text-gray-900 transition hover:border-gray-300"
          >
            Preview income pipeline
          </Link>
        </div>

        <div className="mt-6 text-xs text-gray-500">
          Education only. Not legal, tax, or financial advice.
        </div>
      </div>

      {/* What you get */}
      <div className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
          What's included
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border bg-white p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
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
            <h3 className="mt-3 font-medium">Income Pipeline</h3>
            <p className="mt-1 text-sm text-gray-600">
              Visual diagrams showing how money flows in commission and
              booth-rent structures.
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5">
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
                  d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z"
                />
              </svg>
            </div>
            <h3 className="mt-3 font-medium">Calculators</h3>
            <p className="mt-1 text-sm text-gray-600">
              Net income and quarterly estimate calculators to understand your
              numbers.
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5">
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
            <h3 className="mt-3 font-medium">Templates</h3>
            <p className="mt-1 text-sm text-gray-600">
              Downloadable expense tracker and income log spreadsheets.
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
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
                  d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                />
              </svg>
            </div>
            <h3 className="mt-3 font-medium">Role-aware education</h3>
            <p className="mt-1 text-sm text-gray-600">
              Content adapted for barbers and cosmetologists with relevant
              examples.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="mt-8 rounded-2xl border bg-white p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-semibold">One-time unlock</h2>
            <p className="mt-1 text-sm text-gray-600">
              Full access to all tools, calculators, and templates. No
              subscription.
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-semibold">$59.99</div>
            <Link
              href="/unlock"
              className="mt-2 inline-block rounded-lg bg-black px-4 py-2 text-sm font-medium text-white"
            >
              Unlock
            </Link>
          </div>
        </div>
      </div>

      {/* Who this is for */}
      <div className="mt-8 rounded-xl border bg-gray-50 p-5">
        <h2 className="text-sm font-semibold text-gray-900">Who this is for</h2>
        <ul className="mt-3 space-y-2 text-sm text-gray-600">
          <li className="flex gap-2">
            <span className="text-green-500">✓</span>
            Independent barbers and cosmetologists
          </li>
          <li className="flex gap-2">
            <span className="text-green-500">✓</span>
            Working inside a shop but running your own business
          </li>
          <li className="flex gap-2">
            <span className="text-green-500">✓</span>
            Paid via commission, booth rent, or both
          </li>
          <li className="flex gap-2">
            <span className="text-green-500">✓</span>
            Operating in California as an independent contractor
          </li>
        </ul>

        <div className="mt-4 border-t pt-4">
          <h3 className="text-sm font-semibold text-gray-900">
            This is NOT for
          </h3>
          <ul className="mt-2 space-y-1 text-sm text-gray-500">
            <li>• Shop owners or employers</li>
            <li>• W-2 employees</li>
            <li>• Anyone looking for tax filing or legal advice</li>
          </ul>
        </div>
      </div>

      {/* Already have an account */}
      <div className="mt-8 text-center text-sm text-gray-600">
        Already unlocked?{" "}
        <Link href="/account/login" className="font-medium text-black underline">
          Log in
        </Link>
      </div>
    </div>
  );
}
