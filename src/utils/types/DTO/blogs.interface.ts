import { Seo } from './add-seo.interface';
import { Note } from './notes.interface';
import { SchemaDetail } from './schema.interface';
import { ChildCategoryElement } from './single-blog.interface';

export interface Blogs {
    blogs: Blog[];
    currentpage: number;
    total: number;
}
export interface SingleBlogRes {
    blog: Blog;
    statusBookmark: boolean;
    statusNote: Note;
    statusAuth: string;
}

export interface Blog extends Seo {
    id: number;
    title: string;
    alias_title: string;
    description: string;
    main_category: any;
    image: string;
    attached: string,
    alt: string;
    content: string;
    is_trend: number;
    is_editor_pick: number;
    is_auth: number;
    created_at: string;
    child_categories: ChildCategoryElement[];
    updated_at: Date;
    user: User;
    schema: SchemaDetail[];
}

export interface User {
    id: number;
    first_name: string;
    last_name: string;
}
