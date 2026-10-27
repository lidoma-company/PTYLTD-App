import { Seo } from "./add-seo.interface";
import { SchemaDetail } from "./schema.interface";

export interface DashboardLanding extends Seo{
    id: number;
    title: string;
    alias_title: string;
    created_at: string;
    content?: string;
    schema?: SchemaDetail[];
}

export interface singleLanding extends Seo {
    id: number;
    title: string;
    alias_title: string;
    content: string; // HTML content
    created_at: string; // ISO date string
    updated_at: string;
    schema?: SchemaDetail[];
}