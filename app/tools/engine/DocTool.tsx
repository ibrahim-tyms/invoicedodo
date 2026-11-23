"use client";

import { useEffect, useRef, useState } from "react";
import {
  ACCENTS,
  CURRENCIES,
  MODES,
  PAYMENT_METHODS,
  TERMS,
  addDays,
  money,
  newDoc,
  nextNumber,
  prettyDate,
  termsLabel,
  totals,
  uid,
  type Doc,
  type DocMode,
  type LineItem,
  type Party,
  type Preset,
} from "./model";

const STORE = (mode: DocMode) => `idodo:tool:${mode}:v1`;
const PROFILE = "idodo:tool:profile:v1"; // your business details + logo, shared across tools

function load<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}
function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or blocked: the tool still works, it just won't remember */
  }
}

export function DocTool({ mode, preset, presetKey }: { mode: DocMode; preset?: Preset; presetKey?: string }) {
  const cfg = MODES[mode];
  const storeKey = presetKey ? `${STORE(mode)}:${presetKey}` : STORE(mode);
  const [doc, setDoc] = useState<Doc>(() => newDoc(mode, preset, ""));
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Restore the draft and saved business details after hydration.
  useEffect(() => {
    const draft = load<Doc>(storeKey);
    const profile = load<{ from: Party; logo: string | null; accent: string }>(PROFILE);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time restore from localStorage after hydration
    setDoc((d) => {
      if (draft && draft.mode === mode) return { ...d, ...draft };
      const fresh = newDoc(mode, preset); // today's dates, set in the browser
      return profile ? { ...fresh, from: profile.from, logo: profile.logo, accent: profile.accent ?? fresh.accent } : fresh;
    });
    setReady(true);
  }, [mode, storeKey, preset]);

  useEffect(() => {
    if (!ready) return;
    const id = setTimeout(() => {
      save(storeKey, doc);
      save(PROFILE, { from: doc.from, logo: doc.logo, accent: doc.accent });
    }, 300);
    return () => clearTimeout(id);
  }, [doc, ready, storeKey]);

  const set = <K extends keyof Doc>(k: K, v: Doc[K]) => setDoc((d) => ({ ...d, [k]: v }));
  const setParty = (who: "from" | "to", k: keyof Party, v: string) => setDoc((d) => ({ ...d, [who]: { ...d[who], [k]: v } }));
  const setItem = (id: string, patch: Partial<LineItem>) =>
    setDoc((d) => ({ ...d, items: d.items.map((it) => (it.id === id ? { ...it, ...patch } : it)) }));
  const addItem = () => setDoc((d) => ({ ...d, items: [...d.items, { id: uid(), description: "", qty: 1, rate: 0 }] }));
  const removeItem = (id: string) => setDoc((d) => ({ ...d, items: d.items.length > 1 ? d.items.filter((it) => it.id !== id) : d.items }));

  const setIssue = (iso: string) =>
    setDoc((d) => {
      const days = TERMS.find((t) => t.value === d.terms)?.days;
      return { ...d, issueDate: iso, dueDate: d.mode === "invoice" && days != null && iso ? addDays(iso, days) : d.dueDate };
    });
  const setTerms = (value: string) =>
    setDoc((d) => {
      const days = TERMS.find((t) => t.value === value)?.days;
      return { ...d, terms: value, dueDate: days != null && d.issueDate ? addDays(d.issueDate, days) : d.dueDate };
    });

  const onLogo = (file: File | undefined) => {
    setError(null);
    if (!file) return;
    if (!/^image\/(png|jpeg)$/.test(file.type)) return setError("Use a PNG or JPG logo.");
    if (file.size > 1_000_000) return setError("Logo must be under 1 MB.");
    const reader = new FileReader();
    reader.onload = () => set("logo", String(reader.result));
    reader.readAsDataURL(file);
  };

  const download = async () => {
    setBusy(true);
    setError(null);
    try {
      const { downloadPdf } = await import("./pdf");
      await downloadPdf(doc);
    } catch {
      setError("Couldn't create the PDF. Try again, or use Print and choose “Save as PDF”.");
    } finally {
      setBusy(false);
    }
  };

  const startNext = () =>
    setDoc((d) => ({
      ...newDoc(mode, preset),
      from: d.from,
      logo: d.logo,
      accent: d.accent,
      currency: d.currency,
      paymentInstructions: d.paymentInstructions,
      taxRate: d.taxRate,
      number: nextNumber(d.number),
    }));

  const t = totals(doc);
  const fmt = (n: number) => money(n, doc.currency);
  const toLabel = mode === "receipt" ? "Received from" : mode === "estimate" ? "Prepared for" : "Bill to";

  return (
    <div className="tool" data-mode={mode}>
      <form className="tool-form" onSubmit={(e) => e.preventDefault()} aria-label={`${cfg.title} details`}>
        <fieldset className="tool-card">
          <legend>Document</legend>
          <div className="tool-grid">
            <Field label="Title">
              <input value={doc.title} onChange={(e) => set("title", e.target.value)} />
            </Field>
            <Field label="Number">
              <input value={doc.number} onChange={(e) => set("number", e.target.value)} />
            </Field>
            <Field label={cfg.issueLabel}>
              <input type="date" value={doc.issueDate} onChange={(e) => setIssue(e.target.value)} />
            </Field>
            {cfg.showTerms && (
              <Field label="Payment terms">
                <select value={doc.terms} onChange={(e) => setTerms(e.target.value)}>
                  {TERMS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </Field>
            )}
            {cfg.dueLabel && (
              <Field label={cfg.dueLabel}>
                <input
                  type="date"
                  value={doc.dueDate}
                  onChange={(e) => setDoc((d) => ({ ...d, dueDate: e.target.value, terms: d.mode === "invoice" ? "custom" : d.terms }))}
                />
              </Field>
            )}
            {cfg.showPaymentMethod && (
              <Field label="Payment method">
                <select value={doc.paymentMethod} onChange={(e) => set("paymentMethod", e.target.value)}>
                  {PAYMENT_METHODS.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </Field>
            )}
            <Field label="PO number" hint="Optional. Many business clients won't pay without it.">
              <input value={doc.po} onChange={(e) => set("po", e.target.value)} placeholder="e.g. PO-4821" />
            </Field>
            <Field label="Currency">
              <select value={doc.currency} onChange={(e) => set("currency", e.target.value)}>
                {CURRENCIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
          </div>
        </fieldset>

        <fieldset className="tool-card">
          <legend>Your business</legend>
          <PartyFields p={doc.from} onChange={(k, v) => setParty("from", k, v)} namePh="Your name or business name" />
          <div className="tool-logo">
            {doc.logo ? (
              // eslint-disable-next-line @next/next/no-img-element -- user-uploaded data URL
              <img src={doc.logo} alt="Your logo" />
            ) : (
              <span className="tool-logo-empty">No logo</span>
            )}
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => fileRef.current?.click()}>
              {doc.logo ? "Change logo" : "Add logo"}
            </button>
            {doc.logo && (
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => set("logo", null)}>
                Remove
              </button>
            )}
            <input ref={fileRef} type="file" accept="image/png,image/jpeg" hidden onChange={(e) => onLogo(e.target.files?.[0])} />
          </div>
          <div className="tool-accents" role="radiogroup" aria-label="Accent colour">
            {ACCENTS.map((c) => (
              <button
                key={c}
                type="button"
                role="radio"
                aria-checked={doc.accent === c}
                aria-label={`Accent ${c}`}
                style={{ background: c }}
                onClick={() => set("accent", c)}
              />
            ))}
          </div>
        </fieldset>

        <fieldset className="tool-card">
          <legend>{toLabel}</legend>
          <PartyFields p={doc.to} onChange={(k, v) => setParty("to", k, v)} namePh="Client or company name" />
        </fieldset>

        <fieldset className="tool-card">
          <legend>Items</legend>
          <div className="tool-items">
            <div className="tool-items-head" aria-hidden="true">
              <span>Description</span>
              <span>Qty</span>
              <span>Rate</span>
              <span>Amount</span>
              <span />
            </div>
            {doc.items.map((it, i) => (
              <div className="tool-item" key={it.id}>
                <textarea
                  rows={1}
                  aria-label={`Item ${i + 1} description`}
                  value={it.description}
                  placeholder="Service or product"
                  onChange={(e) => setItem(it.id, { description: e.target.value })}
                />
                <NumInput
                  aria-label={`Item ${i + 1} quantity`}
                  value={it.qty}
                  onValue={(n) => setItem(it.id, { qty: n })}
                />
                <NumInput
                  aria-label={`Item ${i + 1} rate`}
                  value={it.rate}
                  onValue={(n) => setItem(it.id, { rate: n })}
                />
                <output>{fmt((it.qty || 0) * (it.rate || 0))}</output>
                <button type="button" className="tool-x" aria-label={`Remove item ${i + 1}`} onClick={() => removeItem(it.id)}>
                  ×
                </button>
              </div>
            ))}
            <button type="button" className="btn btn-ghost btn-sm" onClick={addItem}>
              + Add item
            </button>
          </div>
          <div className="tool-grid tool-grid-4">
            <Field label="Tax rate (%)" hint="Your state + local sales tax, if it applies.">
              <NumInput value={doc.taxRate} onValue={(n) => set("taxRate", n)} />
            </Field>
            <Field label="Discount">
              <NumInput value={doc.discount} onValue={(n) => set("discount", n)} />
            </Field>
            <Field label="Shipping">
              <NumInput value={doc.shipping} onValue={(n) => set("shipping", n)} />
            </Field>
            {cfg.showPaid && (
              <Field label="Already paid">
                <NumInput value={doc.amountPaid} onValue={(n) => set("amountPaid", n)} />
              </Field>
            )}
          </div>
        </fieldset>

        <fieldset className="tool-card">
          <legend>Notes</legend>
          {cfg.showInstructions && (
            <Field label="How to pay" hint="ACH details, Zelle email, Venmo handle, or a card payment link.">
              <textarea
                rows={3}
                value={doc.paymentInstructions}
                placeholder={"Zelle: billing@yourbusiness.com\nACH: Bank name, routing and account number"}
                onChange={(e) => set("paymentInstructions", e.target.value)}
              />
            </Field>
          )}
          <Field label="Notes">
            <textarea rows={3} value={doc.notes} placeholder={cfg.notesPlaceholder} onChange={(e) => set("notes", e.target.value)} />
          </Field>
        </fieldset>
      </form>

      <aside className="tool-side" aria-label="Preview and download">
        <div className="tool-actions">
          <button type="button" className="btn btn-primary" onClick={download} disabled={busy}>
            {busy ? "Creating PDF…" : "Download PDF"}
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => window.print()}>
            Print
          </button>
          <button type="button" className="btn btn-ghost" onClick={startNext}>
            New {cfg.title.toLowerCase()}
          </button>
        </div>
        {error && (
          <p className="tool-error" role="alert">
            {error}
          </p>
        )}
        <p className="tool-privacy">Free, no sign-up, no watermark. Your details stay in this browser.</p>

        <article className="sheet" style={{ ["--sheet-accent" as string]: doc.accent }} aria-label={`${cfg.title} preview`}>
          <header className="sheet-top">
            <div className="sheet-logo">
              {/* eslint-disable-next-line @next/next/no-img-element -- user-uploaded data URL */}
              {doc.logo && <img src={doc.logo} alt="" />}
            </div>
            <div className="sheet-meta">
              <h2>{doc.title || cfg.title}</h2>
              <dl>
                {doc.number && (
                  <>
                    <dt>Number</dt>
                    <dd>{doc.number}</dd>
                  </>
                )}
                <dt>{cfg.issueLabel}</dt>
                <dd>{prettyDate(doc.issueDate)}</dd>
                {cfg.showTerms && doc.terms !== "custom" && (
                  <>
                    <dt>Terms</dt>
                    <dd>{termsLabel(doc)}</dd>
                  </>
                )}
                {cfg.dueLabel && doc.dueDate && (
                  <>
                    <dt>{cfg.dueLabel}</dt>
                    <dd>{prettyDate(doc.dueDate)}</dd>
                  </>
                )}
                {doc.po && (
                  <>
                    <dt>PO number</dt>
                    <dd>{doc.po}</dd>
                  </>
                )}
                {cfg.showPaymentMethod && (
                  <>
                    <dt>Paid by</dt>
                    <dd>{doc.paymentMethod}</dd>
                  </>
                )}
              </dl>
            </div>
          </header>

          <div className="sheet-parties">
            <PartyView label="From" p={doc.from} empty="Your business" />
            <PartyView label={toLabel} p={doc.to} empty="Your client" />
          </div>

          <table className="sheet-items">
            <thead>
              <tr>
                <th>Description</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {doc.items.map((it) => (
                <tr key={it.id}>
                  <td>{it.description || <span className="sheet-ph">Item description</span>}</td>
                  <td>{it.qty}</td>
                  <td>{fmt(it.rate || 0)}</td>
                  <td>{fmt((it.qty || 0) * (it.rate || 0))}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <dl className="sheet-totals">
            <dt>Subtotal</dt>
            <dd>{fmt(t.subtotal)}</dd>
            {t.discount > 0 && (
              <>
                <dt>Discount</dt>
                <dd>-{fmt(t.discount)}</dd>
              </>
            )}
            {doc.taxRate > 0 && (
              <>
                <dt>Tax ({doc.taxRate}%)</dt>
                <dd>{fmt(t.tax)}</dd>
              </>
            )}
            {t.shipping > 0 && (
              <>
                <dt>Shipping</dt>
                <dd>{fmt(t.shipping)}</dd>
              </>
            )}
            {cfg.showPaid && t.paid > 0 && (
              <>
                <dt>Total</dt>
                <dd>{fmt(t.total)}</dd>
                <dt>Paid</dt>
                <dd>-{fmt(t.paid)}</dd>
              </>
            )}
            <dt className="sheet-grand">{cfg.totalLabel}</dt>
            <dd className="sheet-grand">{fmt(mode === "receipt" ? t.total : t.due)}</dd>
          </dl>
          {mode === "receipt" && <p className="sheet-stamp">Paid</p>}

          {cfg.showInstructions && doc.paymentInstructions.trim() && (
            <section className="sheet-note">
              <h3>How to pay</h3>
              <p>{doc.paymentInstructions}</p>
            </section>
          )}
          {doc.notes.trim() && (
            <section className="sheet-note">
              <h3>Notes</h3>
              <p>{doc.notes}</p>
            </section>
          )}
          {cfg.showSignature && (
            <div className="sheet-sign">
              <span>Accepted by (signature)</span>
              <span>Date</span>
            </div>
          )}
        </article>
      </aside>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="tool-field">
      <span className="tool-label">{label}</span>
      {children}
      {hint && <span className="tool-hint">{hint}</span>}
    </label>
  );
}

function PartyFields({ p, onChange, namePh }: { p: Party; onChange: (k: keyof Party, v: string) => void; namePh: string }) {
  return (
    <div className="tool-grid">
      <Field label="Name">
        <input value={p.name} placeholder={namePh} autoComplete="organization" onChange={(e) => onChange("name", e.target.value)} />
      </Field>
      <Field label="Email">
        <input type="email" value={p.email} autoComplete="email" onChange={(e) => onChange("email", e.target.value)} />
      </Field>
      <Field label="Phone">
        <input type="tel" value={p.phone} autoComplete="tel" onChange={(e) => onChange("phone", e.target.value)} />
      </Field>
      <Field label="Address">
        <textarea rows={2} value={p.address} autoComplete="street-address" onChange={(e) => onChange("address", e.target.value)} />
      </Field>
    </div>
  );
}

function PartyView({ label, p, empty }: { label: string; p: Party; empty: string }) {
  return (
    <div>
      <h3>{label}</h3>
      {p.name ? <p className="sheet-name">{p.name}</p> : <p className="sheet-ph">{empty}</p>}
      {[p.address, p.email, p.phone].filter(Boolean).map((v, i) => (
        <p key={i}>{v}</p>
      ))}
    </div>
  );
}

const num = (v: string) => {
  const n = parseFloat(v.replace(/[^0-9.\-]/g, ""));
  return Number.isFinite(n) ? n : 0;
};

/** Number field that keeps what you type ("12.", "") while reporting a clean number. */
function NumInput({ value, onValue, ...rest }: { value: number; onValue: (n: number) => void; "aria-label"?: string }) {
  const [text, setText] = useState(value ? String(value) : "");
  useEffect(() => {
    // Sync when the value changes from outside (e.g. "New invoice"), not while typing.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mirror external resets into the text box
    setText((cur) => (num(cur) === value ? cur : value ? String(value) : ""));
  }, [value]);
  return (
    <input
      {...rest}
      inputMode="decimal"
      value={text}
      onChange={(e) => {
        setText(e.target.value);
        onValue(num(e.target.value));
      }}
    />
  );
}
