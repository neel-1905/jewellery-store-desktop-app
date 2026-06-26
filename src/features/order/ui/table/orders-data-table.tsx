import { DataTable } from "@/components/common/data-table/data-table";
import { orderColumns } from "./order-table.columns";
import { Order } from "../..//domain/order.types";

function OrdersDataTable({ orders }: { orders: Order[] }) {
  return <DataTable columns={orderColumns} data={orders} />;
}

export default OrdersDataTable;
