export interface Redirect {
    id: number;
    origin: string;
    destination: string;
    status_code: number;
    created_at: string;
    updated_at: string;
}

export interface AddRedirect {
    origin: string;
    destination: string;
    status_code: number;
}

export interface EditRedirect extends AddRedirect{
    id: number
}

