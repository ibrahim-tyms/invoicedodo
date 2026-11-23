import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import * as prismic from "@prismicio/client";
import { cacheTagPrismicPages } from "@prismicio/next";
import type { Content } from "@prismicio/client";
import { createClient } from "@/prismicio";
import { slugify } from "./slugify";

export type Post = Content.BlogPostDocument;
export type Author = Content.AuthorDocument;
export type Category = Content.BlogCategoryDocument;

const ORDER = [
  { field: "my.blog_post.published_date", direction: "desc" as const },
  { field: "document.first_publication_date", direction: "desc" as const },
];

/** Fetches every post, newest first. Never throws, so the site still builds before content exists. */
export async function getPosts(ref?: string, filters: string[] = []): Promise<Post[]> {
  "use cache";
  cacheLife("max");
  try {
    const posts = await createClient().getAllByType("blog_post", { ref, orderings: ORDER, filters });
    cacheTagPrismicPages(posts);
    return posts;
  } catch (e) {
    console.warn("[blog] could not load posts:", (e as Error).message);
    return [];
  }
}

export async function getPost(uid: string, ref?: string): Promise<Post> {
  "use cache";
  cacheLife("max");
  const post = await createClient()
    .getByUID("blog_post", uid, { ref })
    .catch(() => notFound());
  cacheTagPrismicPages([post]);
  return post;
}

export async function getAuthors(ref?: string): Promise<Author[]> {
  "use cache";
  cacheLife("max");
  try {
    const authors = await createClient().getAllByType("author", { ref });
    cacheTagPrismicPages(authors);
    return authors;
  } catch {
    return [];
  }
}

export async function getAuthor(uid: string, ref?: string): Promise<Author> {
  "use cache";
  cacheLife("max");
  const author = await createClient()
    .getByUID("author", uid, { ref })
    .catch(() => notFound());
  cacheTagPrismicPages([author]);
  return author;
}

export async function getCategories(ref?: string): Promise<Category[]> {
  "use cache";
  cacheLife("max");
  try {
    const cats = await createClient().getAllByType("blog_category", {
      ref,
      orderings: [{ field: "my.blog_category.name" }],
    });
    cacheTagPrismicPages(cats);
    return cats;
  } catch {
    return [];
  }
}

export async function getCategory(uid: string, ref?: string): Promise<Category> {
  "use cache";
  cacheLife("max");
  const cat = await createClient()
    .getByUID("blog_category", uid, { ref })
    .catch(() => notFound());
  cacheTagPrismicPages([cat]);
  return cat;
}

export const byCategory = (id: string) => [prismic.filter.at("my.blog_post.category", id)];
export const byAuthor = (id: string) => [prismic.filter.at("my.blog_post.author", id)];

/* ---------- helpers ---------- */

export function postTitle(post: Post) {
  return prismic.asText(post.data.title) || post.uid;
}

export function publishedISO(post: Post) {
  return post.data.published_date ?? post.first_publication_date.slice(0, 10);
}

export function updatedISO(post: Post) {
  return post.data.updated_date ?? post.last_publication_date.slice(0, 10);
}

export function formatDate(iso: string) {
  return new Date(`${iso.slice(0, 10)}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Plain text of every text-bearing slice, used for reading time and word count. */
export function postText(post: Post) {
  const parts: string[] = [post.data.excerpt ?? ""];
  for (const s of post.data.slices) {
    const p = s.primary as Record<string, unknown>;
    for (const v of Object.values(p)) {
      if (Array.isArray(v) && v.length && typeof v[0] === "object" && v[0] && "type" in v[0]) {
        parts.push(prismic.asText(v as prismic.RichTextField));
      } else if (typeof v === "string") parts.push(v);
    }
  }
  for (const f of post.data.faqs) parts.push(f.question ?? "", prismic.asText(f.answer));
  return parts.join(" ");
}

export function wordCount(post: Post) {
  return postText(post).split(/\s+/).filter(Boolean).length;
}

export function readingMinutes(post: Post) {
  return Math.max(1, Math.round(wordCount(post) / 230));
}

/** Headings (h2) inside rich-text slices, for the table of contents. */
export function postHeadings(post: Post) {
  const out: { id: string; text: string }[] = [];
  for (const s of post.data.slices) {
    if (s.slice_type !== "rich_text") continue;
    for (const block of s.primary.content) {
      if (block.type === "heading2") out.push({ id: slugify(block.text), text: block.text });
    }
  }
  return out;
}

/** Relationship helpers: content relationships carry fetched fields under `.data`. */
export function rel<T extends Record<string, unknown>>(field: unknown): (T & { uid?: string; id?: string }) | null {
  if (!prismic.isFilled.contentRelationship(field as prismic.ContentRelationshipField)) return null;
  const f = field as { uid?: string; id?: string; data?: T };
  return { ...(f.data ?? ({} as T)), uid: f.uid, id: f.id };
}
