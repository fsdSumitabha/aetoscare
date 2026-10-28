import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import type { devices } from "@/lib/content/home";
import { DeviceIllustration } from "./device-illustration";

type DeviceItem = (typeof devices.items)[number];

type DeviceCardProps = {
  item: DeviceItem;
  index: number;
  /** Feature tile: larger illustration, rings and a live-sync chip. */
  featured?: boolean;
};

function PlusTick({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 10 10" className={cn("absolute size-2.5 text-ink-300", className)} aria-hidden="true" focusable="false">
      <path d="M5 0V10M0 5H10" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

/**
 * Bento tile for one cellular device. The whole card is clickable through a
 * stretched link whose text names the device.
 */
export function DeviceCard({ item, index, featured = false }: DeviceCardProps) {
  const titleId = `devices-${item.key}-title`;

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        // Focus is drawn as an outline on the card (survives forced-colors mode, unlike a ring).
        "group/device relative flex h-full flex-col overflow-hidden rounded-4xl bg-white shadow-soft ring-1 ring-ink-100 transition-[translate,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-lift has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-brand-500",
        featured && "md:flex-row xl:flex-col",
      )}
    >
      {/* Illustration stage */}
      <div
        aria-hidden="true"
        className={cn(
          "relative isolate flex items-center justify-center overflow-hidden bg-canvas",
          featured
            ? "px-6 pt-14 pb-8 md:w-1/2 md:shrink-0 xl:w-auto xl:flex-1 xl:px-10"
            : "px-6 pt-10 pb-5",
        )}
      >
        <div className="absolute inset-0 -z-10 bg-dot-grid mask-spotlight" />
        <div className="absolute top-1/2 left-1/2 -z-10 size-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-200/50 opacity-70 blur-3xl transition-opacity duration-500 group-hover/device:opacity-100" />
        {featured ? (
          <>
            <div className="absolute top-1/2 left-1/2 -z-10 aspect-square w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink-200/70" />
            <div className="absolute top-1/2 left-1/2 -z-10 aspect-square w-[64%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-dashed border-brand-300/60" />
            <div className="absolute top-1/2 left-1/2 -z-10 aspect-square w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink-200/60" />
            <div className="glass absolute top-4 right-4 flex items-center gap-2.5 rounded-2xl py-2 pr-3.5 pl-2.5 shadow-soft sm:top-5 sm:right-5">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping-slow rounded-full bg-vital-400" />
                <span className="relative size-2 rounded-full bg-vital-500" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-xs font-semibold text-ink-900">Reading synced</span>
                <span className="font-mono text-[0.65rem] text-ink-500">via 4G LTE · just now</span>
              </span>
            </div>
          </>
        ) : null}
        <PlusTick className="top-4 left-4" />
        {/* The live-sync chip occupies the featured tile's top-right corner. */}
        {featured ? null : <PlusTick className="top-4 right-4" />}
        <PlusTick className="bottom-4 left-4" />
        <PlusTick className="right-4 bottom-4" />
        <span className="absolute top-3.5 left-9 font-mono text-[0.65rem] tracking-[0.16em] text-ink-400">
          {String(index + 1).padStart(2, "0")}
        </span>
        <DeviceIllustration
          device={item.key}
          className={cn(
            "transition-transform duration-500 ease-out group-hover/device:-translate-y-1",
            featured ? "max-w-lg" : "max-w-xs scale-[1.14]",
          )}
        />
      </div>

      {/* Copy */}
      <div className={cn("flex flex-1 flex-col p-6 sm:p-7", featured && "md:justify-center md:p-8 xl:flex-none xl:p-9")}>
        <h3
          id={titleId}
          className={cn(
            "font-semibold tracking-[-0.02em] text-ink-950",
            featured ? "text-2xl sm:text-[1.75rem]" : "text-xl",
          )}
        >
          {item.name}
        </h3>
        {/* Sentence case keeps clinical abbreviations exact (SpO₂, not SPO₂). */}
        <p className="mt-2 flex items-center gap-2 font-mono text-xs font-medium tracking-[0.02em] text-brand-700">
          <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-vital-500" />
          {item.metric}
        </p>
        <p className={cn("mt-3 leading-relaxed text-ink-500", featured ? "text-base sm:text-lg" : "text-[0.95rem]")}>
          {item.description}
        </p>
        <Link
          href={item.href}
          className={cn(
            "mt-auto inline-flex min-h-11 items-center gap-2 self-start pt-4 text-sm font-semibold text-brand-700 after:absolute after:inset-0 after:rounded-4xl focus-visible:outline-none",
            // Side-by-side feature tile (md–lg) centres the whole copy block instead of pinning the link low.
            featured && "md:mt-1 xl:mt-auto",
          )}
        >
          View {item.name}
          <span className="grid size-7 place-items-center rounded-full bg-brand-50 ring-1 ring-brand-100 transition-[translate,background-color] duration-300 group-hover/device:translate-x-1 group-hover/device:bg-brand-100">
            <ArrowRight aria-hidden="true" className="size-3.5" strokeWidth={2.4} />
          </span>
        </Link>
      </div>
    </article>
  );
}
