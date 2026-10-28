import type { ComponentType } from "react";
import type { valueProps } from "@/lib/content/home";
import { DevicesVisual } from "./devices-visual";
import { MonitoringVisual } from "./monitoring-visual";
import { RiskVisual } from "./risk-visual";
import { TimeVisual } from "./time-visual";

export type ValuePropKey = (typeof valueProps.items)[number]["key"];

export { DevicesVisual, MonitoringVisual, RiskVisual, TimeVisual };

/** One bespoke, decorative mini visual per "Why AETOS" item. */
export const valuePropVisuals = {
  devices: DevicesVisual,
  time: TimeVisual,
  monitoring: MonitoringVisual,
  risk: RiskVisual,
} satisfies Record<ValuePropKey, ComponentType>;
