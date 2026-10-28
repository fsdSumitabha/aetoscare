/**
 * The scene inside the arched "care window": a sky that turns from dawn (left)
 * to night (right), a rising sun, a crescent moon, and a heartbeat line that
 * forms the horizon over soft hills, with a little house whose window is lit.
 * Drawn in a 400×500 box; decorative only (the parent figure is aria-hidden).
 */

// Shared hill ridge so the heartbeat trace sits exactly on the horizon.
const RIDGE_START = "M-4 354 C30 348 60 336 100 332 C128 329 146 338 160 338";
const RIDGE_END = "C262 338 276 352 300 352 C326 352 338 334 362 334 C380 334 392 340 404 343";
const BACK_HILL = `${RIDGE_START} L244 338 ${RIDGE_END} L404 504 L-4 504 Z`;
const HEARTBEAT = `${RIDGE_START} C164 338 166 331 170 331 C174 331 176 338 180 338 L185 338 L188.5 345 L195 250 L201.5 355 L206 338 L214 338 C220 338 222 327 229 327 C236 327 238 338 244 338 ${RIDGE_END}`;

const MID_RIDGE = "M-4 398 C46 384 104 378 150 386 C190 393 214 378 248 377 C280 376 304 377 326 379 C354 382 380 371 404 366";
const FRONT_RIDGE = "M-4 436 C64 414 140 416 206 432 C262 446 320 426 404 414";

const HEART =
  "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z";

const CLOUD = "M0 14 C0 7 7 3 14 5 C17 -3 30 -5 36 2 C42 -3 55 -1 56 8 C63 8 67 13 65 18 L0 18 Z";

function sparkle(x: number, y: number, s: number) {
  return `M${x} ${y - s} Q${x} ${y} ${x + s} ${y} Q${x} ${y} ${x} ${y + s} Q${x} ${y} ${x - s} ${y} Q${x} ${y} ${x} ${y - s} Z`;
}

const STARS: { x: number; y: number; r: number; twinkle?: string }[] = [
  { x: 238, y: 72, r: 1.2 },
  { x: 270, y: 40, r: 1, twinkle: "animate-[pulse_5s_ease-in-out_infinite]" },
  { x: 262, y: 152, r: 1 },
  { x: 352, y: 162, r: 1.3, twinkle: "animate-[pulse_6s_ease-in-out_-2s_infinite]" },
  { x: 322, y: 198, r: 0.9 },
  { x: 366, y: 124, r: 1.1 },
  { x: 384, y: 220, r: 0.9 },
  { x: 214, y: 34, r: 0.8 },
];

const SPARKLES: { x: number; y: number; s: number; twinkle?: string }[] = [
  { x: 338, y: 74, s: 5.5, twinkle: "animate-[pulse_7s_ease-in-out_-1s_infinite]" },
  { x: 234, y: 116, s: 3.5 },
  { x: 372, y: 182, s: 3 },
];

const FLOWERS: { x: number; y: number; petal: string }[] = [
  { x: 40, y: 452, petal: "#fcd0c0" },
  { x: 58, y: 466, petal: "#fffdf9" },
  { x: 24, y: 474, petal: "#fffdf9" },
  { x: 88, y: 478, petal: "#fcd0c0" },
  { x: 334, y: 448, petal: "#fffdf9" },
  { x: 356, y: 462, petal: "#fcd0c0" },
  { x: 378, y: 446, petal: "#fffdf9" },
];

function Flower({ x, y, petal }: { x: number; y: number; petal: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {[0, 72, 144, 216, 288].map((angle) => (
        <circle
          key={angle}
          cx={Math.cos((angle * Math.PI) / 180) * 2.3}
          cy={Math.sin((angle * Math.PI) / 180) * 2.3}
          r={1.7}
          fill={petal}
        />
      ))}
      <circle r={1.2} fill="#efb94f" />
    </g>
  );
}

export function DawnScene() {
  return (
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 size-full"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="dawn-sky" gradientUnits="userSpaceOnUse" x1="20" y1="300" x2="400" y2="150">
          <stop offset="0" stopColor="#fdf1d6" />
          <stop offset="0.14" stopColor="#fde6cc" />
          <stop offset="0.28" stopColor="#fcd3c2" />
          <stop offset="0.44" stopColor="#f2c6cf" />
          <stop offset="0.58" stopColor="#d6c2e6" />
          <stop offset="0.7" stopColor="#bcafe3" />
          <stop offset="0.85" stopColor="#8e7ecb" />
          <stop offset="1" stopColor="#4f3f8f" />
        </linearGradient>
        <radialGradient id="dawn-sun-glow" gradientUnits="userSpaceOnUse" cx="100" cy="334" r="160">
          <stop offset="0" stopColor="#fff7df" stopOpacity="0.95" />
          <stop offset="0.35" stopColor="#fcefd2" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fcefd2" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="dawn-sun" cx="0.42" cy="0.36" r="0.7">
          <stop offset="0" stopColor="#fffaea" />
          <stop offset="0.55" stopColor="#f9e0a8" />
          <stop offset="1" stopColor="#f5cf7e" />
        </radialGradient>
        <radialGradient id="dawn-moon-glow" gradientUnits="userSpaceOnUse" cx="298" cy="112" r="62">
          <stop offset="0" stopColor="#fffdf9" stopOpacity="0.45" />
          <stop offset="1" stopColor="#fffdf9" stopOpacity="0" />
        </radialGradient>
        <mask id="dawn-moon-mask" maskUnits="userSpaceOnUse" x="270" y="84" width="56" height="56">
          <circle cx="298" cy="112" r="19" fill="#fff" />
          <circle cx="308" cy="104" r="16.5" fill="#000" />
        </mask>
        <linearGradient id="dawn-hill-back" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="400" y2="0">
          <stop offset="0" stopColor="#c6e2cf" />
          <stop offset="0.5" stopColor="#a9d2c3" />
          <stop offset="1" stopColor="#8aa9b2" />
        </linearGradient>
        <linearGradient id="dawn-hill-mid" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="400" y2="0">
          <stop offset="0" stopColor="#9fcfb8" />
          <stop offset="0.5" stopColor="#77b5a3" />
          <stop offset="1" stopColor="#557f8a" />
        </linearGradient>
        <linearGradient id="dawn-hill-front" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="400" y2="0">
          <stop offset="0" stopColor="#6aaa94" />
          <stop offset="0.5" stopColor="#4a9482" />
          <stop offset="1" stopColor="#2e5f60" />
        </linearGradient>
        <linearGradient id="dawn-hill-depth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b211d" stopOpacity="0" />
          <stop offset="1" stopColor="#0b211d" stopOpacity="0.14" />
        </linearGradient>
        <radialGradient id="dawn-mist">
          <stop offset="0" stopColor="#fffdf9" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fffdf9" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="dawn-window-glow">
          <stop offset="0" stopColor="#fcefd2" stopOpacity="0.95" />
          <stop offset="0.45" stopColor="#f9e0a8" stopOpacity="0.45" />
          <stop offset="1" stopColor="#f9e0a8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="dawn-path" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbf7f0" stopOpacity="0.45" />
          <stop offset="1" stopColor="#fffdf9" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Sky: dawn on the left, night on the right */}
      <rect width="400" height="500" fill="url(#dawn-sky)" />
      <circle cx="100" cy="334" r="160" fill="url(#dawn-sun-glow)" />

      {/* Night: moon and stars */}
      <circle cx="298" cy="112" r="62" fill="url(#dawn-moon-glow)" />
      <rect x="270" y="84" width="56" height="56" fill="#fffdf9" mask="url(#dawn-moon-mask)" />
      <g fill="#fffdf9">
        {STARS.map((star) => (
          <circle
            key={`${star.x}-${star.y}`}
            cx={star.x}
            cy={star.y}
            r={star.r}
            opacity={0.9}
            className={star.twinkle}
          />
        ))}
        {SPARKLES.map((spark) => (
          <path
            key={`${spark.x}-${spark.y}`}
            d={sparkle(spark.x, spark.y, spark.s)}
            opacity={0.95}
            className={spark.twinkle}
          />
        ))}
      </g>

      {/* Dawn: clouds and birds */}
      <path d={CLOUD} transform="translate(34 220)" fill="#fffdf9" opacity="0.75" />
      <path d={CLOUD} transform="translate(124 178) scale(0.62)" fill="#fffdf9" opacity="0.6" />
      <g fill="none" stroke="#7a5d55" strokeOpacity="0.45" strokeWidth="1.3" strokeLinecap="round">
        <path d="M148 250 q4 -4.5 8 0 q4 -4.5 8 0" />
        <path d="M168 240 q3 -3.4 6 0 q3 -3.4 6 0" />
      </g>

      {/* Rising sun */}
      <circle cx="100" cy="334" r="48" fill="#fff6dc" opacity="0.45" />
      <circle cx="100" cy="334" r="35" fill="url(#dawn-sun)" />

      {/* Far hill, whose ridge is the heartbeat */}
      <path d={BACK_HILL} fill="url(#dawn-hill-back)" />
      <path d={HEARTBEAT} fill="none" stroke="#133630" strokeOpacity="0.14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" transform="translate(0.6 2)" />
      <path d={HEARTBEAT} fill="none" stroke="#fffdf9" strokeOpacity="0.7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d={HEARTBEAT}
        pathLength={1}
        strokeDasharray="1"
        fill="none"
        stroke="#fffdf9"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-[ecg-draw_9s_ease-in-out_infinite]"
      />

      {/* Mist between the hills */}
      <ellipse cx="200" cy="384" rx="240" ry="24" fill="url(#dawn-mist)" />

      {/* Middle hill with the house */}
      <path d={`${MID_RIDGE} L404 504 L-4 504 Z`} fill="url(#dawn-hill-mid)" />
      <path d={MID_RIDGE} fill="none" stroke="#fffdf9" strokeOpacity="0.28" strokeWidth="1.2" />

      {/* Window light spilling into the evening */}
      <circle cx="281" cy="364" r="34" fill="url(#dawn-window-glow)" />

      {/* Little trees */}
      <rect x="235" y="364" width="2.4" height="14" rx="1.2" fill="#2a5b52" />
      <ellipse cx="236.2" cy="362" rx="7" ry="9.5" fill="#3f8a76" />
      <ellipse cx="234" cy="359" rx="3" ry="4.2" fill="#7dbba9" opacity="0.55" />
      <rect x="314.8" y="358" width="2.6" height="21" rx="1.3" fill="#24504a" />
      <ellipse cx="316" cy="352" rx="11" ry="14.5" fill="#2f7466" />
      <ellipse cx="312.5" cy="347" rx="4.6" ry="6.4" fill="#5c9d8b" opacity="0.6" />

      {/* House */}
      <rect x="282" y="331" width="7" height="15" rx="1.2" fill="#c9553a" />
      <rect x="252" y="350" width="40" height="30" rx="2.5" fill="#fffdf9" />
      <rect x="284" y="350" width="8" height="30" rx="2" fill="#efe4d8" />
      <path d="M246 352.5 L272 330 L298 352.5 Z" fill="#ef8e70" stroke="#ef8e70" strokeWidth="3" strokeLinejoin="round" />
      <path d="M272 330 L298 352.5 L272 352.5 Z" fill="#c9553a" opacity="0.28" />
      <path d="M259 380 V367.5 A5 5 0 0 1 269 367.5 V380 Z" fill="#1b5146" />
      <circle cx="266.6" cy="374" r="0.85" fill="#f5cf7e" />
      <rect x="256" y="379" width="16" height="2.2" rx="1.1" fill="#e9dfcf" />
      <rect x="274" y="359" width="12" height="11" rx="2" fill="#f5cf7e" />
      <rect x="275.5" y="360.5" width="4" height="3.5" rx="0.6" fill="#fcefd2" opacity="0.9" />
      <g stroke="#fffdf9" strokeWidth="1.2">
        <path d="M280 359 V370" />
        <path d="M274 364.5 H286" />
      </g>
      <circle cx="280" cy="364.5" r="12" fill="url(#dawn-window-glow)" opacity="0.6" />

      {/* A heart drifting up from the chimney */}
      <path d="M285.5 330 c-3.5 -4 3 -6.5 -0.5 -11" fill="none" stroke="#fffdf9" strokeOpacity="0.75" strokeWidth="1.3" strokeLinecap="round" />
      <g className="animate-[float_7s_ease-in-out_infinite]">
        <path d={HEART} transform="translate(279.5 303) scale(0.44)" fill="#f7b29b" />
        <path d={HEART} transform="translate(293 293) scale(0.26)" fill="#fcd0c0" opacity="0.8" />
      </g>

      {/* Front hill with a path home */}
      <path d={`${FRONT_RIDGE} L404 504 L-4 504 Z`} fill="url(#dawn-hill-front)" />
      <path d={`${FRONT_RIDGE} L404 504 L-4 504 Z`} fill="url(#dawn-hill-depth)" />
      <path d={FRONT_RIDGE} fill="none" stroke="#fffdf9" strokeOpacity="0.22" strokeWidth="1.2" />
      <path
        d="M262 381 C258 394 246 404 230 414 C206 430 176 446 160 470 C150 486 146 496 144 504 L198 504 C200 490 208 474 224 458 C244 438 262 420 268 400 C270 392 269 386 267 381 Z"
        fill="url(#dawn-path)"
      />
      {FLOWERS.map((flower) => (
        <Flower key={`${flower.x}-${flower.y}`} {...flower} />
      ))}
    </svg>
  );
}
