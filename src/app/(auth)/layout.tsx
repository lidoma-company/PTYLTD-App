import React from 'react';
import ClientAuthContent from './_components/ClientAuthContent';

export const metadata = {
    robots: {
        index: false,
        follow: false,
    },
    title: 'Authentication',
    description: 'Login & Sign Up pages',
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return <ClientAuthContent>{children}</ClientAuthContent>;
};

export default AuthLayout;
