/** Shared document model for the free tools: invoice, receipt, estimate, proforma. */

export type DocMode = "invoice" | "receipt" | "estimate" | "proforma";

export type LineItem = { id: string; description: string; qty: number; rate: number };

export type Party = { name: string; email: string; phone: string; address: string };

export type Doc = {
  mode: DocMode;
  title: string;
  number: string;
  po: string;
  issueDate: string; // yyyy-mm-dd
  terms: string; // invoice: "due-on-receipt" | "net-7" | ... ; others ignore
  dueDate: string; // invoice due date, estimate/proforma "valid until"
  currency: string;
  from: Party;
  to: Party;
  items: LineItem[];
  taxRate: number; // percent
  discount: number; // flat amount
  shipping: number; // flat amount
  amountPaid: number; // invoice: payments received; receipt: ignored (paid in full)
  paymentMethod: string; // receipt
  paymentInstructions: string; // invoice / proforma
  notes: string;
  logo: string | null; // data URL (png/jpeg)
  accent: string;
};

export type ModeConfig = {
  title: string;
  prefix: string;
  issueLabel: string;
  dueLabel: string | null;
  showTerms: boolean;
  showPaid: boolean;
  showPaymentMethod: boolean;
  showInstructions: boolean;
  showSignature: boolean;
  totalLabel: string;
  notesPlaceholder: string;
  defaultNotes: string;
};

export const MODES: Record<DocMode, ModeConfig> = {
  invoice: {
    title: "Invoice",
    prefix: "INV-",
    issueLabel: "Invoice date",
    dueLabel: "Due date",
    showTerms: true,
    showPaid: true,
    showPaymentMethod: false,
    showInstructions: true,
    showSignature: false,
    totalLabel: "Balance due",
    notesPlaceholder: "Thank you for your business.",
    defaultNotes: "Thank you for your business.",
  },
  receipt: {
    title: "Receipt",
    prefix: "RCT-",
    issueLabel: "Date paid",
    dueLabel: null,
    showTerms: false,
    showPaid: false,
    showPaymentMethod: true,
    showInstructions: false,
    showSignature: false,
    totalLabel: "Amount paid",
    notesPlaceholder: "Paid in full. Thank you!",
    defaultNotes: "Paid in full. Thank you!",
  },
  estimate: {
    title: "Estimate",
    prefix: "EST-",
    issueLabel: "Estimate date",
    dueLabel: "Valid until",
    showTerms: false,
    showPaid: false,
    showPaymentMethod: false,
    showInstructions: false,
    showSignature: true,
    totalLabel: "Estimated total",
    notesPlaceholder: "Scope, assumptions and what's not included.",
    defaultNotes: "This estimate is based on the scope described above. Prices are valid until the date shown.",
  },
  proforma: {
    title: "Proforma Invoice",
    prefix: "PF-",
    issueLabel: "Issue date",
    dueLabel: "Valid until",
    showTerms: false,
    showPaid: false,
    showPaymentMethod: false,
    showInstructions: true,
    showSignature: false,
    totalLabel: "Total",
    notesPlaceholder: "Advance payment terms, delivery details.",
    defaultNotes: "This is a proforma invoice, not a request for payment or a tax invoice. A final invoice will follow on delivery.",
  },
};

export const TERMS: { value: string; label: string; days: number | null }[] = [
  { value: "due-on-receipt", label: "Due on receipt", days: 0 },
  { value: "net-7", label: "Net 7", days: 7 },
  { value: "net-15", label: "Net 15", days: 15 },
  { value: "net-30", label: "Net 30", days: 30 },
  { value: "net-45", label: "Net 45", days: 45 },
  { value: "net-60", label: "Net 60", days: 60 },
  { value: "custom", label: "Custom date", days: null },
];

export const CURRENCIES = ["USD", "CAD", "EUR", "GBP", "AUD"] as const;

export const PAYMENT_METHODS = ["Card", "Cash", "Check", "ACH bank transfer", "Zelle", "Venmo", "PayPal", "Cash App", "Wire transfer", "Other"];

export const ACCENTS = ["#174e48", "#242a29", "#3b6e96", "#7d5f0c", "#b23f33"];

export const todayISO = () => {
  const d = new Date();
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 10);
};

export const addDays = (iso: string, days: number) => {
  const d = new Date(`${iso}T12:00:00`);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

export const uid = () => Math.random().toString(36).slice(2, 10);

export type Preset = {
  items?: Omit<LineItem, "id">[];
  notes?: string;
  terms?: string;
  taxRate?: number;
};

/** `issue` = "" renders a date-less draft (used for the server-rendered first paint; dates are filled in the browser). */
export function newDoc(mode: DocMode, preset?: Preset, issue: string = todayISO()): Doc {
  const cfg = MODES[mode];
  const terms = preset?.terms ?? "net-15";
  const days = TERMS.find((t) => t.value === terms)?.days ?? 15;
  return {
    mode,
    title: cfg.title,
    number: `${cfg.prefix}0001`,
    po: "",
    issueDate: issue,
    terms,
    dueDate: !issue || mode === "receipt" ? "" : addDays(issue, mode === "invoice" ? days : 30),
    currency: "USD",
    from: { name: "", email: "", phone: "", address: "" },
    to: { name: "", email: "", phone: "", address: "" },
    items: (preset?.items ?? [{ description: "", qty: 1, rate: 0 }]).map((it, i) => ({ ...it, id: `i${i}` })),
    taxRate: preset?.taxRate ?? 0,
    discount: 0,
    shipping: 0,
    amountPaid: 0,
    paymentMethod: "Card",
    paymentInstructions: "",
    notes: preset?.notes ?? cfg.defaultNotes,
    logo: null,
    accent: ACCENTS[0],
  };
}

const r2 = (n: number) => Math.round((Number.isFinite(n) ? n : 0) * 100) / 100;

export function totals(doc: Doc) {
  const subtotal = r2(doc.items.reduce((s, it) => s + r2((it.qty || 0) * (it.rate || 0)), 0));
  const discount = r2(Math.min(Math.max(doc.discount || 0, 0), subtotal));
  const taxable = r2(subtotal - discount);
  const tax = r2((taxable * Math.max(doc.taxRate || 0, 0)) / 100);
  const shipping = r2(Math.max(doc.shipping || 0, 0));
  const total = r2(taxable + tax + shipping);
  const paid = MODES[doc.mode].showPaid ? r2(Math.max(doc.amountPaid || 0, 0)) : 0;
  const due = doc.mode === "receipt" ? total : r2(total - paid);
  return { subtotal, discount, tax, shipping, total, paid, due };
}

export function money(n: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(n);
  } catch {
    return `${currency} ${n.toFixed(2)}`;
  }
}

export function prettyDate(iso: string) {
  if (!iso) return "";
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function termsLabel(doc: Doc) {
  return TERMS.find((t) => t.value === doc.terms)?.label ?? "";
}

/** Next number after e.g. INV-0007 → INV-0008 (keeps prefix and zero padding). */
export function nextNumber(n: string) {
  const m = n.match(/^(.*?)(\d+)(\D*)$/);
  if (!m) return `${n}-2`;
  const next = String(Number(m[2]) + 1).padStart(m[2].length, "0");
  return `${m[1]}${next}${m[3]}`;
}
