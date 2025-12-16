import type { IncomeStructure, PreviewProfile } from "@/types/profile";

/**
 * Determine the most likely structure based on the answers so far.
 * - If user explicitly chose incomeStructure, respect it
 * - Else infer from collectionMethod:
 *   SHOP -> A, DIRECT -> B, BOTH -> HYBRID
 */
export function resolveIncomeStructure(p: PreviewProfile): IncomeStructure {
  if (p.incomeStructure) return p.incomeStructure;
  switch (p.collectionMethod) {
    case "SHOP":
      return "A";
    case "DIRECT":
      return "B";
    case "BOTH":
      return "HYBRID";
    default:
      return "HYBRID"; // safe default for unknown
  }
}

export function roleLabel(role?: PreviewProfile["role"]) {
  if (role === "barber") return "Barber";
  if (role === "cosmetologist") return "Cosmetologist";
  return "Independent Professional";
}
