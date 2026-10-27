import { baseURL } from '@/utils/constants/global';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

export interface ApiFetchOptions extends RequestInit {
    next?: {
        revalidate?: number | false;
        tags?: string[];
    };
    cache?:
        | 'force-cache'
        | 'no-store'
        | 'default'
        | 'reload'
        | 'no-cache'
        | 'only-if-cached';

    authenticated?: boolean;
    skipApiKey?: boolean;
    logResponse?: boolean;
    handle404?: boolean;
}

export async function apiFetch<T = unknown>(
    path: string,
    options: ApiFetchOptions = {},
): Promise<T> {
    // const url = path.startsWith('http') ? path : `${baseURL}${path}`;
    const url = `${baseURL}${path}`;
    const headers = new Headers(options.headers || {});

    if (options.authenticated) {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        if (token) headers.set('Authorization', `Bearer ${token}`);
    }

    const { next, cache, ...restOptions } = options;

    let computedCache: RequestCache | undefined = cache;

    if (!computedCache) {
        if (next?.revalidate) {
            computedCache = undefined;
        } else {
            computedCache = 'no-store';
        }
    }

    const finalOptions: RequestInit & {
        next?: ApiFetchOptions['next'];
    } = {
        ...restOptions,
        headers,
        next,
        cache: computedCache,
    };

    const response = await fetch(url, finalOptions);

    if (response.status === 404 && options.handle404 !== false) {
        notFound();
    }

    if (!response.ok) {
        const text = await response.text().catch(() => response.statusText);
        throw new Error(
            `[apiFetch] ❌ ${response.status} ${response.statusText}\n${text}`,
        );
    }

    if (options.logResponse) {
        console.log(`[apiFetch] ✅ ${path}`, response.status);
    }

    if (response.status === 204) return null as T;

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return (await response.json()) as T;
    }

    return (await response.text()) as T;
}
