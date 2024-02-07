import { z } from "zod";

export const cardSchema = z.object({
  title: z.string({
    required_error: "El título de la tarjeta es requerido.",
    invalid_type_error: "El título de la tarjeta debe ser un string.",
  }),
  description: z.string().optional(),
  listId: z.number({
    required_error: "El ID de la lista es requerido.",
    invalid_type_error: "El ID de la lista debe ser un número.",
  }),
  position: z.number().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type CardParams = z.infer<typeof cardSchema>;
