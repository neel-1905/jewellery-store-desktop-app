import { DBOrder, DBOrderItem, Order, OrderItem } from "../domain/order.types";

export const mapDBOrderToOrder = (dbOrder: DBOrder): Order => {
  return {
    id: dbOrder.id,
    orderNumber: dbOrder.order_number,
    customerId: dbOrder.customer_id,
    subtotal: dbOrder.subtotal,
    discount: dbOrder.discount,
    tax: dbOrder.tax,
    total: dbOrder.total,
    status: dbOrder.status,
    createdBy: dbOrder.created_by,
    createdAt: dbOrder.created_at,
    updatedAt: dbOrder.updated_at,
  };
};

export const mapDBOrderItemToOrderItem = (
  dbOrderItem: DBOrderItem,
): OrderItem => {
  return {
    id: dbOrderItem.id,
    orderId: dbOrderItem.order_id,
    quantity: Number(dbOrderItem.quantity),
    unitPrice: Number(dbOrderItem.unit_price),
    itemName: dbOrderItem.item_name,
    lineTotal: Number(dbOrderItem.line_total),
    makingCharge: Number(dbOrderItem.making_charge),
  };
};
