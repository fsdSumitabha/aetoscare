import { BellRing, CalendarCheck2, PackageCheck, type LucideIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { PhoneScreen } from "./engagement-phone-screen";

/**
 * Decorative phone mock-up: a patient's SMS thread with the AETOS care team,
 * orbited by status chips. Purely illustrative, so the whole figure is hidden
 * from assistive technology; the section copy carries the meaning.
 */
export function EngagementPhone() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto w-full max-w-[24rem] py-8 select-none sm:max-w-[28rem] lg:max-w-[30rem]"
    >
      <PhoneBackdrop />

      <div className="relative mx-auto w-[16.5rem] rounded-[2.75rem] bg-ink-950 p-2 shadow-[0_44px_80px_-32px_rgb(7_22_48/0.55),0_18px_36px_-20px_rgb(7_22_48/0.35)] min-[400px]:w-[17.75rem] sm:w-[18.75rem] xl:w-[19.75rem]">
        {/* Hardware buttons */}
        <span className="absolute top-24 -left-0.75 h-7 w-0.75 rounded-l-sm bg-ink-700" />
        <span className="absolute top-36 -left-0.75 h-12 w-0.75 rounded-l-sm bg-ink-700" />
        <span className="absolute top-32 -right-0.75 h-18 w-0.75 rounded-r-sm bg-ink-700" />
        {/* Bezel highlight */}
        <span className="pointer-events-none absolute inset-0 rounded-[2.75rem] ring-1 ring-white/15 ring-inset" />

        <PhoneScreen />
      </div>

      {/* Chips sit on the bezel and in the thread's quiet gutters (above the status
          bar, between the reading card and RN Daniela's reply, over the composer)
          so they never cover the time, the reading or its sparkline. */}
      <Chip
        icon={BellRing}
        tone="brand"
        title="Reminder sent"
        meta="8:00 AM"
        className="top-0 left-0 animate-float sm:-left-14 lg:-left-6 xl:-left-10"
      />
      <Chip
        icon={PackageCheck}
        tone="vital"
        title="Test strips shipped"
        className="right-0 bottom-45 animate-float-delayed sm:-right-14 sm:bottom-44 lg:-right-4 xl:-right-8 xl:bottom-40"
      />
      <Chip
        icon={CalendarCheck2}
        tone="brand"
        title="Appointment booked"
        meta="Thu 10:30"
        className="bottom-12 left-0 animate-[float_8s_ease-in-out_-2s_infinite] sm:-left-14 lg:-left-4 xl:-left-12"
      />
    </div>
  );
}

type ChipProps = {
  icon: LucideIcon;
  tone: "brand" | "vital";
  title: string;
  meta?: string;
  className?: string;
};

function Chip({ icon: Icon, tone, title, meta, className }: ChipProps) {
  return (
    <span
      className={cn(
        "glass absolute z-10 flex items-center gap-2 rounded-2xl py-1.5 pr-3 pl-1.5 whitespace-nowrap shadow-lift sm:gap-2.5 sm:py-2 sm:pr-3.5 sm:pl-2",
        className,
      )}
    >
      <span
        className={cn(
          "grid size-7 shrink-0 place-items-center rounded-xl sm:size-8",
          tone === "brand" ? "bg-brand-600 text-white" : "bg-vital-300 text-ink-950",
        )}
      >
        <Icon className="size-3.5 sm:size-4" strokeWidth={2.25} />
      </span>
      <span className="text-[0.72rem] font-semibold tracking-[-0.01em] text-ink-900 sm:text-[0.8rem]">
        {title}
        {meta ? (
          <span className="font-mono text-[0.66rem] font-medium text-ink-500 sm:text-[0.72rem]">
            {" "}
            · {meta}
          </span>
        ) : null}
      </span>
    </span>
  );
}

const ringTicks = [
  [131, -131],
  [-131, -131],
  [131, 131],
  [-131, 131],
] as const;

function PhoneBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute top-1/2 left-1/2 size-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-300/30 blur-3xl sm:size-[26rem]" />
      <div className="absolute right-[6%] bottom-[10%] size-40 rounded-full bg-vital-300/35 blur-3xl sm:size-56" />

      <svg
        viewBox="-300 -300 600 600"
        fill="none"
        focusable="false"
        className="absolute top-1/2 left-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 text-ink-900 [mask-image:radial-gradient(circle,black_35%,transparent_70%)] sm:size-[42rem]"
      >
        <g stroke="currentColor">
          <circle r="130" strokeOpacity="0.1" />
          <circle r="185" strokeOpacity="0.09" />
          <circle r="240" strokeOpacity="0.07" />
          <circle r="292" strokeOpacity="0.05" />
          <path
            d="M-300 0H-150M150 0H300M0 -300V-150M0 150V300"
            strokeOpacity="0.14"
            strokeDasharray="2 6"
          />
        </g>
        <g stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.25" strokeLinecap="round">
          {ringTicks.map(([x, y]) => (
            <path key={`${x}:${y}`} d={`M${x} ${y - 6}v12M${x - 6} ${y}h12`} />
          ))}
        </g>
        <circle cx="-170" cy="-170" r="3.5" className="fill-brand-500" />
        <circle cx="225" cy="82" r="3.5" className="fill-vital-400" />
      </svg>

      <svg
        viewBox="-100 -100 200 200"
        fill="none"
        focusable="false"
        className="absolute top-1/2 left-1/2 size-[22rem] -translate-x-1/2 -translate-y-1/2 animate-spin-slow text-brand-500 sm:size-[26rem]"
      >
        <circle r="98" stroke="currentColor" strokeOpacity="0.35" strokeDasharray="0.75 4.5" strokeLinecap="round" />
        <circle cy="-98" r="2" className="fill-vital-400" />
      </svg>
    </div>
  );
}
