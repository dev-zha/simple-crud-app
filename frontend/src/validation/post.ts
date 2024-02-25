import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required field.',
  }),
  content: z.string().min(1, {
    message: 'Content is required field.',
  }),
});

export type VTPostSchema = z.infer<typeof postSchema>
