# InvoiceDodo — landing page (waitlist)

Next.js 16 (App Router). One page: `app/page.tsx`, styles in `app/globals.css` (brand tokens from `../brand/tokens.css`).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Waitlist (Resend)

The form posts to server actions in `app/actions.ts`. Storage is in `app/lib/waitlist-store.ts`.

Each signup becomes a **Resend contact** in your waitlist **segment** (Resend's name for a list; it replaced "Audiences"). When you're ready to send invites, send a Broadcast to that segment.

### One-time setup in Resend

1. **Create an API key** with **Full access** (API Keys → Create). A "Sending access" key can't add contacts.
2. **Create a segment** called "Waitlist" (Contacts → Segments) and copy its ID.
3. **Create two contact properties** (Contacts → Properties), both of type **string**:
   - `source`: which form they used (`hero` or `footer`)
   - `role`: their answer to the follow-up question (Freelancer, Agency or studio, …)

   Resend rejects property values for keys that don't exist yet. If you skip this step, sign-ups still work, but `source` won't be saved and the role answer will fail quietly for the visitor.
4. Put the key and segment ID in `.env.local` for local testing, and in your host's environment variables for production:

```bash
RESEND_API_KEY=re_...
RESEND_SEGMENT_ID=...
```

### Behaviour

- New email: created as a contact, already in the waitlist segment.
- Email already in Resend (for example someone signs up twice): added to the segment again, no error shown.
- Without `RESEND_API_KEY`: local dev writes to `data/waitlist.json`, and production refuses with an error instead of losing sign-ups silently.

## Notes

- Illustrative figures in the mockups (fee $9.12, tax set-aside $283, client names) are examples, not product promises.
- No unverified statistics are published on the page (see `../research/us-pain-points.md`, "verify before publishing").

## Blog (Prismic)

Content lives in the `invoicedodo` Prismic repository. Models are in `customtypes/` and `slices/`; change them with `npx prismic` (never by editing the JSON), commit, then `npx prismic push`.

- **Blog Post** (`/blog/:uid`): title, excerpt, cover, category, author, reviewer, dates, key takeaways, FAQs, references, related posts, and the article body built from slices (Rich Text, Callout, Figure, Data Table, Quote, Stats, Pros and Cons, Call to Action, Video). SEO tab: meta title, description, image, canonical URL, noindex.
- **Author** (`/blog/author/:uid`) and **Blog Category** (`/blog/category/:uid`).
- **Source**: one document per reference (title, publisher, URL, year, date checked). In any text, select the words a fact supports and link them to a Source document. The site shows a numbered footnote and builds the References list automatically. Stats can point to a Source too.

Every post gets BlogPosting, BreadcrumbList and FAQPage structured data, a generated 1200×630 social image (a Meta Image in Prismic replaces it), and appears in `/sitemap.xml` and `/blog/rss.xml`.

After deploying:
```bash
npx prismic webhook create https://www.invoicedodo.com/api/revalidate --trigger documentsPublished --trigger documentsUnpublished
npx prismic preview add https://www.invoicedodo.com/api/preview --name Production
npx prismic preview set-simulator https://www.invoicedodo.com
```
