import Prisma, { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllPost = async () => {
  return prisma.post.findMany();
};

export const getPostList = async (
  page: number,
  limit: number,
  searchKeyword?: string
) => {
  return prisma.post.findMany({
    skip: (page - 1) * limit,
    take: limit,
    ...getPostFilterQuery(searchKeyword),
    orderBy: {
      id: 'desc',
    },
  });
};

export const getPostCount = async (searchKeyword?: string) => {
  return prisma.post.count({
    ...getPostFilterQuery(searchKeyword),
  });
};

export const getPostById = async (postId: number) => {
  return prisma.post.findUnique({
    where: { id: postId },
  });
};

export const createPost = async (post: Omit<Prisma.Post, 'id'>) => {
  return prisma.post.create({
    data: {
      title: post.title,
      content: post.content,
      user: {
        connect: { id: post.userId },
      },
    },
  });
};

export const updatePost = async (post: Omit<Prisma.Post, 'userId'>) => {
  return prisma.post.update({
    where: { id: post.id },
    data: { title: post.title, content: post.content },
  });
};

export const deletePost = async (postId: number) => {
  return prisma.post.delete({ where: { id: postId } });
};

const getPostFilterQuery = (searchKeyword?: string) => {
  return searchKeyword
    ? {
        where: {
          OR: [
            { title: { contains: searchKeyword } },
            { content: { contains: searchKeyword } },
          ],
        },
      }
    : null;
};
