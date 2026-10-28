import { GroundShadow, PrimaryButton, ref, tone, type ArtProps } from "./device-art-shared";
import { Lcd } from "./device-art-lcd";

/** Fingertip pulse oximeter: two-tone clip shell with the finger chamber. 320×240 canvas. */
export function OximeterArt({ prefix, value, unit }: ArtProps) {
  return (
    <g>
      <defs>
        <linearGradient id={`${prefix}jaw`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={tone.brand500} />
          <stop offset="1" stopColor={tone.brand800} />
        </linearGradient>
        <linearGradient id={`${prefix}depth`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={tone.ink300} />
          <stop offset="0.6" stopColor={tone.ink300} />
          <stop offset="0.64" stopColor={tone.brand900} />
          <stop offset="1" stopColor={tone.brand900} />
        </linearGradient>
        <clipPath id={`${prefix}body`}>
          <rect x="56" y="70" width="208" height="104" rx="46" />
        </clipPath>
      </defs>

      <GroundShadow prefix={prefix} cx={162} cy={196} rx={128} ry={12} />

      {/* Shell depth, body and the brand-coloured lower jaw */}
      <rect x="60" y="78" width="208" height="104" rx="46" fill={ref(prefix, "depth")} />
      <rect x="56" y="70" width="208" height="104" rx="46" fill={ref(prefix, "shell")} />
      <g clipPath={ref(prefix, "body")}>
        <rect x="56" y="140" width="208" height="34" fill={ref(prefix, "jaw")} />
        <path d="M56 140.5H264" stroke={tone.white} strokeOpacity="0.7" />
        <path d="M56 142H264" stroke={tone.brand900} strokeOpacity="0.35" />
      </g>
      <rect x="56.5" y="70.5" width="207" height="103" rx="45.5" fill="none" stroke={tone.ink200} />
      <rect x="58" y="72" width="204" height="100" rx="44" fill="none" stroke={tone.white} strokeOpacity="0.8" strokeWidth="1.4" />
      <rect x="86" y="75" width="150" height="16" rx="8" fill={ref(prefix, "gloss")} opacity="0.9" />

      {/* Finger chamber with silicone pad and the red sensor LED */}
      <g clipPath={ref(prefix, "body")}>
        <rect x="36" y="127" width="92" height="27" rx="13.5" fill={tone.ink950} />
        <rect x="36" y="127" width="92" height="27" rx="13.5" fill="none" stroke={tone.ink600} strokeWidth="1.5" />
        <rect x="46" y="138.5" width="72" height="8" rx="4" fill={tone.pulse100} opacity="0.32" />
        <circle cx="86" cy="141" r="7" fill={tone.pulse400} filter={ref(prefix, "glow")} opacity="0.9" />
        <circle cx="86" cy="141" r="2.2" fill={tone.pulse300} />
      </g>
      <path d="M62 126.2H122" stroke={tone.white} strokeOpacity="0.85" strokeLinecap="round" />

      <Lcd prefix={prefix} x={132} y={83} width={112} height={46} radius={10} value={value} unit={unit} />
      <PrimaryButton prefix={prefix} cx={98} cy={104} r={11} power />

      {/* Lanyard loop */}
      <path d="M262 116C280 116 286 140 268 146" fill="none" stroke={tone.ink300} strokeWidth="3.2" strokeLinecap="round" />
      <path d="M262 116C278 116.5 283.5 138 268 144" fill="none" stroke={tone.white} strokeOpacity="0.6" strokeWidth="1" strokeLinecap="round" />
    </g>
  );
}
