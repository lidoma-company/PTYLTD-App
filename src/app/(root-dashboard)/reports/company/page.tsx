'use client';
import Spinner from '@/app/loading';
import api from '@/utils/api';
import useCustomQuery from '@/utils/api/hooks/useCustomQuery';
import { CompanyReports } from '@/utils/types/DTO/company-reports.interface';
import { rowdies } from 'fonts';
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';
import ReportBox from './detail/_components/ReportBox';

const CompanyReportsContent = () => {
    const searchParams = useSearchParams();
    const alias = searchParams.get('alias') || '';

    const { data, isLoading } = useCustomQuery<CompanyReports[]>({
        queryFn: () => api.reports.getCompanyReports(alias),
        queryKey: ['COMPANY_REPORTS', alias],
    });

    if (isLoading) {
        return <Spinner />;
    }

    if (!data || data.length === 0) {
        return (
            <div>
                <p className={`text-2xl ${rowdies.className} text-center`}>
                    No Report Found for this company
                </p>
            </div>
        );
    }

    const company = data?.[0].company;
    return (
        <div>
            <p className={`text-2xl ${rowdies.className}`}>{company.title}</p>
            <p className={`text-sm mt-2 text-gray-500 mb-10`}>
                {company.alias_title}
            </p>
            <div className='grid gap-10.5 lg:grid-cols-2'>
                {data.map((item) => (
                    <ReportBox key={item.id} {...item} />
                ))}
            </div>
        </div>
    );
};

const Page = () => {
    return (
        <Suspense fallback={<Spinner />}>
            <CompanyReportsContent />
        </Suspense>
    );
};

export default Page;
