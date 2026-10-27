'use client';
import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import VerticalText from '../VerticalText';

const ClientAuthContent = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const imageSrc =
        pathname === '/sign-up'
            ? '/images/signup-image.png'
            : '/images/login-image.png';

    return (
        <div className='md:container grid grid-cols-12 gap-x-8 py-6 h-screen mx-auto items-center'>
            <div className='col-span-full lg:col-span-6 md:px-10 px-6 flex flex-col justify-center'>
                <Link href={'/'} className='w-fit mb-10'>
                    <Image
                        src={'/images/logo-dark.png'}
                        width={217}
                        height={95}
                        alt=''
                    />
                </Link>
                {children}
                <div className='md:flex hidden'>
                    <VerticalText />
                </div>
            </div>
            <div className='col-span-6 hidden lg:block aspect-3/4 max-h-[calc(100vh-8rem)]'>
                <Image
                    alt=''
                    src={imageSrc}
                    className='size-full rounded-[3.25rem]'
                    width={1000}
                    height={1000}
                />
            </div>
        </div>
    );
};

export default ClientAuthContent;
