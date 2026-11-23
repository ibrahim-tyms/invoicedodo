"use server";

import { upsertSignup } from "./lib/waitlist-store";

export type WaitlistState = {
  status: "idle" | "success" | "error";
  message?: string;
  email?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ROLES = ["Freelancer", "Agency or studio", "Small business", "Something else"] as const;

export async function joinWaitlist(
  _prev: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  // Honeypot: bots fill every field. Pretend it worked.
  if (String(formData.get("company") ?? "").trim() !== "") {
    return { status: "success" };
  }

  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const source = String(formData.get("source") ?? "").slice(0, 40);

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return { status: "error", message: "That email doesn't look right. Mind checking it?", email };
  }

  try {
    await upsertSignup({ email, source });
    return { status: "success", email };
  } catch (err) {
    console.error("[waitlist]", err);
    return {
      status: "error",
      message: "Something went wrong on our side. Please try again in a moment.",
      email,
    };
  }
}

/** Optional follow-up after signup: what kind of work they do. */
export async function saveRole(email: string, role: string): Promise<boolean> {
  const clean = email.trim().toLowerCase();
  if (!EMAIL_RE.test(clean) || !ROLES.includes(role as (typeof ROLES)[number])) return false;
  try {
    await upsertSignup({ email: clean, role });
    return true;
  } catch (err) {
    console.error("[waitlist:role]", err);
    return false;
  }
}
