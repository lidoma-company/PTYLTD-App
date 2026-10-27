'use client';

import Dnd from '@/components/Dnd';
import File from '%/file.svg';
import Warning from '%/warning.svg';
import React from 'react';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import Subject from '%/subject.svg';
import Textarea from '@/components/Textarea';
import Button from '@/components/Button';
import ErrorMessage from '@/components/ErrorMessage';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TicketSchema, ticketSchema } from '../_schemas/add-new-ticket.schema';
import { toast } from 'sonner';
import { closeModal } from '@/utils/funcs/modal';
import useCustomMutation from '@/utils/api/hooks/useCustomMutation';
import api from '@/utils/api';
import { useQueryClient } from '@tanstack/react-query';
const AddTicketModal = () => {
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<TicketSchema>({
        resolver: zodResolver(ticketSchema),
    });

    const { mutate, isPending } = useCustomMutation<TicketSchema, void>({
        mutationFn: (data) => api.tickets.addTicket(data),
        mutationKey: ['SIZES'],
        onSuccess: () => {
            toast.success('Ticket has been sent');
            closeModal('add-ticket-modal');
            queryClient.invalidateQueries({
                queryKey: ['TICKETS'],
            });
        },
        onError: () => {
            closeModal('add-ticket-modal');
        },
    });

    const onSubmit = (data: TicketSchema) => mutate(data);

    return (
        <Modal title='New Analyst Question' id='add-ticket-modal'>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <p className='text-primary-5 text-sm'>
                    Let us know your subject and message so we can assist you
                    better.
                </p>

                {/* Subject */}
                <div>
                    <Input
                        icon={<Subject />}
                        isAnimated
                        theme='neutral'
                        placeholder='Subject'
                        className='mt-10 mb-2'
                        {...register('title')} // subject stored in id field
                    />
                    <ErrorMessage errors={errors} field='title' />
                </div>
                <div>
                    <Input
                        icon={<Subject />}
                        isAnimated
                        theme='neutral'
                        placeholder='Description'
                        className='mb-2'
                        {...register('description')} // subject stored in id field
                    />
                    <ErrorMessage errors={errors} field='description' />
                </div>

                {/* Message */}
                <div>
                    <Textarea
                        icon={<Subject />}
                        theme='neutral'
                        placeholder='Hello, I want ...'
                        className='placeholder:pl-2 pl-8'
                        {...register('message')}
                    />
                    <ErrorMessage errors={errors} field='message' />
                </div>

                {/* File Upload */}
                <div>
                    <Controller
                        name='image'
                        control={control}
                        render={({ field }) => (
                            <>
                                <Dnd
                                    classname='bg-white mt-5 border border-dashed border-primary-6 rounded-20 h-30'
                                    enableDownload={false}
                                    onDrop={(files) => {
                                        field.onChange(files[0]);
                                    }}
                                >
                                    <div className='flex mt-5 items-center justify-center'>
                                        <File />
                                    </div>
                                    <p className='text-sm mt-1 mb-3 text-center'>
                                        Drag & Drop Or Click To Choose Files
                                    </p>
                                    <div className='items-center justify-center gap-x-1 flex'>
                                        <Warning />
                                        <span className='text-primary-5 text-sm'>
                                            Max File Size : 1MB
                                        </span>
                                    </div>
                                </Dnd>
                                <ErrorMessage errors={errors} field='image' />
                            </>
                        )}
                    />
                </div>

                <Button
                    type='submit'
                    isAnimated
                    isLoading={isPending}
                    className='rounded-2xl mt-6'
                >
                    Send
                </Button>
            </form>
        </Modal>
    );
};

export default AddTicketModal;
