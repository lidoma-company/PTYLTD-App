const isProduction = process.env.NODE_ENV === 'production';

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
// export const baseURL = isProduction
//     ? process.env.NEXT_PUBLIC_BASE_URL
//     : 'http://192.168.100.205:8008/api';
export const frontBaseURL = isProduction
    ? process.env.NEXT_PUBLIC_FRONT_BASE_URL
    : 'http://localhost:3000';
