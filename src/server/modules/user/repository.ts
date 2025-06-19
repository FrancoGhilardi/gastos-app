import { prisma } from "@server/db";
import { RegisterInput } from "@shared/types/types";

export const userRepository = {
  findByEmail: (email: string) => prisma.user.findUnique({ where: { email } }),

  create: (data: RegisterInput) => prisma.user.create({ data }),
};
