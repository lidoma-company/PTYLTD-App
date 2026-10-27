'use client';
import { userDashboardSidebar } from '@/utils/constants/dashboard';
import React from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';

const ClientSidebarHeader = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Sidebar links={userDashboardSidebar} />
            <div className='flex flex-col w-full'>
                <Header links={userDashboardSidebar} />
                <div className='bg-netural-4 p-5 rounded-20 lg:overflow-y-auto h-full mt-5'>
                    {children}
                </div>
            </div>
        </>
    );
};

export default ClientSidebarHeader;
