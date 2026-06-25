import { useQuery } from "@tanstack/react-query";
import { getOrderByIdQueryOptions } from "../../hooks/order.query";
import { OrderFormData } from "../../domain/order.validations";
import { useForm } from "react-hook-form";
import OrderForm from "./order-form";
import { Loader2 } from "lucide-react";

const EditOrder = ({
  orderId,
  onSuccess,
}: {
  orderId: number;
  onSuccess: () => void;
}) => {
  const { data, isLoading } = useQuery(getOrderByIdQueryOptions(orderId));

  const form = useForm<OrderFormData>({
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

  const onSubmit = async (values: OrderFormData) => {
    // await updateCustomer({ customerId, ...values });
    onSuccess?.();
  };

  return <OrderForm form={form} isPending={false} onSubmit={onSubmit} />;
};

export default EditOrder;
