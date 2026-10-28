import { cn } from "@/lib/cn";
import { DAY_LINE, PEAK, dayLinePath } from "./day-line-geometry";
import { milestones } from "./milestones";

const stop = (color: string, opacity = 1) => ({ stopColor: color, stopOpacity: opacity });

/** A few quiet stars where the day turns to night. */
const stars = [
  { cx: 1012, cy: 64, r: 2.6, tone: "fill-lilac-300" },
  { cx: 1046, cy: 112, r: 1.8, tone: "fill-white" },
  { cx: 958, cy: 40, r: 1.6, tone: "fill-lilac-300/70" },
  { cx: 1128, cy: 126, r: 2.2, tone: "fill-lilac-300/80" },
  { cx: 1168, cy: 92, r: 1.5, tone: "fill-white" },
  { cx: 902, cy: 84, r: 1.4, tone: "fill-white/90" },
] as const;

/**
 * The single flowing line of the "A day of care" band. Decorative: the
 * milestones it carries are real HTML text rendered alongside it.
 */
export function DayLineArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${DAY_LINE.width} ${DAY_LINE.height}`}
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("pointer-events-none", className)}
    >
      <defs>
        <linearGradient id="editorial-ribbon" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" style={stop("var(--color-honey-300)", 0.9)} />
          <stop offset="0.42" style={stop("var(--color-blush-300)")} />
          <stop offset="0.66" style={stop("var(--color-care-200)")} />
          <stop offset="1" style={stop("var(--color-lilac-300)")} />
        </linearGradient>
        <radialGradient id="editorial-spike-glow">
          <stop offset="0" style={stop("var(--color-blush-200)", 0.85)} />
          <stop offset="0.45" style={stop("var(--color-blush-100)", 0.55)} />
          <stop offset="1" style={stop("var(--color-blush-100)", 0)} />
        </radialGradient>
        <radialGradient id="editorial-crest">
          <stop offset="0" style={stop("#ffffff", 0.95)} />
          <stop offset="1" style={stop("#ffffff", 0)} />
        </radialGradient>
      </defs>

      {/* Warm bloom under the heartbeat */}
      <ellipse cx={PEAK[0]} cy={150} rx={210} ry={150} fill="url(#editorial-spike-glow)" />
      <ellipse cx={PEAK[0]} cy={PEAK[1] + 6} rx={46} ry={34} fill="url(#editorial-crest)" />

      {stars.map((star) => (
        <circle key={`${star.cx}-${star.cy}`} cx={star.cx} cy={star.cy} r={star.r} className={star.tone} />
      ))}

      {/* Watercolor wash beneath the ink line */}
      <path
        d={dayLinePath}
        stroke="url(#editorial-ribbon)"
        strokeWidth={13}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.3}
      />

      {/* Resting trace (full ink on small screens, a faint guide under the drawing on large) */}
      <path
        d={dayLinePath}
        vectorEffect="non-scaling-stroke"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-care-600 lg:stroke-care-600/25"
      />

      {/* Slow, calm drawing of the line on large screens */}
      <path
        d={dayLinePath}
        pathLength={1}
        strokeDasharray="1"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="hidden stroke-care-600 lg:block lg:animate-[ecg-draw_10s_ease-in-out_infinite] motion-reduce:animate-none"
      />

      {/* Pins drawn into the art only on small screens; large screens use HTML pins */}
      {milestones.map(({ pin, label }) => (
        <circle
          key={label}
          cx={pin.cx}
          cy={pin.cy}
          r={11}
          vectorEffect="non-scaling-stroke"
          strokeWidth={2}
          className="fill-white stroke-care-600 lg:hidden"
        />
      ))}
    </svg>
  );
}
