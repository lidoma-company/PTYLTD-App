'use client';
import Button from '@/components/Button';
import Skeleton from '@/components/Skeleton';
import { formatDate } from '@/utils/funcs/date';
import { Blog } from '@/utils/types/DTO/blogs.interface';
import { rowdies } from 'fonts';
import Image from 'next/image';
import Link from 'next/link';

const DashboardBlogBox = ({ blog }: { blog: Blog }) => {

    const formattedTitle = blog?.title?.replace(/[\u00A0\u202F]/g, ' ');

    return (
        <Link
            href={`/blogs/${blog?.alias_title}`}
            className='p-2.5 bg-white rounded-20 flex items-center gap-x-10 flex-col gap-y-4 sm:flex-row w-full min-w-0 overflow-hidden'
        >
            <Skeleton classname='w-[9.375rem] h-[9.375rem] shrink-0 mx-auto sm:mx-0'>
                <Image
                    alt={blog?.alt || blog?.title || ''}
                    src={blog?.image}
                    width={150}
                    height={150}
                    className='aspect-[16/9] shrink-0 w-[9.375rem] h-[9.375rem] object-cover rounded-lg'
                />
            </Skeleton>

            <div className='flex flex-col w-full min-w-0 flex-1'>
                <p className={`${rowdies.className} text-xl [overflow-wrap:anywhere]`}>
                    {formattedTitle}
                </p>

                <p className='my-4 text-sm text-gray-600 [overflow-wrap:anywhere]'>
                    {blog?.user?.first_name} {blog?.user?.last_name} | {formatDate(blog?.created_at)}
                </p>

                <p className='line-clamp-3 md:line-clamp-1 [overflow-wrap:anywhere] text-gray-700'>
                    {blog?.description}
                </p>

                <Button
                    theme='secondary'
                    variant='soft'
                    className={`${rowdies.className} bg-white text-secondary [&>svg>path]:fill-secondary mt-6 sm:mt-10 ml-auto shrink-0`}
                    isAnimated
                >
                    Read more
                </Button>
            </div>
        </Link>
    );
};

export default DashboardBlogBox;