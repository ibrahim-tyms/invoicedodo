import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { CiteMark } from "@/app/components/Prose";
import type { SliceContext } from "@/app/lib/citations";

export type StatsProps = SliceComponentProps<Content.StatsSlice, SliceContext>;

/** Big numbers, each with its source footnote. */
export default function Stats({ slice, context }: StatsProps) {
  return (
    <section className="slice stats" data-slice-type={slice.slice_type}>
      {slice.primary.items.map((item, i) => {
        const src = item.source as { id?: string; data?: { publisher?: string; year?: number } };
        return (
          <div className="stat" key={i}>
            <b>{item.value}</b>
            <span>
              {item.label}
              <CiteMark id={src?.id} citations={context?.citations} />
            </span>
            {src?.data?.publisher && (
              <small>
                {src.data.publisher}
                {src.data.year ? `, ${src.data.year}` : ""}
              </small>
            )}
          </div>
        );
      })}
    </section>
  );
}
