import type { ReactNode } from "react";
import Link from "next/link";
import * as prismic from "@prismicio/client";
import { PrismicRichText, type JSXMapSerializer } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import type { Citations } from "../lib/citations";
import { slugify } from "../lib/slugify";

/**
 * Article rich text. Links to a Source document render as numbered footnotes
 * ([1], [2]...) that jump to the References list. Other links resolve through
 * the route resolver; external links open safely.
 */
export function Prose({
  field,
  citations = {},
  className = "prose",
}: {
  field: prismic.RichTextField | null | undefined;
  citations?: Citations;
  className?: string;
}) {
  if (!prismic.isFilled.richText(field)) return null;

  const components: JSXMapSerializer = {
    heading2: ({ children, text }) => <h2 id={slugify(text ?? "")}>{children}</h2>,
    heading3: ({ children, text }) => <h3 id={slugify(text ?? "")}>{children}</h3>,
    hyperlink: ({ node, children }) => {
      const d = node.data as { link_type?: string; type?: string; id?: string; url?: string };
      if (d.link_type === "Document" && d.type === "source" && d.id) {
        const n = citations[d.id];
        return (
          <>
            {children}
            {n ? (
              <sup className="cite">
                <a href={`#ref-${n}`} id={`cite-${n}`} aria-label={`Source ${n}`}>
                  [{n}]
                </a>
              </sup>
            ) : null}
          </>
        );
      }
      if (d.link_type === "Web" && d.url && !d.url.startsWith("/") && !d.url.includes("invoicedodo.com")) {
        return (
          <a href={d.url} target="_blank" rel="noopener">
            {children}
          </a>
        );
      }
      return <PrismicNextLink field={node.data}>{children}</PrismicNextLink>;
    },
  };

  return (
    <div className={className}>
      <PrismicRichText field={field} components={components} />
    </div>
  );
}

export function CiteMark({ id, citations }: { id?: string; citations?: Citations }): ReactNode {
  const n = id ? citations?.[id] : undefined;
  return n ? (
    <sup className="cite">
      <Link href={`#ref-${n}`} aria-label={`Source ${n}`}>
        [{n}]
      </Link>
    </sup>
  ) : null;
}
