export interface PastTrades {
    id: number;
    company_id: number;
    open_date: string;
    close_date: string;
    buy_price: string;
    sell_price: string;
    return: string;
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
