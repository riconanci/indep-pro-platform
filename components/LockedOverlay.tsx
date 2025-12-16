import Link from "next/link";

type Props = {
  children: React.ReactNode;
  message?: string;
};

export function LockedOverlay({
  children,
  message = "Unlock to use this tool",
}: Props) {
  return (
    <div className="relative">
      {/* Blurred preview content */}
      <div className="pointer-events-none select-none blur-sm">{children}</div>

      {/* Overlay with CTA */}
      <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[2px]">
        <div className="rounded-2xl border bg-white p-6 text-center shadow-lg">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <svg
              className="h-6 w-6 text-gray-600"
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
          <div className="text-sm font-medium text-gray-900">{message}</div>
          <div className="mt-1 text-xs text-gray-600">
            One-time unlock • $59.99
          </div>
          <Link
            href="/unlock"
            className="mt-4 inline-block rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Unlock now
          </Link>
        </div>
      </div>
    </div>
  );
}
