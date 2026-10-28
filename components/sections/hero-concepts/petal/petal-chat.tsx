import { Heart } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { PetalNurseAvatar } from "./petal-nurse-avatar";

/** Evergreen-tinted pebble holding a gentle check-in from the nurse. Decorative. */
export function PetalChat({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative rounded-[2.5rem_2.25rem_2.75rem_2rem] bg-care-50 p-4 shadow-float ring-1 ring-care-100 sm:p-5",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <PetalNurseAvatar className="size-10 shrink-0 sm:size-11" />
        <div className="min-w-0">
          <p className="text-[0.875rem] leading-tight font-semibold text-care-950">Nurse Daniela</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-[0.72rem] text-care-700/80">
            <span className="size-1.5 rounded-full bg-care-400" />
            Your care team
          </p>
        </div>
        <span className="ml-auto self-start pt-0.5 text-[0.68rem] font-medium text-stone-500">8:30 am</span>
      </div>

      <div className="mt-3.5 space-y-2">
        <p className="w-fit max-w-[88%] rounded-[1.25rem] rounded-tl-md bg-white px-3.5 py-2.5 text-[0.84rem] leading-snug text-stone-700 shadow-[0_6px_16px_-10px_rgb(19_54_48/0.3)]">
          How are you feeling today, Maria?
        </p>
        <p className="ml-auto flex w-fit max-w-[88%] items-center gap-1.5 rounded-[1.25rem] rounded-br-md bg-blush-200/80 px-3.5 py-2.5 text-[0.84rem] leading-snug font-medium text-care-950">
          Much better, thank you!
          <Heart className="size-3.5 shrink-0 text-blush-500" fill="currentColor" strokeWidth={0} />
        </p>
      </div>
    </div>
  );
}
