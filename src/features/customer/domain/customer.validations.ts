import z from "zod";

export const customerFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().optional(),
  email: z.email("Invalid email").optional(),
  address: z.string().min(1, "Address is required").optional(),
  notes: z
    .string()
    .max(500, "Notes must be less than 500 characters")
    .optional(),
});

export type CustomerFormInput = z.infer<typeof customerFormSchema>;
