import { r2, ref, tone } from "./device-art-shared";

/** Four ascending bars plus "4G": every AETOS device is cellular. */
function SignalGlyph({ x, y, size, color }: { x: number; y: number; size: number; color: string }) {
  const barW = size * 0.2;
  const step = size * 0.3;
  return (
    <g fill={color}>
      {[0, 1, 2, 3].map((i) => {
        const h = size * (0.34 + 0.22 * i);
        return (
          <rect
            key={i}
            x={r2(x + i * step)}
            y={r2(y + size - h)}
            width={r2(barW)}
            height={r2(h)}
            rx={r2(barW / 2.5)}
          />
        );
      })}
      <text
        x={r2(x + step * 4 + size * 0.15)}
        y={r2(y + size * 0.96)}
        fontSize={r2(size * 1.02)}
        fontWeight={600}
        className="font-mono"
      >
        4G
      </text>
    </g>
  );
}

type LcdProps = {
  prefix: string;
  x: number;
  y: number;
  width: number;
  height: number;
  value: string;
  unit: string;
  radius?: number;
  /** Adds a light rim so the bezel reads on dark device bodies. */
  onDark?: boolean;
};

/**
 * LCD read-out: hover glow (driven by the parent `group/device`), bezel,
 * ghost segments, sample value, unit and the 4G glyph.
 */
export function Lcd({ prefix, x, y, width: w, height: h, value, unit, radius = 10, onDark }: LcdProps) {
  const pad = Math.max(6, h * 0.14);
  const meta = Math.min(h * 0.17, 10);
  const valueSize = r2(Math.min(h * 0.5, (w - pad * 2) / (value.length * 0.62)));
  const ghost = value.replace(/[0-9]/g, "8");

  return (
    <g>
      <rect
        x={x - 4}
        y={y - 4}
        width={w + 8}
        height={h + 8}
        rx={radius + 4}
        fill={tone.vital400}
        filter={ref(prefix, "glow")}
        className="opacity-25 transition-opacity duration-500 group-hover/device:opacity-90"
      />
      <rect
        x={x - 3}
        y={y - 3}
        width={w + 6}
        height={h + 6}
        rx={radius + 3}
        fill={tone.ink900}
        stroke={onDark ? tone.white : "none"}
        strokeOpacity={onDark ? 0.16 : 0}
      />
      <rect x={x} y={y} width={w} height={h} rx={radius} fill={ref(prefix, "lcd")} />
      <rect x={x + 2} y={y + 2} width={w - 4} height={h * 0.42} rx={radius - 2} fill={tone.white} opacity="0.05" />
      <SignalGlyph x={x + pad} y={y + pad} size={meta} color={tone.brand200} />
      <text
        x={r2(x + w - pad)}
        y={r2(y + pad + meta * 0.92)}
        textAnchor="end"
        fontSize={r2(meta)}
        fill={tone.brand200}
        className="font-mono"
      >
        {unit}
      </text>
      <g className="font-mono" fontSize={valueSize} fontWeight={600} textAnchor="end" letterSpacing="-0.02em">
        <text x={r2(x + w - pad)} y={r2(y + h - pad)} fill={tone.vital300} opacity="0.09">
          {ghost}
        </text>
        <text x={r2(x + w - pad)} y={r2(y + h - pad)} fill={tone.vital300}>
          {value}
        </text>
      </g>
    </g>
  );
}
