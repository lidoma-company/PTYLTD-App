export interface Schema {
    targetable_id: string | number;
    targetable_type: string;
    faq_items?: Faq[];
    flag?: string | null;
    schema?: string | null;
}

export interface Faq {
    question: string;
    answer: string;
}

export interface SchemaDetail {
    targetable_id: number;
    targetable_type: string;
    updated_at: string;
    created_at: string;
    flag: string;
    id: number;
    schema: any;
}
