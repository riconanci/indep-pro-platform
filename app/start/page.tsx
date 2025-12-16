import Link from "next/link";

export default function StartPage() {
  return (
    <div className="rounded-2xl border bg-white p-8">
      <h1 className="text-2xl font-semibold tracking-tight">Build clarity around your business</h1>
      <p className="mt-3 text-gray-700">
        This guided flow helps independent barbers and cosmetologists understand how income flows,
        where an LLC fits, and how to organize expenses—without employer language or advice claims.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/onboarding/role"
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white"
        >
          Start onboarding
        </Link>
        <Link
          href="/tools/income-pipeline"
          className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-900"
        >
          View pipeline preview
        </Link>
      </div>

      <div className="mt-6 text-xs text-gray-600">
        Education only. Not legal or tax advice.
      </div>
    </div>
  );
}
