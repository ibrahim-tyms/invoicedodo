import type { Metadata } from "next";
import Link from "next/link";
import { Cite, Figure, H2, ToolPage, type Faq } from "../tools/ToolPage";
import { REFS } from "../tools/refs";

const refs = [REFS.proforma, REFS.commercial, REFS.incoterms];

const PATH = "/proforma-invoice";
const TITLE = "Free Proforma Invoice Generator & Template (PDF) | InvoiceDodo";
const DESCRIPTION =
  "Create a proforma invoice online for free. Add items, shipping and a valid-until date, then download a PDF. Learn what a proforma invoice is and when to use one.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: ["proforma invoice", "proforma invoice template", "proforma invoice sample", "proforma invoice generator", "pro forma invoice"],
  alternates: { canonical: PATH },
  openGraph: { type: "website", url: PATH, title: TITLE, description: DESCRIPTION },
};

const faqs: Faq[] = [
  {
    q: "What is a proforma invoice?",
    a: "A proforma invoice is a preliminary bill sent before goods are delivered or work is done. It tells the buyer what they'll be charged so they can approve the purchase, arrange payment in advance or prepare import paperwork.",
  },
  {
    q: "Is a proforma invoice a legal invoice?",
    a: "No. It's not a demand for payment and isn't recorded as a sale. You issue a final (commercial) invoice once goods ship or the work is delivered.",
  },
  {
    q: "When should I use a proforma invoice?",
    a: "When a buyer needs a formal price before committing, when you require payment in advance, or when an international shipment needs a document for customs or the buyer's bank.",
  },
  {
    q: "What's the difference between a proforma invoice and a quote?",
    a: "Both state a price in advance. A proforma invoice looks like the final invoice, with full item, shipping and payment details, and usually follows an agreement to buy. A quote is often earlier in the sale.",
  },
  {
    q: "Can a buyer pay against a proforma invoice?",
    a: "Yes. That's one of its main uses: the buyer pays in advance based on the proforma, and you issue the final invoice when you deliver. Record the payment as a deposit and credit it on the final invoice.",
  },
  {
    q: "Does a proforma invoice need an invoice number?",
    a: "It should have a reference number so everyone can refer to it, but keep it in a separate series (PF-0001) from your real invoices so your invoice numbering stays clean.",
  },
  {
    q: "Can the final invoice differ from the proforma?",
    a: "Yes, if quantities, shipping or prices change. Explain the difference to the buyer before you send the final invoice, and reference the proforma number on it.",
  },
  {
    q: "Is 'pro forma' or 'proforma' correct?",
    a: "Both are used. 'Pro forma' is the original Latin phrase and is common in US government and trade writing; 'proforma' is a widely used single-word spelling.",
  },
  {
    q: "Is this proforma invoice generator free?",
    a: "Yes. No sign-up, no watermark and no limit. Your details are saved only in this browser.",
  },
];

export default function ProformaInvoicePage() {
  return (
    <ToolPage
      path={PATH}
      name="Proforma Invoice Generator"
      kicker="Free tool"
      h1="Free proforma invoice generator"
      intro="Send a preliminary invoice before you ship or start work. Add items, shipping and payment details, then download a PDF. No sign-up."
      mode="proforma"
      faqs={faqs}
      refs={refs}
      toc={[
        { id: "how-to", label: "How to create one" },
        { id: "what-for", label: "What it's for" },
        { id: "when", label: "When to send one" },
        { id: "what-to-include", label: "What to include" },
        { id: "example", label: "A filled-in example" },
        { id: "compared", label: "Proforma vs. quote vs. invoice" },
        { id: "vs-commercial", label: "Proforma vs. commercial invoice" },
        { id: "incoterms", label: "Shipping terms (Incoterms)" },
        { id: "types", label: "Types of proforma invoices" },
        { id: "sending", label: "Sending and following up" },
        { id: "considerations", label: "Practical considerations" },
      ]}
    >
      <H2 id="how-to">How to create a proforma invoice</H2>
      <ol className="tool-steps">
        <li>
          <b>Add your details and the buyer&rsquo;s</b>, including their full business name and address. For international
          orders, use the names and addresses that will appear on the shipping documents.
        </li>
        <li>
          <b>List the goods or services</b> with quantities, unit prices and descriptions specific enough for the buyer to
          approve (model numbers, sizes, materials).
        </li>
        <li>
          <b>Add shipping, tax and any discount</b>, so the total is the amount the buyer should expect to pay.
        </li>
        <li>
          <b>Set a valid-until date and payment terms</b>, add how to pay if you need money upfront, then download the PDF.
          The title and the default note make clear it&rsquo;s a proforma, not a final invoice.
        </li>
      </ol>

      <H2 id="what-for">What a proforma invoice is for</H2>
      <p>
        A proforma invoice is a <b>good-faith preview of the final invoice</b>. The buyer sees exactly what they&rsquo;ll pay,
        including shipping and tax, before anything is delivered. It&rsquo;s common when you ask for payment upfront, when a
        buyer needs internal approval, and in international trade. The U.S. International Trade Administration describes it as
        a quote in invoice format that a buyer may need to apply for an import license, open a letter of credit or arrange
        payment
        <Cite n={1} />. It may not be a required shipping document, but it gives the buyer the detail they need to prepare
        <Cite n={1} />.
      </p>

      <H2 id="when">When to send one</H2>
      <ul className="tool-list">
        <li>
          <b>You require payment in advance</b>, for example for custom work, large orders or new customers.
        </li>
        <li>
          <b>The buyer needs approval first.</b> Their purchasing or finance team wants a formal document to raise a purchase
          order.
        </li>
        <li>
          <b>The buyer is importing.</b> They may need it for an import license, a letter of credit, pre-shipment inspection
          or currency arrangements.
        </li>
        <li>
          <b>The order isn&rsquo;t final yet</b>, but the buyer wants to see the full cost, including shipping.
        </li>
      </ul>

      <H2 id="what-to-include">What to include</H2>
      <ul className="tool-list">
        <li>
          <b>The words &ldquo;Proforma Invoice&rdquo;</b> clearly at the top, so nobody books it as a final bill.
        </li>
        <li>
          <b>Seller and buyer details</b>, a reference number and the issue date.
        </li>
        <li>
          <b>Itemized goods or services</b> with quantities, unit prices and clear descriptions.
        </li>
        <li>
          <b>Shipping and delivery terms</b>, and for exports the estimated weight, packaging and country of origin where
          relevant.
        </li>
        <li>
          <b>A valid-until date</b> and the payment terms you expect.
        </li>
        <li>
          <b>How to pay</b>, if you require payment in advance.
        </li>
        <li>
          <b>A short disclaimer</b>, such as &ldquo;This is a proforma invoice, not a request for payment or a tax
          invoice.&rdquo; The generator adds this by default.
        </li>
      </ul>

      <H2 id="example">A filled-in example</H2>
      <p>A small furniture maker quoting a wholesale order that needs payment before production. Names and figures are illustrative.</p>
      <div className="tool-table-wrap">
        <table className="tool-table">
          <caption>Example proforma invoice PF-0007, valid 30 days (illustrative)</caption>
          <thead>
            <tr>
              <th>Description</th>
              <th className="num">Qty</th>
              <th className="num">Rate</th>
              <th className="num">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Oak side table, natural finish, 20 × 20 in</td>
              <td className="num">12</td>
              <td className="num">$145.00</td>
              <td className="num">$1,740.00</td>
            </tr>
            <tr>
              <td>Walnut bench, 48 in</td>
              <td className="num">4</td>
              <td className="num">$310.00</td>
              <td className="num">$1,240.00</td>
            </tr>
            <tr>
              <td>Crating and freight to buyer&rsquo;s warehouse</td>
              <td className="num">1</td>
              <td className="num">$260.00</td>
              <td className="num">$260.00</td>
            </tr>
            <tr>
              <td>
                <b>Total</b>
              </td>
              <td />
              <td />
              <td className="num">
                <b>$3,240.00</b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The notes would state: 50% payment to begin production, balance before shipping; production time four weeks; final
        invoice issued at dispatch. When the buyer pays the 50%, the maker sends a <Link href="/receipt-maker">receipt</Link>,
        and at dispatch a final invoice that credits it.
      </p>

      <H2 id="compared">Proforma vs. quote vs. invoice</H2>
      <div className="tool-table-wrap">
        <table className="tool-table">
          <thead>
            <tr>
              <th />
              <th>Quote / estimate</th>
              <th>Proforma invoice</th>
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Stage</th>
              <td>Early in the sale</td>
              <td>Buyer is ready to buy</td>
              <td>Delivered or due</td>
            </tr>
            <tr>
              <th scope="row">Asks for payment?</th>
              <td>No</td>
              <td>Only if you require advance payment</td>
              <td>Yes</td>
            </tr>
            <tr>
              <th scope="row">Recorded as a sale?</th>
              <td>No</td>
              <td>No</td>
              <td>Yes</td>
            </tr>
            <tr>
              <th scope="row">Level of detail</th>
              <td>Price and scope</td>
              <td>Everything the final invoice will have</td>
              <td>Final, with due date</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Need a price earlier in the conversation? Use the <Link href="/estimate-generator">estimate and quote generator</Link>.
      </p>

      <H2 id="vs-commercial">Proforma invoice vs. commercial invoice</H2>
      <p>
        The proforma comes <b>before</b> the sale is final; the commercial (final) invoice comes <b>after</b> delivery and is the
        document you&rsquo;re actually paid against and record as income. For exports, the commercial invoice is required for
        clearance, and customs in the buyer&rsquo;s country use it to assess duties and taxes
        <Cite n={2} />. When you&rsquo;re ready, create the final bill with the{" "}
        <Link href="/invoice-generator">free invoice generator</Link>.
      </p>
      <Figure
        src="/illustrations/proforma-vs-commercial.svg"
        width={1200}
        height={490}
        alt="Side-by-side comparison: a proforma invoice is sent before delivery as a quote in invoice format and is not a demand for payment; a commercial invoice is the final bill at or after shipment, used by customs to assess duties."
        caption="Proforma first, commercial invoice at shipment."
      />

      <H2 id="incoterms">Shipping terms on international proformas (Incoterms)</H2>
      <p>
        When goods cross a border, the price on a proforma only means something once both sides agree who pays for what along
        the way. That&rsquo;s what Incoterms do. They&rsquo;re a set of 11 rules issued by the International Chamber of
        Commerce that define the tasks, costs and risks carried by the seller and the buyer in an international sale
        <Cite n={3} />. Write the rule and the named place next to your shipping line, for example &ldquo;FCA Seattle&rdquo; or
        &ldquo;DAP Toronto&rdquo;.
      </p>
      <p>Seven of the rules work for any mode of transport and four are for sea and inland waterway shipments <Cite n={3} />. A few you&rsquo;ll see often:</p>
      <ul className="tool-list">
        <li>
          <b>EXW (Ex Works)</b>: the buyer collects from your premises and handles almost everything after that.
        </li>
        <li>
          <b>FCA (Free Carrier)</b>: you hand the goods to the buyer&rsquo;s carrier at a named place.
        </li>
        <li>
          <b>DAP (Delivered at Place)</b>: you deliver to a named destination; the buyer handles import clearance and duties.
        </li>
        <li>
          <b>DDP (Delivered Duty Paid)</b>: you deliver and also take on import duties, the most work for the seller.
        </li>
        <li>
          <b>FOB and CIF</b>: sea-freight rules covering delivery on board at the port of loading, and cost, insurance and
          freight to the destination port.
        </li>
      </ul>
      <p>
        If you&rsquo;re unsure which to use, the International Trade Administration&rsquo;s Incoterms guide is a good place to
        start
        <Cite n={3} />, and your freight forwarder can advise for a specific shipment.
      </p>

      <H2 id="types">Types of proforma invoices</H2>
      <ul className="tool-list">
        <li>
          <b>Advance-payment proforma</b>: the most common use for small businesses. The buyer pays some or all of the total
          before you start or ship.
        </li>
        <li>
          <b>Export proforma</b>: for international buyers, with shipping terms, weights, packaging and origin details they
          need for import paperwork and bank arrangements.
        </li>
        <li>
          <b>Approval proforma</b>: sent so a buyer&rsquo;s finance or purchasing team can raise a purchase order. No payment
          is requested yet.
        </li>
        <li>
          <b>Milestone proforma</b>: for staged work, one proforma per phase, each followed by a final invoice when that phase
          is delivered.
        </li>
      </ul>

      <H2 id="sending">Sending and following up</H2>
      <p>
        Email the PDF with a subject line that names it plainly (&ldquo;Proforma PF-0007 for order of 16 pieces, valid to
        Dec 23&rdquo;), so nobody in the buyer&rsquo;s accounts team mistakes it for a bill they&rsquo;ve already been
        sent. If you need advance payment, say how much and by when in the email as well as on the document. A short check-in a
        few days before the valid-until date often turns a pending proforma into a confirmed order.
      </p>

      <H2 id="considerations">Practical considerations</H2>
      <ul className="tool-list">
        <li>
          <b>Keep a separate number series</b> (PF-0001) so proformas never collide with your real invoice numbers.
        </li>
        <li>
          <b>Don&rsquo;t book it as revenue.</b> Advance payments received against a proforma are deposits until you deliver
          and issue the final invoice.
        </li>
        <li>
          <b>Be accurate.</b> Buyers may use your figures for import paperwork and bank arrangements, so the final invoice
          should match unless something genuinely changed.
        </li>
        <li>
          <b>Set an expiry.</b> A valid-until date protects you if costs or exchange rates move.
        </li>
        <li>
          <b>Check export rules</b> for your product and destination before shipping. The International Trade Administration
          publishes guidance on export documentation
          <Cite n={2} />.
        </li>
      </ul>

      <div className="tool-callout">
        <p>
          <b>Sending a lot of invoices?</b> InvoiceDodo is building invoicing that follows up for you.{" "}
          <Link href="/#join">Join early access</Link>.
        </p>
      </div>
    </ToolPage>
  );
}
