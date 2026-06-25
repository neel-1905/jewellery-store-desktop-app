import { ListParams, PaginatedResponse } from "@/types/api.types";

export type OrderStatus = "draft" | "completed" | "cancelled";

export type DBOrder = {
  id: number;
  order_number: string;
  customer_id: number;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  status: OrderStatus;
  created_by: number;
  created_at: string;
  updated_at: string;
};

export type Order = {
  id: number;
  orderNumber: string;
  customerId: number;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  status: OrderStatus;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
};

export type DBOrderItem = {
  id: number;
  order_id: number;
  item_name: string;
  quantity: number;
  unit_price: number;
  line_total: number;
  making_charge: number;
};

export type OrderItem = {
  id: number;
  orderId: number;
  itemName: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  makingCharge: number;
};

export type GetOrdersParams = ListParams;

export type OrderListResponse = PaginatedResponse<Order>;
