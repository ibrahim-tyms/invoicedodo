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
