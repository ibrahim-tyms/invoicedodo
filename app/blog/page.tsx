import type { Metadata } from "next";
import Link from "next/link";
import { getPreviewRef } from "@prismicio/next";
import { BlogFooter, BlogHeader } from "./BlogChrome";
import { PostCard } from "./PostCard";
import { getCategories, getPosts, postTitle } from "../lib/blog";
import { ORG_ID, SITE, WEBSITE_ID, absoluteUrl, breadcrumbLd, jsonLd } from "../lib/site";

const TITLE = "The InvoiceDodo Blog: Getting Paid, Invoicing and Freelance Taxes";
const DESCRIPTION =
  "Practical, fact-checked guides for freelancers and small businesses: how to get paid on time, write invoices clients pay, follow up without the awkwardness, and stay ahead of taxes.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/blog/rss.xml" } },
  openGraph: { type: "website", url: "/blog", title: TITLE, description: DESCRIPTION },
};

export default async function BlogIndex() {
  const ref = await getPreviewRef();
  const [posts, categories] = await Promise.all([getPosts(ref), getCategories(ref)]);
  const [featured, ...rest] = posts;

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${absoluteUrl("/blog")}#blog`,
        url: absoluteUrl("/blog"),
        name: "The InvoiceDodo Blog",
        description: DESCRIPTION,
        publisher: { "@id": ORG_ID },
        isPartOf: { "@id": WEBSITE_ID },
        inLanguage: "en-US",
        blogPost: posts.slice(0, 20).map((p) => ({
          "@type": "BlogPosting",
          headline: postTitle(p),
          url: absoluteUrl(`/blog/${p.uid}`),
        })),
      },
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
      ]),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(ld)} />
      <BlogHeader>
        <div className="wrap blog-hero">
          <p className="kicker">The {SITE.name} Blog</p>
          <h1 className="h2">
            <span className="hl-lead">Get paid on time.</span>{" "}
            <span className="hl">
              <span className="hl-box">Keep more of it.</span>
              <span className="hl-bar" aria-hidden="true" />
            </span>
          </h1>
          <p className="legal-intro">{DESCRIPTION}</p>
          {categories.length > 0 && (
            <nav aria-label="Categories" className="cat-chips">
              <Link href="/blog" aria-current="page">
                All
              </Link>
              {categories.map((c) => (
                <Link key={c.id} href={`/blog/category/${c.uid}`}>
                  {c.data.name}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </BlogHeader>

      <main id="main" className="wrap blog-main">
        {posts.length === 0 ? (
          <p className="blog-empty">The first articles are on their way. Check back soon.</p>
        ) : (
          <>
            <PostCard post={featured} featured />
            {rest.length > 0 && (
              <section aria-labelledby="latest-h" className="blog-latest">
                <h2 id="latest-h" className="label">
                  Latest articles
                </h2>
                <div className="post-grid">
                  {rest.map((p) => (
                    <PostCard key={p.id} post={p} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>
      <BlogFooter />
    </>
  );
}
