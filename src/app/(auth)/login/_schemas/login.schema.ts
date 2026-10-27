import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
        .string()
        .min(1, { message: 'Password is required' })
        .min(8, { message: 'Password must be at least 8 characters' }),
});

export type LoginType = z.infer<typeof loginSchema>;

export type LoginRes = {
    token: string;
};
