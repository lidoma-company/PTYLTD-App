'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Logout from '%/logout.svg';
import { rowdies } from 'fonts';
import { showModal } from '@/utils/funcs/modal';
import LogoutModal from '../Logout/LogoutModal';
import { usePathname } from 'next/navigation';
import { sidebarItemType } from '@/utils/constants/dashboard';

const Sidebar = ({ links }: { links: sidebarItemType[] }) => {
    const sidebarIconClassname =
        'group-hover:[&>path]:fill-white transition-colors duration-300';
    const pathname = usePathname();

    return (
        <div className='bg-netural-5 sticky inset-s-0 top-5  bottom-5 w-3xs p-5 rounded-20 shrink-0 xl:flex flex-col hidden'>
            <Link href={'/'}>
                <Image
                    src={'/images/logo-dark.png'}
                    alt='PTYLTD'
                    width={175}
                    height={66}
                />
            </Link>

            <hr className='border-primary-1 mt-4' />

            <div className='flex flex-col overflow-y-auto no-scrollbar mt-7 gap-y-2 flex-1'>
                {links.map((item) => (
                    <Link
                        key={item.title + item.href}
                        href={item.href}
                        className={`w-full flex items-center gap-1 py-4 px-2.5 rounded-10 hover:bg-primary hover:text-white group transition-colors duration-300 font-light ${pathname == item.href && 'bg-primary text-white [&>svg>path]:fill-white'}`}
                    >
                        {item.icon}
                        <span
                            className={`transition-colors duration-300 ${rowdies.className}`}
                        >
                            {item.title}
                        </span>
                    </Link>
                ))}
            </div>

            <div
                onClick={() => showModal('logout-modal')}
                className={`w-full flex items-center gap-1 py-4 px-2.5 rounded-10 hover:bg-primary hover:text-white group transition-colors duration-300 font-light cursor-pointer`}
            >
                <Logout className={sidebarIconClassname} />
                <span
                    className={`transition-colors duration-300 ${rowdies.className}`}
                >
                    logout
                </span>
            </div>
            <LogoutModal />
        </div>
    );
};

export default Sidebar;
