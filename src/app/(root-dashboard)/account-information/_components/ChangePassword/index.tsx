'use client';

import Button from '@/components/Button';
import Divider from '@/components/Divider';
import Input from '@/components/Input';
import api from '@/utils/api';
import useCustomMutation from '@/utils/api/hooks/useCustomMutation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type FormValues = {
    old_password: string;
    password: string;
    password_confirmation: string;
};

export default function ChangePassword() {
    const { register, handleSubmit, watch } = useForm<FormValues>();

    const { mutateAsync, isPending } = useCustomMutation({
        mutationFn: (data: FormValues) => api.auth.editPassword(data),
        onSuccess: (response: any) => {
            toast.success(
                response?.message || 'password changed successfully!',
            );
        },
    });

    const { mutateAsync: logout } = useCustomMutation<void, void>({
        mutationFn: () => api.auth.logout(),
        onSuccess: async () => {
            window.location.href = '/';
        },
        onError: () => {
            toast.error('Something went wrong, please try again');
        },
    });

    const onSubmit = async (data: FormValues) => {
        await mutateAsync(data);
        await logout();
    };

    const password = watch('password');

    return (
        <div>
            <Divider classname='my-12'>Reset Password</Divider>

            <div>
                <form
                    className='grid grid-cols-1 sm:grid-cols-2 gap-8'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Input
                        type='password'
                        theme='accent'
                        isAnimated
                        placeholder='Old Password'
                        className='max-w-md'
                        {...register('old_password', {
                            required: 'Old password is required',
                        })}
                    />

                    <Input
                        type='password'
                        theme='accent'
                        isAnimated
                        placeholder='New Password'
                        className='max-w-md'
                        {...register('password', {
                            required: 'Password is required',
                            minLength: 6,
                        })}
                    />

                    <Input
                        type='password'
                        theme='accent'
                        isAnimated
                        placeholder='Confirm Password'
                        className='max-w-md'
                        {...register('password_confirmation', {
                            required: 'Confirm your password',
                            validate: (value) =>
                                value === password || 'Passwords do not match',
                        })}
                    />

                    <div className='col-span-full'>
                        <Button
                            type='submit'
                            isLoading={isPending}
                            loadingText='changing...'
                        >
                            Change Password
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
