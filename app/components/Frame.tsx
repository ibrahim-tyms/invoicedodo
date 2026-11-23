import type { ReactNode } from "react";

export type Accent = "mint" | "sky" | "amber";

/** Two-part headline. The short phrase sits in an ink box with the section's accent colour. */
export function Headline({
  as: Tag = "h2",
  lead,
  highlight,
  id,
}: {
  as?: "h1" | "h2";
  lead: ReactNode;
  highlight: ReactNode;
  id?: string;
}) {
  return (
    <Tag className={Tag === "h1" ? "h1" : "h2"} id={id}>
      <span className="hl-lead">{lead}</span>{" "}
      <span className="hl">
        <span className="hl-box">{highlight}</span>
        <span className="hl-bar" aria-hidden="true" />
      </span>
    </Tag>
  );
}

export function Kicker({ children }: { children: ReactNode }) {
  return <p className="kicker">{children}</p>;
}

/** Tinted stage that holds a product preview (light, paper-like UI). */
export function Stage({
  children,
  className = "",
  label = "Preview",
}: {
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <div className={`stage ${className}`}>
      <span className="stage-label" aria-hidden="true">
        {label}
      </span>
      <div className="stage-inner">{children}</div>
    </div>
  );
}
