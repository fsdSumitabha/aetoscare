import { GroundShadow, PrimaryButton, ref, tone, type ArtProps } from "./device-art-shared";
import { Lcd } from "./device-art-lcd";

/** Handheld turbine spirometer: mouthpiece, flow tube and display grip. 320×240 canvas. */
export function SpirometerArt({ prefix, value, unit }: ArtProps) {
  return (
    <g>
      <defs>
        <linearGradient id={`${prefix}band`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={tone.brand400} />
          <stop offset="0.24" stopColor={tone.brand300} />
          <stop offset="0.62" stopColor={tone.brand500} />
          <stop offset="1" stopColor={tone.brand800} />
        </linearGradient>
      </defs>

      <GroundShadow prefix={prefix} cx={164} cy={212} rx={124} ry={10} />

      {/* Grip with display */}
      <rect x="124" y="98" width="88" height="112" rx="26" fill={ref(prefix, "side")} />
      <rect x="118" y="92" width="88" height="112" rx="26" fill={ref(prefix, "shell")} stroke={tone.ink200} />
      <rect x="119.5" y="93.5" width="85" height="109" rx="24.5" fill="none" stroke={tone.white} strokeWidth="1.5" />
      <Lcd prefix={prefix} x={130} y={121} width={64} height={44} radius={9} value={value} unit={unit} />
      <PrimaryButton prefix={prefix} cx={162} cy={186} r={10} />

      {/* Disposable mouthpiece */}
      <path d="M34 68H76V104H34A7 18 0 0 1 34 68Z" fill={ref(prefix, "tube")} stroke={tone.ink200} />
      <ellipse cx="34" cy="86" rx="7" ry="18" fill={tone.ink100} stroke={tone.ink200} />
      <ellipse cx="35" cy="86" rx="4" ry="13" fill={tone.ink700} />
      <rect x="68" y="62" width="16" height="48" rx="5" fill={tone.ink200} />
      <rect x="70" y="64" width="3" height="44" rx="1.5" fill={tone.white} opacity="0.7" />

      {/* Flow tube */}
      <path d="M82 58H252A12 28 0 0 1 252 114H82Z" fill={ref(prefix, "tube")} stroke={tone.ink200} />
      <rect x="138" y="58" width="16" height="56" fill={ref(prefix, "band")} />
      <rect x="88" y="64" width="158" height="6" rx="3" fill={tone.white} opacity="0.9" />
      <path
        d="M184 78L191 86L184 94M199 78L206 86L199 94M214 78L221 86L214 94"
        fill="none"
        stroke={tone.brand300}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Outlet with turbine */}
      <ellipse cx="252" cy="86" rx="12" ry="28" fill={tone.ink100} stroke={tone.ink200} />
      <ellipse cx="253" cy="86" rx="8.5" ry="22" fill={tone.ink800} />
      <g fill="none" stroke={tone.brand300} strokeWidth="1.6" strokeLinecap="round">
        <path d="M253 68C249 74 249 80 253 86S257 98 253 104" />
        <path d="M247.5 78C251 81 255 81 258.5 78M247.5 94C251 91 255 91 258.5 94" strokeOpacity="0.6" />
      </g>
      <circle cx="253" cy="86" r="2.6" fill={tone.brand300} />

      {/* Airflow */}
      <path
        d="M272 70Q286 74 300 68M276 86H306M272 102Q286 98 300 104"
        fill="none"
        stroke={tone.brand400}
        strokeOpacity="0.55"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="2 6"
      />
    </g>
  );
}
