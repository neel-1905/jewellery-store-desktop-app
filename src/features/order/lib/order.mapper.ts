import { DBOrder, Order } from "../domain/order.types";

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
