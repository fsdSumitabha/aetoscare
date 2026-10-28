import { cn } from "@/lib/cn";

const ECG_WIDTH = 1440;
const ECG_HEIGHT = 240;
const ECG_BASELINE = 132;
/** Per-beat amplitude, so the trace reads as a living rhythm, not a stamp. */
const BEAT_AMPLITUDES = [1, 0.78, 1.12, 0.86, 1.04, 0.8] as const;

function buildEcgPath(): string {
  const beatWidth = ECG_WIDTH / BEAT_AMPLITUDES.length;
  const segments = BEAT_AMPLITUDES.map((amplitude, i) => {
    const s = (n: number) => Math.round(n * amplitude * 10) / 10;
    const start = Math.round(i * beatWidth + beatWidth * 0.3);
    return [
      `L${start} ${ECG_BASELINE}`,
      `q8 ${s(-14)} 16 0`, // P wave
      "l12 0",
      `l5 ${s(9)} l9 ${s(-96)} l10 ${s(118)} l7 ${s(-31)}`, // QRS complex
      "l20 0",
      `q14 ${s(-24)} 28 0`, // T wave
    ].join(" ");
  });
  return `M0 ${ECG_BASELINE} ${segments.join(" ")} L${ECG_WIDTH} ${ECG_BASELINE}`;
}

const ecgPath = buildEcgPath();

/**
 * Decorative layers for the outcomes band: aurora glow, masked line grid,
 * crosshair rings and film grain.
 */
export function OutcomesBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Aurora */}
      <div className="absolute inset-x-0 -top-56 mx-auto h-[38rem] w-[min(68rem,140%)] animate-aurora rounded-full bg-brand-600/30 blur-[120px]" />
      <div className="absolute -right-40 -bottom-56 size-[36rem] animate-float-delayed rounded-full bg-vital-400/15 blur-[120px]" />
      <div className="absolute top-1/3 -left-48 size-[26rem] rounded-full bg-brand-400/10 blur-[100px]" />

      {/* Technical grid */}
      <div className="absolute inset-0 bg-line-grid-dark mask-spotlight" />

      {/* Crosshair rings behind the heading (the AETOS eye) */}
      <svg
        viewBox="0 0 600 600"
        fill="none"
        aria-hidden="true"
        focusable="false"
        className="absolute inset-x-0 -top-64 mx-auto size-[48rem] text-white/7 mask-fade-b sm:-top-96 sm:size-[60rem]"
      >
        <g stroke="currentColor" strokeWidth="1">
          <circle cx="300" cy="300" r="90" />
          <circle cx="300" cy="300" r="150" />
          <circle cx="300" cy="300" r="210" strokeDasharray="3 10" />
          <circle cx="300" cy="300" r="270" />
          <path d="M300 0v180M300 420v180M0 300h180M420 300h180" />
        </g>
      </svg>

      {/* Film grain */}
      <div className="absolute inset-0 bg-noise opacity-5 mix-blend-soft-light" />
    </div>
  );
}

/**
 * Oversized, full-bleed ECG trace. The caller positions it (the outcomes grid
 * runs it along a row gutter so it glows through the glass cards); its
 * baseline sits at 55% of its own height. SVG ids are prefixed "out-".
 */
export function OutcomesEcg({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${ECG_WIDTH} ${ECG_HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("pointer-events-none mask-fade-x", className)}
    >
      <defs>
        <linearGradient id="out-ecg-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="currentColor" stopOpacity="0" className="text-brand-400" />
          <stop offset="0.35" stopColor="currentColor" className="text-brand-400" />
          <stop offset="0.7" stopColor="currentColor" className="text-vital-300" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" className="text-vital-300" />
        </linearGradient>
        <filter id="out-ecg-glow" x="-5%" y="-50%" width="110%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <path d={ecgPath} stroke="url(#out-ecg-grad)" strokeWidth="1.25" strokeOpacity="0.3" />
      <path
        d={ecgPath}
        pathLength={1}
        strokeDasharray="1"
        stroke="url(#out-ecg-grad)"
        strokeWidth="6"
        strokeOpacity="0.35"
        filter="url(#out-ecg-glow)"
        className="animate-ecg"
      />
      <path
        d={ecgPath}
        pathLength={1}
        strokeDasharray="1"
        stroke="url(#out-ecg-grad)"
        strokeWidth="2"
        strokeOpacity="0.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-ecg"
      />
    </svg>
  );
}
