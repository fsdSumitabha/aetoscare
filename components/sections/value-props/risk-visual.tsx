import { TrendingUp } from "@/components/ui/icons";

/** Chart geometry in SVG user units. */
const WIDTH = 360;
const HEIGHT = 172;
const STEP = 30;
const BAR_WIDTH = 16;
const BAR_OFFSET = (STEP - BAR_WIDTH) / 2;
const LINE_LIFT = 8;
const BREAK_EVEN = 38;

/** Illustrative monthly bar heights: every month clears the break-even line. */
const bars = [46, 54, 60, 68, 76, 84, 92, 102, 110, 120, 132, 146] as const;

const points = bars.map((height, index) => ({
  x: index * STEP + STEP / 2,
  y: HEIGHT - height - LINE_LIFT,
}));
const linePath = points.map(({ x, y }, index) => `${index === 0 ? "M" : "L"}${x} ${y}`).join(" ");
const first = points[0];
const last = points[points.length - 1];
const areaPath = `${linePath} L${last.x} ${HEIGHT} L${first.x} ${HEIGHT} Z`;

const toPercent = (value: number, total: number) => `${(value / total) * 100}%`;

/**
 * "Risk-free partnership": ascending revenue bars that never dip below a
 * dashed break-even line, with an upward trend chip. Decorative.
 */
export function RiskVisual() {
  return (
    <div className="relative size-full">
      <div className="absolute inset-0 bg-line-grid opacity-70 mask-fade-b" />

      <div className="relative flex h-full flex-col px-4 pt-4 pb-3 sm:px-6 sm:pt-5 sm:pb-4">
        <div className="flex items-start justify-between gap-3">
          <span className="font-mono text-[0.625rem] font-medium tracking-[0.16em] text-ink-500 uppercase">
            Practice revenue
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-vital-50 px-2.5 py-1 text-[0.7rem] font-semibold text-vital-700 ring-1 ring-vital-200">
            <TrendingUp aria-hidden="true" className="size-3.5" strokeWidth={2.5} />
            Trending up
          </span>
        </div>

        <div className="relative mt-3 min-h-0 flex-1">
          {/* Break-even reference line (HTML keeps the dash crisp at any width) */}
          <div
            className="absolute inset-x-0 border-t border-dashed border-ink-400/80"
            style={{ top: toPercent(HEIGHT - BREAK_EVEN, HEIGHT) }}
          >
            <span className="absolute left-0 -translate-y-1/2 rounded-full bg-white px-2 py-0.5 font-mono text-[0.6rem] font-medium text-ink-600 shadow-soft ring-1 ring-ink-200">
              Break-even
            </span>
          </div>

          {/* Plot area, offset to leave a gutter for the break-even label */}
          <div className="absolute inset-y-0 right-0 left-20">
            <svg
              viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
              focusable="false"
              className="absolute inset-0 size-full overflow-visible"
            >
              <defs>
                <linearGradient id="vp-risk-bar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" className="[stop-color:var(--color-brand-400)]" stopOpacity="0.85" />
                  <stop offset="1" className="[stop-color:var(--color-brand-200)]" stopOpacity="0.35" />
                </linearGradient>
                <linearGradient id="vp-risk-bar-hi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" className="[stop-color:var(--color-vital-400)]" />
                  <stop offset="1" className="[stop-color:var(--color-brand-600)]" />
                </linearGradient>
                <linearGradient id="vp-risk-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" className="[stop-color:var(--color-vital-300)]" stopOpacity="0.28" />
                  <stop offset="1" className="[stop-color:var(--color-vital-300)]" stopOpacity="0" />
                </linearGradient>
              </defs>

              <path d={areaPath} fill="url(#vp-risk-area)" />
              {bars.map((height, index) => (
                <rect
                  key={index}
                  x={index * STEP + BAR_OFFSET}
                  y={HEIGHT - height}
                  width={BAR_WIDTH}
                  height={height}
                  rx="3"
                  fill={index === bars.length - 1 ? "url(#vp-risk-bar-hi)" : "url(#vp-risk-bar)"}
                />
              ))}
              <path
                d={linePath}
                className="stroke-vital-500"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Latest month */}
            <span
              className="absolute flex size-2.5 -translate-x-1/2 -translate-y-1/2"
              style={{ left: toPercent(last.x, WIDTH), top: toPercent(last.y, HEIGHT) }}
            >
              <span className="absolute inset-0 animate-ping-slow rounded-full bg-vital-400 opacity-75" />
              <span className="relative inline-flex size-full rounded-full bg-vital-500 ring-2 ring-white" />
            </span>
          </div>
        </div>

        <div className="mt-2 ml-20 grid grid-cols-4 text-center font-mono text-[0.6rem] text-ink-500">
          <span>Q1</span>
          <span>Q2</span>
          <span>Q3</span>
          <span>Q4</span>
        </div>
      </div>
    </div>
  );
}
