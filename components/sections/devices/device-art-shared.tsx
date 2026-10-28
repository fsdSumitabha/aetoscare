/**
 * Shared building blocks for the hand-drawn device illustrations: colour
 * palette, gradient/filter defs, ground shadow, primary button and the AETOS
 * crosshair motif. The LCD read-out lives in device-art-lcd.tsx.
 *
 * SVG gradient stops cannot read Tailwind classes, so the palette mirrors the
 * design tokens in app/globals.css as hex values.
 */

export const tone = {
  white: "#ffffff",
  ink50: "#f3f6fa",
  ink100: "#e6ebf2",
  ink200: "#cdd5e1",
  ink300: "#a3afc0",
  ink400: "#74839b",
  ink500: "#4a5f80",
  ink600: "#2a4670",
  ink700: "#143158",
  ink800: "#0b2244",
  ink900: "#071630",
  ink950: "#040c1b",
  brand100: "#d9e8ff",
  brand200: "#b9d5ff",
  brand300: "#89b8ff",
  brand400: "#5596ff",
  brand500: "#2b78ff",
  brand600: "#1660f0",
  brand700: "#124cc8",
  brand800: "#153f9e",
  brand900: "#17377c",
  vital200: "#a1f2d6",
  vital300: "#64e4bf",
  vital400: "#2bcfa4",
  pulse100: "#ffe1da",
  pulse300: "#ffa592",
  pulse400: "#ff7a62",
  pulse500: "#f9573c",
  pulse600: "#e23d22",
} as const;

/** Props every device artwork receives from DeviceIllustration. */
export type ArtProps = {
  /** Unique id prefix, e.g. "dev-glucometer-". */
  prefix: string;
  /** Sample reading shown on the LCD. */
  value: string;
  /** Unit shown on the LCD. */
  unit: string;
};

/** `url(#<prefix><name>)` reference for fills, strokes and filters. */
export function ref(prefix: string, name: string): string {
  return `url(#${prefix}${name})`;
}

/** Rounds to 2 decimals to keep generated SVG markup compact. */
export const r2 = (n: number) => Math.round(n * 100) / 100;

/** Gradients and filters shared by every device artwork. */
export function ArtDefs({ prefix }: { prefix: string }) {
  return (
    <defs>
      {/* White moulded plastic, lit from above */}
      <linearGradient id={`${prefix}shell`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={tone.white} />
        <stop offset="0.55" stopColor={tone.ink50} />
        <stop offset="1" stopColor="#dde4ee" />
      </linearGradient>
      {/* Extruded side / depth of a body */}
      <linearGradient id={`${prefix}side`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={tone.ink200} />
        <stop offset="1" stopColor={tone.ink300} />
      </linearGradient>
      {/* Cylinder shading for tubes */}
      <linearGradient id={`${prefix}tube`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={tone.ink100} />
        <stop offset="0.24" stopColor={tone.white} />
        <stop offset="0.62" stopColor={tone.ink50} />
        <stop offset="1" stopColor={tone.ink300} />
      </linearGradient>
      <linearGradient id={`${prefix}lcd`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#0f2d50" />
        <stop offset="1" stopColor={tone.ink950} />
      </linearGradient>
      <linearGradient id={`${prefix}brand`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={tone.brand400} />
        <stop offset="1" stopColor={tone.brand700} />
      </linearGradient>
      <linearGradient id={`${prefix}gloss`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={tone.white} stopOpacity="0.95" />
        <stop offset="1" stopColor={tone.white} stopOpacity="0" />
      </linearGradient>
      <radialGradient id={`${prefix}shadow`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor={tone.ink950} stopOpacity="0.3" />
        <stop offset="0.55" stopColor={tone.ink950} stopOpacity="0.12" />
        <stop offset="1" stopColor={tone.ink950} stopOpacity="0" />
      </radialGradient>
      <filter id={`${prefix}glow`} x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur stdDeviation="9" />
      </filter>
    </defs>
  );
}

export function GroundShadow({
  prefix,
  cx,
  cy,
  rx,
  ry,
}: {
  prefix: string;
  cx: number;
  cy: number;
  rx: number;
  ry: number;
}) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={ref(prefix, "shadow")} />;
}

/** Glossy round brand button with an optional power glyph. */
export function PrimaryButton({
  prefix,
  cx,
  cy,
  r,
  power = false,
}: {
  prefix: string;
  cx: number;
  cy: number;
  r: number;
  power?: boolean;
}) {
  const rho = r * 0.42;
  const cy0 = cy + r * 0.06;
  const sx = r2(cx + rho * 0.643);
  const ex = r2(cx - rho * 0.643);
  const sy = r2(cy0 - rho * 0.766);

  return (
    <g>
      <circle cx={cx} cy={cy} r={r + 3.5} fill={tone.ink100} stroke={tone.ink200} />
      <circle cx={cx} cy={cy} r={r} fill={ref(prefix, "brand")} />
      <ellipse cx={r2(cx - r * 0.22)} cy={r2(cy - r * 0.42)} rx={r2(r * 0.5)} ry={r2(r * 0.26)} fill={tone.white} opacity="0.4" />
      {power ? (
        <g fill="none" stroke={tone.white} strokeWidth="1.8" strokeLinecap="round">
          <path d={`M${cx} ${r2(cy0 - rho * 1.05)}V${r2(cy0 - rho * 0.2)}`} />
          <path d={`M${sx} ${sy}A${r2(rho)} ${r2(rho)} 0 1 1 ${ex} ${sy}`} />
        </g>
      ) : null}
    </g>
  );
}

/** The AETOS eye: ring, centre dot and four crosshair ticks. */
export function Crosshair({
  cx,
  cy,
  r,
  stroke,
  opacity = 1,
}: {
  cx: number;
  cy: number;
  r: number;
  stroke: string;
  opacity?: number;
}) {
  const a = r2(r * 0.55);
  const b = r2(r * 1.7);
  return (
    <g stroke={stroke} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity={opacity}>
      <circle cx={cx} cy={cy} r={r} />
      <path
        d={`M${cx} ${cy - b}V${cy - a}M${cx} ${cy + a}V${cy + b}M${cx - b} ${cy}H${cx - a}M${cx + a} ${cy}H${cx + b}`}
      />
      <circle cx={cx} cy={cy} r={r2(r * 0.3)} fill={stroke} stroke="none" />
    </g>
  );
}
