"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Sticky top bar. Clear over the hero, then frosted (blurred, translucent white
 * with a hairline) once the page scrolls.
 */
export function StickyNav({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div className={`site-nav${scrolled ? " is-scrolled" : ""}`}>{children}</div>;
}
