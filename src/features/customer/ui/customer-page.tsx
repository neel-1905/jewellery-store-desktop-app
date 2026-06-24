import { useQuery } from "@tanstack/react-query";

import { getCustomersQueryOptions } from "../lib/customer.query-options";
import CustomerFormDialog from "./form/customer-form-dialog";
import CustomersDataTable from "./customers-data-table";
import DynamicLucideIcon from "@/components/common/dynamic-lucide-icon";
import { Button } from "@/components/ui/button";
import { DataTableSkeleton } from "@/components/common/data-table/data-table-skeleton";
import { useState } from "react";

function CustomerPage() {
  const [open, setOpen] = useState(false);

  const { data, refetch, isLoading } = useQuery(
    getCustomersQueryOptions({ page: 1, pageSize: 10 }),
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-end items-center gap-3">
        <Button size={`icon`} variant={`secondary`} onClick={() => refetch()}>
          <DynamicLucideIcon
            name="RefreshCw"
            size={10}
            className="text-primary"
          />
        </Button>

        <Button size={"lg"} onClick={() => setOpen(true)}>
          <DynamicLucideIcon name="Plus" /> Add Customer
        </Button>
        <CustomerFormDialog mode="create" open={open} onOpenChange={setOpen} />
      </div>
      {isLoading ? (
        <DataTableSkeleton />
      ) : (
        <CustomersDataTable customers={data?.items || []} />
      )}
    </div>
  );
}

export default CustomerPage;
