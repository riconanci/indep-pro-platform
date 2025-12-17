"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { trackUsage } from "@/app/actions/trackUsage";

type UserState = {
  unlocked: boolean;
};

type TemplateInfo = {
  slug: string;
  title: string;
  description: string;
  columns: string[];
  purpose: string;
};

const templates: TemplateInfo[] = [
  {
    slug: "expense-tracker",
    title: "Expense Tracker",
    description:
      "Track business expenses throughout the year. Categorize spending for easier tax preparation.",
    columns: ["Date", "Category", "Description", "Amount", "Payment Method"],
    purpose:
      "Use this to record every business expense as it happens. At tax time, you will have a clear record of deductible expenses.",
  },
  {
    slug: "income-log",
    title: "Income Log",
    description:
      "Record client payments and income sources. Track how much you earn and where it comes from.",
    columns: [
      "Date",
      "Client (optional)",
      "Service",
      "Amount",
      "Collection Method",
    ],
    purpose:
      "Track all income from your services. This helps you understand your revenue patterns and prepares you for quarterly estimates.",
  },
];

function TemplateCard({
  template,
  unlocked,
  onDownload,
  downloading,
}: {
  template: TemplateInfo;
  unlocked: boolean;
  onDownload: (slug: string) => void;
  downloading: string | null;
}) {
  const isDownloading = downloading === template.slug;

  return (
    <div className="rounded-2xl border bg-white">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold text-gray-900">{template.title}</h3>
            <p className="mt-1 text-sm text-gray-600">{template.description}</p>
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          </div>
        </div>

        {/* Columns preview */}
        <div className="mt-4">
          <div className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Columns
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {template.columns.map((col) => (
              <span
                key={col}
                className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
              >
                {col}
              </span>
            ))}
          </div>
        </div>

        {/* Purpose */}
        <div className="mt-4 rounded-lg bg-gray-50 p-3">
          <p className="text-xs text-gray-600">{template.purpose}</p>
        </div>
      </div>

      {/* Download section */}
      <div className="border-t bg-gray-50 px-5 py-4">
        {unlocked ? (
          <button
            onClick={() => onDownload(template.slug)}
            disabled={isDownloading}
            className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 active:bg-gray-900 disabled:opacity-50"
          >
            {isDownloading ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Downloading...
              </>
            ) : (
              <>
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
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download CSV
              </>
            )}
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              <Link href="/unlock" className="font-medium text-black underline">
                Unlock
              </Link>{" "}
              to download
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  const [userState, setUserState] = useState<UserState>({ unlocked: false });
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/me", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setUserState({
            unlocked: data.user?.unlocked ?? false,
          });
        }
      } catch {
        // Remain locked
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  async function handleDownload(slug: string) {
    setDownloading(slug);

    try {
      const res = await fetch(`/api/templates/${slug}`);

      if (!res.ok) {
        const error = await res.json();
        alert(error.error || "Download failed");
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${slug}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      startTransition(() => {
        trackUsage("template_downloaded", slug);
      });
    } catch {
      alert("Download failed. Please try again.");
    } finally {
      setDownloading(null);
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4">
        <div className="animate-pulse">
          <div className="h-8 w-48 rounded bg-gray-200" />
          <div className="mt-6 space-y-4">
            <div className="h-64 rounded-2xl bg-gray-100" />
            <div className="h-64 rounded-2xl bg-gray-100" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4">
      <div className="mb-6">
        <Link
          href="/dashboard"
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
          Dashboard
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Templates</h1>
        <p className="mt-2 text-sm text-gray-700">
          Simple spreadsheet templates to help you track income and expenses.
          Download as CSV and open in Excel, Google Sheets, or any spreadsheet
          app.
        </p>
      </div>

      <div className="space-y-4">
        {templates.map((template) => (
          <TemplateCard
            key={template.slug}
            template={template}
            unlocked={userState.unlocked}
            onDownload={handleDownload}
            downloading={downloading}
          />
        ))}
      </div>

      {/* Usage tips */}
      <div className="mt-8 rounded-xl border bg-gray-50 p-5">
        <h2 className="text-sm font-semibold text-gray-900">Tips for success</h2>
        <ul className="mt-3 space-y-2 text-sm text-gray-600">
          <li className="flex gap-2">
            <span className="text-gray-400">•</span>
            Update your tracker weekly — do not wait until tax time
          </li>
          <li className="flex gap-2">
            <span className="text-gray-400">•</span>
            Keep receipts for expenses over $75 (IRS requirement)
          </li>
          <li className="flex gap-2">
            <span className="text-gray-400">•</span>
            Separate business and personal expenses in different accounts
          </li>
          <li className="flex gap-2">
            <span className="text-gray-400">•</span>
            Review your income log monthly to spot trends
          </li>
        </ul>
      </div>
    </div>
  );
}
