/** Hand-drawn double underline that sits under the headline accent. */
export function PetalScribble({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 320 30"
      preserveAspectRatio="none"
      fill="none"
      className={className}
    >
      <path
        d="M5 15C52 7 112 4 170 8c44 3 92 9 143 3"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M38 24c62-7 140-9 236-4"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
        opacity="0.65"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
