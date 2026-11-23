import type { Content } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import { PrismicTable, type SliceComponentProps } from "@prismicio/react";

export type DataTableProps = SliceComponentProps<Content.DataTableSlice>;

/** Comparison and pricing tables. Scrolls sideways on small screens. */
export default function DataTable({ slice }: DataTableProps) {
  if (!isFilled.table(slice.primary.table)) return null;
  return (
    <figure className="slice data-table" data-slice-type={slice.slice_type}>
      <div className="legal-table-wrap">
        <PrismicTable
          field={slice.primary.table}
          components={{
            table: ({ children }) => <table className="legal-table">{children}</table>,
            paragraph: ({ children }) => <>{children}</>,
          }}
        />
      </div>
      {slice.primary.caption && <figcaption>{slice.primary.caption}</figcaption>}
    </figure>
  );
}
