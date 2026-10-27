'use client';
import React from 'react';
import Menu from '%/menu.svg';
import Link from 'next/link';
import Image from 'next/image';

import { usePathname } from 'next/navigation';
import { closeDrawer } from '@/utils/funcs/drawer';
import { sidebarItemType } from '@/utils/constants/dashboard';
const Drawer = ({ links }: { links: sidebarItemType[] }) => {
    const pathname = usePathname();
    return (
        <div className='drawer w-fit flex xl:hidden mr-2 z-50'>
            <input
                id='dashboard-drawer'
                type='checkbox'
                className='drawer-toggle'
            />
            <div className='drawer-content'>
                <label
                    htmlFor='dashboard-drawer'
                    className='btn drawer-button btn-neutral px-1'
                >
                    <Menu className='[&>path]:fill-primary' />
                </label>
            </div>
            <div className='drawer-side'>
                <label
                    htmlFor='dashboard-drawer'
                    aria-label='close sidebar'
                    className='drawer-overlay'
                ></label>
                <ul className='menu bg-base-200 text-base-content min-h-full w-60 p-4'>
                    <Link href='/'>
                        <Image
                            src={'/images/logo-dark.png'}
                            alt='PTYLTD'
                            width={175}
                            height={66}
                        />
                    </Link>

                    {links.map((item) => (
                        <Link href={item.href} key={item.href}>
                            <li
                                onClick={() => closeDrawer('dashboard-drawer')}
                                className={`mt-4 p-2 rounded-lg ${pathname === item.href ? 'bg-primary text-white' : ''}`}
                            >
                                {item.title}
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Drawer;
