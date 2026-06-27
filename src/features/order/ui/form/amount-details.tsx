import { useForm } from "react-hook-form";
import { OrderFormData } from "../../domain/order.validations";
import { Card, CardContent } from "@/components/ui/card";
import { calculateSubtotal, calculateTotal } from "../../lib/order.utils";

const AmountDetails = ({
  form,
}: {
  form: ReturnType<typeof useForm<OrderFormData>>;
}) => {
  const subtotal = calculateSubtotal(form.watch("items") ?? []);

  return (
    <Card className="bg-secondary">
      <CardContent>
        <div className="flex items-center justify-between pb-2">
          <span>Subtotal</span>
          <span className="font-medium">₹{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-between py-2">
          <span>Discount</span>
          <span className="font-medium text-destructive">
            -₹{form.watch("discount")}
          </span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-primary/40">
          <span>Tax</span>
          <span className="font-medium">₹{form.watch("tax")}</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="font-semibold text-lg">Total</span>
          <span className="text-lg font-semibold">
            ₹
            {calculateTotal(
              Number(subtotal),
              Number(form.watch("discount")),
              Number(form.watch("tax")),
            )}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default AmountDetails;
