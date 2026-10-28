type ClassValue = string | false | null | undefined;

/** Joins conditional class names. Keep variants non-conflicting; no merge logic. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
