import Link from "next/link";

function FlowPreview() {
  return (
    <div className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6">
      {/* Mini pipeline visualization */}
      <div className="flex flex-col items-center gap-2 text-center">
        {/* Client */}
        <div className="w-full max-w-[200px] rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 shadow-sm">
          Client pays for service
        </div>
        
        {/* Arrow */}
        <div className="flex h-6 w-px items-center justify-center bg-gradient-to-b from-gray-300 to-emerald-400">
          <svg className="h-3 w-3 translate-y-2 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Split indicator */}
        <div className="flex w-full max-w-[280px] gap-2">
          <div className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-2 py-1.5 text-[10px] text-gray-500">
            Shop portion
          </div>
          <div className="flex-1 rounded-lg border-2 border-emerald-200 bg-emerald-50 px-2 py-1.5 text-[10px] font-medium text-emerald-700">
            Your income
          </div>
        </div>

        {/* Arrow */}
        <div className="flex h-6 w-px items-center justify-center bg-gradient-to-b from-emerald-400 to-emerald-500">
          <svg className="h-3 w-3 translate-y-2 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Your business */}
        <div className="w-full max-w-[200px] rounded-lg border-2 border-emerald-300 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800 shadow-sm">
          Your business
        </div>
      </div>

      {/* Label */}
      <div className="mt-4 text-center text-[10px] font-medium uppercase tracking-wider text-gray-400">
        Income Pipeline Preview
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border bg-white p-5 transition hover:shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
        {icon}
      </div>
      <h3 className="mt-4 font-semibold text-gray-900">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{description}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="mx-auto max-w-4xl">
      {/* Hero Section */}
      <section className="relative">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          {/* Left: Copy */}
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              For CA independent professionals
            </div>
            
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Finally understand how your money actually works
            </h1>
            
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              No one taught you how commission splits, booth rent, and LLCs fit together. 
              This platform shows you—visually, clearly, without the jargon.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/onboarding/role"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800 active:bg-gray-950"
              >
                Start free setup
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/tools/income-pipeline"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 active:bg-gray-100"
              >
                See how it works
              </Link>
            </div>

            <p className="mt-4 text-xs text-gray-500">
              Education only. Not legal, tax, or financial advice.
            </p>
          </div>

          {/* Right: Visual */}
          <div className="hidden lg:block">
            <FlowPreview />
          </div>
        </div>

        {/* Mobile: Visual below */}
        <div className="mt-8 lg:hidden">
          <FlowPreview />
        </div>
      </section>

      {/* What's Included */}
      <section className="mt-16 sm:mt-20">
        <div className="mb-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            Everything you need to run your business with clarity
          </h2>
          <p className="mt-2 text-gray-600">
            Built specifically for barbers and cosmetologists working independently
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
              </svg>
            }
            title="Income Pipeline"
            description="Visual diagrams that show exactly how money flows from clients to you—whether through commission splits or booth rent."
          />
          <FeatureCard
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            }
            title="Plain-English Guides"
            description="LLC basics, income structures, expense tracking, and tax readiness—explained for your actual situation."
          />
          <FeatureCard
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
              </svg>
            }
            title="Calculators"
            description="Estimate net income and quarterly tax payments. See what you're actually keeping after expenses."
          />
          <FeatureCard
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
              </svg>
            }
            title="Interactive Checklists"
            description="Step-by-step CA LLC setup with links to official portals. Track your progress as you go."
          />
          <FeatureCard
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            }
            title="Downloadable Templates"
            description="Expense tracker and income log spreadsheets. Simple CSVs that work anywhere."
          />
          <FeatureCard
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
            title="Your Business Profile"
            description="Save your setup—role, income structure, entity status—and get personalized views throughout."
          />
        </div>
      </section>

      {/* Pricing */}
      <section className="mt-16 sm:mt-20">
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4">
            <div className="text-sm font-medium text-gray-300">One-time purchase</div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">$59.99</span>
              <span className="text-sm text-gray-400">lifetime access</span>
            </div>
          </div>
          
          <div className="p-6">
            <ul className="space-y-3">
              {[
                "Full access to all tools and calculators",
                "Complete educational guides",
                "Interactive checklists with progress saving",
                "Downloadable templates",
                "All future updates included",
                "No subscription—pay once, use forever",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/unlock"
                className="inline-flex flex-1 items-center justify-center rounded-xl bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800"
              >
                Unlock full access
              </Link>
              <Link
                href="/learn"
                className="inline-flex flex-1 items-center justify-center rounded-xl border px-6 py-3.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Browse free previews
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="mt-16 sm:mt-20">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* For */}
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              This is for you if...
            </div>
            <ul className="mt-4 space-y-2.5">
              {[
                "You're an independent barber or cosmetologist",
                "You work inside a shop but run your own business",
                "You're paid via commission, booth rent, or both",
                "You're operating in California as a 1099 contractor",
                "You want to understand—not just comply",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Not for */}
          <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
              This is NOT for...
            </div>
            <ul className="mt-4 space-y-2.5">
              {[
                "Shop owners or employers",
                "W-2 employees of a salon",
                "Anyone looking for tax filing services",
                "Anyone needing legal or financial advice",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-500">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-16 mb-8 sm:mt-20">
        <div className="rounded-2xl border bg-gradient-to-br from-gray-50 to-white p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            Ready to understand your business?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-gray-600">
            Start with the free onboarding—see your income structure mapped out before you pay anything.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/onboarding/role"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800"
            >
              Start free setup
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            Already unlocked?{" "}
            <Link href="/account/login" className="font-medium text-gray-900 underline underline-offset-2 hover:no-underline">
              Log in
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
