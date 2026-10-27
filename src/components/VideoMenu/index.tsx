'use client';

import api from '@/utils/api';
import useCustomQuery from '@/utils/api/hooks/useCustomQuery';
import { VideoCategory } from '@/utils/types/DTO/admin-video.interface';
import Link from 'next/link';
import Skeleton from '../Skeleton';

const VideoMenu = () => {
    const { data, isLoading } = useCustomQuery({
        queryKey: ['VIDEO_CATEGORIES'],
        queryFn: () => api.videoCategory.getAll(),
    });

    const categories = data || [];

    return (
        <div className='w-full mx-auto my-4'>
            <div className='menu-bg rounded-3xl shadow-xl border border-white/10 bg-slate-900/90 text-white  backdrop-blur-lg flex flex-col gap-3'>
                <div className='h-0.5 block w-full bg-gradient-to-r from-transparent via-white/50 to-transparent' />
                <div
                    className="flex flex-col w-full py-1
    [&>*+*]:relative
    [&>*+*]:before:content-['']
    [&>*+*]:before:absolute
    [&>*+*]:before:top-0
    [&>*+*]:before:left-0
    [&>*+*]:before:right-0
    [&>*+*]:before:h-px
    [&>*+*]:before:bg-gradient-to-r
    [&>*+*]:before:from-transparent
    [&>*+*]:before:via-white/30
    [&>*+*]:before:to-transparent"
                >
                    {isLoading
                        ? Array.from({ length: 3 }).map((_, index) => (
                              <div
                                  key={index}
                                  className='flex justify-center py-3'
                              >
                                  <Skeleton classname='w-36 h-6 rounded-lg bg-white/20' />
                              </div>
                          ))
                        : categories.map((category: VideoCategory) => (
                              <Link
                                  key={category.id}
                                  
                                  href={{
                                    pathname:'/videos/all',
                                    query: {
                                        video_category: category.id.toString()
                                    }
                                  }}
                                  className='py-3 px-4 text-white'
                              >
                                  <span className='text-sm tracking-wide text-white whitespace-nowrap transition-colors hover:!text-[#a57d61]'>
                                      {category.category}
                                  </span>
                              </Link>
                          ))}
                </div>
                <div className='h-0.5 block w-full bg-gradient-to-r from-transparent via-white/50 to-transparent' />
            </div>
        </div>
    );
};

export default VideoMenu;
