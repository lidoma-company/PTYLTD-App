export interface SingleBlogData {
    blog: SingleBlog;
}

export interface SingleBlog {
    id: number;
    user_id: number;
    title: string;
    alias_title: string;
    description: string;
    image: string;
    alt: string;
    content: string;
    is_trend: number;
    is_editor_pick: number;
    is_auth: number;
    created_at: string;
    updated_at: Date;
    child_categories: ChildCategoryElement[];
    companies: CompanyElement[];
    user: User;
}

export interface ChildCategoryElement {
    id: number;
    blog_id: number;
    child_category_id: number;
    created_at: string;
    updated_at: Date;
    child_category: ChildCategory;
}

export interface ChildCategory {
    id: number;
    sub_category_id: number;
    child_category: string;
    alias_child_category: string;
    created_at: string;
    updated_at: Date;
}

export interface CompanyElement {
    id: number;
    blog_id: number;
    company_id: number;
    created_at: string;
    updated_at: Date;
    company: Company;
}

export interface Company {
    id: number;
    alias_title: string;
    asx_code: string;
}

export interface User {
    id: number;
    first_name: string;
    last_name: string;
}
