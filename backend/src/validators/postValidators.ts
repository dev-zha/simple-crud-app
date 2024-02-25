import { z } from 'zod';

// Define the zod schema for creating a new post
export const createPostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

// Define the zod schema for updating an existing post
export const updatePostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

// Generate TypeScript types from zod schemas
export type CreatePostSchemaType = z.infer<typeof createPostSchema>;
export type UpdatePostSchemaType = z.infer<typeof updatePostSchema>;
