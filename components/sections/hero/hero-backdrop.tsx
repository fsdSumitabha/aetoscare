/**
 * Decorative layers behind the hero: aurora light, a spotlight-masked line
 * grid, the AETOS "O" re-drawn as a giant crosshair target, film grain and a
 * fade into the integrations band. Entirely aria-hidden.
 */

const CENTER = 500;

/** Round to 2 decimals so the generated geometry is stable and compact. */
function r2(value: number): number {
  return Math.round(value * 100) / 100;
}

function polar(radius: number, degrees: number): [number, number] {
  const radians = (degrees * Math.PI) / 180;
  return [r2(CENTER + radius * Math.cos(radians)), r2(CENTER + radius * Math.sin(radians))];
}

/** Compass ticks around the target: a long tick every 30°, short every 5°. */
const TICKS_PATH = Array.from({ length: 72 }, (_, index) => {
  const degrees = index * 5;
  const major = index % 6 === 0;
  const [x1, y1] = polar(major ? 352 : 362, degrees);
  const [x2, y2] = polar(372, degrees);
  return `M${x1} ${y1}L${x2} ${y2}`;
}).join("");

/** Small "+" registration marks where the crosshair arms cross the rings. */
const PLUS_MARKS_PATH = [200, 420]
  .flatMap((radius) => [0, 90, 180, 270].map((degrees) => polar(radius, degrees)))
  .map(([x, y]) => `M${x - 9} ${y}H${x + 9}M${x} ${y - 9}V${y + 9}`)
  .join("");

const [ARC_END_X, ARC_END_Y] = polar(300, -48);

function TargetRings() {
  return (
    <svg viewBox="0 0 1000 1000" fill="none" focusable="false" className="absolute inset-0 size-full">
      <g stroke="white">
        <circle cx={CENTER} cy={CENTER} r="120" strokeOpacity="0.1" />
        <circle cx={CENTER} cy={CENTER} r="200" strokeOpacity="0.09" />
        <circle cx={CENTER} cy={CENTER} r="420" strokeOpacity="0.07" />
        <circle cx={CENTER} cy={CENTER} r="492" strokeOpacity="0.05" />
        {/* Crosshair arms — the vertical and horizontal bars of the logo "O" */}
        <path
          d="M500 8V292M500 708V992M8 500H292M708 500H992"
          strokeOpacity="0.08"
          strokeWidth="1.5"
        />
        <path d={TICKS_PATH} strokeOpacity="0.12" />
        <path d={PLUS_MARKS_PATH} strokeOpacity="0.22" />
      </g>
    </svg>
  );
}

function OrbitRing() {
  return (
    <svg
      viewBox="0 0 1000 1000"
      fill="none"
      focusable="false"
      className="absolute inset-0 size-full animate-spin-slow"
    >
      <circle
        cx={CENTER}
        cy={CENTER}
        r="300"
        stroke="white"
        strokeOpacity="0.14"
        strokeDasharray="2 12"
      />
      <path
        d={`M500 200A300 300 0 0 1 ${ARC_END_X} ${ARC_END_Y}`}
        className="stroke-brand-300"
        strokeOpacity="0.55"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx={ARC_END_X} cy={ARC_END_Y} r="4" className="fill-vital-300" />
    </svg>
  );
}

export function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Deep navy wash that lifts the top of the page */}
      <div className="absolute inset-0 bg-radial-[ellipse_at_70%_0%] from-brand-900/60 via-ink-950/0 to-ink-950/0 to-70%" />

      {/* Aurora light */}
      <div className="absolute -top-56 -right-64 size-[44rem] animate-aurora rounded-full bg-radial from-brand-500/35 to-transparent to-70% blur-3xl sm:size-[56rem]" />
      <div className="absolute top-[58%] right-[4%] size-[26rem] animate-aurora rounded-full bg-radial from-vital-400/20 to-transparent to-70% blur-3xl [animation-delay:-9s] sm:size-[34rem] lg:top-[30%] lg:right-[12%]" />
      <div className="absolute -bottom-64 -left-56 size-[42rem] animate-aurora rounded-full bg-radial from-brand-800/55 to-transparent to-70% blur-3xl [animation-delay:-14s]" />

      {/* Technical line grid, revealed by a soft spotlight */}
      <div className="absolute inset-0 bg-line-grid-dark mask-spotlight" />

      {/* Giant crosshair target derived from the logo's "O", centred behind the visual */}
      <div className="absolute top-[76%] left-1/2 aspect-square w-[46rem] -translate-x-1/2 -translate-y-1/2 mask-radial-from-40% mask-radial-to-70% sm:w-[58rem] lg:top-[54%] lg:left-[71%] lg:w-[68rem]">
        <TargetRings />
        <OrbitRing />
      </div>

      {/* Film grain */}
      <div className="absolute inset-0 bg-noise opacity-[0.05] mix-blend-overlay" />

      {/* Fade into the integrations band */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-ink-950/0 to-ink-950" />
    </div>
  );
}
