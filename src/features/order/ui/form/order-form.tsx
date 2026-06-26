import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { OrderFormData } from "../../domain/order.validations";
import { Controller, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import CustomerCombobox from "@/features/customer/ui/customer-combobox";
import OrderFormItems from "./order-form-items";
import ButtonLoader from "@/components/common/button-loader";
import AmountDetails from "./amount-details";

const OrderForm = ({
  form,
  onSubmit,
  isPending,
}: {
  form: ReturnType<typeof useForm<OrderFormData>>;
  onSubmit: (data: OrderFormData) => void;
  isPending: boolean;
}) => {
  const { control, handleSubmit } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FieldGroup className="grid grid-cols-2 gap-4">
        <Controller
          name="customerId"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Customer</FieldLabel>

              <CustomerCombobox
                value={field.value}
                onValueChange={field.onChange}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="status"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="status">Status</FieldLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <OrderFormItems form={form} />

      <FieldGroup className="grid grid-cols-2 gap-4">
        <Controller
          name="discount"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Discount</FieldLabel>
              <Input type="number" {...field} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="tax"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Tax</FieldLabel>
              <Input type="number" {...field} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <AmountDetails form={form} />

      <Button type="submit" size={`lg`} disabled={isPending}>
        {isPending ? <ButtonLoader /> : "Save Order"}
      </Button>
    </form>
  );
};

export default OrderForm;
