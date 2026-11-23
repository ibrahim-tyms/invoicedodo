"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { RESOURCE_LEARN, RESOURCE_TOOLS } from "../lib/resources";

/** "Resources" dropdown: free tools + blog. Opens on click, closes on Escape, outside click or navigation. */
export function ResourcesMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="res" ref={ref}>
      <button type="button" className="res-btn" aria-expanded={open} aria-controls="res-panel" onClick={() => setOpen((o) => !o)}>
        Resources
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
          <path d="M1.5 3.5 5 7l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </button>
      <div id="res-panel" className="res-panel" hidden={!open}>
        <div>
          <p className="res-h">Free tools</p>
          <ul>
            {RESOURCE_TOOLS.map((t) => (
              <li key={t.href}>
                <Link href={t.href} onClick={() => setOpen(false)}>
                  <b>{t.label}</b>
                  <span>{t.blurb}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="res-h">Learn</p>
          <ul>
            {RESOURCE_LEARN.map((t) => (
              <li key={t.href}>
                <Link href={t.href} onClick={() => setOpen(false)}>
                  <b>{t.label}</b>
                  <span>{t.blurb}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
