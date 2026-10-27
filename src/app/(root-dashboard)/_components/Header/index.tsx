'use client';
import React from 'react';
import { rowdies } from 'fonts';
import Button from '@/components/Button';
import Notifications from '%/dashboard-notifications.svg';
import Drawer from '../Drawer';
import { usePathname } from 'next/navigation';
import Arrow from '%/arrow-bottom.svg';
import UserInfo from '../UserInfo';
import Link from 'next/link';
import { sidebarItemType } from '@/utils/constants/dashboard';
import { GetMeResponse } from '@/utils/types/DTO/get-me.interface';
import api from '@/utils/api';
import useCustomQuery from '@/utils/api/hooks/useCustomQuery';
import Skeleton from '@/components/Skeleton';
const Header = ({ links }: { links: sidebarItemType[] }) => {
    const { data, isLoading } = useCustomQuery<GetMeResponse>({
        queryFn: () => api.auth.getMe(),
        queryKey: ['GET_ME'],
    });
    const pathname = usePathname();

    const pageHeader = links.find((item) => item.href == pathname)?.title;
    const userRole = 'dashboard';

    return (
        <div className='h-29 border-b border-b-primary-1 items-center pe-5 flex'>
            <Drawer links={links} />
            {pathname !== '/ask-analysts' && (
                <p className={`${rowdies.className} text-2xl`}>{pageHeader}</p>
            )}
            {pathname === '/ask-analysts' && (
                <p className={`${rowdies.className} text-2xl`}>
                    Ask Our Analysts Directly
                </p>
            )}

            {isLoading ? (
                <Skeleton classname='w-40 h-10 ml-auto rounded-sm' />
            ) : (
                <div className='items-center ml-auto gap-x-2 hidden xs:flex relative group cursor-pointer'>
                    <Link href={`/${userRole}/notifications`}>
                        <Button
                            shape='circle'
                            theme='neutral'
                            className='flex items-center justify-center size-11'
                        >
                            <Notifications />
                        </Button>
                    </Link>
                    <p>
                        {data?.user.first_name} {data?.user.last_name}
                    </p>
                    <Arrow className='group-hover:rotate-180 duration-200' />
                    <UserInfo data={data!} />
                </div>
            )}
        </div>
    );
};

export default Header;
