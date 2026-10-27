export interface AddSeo {
    targetable_type?: string;
    targetable_id?: number;
    meta_title: string;
    meta_description: string;
    canonical?: string;
    index: boolean;
}

export interface Seo {
    seo: {
        canonical: string;
        created_at: string;
        id: number;
        index: number;
        meta_description: string;
        meta_title: string;
        targetable_id: number;
        targetable_type: string;
        updated_at: string;
        image?: string
    };
}

export interface EditSeo extends AddSeo {
    id: number;
}
