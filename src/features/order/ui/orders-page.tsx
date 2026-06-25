import { Button } from "@/components/ui/button";
import { getOrdersQueryOptions } from "../hooks/order.query";
import { useQuery } from "@tanstack/react-query";
import DynamicLucideIcon from "@/components/common/dynamic-lucide-icon";
import { DataTableSkeleton } from "@/components/common/data-table/data-table-skeleton";
import OrdersDataTable from "./table/orders-data-table";
import { useState } from "react";
import OrderFormDialog from "./form/order-form-dialog";

const OrdersPage = () => {
  const [open, setOpen] = useState(false);

  const { data, refetch, isLoading } = useQuery(
    getOrdersQueryOptions({ page: 1, pageSize: 10 }),
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
          <DynamicLucideIcon name="Plus" /> Add Order
        </Button>
        <OrderFormDialog mode="create" open={open} onOpenChange={setOpen} />
      </div>
      {isLoading ? (
        <DataTableSkeleton />
      ) : (
        <OrdersDataTable orders={data?.items || []} />
      )}
    </div>
  );
};

export default OrdersPage;
