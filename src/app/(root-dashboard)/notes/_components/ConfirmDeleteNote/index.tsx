'use client';

import Button from '@/components/Button';
import Modal from '@/components/Modal';
import api from '@/utils/api';
import useCustomMutation from '@/utils/api/hooks/useCustomMutation';
import { closeModal } from '@/utils/funcs/modal';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const ConfirmDeleteNoteModal = ({ noteId }: { noteId: number | null }) => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useCustomMutation({
        mutationFn: (id: number) => api.notes.delete(id),
        onSuccess: () => {
            toast.success('Note deleted successfully');
            queryClient.invalidateQueries({
                queryKey: ['NOTES'],
            });
            closeModal('delete-note');
        },
        onError: () => {
            toast.error('Failed to delete note');
        },
    });

    if (!noteId) {
        return (
            <Modal title='Delete Note' id='delete-note'>
                <div className='text-sm text-red-500'>
                    Cannot determine note id.
                </div>
            </Modal>
        );
    }

    return (
        <Modal title='Delete Note' id='delete-note'>
            <p className='mb-4'>
                Are you sure you want to delete this note? This action cannot be
                undone.
            </p>
            <div className='flex justify-end gap-3'>
                <Button
                    theme='error'
                    onClick={() => mutate(noteId)}
                    isLoading={isPending}
                >
                    Delete
                </Button>
                <Button
                    theme='secondary'
                    type='button'
                    onClick={() => closeModal('delete-note')}
                >
                    Cancel
                </Button>
            </div>
        </Modal>
    );
};

export default ConfirmDeleteNoteModal;
