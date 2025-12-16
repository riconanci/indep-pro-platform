import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "ipp_session";

function hmac(input: string) {
  const secret = process.env.AUTH_SECRET!;
  return crypto.createHmac("sha256", secret).update(input).digest("hex");
}

export function setSession(userId: string) {
  const payload = `${userId}.${Date.now()}`;
  const sig = hmac(payload);
  const token = `${payload}.${sig}`;

  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

export function clearSession() {
  cookies().set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
}

export function getSessionUserId(): string | null {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;

  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [userId, ts, sig] = parts;
  const payload = `${userId}.${ts}`;
  if (hmac(payload) !== sig) return null;

  return userId;
}
