'use client';

import Skeleton from '@/components/Skeleton';
import api from '@/utils/api';
import useCustomQuery from '@/utils/api/hooks/useCustomQuery';
import { GetMeResponse } from '@/utils/types/DTO/get-me.interface';
import { rowdies } from 'fonts';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import PackageCard from './_components/PackageCard';
import ReportBox from './reports/company/detail/_components/ReportBox';
import './style.css';

const Page = () => {
    const router = useRouter();

    const { data, isLoading } = useCustomQuery<GetMeResponse>({
        queryFn: () => api.auth.getMe(),
        queryKey: ['GET_ME'],
    });

    useEffect(() => {
        if (!isLoading && data && !data.package && !data.user.is_writer) {
            toast.info(
                'You need a Standard or Premium membership to get access to the Dashboard',
            );
            router.replace('/');
        }
    }, [data, isLoading, router]);

    if (!isLoading && data && !data.package) {
        return null;
    }

    return (
        <div>
            <div className='flex items-center flex-col gap-6 lg:flex-row w-full gap-x-[100px]'>
                {isLoading && (
                    <>
                        <Skeleton classname='h-48 w-full lg:w-[449px] rounded-3xl' />
                        <Skeleton classname='h-48 w-full lg:w-[449px] rounded-3xl' />
                    </>
                )}
                {data?.package && (
                    <>
                        <PackageCard userPackage={data.package} />

                        <div className='h-48 w-full lg:w-[449px] px-9 py-11 rounded-20 flex items-center justify-center border relative border-gray-300 shadow bg-white overflow-hidden'>
                            <div className='z-10'>
                                <p
                                    className={`${rowdies.className} text-primary-9 lg:z-10 font-bold text-[30px] whitespace-nowrap`}
                                >
                                    Total Payment :{' '}
                                    {data.totalPayments.toLocaleString(
                                        'en-US',
                                        {
                                            style: 'currency',
                                            currency: 'USD',
                                            currencyDisplay: 'symbol',
                                        },
                                    )}
                                </p>
                                <p className='text-center mt-2'>
                                    Your membership ends on{' '}
                                    <span className='font-bold text-secondary'>
                                        {new Date(
                                            data.package.expired_at * 1000,
                                        ).toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </span>
                                </p>
                            </div>
                            <div className='absolute bg-[#F4F4F480] -z-0 rounded-full h-[120px] w-[120px] bottom-1 -start-[50px]'></div>
                            <div className='absolute bg-neutral z-0 rounded-full h-[120px] w-[120px] -bottom-12 -start-[50px]'></div>
                            <div className='absolute -bottom-4 -start-4 -z-20'>
                                <Image
                                    height={96}
                                    width={96}
                                    src='/images/dolor.gif'
                                    alt='dolor'
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>

            <hr className='my-10 text-primary-1' />

            <h3 className={`${rowdies.className} text-2xl`}>Last Reports</h3>

            <div className='mt-8 grid grid-cols-1 lg:grid-cols-2 gap-y-8 gap-x-10'>
                {isLoading && (
                    <>
                        <Skeleton classname='w-full h-56 rounded-3xl' />
                        <Skeleton classname='w-full h-56 rounded-3xl' />
                        <Skeleton classname='w-full h-56 rounded-3xl' />
                        <Skeleton classname='w-full h-56 rounded-3xl' />
                    </>
                )}
                {data?.lastReports?.slice(0, 4)?.map((item) => (
                    <ReportBox
                        key={item.id}
                        company={item.company}
                        user_id={item.user_id}
                        id={item.id}
                        type={item.type}
                        updated_at={new Date(item.updated_at)}
                        content={item.content}
                        company_id={item.company_id}
                        alias_title={item.alias_title}
                        user={item.user}
                        created_at={item.created_at.toString()}
                        title={item.title}
                        description={item.description}
                    />
                ))}
            </div>
        </div>
    );
};

export default Page;
