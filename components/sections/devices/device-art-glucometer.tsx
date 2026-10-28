import { GroundShadow, PrimaryButton, ref, tone, type ArtProps } from "./device-art-shared";
import { Lcd } from "./device-art-lcd";

/** Handheld glucose meter with an inserted test strip. Drawn on a 320×240 canvas. */
export function GlucometerArt({ prefix, value, unit }: ArtProps) {
  return (
    <g>
      <defs>
        <linearGradient id={`${prefix}drop`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={tone.pulse400} />
          <stop offset="1" stopColor={tone.pulse600} />
        </linearGradient>
      </defs>

      <GroundShadow prefix={prefix} cx={172} cy={207} rx={118} ry={11} />

      {/* Spare strip resting on the surface */}
      <g transform="rotate(-12 262 190)">
        <rect x="222" y="182" width="78" height="15" rx="3" fill={tone.white} stroke={tone.ink200} />
        <rect x="283" y="182" width="17" height="15" rx="3" fill={tone.brand500} />
        <circle cx="291.5" cy="189.5" r="3" fill={tone.white} />
        <path d="M228 186.5H242M228 189.5H242M228 192.5H242" stroke={tone.ink300} strokeWidth="1.2" strokeLinecap="round" />
      </g>

      {/* Meter body */}
      <rect x="124" y="46" width="100" height="160" rx="34" fill={ref(prefix, "side")} />
      <rect x="118" y="40" width="100" height="160" rx="34" fill={ref(prefix, "shell")} stroke={tone.ink200} />
      <rect x="119.5" y="41.5" width="97" height="157" rx="32.5" fill="none" stroke={tone.white} strokeWidth="1.5" />
      <rect x="130" y="45" width="76" height="18" rx="9" fill={ref(prefix, "gloss")} opacity="0.85" />

      {/* Test strip in the port, with a blood sample on its tip */}
      <rect x="157" y="8" width="22" height="36" rx="3" fill={tone.white} stroke={tone.ink200} />
      <rect x="157" y="8" width="22" height="9" rx="3" fill={tone.brand500} />
      <rect x="166.5" y="19" width="3" height="18" rx="1.5" fill={tone.brand100} />
      <rect x="150" y="36" width="36" height="9" rx="4.5" fill={tone.ink700} />
      <rect x="154" y="38.5" width="28" height="3" rx="1.5" fill={tone.ink950} />
      <path
        d="M203 6C203 6 195.5 16 195.5 21.5a7.5 7.5 0 0 0 15 0C210.5 16 203 6 203 6Z"
        fill={ref(prefix, "drop")}
      />
      <ellipse cx="200.4" cy="21" rx="1.9" ry="3" fill={tone.white} opacity="0.55" />

      <Lcd prefix={prefix} x={128} y={60} width={80} height={58} radius={12} value={value} unit={unit} />
      <PrimaryButton prefix={prefix} cx={168} cy={150} r={15} />
      <rect x="134" y="178" width="22" height="9" rx="4.5" fill={tone.ink100} stroke={tone.ink200} />
      <rect x="180" y="178" width="22" height="9" rx="4.5" fill={tone.ink100} stroke={tone.ink200} />
    </g>
  );
}
