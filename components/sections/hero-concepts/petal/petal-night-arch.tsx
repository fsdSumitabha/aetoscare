import { cn } from "@/lib/cn";
import { SPARKLE_PATH } from "./petal-shapes";

const STAR_DOTS = [
  [38, 112, 1.6],
  [64, 46, 1.3],
  [154, 108, 1.8],
  [170, 64, 1.2],
  [118, 150, 1.4],
  [30, 160, 1.2],
  [86, 168, 1.1],
] as const;

/**
 * Lilac arch: a crescent moon over a little house with its window lit,
 * for the round-the-clock nursing team. Decorative.
 */
export function PetalNightArch({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "@container relative aspect-[5/7] overflow-hidden rounded-t-full rounded-b-[2.25rem] shadow-petal ring-1 ring-white/70",
        className,
      )}
    >
      <svg viewBox="0 0 200 280" className="absolute inset-0 size-full" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="petal-night-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#d9d1f0" />
            <stop offset="0.6" stopColor="#ece8f7" />
            <stop offset="1" stopColor="#f6f4fc" />
          </linearGradient>
          <mask id="petal-moon-mask">
            <rect width="200" height="280" fill="#ffffff" />
            <circle cx="116" cy="82" r="25" fill="#000000" />
          </mask>
        </defs>

        <rect width="200" height="280" fill="url(#petal-night-sky)" />

        {/* Moon halo + crescent */}
        <circle cx="100" cy="94" r="50" fill="#ffffff" opacity="0.28" />
        <circle cx="100" cy="94" r="36" fill="#ffffff" opacity="0.3" />
        <circle cx="100" cy="94" r="27" fill="#fcefd2" mask="url(#petal-moon-mask)" />

        {/* Stars */}
        <path d={SPARKLE_PATH} fill="#ffffff" transform="translate(42 66) scale(0.7)" />
        <path d={SPARKLE_PATH} fill="#fcefd2" transform="translate(146 128) scale(0.55)" />
        <path d={SPARKLE_PATH} fill="#ffffff" transform="translate(150 40) scale(0.42)" />
        {STAR_DOTS.map(([cx, cy, r]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="#ffffff" opacity="0.9" />
        ))}

        {/* Rolling hills */}
        <path d="M-4 214c40-22 92-26 132-18 30 6 52 2 76-8v96H-4Z" fill="#bcafe3" opacity="0.45" />
        <path d="M-4 232c46-14 104-14 150-4 22 5 40 4 58-2v58H-4Z" fill="#d9d1f0" />

        {/* Little house, window lit */}
        <circle cx="136" cy="196" r="20" fill="#fcefd2" opacity="0.55" />
        <rect x="118" y="188" width="34" height="26" rx="4" fill="#fffdf9" />
        <path d="M113 191 135 172l22 19" fill="#f7b29b" stroke="#f7b29b" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
        <rect x="129" y="195" width="11" height="11" rx="2.5" fill="#f5cf7e" />
        <path d="M134.5 195v11M129 200.5h11" stroke="#fffdf9" strokeWidth="1.3" />
        <rect x="144" y="176" width="5" height="10" rx="1.5" fill="#f7b29b" />
      </svg>

      <p className="absolute inset-x-0 bottom-[6%] px-[8%] text-center font-display text-[length:9.6cqw] leading-[1.08] text-lilac-700 italic [font-variation-settings:'SOFT'_100,'opsz'_72]">
        Nurses on call,
        <br />
        day &amp; night
      </p>
    </div>
  );
}
