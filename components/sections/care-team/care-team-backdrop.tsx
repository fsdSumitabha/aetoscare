const RINGS = [150, 250, 350, 450] as const;

/** Tick marks along the crosshair axes, every 30 units, skipping the centre. */
const AXIS_TICKS = Array.from({ length: 31 }, (_, i) => 50 + i * 30).filter(
  (p) => Math.abs(p - 500) > 60,
);

/**
 * Decorative backdrop for the dark care-team section: dot grid in a spotlight
 * mask, a slow brand/vital aurora and oversized crosshair rings echoing the
 * AETOS eye.
 */
export function CareTeamBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-dot-grid-dark mask-spotlight" />
      <div className="absolute -top-56 left-1/2 h-168 w-288 -translate-x-1/2 animate-aurora rounded-full bg-brand-600/20 blur-3xl" />
      <div className="absolute top-[38%] -left-56 size-144 animate-[aurora_22s_ease-in-out_-7s_infinite_alternate] rounded-full bg-vital-400/10 blur-3xl" />
      <div className="absolute -right-48 bottom-0 size-136 animate-[aurora_26s_ease-in-out_-13s_infinite_alternate] rounded-full bg-brand-500/12 blur-3xl" />

      <svg
        viewBox="0 0 1000 1000"
        fill="none"
        focusable="false"
        className="absolute -top-68 left-1/2 w-272 max-w-none -translate-x-1/2 text-white opacity-8"
      >
        <g stroke="currentColor">
          {RINGS.map((r) => (
            <circle key={r} cx="500" cy="500" r={r} strokeWidth="1" />
          ))}
          <circle cx="500" cy="500" r="400" strokeWidth="1.5" strokeDasharray="2 12" className="origin-center animate-spin-slow" />
          <path d="M20 500H420M580 500H980M500 20V420M500 580V980" strokeWidth="1" />
          {AXIS_TICKS.map((p) => (
            <path key={p} d={`M${p} 494V506M494 ${p}H506`} strokeWidth="1" />
          ))}
        </g>
        <circle cx="500" cy="500" r="6" fill="currentColor" />
      </svg>

      <div className="absolute inset-0 bg-noise opacity-4 mix-blend-overlay" />
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/15 to-transparent" />
    </div>
  );
}
