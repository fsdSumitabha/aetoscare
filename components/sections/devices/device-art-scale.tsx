import { Crosshair, GroundShadow, ref, tone, type ArtProps } from "./device-art-shared";
import { Lcd } from "./device-art-lcd";

/** Tempered-glass platform scale seen from a low angle. 320×240 canvas. */
export function ScaleArt({ prefix, value, unit }: ArtProps) {
  return (
    <g>
      <defs>
        <linearGradient id={`${prefix}glass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={tone.ink600} />
          <stop offset="0.45" stopColor={tone.ink800} />
          <stop offset="1" stopColor={tone.ink950} />
        </linearGradient>
        <linearGradient id={`${prefix}edge`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={tone.ink500} />
          <stop offset="1" stopColor={tone.ink900} />
        </linearGradient>
        <clipPath id={`${prefix}face`}>
          <rect x="28" y="92" width="264" height="84" rx="32" />
        </clipPath>
      </defs>

      <GroundShadow prefix={prefix} cx={160} cy={194} rx={150} ry={15} />
      <ellipse cx="72" cy="188" rx="14" ry="4.5" fill={tone.ink900} />
      <ellipse cx="248" cy="188" rx="14" ry="4.5" fill={tone.ink900} />

      {/* Platform: edge, glass top, reflections */}
      <rect x="28" y="102" width="264" height="84" rx="32" fill={ref(prefix, "edge")} />
      <rect x="96" y="180.5" width="128" height="2" rx="1" fill={tone.brand400} opacity="0.85" />
      <rect x="28" y="92" width="264" height="84" rx="32" fill={ref(prefix, "glass")} />
      <g clipPath={ref(prefix, "face")}>
        <path d="M86 92H134L76 176H28Z" fill={tone.white} opacity="0.07" />
        <path d="M144 92H158L100 176H86Z" fill={tone.white} opacity="0.05" />
        <ellipse cx="160" cy="92" rx="120" ry="10" fill={tone.brand400} opacity="0.12" />
      </g>
      <rect x="28.75" y="92.75" width="262.5" height="82.5" rx="31.25" fill="none" stroke={tone.white} strokeOpacity="0.18" />

      {/* Foot zones */}
      <rect x="52" y="130" width="64" height="32" rx="16" fill={tone.white} fillOpacity="0.04" stroke={tone.white} strokeOpacity="0.1" />
      <rect x="204" y="130" width="64" height="32" rx="16" fill={tone.white} fillOpacity="0.04" stroke={tone.white} strokeOpacity="0.1" />

      <Lcd prefix={prefix} x={124} y={104} width={72} height={34} radius={8} value={value} unit={unit} onDark />
      <Crosshair cx={160} cy={158} r={5} stroke={tone.white} opacity={0.32} />
    </g>
  );
}
