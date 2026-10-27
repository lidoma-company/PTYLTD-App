const EXPIRES_IN_MS = 14 * 24 * 60 * 60 * 1000; // 14 days in milliseconds

export function generateAccessToken(payload: any) {
    try {
        const dataWithExpiry = {
            payload,
            exp: Date.now() + EXPIRES_IN_MS,
        };
        return JSON.stringify(dataWithExpiry);
    } catch (error) {
        console.error('Error generating token:', error);
        return '';
    }
}

export function verifyAccessToken(token: string) {
    try {
        if (!token) return null;

        const parsed = JSON.parse(token);

        // بررسی تاریخ انقضا (۱۴ روز)
        if (parsed.exp && Date.now() > parsed.exp) {
            return null;
        }

        return parsed.payload ?? parsed;
    } catch (error: any) {
        console.error('Error verifying token:', error.message);
        return null;
    }
}
