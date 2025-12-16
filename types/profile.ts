export type Role = "barber" | "cosmetologist";

export type CollectionMethod = "SHOP" | "DIRECT" | "BOTH";

export type IncomeStructure = "A" | "B" | "HYBRID";

export type EntityStatus = "INDIVIDUAL" | "LLC" | "UNSURE";

export type PreviewProfile = {
  role?: Role;
  collectionMethod?: CollectionMethod;
  incomeStructure?: IncomeStructure;
  entityStatus?: EntityStatus;
  updatedAt?: number;
};
