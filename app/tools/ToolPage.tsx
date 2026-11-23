import Link from "next/link";
import type { ReactNode } from "react";
import { BlogFooter, BlogHeader, Breadcrumbs } from "../blog/BlogChrome";
import { RESOURCE_TOOLS } from "../lib/resources";
import { ORG_ID, SITE, WEBSITE_ID, absoluteUrl, breadcrumbLd, jsonLd } from "../lib/site";
import { DocTool } from "./engine/DocTool";
import type { DocMode, Preset } from "./engine/model";

export type Faq = { q: string; a: string };
export type Ref = { title: string; publisher: string; url: string; checked: string };

/** Section heading with an anchor for the "On this page" list. */
export function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="tool-h2 anchor-target">
      {children}
    </h2>
  );
}

/** Numbered citation, e.g. <Cite n={1} /> → [1], linking to the reference list. */
export function Cite({ n }: { n: number }) {
  return (
    <sup className="cite">
      <a href={`#ref-${n}`} aria-label={`Source ${n}`}>
        [{n}]
      </a>
    </sup>
  );
}

/** Inline illustration. Width/height are the SVG's intrinsic size, to prevent layout shift. */
export function Figure({ src, alt, caption, width, height }: { src: string; alt: string; caption: string; width: number; height: number }) {
  return (
    <figure className="tool-fig">
      {/* eslint-disable-next-line @next/next/no-img-element -- static SVG illustrations, no optimisation needed */}
      <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export function ToolPage({
  path,
  name,
  kicker,
  h1,
  intro,
  mode,
  preset,
  presetKey,
  faqs,
  refs = [],
  toc = [],
  children,
  crumbs,
}: {
  path: string;
  name: string;
  kicker: string;
  h1: string;
  intro: string;
  mode: DocMode;
  preset?: Preset;
  presetKey?: string;
  faqs: Faq[];
  refs?: Ref[];
  toc?: { id: string; label: string }[];
  children: ReactNode;
  crumbs?: { name: string; path: string }[];
}) {
  const trail = crumbs ?? [
    { name: "Home", path: "/" },
    { name, path },
  ];
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${absoluteUrl(path)}#app`,
        name: `${name} by ${SITE.name}`,
        url: absoluteUrl(path),
        description: intro,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Any (web browser)",
        browserRequirements: "Requires JavaScript",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        publisher: { "@id": ORG_ID },
        isPartOf: { "@id": WEBSITE_ID },
        inLanguage: "en-US",
        ...(refs.length ? { citation: refs.map((r) => ({ "@type": "CreativeWork", name: r.title, url: r.url, publisher: r.publisher })) } : {}),
      },
      {
        "@type": "FAQPage",
        "@id": `${absoluteUrl(path)}#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      breadcrumbLd(trail),
    ],
  };

  const onPage = [...toc, { id: "faq", label: "FAQs" }, ...(refs.length ? [{ id: "references", label: "References" }] : [])];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(ld)} />
      <BlogHeader>
        <div className="wrap tool-hero">
          <Breadcrumbs items={trail.map((c, i) => ({ name: c.name, href: i < trail.length - 1 ? c.path : undefined }))} />
          <p className="kicker">{kicker}</p>
          <h1 className="h2">{h1}</h1>
          <p className="legal-intro">{intro}</p>
        </div>
      </BlogHeader>

      <main id="main">
        <section className="wrap tool-wrap" aria-label={name}>
          <DocTool mode={mode} preset={preset} presetKey={presetKey} />
        </section>

        <div className="wrap tool-content">
          <div className="tool-main">
            <article className="tool-guide">{children}</article>

            <section className="tool-faq" aria-labelledby="faq">
              <H2 id="faq">Frequently asked questions</H2>
              {faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </section>

            {refs.length > 0 && (
              <section className="tool-refs" aria-labelledby="references">
                <H2 id="references">References</H2>
                <ol>
                  {refs.map((r, i) => (
                    <li key={r.url} id={`ref-${i + 1}`}>
                      <a href={r.url} target="_blank" rel="noopener">
                        {r.title}
                      </a>
                      <span>
                        {" "}
                        · {r.publisher} · checked {r.checked}
                      </span>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </div>

          <aside className="tool-aside" aria-label="On this page and more tools">
            <nav aria-label="On this page" className="tool-toc">
              <p className="res-h">On this page</p>
              <ul>
                {onPage.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`}>{t.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="More free tools" className="tool-more">
              <p className="res-h">More free tools</p>
              <ul>
                {RESOURCE_TOOLS.filter((t) => t.href !== path).map((t) => (
                  <li key={t.href}>
                    <Link href={t.href}>{t.label}</Link>
                    <span>{t.blurb}</span>
                  </li>
                ))}
                <li>
                  <Link href="/blog">Blog</Link>
                  <span>Guides on invoicing and getting paid</span>
                </li>
              </ul>
            </nav>
            <div className="tool-aside-cta">
              <p>
                <b>Stop chasing late payments.</b> InvoiceDodo follows up politely until you&rsquo;re paid.
              </p>
              <Link href="/#join" className="btn btn-primary btn-sm">
                Get early access
              </Link>
            </div>
          </aside>
        </div>
      </main>
      <BlogFooter />
    </>
  );
}
