import { cn } from "@/lib/cn";
import { HEART_PATH, SPARKLE_PATH } from "./petal-shapes";

/**
 * Big blush circle: a friendly, flat blood-pressure cuff and home monitor on
 * a morning table, with a little plant and the sun peeking in. Decorative.
 */
export function PetalBpCircle({ className }: { className?: string }) {
  return (
    <div className={cn("relative aspect-square rounded-full shadow-float", className)}>
      <svg viewBox="0 0 320 320" className="absolute inset-0 size-full" aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id="petal-bp-bg" cx="34%" cy="28%" r="78%">
            <stop offset="0" stopColor="#fff7f3" />
            <stop offset="0.55" stopColor="#ffe8df" />
            <stop offset="1" stopColor="#fdd8ca" />
          </radialGradient>
          <linearGradient id="petal-bp-body" x1="0" y1="0" x2="0.35" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#f3ebdf" />
          </linearGradient>
          <linearGradient id="petal-bp-shade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0.55" stopColor="#133630" stopOpacity="0" />
            <stop offset="1" stopColor="#133630" stopOpacity="0.07" />
          </linearGradient>
          <linearGradient id="petal-bp-cuff" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#9ccdbd" />
            <stop offset="1" stopColor="#6fb19e" />
          </linearGradient>
          <radialGradient id="petal-bp-button" cx="40%" cy="35%" r="70%">
            <stop offset="0" stopColor="#fbc2ae" />
            <stop offset="1" stopColor="#ef8e70" />
          </radialGradient>
          <radialGradient id="petal-bp-sun" cx="50%" cy="50%" r="50%">
            <stop offset="0.55" stopColor="#f9e0a8" />
            <stop offset="1" stopColor="#f9e0a8" stopOpacity="0" />
          </radialGradient>
          <clipPath id="petal-bp-clip">
            <circle cx="160" cy="160" r="160" />
          </clipPath>
        </defs>

        <circle cx="160" cy="160" r="160" fill="url(#petal-bp-bg)" />

        <g clipPath="url(#petal-bp-clip)">
          {/* Morning sun peeking from behind the monitor */}
          <circle cx="246" cy="74" r="44" fill="url(#petal-bp-sun)" opacity="0.9" />
          <circle cx="246" cy="74" r="22" fill="#f9e0a8" />

          {/* Soft light from a window, top left */}
          <ellipse cx="96" cy="70" rx="80" ry="46" fill="#ffffff" opacity="0.35" />

          {/* Tabletop */}
          <path d="M-10 246c60-14 128-18 190-14 56 3 104 10 150 22v80H-10Z" fill="#fcd0c0" opacity="0.6" />
          <path d="M-10 262c70-10 150-12 230-6 40 3 74 8 110 14" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2" fill="none" />

          {/* Ground shadows */}
          <ellipse cx="198" cy="242" rx="66" ry="7" fill="#133630" opacity="0.08" />
          <ellipse cx="104" cy="250" rx="62" ry="6" fill="#133630" opacity="0.08" />
          <ellipse cx="280" cy="246" rx="20" ry="4" fill="#133630" opacity="0.08" />

          {/* Little potted plant */}
          <path d="M280 212c-1-22 2-40 8-58" stroke="#2f7f6c" strokeWidth="2.4" strokeLinecap="round" fill="none" />
          <path d="M0 0c6-9 19-10 26 0-7 10-20 9-26 0Z" fill="#7dbba9" transform="translate(280 200) rotate(-150)" />
          <path d="M0 0c6-9 19-10 26 0-7 10-20 9-26 0Z" fill="#4e9c88" transform="translate(282 186) rotate(-30)" />
          <path d="M0 0c6-9 19-10 26 0-7 10-20 9-26 0Z" fill="#7dbba9" transform="translate(285 170) rotate(-135)" />
          <path d="M0 0c5-7 15-8 21 0-6 8-16 7-21 0Z" fill="#4e9c88" transform="translate(288 156) rotate(-62)" />
          <path d="M266 216h30l-4 26c-1 4-4 6-8 6h-6c-4 0-7-2-8-6Z" fill="#f7b29b" />
          <rect x="263" y="210" width="36" height="9" rx="4.5" fill="#ef8e70" />

          {/* Monitor body */}
          <rect x="142" y="78" width="112" height="162" rx="30" fill="url(#petal-bp-body)" />
          <rect x="142" y="78" width="112" height="162" rx="30" fill="url(#petal-bp-shade)" />
          <rect x="144" y="80" width="108" height="158" rx="28" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.9" />

          {/* Screen */}
          <rect x="156" y="94" width="84" height="70" rx="18" fill="#eef6f3" stroke="#d5eae3" strokeWidth="1.5" />
          <text
            x="198"
            y="131"
            textAnchor="middle"
            fontSize="25"
            fontWeight="500"
            letterSpacing="-0.5"
            fill="#17423a"
            className="font-display"
          >
            124/79
          </text>
          <text
            x="198"
            y="148"
            textAnchor="middle"
            fontSize="8.5"
            fontWeight="700"
            letterSpacing="1.2"
            fill="#4e9c88"
            className="font-humanist"
          >
            mmHg
          </text>

          {/* "Normal" chip */}
          <rect x="173" y="172" width="50" height="16" rx="8" fill="#d5eae3" />
          <circle cx="182" cy="180" r="2.4" fill="#2f7f6c" />
          <text x="202" y="183.2" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#1b5146" className="font-humanist">
            Normal
          </text>

          {/* Start button with a tiny heart */}
          <circle cx="198" cy="212" r="18" fill="#f4ede2" />
          <circle cx="198" cy="212" r="14" fill="url(#petal-bp-button)" />
          <path d={HEART_PATH} fill="#ffffff" transform="translate(191.5 205.8) scale(0.54)" />
          <circle cx="166" cy="212" r="4.5" fill="#e9dfcf" />
          <circle cx="230" cy="212" r="4.5" fill="#e9dfcf" />

          {/* Tube: a soft curl from cuff to monitor */}
          <path
            d="M98 196c0-16 8-28 20-28 12 0 16 10 16 18 0 7 3 11 8 12"
            stroke="#4e9c88"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Cuff, lying in front */}
          <g transform="rotate(-7 102 224)">
            <rect x="44" y="198" width="118" height="52" rx="22" fill="url(#petal-bp-cuff)" />
            <rect
              x="52"
              y="205"
              width="102"
              height="38"
              rx="15"
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.7"
              strokeWidth="1.6"
              strokeDasharray="3 4.5"
              strokeLinecap="round"
            />
            <rect x="130" y="201" width="26" height="46" rx="12" fill="#f9e0a8" />
            <path d="M137 210v28M143 210v28M149 210v28" stroke="#efb94f" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
            <rect x="92" y="191" width="12" height="11" rx="3.5" fill="#2f7f6c" />
            <rect x="60" y="216" width="30" height="16" rx="8" fill="#ffffff" opacity="0.9" />
            <path d={HEART_PATH} fill="#ef8e70" transform="translate(69.5 218.6) scale(0.46)" />
          </g>

          {/* Floating heart and twinkles */}
          <path d={HEART_PATH} fill="#ef8e70" transform="translate(92 82) scale(1.05)" />
          <path d={HEART_PATH} fill="#f7b29b" transform="translate(70 118) scale(0.6)" />
          <path d={SPARKLE_PATH} fill="#efb94f" transform="translate(124 48) scale(0.62)" />
          <path d={SPARKLE_PATH} fill="#ffffff" transform="translate(56 92) scale(0.5)" />
        </g>

        {/* Soft inner rim */}
        <circle cx="160" cy="160" r="158.5" fill="none" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="3" />
      </svg>
    </div>
  );
}
