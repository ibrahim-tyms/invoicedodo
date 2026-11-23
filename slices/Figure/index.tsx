import type { Content } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

export type FigureProps = SliceComponentProps<Content.FigureSlice>;

/** Image or chart. Alt text comes from the image's alt field in Prismic; write the numbers into it for charts. */
export default function Figure({ slice }: FigureProps) {
  if (!isFilled.image(slice.primary.image)) return null;
  return (
    <figure className="slice fig" data-slice-type={slice.slice_type}>
      <PrismicNextImage field={slice.primary.image} sizes="(min-width: 1100px) 740px, 100vw" />
      {slice.primary.caption && <figcaption>{slice.primary.caption}</figcaption>}
    </figure>
  );
}
