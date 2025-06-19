import { hash } from "bcryptjs";
import { userRepository } from "../repository";
import { RegisterInput } from "@shared/types/types";

export async function registerUser(input: RegisterInput) {
  const existing = await userRepository.findByEmail(input.email);
  if (existing) throw new Error("El usuario ya está registrado");

  const hashed = await hash(input.password, 10);
  const user = await userRepository.create({ ...input, password: hashed });
  return user;
}
