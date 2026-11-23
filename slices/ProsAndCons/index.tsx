import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";

export type ProsAndConsProps = SliceComponentProps<Content.ProsConsSlice>;

export default function ProsAndCons({ slice }: ProsAndConsProps) {
  const pros = slice.primary.pros.filter((p) => p.text);
  const cons = slice.primary.cons.filter((c) => c.text);
  return (
    <section className="slice pc" data-slice-type={slice.slice_type}>
      {slice.primary.heading && <p className="pc-head">{slice.primary.heading}</p>}
      <div className="pc-grid">
        <div className="pc-col is-pro">
          <p className="label">Pros</p>
          <ul>
            {pros.map((p, i) => (
              <li key={i}>{p.text}</li>
            ))}
          </ul>
        </div>
        <div className="pc-col is-con">
          <p className="label">Cons</p>
          <ul>
            {cons.map((c, i) => (
              <li key={i}>{c.text}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
