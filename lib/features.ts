export const FEATURES = {
  cart: process.env.NEXT_PUBLIC_ENABLE_CART !== "false",
  trackOrder: process.env.NEXT_PUBLIC_ENABLE_TRACK_ORDER !== "false",
  feedback: process.env.NEXT_PUBLIC_ENABLE_FEEDBACK !== "false",
  adminProducts: process.env.NEXT_PUBLIC_ENABLE_ADMIN_PRODUCTS !== "false",
  adminUsers: process.env.NEXT_PUBLIC_ENABLE_ADMIN_USERS !== "false",
  adminOrders: process.env.NEXT_PUBLIC_ENABLE_ADMIN_ORDERS !== "false",
} as const;

export type FeatureKey = keyof typeof FEATURES;

export function isFeatureEnabled(feature: FeatureKey): boolean {
  return FEATURES[feature];
}
