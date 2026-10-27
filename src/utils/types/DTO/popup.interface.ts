import { z } from 'zod';

export const addPopupSchema = z.object({
    description: z.string(),
    image: z.instanceof(File),
    attached: z.instanceof(File),
});

export type AddPopupType = z.infer<typeof addPopupSchema>;

export const editPopupSchema = addPopupSchema.partial();

export type EditPopupType = z.infer<typeof editPopupSchema>;

export interface GetPopupRequestType {
    id: number;
    description: string;
    image: string;
    attached: string;
}
