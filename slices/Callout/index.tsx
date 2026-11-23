import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { Prose } from "@/app/components/Prose";
import type { SliceContext } from "@/app/lib/citations";

export type CalloutProps = SliceComponentProps<Content.CalloutSlice, SliceContext>;

export default function Callout({ slice, context }: CalloutProps) {
  const tone = slice.primary.tone ?? "tip";
  return (
    <aside className={`slice callout is-${tone}`} data-slice-type={slice.slice_type}>
      {slice.primary.heading && <p className="callout-title">{slice.primary.heading}</p>}
      <Prose field={slice.primary.body} citations={context?.citations} />
    </aside>
  );
}
