"use client";

import { useState, useTransition } from "react";
import { requestLoginCode } from "@/app/actions/authActions";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pending, start] = useTransition();
  const [devCode, setDevCode] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit() {
    start(async () => {
      const res = await requestLoginCode(email);
      setDevCode(res.devCode ?? null);
      router.push(`/account/verify?email=${encodeURIComponent(email)}`);
    });
  }

  return (
    <div className="max-w-md rounded-2xl border bg-white p-8">
      <h1 className="text-2xl font-semibold tracking-tight">Log in</h1>
      <p className="mt-2 text-sm text-gray-700">
        Enter your email. We’ll generate a one-time code (dev-mode shows it on screen).
      </p>

      <input
        className="mt-6 w-full rounded-lg border px-3 py-2 text-sm"
        placeholder="you@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        className="mt-4 w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        onClick={onSubmit}
        disabled={pending || !email.includes("@")}
      >
        {pending ? "Sending…" : "Send code"}
      </button>

      {devCode ? (
        <div className="mt-4 rounded-lg border bg-gray-50 p-3 text-xs text-gray-800">
          <div className="font-medium">Dev code (temporary):</div>
          <div className="mt-1 font-mono text-lg">{devCode}</div>
        </div>
      ) : null}
    </div>
  );
}
