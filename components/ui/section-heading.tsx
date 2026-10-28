import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/ui/eyebrow";

type SectionHeadingProps = {
  /** id placed on the heading; pass the same value to <Section labelledBy>. */
  id: string;
  eyebrow?: string;
  titleLead: ReactNode;
  /** Rendered in the serif italic accent face after titleLead. */
  titleAccent?: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  /** Heading level; sections use h2. */
  as?: "h1" | "h2";
  className?: string;
  children?: ReactNode;
};

export function SectionHeading({
  id,
  eyebrow,
  titleLead,
  titleAccent,
  description,
  align = "left",
  tone = "light",
  as: Heading = "h2",
  className,
  children,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <header
      className={cn(
        "flex max-w-3xl flex-col gap-5",
        centered ? "mx-auto items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <Heading
        id={id}
        className={cn(
          "text-4xl leading-[1.04] font-semibold tracking-[-0.035em] sm:text-5xl lg:text-[3.5rem]",
          tone === "dark" ? "text-white" : "text-ink-950",
        )}
      >
        {/* The separating space lives in the lead's own text node so the
            heading's accessible name reads "Live in five simple steps". */}
        {titleAccent && typeof titleLead === "string" ? `${titleLead} ` : titleLead}
        {titleAccent ? (
          <span
            className={cn(
              "accent-serif",
              tone === "dark" ? "text-gradient-light" : "text-gradient-brand",
            )}
          >
            {titleAccent}
          </span>
        ) : null}
      </Heading>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-lg leading-relaxed",
            tone === "dark" ? "text-ink-200" : "text-ink-500",
          )}
        >
          {description}
        </p>
      ) : null}
      {children}
    </header>
  );
}
