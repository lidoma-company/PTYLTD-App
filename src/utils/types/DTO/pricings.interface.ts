export interface PricingResponse {
    pricings: Price[];
    activePackage: null | object;
}

export interface Price {
    id: number;
    package: string;
    created_at: Date;
    updated_at: Date;
    isbuy: boolean;
    isupgrade: boolean;
    prices?: PriceItem[];
}

export interface SinglePrice extends Price {
    prices: PriceItem[];
}
export interface PriceItem {
    id: number;
    price_id: number;
    type: string;
    price: string;
    discount: number;
    note: string;
    created_at: null;
    updated_at: null;
}
