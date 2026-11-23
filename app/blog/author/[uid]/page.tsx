import type { Metadata } from "next";
import { PrismicRichText } from "@prismicio/react";
import { getPreviewRef } from "@prismicio/next";
import { asImageSrc, asLink, asText } from "@prismicio/client";
import { BlogFooter, BlogHeader, Breadcrumbs } from "../../BlogChrome";
import { PostCard } from "../../PostCard";
import { byAuthor, getAuthor, getAuthors, getPosts } from "../../../lib/blog";
import { ORG_ID, absoluteUrl, breadcrumbLd, jsonLd } from "../../../lib/site";

export async function generateStaticParams() {
  const authors = await getAuthors();
  return authors.length ? authors.map((a) => ({ uid: a.uid })) : [{ uid: "coming-soon" }];
}

export async function generateMetadata({ params }: PageProps<"/blog/author/[uid]">): Promise<Metadata> {
  const { uid } = await params;
  const a = await getAuthor(uid, await getPreviewRef());
  const description = asText(a.data.bio).slice(0, 160) || `Articles by ${a.data.name} on the InvoiceDodo blog.`;
  return {
    title: `${a.data.name}${a.data.role ? `, ${a.data.role}` : ""}`,
    description,
    alternates: { canonical: `/blog/author/${a.uid}` },
    openGraph: { type: "profile", url: `/blog/author/${a.uid}`, title: a.data.name ?? undefined, description },
  };
}

export default async function AuthorPage({ params }: PageProps<"/blog/author/[uid]">) {
  const { uid } = await params;
  const ref = await getPreviewRef();
  const a = await getAuthor(uid, ref);
  const posts = await getPosts(ref, byAuthor(a.id));
  const path = `/blog/author/${a.uid}`;
  const sameAs = [a.data.linkedin, a.data.x, a.data.website].map((l) => asLink(l)).filter(Boolean);
  const avatar = asImageSrc(a.data.avatar, { w: 256, h: 256, fit: "crop" });

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${absoluteUrl(path)}#page`,
        url: absoluteUrl(path),
        mainEntity: {
          "@type": "Person",
          "@id": `${absoluteUrl(path)}#person`,
          name: a.data.name,
          jobTitle: a.data.role || undefined,
          description: asText(a.data.bio) || undefined,
          image: avatar || undefined,
          knowsAbout: a.data.expertise ? a.data.expertise.split(",").map((s) => s.trim()) : undefined,
          worksFor: { "@id": ORG_ID },
          sameAs: sameAs.length ? sameAs : undefined,
        },
      },
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: a.data.name ?? "Author", path },
      ]),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(ld)} />
      <BlogHeader>
        <div className="wrap blog-hero author-hero">
          <Breadcrumbs items={[{ name: "Blog", href: "/blog" }]} />
          <div className="author-head">
            {avatar && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatar} alt="" width={96} height={96} />
            )}
            <div>
              <h1 className="h2">{a.data.name}</h1>
              {a.data.role && <p className="author-role">{a.data.role}</p>}
            </div>
          </div>
          <div className="legal-intro">
            <PrismicRichText field={a.data.bio} />
          </div>
          {sameAs.length > 0 && (
            <p className="author-links">
              {sameAs.map((l) => (
                <a key={l} href={l!} rel="me noopener" target="_blank">
                  {new URL(l!).hostname.replace(/^www\./, "")}
                </a>
              ))}
            </p>
          )}
        </div>
      </BlogHeader>
      <main id="main" className="wrap blog-main">
        <h2 className="label">Articles by {a.data.name}</h2>
        {posts.length ? (
          <div className="post-grid">
            {posts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        ) : (
          <p className="blog-empty">No articles yet.</p>
        )}
      </main>
      <BlogFooter />
    </>
  );
}
