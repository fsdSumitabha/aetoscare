import type { Metadata } from "next";
import { HeroEditorial } from "@/components/sections/hero-concepts/editorial/hero-editorial";

export const metadata: Metadata = {
  title: "Hero concept: Editorial calm",
  robots: { index: false, follow: false },
};

export default function HeroPreviewPage() {
  return <HeroEditorial />;
}
