import type { CSSProperties } from "react";

/*
 * Dodo, the mascot, in three poses. Head only (brand rule), except the
 * "fly" pose, which adds two stubby wings for the joke: dodos can't fly.
 *
 *  - front: facing us, blinks and glances around
 *  - peck:  the side profile (the original logo), pecking and blinking
 *  - fly:   front head on tiny flapping wings, bobbing
 *
 * All motion is CSS and switches off under prefers-reduced-motion.
 * Never use the mascot on overdue notices or anything about money owed.
 */

type Pose = "front" | "peck" | "fly";

const BEAK = "#F4A261";
const CREAM = "#FFF8EF";

function Eye({ cx, cy, look }: { cx: number; cy: number; look: number }) {
  return (
    <g className="dodo-eye">
      <circle cx={cx} cy={cy} r="6.4" fill={CREAM} />
      <circle className="dodo-pupil" cx={cx + look} cy={cy + 0.8} r="3.1" style={{ fill: "var(--dodo-pupil)" }} />
      <circle cx={cx + look + 1.1} cy={cy - 0.4} r="0.9" fill={CREAM} />
    </g>
  );
}

function FrontHead() {
  return (
    <>
      {/* tuft */}
      <path
        d="M33 21 Q33.5 13 39 16 Q41 10 45.5 15 Q50 12 49.5 20"
        fill="none"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ stroke: "var(--dodo-body)" }}
      />
      <circle cx="41" cy="44" r="25" style={{ fill: "var(--dodo-body)" }} />
      <Eye cx={31.5} cy={39} look={1} />
      <Eye cx={50.5} cy={39} look={-1} />
      {/* hooked beak, seen from the front */}
      <path
        d="M32 47.5 Q41 42.5 50 47.5 Q51.2 55.5 44.6 61.4 Q41 64.6 38.2 61.6 Q41.6 59 39.8 56 Q33.4 53.6 32 47.5 Z"
        fill={BEAK}
      />
      <circle cx="37.6" cy="49" r="1.1" fill="#C97A3A" />
      <circle cx="44.4" cy="49" r="1.1" fill="#C97A3A" />
    </>
  );
}

export function DodoMascot({
  pose = "front",
  size = 72,
  className = "",
  delay = 0,
  label,
}: {
  pose?: Pose;
  size?: number;
  className?: string;
  /** Seconds to offset the loops, so several dodos on one page don't blink in sync. */
  delay?: number;
  /** Accessible name. Omit for decoration (most uses). */
  label?: string;
}) {
  const style = { "--dodo-delay": `${delay}s` } as CSSProperties;
  const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true as const };

  if (pose === "peck") {
    return (
      <svg
        className={`dodo dodo-peck ${className}`}
        style={style}
        width={size}
        height={size}
        viewBox="2 4 64 64"
        focusable="false"
        {...a11y}
      >
        <g className="dodo-bob">
          <path d="M34 24 Q58.4 21.6 62 39.6 Q62.9 50.4 53.9 49.5 Q55.7 43.2 45.8 42.3 L34 44 Z" fill={BEAK} />
          <circle cx="26" cy="36" r="20" style={{ fill: "var(--dodo-body)" }} />
          <g className="dodo-eye">
            <circle cx="31" cy="31" r="4.6" fill={CREAM} />
            <circle cx="32.3" cy="31" r="2.3" style={{ fill: "var(--dodo-pupil)" }} />
          </g>
        </g>
      </svg>
    );
  }

  if (pose === "fly") {
    return (
      <svg
        className={`dodo dodo-fly ${className}`}
        style={style}
        width={size}
        height={size * 1.15}
        viewBox="-4 2 90 94"
        focusable="false"
        {...a11y}
      >
        <g className="dodo-hover">
          <path
            className="dodo-wing dodo-wing-l"
            d="M19 46 Q3 42 1.5 28 Q8 29.5 12 34 Q11.5 27 15.5 25 Q19 33 22 40 Z"
            style={{ fill: "var(--dodo-wing)" }}
          />
          <path
            className="dodo-wing dodo-wing-r"
            d="M63 46 Q79 42 80.5 28 Q74 29.5 70 34 Q70.5 27 66.5 25 Q63 33 60 40 Z"
            style={{ fill: "var(--dodo-wing)" }}
          />
          <FrontHead />
        </g>
        <ellipse className="dodo-shadow" cx="41" cy="90" rx="15" ry="2.6" fill="rgba(36,42,41,0.16)" />
      </svg>
    );
  }

  return (
    <svg
      className={`dodo dodo-front ${className}`}
      style={style}
      width={size}
      height={size}
      viewBox="12 8 58 64"
      focusable="false"
      {...a11y}
    >
      <FrontHead />
    </svg>
  );
}
