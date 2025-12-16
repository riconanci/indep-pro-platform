"use server";

import crypto from "crypto";
import { db } from "@/lib/db";
import { setSession } from "@/lib/auth";

function hash(code: string) {
  return crypto.createHash("sha256").update(code).digest("hex");
}

function randomCode() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
}

export async function requestLoginCode(emailRaw: string) {
  const email = emailRaw.trim().toLowerCase();
  const code = randomCode();
  const codeHash = hash(code);
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

  // ensure user exists (non-destructive)
  await db.user.upsert({
    where: { email },
    update: {},
    create: { email },
  });

  await db.loginCode.create({
    data: { email, codeHash, expiresAt },
  });

  // DEV ONLY: return the code so you can test without email provider
  return { ok: true, devCode: code };
}

export async function verifyLoginCode(emailRaw: string, codeRaw: string) {
  const email = emailRaw.trim().toLowerCase();
  const code = codeRaw.trim();

  const latest = await db.loginCode.findFirst({
    where: { email },
    orderBy: { createdAt: "desc" },
  });

  if (!latest) return false;
  if (latest.expiresAt.getTime() < Date.now()) return false;
  if (latest.codeHash !== hash(code)) return false;

  const user = await db.user.findUnique({ where: { email } });
  if (!user) return false;

  setSession(user.id);
  return true;
}
