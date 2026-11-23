import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL } from "../config";
import { LegalPage, type LegalSection } from "../LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms for using InvoiceDodo: invoices, automatic reminders, payments through your provider, fees, AI features and your rights.",
  alternates: { canonical: "/terms" },
  openGraph: { type: "article", url: "/terms", title: "Terms of Service | InvoiceDodo" },
};

const C = LEGAL.company;
const legalMail = <a href={`mailto:${LEGAL.legalEmail}`}>{LEGAL.legalEmail}</a>;

const sections: LegalSection[] = [
  {
    id: "agreement",
    title: "Agreement to these terms",
    body: (
      <>
        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) are a legal agreement between you and {C}{" "}
          (&ldquo;{C},&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo; or &ldquo;our&rdquo;), a company
          organized under the laws of {LEGAL.stateOfIncorporation}, United States. They govern
          your use of the InvoiceDodo website, waitlist, applications and related services
          (together, the &ldquo;Service&rdquo;). InvoiceDodo is a product of {C}
        </p>
        <p>
          By joining the waitlist, creating an account or otherwise using the Service, you agree
          to these Terms and to our <Link href="/privacy">Privacy Policy</Link>. If you use the
          Service on behalf of a business, you agree on behalf of that business and confirm you
          have authority to do so; &ldquo;you&rdquo; then means both you and that business.
        </p>
        <p className="legal-callout">
          <strong>Please read the <a href="#disputes">Dispute resolution and arbitration</a> section
          carefully.</strong> Except as described there, disputes between you and {C} will be
          resolved by binding individual arbitration, and you waive the right to a jury trial or
          to take part in a class action. You can opt out within 30 days.
        </p>
      </>
    ),
  },
  {
    id: "early-access",
    title: "Early access and the waitlist",
    body: (
      <>
        <p>InvoiceDodo is currently in early access. That means:</p>
        <ul>
          <li>
            joining the waitlist does not guarantee you access, or access by any particular date.
            We invite people in batches at our discretion;
          </li>
          <li>
            features described on the Site may change, be delayed or never launch, and
            descriptions of future features are not commitments;
          </li>
          <li>
            features labeled &ldquo;early access,&rdquo; &ldquo;beta&rdquo; or
            &ldquo;preview&rdquo; may contain errors, may change without notice, and are provided
            &ldquo;as is&rdquo; without any service-level commitment; and
          </li>
          <li>
            we may ask for feedback, and may contact you about your experience using the email
            address you gave us.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "accounts",
    title: "Eligibility and accounts",
    body: (
      <>
        <ul>
          <li>
            You must be at least 18 years old and able to form a binding contract. The Service is
            for business and professional use, including by freelancers and sole proprietors, not
            for personal, family or household purposes.
          </li>
          <li>
            You must give accurate, current and complete information and keep it up to date,
            including your business name and the details that appear on your invoices.
          </li>
          <li>
            You are responsible for keeping your login details secure and for all activity under
            your account. Tell us right away at {legalMail} if you suspect unauthorized use.
          </li>
          <li>
            If you invite team members or an accountant, you are responsible for their use of the
            Service and for removing access they should no longer have.
          </li>
          <li>
            You may not use the Service if you are barred from doing so under US law, are located
            in a country subject to comprehensive US sanctions, or appear on a US government
            restricted-party list.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "service",
    title: "What InvoiceDodo does",
    body: (
      <>
        <p>
          InvoiceDodo is software that helps you create invoices, send them to your clients,
          follow up with reminders, let clients pay or commit to a pay date, and track payments
          and payouts. Depending on the features available to you, the Service may include:
        </p>
        <ul>
          <li>drafting invoices from text or files you provide, including with AI;</li>
          <li>sending invoices, reminders and receipts by email on your behalf;</li>
          <li>
            hosted invoice pages where your clients can pay, ask questions, promise a payment date,
            download documents or forward the invoice to their finance team;
          </li>
          <li>online payments processed by Stripe, and payout tracking;</li>
          <li>preparing documents such as Form W-9 bundles at your request; and</li>
          <li>informational tools such as tax set-aside estimates and sales-tax guidance.</li>
        </ul>
        <p>
          We may add, change or remove features over time. If we remove a core feature you rely on,
          we will try to give you reasonable notice.
        </p>
      </>
    ),
  },
  {
    id: "your-content",
    title: "Your content and your clients",
    body: (
      <>
        <p>
          <strong>You own Your Content.</strong> &ldquo;Your Content&rdquo; means everything you or
          your team submit to the Service, including business details, client information,
          invoice contents, files, messages and logos. You give {C} a worldwide, non-exclusive,
          royalty-free license to host, copy, process, transmit, display and adapt Your Content
          only as needed to provide, secure and improve the Service for you, and as described in
          our Privacy Policy. This license ends when Your Content is deleted from the Service,
          except for copies we must keep by law or that remain in backups for a limited time.
        </p>
        <p>You are responsible for Your Content. In particular, you confirm that:</p>
        <ul>
          <li>
            your invoices are accurate and reflect goods or services you actually provided or
            agreed to provide, at prices your client agreed to;
          </li>
          <li>
            you have the right to share your clients&rsquo; information with us, and to have us
            contact them on your behalf, and you have given them any notices required by law;
          </li>
          <li>
            Your Content does not infringe anyone&rsquo;s rights or break any law; and
          </li>
          <li>
            you are responsible for the taxes, terms, discounts and legal statements that appear on
            your invoices.
          </li>
        </ul>
        <p>
          <strong>We are not a party to your client relationships.</strong> Your agreements with
          your clients are between you and them. {C} is not responsible for disputes about work,
          pricing, quality, refunds or payment between you and your clients, although we may
          provide tools to help resolve them.
        </p>
      </>
    ),
  },
  {
    id: "reminders",
    title: "Invoices and reminders sent on your behalf",
    body: (
      <>
        <p>
          By using the Service, you authorize us to send invoices, reminders, receipts and related
          messages to your clients in your name, at the times and with the settings you choose (or
          our defaults, if you do not change them). You can review, edit, pause or turn off
          reminders at any time.
        </p>
        <ul>
          <li>
            <strong>We are not a debt collector.</strong> InvoiceDodo is a billing tool. We do not
            collect debts, threaten action, report to credit bureaus, or contact anyone other than
            the recipients you specify. Do not use the Service to collect debts owed to anyone
            other than you, or to collect consumer debts.
          </li>
          <li>
            <strong>You are responsible for compliance.</strong> You are responsible for making
            sure your invoices and reminders comply with the laws that apply to you and your
            clients, including laws on billing, late fees, consumer protection, debt collection and
            commercial email.
          </li>
          <li>
            <strong>No guarantee of delivery or payment.</strong> Email can be delayed, filtered as
            spam or bounced. We work hard to deliver your messages but cannot guarantee that any
            message is received, read or acted on, or that any client will pay on time or at all.
          </li>
          <li>
            We may limit, delay or stop sending messages that we reasonably believe are abusive,
            misleading, unlawful, or harmful to our email reputation or to recipients.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "payments",
    title: "Payments and payouts",
    body: (
      <>
        <p>
          Online payments through InvoiceDodo are processed by Stripe, Inc. and its affiliates
          (&ldquo;Stripe&rdquo;). To accept payments, you must create or connect a Stripe account
          and agree to the{" "}
          <a href="https://stripe.com/legal/connect-account" rel="noopener noreferrer">
            Stripe Connected Account Agreement
          </a>
          , which includes the{" "}
          <a href="https://stripe.com/legal/ssa" rel="noopener noreferrer">
            Stripe Services Agreement
          </a>{" "}
          (together, the &ldquo;Stripe Terms&rdquo;). You authorize us to share information about
          you and your transactions with Stripe and to receive information from Stripe to provide
          the Service.
        </p>
        <ul>
          <li>
            <strong>We do not hold your money.</strong> {C} is not a bank, money transmitter,
            escrow agent or payment processor. Funds move between your clients, Stripe and your
            bank account under the Stripe Terms.
          </li>
          <li>
            <strong>Verification and holds.</strong> Stripe may ask for information to verify your
            identity or business, and may delay, hold or reverse payments or payouts under the
            Stripe Terms. We aim to show you clearly where your money is, but we do not control
            Stripe&rsquo;s decisions and are not responsible for them.
          </li>
          <li>
            <strong>Refunds, disputes and chargebacks</strong> are your responsibility, including
            any amounts and fees Stripe charges back to you.
          </li>
          <li>
            <strong>Offline payments.</strong> If you mark an invoice as paid by check, bank
            transfer or another method outside the Service, you are responsible for the accuracy
            of that record.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "fees",
    title: "Fees",
    body: (
      <>
        <ul>
          <li>
            <strong>Free to use.</strong> Creating and sending invoices, managing clients and
            sending automatic reminders are currently free. We will not start charging for these
            core features without giving you at least 30 days&rsquo; notice.
          </li>
          <li>
            <strong>Payment processing fees.</strong> When a client pays you online, processing
            fees apply. We show the applicable fee, and the amount you are expected to receive,
            before you send an invoice. Fees are deducted from the payment before it is paid out to
            you.
          </li>
          <li>
            <strong>Optional paid features.</strong> We may offer optional paid features in the
            future. We will tell you the price before you choose them, and you will not be charged
            for anything you have not agreed to.
          </li>
          <li>
            <strong>Changes.</strong> We will give you at least 30 days&rsquo; notice of any
            increase to fees that apply to you. Changes never apply retroactively.
          </li>
          <li>
            <strong>Taxes.</strong> Fees do not include taxes. You are responsible for any taxes
            that apply to your use of the Service and to the payments you receive.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "ai",
    title: "AI features",
    body: (
      <>
        <ul>
          <li>
            AI-assisted features generate drafts and suggestions from what you provide. Output can
            be incomplete, inaccurate or unsuitable. <strong>You must review every draft</strong>{" "}
            (including amounts, dates, client details and tax) before you send it, and you are
            responsible for what you send.
          </li>
          <li>
            As between you and us, you own the output generated for you, to the extent permitted
            by law. Similar output may be generated for other users.
          </li>
          <li>
            We do not use Your Content to train AI models that are offered to other customers. See
            our <Link href="/privacy#ai">Privacy Policy</Link> for details.
          </li>
          <li>
            You may not use AI features to create misleading, fraudulent or unlawful content, or to
            try to extract or reverse engineer the underlying models.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "not-advice",
    title: "Not tax, legal or financial advice",
    body: (
      <p>
        Tax set-aside estimates, sales-tax guidance, fee previews, payout dates and similar
        information are provided for convenience only. They are general estimates based on the
        information available to us, not tax, legal, accounting or financial advice, and may not
        fit your situation. {C} is not a tax preparer, accountant or law firm. Talk to a qualified
        professional before making decisions based on this information.
      </p>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    body: (
      <>
        <p>You agree not to, and not to let anyone else:</p>
        <ul>
          <li>
            send fake, inflated or fraudulent invoices, or invoices for goods or services that were
            not provided or agreed;
          </li>
          <li>
            impersonate another person or business, or use the Service for phishing, scams or
            social engineering;
          </li>
          <li>
            sell or invoice for illegal goods or services, or for any business Stripe does not
            support;
          </li>
          <li>
            send spam, or send invoices or reminders to people who have no business relationship
            with you;
          </li>
          <li>harass, threaten, defame or abuse anyone through the Service;</li>
          <li>upload malware or files designed to harm recipients or our systems;</li>
          <li>
            probe, scan or test the vulnerability of the Service, or get around any security or
            usage limit;
          </li>
          <li>
            scrape the Service, overload it, or access it by automated means except through
            interfaces we provide for that purpose;
          </li>
          <li>
            copy, modify, reverse engineer or create derivative works of the Service, except where
            the law expressly allows it;
          </li>
          <li>resell or sublicense the Service without our written permission; or</li>
          <li>use the Service in violation of any law, including sanctions and export laws.</li>
        </ul>
        <p>
          We may investigate suspected violations and work with law enforcement, Stripe or other
          affected parties where appropriate.
        </p>
      </>
    ),
  },
  {
    id: "our-ip",
    title: "Our intellectual property",
    body: (
      <>
        <p>
          The Service, including its software, design, text, graphics, the InvoiceDodo name, the
          Dodo mascot and our logos, belongs to {C} or its licensors and is protected by law. We
          give you a limited, non-exclusive, non-transferable, revocable right to use the Service
          under these Terms. We reserve all rights not expressly granted.
        </p>
        <p>
          <strong>Feedback.</strong> If you send us ideas or suggestions, we may use them without
          any obligation to you.
        </p>
        <p>
          <strong>Copyright complaints.</strong> If you believe content on the Service infringes
          your copyright, send a notice that meets the requirements of the Digital Millennium
          Copyright Act to {legalMail}, Attn: Copyright Agent. We may remove content and close the
          accounts of repeat infringers.
        </p>
      </>
    ),
  },
  {
    id: "third-party",
    title: "Third-party services",
    body: (
      <p>
        The Service works with services we do not control, such as Stripe, email providers and
        sign-in providers. Your use of them is governed by their own terms and privacy policies.
        We are not responsible for third-party services, and their availability may affect the
        Service.
      </p>
    ),
  },
  {
    id: "privacy",
    title: "Privacy",
    body: (
      <p>
        Our <Link href="/privacy">Privacy Policy</Link> explains how we handle personal
        information. Where we process your clients&rsquo; personal information on your behalf, we
        do so as your service provider, following your instructions as expressed through your use
        of the Service and as described in the Privacy Policy.
      </p>
    ),
  },
  {
    id: "termination",
    title: "Suspension and termination",
    body: (
      <>
        <ul>
          <li>
            <strong>By you.</strong> You can stop using the Service and close your account at any
            time. To leave the waitlist, use the unsubscribe link in any of our emails or contact
            us.
          </li>
          <li>
            <strong>By us.</strong> We may suspend or end your access if you breach these Terms,
            create risk or possible legal exposure for us, Stripe, your clients or other users, if
            required by law, or if we stop offering the Service. Where reasonable, we will tell you
            first and give you a chance to fix the problem.
          </li>
          <li>
            <strong>Your data.</strong> After your account closes, you will have at least 30 days
            to export your invoices and records, unless we closed it because of fraud, illegal
            activity or a serious breach. After that we may delete Your Content as described in
            our Privacy Policy.
          </li>
          <li>
            Sections that by their nature should survive termination will survive, including those
            on fees owed, Your Content licenses needed for retained records, disclaimers, limits of
            liability, indemnity and dispute resolution.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    body: (
      <p className="legal-caps">
        To the fullest extent permitted by law, the Service is provided &ldquo;as is&rdquo; and
        &ldquo;as available,&rdquo; without warranties of any kind, whether express, implied or
        statutory, including warranties of merchantability, fitness for a particular purpose,
        title and non-infringement. {C} does not warrant that the Service will be uninterrupted,
        secure or error-free, that AI output or estimates will be accurate, that messages will be
        delivered, or that your clients will pay you on time or at all. Some jurisdictions do not
        allow certain disclaimers, so some of the above may not apply to you.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: (
      <>
        <p className="legal-caps">
          To the fullest extent permitted by law, {C} and its affiliates, officers, employees,
          agents and suppliers will not be liable for any indirect, incidental, special,
          consequential, exemplary or punitive damages, or for any loss of profits, revenue, data,
          goodwill or business opportunities, arising out of or relating to these Terms or the
          Service, even if advised of their possibility.
        </p>
        <p className="legal-caps">
          To the fullest extent permitted by law, our total liability for all claims arising out
          of or relating to these Terms or the Service is limited to the greater of (a) the amounts
          you paid to {C} for the Service in the 12 months before the event giving rise to the
          claim, or (b) one hundred US dollars (US $100).
        </p>
        <p>
          These limits apply to all theories of liability and even if a remedy fails of its
          essential purpose. They do not limit liability that cannot be limited by law, such as for
          fraud or gross negligence where applicable.
        </p>
      </>
    ),
  },
  {
    id: "indemnity",
    title: "Indemnity",
    body: (
      <p>
        You will defend, indemnify and hold harmless {C} and its affiliates, officers, employees
        and agents from claims, losses, liabilities, damages, fines and expenses (including
        reasonable attorneys&rsquo; fees) arising from: Your Content; your invoices and your
        dealings with your clients; messages sent on your behalf through the Service in line with
        your settings; your breach of these Terms or of the Stripe Terms; or your violation of any
        law or third-party right. We will tell you about any such claim and may participate in the
        defense with counsel of our choice at our own expense.
      </p>
    ),
  },
  {
    id: "disputes",
    title: "Dispute resolution and arbitration",
    body: (
      <>
        <p>
          <strong>Talk to us first.</strong> Before starting any formal proceeding, you agree to
          send a written description of your dispute and the relief you want to {legalMail}, and
          we will do the same by emailing you. Both of us will try in good faith to resolve it
          within 60 days.
        </p>
        <p>
          <strong>Binding arbitration.</strong> If we cannot resolve it, any dispute, claim or
          controversy arising out of or relating to these Terms or the Service will be resolved by
          binding individual arbitration administered by the American Arbitration Association
          (&ldquo;AAA&rdquo;) under its Commercial Arbitration Rules, before a single arbitrator.
          The Federal Arbitration Act governs this section. The arbitration may be held by video
          or, if in person, in the county where you have your principal place of business or
          another location we agree on. The arbitrator may award the same individual relief a
          court could, and judgment on the award may be entered in any court with jurisdiction.
        </p>
        <p>
          <strong>Exceptions.</strong> Either of us may bring an individual claim in small claims
          court if it qualifies, and either of us may seek an injunction in court to stop
          infringement or misuse of intellectual property or unauthorized access to the Service.
        </p>
        <p className="legal-caps">
          <strong>Class action waiver.</strong> You and {C} agree that each may bring claims
          against the other only in an individual capacity, and not as a plaintiff or class member
          in any purported class, collective, consolidated or representative proceeding. The
          arbitrator may not consolidate more than one person&rsquo;s claims. You and {C} each
          waive any right to a jury trial.
        </p>
        <p>
          <strong>Opt out.</strong> You may opt out of this arbitration agreement by emailing{" "}
          {legalMail} within 30 days after you first accept these Terms, with your name, the email
          address on your account or waitlist spot, and a clear statement that you opt out of
          arbitration. Opting out does not affect any other part of these Terms.
        </p>
        <p>
          If the class action waiver is found unenforceable for a claim, that claim must be
          severed and heard in court, not in arbitration. If any other part of this section is
          found unenforceable, the rest stays in effect.
        </p>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law and venue",
    body: (
      <p>
        These Terms are governed by the laws of {LEGAL.governingLawState} and applicable US
        federal law, without regard to conflict-of-laws rules. For any dispute not subject to
        arbitration, you and {C} agree to the exclusive jurisdiction of the state and federal
        courts located in {LEGAL.venue}.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: (
      <p>
        We may update these Terms from time to time. We will post the updated Terms here and change
        the &ldquo;Last updated&rdquo; date. If a change is material, we will give you at least 30
        days&rsquo; notice by email or in the Service before it takes effect, unless the change is
        required by law or addresses a security or abuse issue sooner. Continuing to use the
        Service after changes take effect means you accept them. If you do not agree, stop using
        the Service and close your account.
      </p>
    ),
  },
  {
    id: "general",
    title: "General terms",
    body: (
      <ul>
        <li>
          <strong>Entire agreement.</strong> These Terms, the Privacy Policy and any terms shown to
          you for specific features are the entire agreement between you and {C} about the
          Service.
        </li>
        <li>
          <strong>Assignment.</strong> You may not transfer these Terms without our written
          consent. We may transfer them to an affiliate or in connection with a merger,
          acquisition or sale of assets.
        </li>
        <li>
          <strong>Severability and waiver.</strong> If any provision is unenforceable, the rest
          remains in effect. Not enforcing a provision is not a waiver of it.
        </li>
        <li>
          <strong>Force majeure.</strong> We are not responsible for delays or failures caused by
          events beyond our reasonable control, including outages of third-party services such as
          Stripe or email providers.
        </li>
        <li>
          <strong>Electronic communications.</strong> You agree that we may provide notices and
          agreements to you electronically, by email or in the Service, and that they satisfy any
          requirement that they be in writing.
        </li>
        <li>
          <strong>Relationship.</strong> These Terms do not create a partnership, joint venture,
          employment or agency relationship.
        </li>
        <li>
          <strong>Export.</strong> You will comply with US export control and sanctions laws in
          your use of the Service.
        </li>
        <li>
          <strong>Headings</strong> are for convenience only. &ldquo;Including&rdquo; means
          &ldquo;including without limitation.&rdquo;
        </li>
      </ul>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <>
        <p>Questions about these Terms, and any legal notices:</p>
        <address className="legal-address">
          {C} (InvoiceDodo)
          <br />
          Attn: Legal
          <br />
          {LEGAL.mailingAddress}
          <br />
          {legalMail}
        </address>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      path="/terms"
      description={metadata.description as string}
      title="Terms of Service"
      other={{ href: "/privacy", label: "Privacy Policy" }}
      intro={
        <p>
          These terms explain what you can expect from InvoiceDodo and what we expect from you. We
          have tried to keep them readable, but they are a binding agreement, so please read them.
          InvoiceDodo is a product of {C}
        </p>
      }
      summary={[
        <>Joining the waitlist doesn&rsquo;t guarantee access, and early-access features can change.</>,
        <>You own your invoices and data. We only use them to run InvoiceDodo for you.</>,
        <>Reminders go out in your name, on your settings. You&rsquo;re responsible for what you bill and send.</>,
        <>Payments run through Stripe. We never hold your money, and Stripe&rsquo;s own terms apply.</>,
        <>Core features are free. Processing fees are shown before you send, and we give 30 days&rsquo; notice of any fee change.</>,
        <>AI drafts and tax estimates are helpers, not advice. Always check before you send.</>,
        <>Disputes go to individual arbitration unless you opt out within 30 days.</>,
      ]}
      sections={sections}
    />
  );
}
