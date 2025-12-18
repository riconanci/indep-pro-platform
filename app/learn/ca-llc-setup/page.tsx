"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import {
  getChecklistProgress,
  toggleChecklistStep,
  resetChecklistProgress,
} from "@/app/actions/checklistActions";

type UserState = {
  unlocked: boolean;
  loading: boolean;
};

type Step = {
  id: string;
  title: string;
  description: string;
  details?: string;
  link?: { url: string; label: string };
  cost?: string;
  time?: string;
};

const CHECKLIST_SLUG = "ca-llc-setup" as const;

const steps: Step[] = [
  {
    id: "research",
    title: "Confirm an LLC is right for you",
    description:
      "Review the LLC Basics guide and consider consulting a professional.",
    details:
      "An LLC isn't required to operate as an independent professional, and it's not right for everyone. Make sure you understand the costs, benefits, and ongoing requirements before proceeding.",
    link: { url: "/learn/llc-basics", label: "Read LLC Basics" },
  },
  {
    id: "choose-name",
    title: "Choose your LLC name",
    description:
      "Search the CA Secretary of State database to check availability.",
    details:
      "Your name must include 'LLC' or 'Limited Liability Company' and can't be confusingly similar to existing California LLCs. Many professionals use their own name (e.g., 'Jane Smith LLC') or a business name.",
    link: {
      url: "https://bizfileonline.sos.ca.gov/search/business",
      label: "Search CA business names",
    },
  },
  {
    id: "registered-agent",
    title: "Decide on a registered agent",
    description:
      "You can be your own agent (CA address required) or use a service.",
    details:
      "A registered agent receives legal documents on behalf of your LLC. If you have a stable California address and are comfortable receiving legal mail there, you can act as your own agent. Otherwise, registered agent services typically cost $100-300/year.",
  },
  {
    id: "file-articles",
    title: "File Articles of Organization",
    description: "Submit Form LLC-1 to the CA Secretary of State.",
    details:
      "This is the official document that creates your LLC. You can file online (fastest), by mail, or in person. Online filing typically processes in a few business days.",
    link: {
      url: "https://bizfileonline.sos.ca.gov/",
      label: "File online at bizfile",
    },
    cost: "$70",
    time: "1-5 business days (online)",
  },
  {
    id: "get-ein",
    title: "Get an EIN from the IRS",
    description:
      "Apply for an Employer Identification Number (free, instant online).",
    details:
      "An EIN is like a Social Security number for your business. While not strictly required for a single-member LLC with no employees, it's free to get and keeps your personal SSN private. Most banks require one to open a business account.",
    link: {
      url: "https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online",
      label: "Apply for EIN (IRS)",
    },
    cost: "Free",
    time: "Instant (online)",
  },
  {
    id: "statement-of-info",
    title: "File Statement of Information",
    description: "Due within 90 days of forming your LLC, then every 2 years.",
    details:
      "This form (LLC-12) provides basic information about your LLC to the state. Set a reminder to refile every two years.",
    link: {
      url: "https://bizfileonline.sos.ca.gov/",
      label: "File at bizfile",
    },
    cost: "$20",
    time: "Within 90 days of formation",
  },
  {
    id: "franchise-tax",
    title: "Understand CA Franchise Tax",
    description:
      "California LLCs owe a minimum $800/year franchise tax to the FTB.",
    details:
      "This annual tax is due by the 15th day of the 4th month after your LLC is formed, and annually after that. First-year LLCs may qualify for an exemption — check FTB for current rules. This is an ongoing cost of maintaining a CA LLC.",
    link: {
      url: "https://www.ftb.ca.gov/file/business/types/limited-liability-company/index.html",
      label: "CA FTB LLC info",
    },
    cost: "$800/year minimum",
  },
  {
    id: "bank-account",
    title: "Open a business bank account",
    description:
      "Keep business and personal finances separate from day one.",
    details:
      "You'll need your Articles of Organization, EIN, and personal ID. Shop around — many banks offer free business checking for small businesses. This separation is important for maintaining your LLC's liability protection.",
  },
  {
    id: "local-permits",
    title: "Check local business license requirements",
    description:
      "Some cities/counties require a business license to operate.",
    details:
      "Requirements vary by location. Check with your city's business license office. This is separate from your state cosmetology/barber license.",
    link: {
      url: "https://www.calgold.ca.gov/",
      label: "CalGold permit search",
    },
  },
  {
    id: "update-clients",
    title: "Update your business operations",
    description:
      "Notify relevant parties and update how you receive payments.",
    details:
      "Consider: updating your payment apps/invoices to your LLC name, notifying the shop you work at, getting new business cards, and starting to track income/expenses through your business account.",
  },
];

function ProgressBar({ completed, total }: { completed: number; total: number }) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-gray-900">Your progress</span>
        <span className="text-gray-600">
          {completed} of {total} steps
        </span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-green-500 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {completed === total && total > 0 && (
        <p className="mt-3 text-sm text-green-700">
          🎉 All steps complete! Your LLC setup checklist is done.
        </p>
      )}
    </div>
  );
}

function ChecklistStep({
  step,
  completed,
  onToggle,
  disabled,
  pending,
}: {
  step: Step;
  completed: boolean;
  onToggle: () => void;
  disabled: boolean;
  pending: boolean;
}) {
  return (
    <div
      className={`rounded-xl border bg-white p-5 transition ${
        completed ? "border-green-200 bg-green-50/50" : ""
      }`}
    >
      <div className="flex gap-4">
        {/* Checkbox */}
        <div className="flex-shrink-0 pt-0.5">
          <button
            onClick={onToggle}
            disabled={disabled || pending}
            className={`flex h-6 w-6 items-center justify-center rounded-md border-2 transition ${
              disabled
                ? "cursor-not-allowed border-gray-200 bg-gray-50"
                : completed
                ? "border-green-500 bg-green-500 text-white"
                : "border-gray-300 hover:border-gray-400"
            } ${pending ? "opacity-50" : ""}`}
            aria-label={completed ? "Mark as incomplete" : "Mark as complete"}
          >
            {completed && (
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3
            className={`font-medium ${
              completed ? "text-green-900" : "text-gray-900"
            }`}
          >
            {step.title}
          </h3>
          <p
            className={`mt-1 text-sm ${
              completed ? "text-green-700" : "text-gray-600"
            }`}
          >
            {step.description}
          </p>

          {step.details && (
            <p className="mt-3 text-sm text-gray-600">{step.details}</p>
          )}

          {/* Meta info */}
          <div className="mt-3 flex flex-wrap items-center gap-3">
            {step.cost && (
              <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                Cost: {step.cost}
              </span>
            )}
            {step.time && (
              <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                {step.time}
              </span>
            )}
            {step.link && (
              <a
                href={step.link.url}
                target={step.link.url.startsWith("http") ? "_blank" : undefined}
                rel={
                  step.link.url.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
              >
                {step.link.label}
                {step.link.url.startsWith("http") && (
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                )}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function LockedChecklist() {
  return (
    <div className="relative">
      {/* Blurred preview */}
      <div className="pointer-events-none select-none opacity-60 blur-sm">
        <div className="space-y-4">
          {steps.slice(0, 3).map((step) => (
            <div key={step.id} className="rounded-xl border bg-white p-5">
              <div className="flex gap-4">
                <div className="h-6 w-6 rounded-md border-2 border-gray-300" />
                <div>
                  <div className="font-medium text-gray-900">{step.title}</div>
                  <div className="mt-1 text-sm text-gray-600">
                    {step.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-white/40 via-white/80 to-white">
        <div className="rounded-xl border bg-white p-6 text-center shadow-sm">
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
          <div className="text-sm font-medium text-gray-900">
            Unlock to access this checklist
          </div>
          <div className="mt-1 text-xs text-gray-600">
            Interactive checklist with progress saving
          </div>
          <Link
            href="/unlock"
            className="mt-4 inline-block rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Unlock • $59.99
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CALLCSetupPage() {
  const [userState, setUserState] = useState<UserState>({
    unlocked: false,
    loading: true,
  });
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [pending, startTransition] = useTransition();

  // Load user state and progress
  useEffect(() => {
    async function load() {
      // First, check unlock status
      let unlocked = false;
      try {
        const res = await fetch("/api/me", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          unlocked = data.user?.unlocked ?? false;
        }
      } catch {
        // Failed to check user status
      }
      
      setUserState({ unlocked, loading: false });

      // Then, if unlocked, try to load progress separately
      if (unlocked) {
        try {
          const progress = await getChecklistProgress(CHECKLIST_SLUG);
          setCompletedSteps(progress);
        } catch {
          // Progress fetch failed (maybe migration not applied yet)
          // User is still unlocked, just no saved progress
          console.error("Failed to load checklist progress");
        }
      }
    }
    load();
  }, []);

  function handleToggle(stepId: string) {
    // Optimistic update
    setCompletedSteps((prev) =>
      prev.includes(stepId)
        ? prev.filter((s) => s !== stepId)
        : [...prev, stepId]
    );

    startTransition(async () => {
      const result = await toggleChecklistStep(CHECKLIST_SLUG, stepId);
      if (result.ok) {
        setCompletedSteps(result.completedSteps);
      }
    });
  }

  function handleReset() {
    if (!confirm("Reset all progress? This cannot be undone.")) return;

    setCompletedSteps([]);
    startTransition(async () => {
      await resetChecklistProgress(CHECKLIST_SLUG);
    });
  }

  if (userState.loading) {
    return (
      <div className="mx-auto max-w-2xl px-4">
        <div className="animate-pulse">
          <div className="h-6 w-32 rounded bg-gray-200" />
          <div className="mt-4 h-8 w-64 rounded bg-gray-200" />
          <div className="mt-6 space-y-4">
            <div className="h-24 rounded-xl bg-gray-100" />
            <div className="h-24 rounded-xl bg-gray-100" />
            <div className="h-24 rounded-xl bg-gray-100" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4">
      {/* Back link */}
      <div className="mb-6">
        <Link
          href="/learn"
          className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-black active:bg-gray-200"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Learn
        </Link>
      </div>

      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          California LLC Setup Checklist
        </h1>
        <p className="mt-2 text-gray-600">
          Step-by-step guide with links to official resources. Your progress is
          saved automatically.
        </p>
      </header>

      {/* Disclaimer */}
      <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm text-amber-800">
          <strong>Note:</strong> This checklist organizes publicly available
          information. It is not legal or tax advice. Consider consulting with a
          professional before making business structure decisions.
        </p>
      </div>

      {userState.unlocked ? (
        <>
          {/* Progress bar */}
          <div className="mb-6">
            <ProgressBar
              completed={completedSteps.length}
              total={steps.length}
            />
          </div>

          {/* Before you start */}
          <div className="mb-6 rounded-xl border bg-blue-50 p-5">
            <h2 className="font-medium text-blue-900">Before you start</h2>
            <p className="mt-2 text-sm text-blue-800">
              Have these ready: a California address for your registered agent,
              your personal ID, and a credit/debit card for filing fees.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {steps.map((step) => (
              <ChecklistStep
                key={step.id}
                step={step}
                completed={completedSteps.includes(step.id)}
                onToggle={() => handleToggle(step.id)}
                disabled={false}
                pending={pending}
              />
            ))}
          </div>

          {/* Reset */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleReset}
              className="rounded-lg px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              Reset progress
            </button>
          </div>

          {/* Cost summary */}
          <div className="mt-8 rounded-xl border bg-gray-50 p-5">
            <h2 className="font-medium text-gray-900">Cost Summary</h2>
            <div className="mt-3 space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Articles of Organization (one-time)</span>
                <span>$70</span>
              </div>
              <div className="flex justify-between">
                <span>Statement of Information (every 2 years)</span>
                <span>$20</span>
              </div>
              <div className="flex justify-between">
                <span>CA Franchise Tax (annual minimum)</span>
                <span>$800</span>
              </div>
              <div className="flex justify-between">
                <span>EIN</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-medium">
                <span>First year estimate</span>
                <span>~$890+</span>
              </div>
            </div>
            <p className="mt-3 text-xs text-gray-500">
              Plus optional costs: registered agent service, legal consultation,
              local business license.
            </p>
          </div>
        </>
      ) : (
        <LockedChecklist />
      )}

      {/* Footer nav */}
      <div className="mt-10 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/learn/llc-basics"
          className="rounded-lg border px-4 py-2.5 text-center text-sm font-medium text-gray-700 hover:border-gray-300 active:bg-gray-50"
        >
          ← LLC Basics
        </Link>
        <Link
          href="/learn"
          className="rounded-lg bg-black px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-800 active:bg-gray-900"
        >
          Back to Learn
        </Link>
      </div>
    </div>
  );
}
