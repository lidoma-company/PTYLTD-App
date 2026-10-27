'use client';
import Button from '@/components/Button';
import ChatBubble from '@/components/ChatBubble';
import api from '@/utils/api';
import useCustomQuery from '@/utils/api/hooks/useCustomQuery';
import { showModal } from '@/utils/funcs/modal';

import Loading from '@/components/Loading';
import { SingleTicket } from '@/utils/types/DTO/tickets.interface';
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';
import AddNewMessage from './_components/AddNewMessage';
import ConfirmCloseTicket from './_components/ConfirmCloseTicket';

const TicketDetailContent = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id') || '';

    const { data, isLoading } = useCustomQuery<SingleTicket>({
        queryFn: () => api.tickets.getTicket(id),
        queryKey: ['TICKET', id],
    });

    if (isLoading) {
        return (
            <div className='flex items-center justify-center h-32'>
                <Loading size='xl' />
            </div>
        );
    }

    const isImageFile = (url?: string) => {
        if (!url) return false;
        return /\.(jpg|jpeg|png|webp|gif)$/i.test(url);
    };

    return (
        <div className='space-y-6'>
            {/* Ticket Header */}
            <div className='bg-white border rounded-2xl p-6'>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-xl font-semibold text-secondary'>
                        {data?.title || 'Ticket'}
                    </h1>

                    <p className='text-sm text-neutral-500'>
                        Ticket #{data?.id}
                    </p>
                </div>
            </div>

            {/* Ticket Description */}
            <div className='bg-white border rounded-2xl p-6'>
                <h2 className='font-semibold mb-4 text-secondary'>
                    Description
                </h2>

                <div className='bg-gray-50 rounded-xl p-5 leading-8 text-neutral-700'>
                    {data?.description || 'No message'}
                </div>
            </div>

            {/* Actions */}
            {data?.status !== 'close' && (
                <div className='flex flex-wrap gap-3'>
                    <Button onClick={() => showModal('add-new-message')}>
                        Send New Message
                    </Button>

                    <Button
                        theme='secondary'
                        onClick={() => showModal('confirm-close-ticket')}
                    >
                        Close Conversation
                    </Button>
                </div>
            )}

            {/* Conversation */}
            <div className='max-w-5xl mx-auto bg-white border rounded-2xl p-5 space-y-5'>
                <h2 className='font-semibold text-secondary'>Conversation</h2>

                {data?.messages?.map((item) => {
                    const attachment = item.image || item.answer_image;

                    return (
                        <ChatBubble
                            key={item.id}
                            image={
                                isImageFile(attachment) ? attachment : undefined
                            }
                            isAnswer={!!item.answer}
                        >
                            <div className='space-y-3'>
                                <p>{item.message || item.answer}</p>

                                {attachment && !isImageFile(attachment) && (
                                    <a
                                        href={encodeURI(attachment)}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        download
                                        className='
                            flex items-center gap-3
                            text-primary
                            rounded-xl
                            px-4 py-3
                            w-fit
                            hover:bg-primary/20
                            transition
                        '
                                    >
                                        <span className='text-sm font-medium bg-white rounded-xl p-2'>
                                            Download File
                                        </span>
                                    </a>
                                )}
                            </div>
                        </ChatBubble>
                    );
                })}
            </div>

            <AddNewMessage />

            <ConfirmCloseTicket id={id} />
        </div>
    );
};

const Page = () => {
    return (
        <Suspense
            fallback={
                <div className='flex items-center justify-center h-32'>
                    <Loading size='xl' />
                </div>
            }
        >
            <TicketDetailContent />
        </Suspense>
    );
};

export default Page;
