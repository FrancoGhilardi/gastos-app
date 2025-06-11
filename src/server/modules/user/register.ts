import { prisma } from "./user.repository";
import { hash } from "bcryptjs";

export const registerUser = async (data: {
  name: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: Date;
}) => {
  const existing = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existing) throw new Error("Email already exists");

  const hashedPassword = await hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
      birthDate: data.birthDate,
    },
  });

  return user;
};
