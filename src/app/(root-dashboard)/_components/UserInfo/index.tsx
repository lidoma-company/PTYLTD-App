import React from 'react';
import Mail from '%/email-info.svg';
import Diamond from '%/diamond.svg';
import { GetMeResponse } from '@/utils/types/DTO/get-me.interface';
const UserInfo = ({ data }: { data: GetMeResponse }) => {
    return (
        <div className='bg-white border border-primary-1 rounded-2xl w-50 h-20 absolute top-14 right-0 opacity-0 group-hover:opacity-100 duration-200 invisible group-hover:visible z-50'>
            <div className='flex p-2 border-b border-b-netural-2 items-center gap-x-2'>
                <Mail />
                <p className='text-sm'>{data?.user?.email}</p>
            </div>

            <div className='flex p-2 items-center gap-x-2'>
                <Diamond />
                <p className='text-sm'>{data?.package?.package}</p>
            </div>
        </div>
    );
};

export default UserInfo;
