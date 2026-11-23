import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "./components/Brand";
import { DodoMascot } from "./components/Mascot";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="nf" data-accent="mint">
      <Link href="/" className="nf-logo" aria-label="InvoiceDodo home">
        <Logo height={28} />
      </Link>
      <div className="nf-body">
        <DodoMascot pose="fly" size={120} label="Dodo, flapping hard and going nowhere" />
        <p className="kicker">404</p>
        <h1 className="h2">
          <span className="hl-lead">This page went</span>{" "}
          <span className="hl">
            <span className="hl-box">the way of the dodo.</span>
            <span className="hl-bar" aria-hidden="true" />
          </span>
        </h1>
        <p className="lead">It may have moved, or it never existed. Your invoices, thankfully, won&rsquo;t.</p>
        <div className="nf-links">
          <Link href="/" className="btn btn-primary">
            Back to home
          </Link>
          <Link href="/blog" className="btn nf-secondary">
            Read the blog
          </Link>
        </div>
      </div>
    </main>
  );
}
