import { useQuery } from "@tanstack/react-query";
import { getCustomerByIdQueryOptions } from "../../lib/customer.query-options";
import { Loader2 } from "lucide-react";
import CustomerForm from "./customer-form";
import { useForm } from "react-hook-form";
import { CustomerFormInput } from "../../domain/customer.validations";
import { useUpdateCustomerMutation } from "../../hooks/useUpdateCustomer.hook";

const EditCustomer = ({
  customerId,
  onSuccess,
}: {
  customerId: number;
  onSuccess?: () => void;
}) => {
  const { data, isLoading } = useQuery(getCustomerByIdQueryOptions(customerId));
  const { mutateAsync: updateCustomer, isPending } =
    useUpdateCustomerMutation();

  const form = useForm<CustomerFormInput>({
    values: data,
    resetOptions: { keepDirtyValues: true },
  });

  if (isLoading) {
    return (
      <div className="flex-center h-32">
        <Loader2 size={30} className="animate-spin" />
      </div>
    );
  }

  if (!data) {
    return <div>Customer not found</div>;
  }

  const onSubmit = async (values: CustomerFormInput) => {
    await updateCustomer({ customerId, ...values });
    onSuccess?.();
  };

  return <CustomerForm form={form} isPending={isPending} onSubmit={onSubmit} />;
};

export default EditCustomer;
