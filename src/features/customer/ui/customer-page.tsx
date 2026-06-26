import CustomerFormDialog from "./form/customer-form-dialog";

import DynamicLucideIcon from "@/components/common/dynamic-lucide-icon";
import { Button } from "@/components/ui/button";

import { useState } from "react";

import RefreshButton from "@/components/common/refresh-button";
import { QUERY_KEYS } from "@/constants/query-keys";
import CustomersDataTableWrapper from "./customers-data-table-wrapper";

function CustomerPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex justify-end items-center gap-3 shrink-0">
        <RefreshButton queryKey={QUERY_KEYS.customers.all} />
        <Button size="lg" onClick={() => setOpen(true)}>
          <DynamicLucideIcon name="Plus" /> Add Customer
        </Button>
        <CustomerFormDialog mode="create" open={open} onOpenChange={setOpen} />
      </div>

      <CustomersDataTableWrapper />
    </div>
  );
}

export default CustomerPage;
