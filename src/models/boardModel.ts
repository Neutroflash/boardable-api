import { z } from "zod";

export const boardSchema = z.object({
  title: z.string({
    required_error: "El título del tablero es requerido.",
    invalid_type_error: "El título del tablero debe ser un string.",
  }),
  ownerId: z.number({
    required_error: "El ID del propietario es requerido.",
    invalid_type_error: "El ID del propietario debe ser un número.",
  }),
  color: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type BoardParams = z.infer<typeof boardSchema>;
