export interface Notification {
    id: string;
    read_at: string | null;
    data: {
        type: string;
        message: string;
    };
}