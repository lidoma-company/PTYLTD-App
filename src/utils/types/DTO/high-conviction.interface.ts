export interface HighConviction {
    id: number;
    company_id: number;
    portfolio: string;
    risk: string;
    buy_below: string;
    sell_above: string;
    upside_potential: string;
    created_at: Date;
    updated_at: Date;
    company: Company;
}

export interface Company {
    id: number;
    title: string;
    alias_title: string;
    asx_code: string;
    field: string;
}
