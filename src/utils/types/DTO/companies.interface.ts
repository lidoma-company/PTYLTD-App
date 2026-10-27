export interface CompanyData {
    id: number;
    title: string;
    alias_title: string;
    field: string;
    asx_code: string;
    market_cap: string;
    dividend_per_share: string;
    dividend_yield: string;
    created_at: Date;
    updated_at: Date;
    blogs: Blog[];
    content?: any
}

export interface Blog {
    id: number;
    user_id: number;
    title: string;
    alias_title: string;
    description: string;
    image: string;
    created_at: Date;
    pivot: Pivot;
    user: User;
}

export interface Pivot {
    company_id: number;
    blog_id: number;
}

export interface User {
    id: number;
    first_name: string;
    last_name: string;
}
