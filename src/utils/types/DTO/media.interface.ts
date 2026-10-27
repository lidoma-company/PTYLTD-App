export type MediaItem = {
    id: number;
    media: string;
    created_at: string;
    updated_at: string;
};

export type MediasResponse = {
    medias: MediaItem[];
    current: number;
    total: number;
};
