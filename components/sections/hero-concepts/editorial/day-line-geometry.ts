/**
 * Geometry for the "A day of care" line: a calm morning wave that rises into
 * one soft heartbeat, then slows into the long, easy breathing of night.
 * Pure and deterministic, computed once at module load (no randomness).
 */

export const DAY_LINE = { width: 1200, height: 300, baseline: 176 } as const;

type Point = readonly [number, number];

const B = DAY_LINE.baseline;

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

const round = (n: number) => Math.round(n * 10) / 10;

/** Morning: a gentle wave that hushes before the heartbeat. */
function morningY(x: number) {
  const amp = 9 * (0.55 + 0.45 * smoothstep(0, 160, x)) * (1 - smoothstep(320, 432, x));
  return B - amp * Math.sin((2 * Math.PI * x) / 150);
}

/** Evening into night: the wave returns, then lengthens and softens. */
const NIGHT_START = 700;
const NIGHT_END = 1200;
const nightPhase: number[] = [0];
for (let x = NIGHT_START + 1; x <= NIGHT_END; x += 1) {
  const period = 140 + 110 * smoothstep(NIGHT_START, NIGHT_END, x);
  nightPhase.push(nightPhase[nightPhase.length - 1] + (2 * Math.PI) / period);
}

function nightY(x: number) {
  const i = Math.round(Math.min(NIGHT_END, Math.max(NIGHT_START, x)) - NIGHT_START);
  const amp = 9 * smoothstep(NIGHT_START, 800, x) * (1 - 0.7 * smoothstep(820, NIGHT_END, x));
  return B - amp * Math.sin(nightPhase[i]);
}

/** Catmull-Rom spline through points, emitted as cubic Bézier segments. */
function smoothSegments(points: Point[]) {
  let d = "";
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${round(c1x)} ${round(c1y)} ${round(c2x)} ${round(c2y)} ${round(p2[0])} ${round(p2[1])}`;
  }
  return d;
}

function sample(from: number, to: number, step: number, fn: (x: number) => number): Point[] {
  const pts: Point[] = [];
  for (let x = from; x <= to; x += step) pts.push([x, fn(x)]);
  return pts;
}

const morning = sample(0, 430, 10, morningY);
const night = sample(NIGHT_START, NIGHT_END, 10, nightY);

/** One soft PQRST complex. Rounded joins keep it gentle, never jagged. */
const heartbeat = [
  "L446 176",
  "C456 176 460 160 471 160",
  "C482 160 486 176 497 176",
  "L513 176",
  "L521 189",
  "L535 62",
  "Q540 44 545 62",
  "L557 204",
  "L565 176",
  "L590 176",
  "C606 176 612 152 630 152",
  "C648 152 654 176 670 176",
  `L${NIGHT_START} 176`,
].join(" ");

export const dayLinePath = `M${morning[0][0]} ${round(morning[0][1])}${smoothSegments(morning)} ${heartbeat}${smoothSegments(night)}`;

/** The heartbeat's crest: where the morning reading lands. */
export const PEAK: Point = [540, 53];

export type PinPlacement = "left" | "above" | "below";

/** Anchor (percent of the band) for a milestone pinned on the line. */
export function pinAt(x: number, placement: PinPlacement) {
  const y = x === PEAK[0] ? PEAK[1] : x >= NIGHT_START ? nightY(x) : morningY(x);
  return {
    x: `${round((x / DAY_LINE.width) * 100)}%`,
    y: `${round((y / DAY_LINE.height) * 100)}%`,
    cx: x,
    cy: round(y),
    placement,
  };
}
