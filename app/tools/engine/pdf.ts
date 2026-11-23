import type { Doc } from "./model";
import { MODES, discountLabel, pdfMoney, prettyDate, termsLabel, totals } from "./model";
import { countryName } from "../../lib/locale-data";

/** Builds a US Letter PDF with real (selectable) text. jsPDF is loaded only when someone downloads. */
export async function buildPdf(doc: Doc) {
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({ unit: "pt", format: "letter" });
  const cfg = MODES[doc.mode];
  const t = totals(doc);
  const W = 612;
  const M = 48;
  const R = W - M;
  const ink: [number, number, number] = [36, 42, 41];
  const muted: [number, number, number] = [110, 116, 113];
  const line: [number, number, number] = [222, 227, 225];
  const accent = hexToRgb(doc.accent);
  const fmt = (n: number) => pdfMoney(n, doc.currency);

  pdf.setProperties({ title: `${doc.title} ${doc.number}`.trim(), creator: "InvoiceDodo" });

  let y = M;

  // Logo (left) and title (right)
  if (doc.logo) {
    try {
      const props = pdf.getImageProperties(doc.logo);
      const ratio = props.width / props.height;
      let h = 48;
      let w = h * ratio;
      if (w > 180) {
        w = 180;
        h = w / ratio;
      }
      pdf.addImage(doc.logo, props.fileType, M, y, w, h);
    } catch {
      /* unreadable image: skip */
    }
  }
  pdf.setFont("helvetica", "bold").setFontSize(24).setTextColor(...accent);
  pdf.text(doc.title || cfg.title, R, y + 20, { align: "right" });

  pdf.setFont("helvetica", "normal").setFontSize(9.5).setTextColor(...muted);
  const meta: [string, string][] = [];
  if (doc.number) meta.push([`${cfg.title === "Receipt" ? "Receipt" : "No."}`, doc.number]);
  meta.push([cfg.issueLabel, prettyDate(doc.issueDate)]);
  if (cfg.showTerms && doc.terms !== "custom") meta.push(["Terms", termsLabel(doc)]);
  if (cfg.dueLabel && doc.dueDate) meta.push([cfg.dueLabel, prettyDate(doc.dueDate)]);
  if (doc.po) meta.push(["PO number", doc.po]);
  if (cfg.showPaymentMethod && doc.paymentMethod) meta.push(["Paid by", doc.paymentMethod]);
  let my = y + 40;
  for (const [k, v] of meta) {
    pdf.setTextColor(...muted).text(k, R - 150, my);
    pdf.setTextColor(...ink).text(v, R, my, { align: "right" });
    my += 14;
  }

  y = Math.max(y + 70, my + 8);

  // From / To
  const col = (label: string, p: Doc["from"], x: number, width: number) => {
    let yy = y;
    pdf.setFont("helvetica", "bold").setFontSize(8).setTextColor(...muted).text(label.toUpperCase(), x, yy);
    yy += 14;
    pdf.setFont("helvetica", "bold").setFontSize(11).setTextColor(...ink);
    if (p.name) {
      pdf.text(pdf.splitTextToSize(p.name, width), x, yy);
      yy += 15;
    }
    pdf.setFont("helvetica", "normal").setFontSize(9.5).setTextColor(...ink);
    for (const part of [p.address, countryName(p.country).replace(/[‘’]/g, "'"), p.email, p.phone].filter(Boolean)) {
      const lines = pdf.splitTextToSize(part, width) as string[];
      pdf.text(lines, x, yy);
      yy += lines.length * 12.5;
    }
    return yy;
  };
  const colW = (R - M - 24) / 2;
  const yFrom = col("From", doc.from, M, colW);
  const yTo = col(doc.mode === "receipt" ? "Received from" : doc.mode === "estimate" ? "Prepared for" : "Bill to", doc.to, M + colW + 24, colW);
  y = Math.max(yFrom, yTo) + 22;

  // Items table
  const cDesc = M;
  const cQty = R - 210;
  const cRate = R - 110;
  const cAmt = R;
  const descW = cQty - cDesc - 40;

  const header = () => {
    pdf.setFillColor(...accent).rect(M, y - 13, R - M, 22, "F");
    pdf.setFont("helvetica", "bold").setFontSize(8.5).setTextColor(255, 255, 255);
    pdf.text("DESCRIPTION", cDesc + 8, y + 1);
    pdf.text("QTY", cQty, y + 1, { align: "right" });
    pdf.text("RATE", cRate, y + 1, { align: "right" });
    pdf.text("AMOUNT", cAmt - 8, y + 1, { align: "right" });
    y += 24;
  };
  header();

  pdf.setFont("helvetica", "normal").setFontSize(9.5);
  for (const it of doc.items) {
    const lines = pdf.splitTextToSize(it.description || "—", descW) as string[];
    const h = Math.max(lines.length * 12.5, 12.5) + 10;
    if (y + h > 792 - 160) {
      pdf.addPage();
      y = M + 13;
      header();
      pdf.setFont("helvetica", "normal").setFontSize(9.5);
    }
    pdf.setTextColor(...ink).text(lines, cDesc + 8, y);
    pdf.text(fmtQty(it.qty), cQty, y, { align: "right" });
    pdf.text(fmt(it.rate || 0), cRate, y, { align: "right" });
    pdf.text(fmt((it.qty || 0) * (it.rate || 0)), cAmt - 8, y, { align: "right" });
    y += h - 4;
    pdf.setDrawColor(...line).setLineWidth(0.6).line(M, y - 8, R, y - 8);
    y += 4;
  }

  // Totals
  y += 6;
  const tx = R - 210;
  const row = (label: string, value: string, bold = false) => {
    pdf.setFont("helvetica", bold ? "bold" : "normal").setFontSize(bold ? 11 : 9.5);
    pdf.setTextColor(...(bold ? ink : muted)).text(label, tx, y);
    pdf.setTextColor(...ink).text(value, cAmt - 8, y, { align: "right" });
    y += bold ? 18 : 15;
  };
  row("Subtotal", fmt(t.subtotal));
  if (t.discount) row(discountLabel(doc), `-${fmt(t.discount)}`);
  if (doc.taxRate) row(`Tax (${doc.taxRate}%)`, fmt(t.tax));
  if (t.shipping) row("Shipping", fmt(t.shipping));
  if (cfg.showPaid && t.paid) {
    row("Total", fmt(t.total));
    row("Paid", `-${fmt(t.paid)}`);
  }
  pdf.setDrawColor(...accent).setLineWidth(1.2).line(tx, y - 9, R, y - 9);
  y += 6;
  row(cfg.totalLabel, fmt(doc.mode === "receipt" ? t.total : t.due), true);

  if (doc.mode === "receipt") {
    pdf.setDrawColor(...accent).setTextColor(...accent).setLineWidth(1.5);
    pdf.roundedRect(M, y - 44, 74, 28, 3, 3, "S");
    pdf.setFont("helvetica", "bold").setFontSize(14).text("PAID", M + 37, y - 25, { align: "center" });
  }

  // Notes, payment instructions, signature
  y += 18;
  const block = (label: string, text: string) => {
    if (!text.trim()) return;
    const lines = pdf.splitTextToSize(text, R - M) as string[];
    if (y + lines.length * 12.5 + 20 > 792 - M) {
      pdf.addPage();
      y = M;
    }
    pdf.setFont("helvetica", "bold").setFontSize(8).setTextColor(...muted).text(label.toUpperCase(), M, y);
    y += 13;
    pdf.setFont("helvetica", "normal").setFontSize(9.5).setTextColor(...ink).text(lines, M, y);
    y += lines.length * 12.5 + 14;
  };
  if (cfg.showInstructions) block("How to pay", doc.paymentInstructions);
  block("Notes", doc.notes);

  if (cfg.showSignature) {
    if (y + 60 > 792 - M) {
      pdf.addPage();
      y = M;
    }
    y += 26;
    pdf.setDrawColor(...muted).setLineWidth(0.6).line(M, y, M + 220, y).line(M + 260, y, M + 400, y);
    pdf.setFont("helvetica", "normal").setFontSize(8.5).setTextColor(...muted);
    pdf.text("Accepted by (signature)", M, y + 12);
    pdf.text("Date", M + 260, y + 12);
  }

  return pdf;
}

export async function downloadPdf(doc: Doc) {
  const pdf = await buildPdf(doc);
  const name = `${(doc.title || "document").toLowerCase().replace(/\s+/g, "-")}-${doc.number || "draft"}`
    .replace(/[^a-z0-9-_]+/gi, "-")
    .replace(/-+/g, "-");
  pdf.save(`${name}.pdf`);
}

function fmtQty(n: number) {
  return Number.isInteger(n) ? String(n) : n.toFixed(2);
}

function hexToRgb(hex: string): [number, number, number] {
  const m = hex.replace("#", "").match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : [23, 78, 72];
}
