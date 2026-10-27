'use client';

import Button from '@/components/Button';
import api from '@/utils/api';
import { getMeAction } from '@/utils/api/actions/auth';
import useCustomMutation from '@/utils/api/hooks/useCustomMutation';
import { setCookieAction } from '@/utils/funcs/cookie';
import { rowdies } from 'fonts';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import VerificationInput from 'react-verification-input';
import { toast } from 'sonner';
import { track } from 'next-pixels'; // ✅ اضافه کردن import

const Page = () => {
    const router = useRouter();
    const [code, setCode] = useState('');
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        setEmail(sessionStorage.getItem('email'));
    }, []);

    const { mutateAsync, isPending } = useCustomMutation({
        mutationFn: (data) => api.auth.verifyEmail(data),
        onSuccess: async (response: any) => {
            await setCookieAction('token', response?.token);
            const isAuthenticated = await getMeAction();

            if (isAuthenticated) {
                const redirectTo = sessionStorage.getItem('redirectTo');
                const planId = sessionStorage.getItem('planId');

                track({
                    eventName: 'CompleteRegistration',
                    data: {
                        method: 'email',
                        status: 'verified',
                        source:
                            redirectTo === 'checkout' ? 'checkout' : 'direct',
                    },
                });

                sessionStorage.removeItem('email');
                sessionStorage.removeItem('redirectTo');
                sessionStorage.removeItem('planId');

                toast.success(
                    response?.message ?? 'Email verified successfully!',
                );

                if (redirectTo === 'checkout') {
                    router.replace(`/pricing?planId=${planId}`);
                } else {
                    router.replace('/');
                }
            } else {
                toast.error('Authentication failed. Please try again.');
            }
        },
    });

    const handleVerifyEmail = async () => {
        if (!code || code.length !== 6) return toast.error('Code is invalid');
        if (!email) return toast.error('Email not found');
        await mutateAsync({
            email,
            otp: code,
        });
    };

    return (
        <div>
            <p className={`text-3xl ${rowdies.className}`}>
                Email Verification
            </p>

            <p className='text-primary-5 max-w-lg mt-6'>
                We’ve sent a verification link to your email address. Please
                check your inbox.
            </p>

            <div className='mt-5'>
                <VerificationInput
                    onChange={(e) => setCode(e)}
                    classNames={{
                        container: '',
                        character: '!input !input-accent !font-bold !text-xl',
                        characterSelected:
                            '!outline-1 !outline-accent !font-bold !text-xl outline-offset-1',
                        characterFilled:
                            '!outline-1 !outline-accent !font-bold !text-xl outline-offset-1',
                    }}
                />
            </div>

            <Button
                isAnimated
                isLoading={isPending}
                theme='secondary'
                shape='block'
                className='border-2 rounded-20 border-primary mt-6 h-16 text-xl'
                onClick={handleVerifyEmail}
            >
                Verify Now
            </Button>
        </div>
    );
};

export default Page;
