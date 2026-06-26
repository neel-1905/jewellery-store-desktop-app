import { useFieldArray, useForm } from "react-hook-form";
import { OrderFormData } from "../../domain/order.validations";
import DynamicLucideIcon from "@/components/common/dynamic-lucide-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const OrderFormItems = ({
  form,
}: {
  form: ReturnType<typeof useForm<OrderFormData>>;
}) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const {
    formState: { errors },
  } = form;

  const watchedItems = form.watch("items");

  const headings = [
    "Item",
    "Qty",
    "Unit price",
    "Making charge",
    "Line total",
    "",
  ];

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">Order Items</h2>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() =>
            append({
              itemName: "",
              quantity: 1,
              unitPrice: 0,
              makingCharge: 0,
            })
          }
        >
          <DynamicLucideIcon name="Plus" />
          Add Item
        </Button>
      </div>
      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              {headings.map((heading, index) => (
                <th
                  key={index}
                  className="text-left px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-muted-foreground"
                >
                  {heading}
                </th>
              ))}
              <th className="px-4 py-2.5"></th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => {
              const item = watchedItems[index];
              const lineTotal =
                item.quantity * item.unitPrice + item.makingCharge;
              return (
                <tr
                  key={field.id}
                  className="border-b border-border/50 last:border-0 even:bg-muted/20"
                >
                  <td className="px-4 py-2 align-top">
                    <Input
                      {...form.register(`items.${index}.itemName`)}
                      placeholder="Item name"
                    />
                    <p className="text-xs text-destructive mt-1 min-h-4">
                      {errors.items?.[index]?.itemName?.message}
                    </p>
                  </td>
                  <td className="px-4 py-2 align-top">
                    <Input
                      {...form.register(`items.${index}.quantity`, {
                        valueAsNumber: true,
                      })}
                      type="number"
                      className="w-16"
                    />
                    <p className="text-xs text-destructive mt-1 min-h-[16px]">
                      {errors.items?.[index]?.quantity?.message}
                    </p>
                  </td>
                  <td className="px-4 py-2 align-top">
                    <Input
                      {...form.register(`items.${index}.unitPrice`, {
                        valueAsNumber: true,
                      })}
                      type="number"
                      className="w-24 text-right"
                    />
                    <p className="text-xs text-destructive mt-1 min-h-[16px]">
                      {errors.items?.[index]?.unitPrice?.message}
                    </p>
                  </td>
                  <td className="px-4 py-2 align-top">
                    <Input
                      {...form.register(`items.${index}.makingCharge`, {
                        valueAsNumber: true,
                      })}
                      type="number"
                      className="w-24 text-right"
                    />
                    <p className="text-xs text-destructive mt-1 min-h-4">
                      {errors.items?.[index]?.makingCharge?.message}
                    </p>
                  </td>
                  <td className="px-4 py-2 align-top pt-3 text-right font-medium">
                    ₹{lineTotal.toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-2 align-top pt-3 text-right">
                    <button type="button" onClick={() => remove(index)}>
                      <DynamicLucideIcon
                        name="Trash2"
                        className="text-destructive"
                        size={20}
                      />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderFormItems;
