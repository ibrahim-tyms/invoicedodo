import Link from "next/link";
import { RESOURCE_LEARN, RESOURCE_TOOLS } from "../lib/resources";
import { Logo } from "./Brand";
import { MobileMenu } from "./MobileMenu";
import { ResourcesMenu } from "./ResourcesMenu";
import { StickyNav } from "./StickyNav";

/**
 * The one site-wide top bar: same links, Resources menu, CTA and mobile menu on every page.
 * On the home page (`onHome`) section links scroll in place; elsewhere they go to the home page section.
 */
export function SiteNav({ onHome = false }: { onHome?: boolean }) {
  const base = onHome ? "" : "/";
  const sections = [
    { href: `${base}#get-paid`, label: "Get paid" },
    { href: `${base}#taxes`, label: "Taxes" },
    { href: `${base}#pricing`, label: "Pricing" },
  ];
  const join = `${base}#join`;

  return (
    <StickyNav>
      <div className="wrap">
        <nav className="nav" aria-label="Main">
          {onHome ? (
            <a href="#top" className="nav-logo" aria-label="InvoiceDodo home">
              <Logo height={30} />
            </a>
          ) : (
            <Link href="/" className="nav-logo" aria-label="InvoiceDodo home">
              <Logo height={30} />
            </Link>
          )}
          <ul className="nav-links">
            {sections.map((s) => (
              <li key={s.href}>
                {onHome ? <a href={s.href}>{s.label}</a> : <Link href={s.href}>{s.label}</Link>}
              </li>
            ))}
            <li>
              <ResourcesMenu />
            </li>
          </ul>
          <a href={join} className="btn btn-primary btn-sm nav-cta">
            Get early access
          </a>
          <MobileMenu
            cta={{ href: join, label: "Get early access" }}
            items={[
              ...sections,
              { href: `${base}#faq`, label: "FAQ" },
              ...RESOURCE_TOOLS.map((t) => ({ href: t.href, label: t.label })),
              ...RESOURCE_LEARN.map((t) => ({ href: t.href, label: t.label })),
            ]}
          />
        </nav>
      </div>
    </StickyNav>
  );
}
