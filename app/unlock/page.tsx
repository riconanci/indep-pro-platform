"use client";

import { useTransition } from "react";
import { createCheckoutSession } from "@/app/actions/createCheckoutSession";

export default function UnlockPage() {
  const [pending, start] = useTransition();

  async function handleUnlock() {
    start(async () => {
      const url = await createCheckoutSession();
      if (url) window.location.href = url;
    });
  }

  return (
    <div className="rounded-2xl border bg-white p-8 max-w-xl">
      <h1 className="text-2xl font-semibold tracking-tight">
        Unlock your business setup
      </h1>

      <p className="mt-3 text-gray-700">
        One-time unlock for calculators, templates, and your dashboard.
      </p>

      <div className="mt-6">
        <div className="text-3xl font-semibold">$59.99</div>
        <div className="text-sm text-gray-600">One-time. No subscription.</div>
      </div>

      <button
        onClick={handleUnlock}
        disabled={pending}
        className="mt-6 rounded-lg bg-black px-5 py-3 text-sm font-medium text-white disabled:opacity-50"
      >
        {pending ? "Redirecting…" : "Unlock"}
      </button>

      <div className="mt-6 text-xs text-gray-600">
        Educational tools only. No legal or tax advice.
      </div>
    </div>
  );
}
