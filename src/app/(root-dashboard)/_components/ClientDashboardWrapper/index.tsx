'use client';
import { useRouter } from 'next/navigation';
import ClientSidebarHeader from '../ClientSidebarHeader';
import useCustomQuery from '@/utils/api/hooks/useCustomQuery';
import { GetMeResponse } from '@/utils/types/DTO/get-me.interface';
import api from '@/utils/api';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getCookieAction } from '@/utils/funcs/cookie';
import { verifyAccessToken } from '@/utils/funcs/auth';
import Spinner from '@/app/loading';

const ClientDashboardWrapper = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const router = useRouter();
    const [isAuthChecked, setIsAuthChecked] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const token = (await getCookieAction('token')).value;
            const accessToken = (await getCookieAction('access_token')).value;

            if (!token || !accessToken) {
                router.replace('/login');
                return;
            }

            const isValid = verifyAccessToken(accessToken);
            if (!isValid) {
                router.replace('/login');
                return;
            }

            setIsAuthChecked(true);
        };

        checkAuth();
    }, [router]);

    const { data, isLoading, isError } = useCustomQuery<GetMeResponse>({
        queryFn: () => api.auth.getMe(),
        queryKey: ['GET_ME'],
        enabled: isAuthChecked,
    });

    useEffect(() => {
        if (isError) {
            router.replace('/login');
            return;
        }

        if (
            isAuthChecked &&
            !isLoading &&
            data &&
            !data.package &&
            !data.user.is_writer
        ) {
            toast.info('Access Unauthorized');
            router.replace('/');
        }
    }, [data, isLoading, isError, isAuthChecked, router]);

    if (!isAuthChecked) {
        return <Spinner />;
    }

    return (
        <div className='min-h-screen lg:h-screen lg:overflow-y-hidden p-5 lg:pe-0 bg-white'>
            <div className='flex relative h-full gap-x-5'>
                <ClientSidebarHeader>{children}</ClientSidebarHeader>
            </div>
        </div>
    );
};

export default ClientDashboardWrapper;
