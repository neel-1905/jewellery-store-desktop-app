import { Button } from "@/components/ui/button";

import DynamicLucideIcon from "@/components/common/dynamic-lucide-icon";

import { useState } from "react";

import RefreshButton from "@/components/common/refresh-button";
import { QUERY_KEYS } from "@/constants/query-keys";
import OrderFormDialog from "./form/order-form-dialog";
import OrderFormDataWrapper from "./table/order-form-data-wrapper";

const OrdersPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex justify-end items-center gap-3 shrink-0">
        <RefreshButton queryKey={QUERY_KEYS.orders.all} />
        <Button size="lg" onClick={() => setOpen(true)}>
          <DynamicLucideIcon name="Plus" /> Add Order
        </Button>
        <OrderFormDialog mode="create" open={open} onOpenChange={setOpen} />
      </div>

      <OrderFormDataWrapper />
    </div>
  );
};

export default OrdersPage;
