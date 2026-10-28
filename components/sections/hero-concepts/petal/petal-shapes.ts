/**
 * Shared vector shapes for the Petal hero. All paths live in a 24×24 box
 * unless noted, so they can be placed with a translate/scale transform.
 */

/** Rounded heart (Lucide geometry, ISC licence). */
export const HEART_PATH =
  "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z";

/** Four-point twinkle with soft concave sides. */
export const SPARKLE_PATH =
  "M12 0C12.9 7.1 16.9 11.1 24 12C16.9 12.9 12.9 16.9 12 24C11.1 16.9 7.1 12.9 0 12C7.1 11.1 11.1 7.1 12 0Z";

/** Soft organic pebble, drawn in a 200×200 box. */
export const BLOB_PATH =
  "M137 22c26 12 50 34 56 62 6 29-6 62-29 82-22 20-55 27-86 23-31-4-60-20-71-45C-4 119 4 85 22 58 39 32 67 14 95 11c15-2 29 4 42 11Z";

const fmt = (value: number) => value.toFixed(2);

/**
 * Scalloped "flower sticker" outline: `bumps` semicircular petals around a
 * circle of `radius`, centred on (cx, cy). Deterministic, computed once.
 */
export function scallopPath(cx: number, cy: number, radius: number, bumps: number): string {
  const point = (index: number) => {
    const angle = (index / bumps) * Math.PI * 2 - Math.PI / 2;
    return `${fmt(cx + radius * Math.cos(angle))} ${fmt(cy + radius * Math.sin(angle))}`;
  };
  const petal = fmt(radius * Math.sin(Math.PI / bumps));
  let d = `M${point(0)}`;
  for (let index = 1; index <= bumps; index += 1) {
    d += ` A${petal} ${petal} 0 0 1 ${point(index % bumps)}`;
  }
  return `${d}Z`;
}
