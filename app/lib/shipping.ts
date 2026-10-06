export const FREE_SHIPPING_THRESHOLD = 899;

export const BASE_DELIVERY_CHARGE = 40;

export type PricedItem = {
  price: number | string;
  quantity?: number;
};

export function getSubtotal(items: PricedItem[]): number {
  return items.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1),
    0
  );
}

export function getDeliveryCharge(subtotal: number): number {
  if (subtotal <= 0) return 0;
  if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return BASE_DELIVERY_CHARGE;
}

export function getTotals(items: PricedItem[]): {
  subtotal: number;
  deliveryCharge: number;
  total: number;
} {
  const subtotal = getSubtotal(items);
  const deliveryCharge = getDeliveryCharge(subtotal);

  return {
    subtotal,
    deliveryCharge,
    total: subtotal + deliveryCharge,
  };
}
