'use client';

import Loading from '@/components/Loading';
import Table from '@/components/Table';
import TCell from '@/components/Table/TCell';
import Tr from '@/components/Table/Tr';
import api from '@/utils/api';
import useCustomQuery from '@/utils/api/hooks/useCustomQuery';

const page = () => {
    const { data, isLoading } = useCustomQuery({
        queryKey: ['USER_PAYMENTS'],
        queryFn: () => api.payment.getAll(),
    });

    if (isLoading)
        return (
            <div className='flex items-center justify-center h-40'>
                <Loading theme='secondary' size='lg' />
            </div>
        );

    const payments: any = data || [];

    return (
        <div>
            <div className='mt-15 overflow-x-auto'>
                <Table
                    headData={[
                        'ID',
                        'Reference',
                        'Amount',
                        'Currency',
                        'Status',
                        'Brand',
                        'Date',
                        'Receipt',
                    ]}
                >
                    {payments.map((payment: any) => (
                        <Tr key={payment.id}>
                            <TCell>{payment.id}</TCell>
                            <TCell>
                                <span className='text-sm text-gray-500 truncate max-w-xs block'>
                                    {payment.refrence_id}
                                </span>
                            </TCell>
                            <TCell>{payment.amount}</TCell>
                            <TCell>{payment.currency}</TCell>
                            <TCell>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs ${payment.status === 'succeeded' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                                >
                                    {payment.status}
                                </span>
                            </TCell>
                            <TCell>{payment.card_brand}</TCell>
                            <TCell>
                                {new Date(
                                    payment.created_at,
                                ).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </TCell>
                            <TCell>
                                {payment.receipt ? (
                                    <a
                                        href={payment.receipt}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='text-blue-600 hover:text-blue-800 hover:underline transition-colors'
                                    >
                                        View
                                    </a>
                                ) : (
                                    <span className='text-gray-400'>N/A</span>
                                )}
                            </TCell>
                        </Tr>
                    ))}
                </Table>
            </div>
        </div>
    );
};

export default page;
