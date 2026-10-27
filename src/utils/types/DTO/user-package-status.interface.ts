export interface UserPackageStatus {
    statusUpgrade: boolean;
    difference: number;
    targetPricing: {
        id: number;
        price_id: number;
        type: string;
        price: string;
        discount: string;
        note: string;
        created_at: string;
        updated_at: string;
        pr: {
            id: number;
            package: string;
            created_at: string;
            updated_at: string;
        };
    };
    statusActivePackage: {
        id: number;
        user_id: number;
        payment_id: number;
        package: string;
        type: string;
        amount: string;
        difference: number | null;
        expired_at: number;
        active: 0 | 1;
        created_at: string;
        updated_at: string;
    };
}
