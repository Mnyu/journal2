import { z } from 'zod';

export const signInSchema = z.object({
  email: z.email('Please enter a valid email address').trim().toLowerCase(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .max(20, 'password must be at most 20 characters.'),
});

export type SignInInput = z.infer<typeof signInSchema>;
