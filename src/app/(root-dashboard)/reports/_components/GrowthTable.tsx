import Button from '@/components/Button';
import Table from '@/components/Table';
import TCell from '@/components/Table/TCell';
import Tr from '@/components/Table/Tr';
import api from '@/utils/api';
import useCustomQuery from '@/utils/api/hooks/useCustomQuery';
import { formatDate } from '@/utils/funcs/date';
import Link from 'next/link';
import React, { FC } from 'react';
import classNames from 'classnames';
import { Growths } from '@/utils/types/DTO/growths.interface';
import Loading from '@/components/Loading';
interface Props {
    search: string;
}

const GrowthTable: FC<Props> = ({ search }) => {
    const { data, isLoading } = useCustomQuery<Growths[]>({
        queryFn: () => api.growths.getAll(),
        queryKey: ['GROWTHS', search],
    });

    const getTextColor = (recommendation: string) =>
        classNames({
            'text-green-500': recommendation === 'Buy',
            'text-red-500': recommendation === 'Sell',
            'text-secondary': recommendation === 'Hold',
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
                    'Sector',
                    'Risk',
                    'Recommendation',
                    'Latest Review',
                    'Read Reports',
                ]}
                classname='max-w-7xl'
            >
                {filteredData?.map((item, i) => (
                    <Tr key={item.id}>
                        <TCell>{i + 1}</TCell>
                        <TCell>{item.company.title}</TCell>
                        <TCell>{item.company.asx_code}</TCell>
                        <TCell>{item.company.field}</TCell>
                        <TCell>{item.risk}</TCell>
                        <TCell>
                            <span className={getTextColor(item.recommendation)}>
                                {item.recommendation}
                            </span>
                        </TCell>
                        <TCell>{formatDate(item.updated_at)}</TCell>
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

export default GrowthTable;
