import Link from "next/link";

type Props = {
  children: React.ReactNode;
  unlocked: boolean;
  title?: string;
};

/**
 * Wraps education content that requires unlock.
 * Shows a teaser with blur effect when locked.
 */
export function GatedSection({ children, unlocked, title }: Props) {
  if (unlocked) {
    return <>{children}</>;
  }

  return (
    <div className="relative mt-8">
      {/* Section header */}
      {title && (
        <div className="mb-4 flex items-center gap-2">
          <svg
            className="h-5 w-5 text-gray-400"
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
          <span className="text-sm font-medium text-gray-600">{title}</span>
        </div>
      )}

      {/* Blurred preview */}
      <div className="pointer-events-none select-none">
        <div className="blur-sm">{children}</div>
      </div>

      {/* Unlock prompt overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-white/40 via-white/80 to-white">
        <div className="rounded-xl border bg-white p-5 text-center shadow-sm">
          <div className="text-sm font-medium text-gray-900">
            Unlock to continue reading
          </div>
          <div className="mt-1 text-xs text-gray-600">
            Full guide included with one-time unlock
          </div>
          <Link
            href="/unlock"
            className="mt-3 inline-block rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 active:bg-gray-900"
          >
            Unlock • $59.99
          </Link>
        </div>
      </div>
    </div>
  );
}
