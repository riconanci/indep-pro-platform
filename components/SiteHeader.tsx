import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold tracking-tight">
          Independent Pro
        </Link>
        <nav className="flex items-center gap-1 text-sm sm:gap-4">
          <Link 
            href="/learn" 
            className="rounded-lg px-2 py-1.5 text-gray-600 hover:bg-gray-100 hover:text-black sm:px-3"
          >
            Learn
          </Link>
          <Link 
            href="/tools" 
            className="rounded-lg px-2 py-1.5 text-gray-600 hover:bg-gray-100 hover:text-black sm:px-3"
          >
            Tools
          </Link>
          <Link 
            href="/dashboard" 
            className="rounded-lg px-2 py-1.5 text-gray-600 hover:bg-gray-100 hover:text-black sm:px-3"
          >
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
