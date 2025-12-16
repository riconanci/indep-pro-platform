import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/currentUser";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({
    user: {
      unlocked: !!user.entitlement && user.entitlement.status === "ACTIVE",
      profile: user.profile ?? null,
    },
  });
}
