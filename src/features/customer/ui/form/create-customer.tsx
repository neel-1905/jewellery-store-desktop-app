import { useForm } from "react-hook-form";
import CustomerForm from "./customer-form";
import {
  CustomerFormInput,
  customerFormSchema,
} from "../../domain/customer.validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateCustomer } from "../../hooks/useCreateCustomer";

const CreateCustomer = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { mutateAsync: createCustomer, isPending } = useCreateCustomer();

  const form = useForm<CustomerFormInput>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      notes: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: CustomerFormInput) => {
    console.log(data);
    await createCustomer(data);
    onSuccess?.();
  };

  return <CustomerForm form={form} onSubmit={onSubmit} isPending={isPending} />;
};

export default CreateCustomer;
