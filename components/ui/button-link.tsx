import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, ArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { isExternal } from "@/lib/site";

type Variant = "primary" | "vital" | "secondary" | "ghost-dark" | "care" | "cream";
type Size = "md" | "lg";

const variantClasses: Record<Variant, string> = {
  // Brand azure: on light or dark surfaces (white text passes AA on brand-600)
  primary:
    "bg-brand-600 text-white shadow-glow hover:bg-brand-700 focus-visible:outline-brand-600",
  // Mint: high-energy CTA on dark surfaces
  vital:
    "bg-vital-300 text-ink-950 shadow-glow-vital hover:bg-vital-200 focus-visible:outline-vital-300",
  // Quiet CTA on light surfaces
  secondary:
    "bg-white text-ink-900 ring-1 ring-ink-200 shadow-soft hover:ring-ink-300 hover:bg-ink-50",
  // Warm healthcare theme: deep evergreen primary
  care:
    "bg-care-700 text-white shadow-[0_10px_24px_-10px_rgb(27_81_70/0.6)] hover:bg-care-800 focus-visible:outline-care-600",
  // Warm healthcare theme: soft secondary on cream surfaces
  cream:
    "bg-white/80 text-care-950 ring-1 ring-care-900/12 hover:bg-white hover:ring-care-900/20 focus-visible:outline-care-600",
  // Quiet CTA on dark surfaces
  "ghost-dark":
    "bg-white/5 text-white ring-1 ring-white/15 hover:bg-white/10 hover:ring-white/25 focus-visible:outline-white",
};

const sizeClasses: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[0.95rem]",
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Show the trailing arrow (↗ for external links, → for internal). */
  withIcon?: boolean;
  className?: string;
};

/**
 * Call-to-action rendered as a link. Internal hrefs use next/link; external
 * hrefs open in a new tab with an accessible hint.
 */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  withIcon = true,
  className,
}: ButtonLinkProps) {
  const external = isExternal(href);
  const Icon = external ? ArrowUpRight : ArrowRight;

  const classes = cn(
    "group/btn inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-semibold tracking-[-0.01em] whitespace-nowrap transition-[background-color,box-shadow,transform] duration-200 active:scale-[0.98]",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  const content = (
    <>
      {children}
      {withIcon ? (
        <Icon
          aria-hidden="true"
          className="size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-px"
          strokeWidth={2.25}
        />
      ) : null}
    </>
  );

  if (external || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
        {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
