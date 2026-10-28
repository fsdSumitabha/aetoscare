import { Moon, Sun } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { DayLineArt } from "./day-line-art";
import { MilestoneList } from "./milestone-list";

function TimeOfDay({
  Icon,
  label,
  className,
  iconClassName,
}: {
  Icon: typeof Sun;
  label: string;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <p
      className={cn(
        "relative inline-flex items-center gap-2 rounded-full bg-white/70 py-1.5 pr-3.5 pl-1.5 font-humanist text-xs font-medium text-stone-600 ring-1 ring-care-900/5 backdrop-blur-sm",
        className,
      )}
    >
      <span className={cn("grid size-6 place-items-center rounded-full", iconClassName)}>
        <Icon className="size-3.5" strokeWidth={2} />
      </span>
      {label}
    </p>
  );
}

/**
 * Panoramic "A day of care" band: morning light to night, one line that
 * becomes a heartbeat, and the moments a single reading sets in motion.
 */
export function DayOfCareBand() {
  return (
    <figure className="mx-auto mt-12 w-full max-w-7xl sm:mt-14">
      <figcaption className="mb-4 flex items-center gap-4 px-1">
        <span className="font-display text-xl text-care-900 italic [font-variation-settings:'SOFT'_100,'opsz'_36] sm:text-[1.35rem]">
          A day of care
        </span>
        <span aria-hidden="true" className="h-px flex-1 bg-linear-to-r from-care-900/20 via-care-900/12 to-care-900/5" />
        <span className="hidden font-humanist text-sm text-stone-500 sm:block">
          Every reading, watched over day and night.
        </span>
      </figcaption>

      <div
        className={cn(
          "relative isolate overflow-hidden rounded-4xl p-5 shadow-petal ring-1 ring-care-900/6 sm:p-7",
          "bg-[linear-gradient(180deg,var(--color-honey-100),var(--color-cream-50)_32%,var(--color-care-50)_66%,var(--color-lilac-100))]",
          "lg:aspect-[4/1] lg:rounded-5xl lg:bg-[linear-gradient(90deg,var(--color-honey-100),var(--color-cream-50)_34%,var(--color-care-50)_62%,var(--color-lilac-100))] lg:p-0",
        )}
      >
        {/* Morning light, upper left */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -left-32 -z-10 size-[30rem] rounded-full bg-radial from-honey-200/80 via-honey-100/40 to-transparent to-70%"
        />
        {/* Evening hush, lower right */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-36 -bottom-48 -z-10 size-[32rem] rounded-full bg-radial from-lilac-200/70 via-lilac-100/30 to-transparent to-70%"
        />
        {/* Porcelain sheen */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-1/2 bg-linear-to-b from-white/55 to-transparent"
        />

        <TimeOfDay
          Icon={Sun}
          label="Morning"
          iconClassName="bg-honey-200/80 text-[#a46a0e]"
          className="lg:absolute lg:top-6 lg:left-6"
        />

        <DayLineArt className="mt-4 block h-auto w-full lg:absolute lg:inset-0 lg:mt-0 lg:h-full" />

        <div className="mt-5 lg:contents">
          <MilestoneList />
        </div>

        <TimeOfDay
          Icon={Moon}
          label="Through the night"
          iconClassName="bg-lilac-200/80 text-lilac-700"
          className="mt-5 lg:absolute lg:top-6 lg:right-6 lg:mt-0"
        />
      </div>
    </figure>
  );
}
