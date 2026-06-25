import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCustomerByIdQueryOptions } from "../lib/customer.query-options";
import { Button } from "@/components/ui/button";
import DynamicLucideIcon from "@/components/common/dynamic-lucide-icon";
import { useState } from "react";
import CustomerFormDialog from "./form/customer-form-dialog";
import CustomerStats from "./customer-stats";
import { useDeleteCustomer } from "../hooks/useDeleteCustomer";
import { useNavigate } from "react-router-dom";
import CustomerPersonalInfo from "./customer-personal-info";

function CustomerDetailsPage() {
  const { customerId } = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const { data: customer } = useQuery(
    getCustomerByIdQueryOptions(Number(customerId)),
  );

  const { mutateAsync } = useDeleteCustomer();

  if (!customer) {
    return (
      <div className="h-full flex justify-center items-center font-semibold text-xl">
        Customer with ID {customerId} not found
      </div>
    );
  }

  const handleDelete = () => {
    mutateAsync(Number(customerId));
    navigate("/customers");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">{customer.name}</h2>
          <p className="text-sm text-muted-foreground">
            {customer.customerCode} • Added on {customer.createdAt}
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant={`secondary`}
            size={`lg`}
            onClick={() => setOpen(true)}
          >
            <DynamicLucideIcon name="Pencil" /> Edit
          </Button>
          <Button variant={`destructive`} size={`lg`} onClick={handleDelete}>
            <DynamicLucideIcon name="Trash2" /> Delete
          </Button>
        </div>
      </div>

      <CustomerStats />

      <CustomerPersonalInfo customer={customer} />

      <CustomerFormDialog
        open={open}
        onOpenChange={setOpen}
        mode="edit"
        customerId={Number(customerId)}
      />
    </div>
  );
}

export default CustomerDetailsPage;
