import { Heart } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { scallopPath } from "./petal-shapes";

const SCALLOP = scallopPath(100, 100, 80, 14);

/** Scalloped, slightly tilted "First device free" sticker. Decorative. */
export function PetalSticker({ className }: { className?: string }) {
  return (
    <div className={cn("@container aspect-square", className)}>
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 size-full drop-shadow-[0_12px_14px_rgb(19_54_48/0.16)]"
        aria-hidden="true"
        focusable="false"
      >
        <path d={SCALLOP} fill="#fffdf9" />
        <circle
          cx="100"
          cy="100"
          r="70"
          fill="none"
          stroke="#f7b29b"
          strokeWidth="2.2"
          strokeDasharray="0.5 7"
          strokeLinecap="round"
        />
      </svg>
      <div className="relative grid size-full place-content-center text-center">
        <p className="font-humanist text-[length:10.5cqw] leading-none font-semibold text-care-800">First device</p>
        <p className="mt-[2cqw] flex items-center justify-center gap-[2cqw] font-display text-[length:21cqw] leading-none text-blush-500 italic [font-variation-settings:'SOFT'_100,'opsz'_72]">
          free
          <Heart className="size-[12cqw] text-blush-400" fill="currentColor" strokeWidth={0} />
        </p>
      </div>
    </div>
  );
}
