"use client";

import { useEffect, useRef, useState } from "react";
import { CountrySelect, CurrencySelect, Field, InlineToggle, MoneyInput, NumberInput, Select, TextArea, TextInput } from "../../components/fields";
import { countryName, currencySymbol } from "../../lib/locale-data";
import {
  ACCENTS,
  MODES,
  PAYMENT_METHODS,
  TERMS,
  addDays,
  discountLabel,
  emptyParty,
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
      // Older drafts may miss newer fields (country, discountType): merge over fresh defaults.
      if (draft && draft.mode === mode)
        return { ...d, ...draft, from: { ...emptyParty(), ...draft.from }, to: { ...emptyParty(), ...draft.to }, discountType: draft.discountType ?? "flat" };
      const fresh = newDoc(mode, preset); // today's dates, set in the browser
      return profile
        ? { ...fresh, from: { ...emptyParty(), ...profile.from }, logo: profile.logo, accent: profile.accent ?? fresh.accent }
        : fresh;
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
      discountType: d.discountType,
      number: nextNumber(d.number),
    }));

  const t = totals(doc);
  const fmt = (n: number) => money(n, doc.currency);
  const toLabel = mode === "receipt" ? "Received from" : mode === "estimate" ? "Prepared for" : "Bill to";

  return (
    <div className="tool" data-mode={mode}>
      <form className="tool-form" onSubmit={(e) => e.preventDefault()} aria-label={`${cfg.title} details`} noValidate>
        <fieldset className="tool-card">
          <legend>Document</legend>
          <div className="tool-grid">
            <Field label="Title">
              <TextInput value={doc.title} onChange={(e) => set("title", e.target.value)} />
            </Field>
            <Field label="Number">
              <TextInput value={doc.number} onChange={(e) => set("number", e.target.value)} spellCheck={false} />
            </Field>
            <Field label={cfg.issueLabel}>
              <TextInput type="date" value={doc.issueDate} onChange={(e) => setIssue(e.target.value)} />
            </Field>
            {cfg.showTerms && (
              <Field label="Payment terms">
                <Select value={doc.terms} onChange={setTerms} options={TERMS.map((o) => ({ value: o.value, label: o.label }))} />
              </Field>
            )}
            {cfg.dueLabel && (
              <Field label={cfg.dueLabel}>
                <TextInput
                  type="date"
                  value={doc.dueDate}
                  min={doc.issueDate || undefined}
                  onChange={(e) => setDoc((d) => ({ ...d, dueDate: e.target.value, terms: d.mode === "invoice" ? "custom" : d.terms }))}
                />
              </Field>
            )}
            {cfg.showPaymentMethod && (
              <Field label="Payment method">
                <Select
                  value={doc.paymentMethod}
                  onChange={(v) => set("paymentMethod", v)}
                  options={PAYMENT_METHODS.map((m) => ({ value: m, label: m }))}
                  searchable={false}
                />
              </Field>
            )}
            <Field label="Currency">
              <CurrencySelect value={doc.currency} onChange={(v) => set("currency", v)} />
            </Field>
            <Field label="PO number" optional hint="Many business clients won't pay without it.">
              <TextInput value={doc.po} onChange={(e) => set("po", e.target.value)} placeholder="e.g. PO-4821" spellCheck={false} />
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
                <div className="tool-cell tool-cell-desc">
                  <TextArea
                    minRows={1}
                    aria-label={`Item ${i + 1} description`}
                    value={it.description}
                    placeholder="Service or product"
                    onChange={(e) => setItem(it.id, { description: e.target.value })}
                  />
                </div>
                <div className="tool-cell tool-cell-qty">
                  <span className="tool-cell-label" aria-hidden="true">Qty</span>
                  <NumberInput
                    aria-label={`Item ${i + 1} quantity`}
                    value={it.qty}
                    onValue={(n) => setItem(it.id, { qty: n })}
                    decimals={2}
                    align="right"
                    placeholder="0"
                  />
                </div>
                <div className="tool-cell tool-cell-rate">
                  <span className="tool-cell-label" aria-hidden="true">Rate</span>
                  <MoneyInput aria-label={`Item ${i + 1} rate`} currency={doc.currency} value={it.rate} onValue={(n) => setItem(it.id, { rate: n })} />
                </div>
                <div className="tool-cell tool-cell-amt">
                  <span className="tool-cell-label" aria-hidden="true">Amount</span>
                  <output aria-label={`Item ${i + 1} amount`}>{fmt((it.qty || 0) * (it.rate || 0))}</output>
                </div>
                <button
                  type="button"
                  className="tool-x"
                  aria-label={`Remove item ${i + 1}`}
                  title="Remove item"
                  disabled={doc.items.length < 2}
                  onClick={() => removeItem(it.id)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            ))}
            <button type="button" className="btn btn-ghost btn-sm" onClick={addItem}>
              + Add item
            </button>
          </div>
          <div className="tool-grid tool-adjust">
            <Field label="Tax rate" hint="Your state + local sales tax, if it applies.">
              <NumberInput value={doc.taxRate} onValue={(n) => set("taxRate", n)} decimals={3} max={100} step={0.25} suffix="%" align="right" placeholder="0" />
            </Field>
            <Field label="Discount">
              {doc.discountType === "percent" ? (
                <NumberInput
                  value={doc.discount}
                  onValue={(n) => set("discount", n)}
                  decimals={2}
                  max={100}
                  align="right"
                  placeholder="0"
                  suffix={<DiscountToggle doc={doc} onChange={(v) => setDoc((d) => ({ ...d, discountType: v, discount: 0 }))} />}
                />
              ) : (
                <MoneyInput
                  currency={doc.currency}
                  value={doc.discount}
                  onValue={(n) => set("discount", n)}
                  suffix={<DiscountToggle doc={doc} onChange={(v) => setDoc((d) => ({ ...d, discountType: v, discount: 0 }))} />}
                />
              )}
            </Field>
            <Field label="Shipping">
              <MoneyInput currency={doc.currency} value={doc.shipping} onValue={(n) => set("shipping", n)} />
            </Field>
            {cfg.showPaid && (
              <Field label="Already paid">
                <MoneyInput currency={doc.currency} value={doc.amountPaid} onValue={(n) => set("amountPaid", n)} />
              </Field>
            )}
          </div>
        </fieldset>

        <fieldset className="tool-card">
          <legend>Notes</legend>
          <div className="tool-stack">
            {cfg.showInstructions && (
              <Field label="How to pay" hint="ACH details, Zelle email, Venmo handle, or a card payment link.">
                <TextArea
                  minRows={3}
                  value={doc.paymentInstructions}
                  placeholder={"Zelle: billing@yourbusiness.com\nACH: Bank name, routing and account number"}
                  onChange={(e) => set("paymentInstructions", e.target.value)}
                />
              </Field>
            )}
            <Field label="Notes">
              <TextArea minRows={3} value={doc.notes} placeholder={cfg.notesPlaceholder} onChange={(e) => set("notes", e.target.value)} />
            </Field>
          </div>
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
                <dt>{discountLabel(doc)}</dt>
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

function PartyFields({ p, onChange, namePh }: { p: Party; onChange: (k: keyof Party, v: string) => void; namePh: string }) {
  const [emailTouched, setEmailTouched] = useState(false);
  const emailError = emailTouched && p.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(p.email.trim()) ? "Enter a valid email, like name@company.com" : null;
  return (
    <div className="tool-grid">
      <Field label="Name" className="span-2">
        <TextInput value={p.name} placeholder={namePh} autoComplete="organization" onChange={(e) => onChange("name", e.target.value)} />
      </Field>
      <Field label="Email" optional error={emailError}>
        <TextInput
          type="email"
          inputMode="email"
          value={p.email}
          placeholder="name@company.com"
          autoComplete="email"
          spellCheck={false}
          onChange={(e) => onChange("email", e.target.value)}
          onBlur={() => setEmailTouched(true)}
        />
      </Field>
      <Field label="Phone" optional>
        <TextInput type="tel" inputMode="tel" value={p.phone} placeholder="(555) 123-4567" autoComplete="tel" onChange={(e) => onChange("phone", e.target.value)} />
      </Field>
      <Field label="Address" optional className="span-2">
        <TextArea
          minRows={2}
          value={p.address}
          placeholder={"Street address\nCity, State ZIP"}
          autoComplete="street-address"
          onChange={(e) => onChange("address", e.target.value)}
        />
      </Field>
      <Field label="Country" optional className="span-2">
        <CountrySelect value={p.country} onChange={(v) => onChange("country", v)} />
      </Field>
    </div>
  );
}

function DiscountToggle({ doc, onChange }: { doc: Doc; onChange: (v: Doc["discountType"]) => void }) {
  return (
    <InlineToggle
      label="Discount type"
      value={doc.discountType}
      onChange={onChange}
      options={[
        { value: "percent", label: "%", title: "Percentage of subtotal" },
        { value: "flat", label: currencySymbol(doc.currency), title: "Fixed amount" },
      ]}
    />
  );
}

function PartyView({ label, p, empty }: { label: string; p: Party; empty: string }) {
  return (
    <div>
      <h3>{label}</h3>
      {p.name ? <p className="sheet-name">{p.name}</p> : <p className="sheet-ph">{empty}</p>}
      {[p.address, countryName(p.country), p.email, p.phone].filter(Boolean).map((v, i) => (
        <p key={i}>{v}</p>
      ))}
    </div>
  );
}
