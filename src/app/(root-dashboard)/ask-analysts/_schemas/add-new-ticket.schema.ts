import { z } from 'zod';

export const ticketSchema = z.object({
    title: z
        .string()
        .nonempty('Title is required')
        .min(1, 'Title must be at least 6 characters long'),

    description: z.string().nonempty('Description is required'),

    message: z
        .string()
        .nonempty('Message is required')
        .min(1, 'Message must be at least 10 characters long'),

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
});

export type TicketSchema = z.infer<typeof ticketSchema>;
