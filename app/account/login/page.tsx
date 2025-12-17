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
      if (res.devCode) {
        setDevCode(res.devCode);
        // Don't redirect yet - let user see the code
      }
    });
  }

  function goToVerify() {
    router.push(`/account/verify?email=${encodeURIComponent(email)}`);
  }

  return (
    <div className="max-w-md rounded-2xl border bg-white p-8">
      <h1 className="text-2xl font-semibold tracking-tight">Log in</h1>
      <p className="mt-2 text-sm text-gray-700">
        Enter your email. We will generate a one-time code.
      </p>

      {!devCode ? (
        <>
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
            {pending ? "Sending..." : "Send code"}
          </button>
        </>
      ) : (
        <div className="mt-6">
          <div className="rounded-lg border bg-amber-50 border-amber-200 p-4">
            <div className="text-sm font-medium text-amber-800">Your login code:</div>
            <div className="mt-2 font-mono text-3xl tracking-widest">{devCode}</div>
          </div>
          <button
            className="mt-4 w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white"
            onClick={goToVerify}
          >
            Enter code
          </button>
        </div>
      )}
    </div>
  );
}