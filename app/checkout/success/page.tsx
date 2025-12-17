import Stripe from "stripe";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;
  if (!sessionId) redirect("/unlock");

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  const email = (session.customer_details?.email || session.customer_email)?.toLowerCase();

  if (!email) {
    return (
      <div className="max-w-xl rounded-2xl border bg-white p-8">
        Missing customer email on session.
      </div>
    );
  }

  const user = await db.user.upsert({
    where: { email },
    update: {},
    create: { email },
  });

  await db.entitlement.upsert({
    where: { userId: user.id },
    update: {
      status: "active",
      stripeSessionId: session.id,
      purchasedAt: new Date(),
    },
    create: {
      userId: user.id,
      status: "active",
      stripeSessionId: session.id,
      purchasedAt: new Date(),
    },
  });

  return (
    <div className="max-w-xl rounded-2xl border bg-white p-8">
      <h1 className="text-2xl font-semibold tracking-tight">You are unlocked!</h1>
      <p className="mt-3 text-gray-700">
        Your account is ready. Log in with <strong>{email}</strong> to access your dashboard.
      </p>
      <a
        href="/account/login"
        className="mt-6 inline-block rounded-lg bg-black px-5 py-3 text-sm font-medium text-white"
      >
        Log in
      </a>
    </div>
  );
}
