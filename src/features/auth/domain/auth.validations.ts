import { z } from "zod";

export const setupSchema = z
  .object({
    shop: z.object({
      name: z.string().min(1, "Shop name is required"),
      phone: z.string().min(10, "Phone number must be at least 10 digits"),
      email: z.email("Invalid email"),
      address: z.string().optional(),
      gstNumber: z.string().optional(),
    }),
    user: z.object({
      name: z.string().min(1, "User name is required"),
      email: z.email("Invalid email"),
      phone: z.string().min(10, "Phone number must be at least 10 digits"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z
        .string()
        .min(6, "Password must be at least 6 characters"),
    }),
  })
  .refine((data) => data.user.password === data.user.confirmPassword, {
    message: "Passwords don't match",
    path: ["user", "confirmPassword"],
  });

export type SetupFormData = z.infer<typeof setupSchema>;

export const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
