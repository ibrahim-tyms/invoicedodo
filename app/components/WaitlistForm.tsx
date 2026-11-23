"use client";

import { useActionState, useId, useState, useTransition } from "react";
import { joinWaitlist, saveRole, type WaitlistState } from "../actions";
import { Dodo } from "./Brand";

const initial: WaitlistState = { status: "idle" };
const ROLES = ["Freelancer", "Agency or studio", "Small business", "Something else"];

function Done({ email }: { email?: string }) {
  const [role, setRole] = useState<string | null>(null);
  const [pending, start] = useTransition();

  return (
    <div className="wl-done" role="status" aria-live="polite">
      <Dodo size={36} className="wl-done-dodo" />
      <div>
        <strong>You&rsquo;re on the list.</strong>
        <p>We&rsquo;ll email you when your invite is ready. No spam, and no chasing. Obviously.</p>
        {email && !role && (
          <div className="wl-role">
            <span>One quick question: what best describes you?</span>
            <div className="wl-role-opts">
              {ROLES.map((r) => (
                <button
                  key={r}
                  type="button"
                  disabled={pending}
                  onClick={() =>
                    start(async () => {
                      await saveRole(email, r);
                      setRole(r);
                    })
                  }
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        )}
        {role && <p className="wl-thanks">Thanks. That helps us build the right thing first.</p>}
      </div>
    </div>
  );
}

export function WaitlistForm({ source }: { source: string }) {
  const [state, action, pending] = useActionState(joinWaitlist, initial);
  const id = useId();

  if (state.status === "success") return <Done email={state.email} />;

  return (
    <form action={action} className="wl" noValidate>
      <div className="wl-row">
        <label htmlFor={`${id}-email`} className="sr-only">
          Email address
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@yourbusiness.com"
          defaultValue={state.email}
          required
          aria-invalid={state.status === "error" || undefined}
          aria-describedby={`${id}-msg`}
        />
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? "Saving your spot…" : "Get early access"}
        </button>
      </div>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      <input type="hidden" name="source" value={source} />
      <p
        id={`${id}-msg`}
        className={`wl-msg ${state.status === "error" ? "is-error" : ""}`}
        aria-live="polite"
      >
        {state.status === "error"
          ? state.message
          : (
            <>
              No spam. Unsubscribe anytime. <a href="/privacy">Privacy</a>
            </>
          )}
      </p>
    </form>
  );
}
