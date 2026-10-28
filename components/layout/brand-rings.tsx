import { cn } from "@/lib/cn";

/** Ring radii in a 200×200 box centred on the origin; the first matches the logo "O". */
const RADII = [18, 34, 50, 66, 82, 98] as const;

/** "+" tick marks where the diagonals cross the rings (r = 50 and r = 82). */
const TICKS = [
  [35.4, -35.4],
  [-35.4, 35.4],
  [58, 58],
  [-58, -58],
] as const;

type BrandRingsProps = {
  /** Size, position and stroke colour (rings use currentColor). */
  className?: string;
  /** Fill class for the small pulsing "reading" node. Omit to hide the node. */
  nodeClassName?: string;
  /**
   * Node centre in the -100…100 box. Keep it on a ring (r = 18…98) and choose a
   * spot that stays inside the visible crop of each usage.
   */
  nodeAt?: readonly [number, number];
  /** Adds a slowly rotating dashed orbit (disabled by reduced-motion CSS). */
  spin?: boolean;
};

/**
 * The AETOS crosshair-eye motif expanded into concentric rings: hairline
 * circles, a gapped crosshair and "+" ticks. Purely decorative.
 */
export function BrandRings({
  className,
  nodeClassName,
  nodeAt = [-47, -17],
  spin = false,
}: BrandRingsProps) {
  const [nodeX, nodeY] = nodeAt;

  return (
    <svg
      viewBox="-100 -100 200 200"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      focusable="false"
      className={cn("overflow-visible", className)}
    >
      {RADII.map((r, index) => (
        <circle
          key={r}
          r={r}
          strokeWidth={1}
          strokeOpacity={(100 - index * 12) / 100}
          vectorEffect="non-scaling-stroke"
        />
      ))}
      <path
        d="M0 -100V-26M0 26V100M-100 0H-26M26 0H100"
        strokeWidth={1}
        strokeOpacity={0.7}
        vectorEffect="non-scaling-stroke"
      />
      {TICKS.map(([x, y]) => (
        <path
          key={`${x}:${y}`}
          d={`M${x - 3} ${y}h6M${x} ${y - 3}v6`}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {spin ? (
        <circle
          r={58}
          strokeWidth={1}
          strokeDasharray="2 7"
          vectorEffect="non-scaling-stroke"
          className="origin-center animate-spin-slow transform-fill"
        />
      ) : null}
      {nodeClassName ? (
        <g className={cn("stroke-none", nodeClassName)}>
          <circle cx={nodeX} cy={nodeY} r={1.6} />
          <circle
            cx={nodeX}
            cy={nodeY}
            r={1.6}
            className="origin-center animate-ping-slow opacity-60 transform-fill"
          />
        </g>
      ) : null}
    </svg>
  );
}
