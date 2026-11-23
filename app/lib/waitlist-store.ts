import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type Signup = { email: string; source?: string; role?: string };

/**
 * Where waitlist sign-ups are stored.
 *
 * - With RESEND_API_KEY set: the person is added as a Resend contact and put in the
 *   segment RESEND_SEGMENT_ID (your waitlist list). `source` and `role` are saved as
 *   contact properties, which must exist in Resend first (see README).
 * - Without it (local development only): appended to data/waitlist.json.
 */
export async function upsertSignup(entry: Signup): Promise<void> {
  if (process.env.RESEND_API_KEY) return saveToResend(entry);
  if (process.env.NODE_ENV === "production") {
    throw new Error("RESEND_API_KEY is not set. Sign-ups have nowhere to go in production.");
  }
  return saveToLocalFile(entry);
}

/* ---------------- Resend ---------------- */

const API = "https://api.resend.com";

async function resend(method: string, pathname: string, body?: unknown): Promise<Response> {
  const send = () =>
    fetch(`${API}${pathname}`, {
      method,
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        // Resend rejects requests without a User-Agent (403).
        "User-Agent": "invoicedodo-waitlist/1.0",
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: "no-store",
    });

  let res = await send();
  if (res.status === 429) {
    // Default limit is 10 requests/second per team. Wait once and retry.
    const wait = Math.min(Number(res.headers.get("retry-after")) || 1, 5);
    await new Promise((r) => setTimeout(r, wait * 1000));
    res = await send();
  }
  return res;
}

async function fail(res: Response, what: string): Promise<never> {
  throw new Error(`Resend ${what} failed: ${res.status} ${await res.text()}`);
}

async function saveToResend({ email, source, role }: Signup) {
  const segmentId = process.env.RESEND_SEGMENT_ID;
  const enc = encodeURIComponent(email);

  // Role-only update (the follow-up question after signup).
  if (role && !source) {
    const res = await resend("PATCH", `/contacts/${enc}`, { properties: { role } });
    if (!res.ok) await fail(res, "role update");
    return;
  }

  // 1. Create the contact, already in the waitlist segment.
  const created = await resend("POST", "/contacts", {
    email,
    unsubscribed: false,
    ...(segmentId ? { segments: [{ id: segmentId }] } : {}),
  });

  if (!created.ok) {
    // Auth, rate-limit and server errors are real failures.
    if (created.status === 401 || created.status === 403 || created.status === 429 || created.status >= 500) {
      await fail(created, "create contact");
    }
    // Otherwise the contact most likely exists already (Resend doesn't document the
    // duplicate response). Make sure they're in the waitlist segment and carry on.
    if (segmentId) {
      const added = await resend("POST", `/contacts/${enc}/segments/${segmentId}`);
      if (!added.ok) await fail(added, "add to segment");
    } else {
      await fail(created, "create contact");
    }
  }

  // 2. Record where they first signed up (new contacts only). Not critical: if the
  //    property isn't set up yet, log it and keep the signup.
  if (source && created.ok) {
    const res = await resend("PATCH", `/contacts/${enc}`, { properties: { source } });
    if (!res.ok) console.warn("[waitlist] could not save source property:", res.status, await res.text());
  }
}

/* ---------------- Local file (dev only) ---------------- */

async function saveToLocalFile(entry: Signup) {
  const dir = path.join(process.cwd(), "data");
  const file = path.join(dir, "waitlist.json");
  await mkdir(dir, { recursive: true });

  let list: (Signup & { at: string })[] = [];
  try {
    list = JSON.parse(await readFile(file, "utf8"));
  } catch {
    list = [];
  }

  const existing = list.find((e) => e.email === entry.email);
  if (existing) {
    if (entry.role) existing.role = entry.role;
    if (entry.source && !existing.source) existing.source = entry.source;
  } else {
    list.push({ ...entry, at: new Date().toISOString() });
  }
  await writeFile(file, JSON.stringify(list, null, 2));
}
