import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import type { PinPlacement } from "./day-line-geometry";
import { milestones } from "./milestones";

/** Card offset from its pin on large screens. */
const cardPlacement: Record<PinPlacement, string> = {
  left: "lg:right-7 lg:top-0 lg:-translate-y-1/2",
  above: "lg:bottom-7 lg:left-0 lg:-translate-x-1/2",
  below: "lg:top-7 lg:left-0 lg:-translate-x-1/2",
};

/** Hairline leader from pin to card on large screens. */
const stemPlacement: Record<PinPlacement, string> = {
  left: "lg:right-2 lg:top-0 lg:h-px lg:w-5",
  above: "lg:bottom-2 lg:left-0 lg:h-5 lg:w-px",
  below: "lg:top-2 lg:left-0 lg:h-5 lg:w-px",
};

/**
 * One ordered list, two layouts: a vertical timeline on small screens, and
 * cards pinned along the flowing line on large screens.
 */
export function MilestoneList() {
  return (
    <ol
      className={cn(
        "relative space-y-3 sm:grid sm:grid-cols-2 sm:gap-3 sm:space-y-0",
        "before:absolute before:top-5 before:bottom-5 before:left-3 before:w-px before:bg-care-600/20 sm:before:hidden",
        "lg:absolute lg:inset-0 lg:block",
      )}
    >
      {milestones.map(({ time, dateTime, label, Icon, tint, pin }, index) => (
        <li
          key={label}
          style={{ "--pin-x": pin.x, "--pin-y": pin.y } as CSSProperties}
          className="relative flex items-center gap-4 lg:absolute lg:top-(--pin-y) lg:left-(--pin-x) lg:block lg:size-0"
        >
          {/* Pin */}
          <span
            aria-hidden="true"
            className="relative z-10 grid size-6 shrink-0 place-items-center sm:hidden lg:absolute lg:top-0 lg:left-0 lg:grid lg:size-6 lg:-translate-1/2"
          >
            {index === 0 ? (
              <span className="absolute inset-1 rounded-full bg-blush-300/60 animate-ping-slow motion-reduce:hidden" />
            ) : null}
            <span
              className={cn(
                "relative size-3 rounded-full bg-white ring-2 shadow-[0_0_0_5px_rgb(255_255_255/0.7)]",
                index === 0 ? "ring-blush-500" : "ring-care-600",
              )}
            />
          </span>

          {/* Leader */}
          <span
            aria-hidden="true"
            className={cn("hidden bg-care-900/20 lg:absolute lg:block", stemPlacement[pin.placement])}
          />

          {/* Card */}
          <div
            className={cn(
              "flex min-w-0 flex-1 items-center gap-3 rounded-2xl bg-white/90 py-2.5 pr-5 pl-2.5 shadow-petal ring-1 ring-care-900/5 backdrop-blur-[2px]",
              "lg:absolute lg:w-max lg:flex-none lg:bg-white/95",
              cardPlacement[pin.placement],
            )}
          >
            <span className={cn("grid size-9 shrink-0 place-items-center rounded-xl ring-1", tint)}>
              <Icon className="size-[1.05rem]" strokeWidth={1.9} />
            </span>
            <span className="flex flex-col">
              <time
                dateTime={dateTime}
                className="font-display text-[0.82rem] leading-tight text-care-700 italic [font-variation-settings:'SOFT'_100,'opsz'_14]"
              >
                {time}
              </time>
              <span className="font-humanist text-[0.92rem] leading-snug font-semibold tracking-[-0.005em] text-care-950">
                {label}
              </span>
            </span>
          </div>
        </li>
      ))}
    </ol>
  );
}
