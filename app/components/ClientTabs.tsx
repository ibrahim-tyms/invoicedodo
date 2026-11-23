"use client";

import { useId, useState } from "react";
import { Stage } from "./Frame";

const TABS = [
  {
    key: "pay",
    title: "Pay in one tap",
    body: "Card or bank transfer. No account, no login, no hunting for your bank details.",
  },
  {
    key: "date",
    title: "Promise a pay date",
    body: "Not ready today? They pick a date. You see it, and reminders pause until then.",
  },
  {
    key: "finance",
    title: "Send to finance",
    body: "Invoice, W-9 and PO number go to their accounts team together, so nothing gets stuck.",
  },
  {
    key: "ask",
    title: "Ask a question",
    body: "Questions land with you, attached to the invoice, not lost in an email thread.",
  },
] as const;

type Key = (typeof TABS)[number]["key"];

export function ClientTabs() {
  const [active, setActive] = useState<Key>("pay");
  const id = useId();

  return (
    <div className="split split-rev">
      <Stage>
        <div className="sheet client" id={`${id}-panel`} role="tabpanel" aria-live="polite">
          <div className="client-head">
            <div>
              <span className="label">Invoice from</span>
              <b>Rivera Design Co.</b>
            </div>
            <span className="di-num">#1042</span>
          </div>
          <div className="client-total">
            <span className="amount-lg">$1,140.00</span>
            <span className="status s-promised">Due Fri, Dec 15</span>
          </div>

          <div className="client-view" key={active}>
            {active === "pay" && (
              <div className="cv">
                <div className="mock-btn">Pay $1,140.00</div>
                <div className="pay-methods">
                  <span>Card</span>
                  <span>Bank transfer</span>
                </div>
              </div>
            )}
            {active === "date" && (
              <div className="cv">
                <span className="label">I&rsquo;ll pay on</span>
                <div className="date-row">
                  {["12", "13", "14", "15", "16"].map((d) => (
                    <span key={d} className={d === "15" ? "on" : ""}>
                      <small>Dec</small>
                      {d}
                    </span>
                  ))}
                </div>
                <p className="cv-note">Rivera Design Co. will see your promise.</p>
              </div>
            )}
            {active === "finance" && (
              <div className="cv">
                <span className="label">Forward to</span>
                <div className="mock-input">ap@acme.studio</div>
                <div className="files">
                  <span>Invoice-1042.pdf</span>
                  <span>W-9.pdf</span>
                  <span>PO 4471</span>
                </div>
              </div>
            )}
            {active === "ask" && (
              <div className="cv chat">
                <p className="msg them">Can we pay by bank transfer instead of card?</p>
                <p className="msg you">Of course. Bank details are on the invoice, and there&rsquo;s no fee for you.</p>
              </div>
            )}
          </div>
        </div>
      </Stage>

      <div className="split-text">
        <div className="tabs" role="tablist" aria-label="What your client can do" aria-orientation="vertical">
          {TABS.map((t) => {
            const on = t.key === active;
            return (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls={`${id}-panel`}
                className={`tab ${on ? "on" : ""}`}
                onClick={() => setActive(t.key)}
              >
                <span className="tab-title">{t.title}</span>
                <span className="tab-body">{t.body}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
