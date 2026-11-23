import { ImageResponse } from "next/og";
import { asImageSrc } from "@prismicio/client";
import { getPost, postTitle, rel } from "../../lib/blog";
import { OG_SIZE, renderOg, type OgAccent } from "../../lib/og";

export const alt = "InvoiceDodo Blog article";
export const size = OG_SIZE;
export const contentType = "image/png";

const ACCENTS: OgAccent[] = ["mint", "sky", "amber"];

/** Branded card generated from the post title. A custom Meta Image set in Prismic overrides it. */
export default async function Image({ params }: { params: Promise<{ uid: string }> }) {
  const { uid } = await params;
  const post = await getPost(uid);
  // An editor-supplied Meta Image wins: serve it cropped to 1200x630.
  const custom = asImageSrc(post.data.meta_image, { w: 1200, h: 630, fit: "crop" });
  if (custom) {
    return new ImageResponse(
      (
         
        <img src={custom} width={1200} height={630} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ),
      OG_SIZE,
    );
  }
  const cat = rel<{ name?: string }>(post.data.category);
  const author = rel<{ name?: string }>(post.data.author);
  const accent = ACCENTS[[...uid].reduce((n, c) => n + c.charCodeAt(0), 0) % ACCENTS.length];
  return renderOg({
    kicker: cat?.name ?? "Blog",
    title: postTitle(post),
    footer: author?.name ? `By ${author.name} · www.invoicedodo.com/blog` : "www.invoicedodo.com/blog",
    accent,
  });
}
