"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";

type Item = { href: string; label: string };

/** Phone and tablet menu: a two-line hamburger that turns into an X and opens a sheet below the bar. */
export function MobileMenu({ items, cta = { href: "#join", label: "Get early access" } }: { items: Item[]; cta?: Item }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth > 860 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    document.documentElement.classList.add("menu-open");
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.documentElement.classList.remove("menu-open");
    };
  }, [open]);

  const close = () => setOpen(false);
  const isHash = (h: string) => h.startsWith("#");

  return (
    <div className="mm">
      <button
        type="button"
        className={`mm-btn${open ? " is-open" : ""}`}
        aria-expanded={open}
        aria-controls={`${id}-sheet`}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
      </button>
      <div id={`${id}-sheet`} className={`mm-sheet${open ? " is-open" : ""}`} hidden={!open}>
        <ul>
          {items.map((it) => (
            <li key={it.href}>
              {isHash(it.href) ? (
                <a href={it.href} onClick={close}>
                  {it.label}
                </a>
              ) : (
                <Link href={it.href} onClick={close}>
                  {it.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <a href={cta.href} className="btn btn-primary mm-cta" onClick={close}>
          {cta.label}
        </a>
      </div>
      {open && <button type="button" className="mm-scrim" aria-label="Close menu" tabIndex={-1} onClick={close} />}
    </div>
  );
}
