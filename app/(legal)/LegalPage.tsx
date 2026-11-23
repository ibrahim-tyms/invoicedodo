import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "../components/Brand";
import { LEGAL } from "./config";
import { SITE, WEBSITE_ID, absoluteUrl, breadcrumbLd, jsonLd } from "../lib/site";

export type LegalSection = { id: string; title: string; body: ReactNode };

export function LegalPage({
  title,
  intro,
  summary,
  sections,
  other,
  path,
  description,
}: {
  title: string;
  intro: ReactNode;
  summary: ReactNode[];
  sections: LegalSection[];
  other: { href: string; label: string };
  path: string;
  description: string;
}) {
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${absoluteUrl(path)}#webpage`,
        url: absoluteUrl(path),
        name: `${title} | ${SITE.name}`,
        description,
        isPartOf: { "@id": WEBSITE_ID },
        inLanguage: "en-US",
        dateModified: new Date(LEGAL.lastUpdated).toISOString().slice(0, 10),
      },
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: title, path },
      ]),
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(ld)} />
      <a href="#legal-main" className="skip">
        Skip to content
      </a>
      <header className="legal-top">
        <div className="wrap legal-nav">
          <Link href="/" className="nav-logo" aria-label="InvoiceDodo home">
            <Logo height={28} />
          </Link>
          <Link href="/#join" className="btn btn-primary btn-sm">
            Get early access
          </Link>
        </div>
        <div className="wrap legal-hero">
          <p className="kicker">Legal</p>
          <h1 className="h2">{title}</h1>
          <p className="legal-dates">
            Effective {LEGAL.effectiveDate} · Last updated {LEGAL.lastUpdated}
          </p>
          <div className="legal-intro">{intro}</div>
        </div>
      </header>

      <div className="wrap legal-grid">
        <nav className="legal-toc" aria-label="On this page">
          <p className="label">On this page</p>
          <ol>
            {sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>
                  <span>{i + 1}.</span> {s.title}
                </a>
              </li>
            ))}
          </ol>
          <p className="legal-other">
            See also: <Link href={other.href}>{other.label}</Link>
          </p>
        </nav>

        <main id="legal-main" className="legal-body">
          <section className="legal-summary" aria-labelledby="summary-h">
            <h2 id="summary-h">The short version</h2>
            <ul>
              {summary.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
            <p className="legal-note">
              This summary is here to help. The full text below is what applies.
            </p>
          </section>

          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="legal-sec" aria-labelledby={`${s.id}-h`}>
              <h2 id={`${s.id}-h`}>
                <span className="legal-num">{i + 1}.</span> {s.title}
              </h2>
              {s.body}
            </section>
          ))}
        </main>
      </div>

      <footer className="legal-foot">
        <div className="wrap foot-base">
          <Link href="/" aria-label="InvoiceDodo home" className="foot-logo">
            <Logo height={24} />
          </Link>
          <nav aria-label="Legal" className="legal-foot-links">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <a href={`mailto:${LEGAL.privacyEmail}`}>{LEGAL.privacyEmail}</a>
          </nav>
          <span className="foot-copy">
            © 2026 {LEGAL.company} · {LEGAL.product} is a product of {LEGAL.company}
          </span>
        </div>
      </footer>
    </>
  );
}
