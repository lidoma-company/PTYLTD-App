export interface Dividends {
    id: number;
    company_id: number;
    risk: string;
    recommendation: string;
    created_at: Date;
    updated_at: string;
    company: Company;
}

export interface Company {
    id: number;
    title: string;
    alias_title: string;
    asx_code: string;
    field: string;
}
