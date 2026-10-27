import { Seo } from './add-seo.interface';

interface User {
    id: number;
    first_name: string;
    last_name: string;
}

interface Blog {
    id: number;
    user_id: number;
    title: string;
    alias_title: string;
    description: string;
    image: string;
    alt: string;
    content: string;
    is_trend: number; // 0 or 1 (use boolean if applicable)
    is_editor_pick: number; // 0 or 1
    is_auth: number; // 0 or 1
    created_at: string; // ISO timestamp
    updated_at: string; // ISO timestamp
    user: User;
}

interface Category {
    id: number;
    category: string;
    alias_category: string;
    created_at: string;
    updated_at: string;
}

export interface SubCategory {
    id: number;
    sub_category: string;
    display_title?: string;
    alias_sub_category: string;
    content: string;
    category: {
        id: number;
        category: string;
        alias_category: string;
        created_at: string;
        updated_at: string;
    };
    seo?: {
        canonical: string;
        created_at: string;
        id: number;
        index: number;
        meta_description: string;
        meta_title: string;
        targetable_id: number;
        targetable_type: string;
        updated_at: string;
        image?: string;
    };
    schema: any;
    created_at: string;
    updated_at: string;
}

export interface SubCategoryData {
    subCategory: SubCategory;
    blogs: Blog[];
    total: number;
    current: number;
}
