import { Inter, Rowdies } from 'next/font/google';

export const inter = Inter({
    display: 'swap',
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-inter',
    // font for texts
});

export const rowdies = Rowdies({
    display: 'swap',
    subsets: ['latin'],
    weight: ['300', '400', '700'],
    variable: '--font-rowdies',
    // font for titles
});
