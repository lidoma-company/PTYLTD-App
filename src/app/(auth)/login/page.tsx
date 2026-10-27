'use client';
import Email from '%/email-solid.svg';
import Password from '%/password.svg';
import Anchor from '@/components/Anchor';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import ErrorMessage from '@/components/ErrorMessage';
import Input from '@/components/Input';
import api from '@/utils/api';
import { getMeAction } from '@/utils/api/actions/auth';
import useCustomMutation from '@/utils/api/hooks/useCustomMutation';
import { setCookieAction } from '@/utils/funcs/cookie';
import { zodResolver } from '@hookform/resolvers/zod';
import { rowdies } from 'fonts';
import { track } from 'next-pixels';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { LoginRes, loginSchema, LoginType } from './_schemas/login.schema';

const Page = () => {
    const { mutate, isPending } = useCustomMutation<LoginType, LoginRes>({
        mutationFn: (data: LoginType) => api.auth.login(data),
        onSuccess: async (data) => {
            const token = data.token;
            await setCookieAction('token', token, {
                maxAge: 60 * 60 * 24 * 14,
            });
            const isAuthenticated = await getMeAction();

            if (isAuthenticated) {
                track({ eventName: 'Login' });

                toast.success('Welcome!');
                setTimeout(() => {
                    window.location.href = '/';
                }, 300);
            } else {
                toast.error('Authentication failed. Please try again.');
            }
        },
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginType>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit: SubmitHandler<LoginType> = (data) => {
        mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <p className={`text-3xl ${rowdies.className}`}>Login</p>
            <Input
                placeholder='Email'
                theme='accent'
                icon={<Email />}
                isAnimated
                className='mt-9 h-16 bg-root rounded-20 text-lg'
                {...register('email')}
            />
            <ErrorMessage errors={errors} field='email' />
            <Input
                placeholder='Password'
                theme='accent'
                icon={<Password />}
                className='mt-4 h-16 bg-root rounded-20 text-lg'
                isAnimated
                type='password'
                {...register('password')}
            />
            <ErrorMessage errors={errors} field='password' />
            <div className='mt-5.5'>
                <Checkbox size='xs' label='Remember me' />
            </div>
            <Button
                isAnimated
                theme='secondary'
                shape='block'
                className='border-2 rounded-20 border-primary mt-6 h-16 text-xl'
                type='submit'
                isLoading={isPending}
            >
                Login
            </Button>
            <div className='mt-9'>
                {' '}
                Don&apos;t have an account ?{' '}
                <Anchor
                    theme='secondary'
                    showUnderlineOnlyOnHover
                    href='/sign-up'
                >
                    Sign up
                </Anchor>
            </div>

            <div className='mt-2'>
                <Anchor
                    theme='secondary'
                    showUnderlineOnlyOnHover
                    href='/lost-password'
                >
                    Lost your password?
                </Anchor>
            </div>
        </form>
    );
};

export default Page;
