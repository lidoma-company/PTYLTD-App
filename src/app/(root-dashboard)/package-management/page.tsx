'use client';

import { rowdies } from 'fonts';
import PackageCard from '../_components/PackageCard';
import Calendar from '%/clarity_date-solid.svg';
import api from '@/utils/api';
import useCustomQuery from '@/utils/api/hooks/useCustomQuery';
import { GetMeResponse } from '@/utils/types/DTO/get-me.interface';
import Image from 'next/image';
import Button from '@/components/Button';
import Link from 'next/link';
import Loading from '@/components/Loading';

const Page = () => {
    const { data, isLoading } = useCustomQuery<GetMeResponse>({
        queryFn: () => api.auth.getMe(),
        queryKey: ['GET_ME'],
    });

    if (isLoading)
        return (
            <div className='flex items-center justify-center h-40'>
                <Loading theme='secondary' size='lg' />
            </div>
        );

    return (
        <div className='py-8'>
            <div className='flex justify-center relative'>
                <PackageCard
                    userPackage={{
                        package: data?.package.package ?? '',
                        id: data?.package.id ?? 0,
                    }}
                />
                <div className='absolute h-0.5 rounded-full bottom-1/2 translate-y-1/2 z-0 left-0 right-0 bg-secondary/50'></div>
            </div>

            <div className='grid grid-cols-1 mx-auto lg:grid-cols-2 gap-16 mt-16 justify-items-center'>
                <div className='h-49 w-full lg:w-[449px]  px-9 py-11 rounded-20 flex items-center justify-center border border-gray-300 shadow bg-white overflow-hidden'>
                    <div className='z-10 flex flex-col justify-center items-center'>
                        <Calendar />
                        <p
                            className={`${rowdies.className} mt-6 text-primary-9 lg:z-10  font-black text-xl whitespace-nowrap`}
                        >
                            Purchase Date:{' '}
                            <span className='text-secondary'>
                                {new Date(
                                    data?.package.created_at as any,
                                ).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </span>
                        </p>
                    </div>
                </div>
                <div className='h-49 w-full lg:w-[449px]  px-9 py-11 rounded-20 flex items-center justify-center border border-gray-300 shadow bg-white overflow-hidden'>
                    <div className='z-10 flex flex-col justify-center items-center'>
                        <Calendar />
                        <p
                            className={`${rowdies.className} mt-6 text-primary-9 lg:z-10  font-black text-xl whitespace-nowrap`}
                        >
                            Registered on:{' '}
                            <span className='text-secondary'>
                                {new Date(
                                    data?.user.created_at as any,
                                ).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </span>
                        </p>
                    </div>
                </div>
                <div className='h-49 w-full lg:w-[449px]  px-9 py-11 rounded-20 flex items-center justify-center border border-gray-300 shadow bg-white overflow-hidden'>
                    <div className='z-10 flex flex-col justify-center items-center'>
                        <Calendar />
                        <p
                            className={`${rowdies.className} mt-6 text-primary-9 lg:z-10  font-black text-xl whitespace-nowrap`}
                        >
                            Valid until :{' '}
                            <span className='text-secondary'>
                                {new Date(
                                    ((data?.package.expired_at as any) *
                                        1000) as any,
                                ).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </span>
                        </p>
                    </div>
                </div>

                {data?.package.package !== 'Premium' && (
                    <div className='relative overflow-hidden h-48 w-full lg:w-[449px] px-9 py-11 rounded-3xl bg-gradient-to-r z-[1] flex items-center justify-center gap-8 from-primary-2 via-primary-1 via-50% to-primary-3'>
                        <div className='flex flex-col items-center'>
                            <Image
                                alt='PTYLTD'
                                src={`/images/standard.gif`}
                                width={85}
                                height={85}
                                className={`h-[85px] w-[85px] shrink-0`}
                            />

                            <p
                                className={`${rowdies.className} block text-primary-9 font-bold whitespace-nowrap relative z-10`}
                            >
                                You Can Upgrade your account to Premium
                            </p>

                            <Link href={'/pricing'} className='mt-4'>
                                <Button
                                    variant='outline'
                                    isAnimated
                                    className='border-none'
                                >
                                    upgrade account
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
