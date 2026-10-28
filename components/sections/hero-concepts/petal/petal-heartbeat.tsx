import { Heart } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

/** A calm sinus rhythm: soft baseline, gentle P and T waves, rounded spike. */
const ECG_PATH =
  "M0 30h40c5 0 7-7 11-7s6 7 11 7h8l7-22 9 36 7-21 5 7h16c6 0 8-9 14-9s8 9 14 9h58";

/** Honey pill with a heartbeat line drawn in blush. Decorative. */
export function PetalHeartbeat({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex items-center gap-3 rounded-full bg-honey-100 py-2.5 pr-5 pl-2.5 shadow-petal ring-1 ring-honey-200 sm:gap-4 sm:pr-6",
        className,
      )}
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white shadow-[0_4px_12px_-6px_rgb(201_85_58/0.45)] sm:size-12">
        <Heart className="size-5 text-blush-500" fill="currentColor" strokeWidth={0} />
      </span>

      <svg viewBox="0 0 200 52" className="h-auto min-w-0 flex-1 overflow-visible" aria-hidden="true" focusable="false">
        <path d={ECG_PATH} fill="none" stroke="#f7b29b" strokeOpacity="0.45" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d={ECG_PATH}
          pathLength={1}
          strokeDasharray="1"
          fill="none"
          stroke="#e26e4f"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-[ecg-draw_7s_cubic-bezier(0.65,0,0.35,1)_infinite]"
        />
      </svg>

      <div className="shrink-0 text-right">
        <p className="text-[0.62rem] font-semibold tracking-[0.04em] text-[#8a6212]">Heart rate</p>
        <p className="font-display leading-none text-care-950 [font-variation-settings:'SOFT'_100,'opsz'_72]">
          <span className="text-[1.75rem] sm:text-[2rem]">72</span>
          <span className="ml-1 font-humanist text-xs font-semibold text-stone-500">bpm</span>
        </p>
      </div>
    </div>
  );
}
