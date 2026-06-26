import { DataTable } from "@/components/common/data-table/data-table";
import { Customer } from "../domain/customer.types";
import { customerColumns } from "./customer.columns";

function CustomersDataTable({ customers }: { customers: Customer[] }) {
  return <DataTable columns={customerColumns} data={customers} />;
}

export default CustomersDataTable;
