'use client';
import Spinner from '@/app/loading';
import api from '@/utils/api';
import useCustomQuery from '@/utils/api/hooks/useCustomQuery';
import { BookmarksList } from '@/utils/types/DTO/bookmarks.interface';
import DashboardBlogBox from '../_components/DashboardBlogBox';

const Page = () => {
    const { data, isLoading } = useCustomQuery<BookmarksList[]>({
        queryFn: () => api.bookmarks.list(),
        queryKey: ['BOOKMARKS'],
    });
    if (isLoading) {
        return <Spinner />;
    }
    if (!data || data.length === 0) {
        return (
            <p className='text-center py-10'>
                You have no bookmarks at the moment.
            </p>
        );
    }

    return (
        <div className='grid gap-10.5 lg:grid-cols-2'>
            {data.map((item) => (
                <DashboardBlogBox key={item.blog.id} blog={item.blog} />
            ))}
        </div>
    );
};

export default Page;
