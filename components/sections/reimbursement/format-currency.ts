const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/**
 * Formats a whole-dollar amount as US currency, e.g. 35300 -> "$35,300".
 * Pure and locale-pinned, so server and client renders always match.
 */
export function formatUsd(amount: number): string {
  return usdFormatter.format(amount);
}
