import { z } from "zod";

export const userSchema = z.object({
  username: z.string({
    required_error: "Username es requerido.",
    invalid_type_error: "Username debe ser un string.",
  }),
  password: z.string({
    required_error: "Password es requerido.",
    invalid_type_error: "Password debe ser un string.",
  }),
  email: z
    .string({
      required_error: "Email es requerido.",
      invalid_type_error: "Email debe ser un string.",
    })
    .email()
    .nullable()
    .optional(),
  firstName: z
    .string({
      required_error: "FirstName es requerido.",
      invalid_type_error: "FirstName debe ser un string.",
    })
    .nullable()
    .optional(),
  lastName: z
    .string({
      required_error: "LastName es requerido.",
      invalid_type_error: "LastName debe ser un string.",
    })
    .nullable()
    .optional(),
  role: z
    .enum(["admin", "user"], {
      invalid_type_error: "Role debe ser un string",
    })
    .default("user")
    .optional(),
  createdAt: z
    .date({
      required_error: "CreatedAt es requerido.",
      invalid_type_error: "CreatedAt debe ser una fecha.",
    })
    .optional(),
  updatedAt: z
    .date({
      required_error: "UpdatedAt es requerido.",
      invalid_type_error: "UpdatedAt debe ser una fecha.",
    })
    .optional(),
});

export type UserParams = z.infer<typeof userSchema>;

export type User = UserParams & { id: number };

export const editUserSchema = userSchema.omit({
  username: true,
  password: true,
  role: true,
  createdAt: true,
  updatedAt: true,
});

export type editUserParams = z.infer<typeof editUserSchema>;