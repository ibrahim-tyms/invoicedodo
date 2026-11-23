import Link from "next/link";
import { PrismicNextImage } from "@prismicio/next";
import { isFilled } from "@prismicio/client";
import { type Post, formatDate, postTitle, publishedISO, readingMinutes, rel } from "../lib/blog";

export function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  const cat = rel<{ name?: string }>(post.data.category);
  const author = rel<{ name?: string }>(post.data.author);
  const H = featured ? "h2" : "h3";
  return (
    <article className={`post-card${featured ? " is-featured" : ""}`}>
      <Link href={`/blog/${post.uid}`} className="post-card-media" tabIndex={-1} aria-hidden="true">
        {isFilled.image(post.data.featured_image) ? (
          <PrismicNextImage
            field={post.data.featured_image}
            fallbackAlt=""
            sizes={featured ? "(min-width: 940px) 60vw, 100vw" : "(min-width: 940px) 33vw, 100vw"}
            imgixParams={{ ar: "16:9", fit: "crop" }}
          />
        ) : (
          <span className="post-card-ph">{postTitle(post)}</span>
        )}
      </Link>
      <div className="post-card-body">
        {cat?.name && <span className="post-cat">{cat.name}</span>}
        <H className="post-card-title">
          <Link href={`/blog/${post.uid}`}>{postTitle(post)}</Link>
        </H>
        {post.data.excerpt && <p className="post-card-ex">{post.data.excerpt}</p>}
        <p className="post-meta">
          {author?.name && <span>{author.name}</span>}
          <time dateTime={publishedISO(post)}>{formatDate(publishedISO(post))}</time>
          <span>{readingMinutes(post)} min read</span>
        </p>
      </div>
    </article>
  );
}
