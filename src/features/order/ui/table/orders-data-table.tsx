import { DataTable } from "@/components/common/data-table/data-table";
import { orderColumns } from "./order-table.columns";
import { DataTablePageSize } from "@/components/common/data-table/data-table-page-size";
import { useTableState } from "@/hooks/useTableState.hook";
import { DataTablePagination } from "@/components/common/data-table/data-table-pagination";
import { Order } from "../..//domain/order.types";

function OrdersDataTable({ orders }: { orders: Order[] }) {
  const { params, setPage, setPageSize } = useTableState();

  return (
    <div className="space-y-4">
      <DataTable columns={orderColumns} data={orders} />

      <div className="flex items-center justify-between">
        <DataTablePageSize
          pageSize={params.pageSize}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setPage(1);
          }}
        />

        <DataTablePagination
          page={params.page}
          pageSize={params.pageSize}
          totalCount={orders.length}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}

export default OrdersDataTable;
