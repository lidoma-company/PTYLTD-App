export interface PastInvestment {
    id: number;
    company_id: number;
    portfolio: string;
    risk: string;
    initiation_of_coverage: string;
    termination_of_coverage: string;
    buy_price: string;
    sell_price: string;
    return: number;
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
