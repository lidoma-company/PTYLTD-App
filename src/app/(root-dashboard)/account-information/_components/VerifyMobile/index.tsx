'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import api from '@/utils/api';
import useCustomMutation from '@/utils/api/hooks/useCustomMutation';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

export default function VerifyMobile() {
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [mobileNumber, setMobileNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(0);

    const MOBILE_REGEX = /^\+(?:[0-9] ?){6,14}[0-9]$/;

    const OTP_REGEX = /^\d{6}$/;

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer > 0 && !isVerified) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer, isVerified]);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return { minutes, seconds };
    };

    const { mutateAsync: sendOtp, isPending: isSendingOtp } = useCustomMutation(
        {
            mutationFn: (data) => api.auth.sendOtp(data),
            onSuccess: (response: any) => {
                toast.success(response?.message || 'Code sent successfully!');
                setIsOtpSent(true);
                setTimer(120);
            },
        },
    );

    const {
        mutateAsync: verifyMobileNumber,
        isPending: isVerifyingMobileNumber,
    } = useCustomMutation({
        mutationFn: (data) => api.auth.verifyOtp(data),
        onSuccess: (response: any) => {
            toast.success(response?.message || 'Mobile number verified!');
            setIsVerified(true);
            setTimer(0);
        },
    });

    const handleSendOtp = async () => {
        if (!mobileNumber) {
            toast.error('Please enter your mobile number');
            return;
        }

        if (!MOBILE_REGEX.test(mobileNumber)) {
            toast.error('Invalid mobile number format (e.g., +61487773258)');
            return;
        }

        await sendOtp({
            mobile_number: mobileNumber,
        });
    };

    const handleVerifyMobileNumber = async () => {
        if (!OTP_REGEX.test(otp)) {
            toast.error('OTP code must be exactly 6 digits');
            return;
        }

        await verifyMobileNumber({
            mobile_number: mobileNumber,
            otp,
        });
    };

    const handleResendOtp = async () => {
        if (timer === 0) {
            await handleSendOtp();
        }
    };

    const { minutes, seconds } = formatTime(timer);

    return (
        <div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
                <Input
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    theme='accent'
                    isAnimated
                    disabled={isOtpSent}
                    placeholder='Mobile Number'
                    className='max-w-md'
                />

                {isOtpSent && !isVerified && (
                    <Input
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        theme='accent'
                        isAnimated
                        placeholder='OTP Code'
                        maxLength={6}
                        className='max-w-md'
                    />
                )}
            </div>

            {!isOtpSent ? (
                <Button
                    isLoading={isSendingOtp}
                    className='max-w-xs mt-8'
                    onClick={handleSendOtp}
                >
                    Send Code
                </Button>
            ) : (
                !isVerified && (
                    <div className='flex flex-col gap-4 mt-8 max-w-xs'>
                        <Button
                            isLoading={isVerifyingMobileNumber}
                            onClick={handleVerifyMobileNumber}
                        >
                            Verify Mobile Number
                        </Button>

                        <div className='flex items-center justify-center'>
                            {timer > 0 ? (
                                <div className='flex items-center gap-2 text-gray-500 font-mono text-sm'>
                                    <span>Resend in</span>
                                    <span className='countdown font-mono text-lg'>
                                        <span
                                            style={
                                                {
                                                    '--value': minutes,
                                                } as React.CSSProperties
                                            }
                                        ></span>
                                        :
                                        <span
                                            style={
                                                {
                                                    '--value': seconds,
                                                } as React.CSSProperties
                                            }
                                        ></span>
                                    </span>
                                </div>
                            ) : (
                                <button
                                    onClick={handleResendOtp}
                                    disabled={isSendingOtp}
                                    className='text-sm text-blue-500 hover:text-blue-700 underline transition-colors disabled:opacity-50'
                                >
                                    Resend Code
                                </button>
                            )}
                        </div>
                    </div>
                )
            )}

            {isVerified && (
                <div className='mt-8 text-green-600 font-semibold'>
                    You are all set!
                </div>
            )}
        </div>
    );
}
