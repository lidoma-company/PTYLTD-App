import { z } from 'zod';

export const messageSchema = z.object({
    message: z
        .string()
        .nonempty('Message is required')
        .min(6, 'Message must be at least 6 characters long'),

    image: z
        .custom<File>(
            (file) => {
                if (!(file instanceof File)) return false;

                return file.size > 0;
            },
            {
                message: 'File is required',
            },
        )
        .optional(),
    id: z.string(),
});

export type MessageSchema = z.infer<typeof messageSchema>;
