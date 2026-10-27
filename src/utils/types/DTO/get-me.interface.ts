export interface GetMeResponse {
    user: DataUser;
    package: Package;
    totalPayments: number;
    lastReports: LastReport[];
}

export interface LastReport {
    id: number;
    company_id: number;
    user_id: number;
    title: string;
    alias_title: string;
    description: string;
    content: string;
    image: string;
    type: string;
    created_at: Date;
    updated_at: Date;
    user: LastReportUser;
    company: Company;
}

export interface Company {
    id: number;
    title: string;
    alias_title: string;
    asx_code: string;
    field: string;
}

export interface LastReportUser {
    id: number;
    first_name: string;
    last_name: string;
}

export interface Package {
    id: number;
    package: string;
    expired_at: number;
    type: string;
    created_at: string;
}

export interface DataUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    email_verified_at: Date;
    mobile_number: null;
    is_admin: number;
    is_writer: number;
    active: number;
    created_at: Date;
    updated_at: Date;
}
