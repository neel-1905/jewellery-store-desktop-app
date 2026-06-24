import ShopDetailsSection from "./shop-details-section";
import UserDetailsSection from "./user-details-section";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SetupFormData, setupSchema } from "../../domain/auth.validations";
import { Button } from "@/components/ui/button";
import { useCreateInitialSetup } from "../../hooks/useCreateInitialSetup.hook";
import ButtonLoader from "@/components/common/button-loader";

function SetupForm() {
  const { mutate, isPending } = useCreateInitialSetup();

  const form = useForm<SetupFormData>({
    resolver: zodResolver(setupSchema),
    defaultValues: {
      shop: {
        name: "",
        email: "",
        address: "",
        gstNumber: "",
        phone: "",
      },

      user: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
      },
    },
    mode: "onChange",
  });

  const onSubmit = (data: SetupFormData) => {
    mutate(data);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col-center gap-6 w-full px-4 py-8"
      >
        <ShopDetailsSection />
        <UserDetailsSection />

        <Button
          size={"lg"}
          className="w-full max-w-2xl"
          type="submit"
          disabled={isPending}
        >
          {isPending ? <ButtonLoader /> : "Setup Account"}
        </Button>
      </form>
    </FormProvider>
  );
}

export default SetupForm;
