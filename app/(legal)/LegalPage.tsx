import Link from "next/link";
import type { ReactNode } from "react";
import { SiteFooter } from "../components/SiteFooter";
import { SiteNav } from "../components/SiteNav";
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
      <SiteNav />
      <header className="legal-top">
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

      <SiteFooter
        source="legal-footer"
        legalNote={
          <>
            © 2026 {LEGAL.company} · {LEGAL.product} is a product of {LEGAL.company} ·{" "}
            <a href={`mailto:${LEGAL.privacyEmail}`}>{LEGAL.privacyEmail}</a>
          </>
        }
      />
    </>
  );
}
