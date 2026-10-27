'use client';
import Spinner from '@/app/loading';
import api from '@/utils/api';
import useCustomQuery from '@/utils/api/hooks/useCustomQuery';
import { formatDate } from '@/utils/funcs/date';
import { AdminReport } from '@/utils/types/DTO/reports.interface';
import { rowdies } from 'fonts';
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';
import './style.css';

const ReportDetailContent = () => {
    const searchParams = useSearchParams();
    const report = searchParams.get('report') || '';

    const { data, isLoading } = useCustomQuery<AdminReport>({
        queryFn: () => api.reports.getOne(report),
        queryKey: ['REPORTS', report],
    });

    if (isLoading || !data) {
        return <Spinner />;
    }

    return (
        <div className='col-span-12 lg:col-span-8 border border-[#1B1F2326] p-7 rounded-3xl'>
            <div className='flex items-center justify-between flex-wrap gap-4'>
                <p className='text-primary-6 shrink-0'>
                    Published {formatDate(data?.created_at)}
                </p>
            </div>

            <p
                className={`text-primary text-lg md:text-3xl font-bold ${rowdies.className} mt-5`}
            >
                {data?.title}
            </p>

            <div
                className='mt-4 leading-8 text-gray-800 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3 [&_h4]:text-lg [&_h4]:font-medium [&_h4]:mt-5 [&_h4]:mb-2 [&_h5]:text-base [&_h5]:font-medium [&_h5]:mt-4 [&_h5]:mb-2 [&_h6]:text-sm [&_h6]:font-medium [&_h6]:mt-4 [&_h6]:mb-2 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:mr-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:mr-6 [&_ol]:mb-4 [&_a]:text-blue-600 [&_a]:underline [&_table]:w-full [&_table]:border-collapse [&_table]:border [&_table]:border-gray-200 [&_table]:my-6 [&_thead]:bg-gray-100 [&_th]:border [&_th]:border-gray-200 [&_th]:px-4 [&_th]:py-3 [&_th]:font-bold [&_th]:text-gray-700 [&_th]:text-right [&_td]:border [&_td]:border-gray-200 [&_td]:px-4 [&_td]:py-3 [&_td]:text-gray-600 [&_tr:nth-child(even)]:bg-gray-50 [&_tr:hover]:bg-gray-100 [&_tr]:transition-colors [&_tr]:duration-200'
                dangerouslySetInnerHTML={{
                    __html: data?.content,
                }}
            ></div>
        </div>
    );
};

const Page = () => {
    return (
        <Suspense fallback={<Spinner />}>
            <ReportDetailContent />
        </Suspense>
    );
};

export default Page;
