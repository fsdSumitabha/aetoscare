import { cn } from "@/lib/cn";

/** Tiny illustrated portrait of "Nurse Daniela" for the chat pebble. */
export function PetalNurseAvatar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("rounded-full ring-2 ring-white", className)}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id="petal-avatar-clip">
          <circle cx="24" cy="24" r="24" />
        </clipPath>
      </defs>
      <g clipPath="url(#petal-avatar-clip)">
        <rect width="48" height="48" fill="#fcefd2" />
        <circle cx="38" cy="10" r="9" fill="#f9e0a8" />
        {/* Hair, back */}
        <path d="M13.5 24c-1-9 4-15.5 10.5-15.5S35.5 15 34.5 24c-.5 5-2 8-3 9.5H16.5c-1-1.5-2.5-4.5-3-9.5Z" fill="#4a2f27" />
        {/* Scrubs */}
        <path d="M5 50c1.5-10 9-15 19-15s17.5 5 19 15Z" fill="#4e9c88" />
        <path d="M19 35.2 24 41l5-5.8" fill="#e7b394" />
        <path d="M19 35.2 24 41l5-5.8" fill="none" stroke="#2f7f6c" strokeWidth="1.2" strokeLinejoin="round" />
        {/* Neck + face */}
        <rect x="21" y="28" width="6" height="8" rx="2" fill="#e7b394" />
        <ellipse cx="24" cy="22.5" rx="8.4" ry="9.4" fill="#f1c7a8" />
        {/* Fringe + bun */}
        <path d="M15.4 21.5c-.4-7 4-11.3 9-11.3 5.4 0 9.3 4.3 8.6 11-2.2-4.3-6-6-10-5.6-3.4.4-6 2.3-7.6 5.9Z" fill="#4a2f27" />
        <circle cx="31.5" cy="9.5" r="4.6" fill="#4a2f27" />
        {/* Face details */}
        <circle cx="19.4" cy="25.4" r="1.9" fill="#f7b29b" opacity="0.75" />
        <circle cx="28.6" cy="25.4" r="1.9" fill="#f7b29b" opacity="0.75" />
        <path d="M19 22.2q1.6-1.5 3.2 0M25.8 22.2q1.6-1.5 3.2 0" stroke="#4a2f27" strokeWidth="1.1" strokeLinecap="round" fill="none" />
        <path d="M21.6 26.8q2.4 2.1 4.8 0" stroke="#b4573f" strokeWidth="1.1" strokeLinecap="round" fill="none" />
        {/* Stethoscope */}
        <path d="M17.5 36c-1.2 5.5 2 9 6.8 7.6" stroke="#17423a" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <circle cx="25.6" cy="43.2" r="1.8" fill="#fffdf9" stroke="#17423a" strokeWidth="0.9" />
      </g>
    </svg>
  );
}
