"use server";

import { registerUser } from "./register";
import { z } from "zod";

const schema = z
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

export async function registerAction(
  data: unknown
): Promise<
  | { success: true; email: string; password: string }
  | { success: false; errors?: Record<string, string[]>; message?: string }
> {
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  try {
    const { confirmPassword, ...userData } = parsed.data;

    await registerUser(userData);

    return {
      success: true,
      email: userData.email,
      password: userData.password,
    };
  } catch (error: any) {
    console.error("Error en registerUser:", error);
    throw new Error(error.message || "Error al registrar usuario");
  }
}
