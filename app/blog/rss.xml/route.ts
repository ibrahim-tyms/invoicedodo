import { getPosts, postTitle, publishedISO, rel } from "../../lib/blog";
import { SITE, absoluteUrl } from "../../lib/site";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET() {
  const posts = (await getPosts()).filter((p) => !p.data.noindex).slice(0, 50);
  const items = posts
    .map((p) => {
      const url = absoluteUrl(`/blog/${p.uid}`);
      const author = rel<{ name?: string }>(p.data.author);
      const cat = rel<{ name?: string }>(p.data.category);
      return `    <item>
      <title>${esc(postTitle(p))}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${publishedISO(p)}T12:00:00Z`).toUTCString()}</pubDate>
      ${p.data.excerpt ? `<description>${esc(p.data.excerpt)}</description>` : ""}
      ${author?.name ? `<dc:creator>${esc(author.name)}</dc:creator>` : ""}
      ${cat?.name ? `<category>${esc(cat.name)}</category>` : ""}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>The ${SITE.name} Blog</title>
    <link>${absoluteUrl("/blog")}</link>
    <description>Practical guides on getting paid, invoicing and freelance taxes.</description>
    <language>en-us</language>
    <atom:link href="${absoluteUrl("/blog/rss.xml")}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
