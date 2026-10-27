import Button from '@/components/Button';
import Table from '@/components/Table';
import TCell from '@/components/Table/TCell';
import Tr from '@/components/Table/Tr';
import api from '@/utils/api';
import useCustomQuery from '@/utils/api/hooks/useCustomQuery';
import Link from 'next/link';
import React from 'react';
import { PastInvestment } from '@/utils/types/DTO/past-investment.interface';
import Loading from '@/components/Loading';

interface PastInvestmentsTableProps {
    search: string;
}

const PastInvestmentsTable: React.FC<PastInvestmentsTableProps> = ({
    search,
}) => {
    const { data, isLoading } = useCustomQuery<PastInvestment[]>({
        queryFn: () => api.pastInvestments.getAll(),
        queryKey: ['PAST_INVESTMENTS', search],
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
                    'Initiation of Coverage',
                    'Termination of Coverage',
                    'Buy Price',
                    'Sell Price',
                    'Return',
                    'Read Reports',
                ]}
                classname='max-w-7xl'
            >
                {filteredData?.map((item, i) => (
                    <Tr key={item.id}>
                        <TCell>{i + 1}</TCell>
                        <TCell>{item.company.title}</TCell>
                        <TCell>{item.company.asx_code}</TCell>
                        <TCell>{item.portfolio}</TCell>
                        <TCell>{item.risk}</TCell>
                        <TCell>{item.initiation_of_coverage}</TCell>
                        <TCell>{item.termination_of_coverage}</TCell>
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

export default PastInvestmentsTable;
