import { Activity, FileText, Phone, Stethoscope, type LucideIcon } from "@/components/ui/icons";
import { PEAK, pinAt } from "./day-line-geometry";

export type Milestone = {
  time: string;
  dateTime: string;
  label: string;
  Icon: LucideIcon;
  /** Icon chip tint, morning to night. */
  tint: string;
  pin: ReturnType<typeof pinAt>;
};

/** Illustrative morning in the life of one reading (not real patient data). */
export const milestones: Milestone[] = [
  {
    time: "7:02 AM",
    dateTime: "07:02",
    label: "Reading received",
    Icon: Activity,
    tint: "bg-blush-50 text-blush-600 ring-blush-200/70",
    pin: pinAt(PEAK[0], "left"),
  },
  {
    time: "7:05 AM",
    dateTime: "07:05",
    label: "Nurse reviews it",
    Icon: Stethoscope,
    tint: "bg-care-50 text-care-600 ring-care-200/70",
    pin: pinAt(735, "below"),
  },
  {
    time: "7:11 AM",
    dateTime: "07:11",
    label: "Patient reassured",
    Icon: Phone,
    tint: "bg-honey-100 text-care-700 ring-honey-200/80",
    pin: pinAt(872, "above"),
  },
  {
    time: "9:30 AM",
    dateTime: "09:30",
    label: "Doctor updated",
    Icon: FileText,
    tint: "bg-lilac-50 text-lilac-700 ring-lilac-200/80",
    pin: pinAt(1036, "below"),
  },
];
