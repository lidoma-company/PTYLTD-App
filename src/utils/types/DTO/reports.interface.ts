export interface AdminReport {
    id: number;
    company_id: number;
    user_id: number;
    title: string;
    alias_title: string;
    description: string;
    content: string;
    type: string;
    created_at: string;
    updated_at: Date;
    user: User;
    company: Company;
}

export interface Company {
    id: number;
    title: string;
    alias_title: string;
    asx_code: string;
    field: string;
}

export interface User {
    id: number;
    first_name: string;
    last_name: string;
}

export type RiskTypes = 'High' | 'Medium' | 'Low';
export type RecommendationTypes = 'Sell' | 'Buy' | 'Hold';
export type PortfolioTypes = 'Dividend' | 'Growth';
