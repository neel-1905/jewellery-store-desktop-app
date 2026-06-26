import { DataTablePageSize } from "@/components/common/data-table/data-table-page-size";
import CustomersDataTable from "./customers-data-table";
import { useQuery } from "@tanstack/react-query";
import { getCustomersQueryOptions } from "../lib/customer.query-options";
import { useTableState } from "@/hooks/useTableState.hook";
import { DataTableSkeleton } from "@/components/common/data-table/data-table-skeleton";
import { DataTablePagination } from "@/components/common/data-table/data-table-pagination";

function CustomersDataTableWrapper() {
  const { params, setPage, setPageSize } = useTableState();

  const { data, isLoading } = useQuery(
    getCustomersQueryOptions({ page: params.page, pageSize: params.pageSize }),
  );

  if (isLoading) return <DataTableSkeleton />;

  return (
    <>
      <div className="flex-1 min-h-0 overflow-hidden">
        <CustomersDataTable customers={data?.items || []} />
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

export default CustomersDataTableWrapper;
