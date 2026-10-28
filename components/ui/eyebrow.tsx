import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { LogoMark } from "@/components/ui/logo";

type EyebrowProps = {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
};

/** Small uppercase kicker above section headings, marked with the AETOS eye. */
export function Eyebrow({ children, tone = "light", className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-full py-1 pr-3.5 pl-1.5 font-mono text-[0.7rem] font-medium tracking-[0.16em] uppercase",
        tone === "dark"
          ? "bg-white/5 text-brand-200 ring-1 ring-white/10"
          : "bg-brand-50 text-brand-700 ring-1 ring-brand-100",
        className,
      )}
    >
      <LogoMark
        className={cn("size-4", tone === "dark" ? "text-white/80" : "text-ink-900")}
        eyeClassName={tone === "dark" ? "fill-vital-300" : "fill-brand-500"}
      />
      {children}
    </p>
  );
}
