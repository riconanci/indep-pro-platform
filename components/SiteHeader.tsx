import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold tracking-tight">
          Independent Pro Platform
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/start" className="hover:underline">
            Start
          </Link>
          <Link href="/tools/income-pipeline" className="hover:underline">
            Income Pipeline
          </Link>
        </nav>
      </div>
    </header>
  );
}
