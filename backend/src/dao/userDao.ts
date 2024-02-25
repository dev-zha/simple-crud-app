import Prisma, { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const userFields = {
  select: {
    id: true,
    username: true,
    email: true,
  },
};

export const getUserById = async (userId: number, selectAll = false) => {
  return prisma.user.findUnique({
    where: { id: userId },
    ...(selectAll ? {} : userFields),
  });
};

export const getUserByMail = async (email: string, selectAll = false) => {
  return prisma.user.findUnique({
    where: { email },
    ...(selectAll ? {} : userFields),
  });
};

export const createUser = async (user: Omit<Prisma.User, 'id'>) => {
  return prisma.user.create({
    data: {
      username: user.username,
      email: user.email,
      password: user.password,
    },
    ...userFields,
  });
};
