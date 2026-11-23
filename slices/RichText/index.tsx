import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { Prose } from "@/app/components/Prose";
import type { SliceContext } from "@/app/lib/citations";

export type RichTextProps = SliceComponentProps<Content.RichTextSlice, SliceContext>;

/** Body copy: H2/H3 headings, paragraphs, lists, links and inline citations. */
export default function RichText({ slice, context }: RichTextProps) {
  return (
    <section className="slice" data-slice-type={slice.slice_type}>
      <Prose field={slice.primary.content} citations={context?.citations} />
    </section>
  );
}
