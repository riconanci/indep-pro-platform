"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { verifyLoginCode } from "@/app/actions/authActions";

export default function VerifyPage() {
  const sp = useSearchParams();
  const email = sp.get("email") ?? "";
  const [code, setCode] = useState("");
  const [pending, start] = useTransition();
  const router = useRouter();

  function onVerify() {
    start(async () => {
      const ok = await verifyLoginCode(email, code);
      if (ok) router.push("/dashboard");
    });
  }

  return (
    <div className="max-w-md rounded-2xl border bg-white p-8">
      <h1 className="text-2xl font-semibold tracking-tight">Verify code</h1>
      <p className="mt-2 text-sm text-gray-700">Email: {email}</p>

      <input
        className="mt-6 w-full rounded-lg border px-3 py-2 text-sm"
        placeholder="6-digit code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button
        className="mt-4 w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        onClick={onVerify}
        disabled={pending || code.length < 6}
      >
        {pending ? "Verifying…" : "Verify & continue"}
      </button>
    </div>
  );
}
