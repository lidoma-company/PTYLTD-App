import { Seo } from './add-seo.interface';
import { Blog } from './blogs.interface';
import { Category } from './categories.interface';

export interface CategoryData {
    category: Category;
    blogs: Blog[];
    current: number;
    total: number;
}

export interface SingleCategory {
    id: number;
    category: string;
    alias_category: string;
    created_at: string;
    updated_at: string;
    schema: any[];
    seo?: Seo | null;
}
