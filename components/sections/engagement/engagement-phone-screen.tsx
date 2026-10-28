import type { ReactNode } from "react";
import {
  ArrowUp,
  BatteryFull,
  CheckCheck,
  ChevronLeft,
  HeartPulse,
  Phone,
  SignalHigh,
} from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { LogoMark } from "@/components/ui/logo";
import { siteConfig } from "@/lib/site";

/** Screen contents of the engagement phone: the patient's SMS thread with the care team. */
export function PhoneScreen() {
  return (
    <div className="relative overflow-hidden rounded-[2.25rem] bg-white">
      <StatusBar />
      <ThreadHeader />

      <div className="flex flex-col gap-2 bg-linear-to-b from-canvas to-white px-3 pt-3 pb-4">
        <span className="self-center rounded-full bg-white px-2.5 py-0.5 font-mono text-[0.56rem] tracking-[0.14em] text-ink-500 uppercase ring-1 ring-ink-100">
          Today · 8:00 AM
        </span>

        <Bubble from="team" className="max-w-[86%]">
          Good morning, Maria! Time for today’s blood pressure reading.
        </Bubble>

        <Bubble from="patient">Done, thank you!</Bubble>
        <span className="-mt-1 flex items-center gap-1 self-end pr-1 text-[0.56rem] font-medium text-ink-500">
          <CheckCheck className="size-3 text-brand-500" strokeWidth={2.5} />
          Read 8:06
        </span>

        <ReadingCard />

        <div className="flex max-w-[90%] flex-col items-start gap-1 self-start">
          <span className="flex items-center gap-1.5 pl-1 text-[0.6rem] font-semibold text-ink-600">
            <span className="grid size-4 place-items-center rounded-full bg-brand-100 text-[0.5rem] font-bold text-brand-700">
              D
            </span>
            RN Daniela
          </span>
          <Bubble from="team">
            Great job. Your test strips ship today, and I booked your follow-up for Thu 10:30.
          </Bubble>
        </div>
      </div>

      <Composer />
    </div>
  );
}

function StatusBar() {
  return (
    <div className="relative flex h-11 items-center justify-between px-6 text-ink-950">
      <span className="text-[0.7rem] font-semibold tabular-nums">8:14</span>
      <span className="absolute top-2.5 left-1/2 h-6 w-22 -translate-x-1/2 rounded-full bg-ink-950" />
      <span className="flex items-center gap-1">
        <SignalHigh className="size-3.5" strokeWidth={2.5} />
        <BatteryFull className="size-4" strokeWidth={2} />
      </span>
    </div>
  );
}

function ThreadHeader() {
  return (
    <div className="flex items-center gap-2.5 border-b border-line px-3.5 pt-1 pb-3">
      <ChevronLeft className="size-4 shrink-0 text-brand-600" strokeWidth={2.25} />
      <span className="relative grid size-9 shrink-0 place-items-center rounded-full bg-ink-950">
        <LogoMark className="size-5 text-white" eyeClassName="fill-vital-300" />
        <span className="absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full bg-vital-400 ring-2 ring-white" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col leading-tight">
        <span className="truncate text-[0.78rem] font-semibold text-ink-950">
          {siteConfig.name} Care Team
        </span>
        <span className="truncate text-[0.6rem] font-medium text-vital-700">
          Clinical team · 24/7
        </span>
      </span>
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
        <Phone className="size-3.5" strokeWidth={2.25} />
      </span>
    </div>
  );
}

type BubbleProps = {
  from: "team" | "patient";
  className?: string;
  children: ReactNode;
};

function Bubble({ from, className, children }: BubbleProps) {
  return (
    <p
      className={cn(
        "rounded-[1.1rem] px-3 py-2 text-[0.74rem] leading-snug",
        from === "team"
          ? "self-start rounded-bl-md bg-white text-ink-800 shadow-soft ring-1 ring-ink-100"
          : "self-end rounded-br-md bg-brand-600 text-white shadow-[0_10px_20px_-12px_rgb(22_96_240/0.8)]",
        className,
      )}
    >
      {children}
    </p>
  );
}

function ReadingCard() {
  return (
    <div className="w-[84%] self-end rounded-2xl bg-white p-3 shadow-soft ring-1 ring-ink-100">
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 font-mono text-[0.54rem] font-medium tracking-[0.14em] text-ink-500 uppercase">
          <HeartPulse className="size-3 text-brand-600" strokeWidth={2.25} />
          BP · via 4G
        </span>
        <span className="font-mono text-[0.54rem] text-ink-500 tabular-nums">8:05 AM</span>
      </div>

      <div className="mt-2 flex items-end justify-between gap-2">
        <span className="flex items-baseline gap-1">
          <span className="font-mono text-[1.55rem] leading-none font-semibold tracking-[-0.04em] text-ink-950 tabular-nums">
            124/79
          </span>
          <span className="text-[0.6rem] font-medium text-ink-500">mmHg</span>
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-vital-50 px-2 py-0.5 text-[0.6rem] font-semibold text-vital-700 ring-1 ring-vital-200">
          <span className="relative flex size-1.5">
            <span className="absolute inset-0 animate-ping-slow rounded-full bg-vital-400" />
            <span className="relative size-1.5 rounded-full bg-vital-500" />
          </span>
          Normal
        </span>
      </div>

      <svg
        viewBox="0 0 200 36"
        fill="none"
        focusable="false"
        className="mt-2.5 aspect-[200/36] w-full"
      >
        <defs>
          <linearGradient id="engagement-spark-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" className="text-vital-400" stopColor="currentColor" stopOpacity="0.28" />
            <stop offset="100%" className="text-vital-400" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M2 9 C 20 9, 26 15, 34 14 S 54 10, 66 12 S 88 19, 100 18 S 120 20, 133 21 S 156 25, 166 24 S 186 22, 194 22 V36 H2 Z"
          fill="url(#engagement-spark-fill)"
        />
        <path
          d="M2 9 C 20 9, 26 15, 34 14 S 54 10, 66 12 S 88 19, 100 18 S 120 20, 133 21 S 156 25, 166 24 S 186 22, 194 22"
          className="stroke-vital-500"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <circle cx="194" cy="22" r="3.5" strokeWidth="1.5" className="fill-vital-500 stroke-white" />
      </svg>
    </div>
  );
}

function Composer() {
  return (
    <div className="border-t border-line bg-white px-3 pt-2.5 pb-2">
      <div className="flex items-center gap-2">
        <span className="flex h-8 flex-1 items-center rounded-full bg-ink-50 px-3 text-[0.68rem] text-ink-400 ring-1 ring-ink-100">
          Text message
        </span>
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-600 text-white">
          <ArrowUp className="size-3.5" strokeWidth={2.5} />
        </span>
      </div>
      <span className="mx-auto mt-2.5 block h-1 w-24 rounded-full bg-ink-950/85" />
    </div>
  );
}
