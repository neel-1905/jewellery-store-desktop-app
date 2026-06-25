import { getDb } from "@/db/database";
import { requireUser } from "@/features/auth/lib/auth.util";

import { OrderFormData } from "../domain/order.validations";
import {
  calculateLineTotal,
  calculateSubtotal,
  calculateTotal,
  generateOrderNumber,
} from "./order.utils";
import { ListParams, PaginatedResponse } from "@/types/api.types";
import { DBOrder, DBOrderItem, Order, OrderItem } from "../domain/order.types";
import { mapDBOrderItemToOrderItem, mapDBOrderToOrder } from "./order.mapper";

export async function createOrder(data: OrderFormData): Promise<number> {
  const user = await requireUser();
  const db = await getDb();

  const customer = (
    await db.select<{ id: number }[]>(
      `
        SELECT id
        FROM customers
        WHERE id = ?
      `,
      [data.customerId],
    )
  )[0];

  if (!customer) {
    throw new Error("Customer not found");
  }

  const items = data.items.map((item) => ({
    ...item,
    lineTotal: calculateLineTotal(
      item.quantity,
      item.unitPrice,
      item.makingCharge,
    ),
  }));

  const subtotal = calculateSubtotal(items);

  const total = calculateTotal(subtotal, data.discount ?? 0, data.tax ?? 0);

  const orderResult = await db.execute(
    `
      INSERT INTO orders (
        customer_id,
        subtotal,
        discount,
        tax,
        total,
        status,
        created_by
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      data.customerId,
      subtotal,
      data.discount,
      data.tax,
      total,
      data.status,
      user.id,
    ],
  );

  const orderId = orderResult.lastInsertId;

  if (!orderId) {
    throw new Error("Failed to create order");
  }

  await db.execute(
    `
      UPDATE orders
      SET order_number = ?
      WHERE id = ?
    `,
    [generateOrderNumber(orderId), orderId],
  );

  const placeholders = items.map(() => "(?, ?, ?, ?, ?, ?)").join(", ");

  const values = items.flatMap((item) => [
    orderId,
    item.itemName,
    item.quantity,
    item.unitPrice,
    item.makingCharge,
    item.lineTotal,
  ]);

  await db.execute(
    `
      INSERT INTO order_items (
        order_id,
        item_name,
        quantity,
        unit_price,
        making_charge,
        line_total
      )
      VALUES ${placeholders}
    `,
    values,
  );

  return orderId;
}

const ORDER_SORT_COLUMNS: Record<string, string> = {
  orderNumber: "o.order_number",
  customerName: "c.name",
  subtotal: "o.subtotal",
  total: "o.total",
  status: "o.status",
  createdAt: "o.created_at",
};

export async function getOrders(
  params: ListParams,
): Promise<PaginatedResponse<Order & { customerName: string }>> {
  await requireUser();

  const db = await getDb();

  const {
    page,
    pageSize,
    search = "",
    sortBy = "createdAt",
    sortDirection = "desc",
  } = params;

  const orderBy = ORDER_SORT_COLUMNS[sortBy] ?? ORDER_SORT_COLUMNS.createdAt;

  const searchTerm = `%${search}%`;

  const [{ count }] = await db.select<{ count: number }[]>(
    `
      SELECT COUNT(*) as count
      FROM orders o
      INNER JOIN customers c
        ON c.id = o.customer_id
      WHERE
        o.order_number LIKE ?
        OR c.name LIKE ?
    `,
    [searchTerm, searchTerm],
  );

  const items = await db.select<(DBOrder & { customer_name: string })[]>(
    `
      SELECT
        o.id,
        o.order_number,
        o.customer_id,
        c.name as customer_name,
        o.subtotal,
        o.discount,
        o.tax,
        o.total,
        o.status,
        o.created_at
      FROM orders o
      INNER JOIN customers c
        ON c.id = o.customer_id
      WHERE
        o.order_number LIKE ?
        OR c.name LIKE ?
      ORDER BY ${orderBy} ${sortDirection.toUpperCase()}
      LIMIT ?
      OFFSET ?
    `,
    [searchTerm, searchTerm, pageSize, (page - 1) * pageSize],
  );

  return {
    items: items.map((item) => ({
      ...mapDBOrderToOrder(item),
      customerName: item.customer_name,
    })),
    totalCount: count,
    page,
    pageSize,
  };
}

export async function getOrderById(
  id: number,
): Promise<Order & { items: OrderItem[] }> {
  await requireUser();

  const db = await getDb();

  const [order] = await db.select<DBOrder[]>(
    `
      SELECT *
      FROM orders
      WHERE id = ?
    `,
    [id],
  );

  if (!order) {
    throw new Error("Order not found");
  }

  const orderItems = await db.select<DBOrderItem[]>(
    `
      SELECT *
      FROM order_items
      WHERE order_id = ?
      ORDER BY id
    `,
    [id],
  );

  return {
    ...mapDBOrderToOrder(order),
    items: orderItems.map(mapDBOrderItemToOrderItem),
  };
}
