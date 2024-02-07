import { z } from "zod";

export const listSchema = z.object({
  title: z.string({
    required_error: "El título de la lista es requerido.",
    invalid_type_error: "El título de la lista debe ser un string.",
  }),
  boardId: z.number({
    required_error: "El ID del tablero es requerido.",
    invalid_type_error: "El ID del tablero debe ser un número.",
  }),
  position: z.number().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type ListParams = z.infer<typeof listSchema>;
