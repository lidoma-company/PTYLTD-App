import { z } from 'zod';

export const signupSchema = z
    .object({
        first_name: z
            .string()
            .min(1, { message: 'First name is required' })
            .min(3, { message: 'First name must be at least 3 characters' }),
        last_name: z
            .string()
            .min(1, { message: 'Last name is required' })
            .min(3, { message: 'Last name must be at least 3 characters' }),
        email: z.string().email({ message: 'Invalid email address' }),
        mobile_number: z
            .string()
            .min(10, 'Mobile number must be at least 10 digits'),

        zip_code: z
            .string()
            .trim()
            .min(2, 'Zip code is required')
            .max(12, 'Zip code is too long')
            .regex(
                /^(?=.*[A-Za-z0-9])[A-Za-z0-9]+(?:[ -][A-Za-z0-9]+)*$/,
                'Please enter a valid postal code',
            ),

        password: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters' }),
        password_confirmation: z
            .string()
            .min(1, { message: 'Confirm password is required' }),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: 'Passwords do not match',
        path: ['password_confirmation'],
    });

export type SignupType = z.infer<typeof signupSchema>;
