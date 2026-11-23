"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Dodo } from "./Brand";

type Step = {
  status: { label: string; cls: string };
  when: string;
  title: React.ReactNode;
  detail?: React.ReactNode;
  bubble?: React.ReactNode;
};

const STEPS: Step[] = [
  {
    status: { label: "Draft", cls: "s-draft" },
    when: "Mon 9:00",
    title: "Dodo drafted the invoice",
    detail: "From one sentence: “Brand refresh for Acme, $1,140, due in 14 days.”",
  },
  {
    status: { label: "Sent", cls: "s-sent" },
    when: "Mon 9:02",
    title: "Sent to Sam at Acme Studio",
  },
  {
    status: { label: "Viewed", cls: "s-viewed" },
    when: "Mon 11:40",
    title: "Sam opened it",
  },
  {
    status: { label: "Viewed", cls: "s-viewed" },
    when: "Tue 9:00",
    title: "Friendly reminder sent for you",
    bubble: "Hi Sam, a quick note that invoice #1042 for $1,140 is due Friday. You can pay or ask a question here.",
  },
  {
    status: { label: "Promised Dec 15", cls: "s-promised" },
    when: "Tue 10:15",
    title: "Sam picked Dec 15 to pay",
    detail: "Reminders paused until then.",
  },
  {
    status: { label: "Paid", cls: "s-paid" },
    when: "Dec 15",
    title: "Paid. $1,140 is on its way to your bank",
  },
];

const LAST = STEPS.length - 1;

const RM = "(prefers-reduced-motion: reduce)";
function subscribeRM(cb: () => void) {
  const mq = window.matchMedia(RM);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

export function HeroDemo() {
  const [tick, setTick] = useState(0);
  const reduced = useSyncExternalStore(
    subscribeRM,
    () => window.matchMedia(RM).matches,
    () => false,
  );

  useEffect(() => {
    if (reduced) return;
    let current = 0;
    let timer: ReturnType<typeof setTimeout>;
    const next = () => {
      current = current >= LAST ? 0 : current + 1;
      setTick(current);
      timer = setTimeout(next, current === LAST ? 4200 : current === 3 ? 2600 : 1700);
    };
    timer = setTimeout(next, 1400);
    return () => clearTimeout(timer);
  }, [reduced]);

  const step = reduced ? LAST : tick;
  const s = STEPS[step];
  const paid = step === LAST;

  return (
    <div className="demo">
      <p className="sr-only">Example: one invoice going from draft to sent, viewed, reminded, promised and paid in nine days.</p>
      {/* the invoice */}
      <div className={`demo-invoice ${paid ? "is-paid" : ""}`} aria-hidden="true">
        <div className="di-top">
          <div>
            <span className="label">Invoice to</span>
            <b>Acme Studio</b>
          </div>
          <span className="di-num">#1042</span>
        </div>
        <div className="di-amount">$1,140.00</div>
        <div className="di-meta">
          <span>Due Fri, Dec 15</span>
          <span key={s.status.label} className={`status ${s.status.cls} pop`}>
            {s.status.label}
          </span>
        </div>
        <ol className="di-progress" aria-hidden="true">
          {["Sent", "Viewed", "Promised", "Paid"].map((label, i) => {
            const reached = [1, 2, 4, 5][i] <= step;
            return (
              <li key={label} className={reached ? "on" : ""}>
                <span />
                {label}
              </li>
            );
          })}
        </ol>
        {paid && (
          <div className="di-paid">
            <Dodo size={28} className="hop" />
            <span>
              Paid in 9 days. <b>No chasing.</b>
            </span>
          </div>
        )}
      </div>

      {/* the activity feed */}
      <div className="demo-feed" aria-hidden="true">
        <div className="df-head">
          <span>What Dodo did</span>
          {!reduced && <span className="df-live">Live example</span>}
        </div>
        <ol>
          {STEPS.slice(0, step + 1).map((e, i) => (
            <li key={i} className={i === step ? "is-new" : ""}>
              <span className="df-when">{e.when}</span>
              <div>
                <b>{e.title}</b>
                {e.detail && <p>{e.detail}</p>}
                {e.bubble && <p className="df-bubble">{e.bubble}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
