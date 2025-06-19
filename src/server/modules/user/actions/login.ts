import { compare } from "bcryptjs";
import { userRepository } from "../repository";

export async function loginUser(email: string, password: string) {
  const user = await userRepository.findByEmail(email);
  if (!user) throw new Error("Credenciales inválidas");

  const match = await compare(password, user.password);
  if (!match) throw new Error("Credenciales inválidas");

  return user;
}
