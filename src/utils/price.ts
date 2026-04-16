import type { PriceRange } from "../types/restaurant"

export type PriceCategory = "$" | "$$" | "$$$" | "$$$$"

export function getPriceCategory(range: PriceRange): PriceCategory {
  const { min, max } = range;

  if (min < 0 || max < 0 || max < min) {
    throw new Error("Invalid price range");
  }

  const midpoint = (min + max) / 2;

  if (midpoint <= 30000 && max <= 50000) {
    return "$";
  }

  if (midpoint <= 75000 && max <= 120000) {
    return "$$";
  }

  if (midpoint <= 150000 || max <= 250000) {
    return "$$$";
  }

  return "$$$$";
}
