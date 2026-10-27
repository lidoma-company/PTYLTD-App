export interface ChildCategory {
    id: number;
    sub_category_id: number;
    child_category: string;
    alias_child_category: string;
    created_at: string; // ISO timestamp
    updated_at: string; // ISO timestamp
}

export interface SubCategory {
    id: number;
    category_id: number;
    sub_category: string;
    alias_sub_category: string;
    created_at: string; // ISO timestamp
    updated_at: string; // ISO timestamp
    child_categories: ChildCategory[];
}

export interface MenuCategory {
    id: number;
    category: string;
    alias_category: string;
    created_at: string; // ISO timestamp
    updated_at: string; // ISO timestamp
    sub_categories: SubCategory[];
}
