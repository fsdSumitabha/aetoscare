/**
 * Decorative layers for the final call to action: aurora light, a masked line
 * grid, film grain, an animated ECG trace and the AETOS crosshair rings.
 * Everything here is aria-hidden; ids are prefixed "cta-" to stay unique.
 */

const ECG_BEAT = "l12 -8 l12 8 h14 l6 8 l10 -62 l10 74 l8 -20 h22 q18 -22 36 0";
const ECG_PATH = `M0 80 H110 ${ECG_BEAT} H540 ${ECG_BEAT} H970 ${ECG_BEAT} H1200`;

/** Fine instrument ticks around the outer ring, every 7.5°, longer every 45°. */
const DIAL_TICKS = Array.from({ length: 48 }, (_, i) => {
  const angle = (i * 7.5 * Math.PI) / 180;
  const major = i % 6 === 0;
  const inner = major ? 302 : 309;
  const outer = 315;
  return {
    key: i,
    major,
    d: `M${(Math.cos(angle) * inner).toFixed(2)} ${(Math.sin(angle) * inner).toFixed(2)}L${(
      Math.cos(angle) * outer
    ).toFixed(2)} ${(Math.sin(angle) * outer).toFixed(2)}`,
  };
});

const CROSS_MARKS = [
  [166, -166],
  [-166, -166],
  [166, 166],
  [-166, 166],
] as const;

export function CtaBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {/* Aurora: radial gradients rather than blur filters, so edges stay silky */}
      <div className="absolute -top-56 left-1/2 h-[40rem] w-[64rem] -translate-x-1/2 animate-aurora bg-radial from-brand-600/50 to-transparent to-70%" />
      <div className="absolute -bottom-64 -left-56 size-[40rem] animate-[aurora_22s_ease-in-out_-9s_infinite_alternate-reverse] bg-radial from-vital-400/25 to-transparent to-70%" />
      <div className="absolute top-1/4 -right-64 size-[38rem] animate-[aurora_26s_ease-in-out_-4s_infinite_alternate] bg-radial from-brand-400/25 to-transparent to-70%" />

      {/* Technical grid + grain */}
      <div className="absolute inset-0 bg-line-grid-dark mask-spotlight" />
      <div className="absolute inset-0 bg-noise opacity-15 mix-blend-soft-light" />

      {/* Edge highlights */}
      <div className="absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-white/35 to-transparent" />
      <div className="absolute inset-0 rounded-5xl ring-1 ring-white/10 ring-inset" />

      <CtaEcg />
    </div>
  );
}

function CtaEcg() {
  return (
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="xMidYMax slice"
      fill="none"
      focusable="false"
      className="absolute inset-x-0 bottom-6 h-24 w-full mask-fade-x sm:bottom-8 sm:h-28"
    >
      <defs>
        <linearGradient id="cta-ecg-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" className="text-brand-400" stopColor="currentColor" stopOpacity="0" />
          <stop offset="0.3" className="text-brand-300" stopColor="currentColor" />
          <stop offset="0.6" className="text-vital-300" stopColor="currentColor" />
          <stop offset="1" className="text-vital-300" stopColor="currentColor" stopOpacity="0.25" />
        </linearGradient>
        <filter id="cta-ecg-glow" x="-5%" y="-60%" width="110%" height="220%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path d={ECG_PATH} className="stroke-white/10" strokeWidth="1.5" strokeLinejoin="round" />
      <path
        d={ECG_PATH}
        pathLength={1}
        strokeDasharray="1"
        stroke="url(#cta-ecg-grad)"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#cta-ecg-glow)"
        className="animate-ecg"
      />
    </svg>
  );
}

/** Concentric crosshair rings (the logo's "O"), centred behind the heading. */
export function CtaRings() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute top-1/2 left-1/2 -z-10">
      <svg
        viewBox="-400 -400 800 800"
        fill="none"
        focusable="false"
        className="absolute top-0 left-0 size-[46rem] -translate-x-1/2 -translate-y-1/2 text-white [mask-image:radial-gradient(circle,black_28%,transparent_70%)] sm:size-[62rem]"
      >
        <defs>
          <radialGradient id="cta-ring-core">
            <stop offset="0" className="text-brand-400" stopColor="currentColor" stopOpacity="0.28" />
            <stop offset="1" className="text-brand-400" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle r="160" fill="url(#cta-ring-core)" />
        <g stroke="currentColor">
          <circle r="90" strokeOpacity="0.12" />
          <circle r="160" strokeOpacity="0.1" />
          <circle r="235" strokeOpacity="0.08" />
          <circle r="315" strokeOpacity="0.07" />
          <circle r="395" strokeOpacity="0.05" />
          <path
            d="M-400 0H-120M120 0H400M0 -400V-120M0 120V400"
            strokeOpacity="0.1"
            strokeDasharray="3 7"
          />
        </g>
        <g stroke="currentColor" strokeLinecap="round">
          {DIAL_TICKS.map((tick) => (
            <path key={tick.key} d={tick.d} strokeOpacity={tick.major ? 0.3 : 0.12} />
          ))}
        </g>
        <g stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" strokeLinecap="round">
          {CROSS_MARKS.map(([x, y]) => (
            <path key={`${x}:${y}`} d={`M${x} ${y - 8}v16M${x - 8} ${y}h16`} />
          ))}
        </g>
        <circle cx="0" cy="-235" r="4" className="fill-vital-300" />
        <circle cx="-315" cy="0" r="3.5" className="fill-brand-300" />
      </svg>

      {/* Static mask wrapper: the orbit fades out before it reaches the buttons and
          trust row, and the fade stays put while the ring spins inside it. */}
      <div className="absolute top-0 left-0 size-[30rem] -translate-x-1/2 -translate-y-1/2 mask-fade-b sm:size-[40rem]">
        <svg viewBox="-100 -100 200 200" fill="none" focusable="false" className="size-full animate-spin-slow">
          <circle
            r="98"
            className="stroke-vital-300/30"
            strokeDasharray="0.6 3.4"
            strokeLinecap="round"
          />
          <circle cx="0" cy="-98" r="1.6" className="fill-vital-300" />
        </svg>
      </div>
    </div>
  );
}
