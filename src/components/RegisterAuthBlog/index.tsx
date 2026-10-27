'use client';

import React, { useState } from 'react';
import Input from '../Input';
import ErrorMessage from '../ErrorMessage';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../Button';
import {
    signupSchema,
    SignupType,
} from '@/app/(auth)/sign-up/_schemas/sign-up.schema';
import api from '@/utils/api';
import useCustomMutation from '@/utils/api/hooks/useCustomMutation';
import { toast } from 'sonner';
import VerificationInput from 'react-verification-input';
import { setCookieAction } from '@/utils/funcs/cookie';
import { rowdies } from 'fonts';
import { track } from 'next-pixels';

interface RegisterAuthBlogProps {
    onVerified?: () => void;
}

const RegisterAuthBlog: React.FC<RegisterAuthBlogProps> = ({ onVerified }) => {
    const [step, setStep] = useState<'register' | 'verify'>('register');
    const [code, setCode] = useState('');
    const [email, setEmail] = useState<string | null>(null);

    // ---------------- REGISTER FORM ----------------
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<SignupType>({
        resolver: zodResolver(signupSchema),
    });

    const { mutate, isPending: isRegisterPending } = useCustomMutation<
        SignupType,
        void
    >({
        mutationFn: (data: SignupType) => api.auth.signUp(data),
        onSuccess: () => {
            const userEmail = getValues('email');
            setEmail(userEmail);

            track({
                eventName: 'CompleteRegistration',
                data: {
                    method: 'email',
                },
            });

            toast.success('Register Successfully');
            setStep('verify');
        },
    });

    const onSubmit: SubmitHandler<SignupType> = (data) => {
        mutate(data);
    };

    // ---------------- VERIFY EMAIL ----------------
    const { mutateAsync: verifyMutate, isPending: isVerifyPending } =
        useCustomMutation({
            mutationFn: (data) => api.auth.verifyEmail(data),
            onSuccess: async (response: any) => {
                await setCookieAction('token', response?.token);

                track({
                    eventName: 'CompleteRegistration',
                    data: {
                        registration_type: 'email_verified',
                        source: 'article_access',
                    },
                });

                toast.success(
                    response?.message ?? 'Email verified successfully!',
                );
                if (onVerified) onVerified();
            },
        });

    const handleVerifyEmail = async () => {
        if (!code || code.length !== 6) return toast.error('Code is invalid');
        if (!email) return toast.error('Email not found');

        await verifyMutate({ email, otp: code });
    };

    return (
        <div className='bg-white p-4 shadow-xl/20'>
            {step === 'register' && (
                <>
                    <p className='text-center font-extrabold text-2xl'>
                        To get access to this article and all our Insights
                        Articles, please register your account below. <br /> (No
                        Credit Card Required)
                    </p>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className='grid grid-cols-2 gap-3 mt-9'
                    >
                        <div>
                            <Input
                                placeholder='First Name'
                                theme='accent'
                                isAnimated
                                className='h-16 bg-root border-black text-lg'
                                {...register('first_name')}
                            />
                            <ErrorMessage errors={errors} field='first_name' />
                        </div>

                        <div>
                            <Input
                                placeholder='Last Name'
                                theme='accent'
                                isAnimated
                                className='h-16 bg-root border-black text-lg'
                                {...register('last_name')}
                            />
                            <ErrorMessage errors={errors} field='last_name' />
                        </div>

                        <div className='col-span-2'>
                            <Input
                                placeholder='Email'
                                theme='accent'
                                isAnimated
                                className='h-16 bg-root border-black text-lg'
                                {...register('email')}
                            />
                            <ErrorMessage errors={errors} field='email' />
                        </div>

                        <div>
                            <Input
                                placeholder='Password'
                                theme='accent'
                                className='h-16 bg-root border-black text-lg'
                                isAnimated
                                type='password'
                                {...register('password')}
                            />
                            <ErrorMessage errors={errors} field='password' />
                        </div>

                        <div>
                            <Input
                                placeholder='Confirm Password'
                                theme='accent'
                                className='h-16 bg-root border-black text-lg'
                                isAnimated
                                type='password'
                                {...register('password_confirmation')}
                            />
                            <ErrorMessage
                                errors={errors}
                                field='password_confirmation'
                            />
                        </div>

                        <Button
                            isAnimated
                            isLoading={isRegisterPending}
                            theme='secondary'
                            shape='block'
                            className='border-2 border-primary mt-4 h-16 text-xl col-span-2'
                            type='submit'
                        >
                            SignUp Now
                        </Button>
                    </form>
                </>
            )}

            {step === 'verify' && (
                <div>
                    <p className={`text-3xl ${rowdies.className}`}>
                        Email Verification
                    </p>
                    <p className='text-primary-5 max-w-lg mt-6'>
                        We’ve sent a verification code to your email address:{' '}
                        <br />
                        <span className='font-bold'>{email}</span>
                    </p>

                    <div className='mt-5'>
                        <VerificationInput
                            onChange={(e) => setCode(e)}
                            classNames={{
                                character:
                                    '!input !input-accent !font-bold !text-xl',
                                characterSelected:
                                    '!outline-1 !outline-accent !font-bold !text-xl outline-offset-1',
                                characterFilled:
                                    '!outline-1 !outline-accent !font-bold !text-xl outline-offset-1',
                            }}
                        />
                    </div>

                    <Button
                        isAnimated
                        isLoading={isVerifyPending}
                        theme='secondary'
                        shape='block'
                        className='border-2 border-primary mt-6 h-16 text-xl'
                        onClick={handleVerifyEmail}
                    >
                        Verify Now
                    </Button>
                </div>
            )}
        </div>
    );
};

export default RegisterAuthBlog;
