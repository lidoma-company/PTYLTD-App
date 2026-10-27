'use client';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import api from '@/utils/api';
import useCustomMutation from '@/utils/api/hooks/useCustomMutation';
import { closeModal } from '@/utils/funcs/modal';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

const ConfirmCloseTicket = ({ id }: { id: string }) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const { mutate, isPending } = useCustomMutation({
        mutationFn: () => api.tickets.closeTicket(+id),
        onSuccess: () => {
            router.push('/ask-analysts');
            queryClient.invalidateQueries({
                queryKey: ['TICKETS'],
            });
            closeModal('confirm-close-ticket');
            toast.success('Ticket closed successfully');
        },
    });

    return (
        <Modal
            id='confirm-close-ticket'
            title='Are you sure you want to close this conversation?'
        >
            <div className='flex justify-around'>
                <Button theme='warning' onClick={mutate} isLoading={isPending}>
                    Confirm
                </Button>
                <Button
                    theme='primary'
                    onClick={() => closeModal('confirm-close-ticket')}
                >
                    Cancel
                </Button>
            </div>
        </Modal>
    );
};

export default ConfirmCloseTicket;
