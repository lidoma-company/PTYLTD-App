import { Blog } from './blogs.interface';

export interface Note {
    id: number;
    user_id: number;
    blog_id: number;
    note: string;
    created_at: string;
    blog: Blog;
}

export interface User {
    id: number;
    first_name: string;
    last_name: string;
}
