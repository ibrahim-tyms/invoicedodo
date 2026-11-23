import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { Prose } from "@/app/components/Prose";
import type { SliceContext } from "@/app/lib/citations";

export type QuoteProps = SliceComponentProps<Content.QuoteSlice, SliceContext>;

export default function Quote({ slice, context }: QuoteProps) {
  return (
    <blockquote className="slice pull" data-slice-type={slice.slice_type}>
      <Prose field={slice.primary.quote} citations={context?.citations} className="pull-text" />
      {slice.primary.cite && <cite>{slice.primary.cite}</cite>}
    </blockquote>
  );
}
