export type PopupType = 'PROMOTION' | 'PROMOTION_WITH_FORM' | 'DEFAULT';

export interface PopupData {
    id: number;
    description: string;
    image: string;
    attached: string;
}

/** Values of the fixed lead form that lives inside the popup. */
export interface PopupFormValues {
    first_name: string;
    last_name: string;
    email: string;
    zip_code: string;
    mobile_number: string;
}
