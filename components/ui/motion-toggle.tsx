import { Pause, Play } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

/**
 * Page-wide pause for decorative animation loops (WCAG 2.2.2), with no JS:
 * globals.css pauses every `animate-*` element while #motion-pause is checked.
 * Render it once per page. Hidden for reduced-motion users, where nothing loops.
 */
export function MotionToggle({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <div className={cn("group/motion relative inline-flex motion-reduce:hidden", className)}>
      <input id="motion-pause" type="checkbox" className="peer sr-only" />
      <label
        htmlFor="motion-pause"
        className={cn(
          "inline-flex h-11 cursor-pointer items-center gap-2 rounded-full px-3.5 text-xs font-medium transition-colors duration-200 select-none peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2",
          tone === "dark"
            ? "font-mono tracking-[0.14em] text-ink-300 uppercase ring-1 ring-white/10 peer-focus-visible:outline-brand-400 hover:bg-white/5 hover:text-white"
            : "font-humanist text-care-800/80 ring-1 ring-care-900/10 peer-focus-visible:outline-care-600 hover:bg-care-900/5 hover:text-care-950",
        )}
      >
        <Pause aria-hidden="true" className="size-3.5 group-has-checked/motion:hidden" strokeWidth={2.25} />
        <Play aria-hidden="true" className="hidden size-3.5 group-has-checked/motion:block" strokeWidth={2.25} />
        Pause animations
      </label>
    </div>
  );
}
