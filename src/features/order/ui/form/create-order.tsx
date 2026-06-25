import { useForm } from "react-hook-form";
import { OrderFormData } from "../../domain/order.validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderFormSchema } from "../../domain/order.validations";
import OrderForm from "./order-form";
import { useCreateOrder } from "../../hooks/useCreateOrder.hook";

const CreateOrder = ({ onSuccess }: { onSuccess: () => void }) => {
  const { mutateAsync: createOrder, isPending } = useCreateOrder();

  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      customerId: 0,
      status: "draft",
      discount: 0,
      tax: 0,
      items: [],
    },
  });

  const onSubmit = async (data: OrderFormData) => {
    console.log(data);
    // await createOrder(data);
    // onSuccess();
  };

  return <OrderForm form={form} onSubmit={onSubmit} isPending={isPending} />;
};

export default CreateOrder;
