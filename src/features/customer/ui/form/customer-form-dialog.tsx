import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateCustomer from "./create-customer";
import EditCustomer from "./edit-customer";
import { Button } from "@/components/ui/button";
import DynamicLucideIcon from "@/components/common/dynamic-lucide-icon";
import { useState } from "react";

const CustomerFormDialog = ({
  mode,
  trigger,
}: {
  mode: "create" | "edit";
  trigger?: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const isCreate = mode === "create";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size={"lg"}>
            <DynamicLucideIcon name="Plus" /> Add Customer
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isCreate ? "Add Customer" : "Edit Customer"}
          </DialogTitle>
          <DialogDescription>
            {isCreate
              ? "Add a new customer to the system"
              : "Edit customer information"}
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[70vh] overflow-y-auto app-scrollbar">
          {isCreate ? (
            <CreateCustomer onSuccess={() => setOpen(false)} />
          ) : (
            <EditCustomer onSuccess={() => setOpen(false)} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerFormDialog;
