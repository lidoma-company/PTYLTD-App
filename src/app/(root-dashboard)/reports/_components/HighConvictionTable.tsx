import Button from '@/components/Button';
import Loading from '@/components/Loading';
import Table from '@/components/Table';
import TCell from '@/components/Table/TCell';
import Tr from '@/components/Table/Tr';
import api from '@/utils/api';
import useCustomQuery from '@/utils/api/hooks/useCustomQuery';
import { GetMeResponse } from '@/utils/types/DTO/get-me.interface';
import { HighConviction } from '@/utils/types/DTO/high-conviction.interface';
import Link from 'next/link';
import React from 'react';

interface HighConvictionTableProps {
    search: string;
}

const HighConvictionTable: React.FC<HighConvictionTableProps> = ({
    search,
}) => {
    const { data: me } = useCustomQuery<GetMeResponse>({
        queryFn: () => api.auth.getMe(),
        queryKey: ['GET_ME'],
    });

    const isWalkthrough = me?.user.email === 'demo@demo.com';

    const { data, isLoading } = useCustomQuery<HighConviction[]>({
        queryFn: () => api.highConviction.getAll(),
        queryKey: ['HIGH_CONVICTION', search],
        enabled: !!me,
    });

    const filteredData = data?.filter((item) =>
        item.company.title.toLowerCase().includes(search.toLowerCase()),
    );

    if (isLoading) {
        return (
            <div className='flex w-full items-center justify-center py-10'>
                <Loading theme='secondary' />
            </div>
        );
    }

    if (!filteredData || filteredData.length === 0) {
        return (
            <div className='text-center py-10 text-gray-500'>
                No results found for{' '}
                <span className='font-semibold'>{search}</span>
            </div>
        );
    }

    return (
        <div className='mt-10'>
            <Table
                headData={[
                    '#',
                    'Company name',
                    'ASX Code',
                    'Portfolio',
                    'Risk',
                    'Buy Below',
                    'Sell Above',
                    'Upside Potential',
                    'Read Reports',
                ]}
                classname='max-w-7xl'
            >
                {isWalkthrough ? (
                    <tr>
                        <td></td>
                    </tr>
                ) : (
                    filteredData?.map((item, i) => (
                        <Tr key={item.id}>
                            <TCell>{i + 1}</TCell>
                            <TCell>{item.company.title}</TCell>
                            <TCell>{item.company.asx_code}</TCell>
                            <TCell>{item.portfolio}</TCell>
                            <TCell>{item.risk}</TCell>
                            <TCell>${item.buy_below}</TCell>
                            <TCell>${item.sell_above}</TCell>
                            <TCell>
                                <span
                                    className={`${
                                        +item.upside_potential > 0
                                            ? 'text-green-500'
                                            : 'text-red-500'
                                    }`}
                                >
                                    {item.upside_potential}%
                                </span>
                            </TCell>
                            <TCell>
                                <Link
                                    href={`/reports/company?alias=${item.company.alias_title}`}
                                >
                                    <Button theme='secondary'>Read More</Button>
                                </Link>
                            </TCell>
                        </Tr>
                    ))
                )}
            </Table>
        </div>
    );
};

export default HighConvictionTable;
