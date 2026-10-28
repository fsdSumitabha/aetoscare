/**
 * Dreamy pastel wash behind the Petal hero: four large blurred blobs that
 * drift very slowly, plus a whisper of paper grain. No grids, no lines.
 */
export function PetalBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-cream-50 via-cream-50 to-cream-100" />

      {/* Blush: warm glow behind the collage */}
      <div className="absolute -top-48 right-[-14%] size-[44rem] animate-[aurora_44s_ease-in-out_infinite_alternate] rounded-full bg-blush-100 opacity-90 blur-[110px]" />
      {/* Lilac: evening calm, lower right */}
      <div className="absolute top-[42%] right-[2%] size-[32rem] animate-[aurora_52s_ease-in-out_-14s_infinite_alternate] rounded-full bg-lilac-100 blur-[100px]" />
      {/* Care: a cool, clean breath, lower left */}
      <div className="absolute bottom-[-22%] left-[-12%] size-[38rem] animate-[aurora_48s_ease-in-out_-22s_infinite_alternate] rounded-full bg-care-100 opacity-60 blur-[110px]" />
      {/* Honey: morning light, upper left */}
      <div className="absolute -top-32 left-[14%] size-[28rem] animate-[aurora_58s_ease-in-out_-30s_infinite_alternate-reverse] rounded-full bg-honey-100 opacity-80 blur-[100px]" />

      {/* Paper grain for an analogue, printed feel */}
      <div className="absolute inset-0 bg-noise opacity-[0.035] mix-blend-multiply" />
      {/* Settle into the page below */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-cream-50/80" />
    </div>
  );
}
