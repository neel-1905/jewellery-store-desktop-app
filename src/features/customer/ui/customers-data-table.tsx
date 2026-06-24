import { DataTable } from "@/components/common/data-table/data-table";
import { Customer } from "../domain/customer.types";
import { customerColumns } from "./customer.columns";
import { DataTablePageSize } from "@/components/common/data-table/data-table-page-size";
import { useTableState } from "@/hooks/useTableState.hook";
import { DataTablePagination } from "@/components/common/data-table/data-table-pagination";

function CustomersDataTable({ customers }: { customers: Customer[] }) {
  const { params, setPage, setPageSize } = useTableState();

  return (
    <div className="space-y-4">
      <DataTable columns={customerColumns} data={customers} />

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
          totalCount={customers.length}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}

export default CustomersDataTable;
