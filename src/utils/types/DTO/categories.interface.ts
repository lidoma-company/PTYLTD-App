import { Seo } from './add-seo.interface';

export interface Category {
    id: number;
    category: string;
    alias_category: string;
    seo?: any;
    schema: any;
    content: string;
    display_title: string
}
