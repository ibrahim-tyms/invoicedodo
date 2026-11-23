import { Dodo, Logo } from "./components/Brand";
import { ClientTabs } from "./components/ClientTabs";
import { Headline, Kicker, Stage } from "./components/Frame";
import { HeroDemo } from "./components/HeroDemo";
import { WaitlistForm } from "./components/WaitlistForm";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>

      {/* ===================== HERO (mint) ===================== */}
      <header className="hero" data-accent="mint">
        <div className="wrap">
          <nav className="nav" aria-label="Main">
            <a href="#top" className="nav-logo" aria-label="InvoiceDodo home">
              <Logo height={30} />
            </a>
            <ul className="nav-links">
              <li>
                <a href="#follow-ups">How it works</a>
              </li>
              <li>
                <a href="#clients">For your clients</a>
              </li>
              <li>
                <a href="#pricing">Pricing</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
            </ul>
            <a href="#join" className="btn btn-primary btn-sm">
              Get early access
            </a>
          </nav>

          <div className="hero-top" id="top">
            <div>
              <Kicker>Early access · Coming soon</Kicker>
              <Headline as="h1" lead="Get paid on time." highlight="Without the chase." />
            </div>
            <div className="hero-side">
              <p className="lead">
                Describe your work and Dodo builds the invoice, sends it, and follows up for you,
                politely, before it ever gets awkward.
              </p>
              <div id="join" className="anchor-target">
                <WaitlistForm source="hero" />
              </div>
            </div>
          </div>

          <HeroDemo />
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

            <Stage>
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

        {/* ===================== PRICING (amber) ===================== */}
        <section className="sec" id="pricing" data-accent="amber" aria-labelledby="pr-h">
          <div className="wrap split">
            <div className="split-text">
              <Kicker>Pricing</Kicker>
              <Headline id="pr-h" lead="Free to use." highlight="No surprises." />
              <p className="body-lg">
                Invoices, clients and reminders cost nothing. When a client pays online, a small
                processing fee applies, and you see exactly what you&rsquo;ll receive before you
                send.
              </p>
              <ul className="ticks">
                <li>Unlimited invoices and clients</li>
                <li>Automatic reminders included, not an upgrade</li>
                <li>You always see where your money is</li>
              </ul>
            </div>

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
                      <span>Fri, Dec 15 · Bank transfer</span>
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
                    <dt>Processing fee</dt>
                    <dd>−$9.12</dd>
                  </div>
                  <div className="you-get">
                    <dt>You receive</dt>
                    <dd>$1,130.88</dd>
                  </div>
                </dl>
              </div>
            </Stage>
          </div>
        </section>

        {/* ===================== FAQ ===================== */}
        <section className="sec faq-sec" id="faq" aria-labelledby="faq-h">
          <div className="wrap faq-wrap">
            <h2 id="faq-h" className="h2 faq-h">
              Questions
            </h2>
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
      <footer className="foot" data-accent="mint">
        <div className="wrap">
          <div className="foot-cta">
            <div>
              <Headline lead="Your next invoice," highlight="paid by Friday." />
              <p className="body-lg">
                We&rsquo;re letting people in a few at a time. Leave your email and Dodo will save you
                a spot.
              </p>
            </div>
            <WaitlistForm source="footer" />
          </div>

          <div className="foot-base">
            <a href="#top" aria-label="InvoiceDodo home" className="foot-logo">
              <Logo height={26} />
            </a>
            <p className="foot-tag">The awkward chase is going the way of the dodo.</p>
            <nav aria-label="Legal" className="legal-foot-links">
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms</a>
            </nav>
            <span className="foot-copy">© 2026 InvoiceDodo</span>
          </div>
        </div>
      </footer>
    </>
  );
}

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
    q: "What does it cost?",
    a: "Sending invoices and reminders is free. When a client pays online, a small processing fee applies, and it's shown before you send.",
  },
  {
    q: "Will reminders annoy my clients?",
    a: "They're short, polite and written in your voice. The first one goes out before the due date, and they stop as soon as your client commits to a date or pays.",
  },
];
