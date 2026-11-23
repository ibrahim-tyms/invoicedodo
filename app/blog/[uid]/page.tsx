import type { Metadata } from "next";
import Link from "next/link";
import { SliceZone } from "@prismicio/react";
import { PrismicNextImage, getPreviewRef } from "@prismicio/next";
import { asImageSrc, asLink, asText, isFilled } from "@prismicio/client";
import { components } from "@/slices";
import { BlogFooter, BlogHeader, Breadcrumbs } from "../BlogChrome";
import { PostCard } from "../PostCard";
import { WaitlistForm } from "../../components/WaitlistForm";
import { Prose } from "../../components/Prose";
import { citationMap, citationOrder, getSources } from "../../lib/citations";
import {
  type Post,
  formatDate,
  getPost,
  getPosts,
  postHeadings,
  postTitle,
  publishedISO,
  readingMinutes,
  rel,
  updatedISO,
  wordCount,
} from "../../lib/blog";
import { ORG_ID, SITE, WEBSITE_ID, absoluteUrl, breadcrumbLd, jsonLd } from "../../lib/site";

type AuthorData = { name?: string; role?: string; avatar?: { url?: string | null } };

export async function generateStaticParams() {
  const posts = await getPosts();
  // Cache Components needs at least one param at build time, even before the first post exists.
  return posts.length ? posts.map((p) => ({ uid: p.uid })) : [{ uid: "coming-soon" }];
}

export async function generateMetadata({ params }: PageProps<"/blog/[uid]">): Promise<Metadata> {
  const { uid } = await params;
  const post = await getPost(uid, await getPreviewRef());
  const d = post.data;
  const title = d.meta_title || postTitle(post);
  const description = d.meta_description || d.excerpt || undefined;
  const author = rel<AuthorData>(d.author);
  const cat = rel<{ name?: string }>(d.category);
  const canonical = asLink(d.canonical_url) || `/blog/${post.uid}`;

  return {
    title: { absolute: `${title} | ${SITE.name}` },
    description,
    alternates: { canonical },
    authors: author?.name ? [{ name: author.name, url: `/blog/author/${author.uid}` }] : undefined,
    robots: d.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "article",
      url: `/blog/${post.uid}`,
      title,
      description,
      publishedTime: publishedISO(post),
      modifiedTime: updatedISO(post),
      authors: author?.name ? [absoluteUrl(`/blog/author/${author.uid}`)] : undefined,
      section: cat?.name,
      tags: post.tags,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[uid]">) {
  const { uid } = await params;
  const ref = await getPreviewRef();
  const post = await getPost(uid, ref);
  const d = post.data;
  const title = postTitle(post);
  const author = rel<AuthorData>(d.author);
  const reviewer = rel<AuthorData>(d.reviewer);
  const cat = rel<{ name?: string }>(d.category);
  const headings = postHeadings(post);
  const takeaways = d.key_takeaways.filter((t) => t.point);
  const faqs = d.faqs.filter((f) => f.question && isFilled.richText(f.answer));
  const sources = await getSources(citationOrder(post), ref);
  const citations = citationMap(sources.map((s) => s.id));
  const related = await relatedPosts(post, ref);
  const url = absoluteUrl(`/blog/${post.uid}`);
  const image =
    asImageSrc(d.meta_image, { w: 1200, h: 630, fit: "crop" }) ||
    asImageSrc(d.featured_image, { w: 1200, h: 630, fit: "crop" }) ||
    `${url}/opengraph-image`;

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        url,
        headline: title.slice(0, 110),
        description: d.meta_description || d.excerpt || undefined,
        image: [image],
        datePublished: publishedISO(post),
        dateModified: updatedISO(post),
        wordCount: wordCount(post),
        timeRequired: `PT${readingMinutes(post)}M`,
        articleSection: cat?.name,
        keywords: post.tags.length ? post.tags.join(", ") : undefined,
        inLanguage: "en-US",
        isPartOf: { "@id": `${absoluteUrl("/blog")}#blog` },
        publisher: { "@id": ORG_ID },
        author: author?.name
          ? {
              "@type": "Person",
              "@id": `${absoluteUrl(`/blog/author/${author.uid}`)}#person`,
              name: author.name,
              jobTitle: author.role,
              url: absoluteUrl(`/blog/author/${author.uid}`),
            }
          : { "@id": ORG_ID },
        ...(reviewer?.name
          ? {
              reviewedBy: {
                "@type": "Person",
                name: reviewer.name,
                jobTitle: reviewer.role,
                url: absoluteUrl(`/blog/author/${reviewer.uid}`),
              },
            }
          : {}),
        ...(sources.length
          ? {
              citation: sources.map((s) => ({
                "@type": "CreativeWork",
                name: s.data.title || undefined,
                publisher: s.data.publisher ? { "@type": "Organization", name: s.data.publisher } : undefined,
                datePublished: s.data.year ? String(s.data.year) : undefined,
                url: asLink(s.data.url) || undefined,
              })),
            }
          : {}),
      },
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        ...(cat?.uid ? [{ name: cat.name ?? "Category", path: `/blog/category/${cat.uid}` }] : []),
        { name: title, path: `/blog/${post.uid}` },
      ]),
      ...(faqs.length
        ? [
            {
              "@type": "FAQPage",
              "@id": `${url}#faq`,
              isPartOf: { "@id": WEBSITE_ID },
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: asText(f.answer) },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(ld)} />
      <BlogHeader>
        <div className="wrap article-hero">
          <Breadcrumbs
            items={[
              { name: "Blog", href: "/blog" },
              ...(cat?.uid ? [{ name: cat.name ?? "Category", href: `/blog/category/${cat.uid}` }] : []),
            ]}
          />
          <h1 className="article-title">{title}</h1>
          {d.excerpt && <p className="article-dek">{d.excerpt}</p>}
          <div className="byline">
            {author?.name && (
              <Link href={`/blog/author/${author.uid}`} className="byline-who">
                {author.avatar?.url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={`${author.avatar.url}&w=88&h=88&fit=crop`} alt="" width={44} height={44} />
                )}
                <span>
                  <b>{author.name}</b>
                  {author.role && <small>{author.role}</small>}
                </span>
              </Link>
            )}
            <dl className="byline-facts">
              {reviewer?.name && (
                <div>
                  <dt>Reviewed by</dt>
                  <dd>
                    <Link href={`/blog/author/${reviewer.uid}`}>{reviewer.name}</Link>
                  </dd>
                </div>
              )}
              <div>
                <dt>Published</dt>
                <dd>
                  <time dateTime={publishedISO(post)}>{formatDate(publishedISO(post))}</time>
                </dd>
              </div>
              {updatedISO(post) !== publishedISO(post) && (
                <div>
                  <dt>Updated</dt>
                  <dd>
                    <time dateTime={updatedISO(post)}>{formatDate(updatedISO(post))}</time>
                  </dd>
                </div>
              )}
              <div>
                <dt>Read</dt>
                <dd>{readingMinutes(post)} min</dd>
              </div>
            </dl>
          </div>
        </div>
      </BlogHeader>

      <main id="main" className="wrap article-grid">
        <aside className="article-side">
          {headings.length > 1 && (
            <nav aria-label="In this article" className="legal-toc article-toc">
              <p className="label">In this article</p>
              <ol>
                {headings.map((h, i) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`}>
                      <span>{i + 1}.</span> {h.text}
                    </a>
                  </li>
                ))}
                {faqs.length > 0 && (
                  <li>
                    <a href="#faq">
                      <span>{headings.length + 1}.</span> FAQ
                    </a>
                  </li>
                )}
                {sources.length > 0 && (
                  <li>
                    <a href="#references">
                      <span>{headings.length + (faqs.length ? 2 : 1)}.</span> References
                    </a>
                  </li>
                )}
              </ol>
            </nav>
          )}
        </aside>

        <article className="article-body">
          {isFilled.image(d.featured_image) && (
            <figure className="article-cover">
              <PrismicNextImage field={d.featured_image} priority sizes="(min-width: 1100px) 760px, 100vw" fallbackAlt="" />
              {d.featured_image.copyright && <figcaption>{d.featured_image.copyright}</figcaption>}
            </figure>
          )}

          {takeaways.length > 0 && (
            <section className="legal-summary takeaways" aria-labelledby="tk-h">
              <h2 id="tk-h">Key takeaways</h2>
              <ul>
                {takeaways.map((t, i) => (
                  <li key={i}>{t.point}</li>
                ))}
              </ul>
            </section>
          )}

          <SliceZone slices={d.slices} components={components} context={{ citations }} />

          {faqs.length > 0 && (
            <section id="faq" className="article-faq" aria-labelledby="faq-h">
              <h2 id="faq-h">Frequently asked questions</h2>
              <div className="faq">
                {faqs.map((f) => (
                  <details key={f.question}>
                    <summary>{f.question}</summary>
                    <Prose field={f.answer} citations={citations} className="faq-a" />
                  </details>
                ))}
              </div>
            </section>
          )}

          {sources.length > 0 && (
            <section className="sources" id="references" aria-labelledby="src-h">
              <h2 id="src-h">References</h2>
              <ol>
                {sources.map((s, i) => {
                  const href = asLink(s.data.url);
                  return (
                    <li key={s.id} id={`ref-${i + 1}`}>
                      {s.data.publisher && <span>{s.data.publisher}. </span>}
                      {href ? (
                        <a href={href} target="_blank" rel="noopener">
                          {s.data.title || href}
                        </a>
                      ) : (
                        s.data.title
                      )}
                      {s.data.year ? <span> ({s.data.year})</span> : null}
                      {s.data.accessed ? <span className="ref-acc"> Checked {formatDate(s.data.accessed)}.</span> : null}
                    </li>
                  );
                })}
              </ol>
            </section>
          )}

          {author?.name && (
            <section className="author-box" aria-label="About the author">
              {author.avatar?.url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={`${author.avatar.url}&w=128&h=128&fit=crop`} alt="" width={64} height={64} />
              )}
              <div>
                <span className="label">Written by</span>
                <Link href={`/blog/author/${author.uid}`} className="author-name">
                  {author.name}
                </Link>
                {author.role && <p>{author.role}</p>}
              </div>
            </section>
          )}

          <aside className="article-cta" data-accent="mint" aria-label="Join InvoiceDodo">
            <h2>Never chase a client again.</h2>
            <p>InvoiceDodo writes your invoices, sends them and follows up politely until you&rsquo;re paid.</p>
            <WaitlistForm source={`blog:${post.uid}`} />
          </aside>
        </article>
      </main>

      {related.length > 0 && (
        <section className="wrap related" aria-labelledby="rel-h">
          <h2 id="rel-h" className="label">
            Keep reading
          </h2>
          <div className="post-grid">
            {related.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}
      <BlogFooter />
    </>
  );
}

/** Hand-picked related posts first, then fill from the same category, then the newest. */
async function relatedPosts(post: Post, ref?: string) {
  const all = (await getPosts(ref)).filter((p) => p.id !== post.id);
  const picked = post.data.related_posts
    .map((r) => rel(r.post)?.id)
    .filter(Boolean)
    .map((id) => all.find((p) => p.id === id))
    .filter((p): p is Post => Boolean(p));
  const catId = rel(post.data.category)?.id;
  const sameCat = all.filter((p) => catId && rel(p.data.category)?.id === catId);
  const out: Post[] = [];
  for (const p of [...picked, ...sameCat, ...all]) {
    if (!out.includes(p)) out.push(p);
    if (out.length === 3) break;
  }
  return out;
}
