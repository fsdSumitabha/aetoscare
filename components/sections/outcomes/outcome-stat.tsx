import type { outcomes } from "@/lib/content/home";

export type OutcomeStatData = (typeof outcomes)["stats"][number];

type OutcomeStatProps = {
  stat: OutcomeStatData;
  /** Position in the grid; picks a sparkline variation. */
  index: number;
};

/* Normalised trend series (0 = floor, 100 = ceiling), purely decorative. */
const descendingSeries = [
  [90, 82, 86, 70, 74, 58, 54, 42, 34, 16],
  [84, 88, 72, 75, 60, 63, 48, 40, 30, 20],
  [92, 78, 83, 71, 62, 66, 50, 44, 28, 14],
] as const;
const ascendingSeries = [14, 24, 20, 38, 34, 50, 56, 64, 76, 90] as const;

const SPARK_W = 112;
const SPARK_H = 44;
const PAD_X = 4;
const PAD_Y = 6;

const round = (value: number) => Math.round(value * 10) / 10;

function toPoints(values: readonly number[]) {
  const step = (SPARK_W - PAD_X * 2) / (values.length - 1);
  return values.map((value, i) => ({
    x: round(PAD_X + i * step),
    y: round(PAD_Y + (1 - value / 100) * (SPARK_H - PAD_Y * 2)),
  }));
}

/** "Decrease of 16 mg/dL" / "Increase of 22%" for assistive technology. */
function describeChange({ sign, value, unit }: OutcomeStatData): string {
  const amount = unit === "%" ? `${value}%` : `${value} ${unit}`;
  return `${sign === "minus" ? "Decrease" : "Increase"} of ${amount}`;
}

/**
 * One outcome inside the parent <dl>: dt label first in the DOM, while the
 * oversized numeral is visually promoted to the top with order utilities.
 */
export function OutcomeStat({ stat, index }: OutcomeStatProps) {
  const glyph = stat.sign === "minus" ? "−" : "+";
  const series =
    stat.sign === "minus" ? descendingSeries[index % descendingSeries.length] : ascendingSeries;

  return (
    <div className="reveal relative isolate flex flex-col overflow-hidden rounded-4xl glass-dark p-6 transition-[border-color,box-shadow] duration-300 before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-radial-[at_85%_0%] before:from-vital-400/25 before:to-transparent before:to-65% before:opacity-0 before:transition-opacity before:duration-500 hover:border-vital-300/30 hover:shadow-[0_28px_64px_-30px_rgb(43_207_164/0.6)] hover:before:opacity-100 sm:p-7">
      <dt className="order-2 mt-6 flex items-center gap-2.5 border-t border-white/10 pt-5 font-mono text-[0.7rem] font-medium tracking-[0.16em] text-vital-200 uppercase">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-vital-300" />
        {stat.label}
      </dt>

      <dd className="order-1 flex items-start justify-between gap-4">
        <span aria-hidden="true" className="flex items-baseline gap-1.5 whitespace-nowrap">
          <span className="font-mono text-5xl leading-none font-semibold tracking-[-0.06em] text-white md:text-6xl lg:text-5xl xl:text-7xl">
            <span className="text-vital-300">{glyph}</span>
            {stat.value}
          </span>
          <span className="font-mono text-sm text-ink-300">{stat.unit}</span>
        </span>
        <span className="sr-only">{describeChange(stat)}</span>
        <Sparkline id={`out-spark-${stat.key}`} values={series} />
      </dd>

      <dd className="order-3 mt-2 text-sm leading-relaxed text-ink-200">{stat.detail}</dd>
    </div>
  );
}

function Sparkline({ id, values }: { id: string; values: readonly number[] }) {
  const points = toPoints(values);
  const first = points[0];
  const last = points[points.length - 1];
  const line = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`).join(" ");
  const area = `${line} L${last.x} ${SPARK_H} L${first.x} ${SPARK_H} Z`;

  return (
    <svg
      viewBox={`0 0 ${SPARK_W} ${SPARK_H}`}
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="mt-1 h-auto w-24 min-w-12 shrink overflow-visible text-vital-300 sm:w-20 md:w-28 lg:w-24 xl:w-28"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.34" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Starting level, so the change reads against a baseline */}
      <line
        x1="0"
        x2={SPARK_W}
        y1={first.y}
        y2={first.y}
        stroke="currentColor"
        strokeOpacity="0.28"
        strokeDasharray="2 3"
      />
      <path d={area} fill={`url(#${id})`} />
      <path d={line} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <circle
        cx={last.x}
        cy={last.y}
        r="4"
        fill="currentColor"
        className="origin-center animate-ping-slow opacity-60 [transform-box:fill-box]"
      />
      <circle cx={last.x} cy={last.y} r="2.75" fill="currentColor" />
    </svg>
  );
}
