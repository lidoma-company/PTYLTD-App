export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
}
export interface Ticket {
    id: number;
    user_id: number;
    title: string;
    description: string;
    status: string;
    status_time: string;
    created_at: string;
    updated_at: Date;
    user: User;
}

export interface SingleTicket {
    id: number;
    user_id: number;
    title: string;
    description: string;
    status: string;
    created_at: Date;
    updated_at: Date;
    messages: Message[];
    user: User
}

export interface Message {
    id: number;
    ticket_id: number;
    message?: string;
    image?: string;
    answer?: string;
    answer_image?: string;
    created_at: Date;
    updated_at: Date;
}
