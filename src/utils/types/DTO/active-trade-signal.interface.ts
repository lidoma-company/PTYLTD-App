export interface ActiveTradeSignal {
    id: number;
    company_id: number;
    average_daily_trade_value: string;
    buy_up_to: string;
    take_profit_above: string;
    stop_loss_below: string;
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
