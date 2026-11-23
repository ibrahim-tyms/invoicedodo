import type { Metadata } from "next";
import Link from "next/link";
import { Figure, H2, ToolPage, type Faq } from "../tools/ToolPage";

const PATH = "/estimate-generator";
const TITLE = "Free Estimate & Quote Generator: Download a PDF | InvoiceDodo";
const DESCRIPTION =
  "Create a professional estimate or quote in minutes. Free estimate generator with no sign-up: add line items, tax and a valid-until date, then download a PDF for your client to sign.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: ["estimate generator", "free estimate template", "quote generator", "free quotation template", "estimate template", "job estimate template"],
  alternates: { canonical: PATH },
  openGraph: { type: "website", url: PATH, title: TITLE, description: DESCRIPTION },
};

const faqs: Faq[] = [
  {
    q: "What's the difference between an estimate and a quote?",
    a: "An estimate is an approximate price that can change as the job develops. A quote is usually a fixed price for a defined scope. Change the title to Quote if you're committing to a fixed price.",
  },
  {
    q: "What should an estimate include?",
    a: "Your details, the client's details, an estimate number and date, a valid-until date, an itemized list of labor and materials, tax, the estimated total, what's included and excluded, and a place for the client to accept.",
  },
  {
    q: "How long should an estimate be valid?",
    a: "Thirty days is common, but use a shorter window if your material costs move quickly. The valid-until date protects you from being held to an old price.",
  },
  {
    q: "Is an estimate legally binding?",
    a: "An estimate on its own is generally treated as an approximation, not a promise. Once a client signs to accept it, it can become part of your agreement, so make sure the scope and exclusions are written the way you mean them. For larger jobs, use a proper contract.",
  },
  {
    q: "Should I charge for estimates?",
    a: "Many trades give simple estimates free to win work. For estimates that take real time, such as site surveys, design or detailed takeoffs, charging a fee (often credited against the job if the client goes ahead) is common.",
  },
  {
    q: "How detailed should my line items be?",
    a: "Detailed enough that the client can see what drives the price and compare it fairly, but grouped so the estimate stays readable. Separating labor, materials and any subcontracted work is a good default.",
  },
  {
    q: "What if the job changes after the client accepts?",
    a: "Send a revised estimate or a written change order for the new work before you do it, and get approval. It keeps the final invoice free of surprises.",
  },
  {
    q: "Is this estimate generator free?",
    a: "Yes. No sign-up, no watermark and no limit. Your details are saved in this browser only.",
  },
  {
    q: "How do I turn an estimate into an invoice?",
    a: "Once the client accepts and the work is done, open the free invoice generator, add the same line items (adjusted for any changes), record any deposit as already paid, and set your payment terms.",
  },
];

export default function EstimateGeneratorPage() {
  return (
    <ToolPage
      path={PATH}
      name="Estimate & Quote Generator"
      kicker="Free tool"
      h1="Free estimate and quote generator"
      intro="Price the job before you start. Itemize labor and materials, set a valid-until date and download a PDF your client can sign. No sign-up."
      mode="estimate"
      faqs={faqs}
      toc={[
        { id: "how-to", label: "Writing an estimate" },
        { id: "what-is", label: "What is an estimate?" },
        { id: "what-to-include", label: "What to include" },
        { id: "example", label: "A filled-in example" },
        { id: "estimate-quote-bid", label: "Estimate, quote or bid?" },
        { id: "pricing", label: "Pricing the job" },
        { id: "best-practices", label: "Best practices" },
        { id: "by-trade", label: "Line items by trade" },
        { id: "mistakes", label: "Common mistakes" },
        { id: "who-uses", label: "Who uses estimates" },
        { id: "after", label: "After the client accepts" },
      ]}
    >
      <H2 id="how-to">How to write an estimate clients say yes to</H2>
      <ol className="tool-steps">
        <li>
          <b>Itemize.</b> Break the job into labor and materials lines. Clients trust a price they can see the parts of.
        </li>
        <li>
          <b>Spell out the scope.</b> Use Notes to say what&rsquo;s included, what isn&rsquo;t, and any assumptions.
        </li>
        <li>
          <b>Set a valid-until date</b> so you&rsquo;re not held to old prices.
        </li>
        <li>
          <b>Ask for a signature.</b> The PDF includes an acceptance line, so you have written approval before you start.
        </li>
      </ol>

      <H2 id="what-is">What is an estimate?</H2>
      <p>
        An estimate is a document that tells a client what a job will probably cost before any work begins. It sets
        expectations on price, scope and timing, gives the client something concrete to approve, and gives you a record of
        what was agreed. A good estimate also does quiet selling: a clear, itemized, professional document signals that the
        job will be run the same way.
      </p>

      <H2 id="what-to-include">What to include in an estimate</H2>
      <ul className="tool-list">
        <li>
          <b>Your business details and logo</b>, plus any license number your trade requires you to show.
        </li>
        <li>
          <b>The client&rsquo;s name and the job address</b>.
        </li>
        <li>
          <b>An estimate number and date</b>, so revisions are easy to tell apart (EST-0031, then EST-0031-B).
        </li>
        <li>
          <b>A valid-until date</b>.
        </li>
        <li>
          <b>Itemized labor and materials</b>, with quantities and rates.
        </li>
        <li>
          <b>Tax, discounts and the estimated total</b>.
        </li>
        <li>
          <b>Scope, exclusions and assumptions</b> in the notes, such as &ldquo;Excludes permit fees&rdquo; or &ldquo;Assumes
          existing wiring is to code&rdquo;.
        </li>
        <li>
          <b>Deposit and payment terms</b> if you&rsquo;ll require money upfront.
        </li>
        <li>
          <b>An acceptance line</b> for the client&rsquo;s signature and date. The PDF adds it automatically.
        </li>
      </ul>

      <H2 id="example">A filled-in example</H2>
      <p>A painter estimating an interior job. Names and figures are illustrative.</p>
      <div className="tool-table-wrap">
        <table className="tool-table">
          <caption>Example estimate EST-0031, valid 30 days (illustrative)</caption>
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
              <td>Labor: prep, patch and paint living room and hallway (walls and trim)</td>
              <td className="num">22</td>
              <td className="num">$55.00</td>
              <td className="num">$1,210.00</td>
            </tr>
            <tr>
              <td>Paint, premium interior eggshell (gallons)</td>
              <td className="num">6</td>
              <td className="num">$58.00</td>
              <td className="num">$348.00</td>
            </tr>
            <tr>
              <td>Supplies: tape, drop cloths, filler</td>
              <td className="num">1</td>
              <td className="num">$75.00</td>
              <td className="num">$75.00</td>
            </tr>
            <tr>
              <td>
                <b>Estimated total</b>
              </td>
              <td />
              <td />
              <td className="num">
                <b>$1,633.00</b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The notes on this estimate would say: ceilings not included; price assumes no drywall replacement; 30% deposit to
        schedule; balance due on completion. That&rsquo;s the difference between an estimate that gets accepted and one that
        turns into an argument later.
      </p>

      <H2 id="estimate-quote-bid">Estimate, quote or bid?</H2>
      <p>
        People use the words loosely, but the difference matters if the job changes. An <b>estimate</b> is your best
        approximation. A <b>quote</b> is a fixed price for the scope described. A <b>bid</b> is a price submitted to win
        competitive work. Rename the document at the top of the form to match what you&rsquo;re offering.
      </p>
      <Figure
        src="/illustrations/estimate-quote-bid.svg"
        width={1200}
        height={460}
        alt="Comparison of three pricing documents: an estimate is an approximate price that can change, a quote is a fixed price for a defined scope, and a bid is a competitive offer to win a contract."
        caption="Pick the word that matches how firm your price is."
      />

      <H2 id="pricing">Pricing the job</H2>
      <p>Most estimates are built from the same four pieces:</p>
      <ul className="tool-list">
        <li>
          <b>Labor</b>: hours (or days) times your rate, by task or by trade.
        </li>
        <li>
          <b>Materials</b>: quantities and unit prices, with a little allowance for waste where it applies.
        </li>
        <li>
          <b>Subcontractors and equipment</b>: any work or rentals you&rsquo;re buying in.
        </li>
        <li>
          <b>Overhead and profit</b>: built into your rates or added as a markup, so the job pays for your insurance, vehicle,
          tools and time spent estimating.
        </li>
      </ul>
      <p>
        If prices for a material are volatile, say so and shorten the valid-until date, or list that item as an allowance
        that will be adjusted to the actual cost.
      </p>

      <H2 id="best-practices">Best practices</H2>
      <ol className="tool-steps">
        <li>
          <b>Visit or ask before you price.</b> Photos, measurements and a short call prevent most bad surprises.
        </li>
        <li>
          <b>Send it quickly.</b> A clear estimate the same or next day often wins over a cheaper one that arrives later.
        </li>
        <li>
          <b>Write the scope in plain English.</b> The client should be able to tell exactly what they&rsquo;re getting.
        </li>
        <li>
          <b>List exclusions.</b> What you don&rsquo;t include is as important as what you do.
        </li>
        <li>
          <b>Offer options when it helps</b>, such as good, better and best materials, as separate estimates.
        </li>
        <li>
          <b>Follow up</b> a few days later with a short, friendly message.
        </li>
        <li>
          <b>Keep every version.</b> Number revisions so everyone is looking at the same document.
        </li>
      </ol>

      <H2 id="by-trade">Line items by trade</H2>
      <p>
        Not sure how to break a job down? These are typical ways to structure an estimate. Use them as a starting point and
        adjust to how you actually price your work.
      </p>
      <div className="tool-table-wrap">
        <table className="tool-table">
          <thead>
            <tr>
              <th>Trade</th>
              <th>Typical line items</th>
              <th>Notes worth adding</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Painting</th>
              <td>Labor by room or by hour; paint by gallon; primer; supplies</td>
              <td>Number of coats, whether ceilings and trim are included</td>
            </tr>
            <tr>
              <th scope="row">Plumbing</th>
              <td>Service call; labor by hour; fixtures and parts; disposal</td>
              <td>What happens if hidden damage is found</td>
            </tr>
            <tr>
              <th scope="row">Electrical</th>
              <td>Labor; devices and fixtures; wire and materials; permit</td>
              <td>Who pulls the permit, inspection timing</td>
            </tr>
            <tr>
              <th scope="row">Landscaping and lawn care</th>
              <td>Labor; plants and materials by unit; equipment; haul-away</td>
              <td>Visit frequency, season, watering responsibilities</td>
            </tr>
            <tr>
              <th scope="row">Cleaning</th>
              <td>Rate per visit, per room or per square foot; add-ons (oven, windows)</td>
              <td>Supplies included or not, frequency discounts</td>
            </tr>
            <tr>
              <th scope="row">Auto repair</th>
              <td>Parts by part number; labor hours; shop supplies; diagnostics</td>
              <td>Parts brand or grade, warranty on work</td>
            </tr>
            <tr>
              <th scope="row">Web design</th>
              <td>Design; build by page or template; content; revisions; hosting setup</td>
              <td>Rounds of revisions, what counts as a change request</td>
            </tr>
            <tr>
              <th scope="row">Events and catering</th>
              <td>Per-guest food price; staff hours; rentals; travel</td>
              <td>Final guest count deadline, deposit to hold the date</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H2 id="mistakes">Common estimate mistakes</H2>
      <ul className="tool-list">
        <li>
          <b>One lump sum</b> with no breakdown, which invites haggling over the whole number.
        </li>
        <li>
          <b>No exclusions</b>, so the client assumes everything is included.
        </li>
        <li>
          <b>No expiry date</b>, leaving you tied to last season&rsquo;s material prices.
        </li>
        <li>
          <b>Forgetting overhead</b>: travel time, disposal, permits and the time spent on the estimate itself.
        </li>
        <li>
          <b>Starting without a signature</b>, then disagreeing about what was approved.
        </li>
        <li>
          <b>Changing scope verbally</b> instead of sending a revised estimate or change order.
        </li>
      </ul>

      <H2 id="who-uses">Who uses estimates</H2>
      <p>
        Estimates are standard in <b>construction and remodeling</b>, <b>painting</b>, <b>plumbing</b>, <b>electrical</b>,{" "}
        <b>roofing</b>, <b>landscaping and lawn care</b>, <b>cleaning</b>, <b>auto repair</b> and <b>moving</b>, as well as for
        creative and professional work like <b>web design</b>, <b>photography</b>, <b>events and catering</b> and{" "}
        <b>consulting</b>. Anywhere the price depends on the specifics of the job, an estimate makes the conversation easier.
      </p>

      <H2 id="after">After the client accepts</H2>
      <p>
        Keep the signed estimate with your records. If you need money before starting, send a deposit invoice or a{" "}
        <Link href="/proforma-invoice">proforma invoice</Link>. When the work is done, create the bill in the{" "}
        <Link href="/invoice-generator">free invoice generator</Link>, credit the deposit under Already paid, and send a{" "}
        <Link href="/receipt-maker">receipt</Link> once you&rsquo;re paid.
      </p>
      <Figure
        src="/illustrations/document-flow.svg"
        width={1200}
        height={450}
        alt="Four-step flow of business documents: an estimate prices the job, an invoice asks for payment, the client pays, and a receipt confirms the payment."
        caption="The estimate is step one. The invoice and receipt follow."
      />

      <div className="tool-callout">
        <p>
          <b>Want accepted estimates to turn into invoices in one click?</b> That&rsquo;s on the InvoiceDodo roadmap.{" "}
          <Link href="/#join">Join early access</Link>.
        </p>
      </div>
    </ToolPage>
  );
}
