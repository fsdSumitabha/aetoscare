import { LogoMark } from "@/components/ui/logo";
import { cn } from "@/lib/cn";

const CENTER = 120;
const RADIUS = 88;
const GAP = 7;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const bezelTicks = Array.from({ length: 60 }, (_, index) => index * 6);

/**
 * One stroke per step, stepping brand → vital like the timeline beside it, so
 * the dial reads 01 → 05 clockwise in the same colour order as the steps.
 */
const segmentStrokes = [
  "stroke-brand-600",
  "stroke-brand-500",
  "stroke-brand-400",
  "stroke-vital-400",
  "stroke-vital-500",
] as const;

const round = (value: number) => Math.round(value * 100) / 100;

type ProcessDialProps = {
  steps: number;
  className?: string;
};

/**
 * Decorative dial for the sticky column: the AETOS eye at the centre of a
 * ring split into one arc per onboarding step (brand → vital, like the timeline).
 */
export function ProcessDial({ steps, className }: ProcessDialProps) {
  const segment = CIRCUMFERENCE / steps;
  const markers = Array.from({ length: steps }, (_, index) => {
    const fraction = (index * segment + (segment - GAP) / 2) / CIRCUMFERENCE;
    const angle = (fraction * 360 - 90) * (Math.PI / 180);
    return {
      label: String(index + 1).padStart(2, "0"),
      x: round(CENTER + RADIUS * Math.cos(angle)),
      y: round(CENTER + RADIUS * Math.sin(angle)),
      stroke: segmentStrokes[index % segmentStrokes.length],
      offset: round(-index * segment),
      final: index === steps - 1,
    };
  });

  return (
    <div aria-hidden="true" className={cn("relative aspect-square w-48", className)}>
      <svg
        viewBox="0 0 240 240"
        fill="none"
        aria-hidden="true"
        focusable="false"
        className="absolute inset-0 size-full overflow-visible"
      >
        <circle cx={CENTER} cy={CENTER} r="116" className="stroke-ink-100" />
        <g className="stroke-ink-200" strokeLinecap="round">
          {bezelTicks.map((angle) => (
            <line
              key={angle}
              x1={CENTER}
              y1={angle % 30 === 0 ? 8 : 11}
              x2={CENTER}
              y2="15"
              transform={`rotate(${angle} ${CENTER} ${CENTER})`}
            />
          ))}
        </g>

        {/* One arc per step, clockwise from 12 o'clock */}
        <g transform={`rotate(-90 ${CENTER} ${CENTER})`} strokeWidth="6">
          {markers.map((marker) => (
            <circle
              key={marker.label}
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              className={marker.stroke}
              strokeDasharray={`${round(segment - GAP)} ${round(CIRCUMFERENCE - segment + GAP)}`}
              strokeDashoffset={marker.offset}
            />
          ))}
        </g>
        <circle
          cx={CENTER}
          cy={CENTER}
          r="62"
          className="origin-center animate-spin-slow stroke-ink-200 [transform-box:fill-box]"
          strokeDasharray="2 6"
        />
        <circle cx={CENTER} cy={CENTER} r="38" className="stroke-ink-100" />
        <path
          d={`M${CENTER} 40v14M${CENTER} 186v14M40 ${CENTER}h14M186 ${CENTER}h14`}
          className="stroke-ink-300"
          strokeLinecap="round"
        />

        {markers.map((marker) => (
          <g key={marker.label}>
            {/* The final step (reimbursement) echoes the dark payoff card */}
            <circle
              cx={marker.x}
              cy={marker.y}
              r="13"
              className={marker.final ? "fill-ink-950 stroke-ink-950" : "fill-white stroke-ink-100"}
            />
            <text
              x={marker.x}
              y={marker.y}
              textAnchor="middle"
              dominantBaseline="central"
              className={cn(
                "font-mono text-[11px] font-semibold",
                marker.final ? "fill-vital-300" : "fill-ink-600",
              )}
            >
              {marker.label}
            </text>
          </g>
        ))}
      </svg>

      <LogoMark
        className="absolute top-1/2 left-1/2 size-12! -translate-x-1/2 -translate-y-1/2 text-ink-900"
        eyeClassName="fill-brand-500"
      />
    </div>
  );
}
