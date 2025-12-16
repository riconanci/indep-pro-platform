import { redirect } from "next/navigation";
import { getCurrentUser, isUnlocked } from "@/lib/currentUser";
import Link from "next/link";
import SaveProfileButton from "@/components/SaveProfileButton";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) redirect("/account/login");
  if (!isUnlocked(user)) redirect("/unlock");

  const p = user.profile;

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <p className="mt-2 text-sm text-gray-700">
        Your unlocked home base.
      </p>

      <div className="mt-6 rounded-2xl border bg-white p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold">Business snapshot</div>
            <div className="mt-3 grid gap-2 text-sm text-gray-700">
              <div>Role: {p?.role ?? "Not saved yet"}</div>
              <div>Collection: {p?.collectionMethod ?? "Not saved yet"}</div>
              <div>Structure: {p?.incomeStructure ?? "Not saved yet"}</div>
              <div>Entity: {p?.entityStatus ?? "Not saved yet"}</div>
            </div>
          </div>

          {!p ? (
            <div className="shrink-0">
              <SaveProfileButton />
              <div className="mt-2 text-xs text-gray-600">
                Saves your onboarding answers to your account.
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white"
            href="/tools/income-pipeline"
          >
            View pipeline
          </Link>
          <Link className="rounded-lg border px-4 py-2 text-sm font-medium" href="/onboarding/summary">
            Edit answers
          </Link>
        </div>
      </div>
    </div>
  );
}
