// TEMP in-memory store (Phase 3 only)
// We will replace this with DB later

type Entitlement = {
  email: string;
  status: "ACTIVE";
  purchasedAt: number;
};

const store = new Map<string, Entitlement>();

export function grantEntitlement(email: string) {
  store.set(email, {
    email,
    status: "ACTIVE",
    purchasedAt: Date.now(),
  });
}

export function hasEntitlement(email?: string | null) {
  if (!email) return false;
  return store.has(email);
}
