import { Crosshair, GroundShadow, PrimaryButton, ref, tone, type ArtProps } from "./device-art-shared";
import { Lcd } from "./device-art-lcd";

/** Upper-arm cuff, hose and cellular display unit. Drawn on a 320×240 canvas. */
export function BloodPressureArt({ prefix, value, unit }: ArtProps) {
  return (
    <g>
      <defs>
        <linearGradient id={`${prefix}cuff`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={tone.ink600} />
          <stop offset="0.26" stopColor="#3f66a6" />
          <stop offset="0.58" stopColor={tone.ink700} />
          <stop offset="1" stopColor={tone.ink900} />
        </linearGradient>
        <radialGradient id={`${prefix}hole`} cx="0.7" cy="0.5" r="0.75">
          <stop offset="0" stopColor={tone.ink700} />
          <stop offset="1" stopColor={tone.ink950} />
        </radialGradient>
      </defs>

      <GroundShadow prefix={prefix} cx={164} cy={204} rx={140} ry={13} />

      {/* Cuff: a wrapped cylinder lying on its side */}
      <path d="M40 108H150A16 42 0 0 1 150 192H40A16 42 0 0 1 40 108Z" fill={ref(prefix, "cuff")} />
      <rect x="52" y="116" width="92" height="6" rx="3" fill={tone.white} opacity="0.16" />
      <path
        d="M52 113H146M52 187H146"
        stroke={tone.white}
        strokeOpacity="0.24"
        strokeDasharray="3 4"
        strokeLinecap="round"
      />
      <rect x="76" y="128" width="54" height="26" rx="7" fill={tone.ink600} opacity="0.8" />
      <rect x="76.5" y="128.5" width="53" height="25" rx="6.5" fill="none" stroke={tone.white} strokeOpacity="0.12" />
      <Crosshair cx={103} cy={141} r={5.5} stroke={tone.brand300} />
      <path d="M86 165H120" stroke={tone.white} strokeOpacity="0.12" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="40" cy="150" rx="16" ry="42" fill={tone.ink600} />
      <ellipse cx="42" cy="150" rx="11" ry="34" fill={ref(prefix, "hole")} />
      <path d="M33 124A11 34 0 0 1 40 117" stroke={tone.white} strokeOpacity="0.25" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Hose */}
      <ellipse cx="112" cy="110" rx="6" ry="2.6" fill={tone.ink900} />
      <path
        d="M112 110C108 84 108 62 124 60C136 58 128 100 141 100"
        fill="none"
        stroke={tone.ink300}
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <path
        d="M111 108C107 83 107.5 61.5 123.5 59C134 57.5 127 98.5 140 98.6"
        fill="none"
        stroke={tone.white}
        strokeOpacity="0.7"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <rect x="133" y="93.5" width="19" height="14" rx="4" fill={ref(prefix, "side")} />

      {/* Display unit */}
      <rect x="153" y="58" width="144" height="138" rx="30" fill={ref(prefix, "side")} />
      <rect x="148" y="50" width="144" height="138" rx="30" fill={ref(prefix, "shell")} stroke={tone.ink200} />
      <rect x="149.5" y="51.5" width="141" height="135" rx="28.5" fill="none" stroke={tone.white} strokeWidth="1.5" />
      <rect x="166" y="55" width="108" height="20" rx="10" fill={ref(prefix, "gloss")} opacity="0.85" />
      <Lcd prefix={prefix} x={164} y={68} width={112} height={60} radius={12} value={value} unit={unit} />
      <rect x="172" y="152" width="24" height="10" rx="5" fill={tone.ink100} stroke={tone.ink200} />
      <rect x="244" y="152" width="24" height="10" rx="5" fill={tone.ink100} stroke={tone.ink200} />
      <PrimaryButton prefix={prefix} cx={220} cy={157} r={14} power />
    </g>
  );
}
