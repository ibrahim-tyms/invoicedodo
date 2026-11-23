import { cacheLife } from "next/cache";
import * as prismic from "@prismicio/client";
import { cacheTagPrismicPages } from "@prismicio/next";
import type { Content } from "@prismicio/client";
import { createClient } from "@/prismicio";

/** Maps a Source document id to its footnote number. Passed to slices as SliceZone context. */
export type Citations = Record<string, number>;
export type SliceContext = { citations?: Citations };

type Span = { type: string; data?: { link_type?: string; type?: string; id?: string } };

function sourceIdsIn(field: prismic.RichTextField | null | undefined): string[] {
  const ids: string[] = [];
  for (const block of field ?? []) {
    const spans = (block as { spans?: Span[] }).spans ?? [];
    for (const s of spans) {
      if (s.type === "hyperlink" && s.data?.link_type === "Document" && s.data.type === "source" && s.data.id) {
        ids.push(s.data.id);
      }
    }
  }
  return ids;
}

const relId = (f: unknown) =>
  prismic.isFilled.contentRelationship(f as prismic.ContentRelationshipField)
    ? (f as { id: string }).id
    : undefined;

/**
 * Footnote order: sources cited inline in the body (in reading order), then
 * sources attached to stats, then FAQ citations, then any extra entries in the
 * post's References list.
 */
export function citationOrder(post: Content.BlogPostDocument): string[] {
  const ids: string[] = [];
  for (const s of post.data.slices) {
    if (s.slice_type === "rich_text") ids.push(...sourceIdsIn(s.primary.content));
    else if (s.slice_type === "callout") ids.push(...sourceIdsIn(s.primary.body));
    else if (s.slice_type === "quote") ids.push(...sourceIdsIn(s.primary.quote));
    else if (s.slice_type === "stats") s.primary.items.forEach((i) => ids.push(relId(i.source) ?? ""));
  }
  post.data.faqs.forEach((f) => ids.push(...sourceIdsIn(f.answer)));
  post.data.references.forEach((r) => ids.push(relId(r.source) ?? ""));
  return [...new Set(ids.filter(Boolean))];
}

export function citationMap(order: string[]): Citations {
  return Object.fromEntries(order.map((id, i) => [id, i + 1]));
}

export async function getSources(ids: string[], ref?: string): Promise<Content.SourceDocument[]> {
  "use cache";
  cacheLife("max");
  if (!ids.length) return [];
  try {
    const docs = await createClient().getAllByIDs<Content.SourceDocument>(ids, { ref });
    cacheTagPrismicPages(docs);
    const byId = new Map(docs.map((d) => [d.id, d]));
    return ids.map((id) => byId.get(id)).filter((d): d is Content.SourceDocument => Boolean(d));
  } catch {
    return [];
  }
}
