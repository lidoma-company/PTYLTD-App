'use client';

import Link from 'next/link';
import api from '@/utils/api';
import useCustomQuery from '@/utils/api/hooks/useCustomQuery';
import Skeleton from '../Skeleton';

// ۱. انتقال اسکلتون‌ها به بیرون کامپوننت اصلی برای جلوگیری از Re-render
const CategorySkeleton = () => (
    <div className='space-y-2'>
        <Skeleton classname='h-10 w-full rounded-lg' />
        <div className='pl-4 space-y-2'>
            <Skeleton classname='h-8 w-[90%] rounded-md' />
            <Skeleton classname='h-8 w-[85%] rounded-md' />
        </div>
    </div>
);

const MenuSkeleton = ({ count = 1 }: { count?: number }) => (
    <div className='space-y-3 p-2'>
        {Array.from({ length: count }).map((_, index) => (
            <CategorySkeleton key={index} />
        ))}
    </div>
);

const SidebarVideoMenu = () => {
    const { data, isLoading } = useCustomQuery({
        queryKey: ['VIDEO_CATEGORIES'],
        queryFn: () => api.videoCategory.getAll(),
    });

    const categories = data || [];

    return (
        <ul className='menu rounded-box !p-0 mt-5'>
            <li>
                <details>
                    <summary className='font-medium cursor-pointer'>
                        <Link href='/videos' onClick={(e) => e.stopPropagation()}>
                            Videos
                        </Link>
                    </summary>

                    <ul className='flex flex-col gap-1 mt-2 pl-4'>
                        {isLoading ? (
                            <MenuSkeleton count={1} />
                        ) : categories.length === 0 ? (
                            <li className='p-2 text-sm text-gray-500'>
                                No Category Found!
                            </li>
                        ) : (
                            categories.map((item) => (
                                <li key={item.id}>
                                    <Link
                                        href={{
                                            pathname: '/videos/all',
                                            query: {
                                                video_category: item.id.toString(),
                                            },
                                        }}
                                        className='text-sm block py-1.5 px-2 hover:bg-gray-100 rounded-md'
                                    >
                                        {item.category}
                                    </Link>
                                </li>
                            ))
                        )}
                    </ul>
                </details>
            </li>
        </ul>
    );
};

export default SidebarVideoMenu;