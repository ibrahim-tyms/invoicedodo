import type { Content } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";

export type VideoProps = SliceComponentProps<Content.VideoSlice>;

export default function Video({ slice }: VideoProps) {
  const e = slice.primary.embed;
  if (!isFilled.embed(e) || !e.html) return null;
  return (
    <figure className="slice video" data-slice-type={slice.slice_type}>
      <div className="video-frame" dangerouslySetInnerHTML={{ __html: e.html }} />
      {slice.primary.caption && <figcaption>{slice.primary.caption}</figcaption>}
    </figure>
  );
}
