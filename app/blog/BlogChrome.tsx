import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "../components/Brand";
import { WaitlistForm } from "../components/WaitlistForm";
import { Headline } from "../components/Frame";

export function BlogHeader({ children }: { children?: ReactNode }) {
  return (
    <header className="blog-top" data-accent="mint">
      <div className="wrap legal-nav">
        <Link href="/" className="nav-logo" aria-label="InvoiceDodo home">
          <Logo height={28} />
        </Link>
        <nav aria-label="Blog" className="blog-nav">
          <Link href="/blog">Blog</Link>
          <Link href="/#follow-ups">Product</Link>
          <Link href="/#join" className="btn btn-primary btn-sm">
            Get early access
          </Link>
        </nav>
      </div>
      {children}
    </header>
  );
}

export function BlogFooter() {
  return (
    <footer className="foot" data-accent="mint">
      <div className="wrap">
        <div className="foot-cta">
          <div>
            <Headline lead="Stop chasing." highlight="Start getting paid." />
            <p className="body-lg">
              InvoiceDodo writes the invoice, sends it and follows up politely until you&rsquo;re
              paid. Join the early access list.
            </p>
          </div>
          <WaitlistForm source="blog-footer" />
        </div>
        <div className="foot-base">
          <Link href="/" aria-label="InvoiceDodo home" className="foot-logo">
            <Logo height={26} />
          </Link>
          <p className="foot-tag">The awkward chase is going the way of the dodo.</p>
          <nav aria-label="Footer" className="legal-foot-links">
            <Link href="/blog">Blog</Link>
            <Link href="/blog/rss.xml">RSS</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </nav>
          <span className="foot-copy">© 2026 InvoiceDodo</span>
        </div>
      </div>
    </footer>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="crumbs">
      <ol>
        {items.map((it, i) => (
          <li key={i}>
            {it.href ? <Link href={it.href}>{it.name}</Link> : <span aria-current="page">{it.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
