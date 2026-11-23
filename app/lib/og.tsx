import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };

const font = (f: string) => readFile(join(process.cwd(), "app/lib/og-fonts", f));
const fontsPromise = Promise.all([
  font("Newsreader-Regular.ttf"),
  font("Newsreader-Italic.ttf"),
  font("InstrumentSans-Medium.ttf"),
  font("InstrumentSans-SemiBold.ttf"),
]);
const logoPromise = readFile(join(process.cwd(), "public/brand/invoicedodo-logo.svg")).then(
  (b) => `data:image/svg+xml;base64,${b.toString("base64")}`,
);

const ACCENTS = {
  mint: { wash: "#E3F0EC", tint: "#D3EBE3", onInk: "#A9DCCB" },
  sky: { wash: "#E6EFF6", tint: "#D7E6F2", onInk: "#B4D3EE" },
  amber: { wash: "#FBF2D9", tint: "#F6E5B6", onInk: "#F3D98C" },
} as const;

export type OgAccent = keyof typeof ACCENTS;

/**
 * Branded social card: mint wash, logo, a kicker, a two-part headline with the
 * ink highlight box, and an optional footer line (author, date, URL).
 */
export async function renderOg({
  kicker,
  title,
  highlight,
  footer = "invoicedodo.com",
  accent = "mint",
}: {
  kicker?: string;
  title: string;
  highlight?: string;
  footer?: string;
  accent?: OgAccent;
}) {
  const [newsreader, newsreaderItalic, sansMedium, sansSemi] = await fontsPromise;
  const logo = await logoPromise;
  const a = ACCENTS[accent];
  const long = title.length + (highlight?.length ?? 0);
  const size = long > 90 ? 54 : long > 60 ? 64 : 78;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: a.wash,
          backgroundImage: "radial-gradient(rgba(36,42,41,0.10) 1.4px, transparent 1.4px)",
          backgroundSize: "22px 22px",
          padding: "56px 72px",
          color: "#242A29",
          fontFamily: "Instrument Sans",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width={312} height={64} alt="" />
          {kicker && (
          <div
            style={{
              display: "flex",
              background: "#242A29",
              color: a.onInk,
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: "uppercase",
              padding: "10px 16px",
              borderRadius: 6,
            }}
          >
            {kicker}
          </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Newsreader",
              fontSize: size,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 1040,
            }}
          >
            {title}
          </div>
          {highlight && (
            <div style={{ display: "flex", alignItems: "stretch", gap: 8 }}>
              <div
                style={{
                  display: "flex",
                  background: "#242A29",
                  color: a.onInk,
                  fontFamily: "Newsreader",
                  fontStyle: "italic",
                  fontSize: size,
                  lineHeight: 1.05,
                  letterSpacing: -2,
                  padding: "6px 22px 12px 18px",
                  borderRadius: 6,
                }}
              >
                {highlight}
              </div>
              <div style={{ width: 10, background: "#242A29", borderRadius: 3 }} />
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            fontWeight: 500,
            borderTop: "2px solid #242A29",
            paddingTop: 22,
          }}
        >
          <span>{footer}</span>
          <span style={{ display: "flex", color: "#174E48", fontWeight: 600 }}>
            Get paid on time. Without the chase.
          </span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Newsreader", data: newsreader, style: "normal", weight: 400 },
        { name: "Newsreader", data: newsreaderItalic, style: "italic", weight: 400 },
        { name: "Instrument Sans", data: sansMedium, style: "normal", weight: 500 },
        { name: "Instrument Sans", data: sansSemi, style: "normal", weight: 600 },
      ],
    },
  );
}
