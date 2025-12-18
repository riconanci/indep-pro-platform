"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getChecklistProgress } from "@/app/actions/checklistActions";

type Props = {
  title: string;
  description: string;
  href: string;
  unlocked: boolean;
  checklistSlug: "ca-llc-setup";
  totalSteps: number;
};

export function ChecklistCard({
  title,
  description,
  href,
  unlocked,
  checklistSlug,
  totalSteps,
}: Props) {
  const [completedCount, setCompletedCount] = useState<number | null>(null);

  useEffect(() => {
    if (!unlocked) return;

    async function loadProgress() {
      try {
        const progress = await getChecklistProgress(checklistSlug);
        setCompletedCount(progress.length);
      } catch {
        setCompletedCount(0);
      }
    }
    loadProgress();
  }, [unlocked, checklistSlug]);

  return (
    <Link
      href={href}
      className="group rounded-xl border bg-white p-5 transition hover:border-gray-300 hover:shadow-sm active:bg-gray-50"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900 group-hover:text-black">
              {title}
            </h3>
            {/* Progress badge */}
            {unlocked && completedCount !== null ? (
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  completedCount === totalSteps
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {completedCount}/{totalSteps}
              </span>
            ) : !unlocked ? (
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
                Locked
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        </div>
        <div className="flex-shrink-0">
          {!unlocked ? (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
              <svg
                className="h-4 w-4 text-gray-500"
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
          ) : completedCount === totalSteps ? (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50">
              <svg
                className="h-4 w-4 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50">
              <svg
                className="h-4 w-4 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Status indicator */}
      <div className="mt-3 flex items-center gap-2 text-xs">
        {!unlocked ? (
          <>
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-600">
              Free preview
            </span>
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-500">
              Full checklist locked
            </span>
          </>
        ) : completedCount === totalSteps ? (
          <span className="rounded-full bg-green-50 px-2 py-0.5 text-green-700">
            Complete ✓
          </span>
        ) : completedCount !== null && completedCount > 0 ? (
          <span className="rounded-full bg-blue-50 px-2 py-0.5 text-blue-700">
            In progress
          </span>
        ) : (
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-600">
            Not started
          </span>
        )}
      </div>
    </Link>
  );
}
