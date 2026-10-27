'use client';
import Button from '@/components/Button';
import { formatDate } from '@/utils/funcs/date';
import { CompanyReports } from '@/utils/types/DTO/company-reports.interface';
import { rowdies } from 'fonts';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FC } from 'react';
const ReportBox: FC<CompanyReports> = ({
    alias_title,
    user,
    created_at,
    title,
    description,
}) => {
    const params = useParams();
    const alias = params.alias as string;

    return (
        <Link
            href={`/reports/company?alias=${alias}&report=${alias_title}`}
            className='py-4 px-8 bg-white  border !border-[#B1F2326] rounded-20 flex items-center gap-x-10 flex-col gap-y-4 sm:flex-row'
        >
            {/* <Skeleton classname='w-[9.375rem] h-[9.375rem] shrink-0'>
                <Image
                    alt=''
                    src='/images/bookmark-temp.png'
                    width={150}
                    height={150}
                    className='aspect-[16/9] shrink-0 w-[9.375rem] h-[9.375rem] object-cover rounded-lg'
                />
            </Skeleton> */}
            <div className='flex flex-col w-full'>
                <p className={`${rowdies.className} text-xl`}>{title}</p>
                <p className='my-4 text-sm'>
                    Proactive Equities Team | {formatDate(created_at)}
                </p>
                <p className='line-clamp-2'>{description}</p>
                <Button
                    theme='secondary'
                    variant='soft'
                    className={`${rowdies.className} bg-white text-secondary [&>svg>path]:fill-secondary mt-10 ml-auto`}
                    isAnimated
                >
                    Read more
                </Button>
            </div>
        </Link>
    );
};

export default ReportBox;

// TODO
// overview page
// check user plans
