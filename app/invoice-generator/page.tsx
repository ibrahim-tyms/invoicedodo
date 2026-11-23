import type { Metadata } from "next";
import Link from "next/link";
import { Cite, Figure, H2, ToolPage, type Faq } from "../tools/ToolPage";
import { REFS } from "../tools/refs";

const refs = [REFS.w9, REFS.nec, REFS.salesTax, REFS.records, REFS.keep];

const PATH = "/invoice-generator";
const TITLE = "Free Invoice Generator: No Sign-Up, Instant PDF | InvoiceDodo";
const DESCRIPTION =
  "Create a professional invoice in minutes. Free invoice generator with no sign-up and no watermark: add your logo, sales tax and payment details, then download a PDF.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: ["invoice generator", "free invoice generator", "invoice maker", "online invoice generator", "create invoice free", "pdf invoice generator", "bill generator"],
  alternates: { canonical: PATH },
  openGraph: { type: "website", url: PATH, title: TITLE, description: DESCRIPTION },
};

const faqs: Faq[] = [
  {
    q: "Is this invoice generator really free?",
    a: "Yes. You can create, download and print as many invoices as you like. There is no sign-up, no watermark and no limit on invoices or clients.",
  },
  {
    q: "Do I need an account to make an invoice?",
    a: "No. Fill in the form and download the PDF. Your business details and logo are saved in this browser so your next invoice is faster, and nothing is sent to our servers.",
  },
  {
    q: "What should an invoice include?",
    a: "Your business name and contact details, the client's details, a unique invoice number, the invoice date, the due date or payment terms, an itemized list of products or services with quantities and prices, any tax, the total due, and how to pay.",
  },
  {
    q: "What's the difference between an invoice and a bill?",
    a: "They're the same document seen from two sides. You send an invoice to ask for payment; your client receives it as a bill to pay. 'Bill generator' and 'invoice generator' describe the same tool.",
  },
  {
    q: "What does Net 30 mean on an invoice?",
    a: "Net 30 means the full amount is due 30 days after the invoice date. Net 15 and Net 60 work the same way. Due on receipt means the client should pay as soon as they get the invoice.",
  },
  {
    q: "Should I add sales tax to my invoice?",
    a: "Only if your state and the item require it. Most US states levy a sales tax, many cities and counties add a local rate, and states treat services differently. Check your state's revenue department, then enter the combined rate in the Tax rate field.",
  },
  {
    q: "How do I number my invoices?",
    a: "Use a unique, sequential number for every invoice, such as INV-0001, INV-0002. Never reuse a number: duplicates look like double billing and are a common reason invoices get rejected. The New invoice button moves to the next number automatically.",
  },
  {
    q: "Can I charge a late fee?",
    a: "Usually, if you agreed it with the client in advance and it's stated on the invoice. Limits on late fees and interest vary by state, so keep it reasonable and check your state's rules or ask an advisor. Put the fee in the Notes field, for example 'A 1.5% monthly late fee applies after the due date.'",
  },
  {
    q: "How do I send the invoice?",
    a: "Download the PDF and attach it to an email. Put the invoice number, amount and due date in the subject line, address it to the person or accounts payable inbox that pays, and include a one-line summary in the email body.",
  },
  {
    q: "Can I add my logo?",
    a: "Yes. Upload a PNG or JPG under 1 MB. It appears on the preview and in the downloaded PDF.",
  },
  {
    q: "Can I invoice in a currency other than US dollars?",
    a: "Yes. Choose USD, CAD, EUR, GBP or AUD from the Currency menu. Amounts are formatted for that currency on the preview and the PDF.",
  },
  {
    q: "Does it work on my phone?",
    a: "Yes. The form works on phones and tablets, and Download PDF saves the file to your device so you can share it from your email or messaging app.",
  },
  {
    q: "Can I edit an invoice after downloading it?",
    a: "Your last invoice stays in the form in this browser, so you can change it and download again. If you've already sent it, send a corrected invoice with a note, or issue a credit memo, rather than silently changing the original.",
  },
  {
    q: "Can I use this for estimates, quotes or receipts?",
    a: "Yes. Use the free Estimate & Quote Generator to price a job before you start, the Proforma Invoice Generator to bill ahead of delivery, and the Receipt Maker to confirm a payment you've received.",
  },
];

export default function InvoiceGeneratorPage() {
  return (
    <ToolPage
      path={PATH}
      name="Invoice Generator"
      kicker="Free tool"
      h1="Free invoice generator"
      intro="Fill in the form, watch the invoice build on the right, then download a clean PDF. No sign-up, no watermark, no limits."
      mode="invoice"
      faqs={faqs}
      refs={refs}
      toc={[
        { id: "how-to", label: "How to create an invoice" },
        { id: "what-is", label: "What is an invoice?" },
        { id: "what-to-include", label: "What to include" },
        { id: "example", label: "A filled-in example" },
        { id: "types", label: "Types of invoices" },
        { id: "by-trade", label: "Line items by trade" },
        { id: "business-clients", label: "Invoicing US business clients" },
        { id: "sales-tax", label: "Sales tax on invoices" },
        { id: "payment-terms", label: "Payment terms and late fees" },
        { id: "template-vs-generator", label: "Template or generator?" },
        { id: "get-paid-faster", label: "How to get paid faster" },
        { id: "mistakes", label: "Common invoice mistakes" },
        { id: "keep-records", label: "Keeping copies" },
      ]}
    >
      <H2 id="how-to">How to create an invoice in 4 steps</H2>
      <ol className="tool-steps">
        <li>
          <b>Add your business details.</b> Your name or business name, email, phone, address and logo. They&rsquo;re saved in this
          browser, so next time you only fill in the client and the work.
        </li>
        <li>
          <b>Add your client.</b> Use the legal or trading name of the person or company paying you, plus the email of whoever
          handles payment. If they gave you a purchase order (PO) number, add it: many companies&rsquo; accounts payable teams
          won&rsquo;t process an invoice without one.
        </li>
        <li>
          <b>List what you&rsquo;re billing for.</b> One line per service or product, with quantity and rate. Hours work as a
          quantity, so 12.5 hours at $85 is a single line. Add sales tax, a discount or shipping if they apply, and record any
          deposit under <b>Already paid</b>. Totals calculate as you type.
        </li>
        <li>
          <b>Set terms and how to pay, then download.</b> Pick Net 15, Net 30 or a custom due date, add your payment details
          (ACH, Zelle, Venmo or a card payment link), and download the PDF to email or print. Click <b>New invoice</b> when
          you&rsquo;re ready for the next one: your details stay and the number moves up by one.
        </li>
      </ol>

      <H2 id="what-is">What is an invoice?</H2>
      <p>
        An invoice is a written request for payment. It records what you sold or did, for whom, when, for how much, and when
        and how the client should pay. For you, it&rsquo;s the start of a paper trail that supports the income in your books.
        For your client, it&rsquo;s what their bookkeeper or accounts payable team needs to approve and release the money.
      </p>
      <p>
        An invoice is different from the documents around it. An <Link href="/estimate-generator">estimate or quote</Link>{" "}
        comes before the work and says what it will probably cost. A <Link href="/proforma-invoice">proforma invoice</Link>{" "}
        previews the final bill before delivery. A <Link href="/receipt-maker">receipt</Link> comes after payment and
        confirms the money arrived. The invoice sits in the middle: the work is done (or due), and now you&rsquo;re asking to
        be paid.
      </p>

      <H2 id="what-to-include">What to include on an invoice</H2>
      <p>
        A clear invoice gets paid faster because nobody has to email you back with questions. Every invoice you send should
        have:
      </p>
      <ul className="tool-list">
        <li>
          <b>A unique invoice number</b>, so you and your client can find it, match it to a payment and refer to it in emails.
        </li>
        <li>
          <b>The invoice date and the due date</b> (or terms such as Net 30). Without a due date, &ldquo;whenever&rdquo; is
          a reasonable reading.
        </li>
        <li>
          <b>Your details</b>: business name, address, email and phone, so the client knows who to pay and who to call.
        </li>
        <li>
          <b>Your client&rsquo;s details</b>, including the business name they&rsquo;ll pay from and the right contact.
        </li>
        <li>
          <b>An itemized list</b> of services or products, with quantities, rates and line totals. Specific descriptions
          (&ldquo;Homepage design, 2 rounds of revisions&rdquo;) prevent disputes better than vague ones
          (&ldquo;Design work&rdquo;).
        </li>
        <li>
          <b>Tax, discounts and the total due</b>, stated plainly, with any deposit already paid subtracted.
        </li>
        <li>
          <b>How to pay</b>: the exact methods you accept and the details they need to pay you today.
        </li>
        <li>
          <b>A PO number</b> if your client uses purchase orders.
        </li>
      </ul>
      <Figure
        src="/illustrations/invoice-anatomy.svg"
        width={1200}
        height={760}
        alt="Diagram of an invoice with seven numbered parts: logo and business name, invoice number and dates, your contact details, client details and PO number, itemized services, tax and total due, and how to pay."
        caption="The seven parts of a clear invoice. The generator above lays them out for you."
      />

      <H2 id="example">A filled-in example</H2>
      <p>
        Here&rsquo;s what a complete invoice looks like for a freelance web designer billing a small business client. The names
        and figures are illustrative.
      </p>
      <div className="tool-table-wrap">
        <table className="tool-table">
          <caption>Example invoice INV-0042 (illustrative)</caption>
          <tbody>
            <tr>
              <th scope="row">From</th>
              <td>Maya Lopez Design, Austin, TX · maya@example.com</td>
            </tr>
            <tr>
              <th scope="row">Bill to</th>
              <td>Bright Street Bakery LLC, Accounts Payable · ap@example.com</td>
            </tr>
            <tr>
              <th scope="row">Invoice no. / PO</th>
              <td>INV-0042 · PO-1187</td>
            </tr>
            <tr>
              <th scope="row">Dates</th>
              <td>Invoice date Nov 3 · Terms Net 15 · Due Nov 18</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="tool-table-wrap">
        <table className="tool-table">
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
              <td>Homepage design, 2 rounds of revisions</td>
              <td className="num">1</td>
              <td className="num">$1,200.00</td>
              <td className="num">$1,200.00</td>
            </tr>
            <tr>
              <td>Inner page templates (menu, about, contact)</td>
              <td className="num">3</td>
              <td className="num">$350.00</td>
              <td className="num">$1,050.00</td>
            </tr>
            <tr>
              <td>Content updates, October</td>
              <td className="num">4.5</td>
              <td className="num">$80.00</td>
              <td className="num">$360.00</td>
            </tr>
            <tr>
              <td>
                <b>Subtotal</b>
              </td>
              <td />
              <td />
              <td className="num">$2,610.00</td>
            </tr>
            <tr>
              <td>Deposit received Oct 1</td>
              <td />
              <td />
              <td className="num">−$600.00</td>
            </tr>
            <tr>
              <td>
                <b>Balance due</b>
              </td>
              <td />
              <td />
              <td className="num">
                <b>$2,010.00</b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Notice what makes it easy to pay: the PO number the bakery&rsquo;s team asked for, line items specific enough to
        approve without a call, the deposit already credited, and a due date rather than just &ldquo;Net 15&rdquo;. Under
        &ldquo;How to pay&rdquo;, this invoice would list a Zelle email and ACH details. No sales tax is shown because the
        designer&rsquo;s state doesn&rsquo;t tax this service in this example; yours may differ.
      </p>

      <H2 id="types">Types of invoices you can make here</H2>
      <p>The same generator covers the invoices most freelancers and small businesses send. Change the title and notes to suit:</p>
      <ul className="tool-list">
        <li>
          <b>Standard invoice</b>: one-off work or a sale, billed when it&rsquo;s done.
        </li>
        <li>
          <b>Deposit (upfront) invoice</b>: a percentage before you start. Bill it as one line, such as &ldquo;50% deposit,
          kitchen remodel&rdquo;, then record it under Already paid on the final invoice.
        </li>
        <li>
          <b>Progress invoice</b>: for long projects, billed at milestones (&ldquo;Phase 2 of 4: framing complete&rdquo;).
        </li>
        <li>
          <b>Recurring invoice</b>: the same retainer or service every month. Keep the same line items and click New invoice.
        </li>
        <li>
          <b>Hourly or timesheet invoice</b>: hours as the quantity, your hourly rate as the rate, one line per task or week.
        </li>
        <li>
          <b>Final invoice</b>: the closing bill after deposits and progress payments, showing what&rsquo;s left to pay.
        </li>
        <li>
          <b>Credit memo</b>: reduces what a client owes after a return or error. Title it &ldquo;Credit Memo&rdquo; and
          reference the original invoice number in the notes.
        </li>
        <li>
          <b>Past-due invoice</b>: a re-sent invoice after the due date. Keep the original number and date, and add a short note
          about the overdue balance.
        </li>
      </ul>
      <p>
        Billing before delivery, especially for goods or international orders? Use the{" "}
        <Link href="/proforma-invoice">proforma invoice generator</Link> instead.
      </p>

      <H2 id="by-trade">Line items by trade</H2>
      <p>
        Clients pay faster when they can see exactly what they&rsquo;re paying for. Common ways to structure line items:
      </p>
      <div className="tool-table-wrap">
        <table className="tool-table">
          <thead>
            <tr>
              <th>Who&rsquo;s invoicing</th>
              <th>Typical line items</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Freelance designer or developer</th>
              <td>Project phases or deliverables; hourly work as hours × rate; revisions beyond those included</td>
            </tr>
            <tr>
              <th scope="row">Consultant</th>
              <td>Monthly retainer; additional hours; travel and expenses at cost</td>
            </tr>
            <tr>
              <th scope="row">Contractor or handyman</th>
              <td>Labor (hours or fixed price); materials; equipment rental; disposal; deposit credited</td>
            </tr>
            <tr>
              <th scope="row">Cleaning or lawn care</th>
              <td>Visits × rate per visit; add-on services; the service period (e.g. &ldquo;November&rdquo;)</td>
            </tr>
            <tr>
              <th scope="row">Photographer</th>
              <td>Session fee; edited images; prints or albums; travel; usage license</td>
            </tr>
            <tr>
              <th scope="row">Small product business</th>
              <td>Products by SKU and quantity; shipping; sales tax where it applies</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H2 id="business-clients">Invoicing a US business client? Get these right</H2>
      <p>
        Larger clients pay through an accounts payable (AP) team, and AP teams follow rules. Invoices that miss something
        often sit in a queue until someone notices. Before you send:
      </p>
      <ul className="tool-list">
        <li>
          <b>Have a W-9 ready.</b> Form W-9 gives your client your taxpayer identification number so they can report what they
          paid you to the IRS
          <Cite n={1} />. Payments to independent contractors are generally reported on Form 1099-NEC
          <Cite n={2} />, so many clients ask for the W-9 before the first payment.
        </li>
        <li>
          <b>Ask whether they need a PO number</b> and put it on the invoice exactly as they gave it.
        </li>
        <li>
          <b>Match the name they set you up under.</b> If their system lists you as your business name, invoice as that
          business, not as yourself.
        </li>
        <li>
          <b>Never reuse an invoice number.</b> Duplicates look like double billing and get rejected.
        </li>
        <li>
          <b>Send it to the right inbox.</b> Many companies have a dedicated AP email address or supplier portal. Ask for it
          at the start of the project, not when payment is late.
        </li>
      </ul>

      <H2 id="sales-tax">Should you add sales tax?</H2>
      <p>
        It depends on where you are and what you sell. Forty-five states levy a statewide sales tax, and many cities and
        counties add their own local rate on top
        <Cite n={3} />. Some states tax services, others mostly tax goods. Check your state revenue department&rsquo;s
        website, then enter the combined rate in the <b>Tax rate</b> field above. If sales tax doesn&rsquo;t apply, leave it at
        zero. When an invoice mixes taxable and non-taxable items, it&rsquo;s clearest to send two invoices or note which lines
        the tax applies to.
      </p>

      <H2 id="payment-terms">Choosing payment terms (and late fees)</H2>
      <p>
        Shorter terms usually mean faster payment. <b>Due on receipt</b> works for one-off jobs and consumers. <b>Net 15</b> is
        a common default for freelancers. <b>Net 30</b> is what many companies expect, and some will ask for Net 45 or Net 60.
        Whatever you choose, agree it before you start the work and state it on every invoice.
      </p>
      <Figure
        src="/illustrations/payment-terms-timeline.svg"
        width={1200}
        height={430}
        alt="Timeline from the invoice date showing when payment is due: due on receipt at day 0, Net 15 at day 15, Net 30 at day 30, Net 45 at day 45 and Net 60 at day 60."
        caption="Common payment terms, counted from the invoice date."
      />
      <p>
        Two optional extras: an <b>early-payment discount</b> such as &ldquo;2/10 Net 30&rdquo; (2% off if paid within 10
        days, otherwise the full amount in 30), and a <b>late fee</b>. If you use a late fee, put it in your contract, repeat it
        in the invoice notes, and keep it reasonable: rules on late fees and interest vary by state.
      </p>

      <H2 id="template-vs-generator">Invoice template or invoice generator?</H2>
      <p>
        Both get you a professional invoice. The difference is how much of the work you do by hand.
      </p>
      <div className="tool-table-wrap">
        <table className="tool-table">
          <thead>
            <tr>
              <th />
              <th>Invoice generator (this page)</th>
              <th>Word, Excel or Google Docs template</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Math</th>
              <td>Line totals, tax, discounts and balance calculate automatically</td>
              <td>Manual in Word and Docs; formulas in Excel and Sheets</td>
            </tr>
            <tr>
              <th scope="row">Due date</th>
              <td>Set from your payment terms</td>
              <td>Typed by hand</td>
            </tr>
            <tr>
              <th scope="row">Numbering</th>
              <td>Moves to the next number for you</td>
              <td>Easy to repeat a number by mistake</td>
            </tr>
            <tr>
              <th scope="row">Output</th>
              <td>A clean PDF, ready to email or print</td>
              <td>Export or print to PDF yourself</td>
            </tr>
            <tr>
              <th scope="row">Best for</th>
              <td>Fast, consistent invoices on any device</td>
              <td>Heavily custom layouts you want to design yourself</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H2 id="get-paid-faster">How to get paid faster</H2>
      <ol className="tool-steps">
        <li>
          <b>Invoice the day the work is done.</b> Every day you wait is a day added to your payment time.
        </li>
        <li>
          <b>Make paying effortless.</b> List every method you accept, with the details filled in. A card payment link or
          Zelle email gets paid sooner than &ldquo;contact me for bank details&rdquo;.
        </li>
        <li>
          <b>Write a useful subject line</b>: &ldquo;Invoice INV-0042 from Maya Lopez Design, $2,010 due Nov 18&rdquo;.
        </li>
        <li>
          <b>Send a friendly reminder before the due date</b>, not just after it. It&rsquo;s the least awkward follow-up you
          can send.
        </li>
        <li>
          <b>Follow up on a schedule</b> once it&rsquo;s late: a polite nudge on the due date, another a week later, then a
          call. Keep every message short, specific and friendly.
        </li>
      </ol>

      <H2 id="mistakes">Common invoice mistakes to avoid</H2>
      <ul className="tool-list">
        <li>
          <b>No due date</b>, or terms the client never agreed to.
        </li>
        <li>
          <b>Vague line items</b> that force the client to ask what they&rsquo;re paying for.
        </li>
        <li>
          <b>Missing PO number</b> for a client that uses them.
        </li>
        <li>
          <b>Wrong client name</b>: the person you worked with instead of the company that pays.
        </li>
        <li>
          <b>Duplicate or skipped invoice numbers</b> that make your records hard to follow.
        </li>
        <li>
          <b>No payment instructions</b>, or instructions buried in an old email thread.
        </li>
        <li>
          <b>Math errors</b> from hand-typed totals. Let the generator calculate them.
        </li>
      </ul>

      <H2 id="keep-records">Keep a copy of every invoice</H2>
      <p>
        Invoices are part of the records that back up the income on your tax return, alongside receipts, deposit slips and
        Forms 1099
        <Cite n={4} />. The IRS generally asks you to keep records for at least three years, and longer in some situations
        <Cite n={5} />. Download the PDF and file it with your books. When a client pays, send them a receipt with the{" "}
        <Link href="/receipt-maker">free receipt maker</Link>. For more on getting paid, read the{" "}
        <Link href="/blog">InvoiceDodo blog</Link>.
      </p>

      <div className="tool-callout">
        <p>
          <b>Tired of chasing late payments?</b> InvoiceDodo is building invoicing that sends polite reminders for you, so you
          don&rsquo;t have to. <Link href="/#join">Join early access</Link>.
        </p>
      </div>
    </ToolPage>
  );
}
