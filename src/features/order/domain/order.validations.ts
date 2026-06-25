import { z } from "zod";

export const orderItemSchema = z.object({
  id: z.number().optional(),

  itemName: z.string().trim().min(1, "Item name is required"),

  quantity: z.number().min(1),

  unitPrice: z.number().min(0),

  makingCharge: z.number().min(0),
});

export const orderFormSchema = z.object({
  customerId: z.number(),

  discount: z.number().min(0).default(0),

  tax: z.number().min(0).default(0),

  status: z.enum(["draft", "completed", "cancelled"]),

  items: z.array(orderItemSchema).min(1, "At least one item is required"),
});

export type OrderFormData = z.infer<typeof orderFormSchema>;
