import { LogoMark } from "@/components/ui/logo";
import { cn } from "@/lib/cn";

const CENTER = 120;
const tickAngles = Array.from({ length: 72 }, (_, index) => index * 5);
const crossRadii = [52, 76] as const;
const crossMarks = crossRadii.flatMap((radius) => [
  [CENTER + radius, CENTER],
  [CENTER - radius, CENTER],
  [CENTER, CENTER + radius],
  [CENTER, CENTER - radius],
]);

const blips = [
  // Kept clear of the "BP" flag chip, which spans ~30–70% horizontally at 34%.
  { position: "top-[19%] left-[62%]", size: "size-2" },
  { position: "top-[63%] left-[25%]", size: "size-1.5" },
  { position: "top-[74%] left-[61%]", size: "size-2" },
  { position: "top-[44%] left-[80%]", size: "size-1.5" },
] as const;

/**
 * "Continuous observation": a radar built on the AETOS crosshair, with a
 * rotating sweep, healthy readings (mint) and one flagged reading (coral).
 * Designed for the inverted dark card. Decorative.
 */
export function MonitoringVisual() {
  return (
    <div className="relative size-full">
      <div className="absolute inset-0 bg-dot-grid-dark mask-spotlight" />
      <div className="absolute inset-0 bg-radial from-brand-500/20 to-transparent to-70%" />

      <div className="relative flex h-full items-center justify-center">
        <div className="relative aspect-square h-[88%]">
          <RadarFrame />

          {/* Sweep: conic wedge with a bright leading edge, rotating clockwise */}
          <div className="absolute inset-[8.333%] animate-spin-slow rounded-full bg-conic from-transparent from-70% to-vital-300/40 [--animate-spin-slow:spin_9s_linear_infinite]">
            <span className="absolute top-0 left-1/2 h-1/2 w-px -translate-x-1/2 bg-linear-to-t from-vital-300/0 to-vital-300/90" />
          </div>

          {blips.map((blip) => (
            <span
              key={blip.position}
              className={cn("absolute -translate-x-1/2 -translate-y-1/2", blip.position)}
            >
              <span className={cn("relative flex", blip.size)}>
                <span className="absolute inset-0 animate-ping-slow rounded-full bg-vital-300 opacity-70" />
                <span className="relative inline-flex size-full rounded-full bg-vital-300 shadow-glow-vital" />
              </span>
            </span>
          ))}

          {/* Flagged reading */}
          <span className="absolute top-[34%] left-[30%] flex -translate-x-1 -translate-y-1/2 items-center gap-1.5">
            <span className="relative flex size-2.5">
              <span className="absolute inset-0 animate-ping-slow rounded-full bg-pulse-400 opacity-75" />
              <span className="relative inline-flex size-full rounded-full bg-pulse-400" />
            </span>
            <span className="rounded-md bg-ink-950/80 px-1.5 py-0.5 font-mono text-[0.6rem] font-medium whitespace-nowrap text-pulse-300 ring-1 ring-pulse-400/40 backdrop-blur-sm">
              BP 162/98 ↑
            </span>
          </span>

          <LogoMark
            className="absolute top-1/2 left-1/2 size-9! -translate-x-1/2 -translate-y-1/2 text-white"
            eyeClassName="fill-vital-300"
          />
        </div>
      </div>

      <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-ink-950/70 px-2.5 py-1 font-mono text-[0.6rem] font-medium tracking-[0.14em] text-white/80 uppercase ring-1 ring-white/10 backdrop-blur-sm">
        <span className="relative inline-flex size-1.5">
          <span className="absolute inset-0 animate-ping-slow rounded-full bg-vital-300 opacity-75" />
          <span className="relative inline-flex size-full rounded-full bg-vital-300" />
        </span>
        Clinical center
      </span>
      <span className="absolute right-4 bottom-4 rounded-full bg-ink-950/70 px-2.5 py-1 font-mono text-[0.6rem] font-medium tracking-[0.14em] text-white/80 ring-1 ring-white/10 backdrop-blur-sm">
        EN · ES
      </span>
      <span className="absolute bottom-4 left-4 rounded-full bg-ink-950/70 px-2.5 py-1 font-mono text-[0.6rem] font-medium tracking-[0.14em] text-white/80 ring-1 ring-white/10 backdrop-blur-sm">
        RN · MA
      </span>
    </div>
  );
}

function RadarFrame() {
  return (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="absolute inset-0 size-full"
    >
      <defs>
        <radialGradient id="vp-radar-core" cx="50%" cy="50%" r="50%">
          <stop offset="0" className="[stop-color:var(--color-brand-500)]" stopOpacity="0.32" />
          <stop offset="1" className="[stop-color:var(--color-brand-500)]" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx={CENTER} cy={CENTER} r="100" fill="url(#vp-radar-core)" />
      <circle cx={CENTER} cy={CENTER} r="100" className="stroke-white/20" />
      <circle cx={CENTER} cy={CENTER} r="76" className="stroke-white/12" />
      <circle cx={CENTER} cy={CENTER} r="52" className="stroke-white/12" />
      <circle cx={CENTER} cy={CENTER} r="28" className="stroke-white/15" />

      {/* Slow counter-detail ring */}
      <circle
        cx={CENTER}
        cy={CENTER}
        r="88"
        className="origin-center animate-spin-slow stroke-vital-300/30 [transform-box:fill-box]"
        strokeWidth="2"
        strokeDasharray="1 7"
      />

      {/* Crosshair axes */}
      <path
        d={`M${CENTER} 10V230M10 ${CENTER}H230`}
        className="stroke-white/10"
        strokeDasharray="2 4"
      />
      <g className="stroke-vital-300/60" strokeWidth="1.2" strokeLinecap="round">
        {crossMarks.map(([x, y]) => (
          <path key={`${x}-${y}`} d={`M${x - 3} ${y}h6M${x} ${y - 3}v6`} />
        ))}
      </g>

      {/* Bezel ticks */}
      <g className="stroke-white/25" strokeLinecap="round">
        {tickAngles.map((angle) => {
          const major = angle % 30 === 0;
          return (
            <line
              key={angle}
              x1={CENTER}
              y1={major ? 3 : 7}
              x2={CENTER}
              y2="13"
              strokeWidth={major ? 1.4 : 0.8}
              transform={`rotate(${angle} ${CENTER} ${CENTER})`}
            />
          );
        })}
      </g>
    </svg>
  );
}
