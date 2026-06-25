export const generateOrderNumber = (orderId: number) => {
  return `ORD-${String(orderId).padStart(6, "0")}`;
};

export function calculateLineTotal(
  quantity: number,
  unitPrice: number,
  makingCharge: number,
) {
  return quantity * unitPrice + makingCharge;
}

export function calculateSubtotal(
  items: {
    quantity: number;
    unitPrice: number;
    makingCharge: number;
  }[],
) {
  return items.reduce(
    (total, item) =>
      total +
      calculateLineTotal(item.quantity, item.unitPrice, item.makingCharge),
    0,
  );
}

export function calculateTotal(
  subtotal: number,
  discount: number,
  tax: number,
) {
  return subtotal - discount + tax;
}
