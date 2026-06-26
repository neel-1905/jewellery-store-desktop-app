import { DataTablePageSize } from "@/components/common/data-table/data-table-page-size";

import { useQuery } from "@tanstack/react-query";

import { useTableState } from "@/hooks/useTableState.hook";
import { DataTableSkeleton } from "@/components/common/data-table/data-table-skeleton";
import { DataTablePagination } from "@/components/common/data-table/data-table-pagination";
import { getOrdersQueryOptions } from "../../hooks/order.query";
import OrdersDataTable from "./orders-data-table";

function OrderFormDataWrapper() {
  const { params, setPage, setPageSize } = useTableState();

  const { data, isLoading } = useQuery(
    getOrdersQueryOptions({ page: params.page, pageSize: params.pageSize }),
  );

  if (isLoading) return <DataTableSkeleton />;

  return (
    <>
      <div className="flex-1 min-h-0 overflow-hidden">
        <OrdersDataTable orders={data?.items || []} />
      </div>

      <div className="flex items-center justify-between shrink-0">
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
          totalCount={data?.totalCount || 0}
          onPageChange={setPage}
        />
      </div>
    </>
  );
}

export default OrderFormDataWrapper;
