import { PetalBpCircle } from "./petal-bp-circle";
import { PetalChat } from "./petal-chat";
import { PetalHeartbeat } from "./petal-heartbeat";
import { PetalNightArch } from "./petal-night-arch";
import { BLOB_PATH, HEART_PATH, SPARKLE_PATH } from "./petal-shapes";
import { PetalSticker } from "./petal-sticker";

/**
 * Playful mosaic of soft "petals". On large screens the pieces are pinned
 * on a 600×580 canvas (percentages below map to that canvas); on phones they
 * fall into a compact two-column mosaic. Purely decorative.
 */
export function PetalCollage() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[27rem] pt-6 sm:max-w-[34rem] lg:max-w-none lg:pt-0">
      <div className="relative grid grid-cols-2 items-center gap-3 sm:gap-4 lg:block lg:aspect-[600/580]">
        {/* Canvas layer: organic blob, dotted "care thread", twinkles (large screens) */}
        <svg
          viewBox="0 0 600 580"
          className="pointer-events-none absolute inset-0 hidden size-full overflow-visible lg:block"
          focusable="false"
        >
          <path d={BLOB_PATH} fill="#d5eae3" opacity="0.55" transform="translate(-26 318) scale(1.32 0.9)" />
          <path
            d="M18 306c-14 70 36 116 104 112 66-4 98 30 92 82-4 40 34 66 96 64 74-2 150-8 196-34 26-15 40-32 46-52"
            fill="none"
            stroke="#7dbba9"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeDasharray="0 11"
          />
          <path d={HEART_PATH} fill="#f7b29b" transform="translate(240 384) scale(0.8)" />
          <path d={SPARKLE_PATH} fill="#f5cf7e" transform="translate(240 8) scale(0.8)" />
          <path d={SPARKLE_PATH} fill="#bcafe3" transform="translate(28 388) scale(0.9)" />
          <path d={SPARKLE_PATH} fill="#f7b29b" transform="translate(372 302) scale(0.55)" />
          <path d={SPARKLE_PATH} fill="#bcafe3" transform="translate(566 556) scale(0.7)" />
          <circle cx="200" cy="452" r="3" fill="#f5cf7e" />
          <circle cx="590" cy="320" r="2.5" fill="#bcafe3" />
        </svg>

        <PetalBpCircle className="w-full lg:absolute lg:top-[2%] lg:left-0 lg:w-[58%]" />

        <PetalNightArch className="w-full rotate-[2deg] animate-[float_12s_ease-in-out_-2s_infinite] lg:absolute lg:top-0 lg:right-[1%] lg:w-[35%] lg:rotate-[3deg]" />

        <PetalChat className="col-span-2 rotate-[1deg] lg:absolute lg:top-[52%] lg:right-0 lg:w-[61%] lg:rotate-[2deg]" />

        <PetalHeartbeat className="col-span-2 rotate-[-1.5deg] animate-[float_14s_ease-in-out_-6s_infinite] lg:absolute lg:top-[83%] lg:left-[1%] lg:w-[57%] lg:rotate-[-3deg]" />

        <PetalSticker className="absolute top-0 left-1/2 w-24 -translate-x-1/2 -translate-y-1/2 rotate-[-8deg] animate-[float_10s_ease-in-out_-3s_infinite] sm:w-28 lg:top-[-3%] lg:left-[45%] lg:w-[20%] lg:translate-x-0 lg:translate-y-0" />
      </div>
    </div>
  );
}
