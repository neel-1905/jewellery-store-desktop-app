import { z } from "zod";

export const orderItemSchema = z.object({
  id: z.number().optional(),

  itemName: z.string().trim().min(1, "Item name is required"),

  quantity: z.coerce.number<number>().min(1),

  unitPrice: z.coerce.number<number>().min(0),

  makingCharge: z.coerce.number<number>().min(0),
});

export const orderFormSchema = z.object({
  customerId: z.coerce.number<number>().min(1, "Customer is required"),

  discount: z.coerce.number<number>().min(0),

  tax: z.coerce.number<number>().min(0),

  status: z.enum(["draft", "completed", "cancelled"]),

  items: z.array(orderItemSchema).min(1, "At least one item is required"),
});

export type OrderFormData = z.infer<typeof orderFormSchema>;
