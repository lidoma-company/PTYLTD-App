import Button from '@/components/Button';
import Table from '@/components/Table';
import TCell from '@/components/Table/TCell';
import Tr from '@/components/Table/Tr';
import api from '@/utils/api';
import useCustomQuery from '@/utils/api/hooks/useCustomQuery';
import Link from 'next/link';
import React from 'react';
import { PastTrades } from '@/utils/types/DTO/past-trades.interface';
import Loading from '@/components/Loading';

interface PastTradesTableProps {
    search: string;
}

const PastTradesTable: React.FC<PastTradesTableProps> = ({ search }) => {
    const { data, isLoading } = useCustomQuery<PastTrades[]>({
        queryFn: () => api.pastTrades.getAll(),
        queryKey: ['PAST_TRADES', search],
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
                    'Open Date',
                    'Close Date',
                    'Buy Price',
                    'Sell Price',
                    'Return',
                    'Read Reports',
                ]}
                classname='max-w-7xl'
            >
                {filteredData.map((item, i) => (
                    <Tr key={item.id}>
                        <TCell>{i + 1}</TCell>
                        <TCell>{item.company.title}</TCell>
                        <TCell>{item.company.asx_code}</TCell>
                        <TCell>{item.open_date}</TCell>
                        <TCell>{item.close_date}</TCell>
                        <TCell>${item.buy_price}</TCell>
                        <TCell>${item.sell_price}</TCell>
                        <TCell>
                            <span
                                className={`${
                                    +item.return > 0
                                        ? 'text-green-500'
                                        : 'text-red-500'
                                }`}
                            >
                                {item.return}%
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
                ))}
            </Table>
        </div>
    );
};

export default PastTradesTable;
