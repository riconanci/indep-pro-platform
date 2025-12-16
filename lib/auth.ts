import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "ipp_session";

function hmac(input: string) {
  const secret = process.env.AUTH_SECRET!;
  return crypto.createHmac("sha256", secret).update(input).digest("hex");
}

export async function setSession(userId: string) {
  const payload = `${userId}.${Date.now()}`;
  const sig = hmac(payload);
  const token = `${payload}.${sig}`;

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
}

export async function getSessionUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [userId, ts, sig] = parts;
  const payload = `${userId}.${ts}`;
  if (hmac(payload) !== sig) return null;

  return userId;
}