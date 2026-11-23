import type { Metadata } from "next";
import { getPreviewRef } from "@prismicio/next";
import { BlogFooter, BlogHeader, Breadcrumbs } from "../../BlogChrome";
import { PostCard } from "../../PostCard";
import { byCategory, getCategories, getCategory, getPosts, postTitle } from "../../../lib/blog";
import { WEBSITE_ID, absoluteUrl, breadcrumbLd, jsonLd } from "../../../lib/site";

export async function generateStaticParams() {
  const cats = await getCategories();
  return cats.length ? cats.map((c) => ({ uid: c.uid })) : [{ uid: "coming-soon" }];
}

export async function generateMetadata({ params }: PageProps<"/blog/category/[uid]">): Promise<Metadata> {
  const { uid } = await params;
  const cat = await getCategory(uid, await getPreviewRef());
  const title = cat.data.meta_title || `${cat.data.name}: Guides and Articles`;
  const description = cat.data.meta_description || cat.data.description || undefined;
  return {
    title,
    description,
    alternates: { canonical: `/blog/category/${cat.uid}` },
    openGraph: { type: "website", url: `/blog/category/${cat.uid}`, title, description },
  };
}

export default async function CategoryPage({ params }: PageProps<"/blog/category/[uid]">) {
  const { uid } = await params;
  const ref = await getPreviewRef();
  const cat = await getCategory(uid, ref);
  const posts = await getPosts(ref, byCategory(cat.id));
  const path = `/blog/category/${cat.uid}`;

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${absoluteUrl(path)}#page`,
        url: absoluteUrl(path),
        name: cat.data.name,
        description: cat.data.description || undefined,
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: posts.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: absoluteUrl(`/blog/${p.uid}`),
            name: postTitle(p),
          })),
        },
      },
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: cat.data.name ?? "Category", path },
      ]),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(ld)} />
      <BlogHeader>
        <div className="wrap blog-hero">
          <Breadcrumbs items={[{ name: "Blog", href: "/blog" }]} />
          <h1 className="h2">{cat.data.name}</h1>
          {cat.data.description && <p className="legal-intro">{cat.data.description}</p>}
        </div>
      </BlogHeader>
      <main id="main" className="wrap blog-main">
        {posts.length ? (
          <div className="post-grid">
            {posts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        ) : (
          <p className="blog-empty">No articles here yet.</p>
        )}
      </main>
      <BlogFooter />
    </>
  );
}
