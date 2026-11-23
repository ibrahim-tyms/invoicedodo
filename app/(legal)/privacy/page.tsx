import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL } from "../config";
import { LegalPage, type LegalSection } from "../LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How InvoiceDodo collects, uses and protects your information, including waitlist, invoice, payment and tax data, and the choices you have.",
  alternates: { canonical: "/privacy" },
  openGraph: { type: "article", url: "/privacy", title: "Privacy Policy | InvoiceDodo" },
};

const C = LEGAL.company;
const mail = <a href={`mailto:${LEGAL.privacyEmail}`}>{LEGAL.privacyEmail}</a>;

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <p>
          InvoiceDodo is a product of {C}, a company organized in the United States (&ldquo;{C}
          ,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo; or &ldquo;our&rdquo;). This Privacy Policy
          explains how we collect, use, share and protect personal information when you visit our
          website, join our waitlist, use the InvoiceDodo service, or receive an invoice or
          message sent through InvoiceDodo.
        </p>
        <p>
          {C} is responsible for the personal information described in this policy, except where
          we process information on behalf of our users as described in{" "}
          <a href="#your-clients">Information about your clients</a>.
        </p>
      </>
    ),
  },
  {
    id: "scope",
    title: "Scope, and where we are today",
    body: (
      <>
        <p>This policy covers:</p>
        <ul>
          <li>
            our website at {LEGAL.website} and any page that links to this policy (the
            &ldquo;Site&rdquo;);
          </li>
          <li>the InvoiceDodo waitlist and early-access program;</li>
          <li>
            the InvoiceDodo application, including invoicing, AI-assisted drafting, automated
            reminders, client-facing invoice pages, payments and payout tracking (together with
            the Site, the &ldquo;Service&rdquo;); and
          </li>
          <li>emails and other messages we send, or that you send through the Service.</li>
        </ul>
        <p>
          <strong>InvoiceDodo is currently in early access.</strong> Today, the only personal
          information we collect through the Site is what you give us when you join the waitlist,
          plus the technical information described in{" "}
          <a href="#usage-data">Usage and device information</a>. Sections that describe account,
          invoice, payment, tax and AI features explain how we will handle that information once
          those features are available to you. We will update this policy if our practices change
          before then.
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    title: "Information we collect",
    body: (
      <>
        <h3>3.1 Waitlist information</h3>
        <p>When you join the waitlist, we collect:</p>
        <ul>
          <li>your email address;</li>
          <li>
            optionally, how you describe your work (for example &ldquo;Freelancer&rdquo; or
            &ldquo;Small business&rdquo;);
          </li>
          <li>which sign-up form you used on the Site; and</li>
          <li>the date and time you signed up.</li>
        </ul>

        <h3>3.2 Account information</h3>
        <p>
          When you create an account, we collect your name, email address, business name, and
          login credentials or sign-in identifiers. You may choose to add a phone number, business
          address, logo, website, default payment terms and the &ldquo;voice&rdquo; you would like
          reminders to use.
        </p>

        <h3>3.3 Invoice and business content</h3>
        <p>
          To create and send invoices, you provide information such as client names, client
          contact details, billing addresses, descriptions of work, line items, quantities,
          prices, taxes, discounts, due dates, purchase order (PO) numbers, notes and attachments.
          This also includes the descriptions you type or files you upload (for example quotes,
          timesheets, contracts or photos) so that InvoiceDodo can draft an invoice for you. We
          call all of this &ldquo;Your Content.&rdquo;
        </p>

        <h3>3.4 Payment and payout information</h3>
        <p>
          Online payments are processed by our payment partner, Stripe. To receive payments, you
          will connect or create a Stripe account, and Stripe will collect the information it
          needs to verify your identity and pay you, such as your legal name, date of birth,
          address, government identification number and bank account details. Stripe handles
          that information under its own privacy policy.
        </p>
        <p>
          We do <strong>not</strong> receive or store full card numbers or full bank account
          numbers. We receive limited information from Stripe, such as your account and
          verification status, the last digits of a bank account, payment amounts, fees, payment
          method types, payout schedules and payout status, so we can show you where your money
          is.
        </p>

        <h3>3.5 Tax information</h3>
        <p>
          If you use features that prepare tax documents for your clients&rsquo; finance teams
          (for example a Form W-9), we collect the information required on that form, which can
          include your legal name, business name, federal tax classification, address and
          taxpayer identification number (an EIN or Social Security number). We treat taxpayer
          identification numbers as <strong>sensitive personal information</strong>: we encrypt
          them, restrict access to them, and use them only to produce the documents you ask us to
          produce.
        </p>
        <p>
          If you use our tax set-aside or sales-tax guidance features, we use your payment
          amounts and the location and business details you provide to generate estimates. We do
          not ask for your full tax return or other financial accounts.
        </p>

        <h3>3.6 AI inputs and outputs</h3>
        <p>
          When you use AI-assisted features (for example asking Dodo to draft an invoice from a
          sentence or a file), we process the text and files you submit and the drafts we
          generate. See <a href="#ai">AI features</a> for how this works.
        </p>

        <h3>3.7 Communications</h3>
        <p>
          We keep the messages you send us (for example support requests and feedback) and
          records of the messages the Service sends on your behalf, such as invoices, reminders,
          receipts, and questions or replies exchanged with your clients on an invoice page.
        </p>

        <h3 id="usage-data">3.8 Usage and device information</h3>
        <p>
          When you use the Site or Service, we and our hosting provider automatically collect
          technical information, such as IP address, approximate location derived from IP
          address, browser and device type, operating system, referring page, pages viewed,
          actions taken, and dates and times of access. We use server logs and similar records to
          keep the Service running, secure and reliable.
        </p>
        <p>
          When the Service is available, we also record events that power the features you see,
          such as when an invoice is sent, opened, viewed or paid, and when a reminder is
          delivered or a payment date is promised.
        </p>

        <h3>3.9 Cookies and similar technologies</h3>
        <p>
          The Site currently uses only cookies and storage that are strictly necessary for it to
          work (for example to keep you signed in or protect forms from abuse). We do not use
          advertising cookies or cross-site tracking. If we add analytics or similar tools in the
          future, we will update this policy and, where required, ask for your consent. You can
          control cookies through your browser settings, although some parts of the Service may
          not work without them.
        </p>

        <h3>3.10 Information from other sources</h3>
        <p>We may receive information about you from:</p>
        <ul>
          <li>
            <strong>Stripe</strong>, about your account status, payments and payouts;
          </li>
          <li>
            <strong>sign-in providers</strong>, if you choose to sign in with a third-party
            account, such as your name and email address;
          </li>
          <li>
            <strong>email delivery providers</strong>, such as whether a message was delivered,
            bounced or marked as spam; and
          </li>
          <li>
            <strong>other users</strong>, for example when a business sends you an invoice through
            InvoiceDodo (see the next section).
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "your-clients",
    title: "Information about your clients (invoice recipients)",
    body: (
      <>
        <p>
          When a business uses InvoiceDodo to bill you, that business decides what information to
          include and why. For that information, the business is responsible for its own privacy
          practices, and {C} acts as its <strong>service provider</strong> (sometimes called a
          &ldquo;processor&rdquo;), handling the information on the business&rsquo;s instructions.
        </p>
        <p>As an invoice recipient, information about you may include:</p>
        <ul>
          <li>your name, email address, company name and billing address;</li>
          <li>the invoice contents, including amounts, line items and due dates;</li>
          <li>
            whether and when you opened or viewed an invoice or reminder, and from what type of
            device;
          </li>
          <li>
            any pay date you promise, questions you ask, and messages you exchange with the
            business;
          </li>
          <li>
            email addresses you enter when forwarding an invoice to your finance or accounts
            payable team; and
          </li>
          <li>
            payment status. Your card or bank details are entered directly with Stripe, not
            stored by us.
          </li>
        </ul>
        <p>
          <strong>Reminders.</strong> InvoiceDodo sends invoices and reminders on behalf of the
          business that billed you, at the times and in the tone that business chooses. These are
          transactional messages about an amount you have been billed. If you believe you have
          received an invoice in error, or have questions about how a business uses your
          information, please contact that business directly. You can also contact us at {mail},
          and we will pass your request on or help where we can.
        </p>
        <p>
          <strong>Users&rsquo; responsibilities.</strong> If you use InvoiceDodo to bill others,
          you are responsible for having a lawful basis to share your clients&rsquo; information
          with us and for giving them any notices the law requires.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use information",
    body: (
      <>
        <p>We use personal information to:</p>
        <ul>
          <li>
            <strong>Run the waitlist</strong>: save your spot, invite you when access opens, and
            understand who is waiting so we build the right features first.
          </li>
          <li>
            <strong>Provide the Service</strong>: create your account, draft and send invoices,
            host client-facing invoice pages, schedule and send reminders, record promises and
            payments, and show payout status.
          </li>
          <li>
            <strong>Process payments</strong> through Stripe, show fees before you send, and keep
            accurate payment records.
          </li>
          <li>
            <strong>Prepare documents you request</strong>, such as W-9 forms and finance-team
            bundles.
          </li>
          <li>
            <strong>Provide AI-assisted features</strong> you choose to use.
          </li>
          <li>
            <strong>Communicate with you</strong>: service and account messages, security alerts,
            support replies and, if you have not opted out, product news.
          </li>
          <li>
            <strong>Keep the Service safe</strong>: prevent fraud, abuse, spam and misuse of
            invoices or payments; secure accounts; and enforce our{" "}
            <Link href="/terms">Terms of Service</Link>.
          </li>
          <li>
            <strong>Improve the Service</strong>: understand how features are used, fix bugs and
            develop new features, using aggregated or de-identified information wherever
            possible.
          </li>
          <li>
            <strong>Meet legal obligations</strong>: keep records required by law, respond to
            lawful requests, and establish or defend legal claims.
          </li>
        </ul>
        <p>
          We do not use the contents of your invoices, or your clients&rsquo; information, to
          advertise to you or to them, and we do not build advertising profiles.
        </p>
      </>
    ),
  },
  {
    id: "ai",
    title: "AI features",
    body: (
      <>
        <p>
          Some features use artificial intelligence (AI) models to turn your descriptions and
          files into draft invoices, suggest line items, or help word reminders. When you use
          these features:
        </p>
        <ul>
          <li>
            the text and files you submit are sent to AI model providers that process them on our
            behalf to generate a response;
          </li>
          <li>
            we do not use Your Content to train AI models that are made available to other
            customers, and we select AI providers that contractually commit not to use it to
            train their models;
          </li>
          <li>
            limited, authorized staff may review inputs and outputs only when needed for support,
            safety, abuse prevention or to fix a problem you report; and
          </li>
          <li>
            AI output can be wrong. You review every draft before it is sent, and nothing is sent
            to a client without your action or your configured instructions.
          </li>
        </ul>
        <p>
          We list the AI providers we use in our{" "}
          <a href="#sharing">service provider list</a> before AI features are made available.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "How we share information",
    body: (
      <>
        <p>
          <strong>We do not sell personal information, and we do not share it for cross-context
          behavioral advertising.</strong> We share personal information only as follows:
        </p>
        <ul>
          <li>
            <strong>Service providers</strong> that host, store, send or process information for
            us under contracts that limit their use of it to providing services to us.
          </li>
          <li>
            <strong>Stripe</strong>, to process payments and payouts and to verify identities as
            required by financial regulations.
          </li>
          <li>
            <strong>People you direct us to share with</strong>, such as the clients you invoice,
            the finance teams you or your clients forward invoices to, and team members or
            accountants you invite.
          </li>
          <li>
            <strong>Our corporate family</strong>: companies controlled by or under common control
            with {C}, which must handle the information consistently with this policy.
          </li>
          <li>
            <strong>Legal and safety reasons</strong>: to comply with law, legal process or
            lawful government requests; to protect the rights, property or safety of our users,
            the public or {C}; or to detect and prevent fraud or security issues.
          </li>
          <li>
            <strong>Business transfers</strong>: in connection with a merger, acquisition,
            financing, reorganization, or sale of all or part of our business, subject to this
            policy&rsquo;s protections.
          </li>
          <li>
            <strong>With your consent</strong>, or as otherwise disclosed when we collect the
            information.
          </li>
        </ul>

        <h3>Current service providers</h3>
        <div className="legal-table-wrap">
          <table className="legal-table">
            <thead>
              <tr>
                <th>Provider</th>
                <th>What they do for us</th>
                <th>Information involved</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Vercel</td>
                <td>Hosts the Site and runs our servers</td>
                <td>Usage and device information, form submissions in transit</td>
              </tr>
              <tr>
                <td>Resend</td>
                <td>Stores the waitlist and sends our emails</td>
                <td>Email address, waitlist details, email delivery events</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          As the Service launches, we will also use providers for payment processing (Stripe),
          database hosting, file storage, AI models, and error monitoring. We will add each one to
          this list before it begins processing personal information. You can ask us for the
          current list at any time at {mail}.
        </p>
      </>
    ),
  },
  {
    id: "emails",
    title: "Emails and your choices",
    body: (
      <>
        <ul>
          <li>
            <strong>Waitlist and product news.</strong> If you join the waitlist, we will email you
            about your invite and about InvoiceDodo. Every such email has an unsubscribe link,
            and unsubscribing does not affect your account.
          </li>
          <li>
            <strong>Service messages.</strong> If you have an account, we will send you messages
            needed to run it, such as security alerts, payment notifications and changes to our
            terms. You cannot opt out of these while your account is active.
          </li>
          <li>
            <strong>Invoices and reminders to your clients</strong> are sent on your behalf. You
            control whether, when and how often they are sent, and you can pause them at any time.
          </li>
          <li>
            <strong>Open and view tracking.</strong> To tell you when a client has seen an
            invoice, invoice emails and pages may record when they are opened or viewed. These
            signals are used only to show status to the sender and to decide whether a reminder
            is still needed.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep information",
    body: (
      <>
        <p>
          We keep personal information only as long as we need it for the purposes in this
          policy, unless the law requires or permits longer. In general:
        </p>
        <ul>
          <li>
            <strong>Waitlist details</strong>: until you unsubscribe or ask us to delete them, or
            until 24 months after InvoiceDodo launches publicly if you have not created an
            account, whichever is sooner.
          </li>
          <li>
            <strong>Account information and Your Content</strong>: for as long as your account is
            open. After you close your account, we delete or de-identify it within 90 days, except
            as described below.
          </li>
          <li>
            <strong>Invoice, payment and transaction records</strong>: up to seven years after the
            transaction, where needed for tax, accounting, anti-fraud or legal purposes.
          </li>
          <li>
            <strong>Taxpayer identification numbers</strong>: until you delete them or close your
            account. Copies of documents you have already sent to others are outside our control.
          </li>
          <li>
            <strong>Server and security logs</strong>: generally up to 90 days, longer if needed
            to investigate a security incident.
          </li>
          <li>
            <strong>Backups</strong>: deleted information may stay in encrypted backups for up to
            35 days before it is overwritten.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "security",
    title: "How we protect information",
    body: (
      <>
        <p>
          We use administrative, technical and physical safeguards designed to protect personal
          information, including:
        </p>
        <ul>
          <li>encryption in transit (TLS) and encryption at rest;</li>
          <li>
            additional encryption and restricted access for sensitive fields such as taxpayer
            identification numbers;
          </li>
          <li>
            access controls based on least privilege, and logging of administrative access; and
          </li>
          <li>
            relying on Stripe, a PCI-DSS certified payment processor, for card and bank details so
            those details never touch our servers.
          </li>
        </ul>
        <p>
          No method of transmission or storage is completely secure. If we learn of a security
          incident affecting your personal information, we will notify you and the relevant
          authorities as required by law. Please keep your login details private and tell us right
          away at {mail} if you suspect unauthorized access to your account.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights and choices",
    body: (
      <>
        <p>
          Depending on where you live, you may have the right to:
        </p>
        <ul>
          <li>
            <strong>Know and access</strong> the personal information we hold about you;
          </li>
          <li>
            <strong>Correct</strong> inaccurate information;
          </li>
          <li>
            <strong>Delete</strong> your personal information;
          </li>
          <li>
            <strong>Get a copy</strong> of your information in a portable format;
          </li>
          <li>
            <strong>Opt out</strong> of marketing emails, and of any sale, sharing for targeted
            advertising, or profiling with legal or similarly significant effects (we do not do
            these things);
          </li>
          <li>
            <strong>Limit the use</strong> of sensitive personal information (we use it only for
            the purposes the law allows); and
          </li>
          <li>
            <strong>Appeal</strong> our decision if we decline your request.
          </li>
        </ul>
        <p>
          Account holders can view, edit and export most of their information directly in the
          Service. To make any other request, email {mail} from the address linked to your
          waitlist spot or account. We will verify your identity before acting on a request, and
          we respond within the time required by law (generally 45 days). You may use an
          authorized agent, who must show us your signed permission. If we deny your request, you
          can appeal by replying to our decision. We will not treat you differently for exercising
          your rights.
        </p>
        <p>
          If your information was given to us by a business that invoiced you, we may refer your
          request to that business, because it controls that information.
        </p>
      </>
    ),
  },
  {
    id: "us-states",
    title: "Additional information for US state residents",
    body: (
      <>
        <p>
          Residents of California and of other states with comprehensive privacy laws (including
          Colorado, Connecticut, Oregon, Texas, Utah, Virginia and others) have the rights
          described above. This section provides the additional disclosures those laws require,
          including the California Consumer Privacy Act as amended (CCPA).
        </p>
        <p>
          In the past 12 months, we have collected the categories of personal information below.
          Some categories apply only once the related features are available.
        </p>
        <div className="legal-table-wrap">
          <table className="legal-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Examples</th>
                <th>Source</th>
                <th>Disclosed to</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Identifiers</td>
                <td>Name, email, IP address, account ID</td>
                <td>You; your device; other users who invoice you</td>
                <td>Service providers; Stripe; recipients you choose</td>
              </tr>
              <tr>
                <td>Customer records</td>
                <td>Business name, address, phone, limited payment details</td>
                <td>You; Stripe</td>
                <td>Service providers; Stripe; recipients you choose</td>
              </tr>
              <tr>
                <td>Commercial information</td>
                <td>Invoices, payments, payout history</td>
                <td>You; your clients; Stripe</td>
                <td>Service providers; Stripe; recipients you choose</td>
              </tr>
              <tr>
                <td>Internet activity</td>
                <td>Pages viewed, invoice opens and views, logs</td>
                <td>Your device</td>
                <td>Service providers</td>
              </tr>
              <tr>
                <td>Professional information</td>
                <td>Type of work, business details</td>
                <td>You</td>
                <td>Service providers</td>
              </tr>
              <tr>
                <td>Inferences</td>
                <td>Feature preferences derived from use</td>
                <td>Our analysis</td>
                <td>Not disclosed</td>
              </tr>
              <tr>
                <td>Sensitive personal information</td>
                <td>Taxpayer identification number; account login credentials</td>
                <td>You</td>
                <td>Service providers; recipients of documents you send</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul>
          <li>
            We use these categories for the business purposes in{" "}
            <a href="#how-we-use">How we use information</a> and keep them as described in{" "}
            <a href="#retention">How long we keep information</a>.
          </li>
          <li>
            <strong>No sale or sharing.</strong> We have not sold personal information or shared
            it for cross-context behavioral advertising, including that of consumers under 16.
          </li>
          <li>
            <strong>Sensitive personal information</strong> is used only to provide the services
            you request, for security and integrity, and as otherwise permitted by law. We do not
            use it to infer characteristics about you.
          </li>
          <li>
            <strong>Global Privacy Control.</strong> We treat a Global Privacy Control signal from
            your browser as a valid request to opt out of sale and sharing for that browser.
          </li>
          <li>
            <strong>Shine the Light.</strong> California residents may ask whether we have shared
            personal information with third parties for their direct marketing purposes. We have
            not.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "international",
    title: "Users outside the United States",
    body: (
      <>
        <p>
          {C} is based in the United States, and we process and store information in the United
          States and in other countries where our service providers operate. Data protection laws
          there may differ from those where you live.
        </p>
        <p>
          If you are in the European Economic Area, the United Kingdom or Switzerland, we process
          your personal information on these legal bases: to perform our contract with you; for
          our legitimate interests in running, securing and improving the Service (balanced
          against your rights); to comply with legal obligations; and with your consent, which
          you may withdraw at any time (for example for marketing emails). When we transfer your
          information out of those regions, we rely on safeguards such as the European
          Commission&rsquo;s Standard Contractual Clauses and their UK and Swiss equivalents. You
          also have the right to object to our processing and to lodge a complaint with your
          local data protection authority.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <p>
        InvoiceDodo is a business tool and is not directed to children. You must be at least 18
        to create an account. We do not knowingly collect personal information from children
        under 13 (or under 16 where local law sets a higher age). If you believe a child has given
        us personal information, contact {mail} and we will delete it.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We may update this policy as InvoiceDodo grows and as laws change. We will post the
        updated version here and change the &ldquo;Last updated&rdquo; date. If we make material
        changes, we will notify you by email or in the Service before they take effect. We will
        not use previously collected personal information in a materially different way without
        your consent where the law requires it.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <>
        <p>Questions, requests or complaints about privacy:</p>
        <address className="legal-address">
          {C} (InvoiceDodo)
          <br />
          Attn: Privacy
          <br />
          {LEGAL.mailingAddress}
          <br />
          {mail}
        </address>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      path="/privacy"
      description={metadata.description as string}
      title="Privacy Policy"
      other={{ href: "/terms", label: "Terms of Service" }}
      intro={
        <p>
          InvoiceDodo helps people get paid, which means handling business and money information
          with care. This policy explains what we collect, why, who we share it with, and the
          choices you have. InvoiceDodo is a product of {C}
        </p>
      }
      summary={[
        <>Right now we only collect your email, and optionally what kind of work you do, to run the waitlist.</>,
        <>We never sell your information or use it for advertising.</>,
        <>
          When the app launches, we will store your invoices and your clients&rsquo; details to send
          invoices and reminders on your behalf, and only for that.
        </>,
        <>Card and bank details go straight to Stripe. They never touch our servers.</>,
        <>Your content is not used to train AI models offered to other customers.</>,
        <>You can see, export or delete your information, and unsubscribe from any marketing email.</>,
      ]}
      sections={sections}
    />
  );
}
