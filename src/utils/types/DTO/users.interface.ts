export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    mobile_number: string;
    zip_code: string | null;
    is_admin: number;
    is_writer: number;
    active: number;
    created_at: string;
    updated_at: string;
    payments_sum_amount: number;
    email_verified_at: string | null;

    packages: UserPackage[];
}
export interface UserPackage {
    created_at: string;
    expired_at: number;
    package: string;
    id: number;
    type: String;
    user_id: number;
}

export interface UserResponse {
    users: User[];
    currentPage: number;
    lastPage: number;
}
