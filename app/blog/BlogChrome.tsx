import Link from "next/link";
import type { ReactNode } from "react";
import { SiteFooter } from "../components/SiteFooter";
import { SiteNav } from "../components/SiteNav";

export function BlogHeader({ children }: { children?: ReactNode }) {
  return (
    <>
      <SiteNav />
      <header className="blog-top" data-accent="mint">
        {children}
      </header>
    </>
  );
}

export function BlogFooter() {
  return <SiteFooter source="blog-footer" />;
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
