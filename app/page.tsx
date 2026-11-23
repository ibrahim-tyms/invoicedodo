import { Dodo } from "./components/Brand";
import { ClientTabs } from "./components/ClientTabs";
import { Headline, Kicker, Stage } from "./components/Frame";
import { HeroDemo } from "./components/HeroDemo";
import { DodoMascot } from "./components/Mascot";
import { SiteFooter } from "./components/SiteFooter";
import { SiteNav } from "./components/SiteNav";
import { WaitlistForm } from "./components/WaitlistForm";
import { ORG_ID, SITE, WEBSITE_ID, jsonLd, organizationLd, websiteLd } from "./lib/site";

export default async function Home() {
  // Blog link appears in the nav once the first post is published (revalidated by the Prismic webhook).
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      organizationLd,
      websiteLd,
      {
        "@type": "WebPage",
        "@id": `${SITE.url}/#webpage`,
        url: SITE.url,
        name: SITE.homeTitle,
        description: SITE.homeDescription,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": `${SITE.url}/#app` },
        inLanguage: "en-US",
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE.url}/#app`,
        name: SITE.name,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Invoicing",
        operatingSystem: "Web",
        description: SITE.description,
        url: SITE.url,
        publisher: { "@id": ORG_ID },
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/PreOrder" },
        featureList: [
          "Invoices drafted from a sentence or a file",
          "Automatic, polite payment reminders",
          "Client pay-date promises",
          "Send invoice, W-9 and PO to the client's finance team",
          "Works with Stripe, PayPal and Square",
          "Syncs paid invoices to Tyms, QuickBooks or Xero",
          "Tax set-aside on every payment",
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE.url}/#faq`,
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(ld)} />
      <a href="#main" className="skip">
        Skip to content
      </a>

      <SiteNav onHome />

      {/* ===================== HERO (mint) ===================== */}
      <header className="hero" data-accent="mint">
        <div className="wrap">

          <div className="hero-top" id="top">
            <div>
              <Headline as="h1" lead="Get paid on time." highlight="Without the chase." />
            </div>
            <div className="hero-side">
              <p className="lead">
                Free invoicing software that sends your invoices, chases them for you, and tells you
                what to set aside for tax.
              </p>
              <div id="join" className="anchor-target">
                <WaitlistForm source="hero" />
              </div>
            </div>
          </div>

          <div className="demo-wrap">
            <span className="peek peek-demo" aria-hidden="true">
              <DodoMascot pose="front" size={84} />
            </span>
            <HeroDemo />
          </div>
        </div>
      </header>

      <main id="main">
        {/* ===================== SOUND FAMILIAR ===================== */}
        <section className="familiar" aria-labelledby="familiar-h">
          <div className="wrap">
            <h2 id="familiar-h" className="familiar-h">
              Sound familiar?
            </h2>
            <ul className="familiar-list">
              <li>&ldquo;I hate chasing. I feel like I&rsquo;m bothering them.&rdquo;</li>
              <li>&ldquo;They said they&rsquo;d pay next week. That was a month ago.&rdquo;</li>
              <li>&ldquo;It&rsquo;s stuck with their accounts team. Again.&rdquo;</li>
            </ul>
            <p className="familiar-src">
              Things freelancers and small businesses say about getting paid. We built InvoiceDodo
              so you never have to say them again.
            </p>
          </div>
        </section>

        {/* ===================== FOLLOW-UPS (amber) ===================== */}
        <section className="sec" id="follow-ups" data-accent="amber" aria-labelledby="fu-h">
          <div className="wrap split">
            <div className="split-text">
              <Kicker>Follow-ups</Kicker>
              <Headline id="fu-h" lead="Chasing clients is now" highlight="Dodo's job." />
              <p className="body-lg">
                You did the work. You shouldn&rsquo;t also have to be the debt collector. Dodo sends
                friendly reminders in your voice, starting before the due date, and stops the moment
                your client picks a pay date or pays.
              </p>
              <ul className="ticks">
                <li>Starts before the due date, when a nudge feels helpful, not pushy</li>
                <li>Sounds like you: friendly, neutral or firm</li>
                <li>Pauses on its own when a client promises a date</li>
              </ul>
            </div>

            <Stage
              mascot={<DodoMascot pose="peck" size={64} delay={1.3} className="stage-dodo stage-dodo-peck" />}
            >
              <div className="sheet schedule">
                <div className="sch-head">
                  <div>
                    <span className="label">Reminders for #1042</span>
                    <b>Acme Studio · $1,140.00</b>
                  </div>
                  <div className="tone" aria-hidden="true">
                    <span className="on">Friendly</span>
                    <span>Neutral</span>
                    <span>Firm</span>
                  </div>
                </div>
                <ol className="sch-list">
                  <li className="done">
                    <span className="sch-dot" />
                    <div>
                      <b>Tue, Dec 12 · Heads-up</b>
                      <span>Sent 3 days before it&rsquo;s due</span>
                    </div>
                    <span className="status s-paid">Sent</span>
                  </li>
                  <li className="paused">
                    <span className="sch-dot" />
                    <div>
                      <b>Fri, Dec 15 · Due today</b>
                      <span>Paused. Sam promised to pay on Dec 15</span>
                    </div>
                    <span className="status s-promised">Paused</span>
                  </li>
                  <li className="paused">
                    <span className="sch-dot" />
                    <div>
                      <b>Mon, Dec 18 · Gentle follow-up</b>
                      <span>Only goes out if the promise is missed</span>
                    </div>
                    <span className="status s-draft">If needed</span>
                  </li>
                </ol>
                <div className="email">
                  <span className="label">What Sam received</span>
                  <p>
                    Hi Sam, a quick note that invoice #1042 for $1,140 is due Friday. You can pay or
                    ask a question here. Thanks! Ana
                  </p>
                </div>
              </div>
            </Stage>
          </div>
        </section>

        {/* ===================== CLIENTS (sky) ===================== */}
        <section className="sec" id="clients" data-accent="sky" aria-labelledby="cl-h">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <Kicker>Your clients</Kicker>
                <Headline id="cl-h" lead="Other tools send invoices." highlight="Dodo gets them paid." />
              </div>
              <p className="sec-head-aside">
                Most late payments aren&rsquo;t bad intent. They&rsquo;re a question nobody asked, a PO
                number nobody had, or an invoice stuck in an inbox. So we fixed your client&rsquo;s side
                too.
              </p>
            </div>
            <ClientTabs />
          </div>
        </section>

        {/* ===================== ANY INPUT (mint) ===================== */}
        <section className="sec" data-accent="mint" aria-labelledby="in-h">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <Kicker>Thirty seconds</Kicker>
                <Headline id="in-h" lead="Describe the work." highlight="Dodo does the rest." />
              </div>
              <p className="sec-head-aside">
                No templates to fill in. Write a sentence, or drop in a quote or timesheet. Dodo
                builds a clean invoice you can send as it is.
              </p>
            </div>

            <Stage className="stage-wide">
              <div className="sheet composer">
                <div className="prompt">
                  <span className="label">You wrote</span>
                  <p>
                    Brand refresh for Acme Studio: logo, 3 rounds of revisions, social kit. $1,140, due
                    in 14 days. Sam handles billing.
                    <span className="caret" aria-hidden="true" />
                  </p>
                  <div className="files">
                    <span>acme-quote.pdf</span>
                  </div>
                </div>
                <div className="draft">
                  <div className="draft-head">
                    <span className="thinking">
                      <Dodo size={20} className="peck" /> Dodo drafted this
                    </span>
                    <span className="di-num">INV-1042</span>
                  </div>
                  <table className="lines">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th className="r">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Logo design</td>
                        <td className="r">$640.00</td>
                      </tr>
                      <tr>
                        <td>Revisions (3 rounds)</td>
                        <td className="r">$300.00</td>
                      </tr>
                      <tr>
                        <td>Social media kit</td>
                        <td className="r">$200.00</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="draft-total">
                    <span>
                      To Sam Patel, Acme Studio
                      <br />
                      Due Fri, Dec 15
                    </span>
                    <span className="amount-lg">$1,140.00</span>
                  </div>
                </div>
              </div>
            </Stage>

            <ul className="cols3">
              <li>
                <h3>Write a sentence</h3>
                <p>&ldquo;Two days of consulting for Northwind, $1,800.&rdquo; That&rsquo;s an invoice.</p>
              </li>
              <li>
                <h3>Or drop in a file</h3>
                <p>A quote, a timesheet, a contract. Dodo pulls out the line items and the client.</p>
              </li>
              <li>
                <h3>Clean enough for any accounts team</h3>
                <p>Unique invoice numbers and a PO field when your client needs one.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* ===================== GET PAID YOUR WAY (sky) ===================== */}
        <section className="sec" id="get-paid" data-accent="sky" aria-labelledby="gp-h">
          <div className="wrap split split-rev">
            <Stage
              label="Connections"
              mascot={
                <span className="stage-dodo stage-dodo-fly" aria-hidden="true">
                  <span className="dodo-bubble">Can&rsquo;t fly. Can match payments.</span>
                  <DodoMascot pose="fly" size={70} delay={0.6} />
                </span>
              }
            >
              <div className="sheet connect">
                <div className="sch-head">
                  <div>
                    <span className="label">Get paid with</span>
                    <b>The accounts you already have</b>
                  </div>
                </div>
                <ul className="cx-list">
                  {PROVIDERS.map((p) => (
                    <li key={p.name}>
                      <span className="cx-logos" aria-hidden="true">
                        {p.logos.map((l) => (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img key={l} src={`/integrations/${l}.svg`} alt="" width={20} height={20} />
                        ))}
                      </span>
                      <div>
                        <b>{p.name}</b>
                        <span>{p.what}</span>
                      </div>
                      <span className={`status ${p.on ? "s-paid" : "s-draft"}`}>
                        {p.on ? "Connected" : "Connect"}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="cx-match">
                  <Dodo size={22} />
                  <p>
                    <b>$1,140 from Acme Studio landed in Stripe.</b> Matched to #1042, marked paid,
                    reminders stopped.
                  </p>
                </div>
              </div>
            </Stage>

            <div className="split-text">
              <Kicker>Get paid your way</Kicker>
              <Headline id="gp-h" lead="Keep how you get paid." highlight="Lose the chase." />
              <p className="body-lg">
                Already take payments with Stripe, PayPal or Square? Connect it in a couple of
                clicks. Your money keeps landing where it always has, at your usual rates. Dodo adds
                the invoice, the client page and the follow-ups on top, and the moment a payment
                lands it matches it to the invoice and stops the reminders.
              </p>
              <ul className="ticks">
                <li>No new merchant account, no moving your payout history</li>
                <li>Cards, Apple Pay, bank transfer, PayPal, Venmo: whatever your client prefers</li>
                <li>Paid by Zelle or check? One tap marks it paid and keeps your records whole</li>
                <li>Paid invoices sync to Tyms, QuickBooks or Xero, so your books stay in step</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ===================== TAXES (amber) ===================== */}
        <section className="sec" id="taxes" data-accent="amber" aria-labelledby="tx-h">
          <div className="wrap split">
            <div className="split-text">
              <Kicker>Taxes</Kicker>
              <Headline id="tx-h" lead="April stops being" highlight="a surprise." />
              <p className="body-lg">
                Every payment tells you what to put aside, so the quarterly bill is already covered
                when it comes. Dodo answers the sales-tax question in plain English (for most
                services, the answer is no) and keeps year-end totals ready for your accountant.
              </p>
              <ul className="ticks">
                <li>A set-aside amount on every payment you receive</li>
                <li>A heads-up before each quarterly estimated tax date</li>
                <li>A plain-English sales-tax check for your work and your state</li>
                <li>1099-ready totals per client, with W-9s kept alongside</li>
              </ul>
            </div>

            <Stage label="Taxes">
              <div className="sheet tax">
                <div className="sch-head">
                  <div>
                    <span className="label">Payment received · #1042</span>
                    <b>Acme Studio · $1,140.00</b>
                  </div>
                  <span className="status s-paid">Paid</span>
                </div>

                <div className="tx-aside">
                  <div>
                    <span className="label">Put aside for taxes</span>
                    <span className="tx-amt">$285.00</span>
                  </div>
                  <span className="tx-rate">25% of this payment</span>
                </div>

                <div className="tx-pot">
                  <div className="tx-pot-row">
                    <span>Set aside this quarter</span>
                    <b>$3,940 of ~$4,600</b>
                  </div>
                  <span className="tx-bar" aria-hidden="true">
                    <span style={{ width: "86%" }} />
                  </span>
                  <span className="tx-due">Next estimated payment due Jan 15, 2027</span>
                </div>

                <ul className="tx-checks">
                  <li>
                    <span className="tx-ok" aria-hidden="true" />
                    <div>
                      <b>Sales tax: not needed</b>
                      <span>Brand design for a client in Oregon. Oregon has no sales tax.</span>
                    </div>
                  </li>
                  <li>
                    <span className="tx-ok" aria-hidden="true" />
                    <div>
                      <b>1099 total for Acme Studio: $14,820</b>
                      <span>W-9 on file · Ready to share with your accountant</span>
                    </div>
                  </li>
                </ul>
                <p className="tx-note">Estimates to help you plan, not tax advice.</p>
              </div>
            </Stage>
          </div>
        </section>

        {/* ===================== PRICING (mint) ===================== */}
        <section className="sec" id="pricing" data-accent="mint" aria-labelledby="pr-h">
          <div className="wrap split split-rev">
            <Stage>
              <div className="sheet payout">
                <div className="sch-head">
                  <div>
                    <span className="label">Payment for #1042</span>
                    <b>Acme Studio</b>
                  </div>
                  <span className="status s-paid">Paid</span>
                </div>
                <ol className="steps">
                  <li className="done">
                    <span className="sch-dot" />
                    <div>
                      <b>Paid by Acme</b>
                      <span>Fri, Dec 15 · Bank transfer via your Stripe</span>
                    </div>
                  </li>
                  <li className="done">
                    <span className="sch-dot" />
                    <div>
                      <b>On its way</b>
                      <span>Cleared, no holds</span>
                    </div>
                  </li>
                  <li>
                    <span className="sch-dot" />
                    <div>
                      <b>In your bank</b>
                      <span>Arrives Mon, Dec 18</span>
                    </div>
                  </li>
                </ol>
                <dl className="sum">
                  <div>
                    <dt>Invoice total</dt>
                    <dd>$1,140.00</dd>
                  </div>
                  <div>
                    <dt>InvoiceDodo fee</dt>
                    <dd>$0.00</dd>
                  </div>
                  <div className="you-get">
                    <dt>Paid into</dt>
                    <dd>Your Stripe account</dd>
                  </div>
                </dl>
              </div>
            </Stage>

            <div className="split-text">
              <Kicker>Pricing</Kicker>
              <Headline id="pr-h" lead="Free to use." highlight="We don't take a cut." />
              <p className="body-lg">
                Invoices, clients and reminders cost nothing, and InvoiceDodo never takes a fee from
                your payments. Clients pay through the Stripe, PayPal or Square account you connect,
                at that provider&rsquo;s usual rates, or by Zelle, check or bank transfer.
              </p>
              <ul className="ticks">
                <li>No InvoiceDodo fee on any payment</li>
                <li>Unlimited invoices and clients</li>
                <li>Automatic reminders included, not an upgrade</li>
                <li>You always see where your money is</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ===================== FAQ ===================== */}
        <section className="sec faq-sec" id="faq" aria-labelledby="faq-h">
          <div className="wrap faq-wrap">
            <div className="faq-side">
              <h2 id="faq-h" className="h2 faq-h">
                Questions
              </h2>
              <DodoMascot pose="front" size={88} delay={2.1} className="faq-dodo" />
            </div>
            <div className="faq">
              {FAQ.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ===================== FOOTER (mint) ===================== */}
      <SiteFooter source="footer" onHome />
    </>
  );
}

const PROVIDERS = [
  { name: "Stripe", logos: ["stripe", "applepay"], what: "Cards, Apple Pay, bank transfer (ACH)", on: true },
  { name: "PayPal", logos: ["paypal", "venmo"], what: "PayPal and Venmo checkout", on: true },
  { name: "Square", logos: ["square", "cashapp"], what: "Cards and Cash App Pay", on: false },
  { name: "Tyms, QuickBooks or Xero", logos: ["tyms", "quickbooks", "xero"], what: "Paid invoices sync to your books", on: true },
  { name: "Zelle, check or cash", logos: ["zelle"], what: "Mark it paid in one tap", on: true },
];

const FAQ = [
  {
    q: "When can I start using it?",
    a: "We're inviting people in small batches while we finish the first version. Join the list and you'll hear from us first.",
  },
  {
    q: "Who is it for?",
    a: "Freelancers, studios and small service businesses who send invoices and would rather not spend their week chasing them.",
  },
  {
    q: "Do my clients need an account?",
    a: "No. They get a link to your invoice, where they can pay, pick a pay date, ask a question or forward it to their finance team.",
  },
  {
    q: "Can I keep my Stripe, PayPal or Square account?",
    a: "Yes. Connect the account you already use and payments keep landing there, at your usual rates. Dodo handles the invoice, the client page and the reminders, and marks the invoice paid when the money arrives. Paid some other way, like Zelle or a check? Mark it paid in one tap. Paid invoices can also sync to Tyms, QuickBooks or Xero.",
  },
  {
    q: "Does it help with taxes?",
    a: "Yes. Every payment shows a suggested amount to set aside, you get a heads-up before quarterly estimated tax dates, and Dodo tells you in plain English whether your work needs sales tax. Year-end totals per client are ready for your accountant. It's there to help you plan, not to replace tax advice.",
  },
  {
    q: "What does it cost?",
    a: "Nothing. Sending invoices and reminders is free, and InvoiceDodo doesn't take a fee from your payments. When a client pays online, the money goes to the Stripe, PayPal or Square account you connect, and only that provider's usual fees apply.",
  },
  {
    q: "Will reminders annoy my clients?",
    a: "They're short, polite and written in your voice. The first one goes out before the due date, and they stop as soon as your client commits to a date or pays.",
  },
];
