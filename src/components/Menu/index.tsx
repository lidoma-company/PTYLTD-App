'use client';
import api from '@/utils/api';
import useCustomQuery from '@/utils/api/hooks/useCustomQuery';
import { MenuCategory } from '@/utils/types/DTO/menu-categories.interface';
import { useEffect, useState } from 'react';
import Skeleton from '../Skeleton';
import './style.css';
import Link from 'next/link';
const Menu = () => {
    const { data, isLoading } = useCustomQuery<MenuCategory[]>({
        queryKey: ['GET_MENU_CATEGORIES'],
        queryFn: () => api.menuCategories.getAll(),
    });
    const [activeCategory, setActiveCategory] = useState<number | null>(null);

    useEffect(() => {
        if (!data || data.length === 0) return;
        setActiveCategory(data[0].id);
    }, [data]);

    return (
        <div className='menu menu-horizontal menu-bg rounded-box  lg:min-w-5xl'>
            <div
                className="flex items-center justify-between w-full pt-3 pb-4
  [&>*+*]:relative
  [&>*+*]:before:content-['']
  [&>*+*]:before:absolute
  [&>*+*]:before:left-0
  [&>*+*]:before:top-0
  [&>*+*]:before:bottom-0
  [&>*+*]:before:w-px
  [&>*+*]:before:bg-gradient-to-b
  [&>*+*]:before:from-transparent
  [&>*+*]:before:via-white
  [&>*+*]:before:to-transparent"
            >
                {isLoading &&
                    Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            classname='w-1/4 h-8 mx-4 bg-white/10'
                        />
                    ))}
                {!isLoading &&
                    data?.map((item) => (
                        <Link
                            href={`/${item.alias_category}`}
                            key={item.id}
                            onMouseOver={() => setActiveCategory(item.id)}
                            className={`font-semibold  rounded-e-none text-white text-center flex-1 whitespace-nowrap px-4 ${activeCategory === item.id ? '!text-[#a57d61]' : 'text-white'}`}
                        >
                            {item.category}
                        </Link>
                    ))}
            </div>
            <div className='h-0.5 block w-full bg-gradient-to-r from-transparent via-white to-transparent via-50%' />

            <div className="flex items-center w-full p-4 [&>*+*]:relative [&>*+*]:before:content-[''] [&>*+*]:before:absolute [&>*+*]:before:left-0 [&>*+*]:before:top-0 [&>*+*]:before:bottom-0 [&>*+*]:before:w-px [&>*+*]:before:bg-gradient-to-b [&>*+*]:before:from-transparent [&>*+*]:before:via-white [&>*+*]:before:to-transparent gap-x-4">
                {isLoading && (
                    <>
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className='p-4 flex-1'>
                                <Skeleton classname='w-24 h-5 mb-4 bg-white/10' />
                                <ul className='space-y-2'>
                                    {Array.from({ length: 4 }).map((_, j) => (
                                        <Skeleton
                                            key={j}
                                            classname='w-32 h-4 bg-white/10'
                                        />
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </>
                )}
                {!isLoading &&
                    activeCategory &&
                    data
                        ?.find((category) => category.id === activeCategory)
                        ?.sub_categories.map((sub) => (
                            <div key={sub.id} className='mb-auto px-4 h-full '>
                                {sub.sub_category.includes('Free Trial') ? (
                                    <Link
                                        href={`/sign-up`}
                                        className='text-lg mb-4 whitespace-nowrap'
                                    >
                                        {sub.sub_category}
                                    </Link>
                                ) : (
                                    <Link
                                        href={`/category/${sub.alias_sub_category}`}
                                        className='text-lg mb-4 whitespace-nowrap'
                                    >
                                        {sub.sub_category}
                                    </Link>
                                )}

                                <ul className='desktop !mt-4'>
                                    {sub.child_categories.map((child) => (
                                        <li
                                            key={child.id}
                                            className='font-light desktop'
                                        >
                                            {child.child_category.includes(
                                                'Free Trial',
                                            ) ? (
                                                <Link
                                                    href={`/sign-up`}
                                                    className='whitespace-nowrap desktop'
                                                >
                                                    {child.child_category}
                                                </Link>
                                            ) : (
                                                <Link
                                                    href={`/category/child/${child.alias_child_category}`}
                                                    className='whitespace-nowrap desktop'
                                                >
                                                    {child.child_category}
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
            </div>
        </div>
    );
};

export default Menu;
