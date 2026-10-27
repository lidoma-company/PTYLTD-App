'use client';
import api from '@/utils/api';
import useCustomQuery from '@/utils/api/hooks/useCustomQuery';
import { MenuCategory } from '@/utils/types/DTO/menu-categories.interface';
import './style.css';
import Link from 'next/link';
import Skeleton from '../Skeleton';

const SidebarMenu = () => {
    const { data, isLoading } = useCustomQuery<MenuCategory[]>({
        queryKey: ['GET_MENU_CATEGORIES'],
        queryFn: () => api.menuCategories.getAll(),
    });

    // 🎭 Skeleton برای یک دسته‌بندی
    const CategorySkeleton = () => (
        <div className='space-y-2'>
            <Skeleton classname='h-10 w-full rounded-lg' />
            <div className='pl-4 space-y-2'>
                <Skeleton classname='h-8 w-[90%] rounded-md' />
                <Skeleton classname='h-8 w-[85%] rounded-md' />
                <div className='pl-4 space-y-1'>
                    <Skeleton classname='h-6 w-[80%] rounded-sm' />
                    <Skeleton classname='h-6 w-[75%] rounded-sm' />
                </div>
            </div>
        </div>
    );

    // 🎨 کامپوننت اصلی Skeleton
    const MenuSkeleton = ({ count = 1 }) => {
        return (
            <div className='space-y-3 p-2'>
                {Array.from({ length: count }).map((_, index) => (
                    <CategorySkeleton key={index} />
                ))}
            </div>
        );
    };

    const RenderCategories = () => {
        if (!data || data.length === 0) {
            return (
                <li className='p-4 text-center text-gray-500'>
                    No Category Found!
                </li>
            );
        }

        return (
            <>
                {data.map((item) => (
                    <li key={item.id}>
                        <details>
                            <summary>
                                <Link href={`/${item.alias_category}`}>
                                    {item.category}
                                </Link>
                            </summary>
                            <ul className='flex flex-col'>
                                {item?.sub_categories.map((sub) => (
                                    <li key={sub.id}>
                                        <details>
                                            <summary>
                                                <Link
                                                    href={`/category/${sub.alias_sub_category}`}
                                                >
                                                    {sub.sub_category}
                                                </Link>
                                            </summary>
                                            <ul className='flex flex-col'>
                                                {sub.child_categories.map(
                                                    (child) => (
                                                        <li key={child.id}>
                                                            <Link
                                                                href={`/category/child/${child.alias_child_category}`}
                                                            >
                                                                {
                                                                    child.child_category
                                                                }
                                                            </Link>
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </details>
                                    </li>
                                ))}
                            </ul>
                        </details>
                    </li>
                ))}
            </>
        );
    };

    return (
        <ul className='menu rounded-box !p-0'>
            <li>
                <details>
                    <summary>Insights</summary>
                    <ul className='flex flex-col'>
                        {isLoading ? (
                            <MenuSkeleton count={1} />
                        ) : (
                            <RenderCategories />
                        )}
                    </ul>
                </details>
            </li>
        </ul>
    );
};

export default SidebarMenu;
