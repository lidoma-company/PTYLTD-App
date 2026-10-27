import { z } from 'zod';

export const createLeadSchema = z.object({
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    email: z.string().email().min(1),
    zip_code: z.string().min(1),
    mobile_number: z.string(),
});

export type CreateLeadType = z.infer<typeof createLeadSchema>;

export interface LeadListItem {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    zip_code: number;
    mobile_number: string;
    created_at: string;
    updated_at: string;
    type: string
}
