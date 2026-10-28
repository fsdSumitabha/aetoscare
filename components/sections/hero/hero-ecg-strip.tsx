import { HeartPulse } from "@/components/ui/icons";

const BEAT_WIDTH = 150;
const BASELINE = 74;

/** One P-QRS-T complex starting at x = offset (viewBox units). */
function beat(offset: number): string {
  const x = (dx: number) => offset + dx;
  return [
    `L${x(14)} ${BASELINE}`,
    `Q${x(22)} ${BASELINE - 9} ${x(30)} ${BASELINE}`, // P wave
    `L${x(40)} ${BASELINE}`,
    `L${x(44)} ${BASELINE + 6}`, // Q
    `L${x(50)} ${BASELINE - 56}`, // R
    `L${x(56)} ${BASELINE + 18}`, // S
    `L${x(61)} ${BASELINE}`,
    `L${x(78)} ${BASELINE}`,
    `Q${x(92)} ${BASELINE - 16} ${x(106)} ${BASELINE}`, // T wave
    `L${x(BEAT_WIDTH)} ${BASELINE}`,
  ].join("");
}

const ECG_PATH = `M0 ${BASELINE}${[0, 1, 2, 3].map((n) => beat(n * BEAT_WIDTH)).join("")}`;

/** Live ECG trace drawn on monitor "paper" with a soft glow. */
export function HeroEcgStrip() {
  return (
    <div className="relative mt-4 overflow-hidden rounded-2xl bg-ink-950/50 ring-1 ring-white/6">
      <div className="flex items-center justify-between gap-3 px-3.5 pt-3 sm:px-4">
        <span className="font-mono text-[0.625rem] font-medium tracking-[0.16em] text-ink-300 uppercase">
          Heart rate · Live
        </span>
        <span className="flex items-baseline gap-1">
          <HeartPulse aria-hidden="true" className="size-3.5 self-center text-pulse-400" />
          <span className="font-mono text-base font-semibold text-white tabular-nums">72</span>
          <span className="font-mono text-[0.625rem] text-ink-300">bpm</span>
        </span>
      </div>

      <svg
        viewBox="0 0 600 120"
        fill="none"
        focusable="false"
        className="mt-1 block h-auto w-full mask-fade-x"
      >
        <defs>
          <pattern id="hero-ecg-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" stroke="white" strokeOpacity="0.05" />
          </pattern>
          <linearGradient id="hero-ecg-grad" x1="0" y1="0" x2="600" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" className="[stop-color:var(--color-brand-400)]" />
            <stop offset="1" className="[stop-color:var(--color-vital-300)]" />
          </linearGradient>
          <filter id="hero-ecg-glow" x="-10%" y="-40%" width="120%" height="180%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>

        <rect width="600" height="120" fill="url(#hero-ecg-grid)" />
        <path d={`M0 ${BASELINE}H600`} stroke="white" strokeOpacity="0.08" strokeDasharray="3 5" />

        {/* Dim persistent trace: the strip is never blank between sweeps or on first paint */}
        <path
          d={ECG_PATH}
          stroke="url(#hero-ecg-grad)"
          strokeWidth="1.5"
          strokeOpacity="0.22"
          strokeLinejoin="round"
        />
        <path
          d={ECG_PATH}
          pathLength="1"
          strokeDasharray="1"
          stroke="url(#hero-ecg-grad)"
          strokeWidth="5"
          strokeOpacity="0.55"
          strokeLinejoin="round"
          filter="url(#hero-ecg-glow)"
          className="animate-ecg"
        />
        <path
          d={ECG_PATH}
          pathLength="1"
          strokeDasharray="1"
          stroke="url(#hero-ecg-grad)"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-ecg"
        />
      </svg>
    </div>
  );
}
