import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, {
    message: 'Email is required field.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters',
  }),
});

export const registerSchema = loginSchema.extend({
  username: z.string().min(1, {
    message: 'Username is required field.',
  }),
});

export type VTLoginSchema = z.infer<typeof loginSchema>;
export type VTRegisterSchema = z.infer<typeof registerSchema>;
