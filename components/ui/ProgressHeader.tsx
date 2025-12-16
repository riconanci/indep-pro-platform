import Link from "next/link";

export function ProgressHeader({ step, total }: { step: number; total: number }) {
  const pct = Math.round((step / total) * 100);
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Step {step} of {total}
        </div>
        <Link href="/start" className="text-sm text-gray-700 hover:underline">
          Restart
        </Link>
      </div>
      <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
        <div className="h-2 rounded-full bg-black" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
