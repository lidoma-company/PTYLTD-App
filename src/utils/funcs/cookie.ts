export async function setCookieAction(
    name: string,
    value: string,
    options?: any,
) {
    if (typeof window !== 'undefined') {
        localStorage.setItem(name, encodeURIComponent(value));
    }
    return { success: true };
}

export async function getCookieAction(name: string) {
    if (typeof window === 'undefined') {
        return { value: null };
    }

    const item = localStorage.getItem(name);

    if (!item) {
        return { value: null };
    }

    return {
        value: decodeURIComponent(item),
    };
}

export async function deleteCookieAction(name: string) {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(name);
    }
    return { success: true };
}
