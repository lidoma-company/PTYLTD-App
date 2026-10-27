'use client';
import React from 'react';
import NotificationItem from '../_components/Notifications/NotificationItem';
import Button from '@/components/Button';
import Tick from '%/tick.svg';
import useCustomQuery from '@/utils/api/hooks/useCustomQuery';
import api from '@/utils/api';
import { Notification } from '@/utils/types/DTO/notifications.interface';
import Spinner from '@/app/loading';
const Page = () => {
    const { data, isLoading } = useCustomQuery<Notification[]>({
        queryFn: () => api.notifications.getAll(),
        queryKey: ['NOTIFICATIONS'],
    });
    if (isLoading) {
        return <Spinner />;
    }
    if (!data || data.length === 0) {
        return (
            <p className='text-center py-10'>
                You have no notifications at the moment. Check back later!
            </p>
        );
    }

    return (
        <div className='space-y-6'>
            <div className='max-w-5xl mx-auto'>
                <Button
                    theme='success'
                    variant='outline'
                    className='rounded-full group'
                >
                    Read All
                    <Tick className='group-hover:[&>g>path]:fill-success-content' />
                </Button>
            </div>
            {data?.map((item) => (
                <NotificationItem key={item.id} {...item} />
            ))}
        </div>
    );
};

export default Page;
