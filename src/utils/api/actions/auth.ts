import { baseURL } from '@/utils/constants/global';
import { generateAccessToken, verifyAccessToken } from '@/utils/funcs/auth';
import { getCookieAction, setCookieAction } from '@/utils/funcs/cookie';
import { DataUser, GetMeResponse } from '@/utils/types/DTO/get-me.interface';
import { Success } from '@/utils/types/DTO/http-success-interface';

export async function getMeAction() {
    let result = false;
    try {
        const tokenObj = await getCookieAction('token');
        const response = await fetch(`${baseURL}/dashboard`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tokenObj.value}`,
            },
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        const data = (await response.json()) as Success<GetMeResponse>;
        const accessToken = generateAccessToken(data.data.user);
        await setCookieAction('access_token', accessToken as string, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 14,
        });
        result = true;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
    return result;
}

export async function verifyMeAction() {
    try {
        const tokenData = await getCookieAction('access_token');
        if (!tokenData.value) {
            return false;
        }
        const payload = verifyAccessToken(tokenData.value) as DataUser;
        return payload;
    } catch (error) {
        console.error('Error verifying access token:', error);
        return false;
    }
}
