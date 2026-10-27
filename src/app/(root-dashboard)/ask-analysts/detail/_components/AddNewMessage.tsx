'use client';
import File from '%/file.svg';
import Warning from '%/warning.svg';
import Button from '@/components/Button';
import Dnd from '@/components/Dnd';
import ErrorMessage from '@/components/ErrorMessage';
import Modal from '@/components/Modal';
import Textarea from '@/components/Textarea';
import api from '@/utils/api';
import useCustomMutation from '@/utils/api/hooks/useCustomMutation';
import { closeModal } from '@/utils/funcs/modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
    messageSchema,
    MessageSchema,
} from '../../_schemas/add-new-message.schema';

const AddNewMessage = () => {
    const queryClient = useQueryClient();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        control,
        formState: { errors },
    } = useForm<MessageSchema>({
        resolver: zodResolver(messageSchema),
    });

    const { mutate, isPending } = useCustomMutation<MessageSchema, void>({
        mutationFn: (data) => api.tickets.userAnswer(data),
        onSuccess: () => {
            toast.success('Message sent successfully');
            closeModal('add-new-message');
            queryClient.invalidateQueries({
                queryKey: ['TICKET', id],
            });
            reset();
        },
        onError: () => {
            closeModal('add-new-message');
        },
    });

    const onSubmit = (data: MessageSchema) => mutate(data);

    return (
        <Modal id='add-new-message' title='Add New Message'>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                {/* Message Input */}
                <div>
                    <Textarea
                        placeholder='Message'
                        {...register('message')}
                        className='resize-none'
                    />
                    <ErrorMessage errors={errors} field='message' />
                </div>

                <input type='hidden' value={String(id)} {...register('id')} />

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

                <Button type='submit' isLoading={isPending}>
                    Send Message
                </Button>
            </form>
        </Modal>
    );
};

export default AddNewMessage;
