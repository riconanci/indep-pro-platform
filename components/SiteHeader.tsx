import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold tracking-tight text-gray-900">
          Independent Pro
        </Link>
        <nav className="flex items-center gap-1 text-sm sm:gap-2">
          <Link 
            href="/learn" 
            className="rounded-lg px-2.5 py-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200 sm:px-3"
          >
            Learn
          </Link>
          <Link 
            href="/tools" 
            className="rounded-lg px-2.5 py-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200 sm:px-3"
          >
            Tools
          </Link>
          <Link 
            href="/dashboard" 
            className="rounded-lg px-2.5 py-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200 sm:px-3"
          >
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
