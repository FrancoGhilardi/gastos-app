import { prisma } from "@server/db";
import bcryptjs from "bcryptjs";

interface LoginData {
  email: string;
  password: string;
}

export async function loginUser({ email, password }: LoginData) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  const passwordMatch = await bcryptjs.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("Contraseña incorrecta");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}
