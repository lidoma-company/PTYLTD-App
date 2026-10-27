'use client';
import Button from '@/components/Button';
import Table from '@/components/Table';
import TCell from '@/components/Table/TCell';
import Tr from '@/components/Table/Tr';
import { showModal } from '@/utils/funcs/modal';
import React from 'react';
import AddTicketModal from './_components/AddTicketModal';
import { Ticket } from '@/utils/types/DTO/tickets.interface';
import useCustomQuery from '@/utils/api/hooks/useCustomQuery';
import api from '@/utils/api';
import Link from 'next/link';
import Loading from '@/components/Loading';

const Page = () => {
    const { data, isLoading } = useCustomQuery<Ticket[]>({
        queryFn: () => api.tickets.getTickets(),
        queryKey: ['TICKETS'],
    });

    if (isLoading) {
        return (
            <div className='flex items-center justify-center h-32'>
                <Loading size='xl' />
            </div>
        );
    }
    return (
        <div>
            <p className='md:text-lg text-base'>
                Have a question about a stock or want our view on an
                opportunity?
                <span className='font-bold text-secondary'>
                    {' '}
                    Send your question directly to our analysts.
                </span>
            </p>
            <p className='text-sm md:text-base mt-3 mb-2'>
                You can ask us about:
            </p>
            <ul className='list-disc ms-12 space-y-2'>
                <li>
                    Companies currently held in our{' '}
                    <strong>Dividend or Growth Portfolios</strong>
                </li>
                <li>
                    Any stock on our <strong>High Conviction Buys Now</strong>{' '}
                    list
                </li>
                <li>
                    Any stock on our <strong>Active Trading Signals</strong>{' '}
                    list
                </li>
                <li>
                    An <strong>ASX-listed company you’re considering</strong>{' '}
                    that we don’t currently cover
                </li>
            </ul>

            <p className='md:text-base text-sm mt-5'>
                Our analysts review every ticket personally and typically
                respond{' '}
                <span className='font-bold text-secondary'>
                    within 24 hours
                </span>
                . If there’s a company you’d like us to look into, simply ask —
                <span className='font-bold text-secondary'>
                    we’ll do the research and share our view{' '}
                </span>
                with you.
            </p>

            <Button
                className='mt-15'
                theme='neutral'
                onClick={() => showModal('add-ticket-modal')}
            >
                Ask a Question
            </Button>
            <div className='mt-5'>
                <Table
                    headData={[
                        '#',
                        'Question Title',
                        'Submitted Date',
                        'Status',
                        'View More',
                    ]}
                >
                    {data?.map((item, i) => (
                        <Tr key={item.id}>
                            <TCell>{i + 1}</TCell>
                            <TCell>{item.title}</TCell>
                            <TCell>
                                {new Date(item.created_at).toLocaleDateString(
                                    'en-GB',
                                )}
                            </TCell>

                            <TCell>{item.status.replaceAll('_', ' ')}</TCell>

                            <TCell>
                                <Link
                                    href={`/ask-analysts/detail?id=${item.id}`}
                                >
                                    <Button variant='soft'>View</Button>
                                </Link>
                            </TCell>
                        </Tr>
                    ))}
                </Table>
            </div>
            <AddTicketModal />
        </div>
    );
};

export default Page;
