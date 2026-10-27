import { Seo } from './add-seo.interface';
import { Blog } from './blogs.interface';
import { SchemaDetail } from './schema.interface';

interface Category {
    id: number;
    category: string;
    alias_category: string;
    created_at: string; // ISO timestamp
    updated_at: string; // ISO timestamp
}

interface SubCategory {
    id: number;
    category_id: number;
    sub_category: string;
    alias_sub_category: string;
    created_at: string; // ISO timestamp
    updated_at: string; // ISO timestamp
    category: Category;
}

interface ChildCategory extends Seo {
    id: number;
    sub_category_id: number;
    child_category: string;
    display_title?: string;
    alias_child_category: string;
    created_at: string; // ISO timestamp
    updated_at: string; // ISO timestamp
    sub_category: SubCategory;
    schema: SchemaDetail[];
    content: string;
}

export interface ChildCategoryData {
    childCategory: ChildCategory;
    blogs: Blog[];
    total: number;
    current: number;
}
