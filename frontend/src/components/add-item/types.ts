import { z } from "zod";

const itemSchema = z.object({
  title: z.string().min(1),
  productUrl: z.union([z.string().trim().url(), z.literal("")]),
  imageUrl: z.union([z.string().trim().url(), z.literal("")]),
  price: z.string().optional(),
});

type AddItem = z.infer<typeof itemSchema>;

export { itemSchema };
export type { AddItem };
