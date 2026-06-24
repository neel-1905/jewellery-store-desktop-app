import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateCustomer from "./create-customer";
import EditCustomer from "./edit-customer";

const CustomerFormDialog = ({
  mode,
  trigger,
  customerId,
  open,
  onOpenChange,
}: {
  mode: "create" | "edit";
  trigger?: React.ReactNode;
  customerId?: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const isCreate = mode === "create";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            <CreateCustomer onSuccess={() => onOpenChange(false)} />
          ) : (
            <EditCustomer
              customerId={customerId!}
              onSuccess={() => onOpenChange(false)}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerFormDialog;
