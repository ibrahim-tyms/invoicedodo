import type { Metadata } from "next";
import Link from "next/link";
import { Cite, Figure, H2, ToolPage, type Faq } from "../tools/ToolPage";
import { REFS } from "../tools/refs";

const refs = [REFS.records, REFS.keep];

const PATH = "/receipt-maker";
const TITLE = "Free Receipt Maker: Create a Payment Receipt PDF | InvoiceDodo";
const DESCRIPTION =
  "Make a professional payment receipt in minutes. Free receipt maker with no sign-up and no watermark: add your logo, items, tax and payment method, then download a PDF.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: ["receipt maker", "free receipt maker", "receipt generator", "online receipt maker", "payment receipt template", "cash receipt template", "receipt template free"],
  alternates: { canonical: PATH },
  openGraph: { type: "website", url: PATH, title: TITLE, description: DESCRIPTION },
};

const faqs: Faq[] = [
  {
    q: "What's the difference between a receipt and an invoice?",
    a: "An invoice asks for payment. A receipt confirms that payment was received. You send the invoice first, and the receipt after the customer pays.",
  },
  {
    q: "What should a receipt include?",
    a: "Your business name and contact details, a receipt number, the date paid, who paid, what they paid for, the amount, any tax, and the payment method (cash, card, check, Zelle and so on).",
  },
  {
    q: "Is this receipt maker free?",
    a: "Yes. There's no sign-up, no watermark and no limit on receipts. Your details are saved in this browser, not on our servers.",
  },
  {
    q: "Can I make a cash receipt?",
    a: "Yes. Choose Cash as the payment method. The receipt shows the amount paid and a PAID mark, which is useful for cash jobs where there's no bank record.",
  },
  {
    q: "Can I use this as a rent receipt?",
    a: "Yes. Add the tenant as the payer, describe the line as rent for the property and period (for example, 'Rent, 12 Oak St, December 2026'), and choose the payment method.",
  },
  {
    q: "Can I make a receipt for a partial payment or deposit?",
    a: "Yes. Enter only the amount received on this receipt and describe it clearly, for example 'Deposit, 50% of kitchen remodel (invoice INV-0012)'. Show the remaining balance in the notes.",
  },
  {
    q: "Do I need to give a receipt for every payment?",
    a: "It's good practice, and many customers will ask for one, especially for cash. For card and online payments, your payment provider may email one automatically; a branded receipt with itemized details is still clearer for the customer's records.",
  },
  {
    q: "Should a receipt show sales tax?",
    a: "If you charged sales tax, show it as a separate line so the customer can see the tax paid. If the sale wasn't taxable, leave the tax rate at zero.",
  },
  {
    q: "How do I number receipts?",
    a: "Use a simple sequence like RCT-0001, RCT-0002. Some businesses reuse the invoice number with an R suffix (INV-0042-R) so the two documents are easy to match.",
  },
  {
    q: "Can I print the receipt or send it by text?",
    a: "Yes. Use Print for a paper copy, or Download PDF and attach the file to an email or message.",
  },
];

export default function ReceiptMakerPage() {
  return (
    <ToolPage
      path={PATH}
      name="Receipt Maker"
      kicker="Free tool"
      h1="Free receipt maker"
      intro="Confirm a payment in a minute. Add what was paid for and how, then download or print a clean PDF receipt. No sign-up, no watermark."
      mode="receipt"
      faqs={faqs}
      refs={refs}
      toc={[
        { id: "how-to", label: "How to make a receipt" },
        { id: "what-is", label: "What is a receipt?" },
        { id: "receipt-vs-invoice", label: "Receipt vs. invoice" },
        { id: "what-to-include", label: "What to include" },
        { id: "example", label: "A filled-in example" },
        { id: "types", label: "Types of receipts" },
        { id: "by-business", label: "Receipts by business type" },
        { id: "best-practices", label: "Best practices" },
        { id: "pitfalls", label: "Common pitfalls" },
        { id: "digital", label: "Digital vs. paper receipts" },
        { id: "sending", label: "How to send a receipt" },
        { id: "records", label: "Keeping receipts" },
      ]}
    >
      <H2 id="how-to">How to make a receipt</H2>
      <ol className="tool-steps">
        <li>
          <b>Add your business details and logo.</b> They&rsquo;re remembered in this browser, and shared with the other free
          tools, so you only type them once.
        </li>
        <li>
          <b>Add who paid you</b> and the date the payment arrived. Use the name on the payment, which helps if the receipt is
          ever needed as proof.
        </li>
        <li>
          <b>List what they paid for</b>, with quantities, prices and any sales tax. If the payment settles an invoice, mention
          the invoice number in the line or the notes.
        </li>
        <li>
          <b>Pick the payment method</b> (card, cash, check, ACH, Zelle, Venmo, PayPal, Cash App and more), then download or
          print. Click <b>New receipt</b> for the next one: the number moves up automatically.
        </li>
      </ol>

      <H2 id="what-is">What is a receipt?</H2>
      <p>
        A receipt is a written record that a payment was made and received. It names who paid, who was paid, how much, for
        what, when and how. For your customer, it&rsquo;s proof of purchase for returns, warranties, expense claims and their
        own taxes. For you, it&rsquo;s part of the paper trail behind the income in your books, and it stops &ldquo;did you
        get my payment?&rdquo; emails before they start.
      </p>

      <H2 id="receipt-vs-invoice">Receipt vs. invoice</H2>
      <p>
        An <b>invoice</b> is a request for payment: it has a due date and a balance due. A <b>receipt</b> is proof of payment: it
        shows the amount paid, the date and the method. In a typical job you send an invoice first and a receipt once the
        client pays. In a shop or at a market, where payment happens on the spot, the receipt is often the only document. Need
        to bill first? Use the <Link href="/invoice-generator">free invoice generator</Link>.
      </p>
      <Figure
        src="/illustrations/document-flow.svg"
        width={1200}
        height={450}
        alt="Four-step flow of business documents: an estimate prices the job, an invoice asks for payment, the client pays, and a receipt confirms the payment."
        caption="Where a receipt fits: it closes the loop after the invoice is paid."
      />
      <div className="tool-table-wrap">
        <table className="tool-table">
          <thead>
            <tr>
              <th />
              <th>Invoice</th>
              <th>Receipt</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Purpose</th>
              <td>Asks to be paid</td>
              <td>Confirms you were paid</td>
            </tr>
            <tr>
              <th scope="row">When</th>
              <td>Before payment</td>
              <td>After payment</td>
            </tr>
            <tr>
              <th scope="row">Key dates</th>
              <td>Invoice date and due date</td>
              <td>Date paid</td>
            </tr>
            <tr>
              <th scope="row">Shows</th>
              <td>Balance due and how to pay</td>
              <td>Amount paid and payment method</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H2 id="what-to-include">What every receipt should show</H2>
      <ul className="tool-list">
        <li>
          <b>A receipt number</b>, so either of you can find it later.
        </li>
        <li>
          <b>The date payment was received</b>, not the date of the work.
        </li>
        <li>
          <b>Your business name and contact details</b>, so the customer knows who issued it.
        </li>
        <li>
          <b>The customer&rsquo;s name</b>, as it appears on the payment where possible.
        </li>
        <li>
          <b>What was paid for</b>, itemized, with amounts.
        </li>
        <li>
          <b>Sales tax</b> as its own line, if you charged it.
        </li>
        <li>
          <b>The payment method</b> and the total paid. For checks, you can add the check number in the notes.
        </li>
        <li>
          <b>The balance remaining</b> in the notes, if this was a partial payment.
        </li>
      </ul>

      <H2 id="example">A filled-in example</H2>
      <p>A lawn care business confirming a cash payment for a month of mowing. Names and figures are illustrative.</p>
      <div className="tool-table-wrap">
        <table className="tool-table">
          <caption>Example receipt RCT-0108, paid in cash on Oct 31 (illustrative)</caption>
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
              <td>Weekly mowing and edging, 18 Elm St, October</td>
              <td className="num">4</td>
              <td className="num">$45.00</td>
              <td className="num">$180.00</td>
            </tr>
            <tr>
              <td>Leaf cleanup (one visit)</td>
              <td className="num">1</td>
              <td className="num">$65.00</td>
              <td className="num">$65.00</td>
            </tr>
            <tr>
              <td>
                <b>Amount paid (cash)</b>
              </td>
              <td />
              <td />
              <td className="num">
                <b>$245.00</b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The customer gets proof they paid in full for October; the business gets a record of cash income that would otherwise
        leave no trace in a bank statement.
      </p>

      <H2 id="types">Common receipt types</H2>
      <p>
        The same tool handles each of these. Change the title at the top so it reads exactly as you want, such as &ldquo;Cash
        Receipt&rdquo; or &ldquo;Rent Receipt&rdquo;.
      </p>
      <ul className="tool-list">
        <li>
          <b>Payment receipt</b>: confirms an invoice has been paid. Reference the invoice number.
        </li>
        <li>
          <b>Cash receipt</b>: for in-person cash payments, where the receipt is the only record.
        </li>
        <li>
          <b>Sales receipt</b>: for goods sold and paid for on the spot, itemized with tax.
        </li>
        <li>
          <b>Rent receipt</b>: for tenants, showing the property, the period covered and the amount.
        </li>
        <li>
          <b>Deposit receipt</b>: confirms an upfront payment and states what it&rsquo;s for and what remains.
        </li>
        <li>
          <b>Service receipt</b>: for completed jobs, listing labor, parts and materials.
        </li>
      </ul>

      <H2 id="by-business">Receipts by business type</H2>
      <h3>Contractors and home services</h3>
      <p>
        Separate labor from materials, include the job address, and note any warranty on the work. For deposits, say which
        phase the payment covers.
      </p>
      <h3>Landlords</h3>
      <p>
        Include the property address, the rental period, and late fees as their own line if any were paid. A receipt for every
        cash or money-order payment protects you and your tenant.
      </p>
      <h3>Freelancers and consultants</h3>
      <p>
        Match the receipt to the invoice: same client name, same invoice number in the notes, the date the money arrived and
        the method.
      </p>
      <h3>Market sellers and small shops</h3>
      <p>
        Itemize products, show sales tax separately, and keep the receipt short enough to send to a phone. Repeat customers
        appreciate a consistent format.
      </p>

      <H2 id="best-practices">Best practices for professional receipts</H2>
      <ol className="tool-steps">
        <li>
          <b>Send it right away</b>, while the payment is fresh in everyone&rsquo;s mind.
        </li>
        <li>
          <b>Keep numbering consistent</b> so receipts are easy to find and match to invoices.
        </li>
        <li>
          <b>Use the same branding</b> as your invoices: logo, colors and business name.
        </li>
        <li>
          <b>Be specific</b> about what was paid for. &ldquo;Services&rdquo; doesn&rsquo;t help anyone at tax time.
        </li>
        <li>
          <b>Say thank you.</b> A one-line note in the notes field is a small touch customers remember.
        </li>
      </ol>

      <H2 id="pitfalls">Common pitfalls</H2>
      <ul className="tool-list">
        <li>
          <b>Issuing a receipt before the money arrives.</b> For checks and bank transfers, wait until the payment clears.
        </li>
        <li>
          <b>Calling a partial payment &ldquo;paid in full&rdquo;.</b> Record only what was received and state the balance.
        </li>
        <li>
          <b>Leaving out the payment method</b>, which makes the receipt harder to reconcile against your bank records.
        </li>
        <li>
          <b>Not keeping your own copy.</b> Save every PDF you send.
        </li>
      </ul>

      <H2 id="digital">Digital vs. paper receipts</H2>
      <p>
        Both work. A <b>digital receipt</b> (a PDF by email or message) is easy to search, hard to lose, and the customer can
        forward it straight to their bookkeeper. A <b>paper receipt</b> suits in-person cash jobs, markets and customers who
        prefer something in hand. Many businesses do both: print a copy on the spot and email the PDF afterwards. Whichever you
        use, keep your own copy in the same place every time.
      </p>
      <div className="tool-table-wrap">
        <table className="tool-table">
          <thead>
            <tr>
              <th />
              <th>Digital (PDF)</th>
              <th>Paper</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Best for</th>
              <td>Invoiced clients, online and remote payments</td>
              <td>Cash on the spot, markets, walk-in customers</td>
            </tr>
            <tr>
              <th scope="row">Storage</th>
              <td>A folder per year, searchable by number</td>
              <td>Receipt book with carbon copies, or scan your copy</td>
            </tr>
            <tr>
              <th scope="row">Re-issuing</th>
              <td>Re-send the same PDF in seconds</td>
              <td>Write a duplicate marked &ldquo;Copy&rdquo;</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H2 id="sending">How to send a receipt</H2>
      <ol className="tool-steps">
        <li>
          <b>Download the PDF</b> and name it clearly, for example <i>receipt-RCT-0108.pdf</i>.
        </li>
        <li>
          <b>Email or message it</b> with a subject like &ldquo;Receipt RCT-0108: $245.00 received, thank you&rdquo;.
        </li>
        <li>
          <b>Reference the invoice</b> it settles, if there was one, so the customer can close it in their books.
        </li>
        <li>
          <b>Need a replacement?</b> If a customer loses a receipt, re-send the same PDF rather than creating a new number, so
          your records still show one receipt per payment.
        </li>
      </ol>

      <H2 id="records">Keep a copy for your records</H2>
      <p>
        Receipts, invoices, deposit slips and receipt books are the supporting documents behind the income and expenses in
        your books
        <Cite n={1} />. Keep a copy of every receipt you issue: the IRS generally expects records to be kept for at least
        three years, and longer in some cases
        <Cite n={2} />. A simple habit works: one folder per year, with each receipt PDF named by its number.
      </p>

      <div className="tool-callout">
        <p>
          <b>Want receipts sent automatically when a client pays?</b> That&rsquo;s part of what InvoiceDodo is building.{" "}
          <Link href="/#join">Join early access</Link>.
        </p>
      </div>
    </ToolPage>
  );
}
