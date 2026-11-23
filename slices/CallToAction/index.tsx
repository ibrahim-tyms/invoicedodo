import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { WaitlistForm } from "@/app/components/WaitlistForm";

export type CallToActionProps = SliceComponentProps<Content.CtaSlice>;

/** Mid-article waitlist signup. */
export default function CallToAction({ slice }: CallToActionProps) {
  return (
    <aside className="slice article-cta" data-accent="mint" data-slice-type={slice.slice_type}>
      <h2>{slice.primary.heading || "Never chase a client again."}</h2>
      <p>
        {slice.primary.body ||
          "InvoiceDodo writes your invoices, sends them and follows up politely until you're paid."}
      </p>
      <WaitlistForm source="blog-inline" />
    </aside>
  );
}
