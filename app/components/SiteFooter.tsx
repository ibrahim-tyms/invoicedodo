import Link from "next/link";
import type { ReactNode } from "react";
import { RESOURCE_LEARN, RESOURCE_TOOLS } from "../lib/resources";
import { Logo } from "./Brand";
import { Headline } from "./Frame";
import { DodoMascot } from "./Mascot";
import { WaitlistForm } from "./WaitlistForm";

/**
 * The one site-wide footer: early-access sign-up, link columns and a base row, identical on every page.
 * `source` tags waitlist sign-ups by page type. `legalNote` adds the legal-entity line (legal pages only).
 */
export function SiteFooter({ source, onHome = false, legalNote }: { source: string; onHome?: boolean; legalNote?: ReactNode }) {
  const base = onHome ? "" : "/";
  const columns: { title: string; links: { href: string; label: string }[] }[] = [
    {
      title: "Product",
      links: [
        { href: `${base}#get-paid`, label: "Get paid" },
        { href: `${base}#taxes`, label: "Taxes" },
        { href: `${base}#pricing`, label: "Pricing" },
        { href: `${base}#faq`, label: "FAQ" },
      ],
    },
    { title: "Free tools", links: RESOURCE_TOOLS.map((t) => ({ href: t.href, label: t.label })) },
    {
      title: "Learn",
      links: [...RESOURCE_LEARN.map((t) => ({ href: t.href, label: t.label })), { href: "/blog/rss.xml", label: "RSS feed" }],
    },
    {
      title: "Legal",
      links: [
        { href: "/privacy", label: "Privacy Policy" },
        { href: "/terms", label: "Terms of Service" },
      ],
    },
  ];

  return (
    <footer className="foot" data-accent="mint">
      <div className="wrap">
        <div className="foot-cta">
          <div className="foot-cta-text">
            <DodoMascot pose="fly" size={84} delay={1.7} className="foot-dodo" />
            <Headline lead="Your next invoice," highlight="paid by Friday." />
            <p className="body-lg">
              We&rsquo;re letting people in a few at a time. Leave your email and Dodo will save you a spot.
            </p>
          </div>
          <WaitlistForm source={source} />
        </div>

        <nav className="foot-cols" aria-label="Footer">
          {columns.map((c) => (
            <div key={c.title}>
              <p className="res-h">{c.title}</p>
              <ul>
                {c.links.map((l) => (
                  <li key={l.href}>
                    {l.href.startsWith("#") ? <a href={l.href}>{l.label}</a> : <Link href={l.href}>{l.label}</Link>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="foot-base">
          {onHome ? (
            <a href="#top" aria-label="InvoiceDodo home" className="foot-logo">
              <Logo height={26} />
            </a>
          ) : (
            <Link href="/" aria-label="InvoiceDodo home" className="foot-logo">
              <Logo height={26} />
            </Link>
          )}
          <p className="foot-tag">The awkward chase is going the way of the dodo.</p>
          <span className="foot-copy">{legalNote ?? "© 2026 InvoiceDodo"}</span>
        </div>
      </div>
    </footer>
  );
}
