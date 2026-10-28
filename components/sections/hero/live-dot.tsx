import { cn } from "@/lib/cn";

type LiveDotTone = "vital" | "pulse";
type LiveDotSize = "sm" | "md";

const toneClasses: Record<LiveDotTone, string> = {
  vital: "bg-vital-300",
  pulse: "bg-pulse-400",
};

const sizeClasses: Record<LiveDotSize, string> = {
  sm: "size-1.5",
  md: "size-2",
};

type LiveDotProps = {
  tone?: LiveDotTone;
  size?: LiveDotSize;
  className?: string;
};

/** Pulsing status dot ("live" / "alert"). Purely decorative. */
export function LiveDot({ tone = "vital", size = "sm", className }: LiveDotProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("relative inline-flex shrink-0", sizeClasses[size], className)}
    >
      <span
        className={cn(
          "absolute inset-0 animate-ping-slow rounded-full opacity-75",
          toneClasses[tone],
        )}
      />
      <span className={cn("relative inline-flex size-full rounded-full", toneClasses[tone])} />
    </span>
  );
}
