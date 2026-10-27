'use client';

import Button from '@/components/Button';
import Modal from '@/components/Modal';
import api from '@/utils/api';
import useCustomMutation from '@/utils/api/hooks/useCustomMutation';
import { deleteCookieAction } from '@/utils/funcs/cookie';
import { closeModal } from '@/utils/funcs/modal';
import { toast } from 'sonner';

const LogoutModal = () => {
    const { mutate, isPending } = useCustomMutation<void, void>({
        mutationFn: () => api.auth.logout(),
        onSettled: async () => {
            toast.success('You have been logged out successfully');
            closeModal('logout-modal');
            await deleteCookieAction('token');
            await deleteCookieAction('access_token');
            window.location.href = '/';
        },
    });

    return (
        <Modal title='Log out' id='logout-modal'>
            <p>Are you sure you want to log out from your account?</p>
            <Button
                className='mt-4'
                theme='primary'
                isLoading={isPending}
                onClick={() => mutate()}
            >
                Log out
            </Button>
        </Modal>
    );
};

export default LogoutModal;
