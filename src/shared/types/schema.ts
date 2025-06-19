import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    birthDate: z.coerce.date(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });
