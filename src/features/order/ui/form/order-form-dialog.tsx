import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateOrder from "./create-order";
import EditOrder from "./edit-order";

const OrderFormDialog = ({
  mode,
  orderId,
  open,
  onOpenChange,
}: {
  mode: "create" | "edit";
  orderId?: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const isCreate = mode === "create";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-4xl"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>{isCreate ? "New Order" : "Edit Order"}</DialogTitle>
          <DialogDescription>
            {isCreate
              ? "Add a new order to the system"
              : "Edit order information"}
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[70vh] overflow-y-auto app-scrollbar">
          {isCreate ? (
            <CreateOrder onSuccess={() => onOpenChange(false)} />
          ) : (
            <EditOrder
              orderId={orderId!}
              onSuccess={() => onOpenChange(false)}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderFormDialog;
