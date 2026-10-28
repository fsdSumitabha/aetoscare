import { cn } from "@/lib/cn";
import { crosshairPaths, eyePath, letterPaths, markViewBox } from "@/lib/brand/logo-paths";

type LogoProps = {
  className?: string;
  /** Colour of the logo's "eye". Defaults to the brand azure. */
  eyeClassName?: string;
};

/**
 * AETOS wordmark, redrawn from the brand SVG. Letterforms use currentColor so
 * the logo adapts to light and dark surfaces. Decorative by default: wrap it in
 * a labelled link (e.g. aria-label="AETOS home").
 */
export function Logo({ className, eyeClassName = "fill-brand-400" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 183 50"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={cn(hasSize(className, /(^|\s)(h|w|size)-/) ? null : "h-7 w-auto", className)}
    >
      {letterPaths.map((d, i) => (
        <path key={i} d={d} />
      ))}
      <MarkPaths eyeClassName={eyeClassName} />
    </svg>
  );
}

/** Default sizes apply only when the caller sets none (cn does not merge conflicting classes). */
function hasSize(className: string | undefined, pattern: RegExp) {
  return className ? pattern.test(className) : false;
}

function MarkPaths({ eyeClassName }: { eyeClassName?: string }) {
  return (
    <>
      <path className={eyeClassName} d={eyePath} />
      {crosshairPaths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </>
  );
}

/**
 * The crosshair "O" from the wordmark — the AETOS eye. Use as a brand glyph in
 * eyebrows, badges and decorative motifs. Always decorative.
 */
export function LogoMark({ className, eyeClassName = "fill-brand-400" }: LogoProps) {
  return (
    <svg
      viewBox={markViewBox}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={cn(hasSize(className, /(^|\s)size-/) ? null : "size-6", className)}
    >
      <MarkPaths eyeClassName={eyeClassName} />
    </svg>
  );
}
