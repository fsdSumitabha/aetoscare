/**
 * Soft warm washes behind the hero: morning glow top-right, a sage breath
 * bottom-left and a whisper of paper grain. Purely decorative.
 */
export function DawnBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {/* Morning glow, top right */}
      <div className="absolute -top-56 -right-48 size-[52rem] rounded-full bg-radial from-blush-200/70 via-honey-100/45 to-transparent to-70%" />
      <div className="absolute -top-24 right-[18%] size-[26rem] rounded-full bg-radial from-honey-200/45 to-transparent to-70%" />
      {/* Sage breath, bottom left */}
      <div className="absolute -bottom-72 -left-56 size-[48rem] rounded-full bg-radial from-care-100/90 via-care-50/50 to-transparent to-70%" />
      {/* A faint lilac hint where the night side of the window sits */}
      <div className="absolute right-[4%] bottom-[8%] size-[22rem] rounded-full bg-radial from-lilac-100/70 to-transparent to-70%" />
      {/* Paper grain */}
      <div className="bg-noise absolute inset-0 opacity-[0.05] mix-blend-multiply" />
      {/* Settle into the page below */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-cream-100" />
    </div>
  );
}
