import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useFormContext } from "react-hook-form";
import { SetupFormData } from "../../domain/auth.validations";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

function ShopDetailsSection() {
  const form = useFormContext<SetupFormData>();

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Shop Details</CardTitle>
        <CardDescription>Enter your shop details</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Controller
            name="shop.name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="shopName">Shop Name</FieldLabel>
                <Input
                  {...field}
                  id="shopName"
                  aria-invalid={fieldState.invalid}
                  placeholder="eg. My Shop"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="shop.phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="shopPhone">Shop Phone</FieldLabel>
                <Input
                  {...field}
                  id="shopPhone"
                  aria-invalid={fieldState.invalid}
                  placeholder="eg. 1234567890"
                  autoComplete="off"
                  type="tel"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="shop.address"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="col-span-1 sm:col-span-2"
              >
                <FieldLabel htmlFor="shopAddress">Shop Address</FieldLabel>
                <Textarea
                  {...field}
                  id="shopAddress"
                  aria-invalid={fieldState.invalid}
                  placeholder="eg. 123 Main Street, City, State, ZIP"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="shop.email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="shopEmail">Shop Email</FieldLabel>
                <Input
                  {...field}
                  id="shopEmail"
                  aria-invalid={fieldState.invalid}
                  placeholder="eg. shop@example.com"
                  autoComplete="off"
                  type="email"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="shop.gstNumber"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="shopGstNumber">Shop GST Number</FieldLabel>
                <Input
                  {...field}
                  id="shopGstNumber"
                  aria-invalid={fieldState.invalid}
                  placeholder="eg. 12ABCDE3456F123"
                  autoComplete="off"
                  type="text"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </CardContent>
    </Card>
  );
}

export default ShopDetailsSection;
